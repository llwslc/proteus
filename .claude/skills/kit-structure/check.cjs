// kit-structure — cross-kit isolation + module/parity structure. See SKILL.md.
// node .claude/skills/kit-structure/check.cjs
const fs = require('fs'), cp = require('child_process');
const KITS = cp.execSync("ls -d src/kits/*/components").toString().trim().split('\n')
  .map((d) => d.replace(/\/components$/, '').replace(/^src\/kits\//, ''))
  .filter((k) => /^[a-z0-9-]+$/.test(k));
const read = (f) => fs.readFileSync(f, 'utf8');
const filesOf = (k) => cp.execSync(`find src/kits/${k} -type f \\( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \\)`).toString().trim().split('\n').filter(Boolean);
const comps = (k) => fs.readdirSync(`src/kits/${k}/components`).filter((d) => { try { return fs.statSync(`src/kits/${k}/components/${d}`).isDirectory(); } catch { return false; } });
let fail = 0;
const out = (s) => console.log(s);

out('## 1. cross-kit isolation (no kit may import or reference another kit)');
let f1 = fail;
for (const k of KITS) {
  for (const f of filesOf(k)) {
    const s = read(f);
    for (const o of KITS) {
      if (o === k) continue;
      for (const m of s.matchAll(/(?:import|export)[^\n]*?from\s+['"]([^'"]+)['"]/g))
        if (m[1].split('/').includes(o)) { out(`  FAIL ${f}: imports '${m[1]}' (kit ${o})`); fail++; }
      const refs = [...new Set((s.match(new RegExp('\\b' + o + '-[a-z][a-z0-9-]*', 'g')) || []))];
      if (refs.length) { out(`  FAIL ${f}: references ${o} class/token: ${refs.slice(0, 4).join(', ')}`); fail++; }
    }
  }
}
if (fail === f1) out('  ok');

out('\n## 2. component-set parity (same components in every kit)');
const compSets = Object.fromEntries(KITS.map((k) => [k, comps(k)]));
const allComps = [...new Set([].concat(...Object.values(compSets)))].sort();
let f2 = fail;
for (const c of allComps) {
  const miss = KITS.filter((k) => !compSets[k].includes(c));
  if (miss.length) { out(`  FAIL ${c}: missing in ${miss.join(', ')}`); fail++; }
}
if (fail === f2) out(`  ok (${allComps.length} components)`);

out('\n## 3. module completeness (.tsx + index.ts per component; re-exported by top barrel)');
let f3 = fail;
for (const k of KITS) {
  const topBarrel = read(`src/kits/${k}/components/index.ts`);
  for (const c of compSets[k]) {
    if (c === 'icons') continue;
    const dir = `src/kits/${k}/components/${c}`, ff = fs.readdirSync(dir);
    if (!ff.some((x) => x.endsWith('.tsx'))) { out(`  FAIL ${k}/${c}: no .tsx`); fail++; }
    if (!ff.includes('index.ts')) { out(`  FAIL ${k}/${c}: no index.ts`); fail++; }
    if (!new RegExp('["./]' + c + '["/]|\\b' + c + '\\b').test(topBarrel)) { out(`  FAIL ${k}: ${c} not re-exported by components/index.ts`); fail++; }
  }
}
if (fail === f3) out('  ok');

out('\n## 4. export-surface parity — moved to kit-api (the FAIL-grade gate for the wrapper API surface)');
const shared = allComps.filter((c) => c !== 'icons' && KITS.every((k) => compSets[k].includes(c)));

out('\n## 5. composition parity (same Base UI wiring across kits — props + selected-indicator side)');
const tsxOf = (k, c) => {
  const dir = `src/kits/${k}/components/${c}`;
  let s = '';
  for (const f of fs.readdirSync(dir)) if (/\.tsx$/.test(f)) s += read(`${dir}/${f}`) + '\n';
  return s;
};
const BEHAV = ['alignItemWithTrigger', 'modal', 'dismissible', 'closeOnClick', 'openOnHover', 'openOnInputClick', 'loop', 'openMultiple', 'toggleMultiple', 'multiple', 'autoHighlight', 'activateOnFocus', 'allowWheelScrub', 'grid'];
const propVal = (s, p) => {
  let m = s.match(new RegExp('\\b' + p + '\\s*=\\s*\\{\\s*(true|false)\\s*\\}'));
  if (m) return m[1];
  m = s.match(new RegExp('\\b' + p + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')'));
  if (m) return m[1] ?? m[2];
  if (new RegExp('[\\s<]' + p + '\\s*(?:/?>|\\s)').test(s) && !new RegExp('\\b' + p + '\\s*=').test(s)) return 'true';
  return null;
};
const sideOf = (s) => {
  if (!/\bItemIndicator\b/.test(s)) return null;
  const ti = s.search(/ItemText|item-text|list-item__text/);
  const ii = s.search(/\bItemIndicator\b/);
  if (ti < 0 || ii < 0) return null;
  return ii < ti ? 'left' : 'right';
};
const failBefore = fail;
for (const c of shared) {
  const tsx = Object.fromEntries(KITS.map((k) => [k, tsxOf(k, c)]));
  const sides = KITS.map((k) => [k, sideOf(tsx[k])]).filter(([, v]) => v);
  if (sides.length && new Set(sides.map(([, v]) => v)).size > 1) {
    out(`  FAIL ${c}: selected-indicator side differs — ${sides.map(([k, v]) => k + ':' + v).join(', ')}`); fail++;
  }
  for (const p of BEHAV) {
    const vals = KITS.map((k) => [k, propVal(tsx[k], p)]);
    if (vals.every(([, v]) => v === null)) continue;
    if (new Set(vals.map(([, v]) => (v === null ? '<unset>' : v))).size > 1) {
      out(`  FAIL ${c}.${p}: ${vals.map(([k, v]) => k + ':' + (v === null ? 'unset' : v)).join(', ')}`); fail++;
    }
  }
}
if (fail === failBefore) out('  ok');

out('\n## 6. component CSS isolation (a component uses only its OWN classes + theme; never another component\'s CSS)');
const cBefore = fail;
for (const k of KITS) {
  const defRe = new RegExp('\\.(' + k + '-[a-z0-9]+(?:[-_][a-z0-9]+)*)', 'g');
  const useRe = new RegExp('(' + k + '-[a-z0-9]+(?:[-_][a-z0-9]+)*)', 'g');
  const themeCls = new Set();
  for (const f of cp.execSync(`find src/kits/${k}/theme -name '*.css'`).toString().trim().split('\n').filter(Boolean))
    for (const m of read(f).matchAll(defRe)) themeCls.add(m[1]);
  const exempt = new Set(fs.existsSync(__dirname + '/theme-block-exempt.txt')
    ? read(__dirname + '/theme-block-exempt.txt').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : []);
  const compBlocks = new Set(compSets[k].filter((c) => c !== 'icons').map((c) => c.toLowerCase()));
  compBlocks.add('navmenu'); compBlocks.add('otp');
  for (const cls of themeCls) {
    const blk = cls.slice(k.length + 1).split('__')[0].split('--')[0].replace(/-/g, '');
    if (compBlocks.has(blk) && !exempt.has(cls)) {
      out(`  FAIL ${k}: theme/ defines component-block class .${cls} — a component block lives in its own CSS; share via a non-component-named primitive`);
      fail++;
    }
  }
  const defByComp = {};
  for (const c of compSets[k]) {
    if (c === 'icons') continue;
    const set = new Set(), dir = `src/kits/${k}/components/${c}`;
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.css')) for (const m of read(`${dir}/${f}`).matchAll(defRe)) set.add(m[1]);
    defByComp[c] = set;
  }
  for (const c of compSets[k]) {
    if (c === 'icons') continue;
    const dir = `src/kits/${k}/components/${c}`;
    let tsx = '';
    for (const f of fs.readdirSync(dir)) {
      if (/\.tsx?$/.test(f)) for (const m of read(`${dir}/${f}`).matchAll(/import\s+['"]\.\.\/([A-Za-z0-9]+)\/[^'"]+\.css['"]/g))
        if (m[1] !== c) { out(`  FAIL ${k}/${c}: imports ${m[1]}'s CSS ('../${m[1]}/…css') — move shared rules to theme/`); fail++; }
      if (f.endsWith('.tsx')) tsx += read(`${dir}/${f}`) + '\n';
    }
    for (const cls of new Set([...tsx.matchAll(useRe)].map((m) => m[1]))) {
      if (defByComp[c].has(cls) || themeCls.has(cls)) continue;
      const owners = compSets[k].filter((o) => o !== c && o !== 'icons' && defByComp[o] && defByComp[o].has(cls));
      if (owners.length) { out(`  FAIL ${k}/${c}: uses ${cls} defined in ${owners.join('/')}'s CSS — move it to theme/ or give ${c} its own`); fail++; }
    }
  }
}
if (fail === cBefore) out('  ok');

out(`\nRESULT: ${fail ? fail + ' STRUCTURAL FAIL' : 'structure OK'}`);
process.exit(fail ? 1 : 0);
