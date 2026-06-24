---
name: kit-part-naming
description: Asserts sub-part class names stay consistent across kits — a leaf part written `block-part` (single dash) in one kit while a sibling writes `block__part` is separator drift. Catches the recurring class where a part's separator silently diverges (context-zone vs context__zone, tabs-list vs tabs__list, accordion-header vs accordion__header).
---

# kit-part-naming

Sub-parts of a block use BEM `block__part`. When the part's separator is left unspecified, kits drift to `block-part` (a single dash), so the same part reads `context__zone` in nova but `context-zone` in brass. This is invisible until you grep, so it kept reaching the user. This gate pins it.

Complements [kit-naming] (which checks the dominant BLOCK name) — this one checks the PART separator.

## Run (static, no browser)

```
node .claude/skills/kit-part-naming/check.cjs
```

Kits are derived from `src/kits/*/components/`. It collects every local class (CSS selectors + tsx `className`), then FLAGs any leaf class `block-part` (exactly two single-dash segments, NOT used as a block of its own) whose `block__part` form exists in any kit.

## Scope (what it deliberately does NOT flag)

- A single-dash class used as its own block — it has `__` children (`menu-item__icon`) — is a legitimate BEM block choice, not separator drift. Aligning `menu-item` (block) vs `menu__item` (part) is a structural decision, not this gate's job.
- A legit multi-word block with no `__` twin (`separator-labeled`, `list-item`, `checkbox-field`, `input-wrap`) — no sibling spells it `separator__labeled`, so it is never flagged.

Block-name SPELLING drift (`radio-group` vs `radiogroup`) and structural inversions (brass `radio` = control vs sibling `radio__control`) are out of scope — fix those by the cross-kit class diff (`grep -rhoE '\.<kit>-…'` per component, lay side by side).

## Fix a failure

Rename the flagged class's separator from `-` to `__` in both the `.tsx` (`className`) and the `.css` (selectors), plus any theme/effects.css reference. Verify the component still renders styled (a missed reference leaves it unstyled).

Proven fail-on-broken: against `.bauhaus-context-zone` (before it was unified to `.bauhaus-context__zone`) it FLAGs `→ .bauhaus-context__zone`.
