// 盒外绘制不被裁门：① 任何 overflow 非 visible 的容器，都不得裁掉它承载内容的焦点环
// （outline 宽 + 偏移）；② 滑块旋钮不得被祖先的 clip-path / overflow 裁切。
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
  let audited = 0;

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

      const marked = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        if (!dlg) return 0;
        const clippers = [dlg, ...dlg.querySelectorAll('*')].filter((el) => {
          const c = getComputedStyle(el);
          return /(auto|scroll|hidden|clip)/.test(c.overflowX + c.overflowY);
        });
        let n = 0;
        for (const clip of clippers) {
          const label = (typeof clip.className === 'string' ? clip.className : '').split(/\s+/)[0] || clip.tagName;
          let i = 0;
          for (const el of clip.querySelectorAll('button, [role="switch"], [role="slider"], [role="checkbox"], [role="radio"], input, a[href]')) {
            if (el.getBoundingClientRect().width < 2) continue;
            el.setAttribute('data-bleed-probe', label + '-' + i++);
            n++;
          }
        }
        return n;
      });
      if (!marked) console.log(`  WARN ${kit} ${host}: 弹层没打开或无可聚焦控件,零标记`);
      audited += marked;

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
          let clip = el.parentElement;
          while (clip && !/(auto|scroll|hidden|clip)/.test(getComputedStyle(clip).overflowX + getComputedStyle(clip).overflowY)) clip = clip.parentElement;
          if (!clip) return null;
          const cs = getComputedStyle(clip);
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

  const knobFindings = [];
  let knobs = 0;
  for (const kit of KITS) {
    await page.goto(`http://localhost:${PORT}/?embed=1&kit=${kit}`, { waitUntil: 'load' });
    await page.waitForSelector('#slider', { state: 'attached' });
    await page.evaluate(() => document.getElementById('slider').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
      const out = [];
      let seen = 0;
      for (const knob of document.querySelectorAll('#slider [class*="__thumb"]')) {
        const kb = knob.getBoundingClientRect();
        if (kb.width < 2 || kb.height < 2) continue;
        seen++;
        for (let p = knob.parentElement; p && p !== document.body; p = p.parentElement) {
          const cs = getComputedStyle(p);
          const clips = (cs.clipPath && cs.clipPath !== 'none') || /(hidden|clip)/.test(cs.overflowX + cs.overflowY);
          if (!clips) continue;
          const pb = p.getBoundingClientRect();
          const over = Math.max(kb.right - pb.right, pb.left - kb.left, kb.bottom - pb.bottom, pb.top - kb.top);
          if (over > 1) {
            const cls = (typeof p.className === 'string' ? p.className : '').split(/\s+/).filter(Boolean).slice(0, 2).join('.') || p.tagName;
            out.push({ el: (knob.className || '').toString().split(/\s+/)[0], clip: cls, over: Math.round(over), how: cs.clipPath !== 'none' ? 'clip-path' : 'overflow' });
            break;
          }
        }
      }
      return { out, seen };
    });
    knobs += r.seen;
    for (const f of r.out) knobFindings.push({ kit, ...f });
  }

  await b.close();

  console.log('## 控件旋钮不得被祖先裁切 —— clip-path 连子元素一起裁，切角形状要挪到 ::before');
  if (!knobFindings.length) console.log(`  -> clean (${knobs} 个旋钮)`);
  else for (const f of knobFindings)
    console.log(`  ${f.kit.padEnd(9)} .${f.clip} 的 ${f.how} 裁掉 .${f.el} ${f.over}px`);
  if (!knobs) { console.error('ERR 找到 0 个旋钮 —— 该检查什么都没量'); process.exit(2); }

  console.log('\n## 滚动容器出血带 —— 盒外绘制（焦点环、极值装饰）不得被容器裁掉');
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
  if (!audited) { console.error('ERR 标记了 0 个可聚焦控件 —— 该门什么都没量'); process.exit(2); }
  const bad = findings.length + knobFindings.length;
  console.log(`\nRESULT: ${bad === 0
    ? `PASS (${KITS.length} kits · ${audited} 个可聚焦控件的焦点环未被裁 · ${knobs} 个旋钮未被祖先裁切)`
    : `${findings.length} 处盒外绘制被容器裁（补出血带：padding + 等量负边距，布局不变）· ${knobFindings.length} 处旋钮被祖先裁切（形状挪到 ::before）`}`);
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
