---
name: kit-navmenu-colw
description: Asserts every kit's NavigationMenu desktop 2-column dropdown takes its column width from the shared --shell-navmenu-col-w token (各 kit 同值), not a hardcoded px literal — catching the drift where kits used different magic numbers (180/190/210/0) for the same column.
---

# kit-navmenu-colw

The NavigationMenu desktop popup is a two-column grid. The column width is a cross-kit-same dimension, so per core.md §47 (footprint 强制 token 化、绝不裸写) + §65 (各 kit 同值的尺寸走 `src/shared`) it must flow through one source of truth:

```
src/shared/geometry.css   --shell-navmenu-col-w: 210px
  ↓  kit alias (theme/tokens.css)
  --<kit>-navmenu-col-w: var(--shell-navmenu-col-w)
  ↓  component
NavigationMenu.css   grid-template-columns: repeat(2, minmax(var(--<kit>-navmenu-col-w), 1fr))
```

The bug this catches: a kit hardcoding the column in its grid (`minmax(180px, 1fr)`, `minmax(0, 1fr)`, `minmax(210px, 1fr)`) instead of the token — which is how the four kits drifted to 180 / 190 / 210 / 0 for the same column.

## Run

```
sh .claude/skills/kit-navmenu-colw/check.sh
```

Static (grep, no browser). Kit list derived from `src/kits/*`. For each kit it asserts (1) `src/shared/geometry.css` defines `--shell-navmenu-col-w`, (2) the kit's `tokens.css` aliases it, (3) the kit's `NavigationMenu.css` 2-column grid uses `var(--<kit>-navmenu-col-w)`, not a literal.

## Fix a failure

Don't hardcode the column. Add the alias `--<kit>-navmenu-col-w: var(--shell-navmenu-col-w)` to the kit's `tokens.css` and use `repeat(2, minmax(var(--<kit>-navmenu-col-w), 1fr))` in the grid. To change the width for all kits, edit the single `--shell-navmenu-col-w` in `src/shared/geometry.css`.

Proven fail-on-broken: reverting any kit's grid to `minmax(210px, 1fr)` (or `minmax(0, 1fr)`) reports `FAIL — 2-col grid hardcodes the column width`; restoring the token → PASS.
