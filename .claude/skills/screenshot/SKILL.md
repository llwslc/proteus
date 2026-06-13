---
name: screenshot
description: See the demo app (NOVA/ABYSS kits) instead of guessing from CSS — drive the real page headlessly and look. Full page, a cropped region, a specific element, a specific kit, and every interaction state. Use whenever a change needs a visual check.
---

# screenshot

Don't reason about pixels from CSS — render the page and look. Two rules carry everything: **shoot the element, not a clip**, and **shoot the state, not just the resting page.**

## Setup

- Dev server: `npm run dev` (background). Port is **5273**, auto-bumps if busy — read the task output for the real port. `pkill -f vite` before relaunching.
- Driver: playwright-core in `/tmp/pw` (`mkdir -p /tmp/pw && cd /tmp/pw && npm i playwright-core`) — drives the system Chrome, nothing enters the repo. Run node **sandbox-disabled** (the Bash sandbox blocks Chrome's network).

## Template

```js
// /tmp/pw/shot.js — node shot.js (sandbox-disabled)
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://127.0.0.1:<port>/';
(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });           // freeze perpetual animation
  for (const kit of ['nova', 'abyss']) {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.locator('#menu').screenshot({ path: `/tmp/${kit}_menu.png` });   // element shot: auto-waits + scrolls
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
```

## Principles

- **Element over clip.** `page.locator(sel).screenshot()` auto-waits and scrolls into view. `page.screenshot({ clip })` is page-coordinate and misses anything `position:fixed` once scrolled — for overlays (drawer/dialog/toast/popup) shoot the popup **element**.
- **reducedMotion for stills.** Perpetual animation forces a fresh composite every shot and never settles; freezing it is faster and deterministic. Drop it only when capturing motion itself, then let entrance settle before shooting.
- **Small viewport by default; tall only for full-page.** Element shots at a short viewport are cheap; a tall viewport re-rasterizes the whole filter-heavy page per shot. For a true full-page (`fullPage: true`) use `height: 6600` so every scroll-reveal has fired. Narrow widths (420 / 900) for responsive checks.
- **State, not just rest.** Most regressions live in states the resting page never shows — pressed, hovered, focused, a control driven to its disabled edge, an opened overlay. Exercise them (`.hover()`, `mouse.down()`, drive a value to min/max, open each overlay) and shoot. The resting page does show static disabled rows — review those in the full-page shot.
- **One script, every state.** Batch all kits/states into one run; relaunching per shot is the cost, not page content.

## Interaction-state sweep

`cp .claude/skills/screenshot/states.js /tmp/pw/ && cd /tmp/pw && node states.js [port]` → `/tmp/states/<kit>_<state>.png`: full page, pressed button, stepper at its disabled min/max, every overlay opened, both kits. Run it before accepting a kit change and read the states — don't sign off on the resting page alone.

## Look

Read the PNG. A Chrome error page ("This site can't be reached") = wrong port or sandboxed networking. Crop before judging fine detail (`sips -c <h> <w> --cropOffset <y> <x> in.png --out crop.png`) — Read downscales tall images hard.
