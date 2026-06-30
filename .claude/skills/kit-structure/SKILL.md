---
name: kit-structure
description: Code-structure gate for the theme kits — the architectural invariants the other gates don't cover. Checks cross-kit ISOLATION (no kit imports from or references another kit — the "never copy a sibling" rule), component-set PARITY (same components in every kit), module COMPLETENESS (every component has .tsx + index.ts and is re-exported by the top barrel), export-surface parity (reports where a kit's component API diverges from its siblings), composition parity (the same Base UI component wired the same way across kits — behavioral props + selected-indicator side), and component CSS ISOLATION (a component uses only its own classes + theme primitives, never imports or reuses another component's CSS). Run when accepting or restructuring a kit.
---

# kit-structure

"Code structure" is more than dead code. The gates split it up:

| dimension | gate |
|---|---|
| cross-kit isolation (no sibling imports/refs) | **kit-structure** |
| component-set / module / barrel completeness | **kit-structure** |
| export-surface parity across kits | **kit-structure** (advisory) |
| composition parity (props + indicator side) | **kit-structure** |
| component CSS isolation (own + theme classes only) | **kit-structure** |
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
- **composition parity (FAIL)** — the same Base UI component must be wired the same way across kits: a behavioral prop (`alignItemWithTrigger`, `modal`, `openOnHover`, `loop`, `multiple`, …) set or valued differently across kits, or a selected-indicator (`ItemIndicator`) rendered on a different side of the item text. The export surface can match while the *behavior* drifts; skin (color/shape/motion) is free to differ, interaction is not.
- **component CSS isolation (FAIL)** — a component may use only the classes it defines in its own CSS plus theme primitives (`<kit>-surface`, `<kit>-list-item`, `<kit>-menu__*`, …). Importing another component's stylesheet (`import "../Menu/Menu.css"`) or applying a class that lives in another component's CSS is the coupling this forbids: a shared recipe belongs in `theme/effects.css`, where every component can reference it, not inside one component reaching into another. Derived from the real component/theme files — no hardcoded class list.
