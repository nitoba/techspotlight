# Azure DevOps card ledger

Use the Azure DevOps CLI from the repository root. The documented organization and
project for this repository are:

```bash
ORG=https://dev.azure.com/ibsbiosistemico
PROJECT=AGROTRACE
```

The Web team uses the area path `AGROTRACE\\Web`. Confirm it before querying:

```bash
az boards area team list \
  --project AGROTRACE --team Web --organization "$ORG" --output json
```

Query the period with date precision supported by WIQL:

```bash
az boards query \
  --organization "$ORG" \
  --wiql "SELECT [System.Id], [System.WorkItemType], [System.Title], [System.State], [System.AssignedTo], [System.AreaPath], [System.Tags], [System.CreatedDate], [System.ChangedDate] FROM workitems WHERE [System.TeamProject] = 'AGROTRACE' AND [System.AreaPath] UNDER 'AGROTRACE\\Web' AND [System.ChangedDate] >= 'YYYY-MM-DD' AND [System.ChangedDate] < 'YYYY-MM-DD' ORDER BY [System.Id]" \
  --output json
```

The end date is exclusive. For a period ending 12/08, use `< '2026-08-13'`.
Do not put a time component in WIQL date literals; Azure Boards rejects it under date
precision.

## Reconcile standups

Extract every `#12345` from `standup_periodo.txt`, deduplicate IDs, and compare with
the query result. For IDs missing from the area query, fetch them directly:

```bash
az boards work-item show --id 12345 --organization "$ORG" --output json
```

Keep a source marker such as `azure-area`, `azure-direct`, or `standup-only`. A card
mentioned in a standup can remain part of the presentation even if its area changed;
show the discrepancy in the notes.

## Classification used by the presentation

| Azure type | Label | Concluded? |
|---|---|---|
| Enhancement | MELHORIA | according to state |
| Regression Bug / Bug | BUG | according to state |
| Production Issue | INCIDENTE | according to state |
| Done | CONCLUÍDO | yes |
| Test QA | CONCLUÍDO · QA | yes for presentation |
| Committed / New | original state | open |

The presentation's “owner” count uses `System.AssignedTo.displayName`. It is not a
claim that only that person contributed. Use standup collaboration lines for the
human narrative.

## Reproducible summary

For each query result, retain at least:

```text
id, title, work_item_type, state, assignee, area_path, changed_date
```

Verify totals before embedding them in HTML. For the current Edition 07 protocol,
the expected shape after the QA rule is 34 total, 29 concluded, 5 open, with 26
Enhancements, 6 Regression Bugs and 2 Production Issues. Future periods must be
recomputed; never copy these numbers blindly.
