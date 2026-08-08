// F4 — 一道画在底缘的 inset 阶影带占掉盒子最下面 N px。内容按整盒居中时,
// 视觉上就压在带子上、看着偏下,除非底衬同宽把内容顶回带子之上。
// 只查「自己声明了居中排布」的规则:纯装饰件(旋钮、轨道)没有要居中的内容。
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

const bandOf = (body) => {
  let n = 0;
  const L = '(-?[\\d.]+)(?:px)?';
  for (const m of body.matchAll(new RegExp(`inset\\s+${L}\\s+${L}\\s+${L}`, 'g'))) {
    const y = parseFloat(m[2]), blur = parseFloat(m[3]);
    if (y < 0 && blur === 0) n = Math.max(n, Math.abs(y));
  }
  return n;
};
const bottomPad = (body) => {
  const pb = body.match(/padding-bottom:\s*([\d.]+)px/);
  if (pb) return parseFloat(pb[1]);
  const p = body.match(/padding:\s*([^;]+);/);
  if (!p) return null;
  const parts = p[1].trim().split(/\s+/);
  const last = parts.length === 4 ? parts[2] : parts.length === 3 ? parts[2] : parts.length === 2 ? parts[0] : parts[0];
  const m = last.match(/^([\d.]+)px$/);
  return m ? parseFloat(m[1]) : null;
};

const out = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim().split('\n').pop().trim(), body = m[2];
    if (sel.startsWith('@') || !sel.startsWith('.')) continue;
    const band = bandOf(body);
    if (!band) continue;
    if (!/(align-items|place-items)\s*:\s*center/.test(body)) continue;
    const pb = bottomPad(body);
    if (pb === band) continue;
    const line = src.slice(0, m.index).split('\n').length;
    out.push(`  ${path.relative(root, f)}:${line}  ${sel}  底缘阶影带 ${band}px,底衬 ${pb === null ? '未设' : pb + 'px'} —— 内容会压在带子上`);
  }
}
if (out.length) console.log(out.join('\n'));
