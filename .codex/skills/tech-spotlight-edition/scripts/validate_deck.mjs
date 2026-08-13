#!/usr/bin/env node
import fs from "node:fs";
import vm from "node:vm";

const file = process.argv[2];
if (!file) {
  console.error("Uso: validate_deck.mjs edition-NN/spotlight.html");
  process.exit(2);
}

const html = fs.readFileSync(file, "utf8");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
for (const [i, source] of scripts.entries()) {
  new vm.Script(source, { filename: `${file}#script-${i}` });
}

const slides = (html.match(/<section class="slide/g) ?? []).length;
const sidebar = [...html.matchAll(/class="side(?: active)?" data-i="(\d+)"/g)].map((m) => Number(m[1]));
const labelsMatch = html.match(/const labels=\[(.*?)\]/s);
if (!labelsMatch) throw new Error("const labels não encontrado");
const labels = labelsMatch[1].split(",").filter(Boolean).length;

if (new Set(sidebar).size !== sidebar.length) throw new Error("índices duplicados na sidebar");
if (slides !== sidebar.length || slides !== labels) {
  throw new Error(`contagens divergentes: slides=${slides}, sidebar=${sidebar.length}, labels=${labels}`);
}
if (!html.includes("cards-balance.md")) throw new Error("cards-balance.md ausente");
if (html.includes("next-steps.todo") && !html.includes("Próximos passos")) {
  throw new Error("next-steps.todo sem conteúdo de próximos passos");
}

const cardsMatch = html.match(/const cards=(\[[\s\S]*?\]);\nconst cardLabels/);
if (cardsMatch) {
  const cards = JSON.parse(cardsMatch[1]);
  const concluded = cards.filter((c) => c[3] === "done" || c[3] === "qa").length;
  const open = cards.length - concluded;
  if (cards.length === 0) throw new Error("ledger vazio");
  const owners = new Set(cards.map((c) => c[4]));
  const matches = (c, filter) => {
    if (filter === "all") return true;
    if (filter === "done") return c[3] === "done" || c[3] === "qa";
    if (filter === "open") return c[3] !== "done" && c[3] !== "qa";
    if (owners.has(filter)) return c[4] === filter;
    return c[2] === filter;
  };
  for (const filter of ["all", "done", "open", "enhancement", "bug", "issue", ...owners]) {
    if (cards.filter((c) => matches(c, filter)).length === 0) throw new Error(`filtro vazio: ${filter}`);
  }
  console.log({ file, slides, labels, cards: cards.length, concluded, open });
} else {
  console.log({ file, slides, labels });
}
