---
name: kit-structure
description: Code-structure gate for the theme kits — the architectural invariants the other gates don't cover. Checks cross-kit ISOLATION (no kit imports from or references another kit — the "never copy a sibling" rule), component-set PARITY (same components in every kit), module COMPLETENESS (every component has .tsx + index.ts and is re-exported by the top barrel), and export-surface parity (reports where a kit's component API diverges from its siblings). Run when accepting or restructuring a kit.
---

# kit-structure

"Code structure" is more than dead code. The gates split it up:

| dimension | gate |
|---|---|
| cross-kit isolation (no sibling imports/refs) | **kit-structure** |
| component-set / module / barrel completeness | **kit-structure** |
| export-surface parity across kits | **kit-structure** (advisory) |
| dead classes / keyframes / exports | kit-deadcode |
| dead tokens / repeated recipe / raw values | kit-lint |
| anti-reskin (visual layer authored, not copied) | kit-distinct |
| functional/a11y selector parity | kit-parity |
| rendered geometry (overlap/collapse/clip) | kit-visual |
| comments / test cruft | diff-hygiene |

## Run it

```
node .claude/skills/kit-structure/check.cjs            # all kits
DETAIL=1 node .claude/skills/kit-structure/check.cjs   # also list type-only divergences
```

Kits discovered from `src/kits/*/components`. Exit 1 on a STRUCTURAL FAIL.

## What it asserts

- **cross-kit isolation (FAIL)** — a kit file importing a path that contains another kit's id, or referencing another kit's `<kit>-…` class/token. This is the playbook's hard rule: a kit is authored from scratch, never copied from a sibling.
- **component-set parity (FAIL)** — a component dir present in some kits but not all.
- **module completeness (FAIL)** — a component missing its `.tsx` or `index.ts`, or not re-exported by `components/index.ts` (the 3-place barrel rule).
- **export-surface parity (REVIEW)** — a value/type export present in some kits but not all. Advisory, not a fail: a from-scratch kit may legitimately compose a component differently (e.g. a compound `AvatarImage`/`AvatarFallback` vs a prop-based Avatar). Use it to spot *accidental* API drift; a dead divergent export is kit-deadcode's job.
