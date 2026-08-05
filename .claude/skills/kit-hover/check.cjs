const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const PORT = G.port(process.argv[2]);
const ONLY = process.argv[3];
const PROVE = process.argv.includes('--prove');

const FIELDS = [
  { name: 'input', panel: '#input', hover: '#input input' },
  { name: 'select', panel: '#select', hover: '#select button' },
  { name: 'combobox', panel: '#combobox', hover: '#combobox input' },
  { name: 'autocomplete', panel: '#autocomplete', hover: '#autocomplete input' },
  { name: 'number', panel: '#number', hover: '#number input' },
];
const CHEVRONS = [
  { name: 'select', panel: '#select', chev: '#select [class*="chevron"], #select button svg' },
  { name: 'combobox', panel: '#combobox', chev: '#combobox [class*="__trigger"]' },
];

async function snapshot(page, panelSel) {
  return page.evaluate((sel) => {
    const root = document.querySelector(sel);
    if (!root) return null;
    const P = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'boxShadow', 'outlineColor', 'outlineWidth', 'filter', 'textDecorationLine', 'backgroundImage', 'opacity'];
    const rows = [];
    for (const el of [root, ...root.querySelectorAll('*')]) {
      const id = (typeof el.className === 'string' ? el.className : el.className.baseVal || '') || el.tagName;
      for (const pseudo of ['', '::before', '::after']) {
        const cs = getComputedStyle(el, pseudo || null);
        if (pseudo && cs.content === 'none') continue;
        rows.push(id + pseudo + '|' + P.map((p) => cs[p]).join(';'));
      }
    }
    return rows;
  }, panelSel);
}

function diffRows(a, b) {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) out.push((a[i] || b[i]).split('|')[0]);
  return [...new Set(out)];
}

async function settle(page) {
  await page.mouse.move(2, 2);
  await page.waitForTimeout(380);
}

(async () => {
  const browser = await chromium.launch({ executablePath: G.CHROME, headless: true });
  const kits = await G.kitsOf(null, ONLY);
  let fails = 0;
  let audited = 0;
  for (const kit of kits) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(G.embedUrl(G.urlOf(PORT), kit), { waitUntil: 'load' });
    await page.waitForSelector('#input', { state: 'attached', timeout: 15000 });
    await page.evaluate(() => new Promise((r) => { window.scrollTo(0, document.body.scrollHeight); setTimeout(() => { window.scrollTo(0, 0); setTimeout(r, 700); }, 700); }));
    if (PROVE) await page.addStyleTag({ content: '#input input:hover { outline: 3px solid red !important } #combobox [class*="__trigger"]:hover { color: rgb(255, 0, 0) !important }' });

    const responded = {};
    for (const f of FIELDS) {
      const el = page.locator(f.hover).first();
      if (!(await el.count())) { console.error(`  ERR ${kit}/${f.name}: no element for ${f.hover}`); process.exit(2); }
      await el.scrollIntoViewIfNeeded();
      await settle(page);
      const rest = await snapshot(page, f.panel);
      const box = await el.boundingBox();
      if (!rest || !box) { console.error(`  ERR ${kit}/${f.name}: panel/box missing`); process.exit(2); }
      await page.mouse.move(box.x + box.width * 0.35, box.y + box.height / 2, { steps: 3 });
      await page.waitForTimeout(380);
      const hov = await snapshot(page, f.panel);
      responded[f.name] = diffRows(rest, hov).length > 0;
      audited++;
    }
    const vals = Object.values(responded);
    if (new Set(vals).size > 1) {
      fails++;
      console.log(`  FAIL ${kit}: 字段族悬停不同形 — ${Object.entries(responded).map(([k, v]) => `${k}:${v ? '变' : '静'}`).join(' ')}`);
    }

    for (const c of CHEVRONS) {
      const chev = page.locator(c.chev).first();
      const field = FIELDS.find((f) => f.name === c.name);
      const target = page.locator(field.hover).first();
      if (!(await chev.count())) continue;
      await target.scrollIntoViewIfNeeded();
      await settle(page);
      const tb = await target.boundingBox();
      await page.mouse.move(tb.x + tb.width * 0.25, tb.y + tb.height / 2, { steps: 3 });
      await page.waitForTimeout(380);
      const onInput = await snapshot(page, c.panel);
      const cb = await chev.boundingBox();
      if (!cb) continue;
      await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2, { steps: 3 });
      await page.waitForTimeout(380);
      const onChev = await snapshot(page, c.panel);
      const d = diffRows(onInput, onChev).filter((cls) => !/tooltip|popup|portal/i.test(cls));
      audited++;
      if (d.length) {
        fails++;
        console.log(`  FAIL ${kit}/${c.name}: 悬停输入区 vs 悬停 chevron 不同态 — ${d.slice(0, 4).join(', ')}`);
      }
    }
    await page.close();
  }
  await browser.close();
  if (!audited) { console.error('ERR audited 0 targets'); process.exit(2); }
  console.log(`RESULT: ${fails ? 'FAIL' : 'PASS'} (${kits.length} kits × 字段族5件+chevron对拍 = ${audited} 项${PROVE ? ' · PROVE 注入中,期望 FAIL' : ''})`);
  process.exit(fails ? 1 : 0);
})();
