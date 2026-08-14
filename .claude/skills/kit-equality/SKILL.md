---
name: kit-equality
description: Cross-kit pinned-value conformance, one browser pass, five checks — (1) the 各 kit 同值 numbers (z-layer ladder, modal/drawer widths + viewport caps, NavigationMenu column, shell-frame geometry from app.md) are IDENTICAL across all kits, (2) every kit's rendered sidebar matches the canonical 面板清单 pinned in prompt/app/app.md, (3) every kit's anchored-popup list shows exactly 7 rows before scrolling — the invariant is the ROW COUNT, not the pixel height, so the gate opens a Select and divides the resolved popup-h by the rendered row height (a kit whose list-item-h drifts from its real row height silently shows 8 or 9 rows and every static gate stays green), (4) 行不贴框 — inside that open popup the rendered rows keep ≥1px of lining to the frame's inner edge on all four sides, where the frame includes ink painted INSIDE the box (a zero-blur negative-y inset band, hanabi's 底缘阶影带): a lining that merely equals the band width leaves the last row sitting ON the band and every static gate stays green, and (5) 双层 frame 的墨在宿主盒内 — a frame primitive whose `::before` pokes past the padding box must have host border covering that overhang, so a ring drawn on a pseudo-element cannot land outside the element's own box while spacing and hit-testing keep going by the box. There is no src/shared — each kit writes its own literals — so this gate is what keeps them from drifting. Run after accepting or QAing a kit. (Merges the former kit-shell-tokens + kit-panels gates.)
---

# kit-equality

A kit is authored from scratch with NO shared `src` — each writes its own literals for the values that must nonetheless be identical kit-to-kit (the z ladder, modal/drawer widths + caps, NavigationMenu column width, shell-frame geometry) and renders its own sidebar from its own `SECTIONS`. Nothing at runtime forces those to agree; this gate does, in one browser pass:

1. **各 kit 同值 numbers identical** — reads each kit's `--<kit>-z-*` / `-dialog-w` / `-drawer-*` / `-navmenu-col-w` tokens plus computed shell/header/hero/grid geometry, and FAILs if any dim differs across kits. The value is pinned in spec (components.md / app.md §布局); the fix is to write that same literal in every kit.
2. **sidebar matches the 面板清单** — parses the canonical manifest from `prompt/app/app.md §面板清单` and FAILs if any kit's rendered sidebar (group order + panel id + 3-letter code) diverges. The SPEC is the source of truth, so a drift hitting all kits together still FAILs. The demo shows only the panels the manifest lists; how many components the library has is `components/`'s business.
3. **7 rows before scrolling** — opens the demo Select and divides resolved `popup-h` by the rendered row pitch; FAILs unless the quotient is 7. The invariant is the row count (components.md §4.2), not a pixel height.
4. **行不贴框** — on the same open popup, measures the visible rows' box against the popup frame's inner edge on all four sides and FAILs if any lining is under 1px. The inner edge subtracts ink painted inside the box: a zero-blur negative-y inset band (底缘阶影带) counts as frame, so a lining that only equals the band width reads as 0 — the last row is sitting on the band.
5. **双层 frame 的墨在宿主盒内** — for every element carrying a frame primitive (`-frame` / `-plate` / `-surface`) whose `::before` is absolutely positioned, each side's overhang past the padding box (a negative inset) must be covered by that side's border width. A kit that paints its ring on a `::before` at `inset: -edge` needs a matching transparent border on the host; drop the border (a component's own `border: 0` beats the primitive at equal specificity) and the ring lands outside the element's box — neighbours' gaps and hit-testing go by the box, so spacing reads wrong while every static gate stays green. A ring drawn INSIDE the box (background + `::before` inset `+edge`) passes with no border at all — the check is the principle (ink within the box), not the mechanism. The primitive's own modifier classes (`-surface--torn`) are exempt: a deliberate bleed is that variant's business.

## Run

```
npm run dev     # dev server must be up on :5273 (the gate drives the live page)
node .claude/skills/kit-equality/check.cjs [port]
```

Kit list comes from `lib/gate.cjs kitsOf()` — a `src/kits/` directory scan, never hardcoded. Exit 1 if any check fails.

## Reading the output

`FAIL <dim> differs` = a 各 kit 同值 number diverged — pin it: write the same literal in every kit's tokens/CSS. `FAIL <kit> diverges` = that kit's `SECTIONS` array doesn't match the manifest — make it match verbatim (or, if the manifest itself changed, that's an app.md edit). Run alongside kit-structure + kit-lint when accepting a kit.
