# NOVA · Sci-Fi UI Kit

A neon / HUD themed React component kit built on top of
[**Base UI**](https://base-ui.com) (`@base-ui-components/react`). Base UI gives
each control its accessible, unstyled behaviour; NOVA wraps it in a cohesive
sci-fi skin — chamfered frames, reactive glow, scanline motion, and a single
token file you can re-colour in seconds.

```bash
npm install
npm run dev      # http://localhost:5273  — the showcase demo
npm run build    # type-check + production build
```

## What's inside

30 controls, **each in its own folder** under `src/components/<Name>/`
(`<Name>.tsx` + `<Name>.css` + `index.ts`):

| Input | Feedback | Overlay | Display |
| --- | --- | --- | --- |
| Button | Progress | Tooltip | Avatar |
| Switch | Meter | Popover | Badge |
| Checkbox | Tabs | Preview Card | Toolbar |
| Radio Group | Accordion | Menu | Scroll Area |
| Toggle Group | Collapsible | Context Menu | Separator |
| Slider | | Dialog | Panel (HUD frame) |
| Number Field | | Alert Dialog | |
| Text Field / Field | | Drawer | |
| Select | | Toast | |
| Combobox | | | |

The `App.tsx` demo lists every control in a sidebar index and showcases it in a
`Panel` HUD frame.

Each control earns its place by **purpose**, not just appearance — no
similar-but-worse clones. Menu is an _action_ list (icons + shortcuts) and
ContextMenu reuses its skin on right-click, both distinct from Select's
value-picker; Combobox filters as you type; Preview Card is a hover-only rich
card next to text-only Tooltip and click-driven Popover. Redundant Base UI
parts (`autocomplete`, `menubar`, single `toggle`, `checkbox-group`, `fieldset`,
`form`) are intentionally omitted.

## Theming

All visuals are driven by CSS custom properties defined once in
[`src/theme/tokens.css`](src/theme/tokens.css). Override any `--nova-*` variable
on `:root` to re-skin the whole kit:

```css
:root {
  --nova-primary: #ff8a00;   /* swap cyan → amber */
  --nova-secondary: #00ffa3;
  --nova-radius: 0px;        /* sharper */
  --nova-cut: 14px;          /* bigger corner chamfers */
}
```

Key tokens: `--nova-bg`, `--nova-surface`, `--nova-primary` / `-secondary` /
`-accent`, `--nova-success` / `-warning` / `-danger`, `--nova-text*`,
`--nova-line*` (borders/glow), `--nova-font*`, `--nova-cut` (chamfer size),
`--nova-dur` / `--nova-ease` (motion).

## Portability

Components are intentionally easy to lift into another project:

1. **Copy the component folder** (e.g. `src/components/Slider/`).
2. **Copy `src/theme/tokens.css`** once (or paste the `--nova-*` vars you use).
3. `npm i @base-ui-components/react` and import.

Every CSS rule reads tokens with inline fallbacks
(`var(--nova-primary, #2de2ff)`), so a copied component still renders even
before the token file is present. There is **no CSS-in-JS, no Tailwind, no
runtime styling dependency** — just plain co-located CSS.

```tsx
import { Slider } from "./components/Slider";

<Slider label="Thrust" defaultValue={64} />;
```

## Design notes

- **Chamfered corners** come from a shared `--nova-clip` `clip-path` polygon.
  Because corners are clipped, neon outlines use `filter: drop-shadow()` (which
  follows the clipped shape) instead of a rectangular `box-shadow`.
- **State styling** targets Base UI's data attributes (`[data-checked]`,
  `[data-highlighted]`, `[data-open]`, `[data-starting-style]`, …) and exposed
  CSS vars (`--active-tab-*`, `--accordion-panel-height`, `--anchor-width`).
- Trigger-capable wrappers (e.g. `Button`) `forwardRef` so Base UI can anchor
  tooltips/popovers to them.

Built with React 18 + Vite + TypeScript.
