// states.cjs — interaction-state sweep for every kit.
// node .claude/skills/kit-states/states.cjs [port]   (run in place, sandbox-disabled)
// .cjs so it runs despite the repo's package.json "type": "module"; no cp step —
// running a stale /tmp copy was a real miss.
// Captures the states the resting demo does NOT show on its own — pressed
// buttons, steppers driven to their min/max disabled edge, and every opened
// overlay — into /tmp/states/<kit>_<name>.png. The resting demo already
// renders the static disabled rows (checkbox/switch/select/radio), so review
// those from a full-page shot; this fills the interaction-only gap.
//
// The sweep NEVER skips silently: every expected state that fails to capture is
// reported per kit at the end, so a state the demo's ids/classes don't expose
// shows up as a gap to fix, not as a false pass.
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const fs = require('fs');
fs.mkdirSync('/tmp/states', { recursive: true });

// Every interaction state the sweep is expected to capture for each kit.
const EXPECT = [
  'button_pressed',
  'numberfield_max', 'numberfield_min',
  'menu_open', 'select_open', 'combobox_open',
  'dialog_open', 'alert_open', 'drawer_open', 'popover_open',
];

const shoot = async (loc, path) => {
  try { await loc.screenshot({ path }); return true; }
  catch (e) { console.log('  skip', path.split('/').pop(), '—', e.message.split('\n')[0]); return false; }
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // kit list = the app's own switcher (reflects the registry) — no hardcoded names
  await page.goto(URL, { waitUntil: 'networkidle' });
  const KITS = await page.$$eval('.shell-switch__btn', (els) =>
    els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));

  for (const kit of KITS) {
    // clear this kit's prior shots so file-existence == captured THIS run
    for (const f of fs.readdirSync('/tmp/states')) {
      if (f.startsWith(kit + '_')) fs.unlinkSync('/tmp/states/' + f);
    }

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.evaluate(() => { const s = document.querySelector('.shell-switch'); if (s) s.style.display = 'none'; });
    const P = (id) => page.evaluate((i) => document.querySelector('#' + i)?.scrollIntoView({ block: 'center' }), id).then(() => page.waitForTimeout(250));

    // resting full page (shows all built-in disabled rows)
    await page.screenshot({ path: `/tmp/states/${kit}_PAGE.png`, fullPage: true });

    // pressed button — shoot the held BUTTON element, not the panel, so a subtle
    // active treatment (scale / translate) is actually visible.
    await P('button');
    const b = await page.$(`#button .${kit}-btn`);
    if (b) {
      const bb = await b.boundingBox();
      await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(120);
      await shoot(page.locator(`#button .${kit}-btn`).first(), `/tmp/states/${kit}_button_pressed.png`);
      await page.mouse.up();
    } else { console.log('  skip', `${kit}_button_pressed`, '— #button .' + kit + '-btn not found'); }

    // numberfield driven to its real min/max via a committed edit (Enter), so the
    // controlled value updates and the edge stepper actually disables. Raw value
    // injection does NOT drive a controlled Base UI input, so it is not used.
    await P('number');
    const nfInput = page.locator(`#number .${kit}-numberfield__input`).last();
    if (await nfInput.count()) {
      // type an out-of-range value then blur: Base UI clamps to the real min/max,
      // so the value reads clean AND the edge stepper goes disabled.
      for (const [val, tag] of [['99999', 'max'], ['-99999', 'min']]) {
        try {
          await nfInput.click();
          await nfInput.fill(val);
          await nfInput.press('Enter');
          await nfInput.blur();
          await page.waitForTimeout(250);
          await shoot(page.locator(`#number .${kit}-numberfield`).last(), `/tmp/states/${kit}_numberfield_${tag}.png`);
        } catch (e) { console.log('  skip', `${kit}_numberfield_${tag}`, '—', e.message.split('\n')[0]); }
      }
    } else { console.log('  skip', `${kit}_numberfield_*`, '— #number .' + kit + '-numberfield__input not found'); }

    // overlays: click trigger, shoot popup, escape
    const popups = [
      ['menu', `#menu .${kit}-btn`, `.${kit}-menu__popup`],
      ['select', `#select .${kit}-select__trigger`, `.${kit}-select__popup`],
      ['combobox', `#combobox input, #combobox .${kit}-combobox__control`, `.${kit}-combobox__popup`],
      ['dialog', `#dialog .${kit}-btn`, `.${kit}-dialog__tablet, .${kit}-dialog__popup, .${kit}-dialog`],
      ['alert', `#alert .${kit}-btn`, `.${kit}-alert__tablet, .${kit}-alert__popup, .${kit}-alert`],
      ['drawer', `#drawer .${kit}-btn`, `.${kit}-drawer__tablet, .${kit}-drawer`],
      ['popover', `#popover .${kit}-btn`, `.${kit}-popover__popup, [class*="popover__pos"]`],
    ];
    for (const [name, trig, pop] of popups) {
      try {
        await P(name);
        await page.locator(trig).first().click({ timeout: 3000 });
        await page.waitForSelector(pop, { state: 'visible', timeout: 3000 });
        await page.waitForTimeout(400);
        await shoot(page.locator(pop).first(), `/tmp/states/${kit}_${name}_open.png`);
      } catch (e) { console.log('  skip', `${kit}_${name}_open`, '—', e.message.split('\n')[0]); }
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(250);
    }

    // loud per-kit report: every expected state that did NOT produce a file
    const missing = EXPECT.filter((n) => !fs.existsSync(`/tmp/states/${kit}_${n}.png`));
    if (missing.length) console.log(`⚠ ${kit}: NOT captured -> ${missing.join(', ')}`);
    else console.log(`✓ ${kit}: all ${EXPECT.length} interaction states captured`);
  }
  await browser.close();
  console.log('states sweep done -> /tmp/states/');
})().catch((e) => { console.error(e); process.exit(1); });
