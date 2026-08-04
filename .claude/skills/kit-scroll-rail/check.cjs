// 底轨覆盖门：横向滚动容器里的「固定装饰」(底轨/外框线)在滚到任一端后,
// 仍须铺满可视区。双盒写法只在内层盒真有内容宽时成立——内层是 flex 子项时
// 默认 flex-shrink:1 会把它压回容器宽,线随之只画到可视宽,滚动后露白。
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const PORT = G.port(process.argv[2]);
const ONLY = process.argv[3];

(async () => {
  const b = await chromium.launch({ executablePath: G.CHROME, headless: true });
  const page = await b.newPage({ viewport: { width: 390, height: 800 } });
  const KITS = ONLY ? [ONLY] : await G.kitsOf(page);
  const findings = [];
  let scrollers = 0;
  let rails = 0;

  for (const kit of KITS) {
    await page.goto(`http://localhost:${PORT}/?embed=1&kit=${kit}`, { waitUntil: 'load' });
    await page.waitForSelector('#tabs', { state: 'attached' });
    for (const panel of ['tabs', 'menubar', 'toolbar']) {
      const has = await page.$(`#${panel}`);
      if (!has) continue;
      await page.evaluate((p) => document.getElementById(p).scrollIntoView({ block: 'center' }), panel);
      await page.waitForTimeout(500);
      const res = await page.evaluate((p) => {
        const host = document.getElementById(p);
        const out = [];
        let nsc = 0, nrail = 0;
        const cls = (e) => (typeof e.className === 'string' ? e.className : '').split(/\s+/)[0] || e.tagName;
        for (const sc of host.querySelectorAll('*')) {
          if (!(sc.scrollWidth > sc.clientWidth + 1)) continue;
          if (!/(auto|scroll)/.test(getComputedStyle(sc).overflowX)) continue;
          nsc++;
          sc.scrollLeft = sc.scrollWidth;
          const lr = sc.getBoundingClientRect();
          for (const el of [sc, ...sc.querySelectorAll('*')]) {
            const c = getComputedStyle(el);
            const paintsRail = parseFloat(c.borderBottomWidth) > 0.4 && c.borderBottomStyle !== 'none';
            if (!paintsRail) continue;
            const r = el.getBoundingClientRect();
            if (r.width < lr.width * 0.5) continue;          // 只看意在铺满的那条
            nrail++;
            const gap = Math.max(lr.right - r.right, r.left - lr.left);
            if (gap > 1)
              out.push({ panel: p, sc: cls(sc), rail: cls(el), gap: +gap.toFixed(1) });
          }
          sc.scrollLeft = 0;
        }
        return { out, nsc, nrail };
      }, panel);
      scrollers += res.nsc;
      rails += res.nrail;
      for (const h of res.out) findings.push({ kit, ...h });
    }
  }
  await b.close();

  console.log('## 底轨覆盖 —— 横向滚到端点后,铺满型装饰仍须盖住可视区');
  if (!findings.length) console.log('  -> clean');
  else for (const f of findings)
    console.log(`  ${f.kit.padEnd(9)} #${f.panel} 的 .${f.sc} 滚到端点后 .${f.rail} 露白 ${f.gap}px`);
  const kits = new Set(findings.map((f) => f.kit));
  if (!rails) { console.error(`ERR 找到 ${scrollers} 个横向滚动容器,其中 0 条铺满型装饰 —— 该门什么都没量`); process.exit(2); }
  console.log(`\nRESULT: ${findings.length === 0
    ? `PASS (${KITS.length} kits · ${scrollers} 个横滚容器 · ${rails} 条铺满型装饰,两端不露白)`
    : `${kits.size} kit(s) 的底轨滚动后露白 —— 线挂在内层盒时,给内层补 flex:none 使其真取内容宽`}`);
  process.exit(findings.length ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
