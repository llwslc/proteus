// F5 — Chrome 把小数 border/outline 宽向下取整:布局用取整值,配套的伪元素
// inset/补偿用原值,0.5px 的错位涂抹在每条框线上。描边宽度一律整数 px。
// 解析 var() 一跳(含 fallback),token 里的分数宽同样命中。
const fs = require('fs');
const path = require('path');
const root = process.argv[2];
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.css')) files.push(p);
  }
})(root);

const vars = new Map();
for (const f of files) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) vars.set(m[1], m[2].trim());
}
const FRAC = /(?<![\d.])\d*\.\d+px/;
const resolve = (val, depth) => {
  if (depth > 4) return val;
  const m = val.match(/var\((--[a-z0-9-]+)\s*(?:,\s*([^)]+))?\)/);
  if (!m) return val;
  const inner = vars.has(m[1]) ? vars.get(m[1]) : (m[2] || '');
  return resolve(val.replace(m[0], inner), depth + 1);
};

const PROP = /(?:^|[;{])\s*(border(?:-(?:top|right|bottom|left))?(?:-width)?|outline(?:-width)?)\s*:\s*([^;}]+)/g;
const out = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(PROP)) {
    const resolved = resolve(m[2].trim(), 0);
    const frac = resolved.match(FRAC);
    if (!frac) continue;
    const line = src.slice(0, m.index).split('\n').length;
    out.push(`  ${path.relative(root, f)}:${line}  ${m[1]}: ${m[2].trim()}  → ${frac[0]} 非整数描边`);
  }
}
if (out.length) console.log(out.join('\n'));
