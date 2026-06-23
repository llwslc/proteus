---
name: kit-anim-sync
description: Dynamic gate — an overlay's connector/decoration must animate IN SYNC with the overlay's own enter/exit, not on its own clock. Catches the recurring "动画不同步" class that kept slipping through per-side/per-phase review: a connector (Arrow) that pops in ahead of its popup instead of fading with it, and a one-shot decoration whose flourish plays while its overlay is still off-viewport (off-screen, then done by the time you see it). Records the entrance timeline frame-by-frame and asserts on it; the static gates and kit-interact never look at mid-transition. Run after changing any overlay/connector/decoration entrance animation, or when accepting a kit, alongside kit-visual + kit-interact.
---

# kit-anim-sync

The other gates photograph **resting / open** states and kit-interact drives
**touch**, but nothing watches the **entrance/exit transition** — so an element
that animates on its own clock (a connector that's already full while the popup
fades in, a decoration that rotates while the drawer is still sliding off-screen)
reads as "out of sync" and only a human catches it, per side, per phase. This
gate records the first frames of each overlay's entrance and asserts the parts
arrive together.

## What it checks

For every connector overlay (tooltip/popover/preview) and sliding overlay
(drawer) in every kit (kit list read live from `.shell-switch__btn`, never
hardcoded), it opens the overlay and records ~16 frames from mount, then:

- **A — connector pop-in.** Flags a connector (`[class*="connector"]`/`arrow`)
  whose opacity stays **>0.4 above its popup's for ≥3 consecutive frames** — it
  is present before the popup arrives instead of fading with it. (A synced fade
  tracks within ~1 frame; the bug holds the gap for the whole entrance.)
- **B — off-screen flourish.** Flags a **one-shot** descendant animation
  (`animation-iteration-count: 1` — infinite/continuous decorations are exempt)
  that is still changing while its overlay is **>30% outside the viewport** — its
  motion plays where it can't be seen. The fix is `animation-delay ≥` the slide
  duration so the flourish runs after the overlay lands.

## Run

`node .claude/skills/kit-anim-sync/check.cjs [port] [kit]` (dev server up).
`node .claude/skills/kit-anim-sync/check.cjs [port] break` injects
`animation:none` on connectors to **self-test** the detector — it must report
faults, proving the gate is not a silent no-op.

A flaky **mount** (a hover overlay that doesn't open this run) is reported as a
**WARN**, never a FAIL — a flaky gate is worse than none. Re-run, or pass a
single kit id, if a WARN hides coverage you need.
