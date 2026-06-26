---
name: theme-doc-sync
description: Drift gate between the theme catalog (prompt/theme/<kit>.md) and the kit's real tokens.css. The catalog cites concrete token name+value pairs (`base #050a12`); when a token is renamed or revalued in code, the doc is a separate file with no compiler tying it to the code, so it silently goes stale — a renamed token still cited by its old bare name, or a phantom value the doc lists that was never in code. The per-token prefix grep used during a rename misses these because the catalog writes tokens BARE (`bg`), not `--<kit>-bg`. This asserts every cited name+hex exists in tokens.css. Run after renaming/revaluing any token, editing a theme doc, or accepting a kit.
---

# theme-doc-sync

`prompt/theme/<kit>.md` is the per-theme palette catalog — it lists concrete
tokens as `` `<name> #<hex>` `` (e.g. `` `base #050a12` ``, `` `stone-raised
#101b16` ``). Nothing links that prose to the code, so a token renamed or
revalued in `src/kits/<kit>/theme/tokens.css` leaves the doc stale and no gate
notices. This recurs (it's why `bg`/`bg-2` lived on in the docs after the code
became `base`/`base-raised`, and why bauhaus listed a phantom `bg-2 #e3dac3` that
was never a token). This gate cross-checks the two.

## What it asserts

For every kit (list derived from `src/kits/*/theme/tokens.css` ∩ `prompt/theme/
*.md`, never hardcoded), each `` `<name> #<hex>` `` citation in the doc must have
`--<kit>-<name>: …#<hex>…` in that kit's `tokens.css`. Two failure modes:

- **stale name** — `cited `bg #050a12` — no --nova-bg in tokens.css` (the token
  was renamed in code; the doc still uses the old name).
- **phantom / wrong value** — `` `base`: doc #999999, code #15110b `` (the doc's
  value isn't what the code defines — a drifted or never-real value).

Only `` `name #hex` `` pairs **in one code span** with a **full** name (starts
with a letter) are checked — this deliberately skips suffix shorthands
(`` `-bright #050505` ``) and accent families whose hex sits in a separate span
(`primary 群青蓝 `#1a4fd6 / …``), neither of which is a full-name claim. So it
covers the background/surface/stone palette (where drift actually bites) with
zero false positives, not every colour mentioned.

## Run

`node .claude/skills/theme-doc-sync/check.cjs` (run in place; no dev server). Exit
1 on any drift. Self-test: reintroduce an old name or a wrong hex in any
`prompt/theme/<kit>.md` and it must report the drift; revert and it passes —
proving it is not a silent no-op.

Pair with kit-lint (token contract) + prompt-lint (doc register) when accepting a
kit or editing tokens/theme docs; this one ties the two together.
