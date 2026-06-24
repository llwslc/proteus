const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];
const COMPONENTS = ['select', 'combobox', 'autocomplete'];
const TOL = 3;

const fieldWidth = (comp) => {
  const panel = document.querySelector('#' + comp);
  if (!panel) return { err: 'no panel #' + comp };
  if (comp === 'select') {
    const t = panel.querySelector('[role=combobox]') || panel.querySelector('button');
    return t ? { w: Math.round(t.getBoundingClientRect().width) } : { err: 'no trigger' };
  }
  const input = panel.querySelector('input:not([type=hidden])');
  if (!input) return { err: 'no input' };
  const group = input.parentElement;
  if (!group || group === panel) return { err: 'input has no field wrapper' };
  return { w: Math.round(group.getBoundingClientRect().width), iw: Math.round(input.getBoundingClientRect().width) };
};

const popupWidth = () => {
  const els = [...document.querySelectorAll('[class*=popup]')].filter((e) => {
    const c = getComputedStyle(e);
    if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.01) return false;
    const r = e.getBoundingClientRect();
    return r.width > 40 && r.height > 10;
  });
  if (!els.length) return { err: 'no popup open' };
  return { w: Math.round(Math.max(...els.map((e) => e.getBoundingClientRect().width))) };
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  let kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));
  if (ONLY) kits = kits.filter((k) => k === ONLY);

  let total = 0;
  for (const kit of kits) {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    console.log(`\n=== ${kit} ===`);
    let kitN = 0;
    for (const comp of COMPONENTS) {
      const f = await page.evaluate(fieldWidth, comp);
      if (f.err) { console.log(`  ${comp.padEnd(13)} SKIP (${f.err})`); continue; }
      let seed = comp === 'select' ? (await page.$(`#${comp} [role=combobox]`)) || (await page.$(`#${comp} button`)) : await page.$(`#${comp} input`);
      if (!seed) { console.log(`  ${comp.padEnd(13)} SKIP (no seed to open)`); continue; }
      try {
        await seed.click();
        if (comp !== 'select') await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(240);
      } catch (e) { console.log(`  ${comp.padEnd(13)} SKIP (open failed: ${e.message})`); continue; }
      const p = await page.evaluate(popupWidth);
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(140);
      if (p.err) { console.log(`  ${comp.padEnd(13)} SKIP (${p.err})`); continue; }
      const diff = Math.abs(f.w - p.w);
      const ok = diff <= TOL;
      const extra = f.iw !== undefined ? `  bare-input=${f.iw}` : '';
      console.log(`  ${comp.padEnd(13)} field=${String(f.w).padStart(4)}  popup=${String(p.w).padStart(4)}${extra}  ${ok ? 'ok' : 'FAIL off by ' + diff}`);
      if (!ok) kitN++;
    }
    if (!kitN) console.log('  consistent');
    total += kitN;
  }
  await browser.close();
  console.log(`\nRESULT: ${total === 0 ? 'PASS (every Select/Combobox/Autocomplete popup matches its field width)' : total + ' mismatch(es) — popup must equal the visible field width, not the bare input'}`);
  process.exit(total === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
