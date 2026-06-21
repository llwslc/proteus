---
name: kit-parity
description: Cross-kit FUNCTIONAL coverage gate — flag a theme kit that is missing a small functional/a11y rule its siblings have (e.g. `:empty` to collapse an empty dropdown block, `text-overflow` ellipsis on long values, a `prefers-reduced-motion` guard, disabled-state cursor). kit-lint/kit-distinct/kit-states all PASS such a kit because the gap only shows when someone uses it. Run when accepting or QAing a kit, especially one authored from scratch. Usage targets all kits, or one kit id.
---

# kit-parity

A kit can pass kit-lint (token hygiene), kit-distinct (anti-reskin) and kit-states
(rendered states) while still **missing a small functional/a11y rule that its
siblings all have** — the gap is invisible at rest and only surfaces when the kit
is used (a long value overflows, an empty dropdown shows a blank row, animations
ignore reduced-motion). This gate diffs functional-selector coverage across the
live kits and flags a token present in 2+ kits but absent in another.

## Run it

```
sh .claude/skills/kit-parity/check.sh            # audit every kit (full divergence report)
sh .claude/skills/kit-parity/check.sh <kit-id>   # only that kit's gaps (use when QAing one kit)
```

Kits are discovered from `src/kits/*/components` — never hardcoded, so new kits are
covered automatically. Exit 0 = parity; exit 1 = GAPs printed.

## What it checks

- **Theme-level / a11y** (kit-wide): `prefers-reduced-motion`, `::-webkit-scrollbar`,
  `scrollbar-width`. A kit missing one the others have is flagged.
- **Per-component functional selectors** (component dir + shared theme): `:empty`,
  `text-overflow`, `::placeholder`, `:focus-visible`, `[data-highlighted]`,
  `[data-disabled]`, `[data-selected]`, `:disabled`, for every component present in
  all kits.

## Reading the output

Each `GAP` is a **candidate**, not an automatic defect. Either:
- **fix it** — add the missing rule (it's almost always a real omission in a
  from-scratch kit), or
- **document it as an intentional exception** — a kit may legitimately not need a
  rule, or may handle the same concern via a different selector. Example: NOVA marks
  the selected tab with `[data-active]` while ABYSS/BRASS use `[data-selected]`, so a
  full-kit run reports a Tabs gap for NOVA that is a naming divergence, not a missing
  feature. Per-kit runs (`check.sh <kit>`) scope to one kit and skip the others'.

Pair with kit-lint + kit-distinct + kit-states when accepting a kit.
