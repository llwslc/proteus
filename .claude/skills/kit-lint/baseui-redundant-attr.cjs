// F5 — 在 Base UI 零件上手设 role / aria-*，而该零件自己已经设了同名属性。
// 重复设置是「没读库就动手」的机械痕迹：库改了默认值，我们这份会盖住它。
// 判定靠读 node_modules 里该零件的实现，不靠名单。
const fs = require('fs');
const path = require('path');
const root = process.argv[2];
const PKG = '/Users/doge/Documents/tronbox-workspace/test-tronbox/node_modules/@base-ui/react';

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.tsx')) files.push(p);
  }
})(root);

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const pascal = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');

// 零件实现文件里是否设了该属性
const setsAttr = (pkg, part, attr) => {
  const dir = path.join(PKG, pkg, kebab(part));
  if (!fs.existsSync(dir)) return false;
  const impl = fs.readdirSync(dir).find((f) => f.endsWith('.js') && !f.endsWith('.mjs'));
  if (!impl) return false;
  const src = fs.readFileSync(path.join(dir, impl), 'utf8');
  const key = attr.startsWith('aria-') ? `'${attr}'` : `${attr}:`;
  return new RegExp(`(^|[\\s{,])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:?\\s*['"]`).test(src)
    || new RegExp(`(^|[\\s{,])${attr}:\\s*['"]`).test(src);
};

const out = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const alias = {};
  for (const m of src.matchAll(/import\s*\{\s*([A-Za-z]+)(?:\s+as\s+([A-Za-z]+))?\s*\}\s*from\s*"@base-ui\/react\/([a-z-]+)"/g))
    alias[m[2] || m[1]] = m[3];
  if (!Object.keys(alias).length) continue;
  for (const m of src.matchAll(/<([A-Za-z]+)\.([A-Z][A-Za-z0-9]*)((?:[^>]|\n)*?)>/g)) {
    const pkg = alias[m[1]];
    if (!pkg) continue;
    for (const a of m[3].matchAll(/\b(role|aria-[a-z]+)=/g)) {
      const attr = a[1];
      if (!setsAttr(pkg, m[2], attr)) continue;
      const line = src.slice(0, m.index).split('\n').length;
      out.push(`  ${path.relative(root, f)}:${line}  <${m[1]}.${m[2]}> 手设 ${attr}，但 ${pascal(pkg)}${m[2]} 自己已经设了`);
    }
  }
}
if (out.length) console.log(out.join('\n'));
