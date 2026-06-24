---
name: kit-naming
description: Cross-kit class-naming consistency. For each component shared by all kits, the dominant block class (de-kit-prefixed) should be the same across kits — catches the divergence kit-lint can't see (it checks token FORMAT within a kit, never whether names match across kits).
---

# kit-naming

The convention is `<kit>-<component>__<part>` — so the same component should carry the same block name in every kit (only the `<kit>-` prefix differs). kit-lint checks token *format* within one kit (everything tokenized, no raw values, no dead tokens, dimension suffixes) but has **no cross-kit name check** — which is how NavigationMenu shipped as `navmenu` (nova/abyss) vs `nav` (brass/bauhaus), with a matching `--<kit>-nav-w` vs nothing, and nothing flagged it.

## Run

```
node .claude/skills/kit-naming/check.cjs
```

Derives kits from `src/kits/*`. For each component dir present in all kits, computes the dominant `<kit>-<block>` class stem per kit (token refs `--<kit>-…` and shared primitives like `plate`/`lift`/`surface`/`list` excluded) and reports any component whose block name isn't identical across kits.

## Reading the output

`DIVERGENT` = the block name differs across kits. Most are real ("unify to the component name"), but some may be **intentional** — a deliberate motif name (abyss `eye` for Switch), a shared block (brass/bauhaus `modal` across Dialog/Drawer/AlertDialog), or reuse (brass `seg` for Menubar). So it's a **review** gate: confirm intent (git-blame) before renaming, per memory `audit-respect-intentional-exceptions`. Proven catch: against pre-1a63744 it flags `NavigationMenu: nova=navmenu brass=nav`.
