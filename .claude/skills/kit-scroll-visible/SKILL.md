---
name: kit-scroll-visible
description: Asserts the mobile horizontal scrollers (Tabs, NavMenu) don't hide their scrollbar. A `scrollbar-width: none` on these leaves a desktop pointer no way to scroll an overflowing strip — the bug where "nova's nav couldn't scroll" while siblings appeared to.
---

# kit-scroll-visible

`≤768px`, Tabs and NavMenu scroll horizontally (`横滚不换行`). If the list also sets `scrollbar-width: none`, the strip still scrolls (wheel/touch) but a **desktop pointer has no affordance** — and on kits whose panel `overflow: clip`s, the clipped items are unreachable. That was the cause of the user's "only nova can't scroll": all kits hid the bar, but nova's clipping panel sealed the overflow with no escape, while siblings leaked it to the page's (visible) scrollbar.

## Run (static)

```
sh .claude/skills/kit-scroll-visible/check.sh
```

FAILs if any `src/kits/*/components/{Tabs,NavigationMenu}/*.css` sets `scrollbar-width: none`. Scoped to those files — the popup `ScrollArea` hides its native bar on purpose, but that lives in `ScrollArea.css`.

## Fix a failure

Un-hide it (core §166): `scrollbar-width: auto` on the scroll container so Chrome honors a styled `::-webkit-scrollbar { height: 6px }` + `::-webkit-scrollbar-thumb`, with `@supports not selector(::-webkit-scrollbar)` falling back to `scrollbar-width: thin` for Firefox.

Caveat this gate can't catch: macOS renders standard scrollbars as **overlay** (appear on scroll), so even un-hidden the bar isn't always-visible at rest. A guaranteed always-visible bar needs the custom DOM `ScrollArea`, not CSS.
