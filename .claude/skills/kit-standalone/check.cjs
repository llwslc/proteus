// kit-standalone —— 控件库必须自立:把 demo 外壳的 reset 从页面上摘掉,控件盒尺寸
// 一格都不许变。外壳只服务演示页,消费方只装 src/kits/<kit>,拿不到它的任何一行。
// 历史:box-sizing/禁用态指针/reduced-motion 曾只写在 src/shell/reset.css,各套
// 全靠它撑着——摘掉后每套 36–120 个控件盒膨胀。
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const PORT = G.port(process.argv[2]);
const ONLY = process.argv[3];
const SEL = '[class*="-btn"], [class*="__trigger"], [class*="__input"], [class*="__control"], ' +
            '[class*="__track"], [class*="__box"], [class*="-list-item"], [class*="__cell"], [class*="__slot"]';

const snap = (sel) => {
  const out = {};
  let n = 0;
  for (const el of document.querySelectorAll(sel)) {
    const r = el.getBoundingClientRect();
    if (r.width * r.height <= 4) continue;
    out[(el.className || '').toString().split(' ')[0] + '#' + ++n] = `${Math.round(r.width)}x${Math.round(r.height)}`;
  }
  return out;
};

(async () => {
  const browser = await chromium.launch({ executablePath: G.CHROME, args: ['--disable-gpu'] });
  const page = await browser.newPage({ viewport: G.DESKTOP });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const kits = await G.kitsOf(page, ONLY);
  let bad = 0, audited = 0;
  for (const kit of kits) {
    await G.setKit(page, G.urlOf(PORT), kit);
    // 入场动画走完再量:动画中的 transform 会把盒量成中途尺寸
    await page.evaluate(() => new Promise((r) => {
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(() => { window.scrollTo(0, 0); setTimeout(r, 900); }, 900);
    }));
    await page.addStyleTag({ content: '*,*::before,*::after{animation:none !important;transition:none !important}' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const before = await page.evaluate(snap, SEL);
    const killed = await page.evaluate(() => {
      let n = 0;
      for (const s of document.querySelectorAll('style[data-vite-dev-id], link[rel="stylesheet"]')) {
        const id = s.getAttribute('data-vite-dev-id') || s.getAttribute('href') || '';
        if (/shell\/reset\.css/.test(id)) { s.remove(); n++; }
      }
      return n;
    });
    if (!killed) { console.error(`ERR ${kit}: 页面上找不到外壳样式表 —— 该门什么都没摘,静默即谎报`); process.exit(2); }
    await page.waitForTimeout(400);
    const after = await page.evaluate(snap, SEL);
    const keys = Object.keys(before);
    if (!keys.length) { console.error(`ERR ${kit}: 采到 0 个控件盒`); process.exit(2); }
    const moved = keys.filter((k) => before[k] !== after[k]);
    audited += keys.length;
    bad += moved.length;
    console.log(`  ${moved.length ? 'DEPENDS' : 'ok     '} ${kit.padEnd(9)} ${keys.length} 个控件盒,摘掉外壳后 ${moved.length} 个变尺寸` +
      (moved.length ? `\n            ${moved.slice(0, 5).map((k) => `${k.split('#')[0]} ${before[k]}→${after[k]}`).join('\n            ')}` : ''));
  }
  await browser.close();
  console.log(`\nRESULT: ${bad === 0
    ? `PASS (${audited} 个控件盒,摘掉 demo 外壳后尺寸全不变 — 各 kit 自立)`
    : `${bad} 个控件盒依赖 demo 外壳的样式 — 该规则属于控件库,补进 <kit>/theme/global.css`}`);
  process.exit(bad === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
