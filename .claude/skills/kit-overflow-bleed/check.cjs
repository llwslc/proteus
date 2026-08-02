// 滚动容器出血带门：任何 overflow 非 visible 的容器，都不得裁掉它承载内容的盒外绘制
// （焦点环 = outline 宽 + 偏移；装饰悬出 = 旋钮/花记这类骑在边界上的构件）。
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const PORT = G.port(process.argv[2]);
const ONLY = process.argv[3];

(async () => {
  const b = await chromium.launch({ executablePath: G.CHROME, headless: true });
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const KITS = ONLY ? [ONLY] : await G.kitsOf(page);
  const findings = [];

  for (const kit of KITS) {
    await page.goto(`http://localhost:${PORT}/?embed=1&kit=${kit}`, { waitUntil: 'load' });
    await page.waitForSelector('#drawer', { state: 'attached' });

    for (const [host, opener] of [['drawer', '#drawer button'], ['dialog', '#dialog button']]) {
      await page.evaluate((h) => document.getElementById(h).scrollIntoView({ block: 'center' }), host);
      await page.waitForTimeout(400);
      const btns = await page.$$(opener);
      if (!btns.length) continue;
      await btns[host === 'drawer' ? 2 : 0].click();
      await page.waitForTimeout(800);

      const hits = await page.evaluate(() => {
        const out = [];
        const dlg = document.querySelector('[role="dialog"]');
        if (!dlg) return out;
        const clippers = [dlg, ...dlg.querySelectorAll('*')].filter((el) => {
          const c = getComputedStyle(el);
          return /(auto|scroll|hidden|clip)/.test(c.overflowX + c.overflowY);
        });
        for (const clip of clippers) {
          const cr = clip.getBoundingClientRect();
          const cs = getComputedStyle(clip);
          const bw = { l: parseFloat(cs.borderLeftWidth) || 0, r: parseFloat(cs.borderRightWidth) || 0 };
          const box = { left: cr.left + bw.l, right: cr.right - bw.r };
          const label = (typeof clip.className === 'string' ? clip.className : '').split(/\s+/)[0] || clip.tagName;
          let i = 0;
          for (const el of clip.querySelectorAll('button, [role="switch"], [role="slider"], [role="checkbox"], [role="radio"], input, a[href]')) {
            const r = el.getBoundingClientRect();
            if (r.width < 2) continue;
            el.setAttribute('data-bleed-probe', label + '-' + i++);
          }

        }
        return out;
      });
      for (const h of hits) findings.push({ kit, host, ...h });

      // 焦点环：必须强制 :focus-visible，程序化 focus() 下 outline-style 是 none，量出来是假环
      const doc = await cdp.send('DOM.getDocument');
      const marks = await page.$$eval('[data-bleed-probe]', (els) => els.map((e) => e.getAttribute('data-bleed-probe')));
      for (const mark of marks) {
        const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: `[data-bleed-probe="${mark}"]` });
        if (!nodeId) continue;
        await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['focus', 'focus-visible'] });
        const hit = await page.evaluate((mark) => {
          const el = document.querySelector(`[data-bleed-probe="${mark}"]`);
          const c = getComputedStyle(el);
          if (c.outlineStyle === 'none') return null;
          const ring = (parseFloat(c.outlineWidth) || 0) + (parseFloat(c.outlineOffset) || 0);
          if (ring <= 0) return null;
          const clip = el.closest('[class*="__body"], [class*="modal-body"], [role="dialog"]');
          const cs = getComputedStyle(clip);
          if (!/(auto|scroll|hidden|clip)/.test(cs.overflowX + cs.overflowY)) return null;
          const cr = clip.getBoundingClientRect();
          const box = { left: cr.left + (parseFloat(cs.borderLeftWidth) || 0), right: cr.right - (parseFloat(cs.borderRightWidth) || 0) };
          const r = el.getBoundingClientRect();
          const over = Math.max(r.right + ring - box.right, box.left - (r.left - ring));
          return over > 0.5
            ? { clip: (typeof clip.className === 'string' ? clip.className : '').split(/\s+/)[0],
                el: (typeof el.className === 'string' ? el.className : '').split(/\s+/)[0] || el.tagName,
                kind: '焦点环', over: +over.toFixed(1) }
            : null;
        }, mark);
        await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] });
        if (hit) findings.push({ kit, host, ...hit });
      }
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
  }
  await b.close();

  console.log('## 滚动容器出血带 —— 盒外绘制（焦点环、极值装饰）不得被容器裁掉');
  if (!findings.length) console.log('  -> clean');
  else {
    const byKit = {};
    for (const f of findings) (byKit[f.kit] ||= []).push(f);
    for (const k of Object.keys(byKit).sort()) {
      const worst = {};
      for (const f of byKit[k]) {
        const key = `${f.host}/${f.clip}/${f.kind}`;
        if (!worst[key] || worst[key].over < f.over) worst[key] = f;
      }
      for (const f of Object.values(worst))
        console.log(`  ${k.padEnd(9)} ${f.host} 的 .${f.clip} 裁掉 ${f.el} 的${f.kind} ${f.over}px`);
    }
  }
  console.log(`\nRESULT: ${findings.length === 0
    ? `PASS (${KITS.length} kits：滚动容器出血带足够)`
    : `${Object.keys(findings.reduce((a, f) => ((a[f.kit] = 1), a), {})).length} kit(s) 的滚动容器裁掉盒外绘制 —— 给容器补出血带（padding + 等量负边距，布局不变）`}`);
  process.exit(findings.length ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
