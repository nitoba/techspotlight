---
name: tech-spotlight-edition
description: Create or update a Web Team Tech Spotlight edition in this repository from standup markdown, previous editions, and Azure DevOps cards. Use for requests to prepare an edition, parse a period, build the HTML IDE-style deck, update the presentation script, reconcile cards by type/state/owner, add Lightning or next-steps sections, or establish the protocol for future editions.
---

# Tech Spotlight Edition

Use this skill to produce the next Web Team presentation as a fact-based, reusable
edition. Work inside the repository; do not create a global skill or unrelated project
files.

## Inputs and source order

Read these sources before editing:

1. `tech-spotlight-web-SKILL.md` for the established presentation contract;
2. the previous edition's `spotlight.html` and `roteiro_conducao.md` for visual and
   narrative continuity;
3. the new period's `standup_periodo.txt` or copied Markdown messages;
4. Azure DevOps work items for the `AGROTRACE` project and `Web` team when credentials
   are available.

Treat standups as evidence of what was worked on and Azure DevOps as the source for
card title, type, current state, area and current assignee. When they disagree, keep
the card in the ledger and flag the discrepancy in the script rather than inventing a
resolution.

## Workflow

### 1. Establish the period

- Record `edition-NN`, period start/end, presentation date and presenters.
- Preserve the existing edition folder naming and standalone HTML pattern.
- Parse copied messages before summarizing them; never use a pasted chat block as an
  unverified metric.
- Keep the original standup text in `edition-NN/standup_periodo.txt`.

### 2. Build the card ledger

Use the Azure workflow in [references/azure-cards.md](references/azure-cards.md). Query
the date range with `System.ChangedDate`, `System.TeamProject = 'AGROTRACE'`, and the
team area path `AGROTRACE\\Web`. Union the result with card IDs explicitly present in
the standups but missing from the query (area paths can change); fetch those IDs with
`az boards work-item show` and mark them as standup evidence.

Normalize the ledger to:

```text
id, title, original_work_item_type, presentation_label,
original_state, presentation_state, current_assignee, source
```

Use these presentation labels unless the Azure type is more specific:

- `Enhancement` → `MELHORIA`
- `Regression Bug` or `Bug` → `BUG`
- `Production Issue` → `INCIDENTE`
- preserve unknown types and explain them instead of silently relabeling them.

For this team's protocol, count `Done` and `Test QA` as concluded for the presentation.
Render QA as `CONCLUÍDO · QA` so the original state remains visible. Count `New`,
`Committed`, and other unfinished states as open unless the user explicitly changes
the rule. Group by current Azure assignee for the numeric owner balance; mention standup
collaborators separately.

### 3. Create the deck structure

Start from the previous deck's CSS, navigation, remote-control code and IDE theme.
Use one file-like slide per meaningful story; do not compress a large contributor's
work into one overloaded page. The default sequence is:

1. `README.md` — thesis and presenters;
2. `runtime-budget.ts` — timebox;
3. `cards-balance.md` — filterable card ledger;
4. Ronaldo spotlight;
5. Bruno spotlight;
6. two to four thematic Thielson slides when his work spans different domains;
7. Bruno onboarding or the next main story;
8. optional Lightning slide;
9. `engineering-wins.md`;
10. `next-steps.todo`;
11. `exit.ts`.

Keep sidebar `data-i`, slide count, labels, icons, dots and counter synchronized. The
card ledger must support `Todos`, `Concluídos`, `Em aberto`, type filters and owner
filters. Implement filtering with an explicit predicate; do not rely on ambiguous
`&&`/`||` precedence:

```js
function matches(c, filter) {
  if (filter === 'all') return true;
  if (filter === 'done') return c.state === 'done' || c.state === 'qa';
  if (filter === 'open') return c.state !== 'done' && c.state !== 'qa';
  if (owners.includes(filter)) return c.owner === filter;
  return c.type === filter;
}
```

### 4. Tell technical stories, not ticket lists

For each spotlight, write `problem → decision/implementation → result → demo or
evidence`. Use real card IDs and names. Prefer a code-shaped excerpt, flow or data
contract that explains the decision. Do not claim latency, percentage, completion or
customer impact unless the source records it; say that the metric is unavailable.

When a contributor has many unrelated activities, group by theme. For example,
Thielson's period can use separate pages for Cargill pipeline, diagnostics/ranking,
maps/exportations, and data integrity/importations. Keep each page short enough to
present and put the complete card list in `cards-balance.md`.

### 5. Add optional sections deliberately

Add a Lightning section only when the user asks for one or a structural lesson is worth
sharing. Keep it to one idea and at most five minutes. The monorepo example is:

- independent `package.json` files per app/library;
- `pnpm-workspace` controls package installation and relationships;
- Docker images install only the dependencies used by each app;
- apps can evolve without forcing a shared library version on every consumer.

Place `next-steps.todo` immediately before `exit.ts` when the user provides concrete
priorities. Preserve the exact priorities, assign an owner only when known, and keep
them directional rather than promising completion.

### 6. Make Engineering Wins evidence-based

Use three concise recognitions tied to real work, normally one for performance/product
impact, one for platform/reuse, and one for reliability/collaboration. Include relevant
card IDs, named contributors and a collaboration note (for example DEV/QA, deploy,
Jasper, DevOps, Mobile, Checkmilk or Biodiesel). State the ledger balance honestly,
including the configured QA-as-concluded rule and remaining open cards.

## Default 30-minute timebox

Use this only as a starting point; adapt it when the number of stories changes:

| Time | Block |
|---|---|
| 00:00–03:00 | README, runtime and cards balance |
| 03:00–08:00 | Ronaldo |
| 08:00–12:00 | Bruno |
| 12:00–18:00 | Thielson thematic pages |
| 18:00–22:00 | Bruno onboarding or main story |
| 22:00–26:00 | Optional Lightning |
| 26:00–27:00 | Engineering Wins |
| 27:00–29:00 | Next steps |
| 29:00–30:00 | Exit and questions |

## Required deliverables

- `edition-NN/spotlight.html`;
- `edition-NN/roteiro_conducao.md`;
- `edition-NN/standup_periodo.txt`;
- optional raw/query evidence only when it helps reproduce the ledger.

Do not add dependencies for the deck. Reuse the existing HTML/CSS/JavaScript pattern.

## Validation

Run the bundled validator after editing:

```bash
node .codex/skills/tech-spotlight-edition/scripts/validate_deck.mjs edition-NN/spotlight.html
git diff --check
```

The validator must compile every inline script, verify that slide/sidebar/label counts
match, reject duplicate navigation indices, require `cards-balance.md`, and require
`next-steps.todo` when the protocol includes next steps. Also run a small self-check for
ledger totals and every filter (all/done/open/type/owner) whenever a `const cards` array
is present. If a browser connector is available, open the deck and visually inspect the
ledger, Lightning, wins, next steps and exit slides; otherwise report structural
validation and do not claim visual QA.
