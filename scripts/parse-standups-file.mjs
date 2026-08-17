#!/usr/bin/env node
// Lê uma exportação de mensagens do Discord em Markdown e gera o mesmo
// standup_periodo.txt produzido por fetch-standups.mjs.
//
// Uso:
//   node scripts/parse-standups-file.mjs \
//     --edition 7 --start 2026-07-27 --end 2026-08-12 \
//     [--presentation 2026-08-14] [--input mensagens.md]

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORDER = ["Ronaldo", "Thielson", "Bruno"];
const MONTHS = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};
const WEEKDAYS =
  "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday";
const AUTHOR_PATTERNS = [
  ["Ronaldo", /^Ronaldo\b/i],
  ["Bruno", /^Bruno Alves\b/i],
  ["Thielson", /^Thielson Almendra\b/i],
];
const DISCORD_DATE = new RegExp(
  `(?:${WEEKDAYS}),\\s*([A-Za-z]+\\s+\\d{1,2},\\s+\\d{4})\\s+at\\s+\\d{1,2}:\\d{2}\\s+[AP]M`,
);
const STANDUP_DATE = /^Standup \((\d{1,2})\/(\d{1,2})\/(\d{4})\)/i;
const DAY_SEPARATOR = /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/;
const CONTINUATION = /^\[\d{1,2}:\d{2}\s+[AP]M\]/;
const DISCORD_NOISE = new Set([
  "Click to react",
  "Add Reaction",
  "Edit",
  "Reply",
  "Forward",
  "More",
]);

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (!token?.startsWith("--")) continue;
    const [key, inline] = token.slice(2).split("=", 2);
    if (inline !== undefined) out[key] = inline;
    else if (!argv[i + 1] || argv[i + 1].startsWith("--")) out[key] = true;
    else out[key] = argv[++i];
  }
  return out;
}

function isoDate(monthName, day, year) {
  const month = MONTHS[monthName.toLowerCase()];
  if (!month) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dateFromDiscordLine(line) {
  const match = line.match(DISCORD_DATE);
  if (!match) return null;
  const [, month, day, year] = match[1].match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/) ?? [];
  return month ? isoDate(month, day, year) : null;
}

function dateFromStandupLine(line) {
  const match = line.match(STANDUP_DATE);
  return match ? `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}` : null;
}

function dateFromSeparator(line) {
  const match = line.match(DAY_SEPARATOR);
  return match ? isoDate(match[1], match[2], match[3]) : null;
}

function authorFromLine(line) {
  if (!line.includes("—")) return null;
  return AUTHOR_PATTERNS.find(([, pattern]) => pattern.test(line))?.[0] ?? null;
}

function isEmojiOnly(line) {
  return /^(?::[^:\s]+:)+$/.test(line);
}

function cleanContentLine(line) {
  return line.replace(
    new RegExp(
      `\\s*(?:\\(edited\\))?\\s*(?:${WEEKDAYS}),\\s+[A-Za-z]+\\s+\\d{1,2},\\s+\\d{4}\\s+at\\s+\\d{1,2}:\\d{2}\\s+[AP]M\\s*$`,
    ),
    "",
  );
}

function parseMessages(markdown, { initialAuthor = "Ronaldo" } = {}) {
  const records = [];
  let currentAuthor = null;
  let currentDay = null;
  let body = [];
  let seenMessageHeader = false;

  const flush = () => {
    const content = body.join("\n").trim();
    if (content && currentAuthor && currentDay) {
      records.push({ author: currentAuthor, day: currentDay, content });
    }
    body = [];
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const author = authorFromLine(line);
    const messageDay = dateFromDiscordLine(line);
    if (messageDay && line.includes("—")) {
      flush();
      currentAuthor = author;
      currentDay = messageDay;
      seenMessageHeader = true;
      continue;
    }

    if (CONTINUATION.test(line)) {
      flush();
      currentDay = dateFromDiscordLine(line) ?? currentDay;
      continue;
    }

    const separatorDay = dateFromSeparator(line);
    if (separatorDay) {
      flush();
      currentAuthor = null;
      currentDay = separatorDay;
      continue;
    }

    const standupDay = dateFromStandupLine(line);
    if (standupDay) {
      currentDay = standupDay;
      if (!seenMessageHeader) currentAuthor ??= initialAuthor;
    }

    if (DISCORD_NOISE.has(line) || isEmojiOnly(line)) continue;
    if (!currentAuthor || !currentDay) continue;
    body.push(cleanContentLine(line));
  }
  flush();
  return records;
}

