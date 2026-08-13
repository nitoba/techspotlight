#!/usr/bin/env node
// Busca standups do canal Discord e gera o standup_periodo.txt no formato do Tech Spotlight.
//
// Pré-requisitos:
//   1. Bot adicionado ao servidor com permissões: View Channel + Read Message History
//      no canal de standups.
//   2. Node 18+ (usa fetch global).
//
// Uso:
//   DISCORD_BOT_TOKEN=xxx node scripts/fetch-standups.mjs \
//     --edition 4 --start 2026-05-04 --end 2026-05-22 --presentation 2026-05-22
//
// Variáveis de ambiente:
//   DISCORD_BOT_TOKEN  (obrigatório) — token do bot
//   STANDUPS_CHANNEL   (opcional)    — ID do canal; default abaixo
//   USER_RONALDO      (opcional)    — Discord user ID; default abaixo
//   USER_BRUNO        (opcional)
//   USER_THIELSON     (opcional)
//
// O script:
//   - busca todas as mensagens do canal no intervalo [start, end] (inclusivo);
//   - filtra apenas mensagens dos 3 user IDs configurados;
//   - agrupa por dia (timezone São Paulo) e por autor;
//   - escreve em edition-{N}/standup_periodo.txt no formato esperado.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ── Config padrão (sobrescrita por env vars) ───────────────────────────────
const CONFIG = {
  channelId: process.env.STANDUPS_CHANNEL ?? "1503390163370250250",
  users: {
    Ronaldo: process.env.USER_RONALDO ?? "960498239583432764",
    Bruno: process.env.USER_BRUNO ?? "287257435830353922",
    Thielson: process.env.USER_THIELSON ?? "255029200187031552",
  },
  // ordem em que cada pessoa aparece dentro de um mesmo dia
  order: ["Ronaldo", "Thielson", "Bruno"],
  tz: "America/Sao_Paulo",
};

// ── CLI args ──────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, "");
    const val = argv[i + 1];
    if (!key) continue;
    out[key] = val;
  }
  return out;
}

const args = parseArgs(process.argv);
const EDITION = Number(args.edition);
const PERIOD_START = args.start; // YYYY-MM-DD
const PERIOD_END = args.end; // YYYY-MM-DD
const PRESENTATION = args.presentation ?? PERIOD_END;

if (!EDITION || !PERIOD_START || !PERIOD_END) {
  console.error(
    "Uso: --edition N --start YYYY-MM-DD --end YYYY-MM-DD [--presentation YYYY-MM-DD]",
  );
  process.exit(1);
}
if (!process.env.DISCORD_BOT_TOKEN) {
  console.error("Faltou DISCORD_BOT_TOKEN no ambiente.");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(
  ROOT,
  `edition-${String(EDITION).padStart(2, "0")}`,
  "standup_periodo.txt",
);

// ── Discord REST helpers ──────────────────────────────────────────────────
const API = "https://discord.com/api/v10";
const HEADERS = {
  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
  "User-Agent": "tech-spotlight-standup-fetcher (https://github.com/, 1.0)",
};

async function fetchMessagesBefore(channelId, beforeId = null) {
  const url = new URL(`${API}/channels/${channelId}/messages`);
  url.searchParams.set("limit", "100");
  if (beforeId) url.searchParams.set("before", beforeId);

  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 429) {
    const body = await res.json();
    const wait = Math.ceil((body.retry_after ?? 1) * 1000);
    console.error(`rate limit, aguardando ${wait}ms...`);
    await new Promise((r) => setTimeout(r, wait));
    return fetchMessagesBefore(channelId, beforeId);
  }
  if (!res.ok) {
    throw new Error(`Discord ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// Pagina o histórico do canal até cobrir o período inteiro (vai até atingir startMs).
async function fetchPeriod(channelId, startMs, endMs) {
  const userIds = new Set(Object.values(CONFIG.users));
  const collected = [];
  let beforeId = null;
  let pages = 0;

  while (true) {
    const batch = await fetchMessagesBefore(channelId, beforeId);
    pages++;
    if (batch.length === 0) break;

    for (const m of batch) {
      const ts = Date.parse(m.timestamp);
      if (ts < startMs) return collected; // já passamos do período → para
      if (ts > endMs) continue; // ainda depois do período
      if (!userIds.has(m.author.id)) continue; // outro time
      collected.push(m);
    }

    beforeId = batch[batch.length - 1].id;
    if (pages > 50) {
      console.error("limite de paginação atingido (50 páginas)");
      break;
    }
  }
  return collected;
}

// ── Agrupamento por dia/autor ─────────────────────────────────────────────
function dayKey(ts) {
  // YYYY-MM-DD no timezone configurado
  const d = new Date(ts);
  return new Intl.DateTimeFormat("en-CA", { timeZone: CONFIG.tz }).format(d);
}

function nameById(id) {
  for (const [name, uid] of Object.entries(CONFIG.users)) {
    if (uid === id) return name;
  }
  return null;
}

function groupByDayAuthor(messages) {
  const byDay = new Map();
  for (const m of messages) {
    const ts = Date.parse(m.timestamp);
    const day = dayKey(ts);
    const who = nameById(m.author.id);
    if (!who) continue;

    if (!byDay.has(day)) byDay.set(day, {});
    const dayObj = byDay.get(day);
    if (!dayObj[who]) dayObj[who] = [];
    dayObj[who].push(m.content.trim());
  }
  // ordena pelas datas crescentes
  return new Map([...byDay.entries()].sort());
}

// ── Formatação no template do standup_periodo.txt ────────────────────────
function formatBR(yyyyMmDd) {
  const [y, m, d] = yyyyMmDd.split("-");
  return `${d}/${m}/${y}`;
}

function renderTxt(editionN, startISO, endISO, presentationISO, byDay) {
  const lines = [];
  const sep = "=".repeat(80);
  const sub = "-".repeat(80);

  lines.push(sep);
  lines.push(
    `TECH SPOTLIGHT #${String(editionN).padStart(2, "0")} — STANDUPS DO PERIODO`,
  );
  lines.push(`Periodo: ${formatBR(startISO)} - ${formatBR(endISO)}`);
  lines.push(`Apresentacao: ${formatBR(presentationISO)}`);
  lines.push(sep);
  lines.push("");

  for (const [day, byAuthor] of byDay) {
    lines.push(`Standup (${formatBR(day)})`);
    lines.push(sub);

    for (const who of CONFIG.order) {
      const posts = byAuthor[who];
      if (!posts || posts.length === 0) continue;
      lines.push("");
      lines.push(who.toUpperCase());
      for (const text of posts) {
        lines.push(text);
      }
    }

    lines.push("");
    lines.push("");
    lines.push("");
    lines.push(sep);
    lines.push("");
  }

  return lines.join("\n");
}

// ── Execução ──────────────────────────────────────────────────────────────
const startMs = Date.parse(`${PERIOD_START}T00:00:00-03:00`);
const endMs = Date.parse(`${PERIOD_END}T23:59:59-03:00`);

console.error(
  `Buscando standups do canal ${CONFIG.channelId} entre ${PERIOD_START} e ${PERIOD_END}...`,
);
const messages = await fetchPeriod(CONFIG.channelId, startMs, endMs);
console.error(`Coletadas ${messages.length} mensagens dos 3 autores.`);

const grouped = groupByDayAuthor(messages);
const txt = renderTxt(EDITION, PERIOD_START, PERIOD_END, PRESENTATION, grouped);

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, txt, "utf-8");
console.error(`✓ Escrito: ${OUT_PATH}`);
