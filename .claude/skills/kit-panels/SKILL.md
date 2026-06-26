---
name: kit-panels
description: Asserts every kit's rendered sidebar matches the canonical 面板清单 pinned in prompt/app/app.md — same groups in order, same panel id + 3-letter code in order. The SPEC is the source of truth (not a sibling kit), so a drift that hits all kits together still FAILS. The demo shows only the panels the manifest lists; how many components the library has is components/'s business. Sibling of kit-shell-tokens.
---

# kit-panels

Run: `node .claude/skills/kit-panels/check.cjs [port]` (dev server on :5273)

The demo's panel manifest — which panels, their grouping, order, ids, and 3-letter
codes — is pinned in `prompt/app/app.md` under `## 面板清单`. Each kit writes its own
`SECTIONS` array inline in `App.tsx` (self-contained, no `src/shared`). This gate
parses the manifest and **FAILS any kit whose rendered sidebar diverges from it**,
printing the missing / extra / reordered panels.

It checks every kit against the **manifest**, not against a sibling — so a drift that
hits all kits the same way (which the old cross-kit check passed) now fails. Kit list
from the live switcher (never hardcoded).

Mind the separation: the manifest is the demo's *selection* of panels to show — it
includes `typography`, which isn't even a component. How many components the library
actually has is `components/`'s concern, independent of this list. Editing the demo
catalog = edit `app.md` §面板清单 first, then each kit's `SECTIONS` to match.

Pairs with kit-shell-tokens (same idea for the "各 kit 同值" *numbers*).
