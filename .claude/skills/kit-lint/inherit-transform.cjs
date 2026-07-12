// F3 — a custom property consumed inside a `transform:` must not be able to INHERIT
// into a descendant that re-applies it (the A8 riot-tilt doubling: an ancestor's tilt
// leaked into a nested surface and rotated it twice). Safe forms: a :root constant
// (tokens.css), or a property registered `@property { inherits: false }`.
const fs = require('fs');
const path = require('path');
const root = process.argv[2];
const kit = path.basename(root);
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.css')) files.push(p);
  }
})(root);
const all = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const rootDefs = new Set();
const tok = path.join(root, 'theme/tokens.css');
if (fs.existsSync(tok))
  for (const m of fs.readFileSync(tok, 'utf8').matchAll(new RegExp(`(--${kit}-[\\w-]+)\\s*:`, 'g'))) rootDefs.add(m[1]);
const guarded = new Set();
for (const m of all.matchAll(/@property\s+(--[\w-]+)\s*\{([^}]*)\}/g))
  if (/inherits\s*:\s*false/.test(m[2])) guarded.add(m[1]);
const out = [];
const seen = new Set();
for (const m of all.matchAll(/transform\s*:\s*([^;]+);/g))
  for (const v of m[1].matchAll(new RegExp(`var\\(\\s*(--${kit}-[\\w-]+)`, 'g'))) {
    const p = v[1];
    if (rootDefs.has(p) || guarded.has(p) || seen.has(p)) continue;
    seen.add(p);
    out.push(`${p} — consumed in transform, set by a component, and INHERITS: a nested consumer would apply it twice. Register @property { syntax:"<angle>"; inherits:false; initial-value:<its fallback> }`);
  }
console.log(out.join('\n'));
