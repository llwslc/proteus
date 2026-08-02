// 条头入界门：滑块推到两端时，旋钮「自身包围盒」不得越出底条——不是中心点不越，是本身不越。
// 底条（外框）保持满宽；内部填充条与条头在内缩带里走。
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const PORT = G.port(process.argv[2]);
const ONLY = process.argv[3];

(async () => {
  const b = await chromium.launch({ executablePath: G.CHROME, headless: true });
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const KITS = ONLY ? [ONLY] : await G.kitsOf(page);
  const rows = [];

  for (const kit of KITS) {
    await page.goto(`http://localhost:${PORT}/?embed=1&kit=${kit}`, { waitUntil: 'load' });
    await page.waitForSelector('#slider', { state: 'attached' });
    await page.evaluate(() => document.getElementById('slider').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(700);

    const g = await page.evaluate(() => {
      const s = document.querySelector('#slider [class*="slider"]');
      const th = s.querySelector('[class*="thumb"]').getBoundingClientRect();
      const tr = s.querySelector('[class*="track"], [class*="rail"]').getBoundingClientRect();
      const root = s.getBoundingClientRect();
      // 可见框可能画在伪元素上（inset 基于 padding 盒），元素盒满宽不等于看见的框满宽
      const trackEl = s.querySelector('[class*="track"], [class*="rail"]');
      const cs = getComputedStyle(trackEl);
      let frameInset = 0;
      for (const q of ['::before', '::after']) {
        const pc = getComputedStyle(trackEl, q);
        if (pc.content === 'none') continue;
        const paints = pc.borderLeftStyle !== 'none' || (pc.backgroundColor !== 'rgba(0, 0, 0, 0)' && pc.backgroundColor !== 'transparent') || pc.backgroundImage !== 'none';
        if (!paints) continue;
        const l = parseFloat(pc.left) || 0;
        const off = (parseFloat(cs.borderLeftWidth) || 0) + (parseFloat(cs.paddingLeft) || 0) + l;
        if (off > frameInset) frameInset = off;
      }
      return { cx: th.left + th.width / 2, cy: tr.top + tr.height / 2, l: tr.left, r: tr.right,
               trackW: +tr.width.toFixed(1), rootW: +root.width.toFixed(1), frameInset: +frameInset.toFixed(1) };
    });

    const drag = async (tx) => {
      // 每次拖拽前重新定位条头——上一次拖完它已不在原处，按旧坐标按下会抓空
      const now = await page.evaluate(() => {
        const s = document.querySelector('#slider [class*="slider"]');
        const th = s.querySelector('[class*="thumb"]').getBoundingClientRect();
        return { x: th.left + th.width / 2, y: th.top + th.height / 2 };
      });
      await page.mouse.move(now.x, now.y);
      await page.mouse.down();
      await page.mouse.move(tx, g.cy, { steps: 16 });
      await page.mouse.up();
      await page.waitForTimeout(500);
      return page.evaluate(() => {
        const s = document.querySelector('#slider [class*="slider"]');
        const th = s.querySelector('[class*="thumb"]').getBoundingClientRect();
        const tr = s.querySelector('[class*="track"], [class*="rail"]').getBoundingClientRect();
        return { left: +(tr.left - th.left).toFixed(1), right: +(th.right - tr.right).toFixed(1) };
      });
    };
    const min = await drag(g.l - 160);
    const max = await drag(g.r + 160);
    rows.push({ kit, full: Math.abs(g.trackW - g.rootW) < 1.5 && g.frameInset <= 0.5, frameInset: g.frameInset, minLeft: min.left, maxRight: max.right });
  }
  await b.close();

  console.log('## 条头入界 —— 两端旋钮自身不得越出底条；底条保持满宽');
  const bad = [];
  for (const r of rows) {
    const over = Math.max(r.minLeft, r.maxRight);
    const ok = over <= 0.5 && r.full;
    if (!ok) bad.push(r.kit);
    console.log(`  ${r.kit.padEnd(9)} 底条满宽=${r.full ? '是' : '否'}${r.frameInset > 0.5 ? `(可见框内缩 ${r.frameInset}px)` : ''}  最小值左越出 ${r.minLeft}px  最大值右越出 ${r.maxRight}px ${ok ? '' : '← 违规'}`);
  }
  console.log(`\nRESULT: ${bad.length === 0
    ? `PASS (${rows.length} kits：两端条头皆入界，底条满宽)`
    : `${bad.length} kit(s) 条头越出底条或底条被缩窄：${bad.join('、')} —— 底条满宽不动，内部填充条与条头内缩半个条头宽`}`);
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
