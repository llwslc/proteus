---
name: kit-glyph-center
description: Asserts a leading marker/icon glyph on a title (modal titles, fieldset legends, accordion/collapsible triggers, panel titles) is vertically centered on its text across every kit. Catches the recurring "title 不居中 / sigil floats high" class.
---

# kit-glyph-center

A title with a leading glyph (○/▸/◆/☀ sigil, key, icon) must have that glyph's **ink** centered on the title text. This kept regressing because nothing measured it and a by-hand check of the bounding *box* gives a false pass — a marker span whose box is inflated by line-height centers as a box while the glyph inside floats high (see memory `glyph-centering-measure-ink-not-box`).

## Run (in place, dev server on :5273)

```
node .claude/skills/kit-glyph-center/check.cjs [port] [kit]
```

Kits derived from the live switcher (`.shell-switch__btn[data-kit-id]`).

## What it measures

At **reduced-motion** (rest state — so a one-shot intro animation like abyss's drawer key-turn isn't mistaken for a misalignment), for every title-like element (`h1-h4`, `legend`, `*title*`, `*legend*`, `*trigger*`, `*header*`) with a leading glyph child: compares the glyph **ink** center (the inner `svg` rect if present, else the marker rect) to the title text's `Range` center. FAIL if |Δ| > 1.6px. Opens Dialog/AlertDialog/Drawer so modal titles are covered too.

Two non-obvious requirements baked in, both learned from misses: measure **ink not box** (box-center hid the bauhaus sigil offset), and measure **at rest** (the abyss drawer key reads −2.7px mid-animation but 0 at rest). Proven fail-on-broken: against the pre-fix bauhaus sigil it flags all three modal titles at −3.5px.