function groupByDayAuthor(records, start, end) {
  const byDay = new Map();
  for (const record of records) {
    if (record.day < start || record.day > end) continue;
    const byAuthor = byDay.get(record.day) ?? {};
    (byAuthor[record.author] ??= []).push(record.content);
    byDay.set(record.day, byAuthor);
  }
  return new Map([...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function formatBR(yyyyMmDd) {
  const [year, month, day] = yyyyMmDd.split("-");
  return `${day}/${month}/${year}`;
}

function renderTxt(edition, start, end, presentation, byDay) {
  const lines = [
    "=".repeat(80),
    `TECH SPOTLIGHT #${String(edition).padStart(2, "0")} — STANDUPS DO PERIODO`,
    `Periodo: ${formatBR(start)} - ${formatBR(end)}`,
    `Apresentacao: ${formatBR(presentation)}`,
    "=".repeat(80),
    "",
  ];

  for (const [day, byAuthor] of byDay) {
    lines.push(`Standup (${formatBR(day)})`, "-".repeat(80));
    for (const author of ORDER) {
      const posts = byAuthor[author];
      if (!posts?.length) continue;
      lines.push("", author.toUpperCase(), ...posts);
    }
    lines.push("", "", "", "=".repeat(80), "");
  }
  return lines.join("\n");
}

function selfCheck() {
  const records = parseMessages(
    [
      "Standup (01/01/2026)",
      "primeiro",
      "Click to react",
      "More",
      "Bruno Alves — 1/1/26, 8:00 PMMonday, January 1, 2026 at 8:00 PM",
      "segundo (edited)Monday, January 1, 2026 at 8:01 PM",
      "[8:02 PM]Monday, January 1, 2026 at 8:02 PM",
      "continuação",
    ].join("\n"),
  );
  assert.deepEqual(
    records.map(({ author, day, content }) => ({ author, day, content })),
    [
      { author: "Ronaldo", day: "2026-01-01", content: "Standup (01/01/2026)\nprimeiro" },
      { author: "Bruno", day: "2026-01-01", content: "segundo" },
      { author: "Bruno", day: "2026-01-01", content: "continuação" },
    ],
  );
  assert.equal(
    parseMessages(
      "Standup (01/01/2026)\nRonaldo sem cabeçalho ainda não deve ser atribuído",
      { initialAuthor: null },
    ).length,
    0,
  );
  console.log("✓ parser self-check");
}

const args = parseArgs(process.argv);
if (args.check) {
  selfCheck();
  process.exit(0);
}

const edition = Number(args.edition);
const start = args.start;
const end = args.end;
const presentation = args.presentation ?? end;
const input = path.resolve(ROOT, args.input ?? "mensagens.md");
const output = path.resolve(
  ROOT,
  args.output ?? `edition-${String(edition).padStart(2, "0")}/standup_periodo.txt`,
);

if (!edition || !/^\d{4}-\d{2}-\d{2}$/.test(start ?? "") || !/^\d{4}-\d{2}-\d{2}$/.test(end ?? "")) {
  console.error(
    "Uso: node scripts/parse-standups-file.mjs --edition N --start YYYY-MM-DD --end YYYY-MM-DD [--presentation YYYY-MM-DD] [--input mensagens.md]",
  );
  process.exit(1);
}
if (start > end) throw new Error("--start não pode ser posterior a --end");

const records = parseMessages(fs.readFileSync(input, "utf8"), {
  initialAuthor: args["initial-author"] ?? "Ronaldo",
});
const grouped = groupByDayAuthor(records, start, end);
const selected = [...grouped.values()].reduce(
  (total, byAuthor) => total + Object.values(byAuthor).flat().length,
  0,
);
if (!selected) throw new Error(`Nenhuma mensagem encontrada entre ${start} e ${end}`);

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, renderTxt(edition, start, end, presentation, grouped), "utf8");
console.error(`✓ ${selected} mensagens lidas de ${input}`);
console.error(`✓ Escrito: ${output}`);
