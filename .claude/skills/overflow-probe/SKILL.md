---
name: overflow-probe
description: Find and fix horizontal overflow / off-center overlays at narrow viewport widths — the page scrolls sideways, or a centered dialog/drawer sits off-center and pans, once the screen is narrow enough. Mounts an on-screen probe that points at the over-wide element and maps it to a fix. Use whenever someone reports sideways scroll, an off-center popup, or a dialog that drifts on a narrow screen.
---

# overflow-probe

One principle: **something is wider than the space it sits in, and a narrow-enough viewport exposes it.** Narrow any window far enough and the widest rigid element stops fitting; there is no special width. The bug wears two faces:

- the page scrolls sideways — an element is wider than the viewport;
- a `position:fixed` centered overlay looks like it drifts — it is still viewport-centered, but over-wide content makes the page pannable, so it reads as a sideways slide.

The work is finding WHICH element is too wide — a flex/grid child that won't shrink, a `vw` width, an unbreakable string, a decorative layer pushed past its box. The probe points at it.

## Procedure

1. **Reproduce.** Narrow the viewport until it appears — drag narrow, responsive mode, any phone. There is no magic width; narrow until the widest fixed element overflows.
2. **Mount.** Copy `OverflowProbe.tsx` (next to this file) into the app and render `<OverflowProbe />` once at the top level (here: in `src/shell/Shell.tsx`, at the end of the tree). It docks top-right so it can't cover the bottom scrollbar you're checking, and shows a badge: `OVER-WIDE +Npx` vs `fits`, plus `off-center Npx` vs `centered` when a dialog is open. Buttons: Re-measure, Copy (the full log), log (expand). It is a debug aid — delete it before committing.
3. **Read the log.**

   | line | meaning |
   |---|---|
   | `vw … scrollW … delta` | `delta = scrollWidth − viewport`; `delta>0` = page over-wide by that many px |
   | `rect offenders` | elements whose box pokes past the viewport edge; a rect scan can't see pseudo-elements |
   | `internal overflow` | the container whose content overflows (`scrollWidth − clientWidth`) — follow the chain to the child that won't fit, including a `::before/::after` the rect scan misses |
   | `open popups … offX` | a dialog/drawer's center minus the viewport center = the drift, measured directly; `offX=0` = centered |
   | `^ ancestor :: …` | an ancestor with `transform`/`filter`/`contain` — a `position:fixed` popup re-anchors to it instead of the viewport |
   | `scroll-lock` / `body ovx=hidden` | Base UI's lock; if `body` is `overflow-x:hidden` the overflow is masked — the element is still too wide, the scroll is just hidden |

4. **Map to a fix — make the over-wide thing fit.**
   - **`vw` width inside a padded container** ignores the padding, so it overspills → `width: min(100%, <cap>)` or a width token, never `vw`.
   - **Flex/grid child that won't shrink** defaults to `min-width:auto` → add `min-width: 0`; single-column tracks use `minmax(0, 1fr)`, not `1fr`.
   - **No upper bound** → `max-width: 100%` or a width-token cap.
   - **Unbreakable string / wide media** → `overflow:hidden` + `text-overflow:ellipsis` + `min-width:0`, or `overflow-wrap`.
   - **Decorative `::before/::after` past its box** (a `transform` sweep, a glow) counts toward width → sweep via `background-position`, animate `top/left`, or trap it in an `overflow` ancestor.
   - **`body{overflow-x:hidden}`** only hides the scroll → fix the real over-wide element instead of masking.
   - **Off-center but not over-wide** (`offX≠0` with a `^ transform/filter/contain` ancestor): the fixed popup is re-anchored → drop that property from the ancestor, or don't portal the popup under it. If a popup opens shifted and a tap re-centers it, set `initialFocus` to the popup ref so focus doesn't land on a corner control.

5. **Verify + clean up.** Re-measure → badge reads `fits` and `centered` (`delta=0`, `offX=0`), culprit gone from the offender lists. Delete the probe file + its mount line, and scan the diff so no probe ships.
