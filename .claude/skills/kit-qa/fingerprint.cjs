// render-fingerprint — 静息页逐面板的几何+计算样式哈希,对基线比对。
// 用法: node fingerprint.cjs           基线比对(无基线则报错)
//       node fingerprint.cjs --update  重建基线(仅在全绿/验收后)
// 覆盖: 桌面+手机两宽的静息渲染。弹层/交互态不在内——那是动态门的地盘。
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const G = require(path.join(__dirname, '../lib/gate.cjs'));
const BASE = path.join(__dirname, 'render-baseline.json');
const UPDATE = process.argv.includes('--update');

(async () => {
  const browser = await G.pw().chromium.launch({ executablePath: G.CHROME, args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: G.DESKTOP });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const URL = G.urlOf(G.port());
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const kits = await G.kitsOf(page);
  const out = {};
  for (const kit of kits) {
    await G.setKit(page, URL, kit);
    out[kit] = {};
    for (const [w, vp] of [['desktop', G.DESKTOP], ['phone', G.PHONE]]) {
      await page.setViewportSize(vp);
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
      await page.waitForTimeout(400);
      const panels = await page.evaluate((k) => {
        for (const c of document.querySelectorAll(`[class*="clock"]`)) c.textContent = '00:00:00';
        const ids = [...document.querySelectorAll(`.${k}-sidebar__link[href^="#"]`)].map((a) => a.getAttribute('href').slice(1));
        const roots = [['__header', document.querySelector(`.${k}-header`)], ['__hero', document.querySelector(`[class*="hero"]`)], ['__footer', document.querySelector(`.${k}-footer`)],
          ...ids.map((id) => [id, document.getElementById(id)])];
        const PROPS = ['color', 'backgroundColor', 'backgroundImage', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'fontFamily', 'fontSize', 'fontWeight', 'boxShadow', 'transform', 'opacity', 'clipPath', 'filter'];
        const res = {};
        for (const [name, root] of roots) {
          if (!root) { res[name] = 'MISSING'; continue; }
          const o = root.getBoundingClientRect();
          const parts = [];
          const walk = (el, depth) => {
            if (depth > 14 || parts.length > 900) return;
            const r = el.getBoundingClientRect();
            const c = getComputedStyle(el);
            const q = (n) => Math.round(n * 4) / 4;
            const dyn = el.closest('[class*="-progress"]') != null;
            parts.push([el.tagName, el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className,
              ...(dyn ? ['dyn', 'dyn', 'dyn', 'dyn'] : [q(r.left - o.left), q(r.top - o.top), q(r.width), q(r.height)]), PROPS.map((p) => c[p]).join(';')].join('|'));
            for (const ch of el.children) walk(ch, depth + 1);
          };
          walk(root, 0);
          res[name] = parts.join('\n');
        }
        return res;
      }, kit);
      out[kit][w] = Object.fromEntries(Object.entries(panels).map(([id, body]) => [id, crypto.createHash('sha1').update(body).digest('hex').slice(0, 12)]));
    }
  }
  await browser.close();

  if (UPDATE) {
    fs.writeFileSync(BASE, JSON.stringify(out, null, 1));
    console.log(`baseline updated: ${Object.keys(out).length} kits × 2 宽`);
    process.exit(0);
  }
  if (!fs.existsSync(BASE)) { console.error('ERR 无基线 — 全量 kit-qa 绿后先跑 --update'); process.exit(2); }
  const base = JSON.parse(fs.readFileSync(BASE, 'utf8'));
  const diffs = [];
  for (const kit of Object.keys(out)) for (const w of Object.keys(out[kit])) for (const [id, h] of Object.entries(out[kit][w])) {
    const b = base[kit] && base[kit][w] && base[kit][w][id];
    if (b !== h) diffs.push(`${kit} @${w} #${id} ${b === undefined ? '(基线无此面板)' : ''}`);
  }
  if (diffs.length) {
    console.log(`RENDER CHANGED — ${diffs.length} 处静息渲染与基线不同:`);
    for (const d of diffs) console.log('  ' + d);
    console.log('\n有意的改动 → 跑相应动态门验收后 --update 刷基线;无意的 → 这就是回归。');
    process.exit(1);
  }
  console.log('RESULT: PASS (静息渲染与基线逐面板一致 — 5 kits × 2 宽)');
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
