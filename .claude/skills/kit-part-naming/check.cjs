const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../../src/kits');

const kits = fs.readdirSync(ROOT).filter((k) => {
  try {
    return fs.statSync(path.join(ROOT, k, 'components')).isDirectory();
  } catch {
    return false;
  }
});

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(css|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const localByKit = {};
const allLocal = new Set();
for (const kit of kits) {
  const set = new Set();
  const cssSel = new RegExp(`\\.${kit}-([a-z0-9_-]+)`, 'g'); // .css: class selectors only (skips @keyframes / animation names / tokens)
  const tsxTok = new RegExp(`(?<![-.\\w])${kit}-([a-z0-9_]+(?:-[a-z0-9_]+)*)`, 'g'); // .tsx: className strings (no keyframes there)
  for (const f of walk(path.join(ROOT, kit))) {
    const txt = fs.readFileSync(f, 'utf8');
    const re = f.endsWith('.css') ? cssSel : tsxTok;
    for (const m of txt.matchAll(re)) set.add(m[1]);
  }
  localByKit[kit] = set;
  for (const c of set) allLocal.add(c);
}

const dunder = new Set();
for (const c of allLocal) {
  const m = c.match(/^([a-z0-9]+)__([a-z0-9]+)/);
  if (m) dunder.add(`${m[1]}__${m[2]}`);
}

const flags = [];
for (const kit of kits) {
  const set = localByKit[kit];
  for (const c of set) {
    const m = c.match(/^([a-z0-9]+)-([a-z0-9]+)$/);
    if (!m) continue;
    if ([...set].some((o) => o.startsWith(c + '__'))) continue; // used as a block (has __ parts) — a legit name choice, not separator drift
    if (dunder.has(`${m[1]}__${m[2]}`)) flags.push({ cls: `.${kit}-${c}`, want: `.${kit}-${m[1]}__${m[2]}` });
  }
}

console.log(`scanned: ${kits.join(', ')}`);
for (const kit of kits) console.log(`  ${kit.padEnd(8)} ${localByKit[kit].size} local classes`);
console.log();
if (flags.length === 0) {
  console.log('RESULT: PASS (no leaf sub-part uses a single dash where a sibling uses `__`)');
  process.exit(0);
}
for (const f of flags) console.log(`  ✗ ${f.cls.padEnd(36)} → ${f.want}   (siblings spell this part with \`__\`)`);
console.log(`\nRESULT: FAIL (${flags.length} separator-drift class(es) — a leaf part written \`block-part\` while a sibling writes \`block__part\`)`);
process.exit(1);
