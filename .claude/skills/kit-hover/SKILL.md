---
name: kit-hover
description: Field-family hover contract gate — the five field controls (Input, Select trigger, Combobox, Autocomplete, NumberField) must hover as ONE unit per kit, and a chevron must never carry its own hover. Real-mouse per kit on a fresh page (CDP forcePseudoState lies about pseudo-element hover and contaminates later reads), it snapshots the whole panel subtree's paint props (incl ::before/::after) and asserts (1) rest→hover response is uniform across the five controls within a kit — all respond or all stay quiet, the archetype itself is theme freedom — and (2) the panel renders IDENTICALLY whether the mouse is on the input area or on the chevron, which kills chevron-only hover rules (the abyss/riot/nocturne color-only leak class that property-filtered greps missed twice). Run after touching any field control's CSS or a theme's effects.css.
---

# kit-hover

```
node .claude/skills/kit-hover/check.cjs [port] [kit] [--prove]
```

Contract: components.md §5 字段族条款. Kits come from `lib/gate.cjs kitsOf()` (`src/kits/` scan). Per kit it drives a real mouse to each field control's input area, diffing a paint-prop snapshot of the whole demo panel subtree (color/bg/border/shadow/filter/backgroundImage + ::before/::after) between rest and hover; the five booleans must agree. For Select and Combobox it then compares the panel snapshot with the mouse on the input area vs on the chevron — any difference (minus popup/tooltip classes) fails. Counts audited targets (7 kits × 7 checks = 49); 0 targets or a missing control → exit 2.

- Real mouse only, fresh page per kit — never `CSS.forcePseudoState` (it can't drive `:hover::before` rules and clearing it forces pseudo OFF for the page's lifetime).
- `--prove` injects two known-bad hovers (input outline + chevron color) and must FAIL both checks — run it after editing this gate.
- NumberField steppers and clear buttons are action buttons with legitimate own hovers; the gate only mouses the input area, so they are outside the comparison on purpose.
