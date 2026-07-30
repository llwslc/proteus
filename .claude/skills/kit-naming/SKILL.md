---
name: kit-naming
description: Cross-kit class-naming consistency, three checks. (1) For each component shared by all kits, the dominant block class (de-kit-prefixed) should be the same across kits. (2) Sub-part separator consistency — a leaf written `block-part` (single dash) in one kit while a sibling writes `block__part` (folded in from the former kit-part-naming gate). (3) Root-slot consistency — the component-local block on each `Base*.Root` element's className must match across kits. Catches the divergence kit-lint can't see (it checks token FORMAT within a kit, never whether names match across kits).
---

# kit-naming

The convention is `<kit>-<component>__<part>` — so the same component should carry the same block name in every kit (only the `<kit>-` prefix differs), and a given leaf part is spelled the same way (`__`, never a lone dash) across kits. kit-lint checks token *format* within one kit (everything tokenized, no raw values, no dead tokens, dimension suffixes) but has **no cross-kit name check** — which is how NavigationMenu shipped as `navmenu` (nova/abyss) vs `nav` (brass/bauhaus), with a matching `--<kit>-nav-w` vs nothing, and nothing flagged it.

It runs three checks: **block-name consistency** (the dominant `<kit>-<block>` per shared component must match across kits), **sub-part separator consistency** (no leaf `block-part` where a sibling writes `block__part` — the separator-drift check folded in from the former standalone `kit-part-naming` gate), and **root-slot consistency** (the first component-local block on each `Base*.Root` element's className must match across kits). Any failing exits non-zero.

The root-slot check exists because the dominant-block check compares only ONE block per component — secondary blocks diverge invisibly. That's how Field.Root shipped as `<kit>-field` in five kits but `<kit>-fieldroot` in hanabi/nocturne (their `field` name was taken by the input-frame recipe in effects.css, since renamed `fieldframe`): the Input dir's dominant block is `input` in all seven, so the Root's own class was never compared. The check reads tsx for `Base*.Root` elements, takes the first className block that is neither in the static denylist nor cross-dir shared, and compares across kits; a kit whose root carries only shared primitives abstains (`(shared-only)`) rather than voting — conservative, no false positives from e.g. nova/riot where `field` is itself a cross-dir recipe.

## Run

```
node .claude/skills/kit-naming/check.cjs
```

Derives kits from `src/kits/*`. For each component dir present in all kits, computes the dominant `<kit>-<block>` class stem per kit and reports any component whose own block name isn't identical across kits. Excluded from the dominant: token refs (`--<kit>-…`, via lookbehind), a static primitive denylist, and — crucially — **any block used in ≥2 of a kit's components** (auto-detected shared-composition primitives: `seg` across 5 components, `modal` across Dialog/Drawer/AlertDialog, `disclosure`/`collapse` across Accordion+Collapsible, `menu` across Menu+Menubar+ContextMenu, `checkbox` across Checkbox+CheckboxGroup). A kit whose component is pure shared-skin reuse (no own block) is skipped, not flagged.

This shared-exclusion is what keeps it from crying wolf: without it the gate flagged 11 components, but ~half were deliberate DRY skins (renaming `seg` would hit 5 components) and Dialog was a pure false positive (every kit uses `dialog` + shared `modal`). With it, only genuine per-component naming sloppiness surfaces.

## Reading the output

`DIVERGENT` = the component's OWN block name differs across kits — a real fix (unify to one name). Proven catch: against pre-1a63744 it flags `NavigationMenu: nova=navmenu brass=nav`. Still confirm with git-blame before renaming (memory `audit-respect-intentional-exceptions`), and watch for the item-vs-wrapper case (`toggle` item vs `togglegroup` wrapper) where the fix is to nest the item under the component block, not a flat merge (which would collide).
