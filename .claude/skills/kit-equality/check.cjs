// kit-equality — cross-kit pinned-value conformance (各 kit 同值 numbers + 面板清单). See SKILL.md.
//   node .claude/skills/kit-equality/check.cjs [port]
const fs = require('fs');
const path = require('path');
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const CHROME = G.CHROME;
const PORT = G.port(process.argv[2]);
const URL = G.urlOf(PORT);
const APP_MD = path.join(__dirname, '../../../prompt/app/app.md');

const TOKEN_DIMS = [
  'z-dropdown', 'z-menu', 'z-tooltip', 'z-backdrop', 'z-overlay', 'z-toast',
  'dialog-w', 'alert-w', 'drawer-w', 'drawer-h', 'drawer-w-cap', 'drawer-h-cap', 'navmenu-col-w',
  'contextmenu-min-h',
];
const GEO = [
  ['shell', 'maxWidth'], ['shell', 'padding'], ['shell', 'columnGap'], ['shell', 'rowGap'],
  ['header', 'padding'], ['header', 'zIndex'],
  ['hero', 'paddingTop'], ['hero', 'paddingLeft'], ['hero', 'marginBottom'],
  ['grid', 'columnGap'],
];

function parseManifest() {
  const md = fs.readFileSync(APP_MD, 'utf8');
  const after = md.split('## 面板清单')[1];
  if (!after) throw new Error('no 「## 面板清单」 in ' + APP_MD);
  const body = after.split(/\n## /)[0];
  const groups = [];
  for (const line of body.split('\n')) {
    const m = line.match(/^- \*\*(.+?)\*\*[：:]\s*(.+)$/);
    if (!m) continue;
    const links = m[2].split('·').map((e) => ({
      id: ((e.match(/`([^`]+)`/) || [])[1] || '').trim(),
      code: (e.match(/([A-Za-z]{3})\s*$/) || [])[1] || '',
    }));
    groups.push({ group: m[1].trim(), links });
  }
  if (!groups.length) throw new Error('面板清单 parsed empty — check the bullet format');
  return groups;
}
const flat = (g) => g.flatMap((x) => x.links.map((l) => `${x.group.toLowerCase()}:${l.id}/${(l.code || '').toUpperCase()}`));

(async () => {
  let canonFlat;
  try { canonFlat = flat(parseManifest()); } catch (e) { console.log('manifest parse error:', e.message); process.exit(2); }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: G.DESKTOP });
  const kits = await G.kitsOf(page);

  const data = {}, sigs = {}, rowsByKit = {}, liningByKit = {}, menuZByKit = {}, primByKit = {};
  for (const kit of kits) {
    await G.setKit(page, URL, kit);
    await page.waitForTimeout(250);

    await page.evaluate(() => document.getElementById('select').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(200);
    await page.click(`#select .${kit}-select__trigger`);
    await page.waitForTimeout(400);
    rowsByKit[kit] = await page.evaluate((k) => {
      const it = [...document.querySelectorAll(`.${k}-list-item`)].filter((e) => e.offsetHeight > 0);
      if (it.length < 2) return null;
      const rowH = it[1].getBoundingClientRect().top - it[0].getBoundingClientRect().top;
      const probe = document.createElement('div');
      probe.style.cssText = `position:absolute;visibility:hidden;height:var(--${k}-popup-h)`;
      document.body.appendChild(probe);
      const popupH = probe.getBoundingClientRect().height;
      probe.remove();
      return rowH > 0 ? +(popupH / rowH).toFixed(3) : null;
    }, kit);
    liningByKit[kit] = await page.evaluate((k) => {
      const items = [...document.querySelectorAll(`.${k}-list-item`)].filter((e) => e.offsetHeight > 0);
      if (!items.length) return null;
      let el = items[0].parentElement;
      while (el && !el.hasAttribute('data-open')) el = el.parentElement;
      if (!el) return null;
      const cs = getComputedStyle(el);
      let band = 0;
      for (const m of cs.boxShadow.matchAll(/(-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px inset/g))
        if (parseFloat(m[2]) < 0 && parseFloat(m[3]) === 0) band = Math.max(band, -parseFloat(m[2]));
      const r = el.getBoundingClientRect();
      const inner = {
        top: r.top + parseFloat(cs.borderTopWidth), left: r.left + parseFloat(cs.borderLeftWidth),
        right: r.right - parseFloat(cs.borderRightWidth), bottom: r.bottom - parseFloat(cs.borderBottomWidth) - band,
      };
      let clip = items[0].parentElement;
      while (clip && clip !== el && !/(auto|scroll|hidden|clip)/.test(getComputedStyle(clip).overflowY)) clip = clip.parentElement;
      const cr = (clip || el).getBoundingClientRect();
      const rows = items.map((e) => e.getBoundingClientRect());
      return {
        band,
        top: +(Math.max(Math.min(...rows.map((b) => b.top)), cr.top) - inner.top).toFixed(1),
        left: +(Math.min(...rows.map((b) => b.left)) - inner.left).toFixed(1),
        right: +(inner.right - Math.max(...rows.map((b) => b.right))).toFixed(1),
        bottom: +(inner.bottom - Math.min(Math.max(...rows.map((b) => b.bottom)), cr.bottom)).toFixed(1),
      };
    }, kit);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    await page.evaluate(() => document.getElementById('menu').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(150);
    await page.click('#menu button');
    await page.waitForSelector('[role=menu]', { state: 'visible', timeout: 2500 }).catch(() => {});
    await page.waitForTimeout(250);
    menuZByKit[kit] = await page.evaluate(() => {
      let el = document.querySelector('[role=menu]');
      while (el) { const z = getComputedStyle(el).zIndex; if (z !== 'auto') return z; el = el.parentElement; }
      return null;
    });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    const r = await page.evaluate(({ kit, TOKEN_DIMS, GEO }) => {
      const out = {};
      const root = getComputedStyle(document.documentElement);
      for (const d of TOKEN_DIMS) out[`tok:${d}`] = (root.getPropertyValue(`--${kit}-${d}`).trim()) || '(unset)';
      for (const [el, prop] of GEO) { const n = document.querySelector(`.${kit}-${el}`); out[`geo:${el}.${prop}`] = n ? getComputedStyle(n)[prop] : '(no el)'; }
      const prim = { hosts: 0, audited: 0, out: new Map() };
      const ownMod = new RegExp(`^${kit}-(?:frame|plate|surface)--`);
      const SIDES = [['top', 'borderTopWidth'], ['right', 'borderRightWidth'], ['bottom', 'borderBottomWidth'], ['left', 'borderLeftWidth']];
      for (const el of document.querySelectorAll(`.${kit}-frame, .${kit}-plate, .${kit}-surface`)) {
        prim.hosts++;
        if ([...el.classList].some((c) => ownMod.test(c))) continue;
        const before = getComputedStyle(el, '::before');
        if (before.content === 'none' || before.position !== 'absolute') continue;
        const cs = getComputedStyle(el);
        prim.audited++;
        const over = [];
        for (const [side, bw] of SIDES) {
          const inset = parseFloat(before[side]);
          if (Number.isNaN(inset)) continue;
          const overhang = -inset;
          if (overhang > parseFloat(cs[bw]) + 0.01) over.push(`${side}+${overhang.toFixed(1)}>${cs[bw]}`);
        }
        if (over.length) {
          const key = [...el.classList].filter((c) => !c.includes('--') && !/-(frame|plate|surface)$/.test(c)).slice(0, 2).join(' ') || el.tagName.toLowerCase();
          prim.out.set(`${key} ${over.join(' ')}`, (prim.out.get(`${key} ${over.join(' ')}`) || 0) + 1);
        }
      }
      const primOut = { hosts: prim.hosts, audited: prim.audited, bad: [...prim.out.entries()].map(([k, n]) => `${n}x ${k}`) };
      const nm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      const sidebar = [...document.querySelectorAll(`.${kit}-sidebar__group`)].map((g) => ({
        group: nm(g.querySelector(`.${kit}-sidebar__group-title`) && g.querySelector(`.${kit}-sidebar__group-title`).textContent),
        links: [...g.querySelectorAll(`.${kit}-sidebar__link`)].map((a) => ({ id: (a.getAttribute('href') || '').replace('#', ''), code: nm(a.lastElementChild && a.lastElementChild.textContent) })),
      }));
      return { vals: out, sidebar, prim: primOut };
    }, { kit, TOKEN_DIMS, GEO });
    for (const [dim, v] of Object.entries(r.vals)) (data[dim] = data[dim] || {})[kit] = v;
    sigs[kit] = r.sidebar;
    primByKit[kit] = r.prim;
  }
  await browser.close();

  let fail = 0;
  console.log(`kit-equality @ :${PORT} — kits: ${kits.join(' ')}`);
  console.log(`\n## 各 kit 同值 numbers (${Object.keys(data).length} dims identical across kits)`);
  const eqLines = [];
  for (const [dim, byKit] of Object.entries(data))
    if ([...new Set(Object.values(byKit))].length > 1) { fail = 1; eqLines.push(`  FAIL ${dim} differs — ` + Object.entries(byKit).map(([k, v]) => `${k}:${v}`).join('  ')); }
  console.log(eqLines.length ? eqLines.join('\n') : '  -> clean');

  console.log(`\n## sidebar vs 面板清单 (${canonFlat.length} panels)`);
  const pLines = [];
  for (const kit of kits) {
    const kf = flat(sigs[kit]);
    if (JSON.stringify(kf) === JSON.stringify(canonFlat)) continue;
    fail = 1;
    const miss = canonFlat.filter((x) => !kf.includes(x)), extra = kf.filter((x) => !canonFlat.includes(x));
    pLines.push(`  FAIL ${kit} diverges` + (miss.length ? ` — missing: ${miss.join(', ')}` : '') + (extra.length ? ` — extra: ${extra.join(', ')}` : '') + (!miss.length && !extra.length ? ' (order/grouping)' : ''));
  }
  console.log(pLines.length ? pLines.join('\n') : '  -> clean');

  console.log('\n## 弹层滚动前露出 7 行 (components.md §4.2: popup-h = list-item-h × 7)');
  const rLines = [];
  for (const kit of kits) {
    const rows = rowsByKit[kit];
    if (rows == null) { fail = 1; rLines.push(`  FAIL ${kit} — could not measure (select popup did not open, or <2 list items)`); continue; }
    if (Math.abs(rows - 7) > 0.02) { fail = 1; rLines.push(`  FAIL ${kit} shows ${rows} rows, not 7 — popup-h must be calc(var(--${kit}-list-item-h) * 7) and .${kit}-list-item must honour that min-height`); }
  }
  console.log(rLines.length ? rLines.join('\n') : `  -> clean (${kits.map((k) => `${k}:${rowsByKit[k]}`).join(' ')})`);

  console.log('\n## 弹层行不贴框 (components.md §4.2: 列表 Popup 带内衬——含画在盒内的底缘阶影带,四侧衬 ≥1px)');
  const lLines = [];
  for (const kit of kits) {
    const l = liningByKit[kit];
    if (l == null) { fail = 1; lLines.push(`  FAIL ${kit} — could not measure (no visible list item inside a [data-open] popup)`); continue; }
    const bad = ['top', 'left', 'right', 'bottom'].filter((s) => l[s] < 1);
    if (bad.length) { fail = 1; lLines.push(`  FAIL ${kit} rows touch the frame: ${bad.map((s) => `${s}=${l[s]}px`).join(' ')} (band ${l.band}px) — 内衬须在边框与阶影带之外另留空气`); }
  }
  console.log(lLines.length ? lLines.join('\n') : `  -> clean (${kits.map((k) => { const l = liningByKit[k]; return `${k}:${l.top}/${l.right}/${l.bottom}/${l.left}`; }).join(' ')})`);

  console.log('\n## 双层 frame 的墨在宿主盒内 (components.md §4.1: ::before 越出 padding 盒多少,宿主 border 就得兜住多少)');
  const pmLines = [];
  for (const kit of kits) {
    const p = primByKit[kit];
    if (!p || !p.hosts) continue;
    if (p.bad.length) { fail = 1; pmLines.push(`  FAIL ${kit} — 框墨画到宿主盒外(盒距≠视觉距,相邻间隙与命中盒都按盒算): ${p.bad.join(', ')}`); }
  }
  console.log(pmLines.length ? pmLines.join('\n') : `  -> clean (${kits.map((k) => `${k}:${primByKit[k] ? primByKit[k].audited : 0}/${primByKit[k] ? primByKit[k].hosts : 0}宿主`).join(' ')})`);

  console.log('\n## 菜单弹层的应用层级 (z-menu 挂在 positioner 上、各 kit 同值)');
  const zLines = [];
  for (const kit of kits) if (menuZByKit[kit] == null) { fail = 1; zLines.push(`  FAIL ${kit} — menu did not open / no positioned ancestor`); }
  if (new Set(kits.map((k) => menuZByKit[k]).filter(Boolean)).size > 1) {
    fail = 1;
    zLines.push(`  FAIL applied menu z diverges: ${kits.map((k) => `${k}:${menuZByKit[k]}`).join(' ')} — the §3 ladder pins menu above dropdown; apply z-menu on the menu positioner (menu-tier)`);
  }
  console.log(zLines.length ? zLines.join('\n') : `  -> clean (${kits.map((k) => `${k}:${menuZByKit[k]}`).join(' ')})`);

  console.log(`\nRESULT: ${fail
    ? 'FAIL — a pinned cross-kit value diverged (各 kit 同值 in components.md/app.md, the 面板清单, the 7-row popup height, or 行不贴框). Write the same literal / manifest in every kit.'
    : 'PASS (cross-kit numbers identical + every sidebar matches the 面板清单 + every popup shows 7 rows + rows clear the frame + menu z applied uniformly)'}`);
  process.exit(fail);
})();
