---
name: kit-dropdown-width
description: Asserts every kit's field-dropdown family (Select, Combobox, Autocomplete) opens its popup at the visible field width, not the bare inner input. Catches the "two widths" class where a popup anchors to the input instead of the whole field.
---

# kit-dropdown-width

The field-dropdown family — Select, Combobox, Autocomplete — must all open their popup flush with the visible field (same width), the way Select always has. Base UI's Positioner anchors a Combobox/Autocomplete popup to the `InputGroup` if one is registered, else to the bare `<input>` — so a plain `<div>` field wrapper silently makes the popup narrower than the field ("两个宽度"). See memory `baseui-combobox-inputgroup-anchor`.

## Run (in place, dev server on :5273)

```
node .claude/skills/kit-dropdown-width/check.cjs [port] [kit]
```

Kits are derived from the live switcher (`.shell-switch__btn[data-kit-id]`) — never hardcoded. Demo panel ids (`#select`, `#combobox`, `#autocomplete`) and a visible popup whose class contains `popup` are the only structural assumptions.

## What it measures

Per kit, per component: opens the popup, compares its width to the **field box** — for Select the trigger, for Combobox/Autocomplete the input's wrapper element (the `InputGroup`). FAIL if they differ by > 3px. The wrapper stays full-width even in the broken state (the frame is on it however it's drawn — border, pseudo, box-shadow), so a regression to a bare-input anchor shows up as popup < field. Width comes from the wrapper, never from paint detection — a paint heuristic silently skipped abyss (frame drawn via `::before`), turning the gate into a no-op there. `bare-input` is printed alongside for context (the broken popup collapses toward it).

PASS = every popup equals its field width. Any FAIL = that popup is anchoring to the inner input, not the field.
