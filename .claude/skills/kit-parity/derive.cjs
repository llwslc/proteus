// kit-parity — DERIVED per-part structural-reset parity (advisory).
//
// The hardcoded FUNCTIONAL_TOKENS list in check.sh only catches the four rules
// a human already got burned by. This derives the rule set instead: for every
// PART selector a component shares across kits (e.g. `.<kit>-combobox__trigger`),
// it compares which STRUCTURAL declarations each kit puts on that part, and flags
// a reset that all-but-one sibling declares but one omits — the signature of a
// from-scratch kit dropping an accumulated plumbing rule (combobox `padding:0`
// crushed to a 7px glyph; numberfield stepper missing the same reset).
//
// STRUCTURAL only — skin (color/background/box-shadow/border/font/radius) is
// excluded because kits are SUPPOSED to differ there. ALIGNMENT (justify-content/
// align-items) is excluded too: the select-chevron bug proved siblings reach the
// same rendered result via different layouts, so alignment presence isn't a valid
// cross-kit invariant — that class is a RENDER assertion (kit-visual/interact),
// not a static diff.
//
// ADVISORY: prints GAPs, always exits 0. Each hit needs human triage — it may be
// a live bug (combobox), a latent inconsistency (numberfield, wide enough to hide
// it today), or a legitimate divergence (riot's navmenu WRAPS on mobile where the
// others SCROLL — both valid). A hard fail here would nag on the legit ones.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../src/kits');
const STRUCTURAL = new Set([
  'padding', 'overflow', 'overflow-x', 'overflow-y',
  'white-space', 'text-overflow', 'min-width', 'box-sizing',
  'appearance', '-webkit-appearance', 'flex', 'flex-wrap',
]);

if (!fs.existsSync(ROOT)) { console.log('no src/kits'); process.exit(0); }
const kits = fs.readdirSync(ROOT).filter((k) => fs.existsSync(path.join(ROOT, k, 'components')));
const ONLY = process.argv[2] || '';

const table = {}; // norm part -> kit -> Set(prop)
for (const kit of kits) {
  const compDir = path.join(ROOT, kit, 'components');
  const files = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.css')) files.push(p);
    }
  })(compDir);
  for (const f of files) {
    const css = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(css))) {
      const sel = m[1].trim();
      if (/[:\[]/.test(sel)) continue; // base rule only — skip state/pseudo
      const pm = sel.match(new RegExp(`\\.${kit}-([a-z]+)__([a-z-]+)`));
      if (!pm) continue;
      const norm = `${pm[1]}__${pm[2]}`;
      for (const decl of m[2].split(';')) {
        const p = decl.split(':')[0].trim().toLowerCase();
        if (!STRUCTURAL.has(p)) continue;
        ((table[norm] ??= {})[kit] ??= new Set()).add(p);
      }
    }
  }
}

let gaps = 0;
for (const norm of Object.keys(table).sort()) {
  const byKit = table[norm];
  const have = Object.keys(byKit);
  if (have.length < 3) continue; // need a quorum before "everyone but one" means anything
  const props = new Set();
  for (const k of have) for (const p of byKit[k]) props.add(p);
  for (const prop of [...props].sort()) {
    const yes = have.filter((k) => byKit[k].has(prop));
    const no = have.filter((k) => !byKit[k].has(prop));
    if (no.length !== 1 || yes.length < 3) continue;
    if (ONLY && no[0] !== ONLY) continue;
    console.log(`GAP  ${norm}  '${prop}'  present:[${yes.sort().join(',')}]  MISSING:${no[0]}`);
    gaps++;
  }
}
console.log(gaps ? `-> ${gaps} advisory gap(s) — triage each (live bug / latent / legit divergence)` : '-> clean');
process.exit(0);
