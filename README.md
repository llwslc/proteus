# Base UI Kits · NOVA / ABYSS

Two re-skinnable React component kits built on
[**Base UI**](https://base-ui.com) (`@base-ui/react`) — 37 controls each,
sharing the same accessible geometry under two very different design languages:

- **NOVA** — sci-fi / neon HUD. Electric cyan on deep space, crisp chamfers,
  scanline ambient.
- **ABYSS · 溺城** — drowned R'lyeh / 克苏鲁. Bioluminescent green on abyssal
  black, eroded octagonal seals, deep-sea caustic ambient.

A thin shell switches between them (floating pill, bottom-centre); each kit is
lazy-loaded and its page chrome is scoped under `html[data-kit="…"]`, so the two
ambient worlds never collide.

## Run

```bash
npm install
npm run dev       # http://localhost:5273  — the showcase (last kit is remembered)
npm run build     # type-check + production build
npm run preview   # serve the production build
```

Requires Node 18+.

## Stack

React 18 · Vite · TypeScript · plain co-located CSS (no Tailwind, no CSS-in-JS).

```
src/
  main.tsx            entry — sets html[data-kit], renders the shell
  shell/              kit switcher + shared reset
  kits/
    nova/             components/ · theme/ · App — re-skin via --nova-* tokens
    abyss/            components/ · theme/ · App — re-skin via --abyss-* tokens
```

Each kit re-skins entirely from its `theme/tokens.css` (palette, eroded/​crisp
clip palette, fonts, glow, motion) plus `theme/{global,effects,typography}.css`.
The two component layers are the same Base UI wiring under different class
prefixes (`.nova-*` / `.abyss-*`).

## Adding a kit

The shell is registry-driven, so a new theme is one entry plus a folder that
follows the contract — nothing else hardcodes a kit id.

1. **Scaffold** `src/kits/<id>/` — quickest start is to copy an existing kit and
   rename its namespace end-to-end (lowercase):
   ```bash
   cp -R src/kits/abyss src/kits/<id>
   find src/kits/<id> -type f \( -name '*.ts*' -o -name '*.css' \) -print0 \
     | xargs -0 perl -pi -e 's/abyss/<id>/g'
   ```
   This gives you all 37 controls wired and namespaced; the design work then
   lives entirely in `src/kits/<id>/theme/` (recast tokens/effects/global/
   typography) plus any per-component flourishes.
2. **Gate the chrome** — confirm `theme/global.css` scopes every page-level rule
   (body / html ambient, scrollbars, `::selection`) under
   `html[data-kit="<id>"]`, so it never collides with other kits.
3. **Register** — add one line to `src/kits/registry.ts`:
   ```ts
   { id: "<id>", label: "<NAME>", tag: "<subtitle>", load: () => import("./<id>") }
   ```

`KitDef.load` is the only place an import lives; the switcher, the persisted
preference, and the no-flash `data-kit` in `main.tsx` all derive from the list.

## Details

See **[PROMPT.md](PROMPT.md)** — the authoritative spec for NOVA's design
language, tokens, chamfer / glow system, and per-component notes. ABYSS mirrors
that architecture 1:1, recast for deep-sea cosmic horror. This README stays
intentionally minimal.
