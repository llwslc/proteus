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
  const kits = await G.kitsOf(page);

  const out = {};
  for (const kit of kits) {
    await G.setKit(page, URL, kit);
    out[kit] = {};
    for (const [w, vp] of [['desktop', G.DESKTOP], ['phone', G.PHONE]]) {
      await page.setViewportSize(vp);
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
      // 就绪判据是「页面正在用的字族都已加载」。document.fonts.ready 只等已发出的
      // 请求,首轮布局才触发的那批不在内;回退字体下的文本几何是另一套数字。
      const fontsUp = await page
        .waitForFunction(() => {
          if (document.fonts.status !== 'loaded') return false;
          const webfonts = new Set([...document.fonts].map((f) => f.family.replace(/^["']|["']$/g, '')));
          const sample = [document.body, ...document.querySelectorAll('[class*="hero"],[class*="title"],[class*="btn"],h1,h2,h3,code')].slice(0, 20);
          for (const el of sample) {
            const c = getComputedStyle(el);
            const fam = c.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
            if (!fam || !webfonts.has(fam)) continue;
            if (!document.fonts.check(`${c.fontStyle} ${c.fontWeight} ${c.fontSize} "${fam}"`)) return false;
          }
          return true;
        }, null, { timeout: 20000 })
        .then(() => true)
        .catch(() => false);
      if (!fontsUp) {
        console.error(`ERR ${kit}@${w} 字体 20s 未就绪,拒绝采样——回退字体下的文本几何会把整套面板写歪`);
        process.exit(2);
      }
      await page.waitForTimeout(400);
      const capture = (k) => page.evaluate((k) => {
        for (const c of document.querySelectorAll(`[class*="clock"]`)) c.textContent = '00:00:00';
        const ids = [...document.querySelectorAll(`.${k}-sidebar__link[href^="#"]`)].map((a) => a.getAttribute('href').slice(1));
        if (!ids.length) return { __EMPTY__: 'no sidebar links' };
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
            if (el.tagName === 'STYLE' || el.tagName === 'SCRIPT') return;
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
      }, k);

      // 只接受连续两次逐面板相同的采样。字体换上、HMR 余波都会让「刚改完的
      // 第一次」测出一堆假漂移——那正是这门的红一直没人当真的原因。
      let panels = await capture(kit);
      let prev = null;
      for (let tries = 0; tries < 4; tries++) {
        prev = panels;
        await page.waitForTimeout(350);
        panels = await capture(kit);
        if (JSON.stringify(prev) === JSON.stringify(panels)) break;
      }
      if (JSON.stringify(prev) !== JSON.stringify(panels)) {
        const moving = Object.keys(panels).filter((id) => panels[id] !== prev[id]);
        console.error(`ERR ${kit}@${w} 采样不收敛,拒绝比对: ${moving.slice(0, 6).join(' ')}`);
        console.error('  页面还在动(字体换上／HMR 余波)。等一会儿重跑。');
        process.exit(2);
      }
      out[kit][w] = Object.fromEntries(Object.entries(panels).map(([id, body]) => [id, crypto.createHash('sha1').update(body).digest('hex').slice(0, 12)]));
    }
  }
  await browser.close();

  // 采集自检。一次采空（侧栏没渲染出来）曾把基线从 42 面板打到 3 条，而回执
  // 只报 kit 数、看不出来。少于下限就报错退出，残缺基线永远进不了仓。
  // 下限按现有基线派生:基线里某套某宽有 N 条,这次就必须还是 N 条。无基线时回落到 8。
  const prior = fs.existsSync(BASE) ? JSON.parse(fs.readFileSync(BASE, 'utf8')) : null;
  const thin = [];
  for (const kit of Object.keys(out)) {
    for (const w of Object.keys(out[kit])) {
      const n = Object.keys(out[kit][w]).length;
      const want = prior && prior[kit] && prior[kit][w] ? Object.keys(prior[kit][w]).length : 8;
      if (out[kit][w].__EMPTY__ || n < want) thin.push(`${kit}@${w} 只抓到 ${n} 条,基线是 ${want} 条`);
    }
  }
  if (thin.length) {
    console.error('ERR 采集不完整，拒绝使用本次结果：');
    thin.forEach((t) => console.error('  ' + t));
    console.error('  页面没渲染完就被采样（侧栏链接为 0）。重跑；若持续，查 dev server。');
    process.exit(2);
  }
  const counts = Object.keys(out).map((k) => Object.keys(out[k].desktop).length);

  if (UPDATE) {
    fs.writeFileSync(BASE, JSON.stringify(out, null, 1));
    console.log(`baseline updated: ${Object.keys(out).length} kits × 2 宽 × ${Math.min(...counts)}–${Math.max(...counts)} 面板`);
    process.exit(0);
  }
  if (!fs.existsSync(BASE)) { console.error('ERR 无基线 — 全量 kit-qa 绿后先跑 --update'); process.exit(2); }
  const base = JSON.parse(fs.readFileSync(BASE, 'utf8'));
  const diffs = [];
  for (const kit of Object.keys(out)) for (const w of Object.keys(out[kit])) for (const [id, h] of Object.entries(out[kit][w])) {
    const b = base[kit] && base[kit][w] && base[kit][w][id];
    if (b !== h) diffs.push(`${kit} @${w} #${id} ${b === undefined ? '(基线无此面板)' : ''}`);
  }
  // 反向:基线里有、这次没采到 = 面板被删或渲染失败,正向遍历永远看不到
  for (const kit of Object.keys(base)) for (const w of Object.keys(base[kit])) for (const id of Object.keys(base[kit][w])) {
    if (!(out[kit] && out[kit][w] && id in out[kit][w])) diffs.push(`${kit} @${w} #${id} (本次未采到,面板被删或没渲染)`);
  }
  if (diffs.length) {
    console.log(`RENDER CHANGED — ${diffs.length} 处静息渲染与基线不同:`);
    for (const d of diffs) console.log('  ' + d);
    const perKit = {};
    for (const d of diffs) { const k = d.split(' ')[0]; perKit[k] = (perKit[k] || 0) + 1; }
    const totalPer = Object.entries(out).map(([k, v]) => [k, Object.values(v).reduce((n, w) => n + Object.keys(w).length, 0)]);
    const broad = totalPer.filter(([k, n]) => perKit[k] >= n * 0.8).map(([k]) => k);
    if (broad.length)
      console.log(`\n注意：${broad.join('、')} 的差异覆盖了该套八成以上面板。改动后立刻跑常因 Vite 尚未重建而整套读到旧构建——先等构建落定再跑一次，两次一致才动基线。`);
    console.log('\n有意的改动 → 跑相应动态门验收后 --update 刷基线;无意的 → 这就是回归。');
    process.exit(1);
  }
  console.log(`RESULT: PASS (静息渲染与基线逐面板一致 — ${Object.keys(out).length} kits × 2 宽)`);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
