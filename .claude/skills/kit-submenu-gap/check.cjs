const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const CHROME = G.CHROME;
const PORT = G.port(process.argv[2]);
const URL = `http://127.0.0.1:${PORT}/`;
const SPREAD_MAX = 4; // kits' submenu gaps must agree within this (px)
const MIN_GAP = 2; // below this the submenu is touching/occluding its parent

async function gapFor(page, kit) {
  await page.evaluate((k) => localStorage.setItem('kit', k), kit);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const panel = await page.$('#menubar');
  if (!panel) return { err: 'no #menubar' };
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  const btns = await panel.$$('button');
  for (const btn of btns) {
    await btn.click().catch(() => {});
    await page.waitForTimeout(200);
    const sub = await page.$('[role=menu] [aria-haspopup=menu]');
    if (!sub) { await page.keyboard.press('Escape').catch(() => {}); continue; }
    const before = (await page.$$('[role=menu]')).length;
    const parent = await (await page.$('[role=menu]')).boundingBox();
    await sub.hover(); await page.waitForTimeout(220);
    await sub.click().catch(() => {}); await page.waitForTimeout(320);
    const menus = await page.$$('[role=menu]');
    if (menus.length <= before) return { err: 'submenu did not open' };
    const s = await menus[menus.length - 1].boundingBox();
    const right = s.x > parent.x + parent.width / 2;
    const gap = Math.round(right ? s.x - (parent.x + parent.width) : parent.x - (s.x + s.width));
    return { gap, side: right ? 'right' : 'flip-left' };
  }
  return { err: 'no submenu trigger found' };
}


const OVERLAY_SPREAD = 1; // per-type rendered gap must agree across kits within this
const orthoGap = (t, p) => {
  if (p.bottom <= t.top + 1) return Math.round(t.top - p.bottom);
  if (p.top >= t.bottom - 1) return Math.round(p.top - t.bottom);
  if (p.right <= t.left + 1) return Math.round(t.left - p.right);
  if (p.left >= t.right - 1) return Math.round(p.left - t.right);
  return -999;
};
async function overlayGaps(page, kit) {
  const out = {};
  const rect = (h) => h.evaluate((el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; });
  const step = async (name, panel, openFn, popupSel) => {
    try {
      await page.evaluate((id) => document.getElementById(id).scrollIntoView({ block: 'center' }), panel);
      await page.waitForTimeout(140);
      const trig = await openFn();
      await page.waitForTimeout(420);
      const pop = await page.waitForSelector(popupSel, { state: 'visible', timeout: 2500 });
      out[name] = orthoGap(await rect(trig), await rect(pop));
    } catch { out[name] = null; }
    await page.keyboard.press('Escape').catch(() => {});
    await page.mouse.move(5, 5); await page.waitForTimeout(220);
  };
  await step('tooltip', 'tooltip', async () => { const b = await page.$('#tooltip button'); await b.focus(); return b; }, `.${kit}-tooltip__popup, .${kit}-tooltip`);
  await step('popover', 'popover', async () => { const b = await page.$('#popover button'); await b.click(); return b; }, `.${kit}-popover__popup, .${kit}-popover`);
  await step('preview', 'preview', async () => { const a = await page.$('#preview a'); await a.focus(); return a; }, `.${kit}-preview__popup, .${kit}-preview`);
  await step('select', 'select', async () => { const b = await page.$(`#select .${kit}-select__trigger`); await b.click(); return b; }, `.${kit}-select__popup`);
  await step('combobox', 'combobox', async () => { const b = await page.$(`#combobox .${kit}-combobox__trigger`); await b.click(); return page.$(`#combobox .${kit}-combobox__field, #combobox .${kit}-combobox`); }, `.${kit}-combobox__popup`);
  await step('autocomplete', 'autocomplete', async () => { const inp = await page.$('#autocomplete input'); await inp.click(); await page.keyboard.type('a'); return page.$(`#autocomplete .${kit}-autocomplete__field, #autocomplete .${kit}-autocomplete, #autocomplete .${kit}-field`); }, `.${kit}-autocomplete__popup`);
  await step('menubar', 'menubar', async () => { const b = await page.$('#menubar button'); await b.click(); return b; }, '[role=menu]');
  await step('navmenu', 'navmenu', async () => { const b = await page.$(`#navmenu .${kit}-navmenu__trigger`); await b.click(); return b; }, `.${kit}-navmenu__positioner`);
  return out;
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: G.DESKTOP });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await G.kitsOf(page);

  const gaps = {}, broken = [];
  for (const kit of kits) {
    const r = await gapFor(page, kit);
    if (r.err) { console.log(`  ${kit.padEnd(8)} FAIL (${r.err})`); broken.push(kit); continue; }
    gaps[kit] = r.gap;
    console.log(`  ${kit.padEnd(8)} submenu↔parent gap = ${r.gap}px (${r.side})`);
  }
  const TYPES = ['tooltip', 'popover', 'preview', 'select', 'combobox', 'autocomplete', 'menubar', 'navmenu'];
  const og = {};
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    og[kit] = await overlayGaps(page, kit);
  }
  let ofail = 0;
  console.log('\n  anchored-overlay rendered gaps (per type, must match across kits):');
  for (const t of TYPES) {
    const vals = kits.map((k) => og[k][t]);
    const bad = vals.some((v) => v === null || v === -999) ? 'unmeasurable in some kit'
      : Math.max(...vals) - Math.min(...vals) > OVERLAY_SPREAD ? `spread ${Math.max(...vals) - Math.min(...vals)}px > ${OVERLAY_SPREAD}`
      : Math.min(...vals) < MIN_GAP ? `touching (min ${Math.min(...vals)}px)` : null;
    console.log(`    ${t.padEnd(13)} ${kits.map((k, i) => `${k}:${vals[i] === null ? 'x' : vals[i]}`).join('  ')}${bad ? `   FAIL — ${bad}` : ''}`);
    if (bad) ofail++;
  }
  await browser.close();

  if (ofail) {
    console.log(`\nRESULT: FAIL — ${ofail} overlay type(s) with divergent/touching rendered gaps (raw sideOffset may differ per kit; the RENDERED gap must not)`);
    process.exit(1);
  }
  if (broken.length) {
    console.log(`\nRESULT: FAIL — submenu did not even open in: ${broken.join(', ')} (worse than a wrong gap; fix the menubar/submenu first)`);
    process.exit(1);
  }
  const vals = Object.values(gaps);
  if (vals.length < 2) { console.log('\nRESULT: SKIP (single kit — nothing to compare)'); process.exit(0); }
  const min = Math.min(...vals), max = Math.max(...vals), spread = max - min;
  const occluding = Object.entries(gaps).filter(([, g]) => g < MIN_GAP).map(([k]) => k);
  console.log(`\n  spread = ${spread}px (min ${min}, max ${max})` + (occluding.length ? `; occluding: ${occluding.join(', ')}` : ''));
  const bad = spread >= SPREAD_MAX || occluding.length > 0;
  if (!bad) { console.log('RESULT: PASS (every kit renders the same submenu gap — offsets tuned per border)'); process.exit(0); }
  console.log(`RESULT: FAIL — submenu gaps not consistent. Tune each kit's MenuSub sideOffset to its own border so the rendered gap matches (a thicker frame needs a larger offset); don't standardize the raw number.`);
  process.exit(1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
