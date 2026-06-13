---
name: kit-states
description: Dynamic acceptance gate for a theme kit — verify every interaction state renders right (pressed, hovered, focused, a control at its disabled edge, every overlay open), the states the resting page never shows. Sweeps both kits to /tmp/states for review. Run before accepting a kit change, alongside kit-lint. The pair: kit-lint checks the static token/reuse contract; kit-states checks the rendered dynamic states.
---

# kit-states

One principle: **a kit is accepted only when every interaction state renders right — and the states bugs hide in never appear on the resting page.** kit-lint reads the static CSS; this gate renders the dynamic states and you look. It can't be pass/fail — whether a pressed button or a disabled border looks right is a visual judgment — so it sweeps the states to images and you review.

## Run

```
cp .claude/skills/kit-states/states.js /tmp/pw/ && cd /tmp/pw && node states.js [port]
```
(sandbox-disabled; needs the dev server and `/tmp/pw` playwright-core from the screenshot skill). Writes `/tmp/states/<kit>_<state>.png` for both kits.

## What it sweeps

The interaction-only states — none visible at rest:

- **pressed** — a button held down (mousedown), to see the active treatment.
- **edge-disabled** — a stepper driven to its min and its max, where one button disables.
- **every overlay open** — menu, select, combobox, dialog, alert, drawer, popover.
- plus a **full page** per kit, where the static disabled rows (checkbox/switch/select/radio) do render — review those there.

## Review

Read every PNG. Check the dynamic states specifically: pressed depth, hover/focus glow, the disabled control receding correctly, each overlay's shadow/glow/position. Don't sign off on the resting page alone — that was the recurring miss. Capture mechanics (element shots, viewports, reducedMotion, cropping) live in the **screenshot** skill; this skill owns the state checklist and the "render before accepting" gate.

## Extend

When the kit gains an interaction state the sweep doesn't cover, add it to `states.js` — the gate is only as good as its state list.
