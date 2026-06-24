const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];
const TOL = 1.6;

const SCAN = (rootSel) => {
  const root = rootSel ? document.querySelector(rootSel) : document.body;
  if (!root) return [];
  const cy = (r) => r.top + r.height / 2;
  const out = [];
  const sel = 'h1,h2,h3,h4,legend,[class*="title"],[class*="legend"],[class*="trigger"],[class*="header"]';
  for (const t of root.querySelectorAll(sel)) {
    const tr = t.getBoundingClientRect();
    const cs = getComputedStyle(t);
    if (tr.width < 10 || cs.display === 'none' || cs.visibility === 'hidden') continue;
    const kids = [...t.children].filter((c) => { const r = c.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
    if (!kids.length) continue;
    const glyph = kids[0];
    const gr = glyph.getBoundingClientRect();
    if (gr.width >= 44 || gr.height >= 52) continue;
    if (gr.left - tr.left > 26) continue;
    const tw = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP });
    const tn = tw.nextNode();
    if (!tn) continue;
    const rg = document.createRange();
    rg.selectNodeContents(tn);
    const txr = rg.getBoundingClientRect();
    if (txr.width < 2 || txr.height < 2) continue;
    if (txr.left < gr.right - 2) continue;
    const svg = glyph.querySelector('svg');
    const ink = (svg || glyph).getBoundingClientRect();
    const delta = +(cy(ink) - cy(txr)).toFixed(1);
    const label = (t.getAttribute('class') || '').split(/\s+/).find((c) => /(title|legend|trigger|header)/.test(c)) || t.tagName.toLowerCase();
    out.push({ label, text: tn.textContent.trim().slice(0, 20), delta });
  }
  return out;
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 950 }, deviceScaleFactor: 2 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  let kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));
  if (ONLY) kits = kits.filter((k) => k === ONLY);

  let total = 0;
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    console.log(`\n=== ${kit} ===`);
    const seen = new Set();
    const found = [];
    for (const f of await page.evaluate(SCAN, null)) { const key = f.label + '|' + f.text; if (!seen.has(key)) { seen.add(key); found.push(f); } }
    for (const id of ['dialog', 'alert', 'drawer']) {
      const trg = await page.$(`#${id} button`);
      if (!trg) continue;
      try { await trg.click(); await page.waitForTimeout(550); } catch { continue; }
      const role = id === 'alert' ? '[role=alertdialog]' : '[role=dialog]';
      for (const f of await page.evaluate(SCAN, role)) { const key = id + '|' + f.label + '|' + f.text; if (!seen.has(key)) { seen.add(key); found.push({ ...f, label: id + ':' + f.label }); } }
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(200);
    }
    const bad = found.filter((f) => Math.abs(f.delta) > TOL);
    for (const f of found) console.log(`  ${Math.abs(f.delta) > TOL ? 'OFF ' : 'ok  '} ${String(f.delta).padStart(5)}px  ${f.label}  "${f.text}"`);
    if (!found.length) console.log('  (no leading-glyph titles found)');
    total += bad.length;
  }
  await browser.close();
  console.log(`\nRESULT: ${total === 0 ? 'PASS (every title glyph centered on its text within ' + TOL + 'px)' : total + ' off-center title glyph(s) — center the glyph ink on the text, measured at rest'}`);
  process.exit(total === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
