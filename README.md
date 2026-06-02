# NOVA · Sci-Fi UI Kit

A neon / HUD themed React component kit built on
[**Base UI**](https://base-ui.com) (`@base-ui/react`) — 37 controls, one
re-skinnable token file.

## Run

```bash
npm install
npm run dev       # http://localhost:5273  — the showcase demo
npm run build     # type-check + production build
npm run preview   # serve the production build
```

Requires Node 18+.

## Stack

React 18 · Vite · TypeScript · plain co-located CSS (no Tailwind, no CSS-in-JS).
Components live in `src/components/<Name>/`; theme tokens in
`src/theme/tokens.css` (override any `--nova-*` on `:root` to re-skin).

## Details

See **[PROMPT.md](PROMPT.md)** — the authoritative spec for the design
language, tokens, chamfer / glow system, and per-component notes. This README
stays intentionally minimal; PROMPT.md is the single source of truth for UI
details.
