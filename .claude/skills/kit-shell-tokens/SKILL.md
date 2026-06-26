---
name: kit-shell-tokens
description: Asserts the shared shell constants (各 kit 同值) flow from --shell-* in src/shared/geometry.css, never a raw literal in a kit. Covers the z-layer ladder (--shell-z-dropdown..toast + header + switch) and the shell-frame geometry from app.md §125 (max-width 1320, sidebar 232, grid/panel gaps, shell/hero/header paddings, hero margin-bottom). Sibling of kit-drawer-cap / kit-navmenu-colw.
---

# kit-shell-tokens

Run: `sh .claude/skills/kit-shell-tokens/check.sh`

Two classes of cross-kit constant live here:

1. **Z-layer ladder.** Every kit stacks the same tiers in the same order
   (dropdown < menu < tooltip < backdrop < overlay < toast). The numbers are a
   cross-kit constant — kits once diverged (nova/abyss on 1200–1500, brass/bauhaus
   on 50–100), which let the bottom-right kit switcher (z 10000) sit above every
   overlay and cover a right/bottom Drawer's footer. The ladder now lives in
   `src/shared/geometry.css` as `--shell-z-*`; each kit aliases
   `--<kit>-z-<tier>: var(--shell-z-<tier>)`; the header uses `--shell-z-header`;
   the floating switcher (`src/shell/Shell.css`) demotes to `--shell-z-switch`
   (below `--shell-z-backdrop`, so any open modal covers it).

2. **Shell-frame geometry (app.md §125).** max-width 1320, sidebar column 232,
   grid gap 26, panel gap 18, shell padding (+mobile), hero padding (+mobile),
   hero margin-bottom 26, header padding (+mobile) — all identical across kits,
   so each is a `--shell-*` token, never a literal in a kit's `App.css`.

The check FAILS if a kit defines a literal z-tier (instead of `var(--shell-z-*)`),
if the header z / switcher z isn't tokenized, or if any §125 geometry literal
reappears raw in an `App.css`. This is the gate for the recurring "怎么不写
token / 这种数值统一啊" class — same family as `kit-drawer-cap` and
`kit-navmenu-colw`. Kit list is derived from `src/kits/*/`.
