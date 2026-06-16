// kit-structure — cross-kit isolation + module/parity structure. See SKILL.md.
// node .claude/skills/kit-structure/check.cjs
const fs = require('fs'), cp = require('child_process');
const KITS = cp.execSync("ls -d src/kits/*/components").toString().trim().split('\n')
  .map((d) => d.replace(/\/components$/, '').replace(/^src\/kits\//, ''))
  .filter((k) => /^[a-z0-9-]+$/.test(k));
const read = (f) => fs.readFileSync(f, 'utf8');
const filesOf = (k) => cp.execSync(`find src/kits/${k} -type f \\( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \\)`).toString().trim().split('\n').filter(Boolean);
const comps = (k) => fs.readdirSync(`src/kits/${k}/components`).filter((d) => { try { return fs.statSync(`src/kits/${k}/components/${d}`).isDirectory(); } catch { return false; } });
const exportsOf = (k, c) => {
  const dir = `src/kits/${k}/components/${c}`;
  let s = '';
  for (const f of fs.readdirSync(dir)) if (/\.tsx?$/.test(f)) s += read(`${dir}/${f}`) + '\n';
  return {
    val: new Set([...s.matchAll(/export (?:function|const) ([A-Za-z0-9]+)/g)].map((m) => m[1])),
    typ: new Set([...s.matchAll(/export (?:type|interface) ([A-Za-z0-9]+)/g)].map((m) => m[1])),
  };
};

let fail = 0, review = 0;
const out = (s) => console.log(s);

out('## 1. cross-kit isolation (no kit may import or reference another kit)');
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
out('  ok');

out('\n## 2. component-set parity (same components in every kit)');
const compSets = Object.fromEntries(KITS.map((k) => [k, comps(k)]));
const allComps = [...new Set([].concat(...Object.values(compSets)))].sort();
for (const c of allComps) {
  const miss = KITS.filter((k) => !compSets[k].includes(c));
  if (miss.length) { out(`  FAIL ${c}: missing in ${miss.join(', ')}`); fail++; }
}
out(`  ok (${allComps.length} components)`);

out('\n## 3. module completeness (.tsx + index.ts per component; re-exported by top barrel)');
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
out('  ok');

out('\n## 4. export-surface parity (REVIEW — divergent component APIs across kits)');
const shared = allComps.filter((c) => c !== 'icons' && KITS.every((k) => compSets[k].includes(c)));
let typDiv = 0;
for (const c of shared) {
  const per = KITS.map((k) => [k, exportsOf(k, c)]);
  for (const sym of [...new Set([].concat(...per.map(([_, e]) => [...e.val])))].sort()) {
    const has = per.filter(([_, e]) => e.val.has(sym)).map(([k]) => k);
    if (has.length < KITS.length) { out(`  REVIEW ${c}.${sym}: ${has.join('+')} only`); review++; }
  }
  for (const sym of [...new Set([].concat(...per.map(([_, e]) => [...e.typ])))].sort()) {
    const has = per.filter(([_, e]) => e.typ.has(sym)).map(([k]) => k);
    if (has.length < KITS.length) { typDiv++; if (process.env.DETAIL) out(`  type   ${c}.${sym}: ${has.join('+')} only`); }
  }
}
if (!review) out('  no value/API divergences');
if (typDiv) out(`  (+ ${typDiv} type-only export divergences${process.env.DETAIL ? '' : ' — DETAIL=1 to list'})`);

out(`\nRESULT: ${fail ? fail + ' STRUCTURAL FAIL' : 'structure OK'}${review ? ` · ${review} API divergence(s) to review` : ''}`);
process.exit(fail ? 1 : 0);
