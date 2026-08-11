// components.md §3「组件尺寸 footprint（强制 token 化）」的 CSS 面。
// 豁免照规格原文：≤8px 的小值（边框、细轨道、小圆点）与上下文式的值
// （clamp、calc、%、dvh、Base UI 的锚定变量）。max()／min() 不在豁免之列——
// 它们的字面量操作数仍是裸写的尺寸。
const fs = require('fs');
const path = require('path');

const KEY = /(?:^|[;{])\s*((?:min-|max-)?(?:width|height))\s*:\s*([^;{}]+)/g;
const CTX = /clamp\(|calc\(|%|dvh|dvw|\dvh|\dvw|\bauto\b|\binherit\b|fit-content|max-content|min-content|\d+em\b|\d+ch\b|--anchor-|--available-|--positioner-|--transform-origin/;

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.css')) out.push(p);
  }
  return out;
};

const root = process.argv[2];
const dir = path.join(root, 'components');
if (!fs.existsSync(dir)) process.exit(0);

const files = walk(dir);
if (!files.length) { console.error('WARN raw-size: 0 个组件 CSS —— 该检查没审到任何东西'); process.exit(0); }

const hits = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const lineOf = (i) => src.slice(0, i).split('\n').length;
  for (const m of src.matchAll(KEY)) {
    const [, key, raw] = m;
    const v = raw.trim();
    if (CTX.test(v)) continue;
    // var(--x) 本身不含 px；只看剩下的字面量
    const lits = [...v.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map((x) => Math.abs(parseFloat(x[1])));
    if (!lits.some((n) => n > 8)) continue;
    hits.push(`  ${path.relative(root, f)}:${lineOf(m.index)}  ${key}: ${v}`);
  }
}
if (hits.length) console.log(hits.join('\n'));
