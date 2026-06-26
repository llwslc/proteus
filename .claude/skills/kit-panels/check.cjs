// kit-panels — every kit's rendered sidebar must match the canonical 面板清单 pinned in
// prompt/app/app.md. The SPEC is the source of truth, not a sibling kit — so a drift that
// hits all kits together still FAILS (the old cross-kit check passed that). The demo only
// shows the panels the manifest lists; how many components the library has is components/'s
// business. Kit list from the live switcher. See SKILL.md.
//   node .claude/skills/kit-panels/check.cjs [port]
const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const APP_MD = path.join(__dirname, '../../../prompt/app/app.md');

// parse the 「## 面板清单」 markdown into [{ group, links:[{id, code}] }]
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

// flatten to a comparable sequence, case-normalized (sidebar text may be transformed)
const flat = (g) => g.flatMap((x) => x.links.map((l) => `${x.group.toLowerCase()}:${l.id}/${(l.code || '').toUpperCase()}`));

(async () => {
  let canon;
  try { canon = parseManifest(); } catch (e) { console.log('manifest parse error:', e.message); process.exit(2); }
  const canonFlat = flat(canon);

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));

  const sigs = {};
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    sigs[kit] = await page.evaluate((kit) => {
      const nm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      return [...document.querySelectorAll(`.${kit}-sidebar__group`)].map((g) => ({
        group: nm(g.querySelector(`.${kit}-sidebar__group-title`) && g.querySelector(`.${kit}-sidebar__group-title`).textContent),
        links: [...g.querySelectorAll(`.${kit}-sidebar__link`)].map((a) => ({
          id: (a.getAttribute('href') || '').replace('#', ''),
          code: nm(a.lastElementChild && a.lastElementChild.textContent),
        })),
      }));
    }, kit);
  }
  await browser.close();

  let fail = 0;
  console.log(`kit-panels @ :${PORT} — vs 面板清单 (${canon.length} groups, ${canonFlat.length} panels) — kits: ${kits.join(' ')}`);
  for (const kit of kits) {
    const kf = flat(sigs[kit]);
    if (JSON.stringify(kf) === JSON.stringify(canonFlat)) continue;
    fail = 1;
    const miss = canonFlat.filter((x) => !kf.includes(x));
    const extra = kf.filter((x) => !canonFlat.includes(x));
    console.log(`  FAIL  ${kit} diverges from the manifest`);
    if (miss.length) console.log(`          missing: ${miss.join(', ')}`);
    if (extra.length) console.log(`          extra:   ${extra.join(', ')}`);
    if (!miss.length && !extra.length) console.log(`          same panels, different order/grouping`);
  }
  console.log(fail
    ? 'RESULT: FAIL — a kit\'s sidebar diverges from the pinned 面板清单 (app.md §面板清单). Make its SECTIONS match the manifest verbatim.'
    : 'RESULT: PASS (every kit\'s sidebar matches the canonical 面板清单)');
  process.exit(fail);
})();
