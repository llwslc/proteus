// kit-spec-cite — every backtick citation in the skin docs must resolve to something real
// in that kit's code. node .claude/skills/kit-spec-cite/check.cjs [ignored] [kit] [--prove]
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../../..');
const ONLY = process.argv[3];
const PROVE = process.argv.includes('--prove');

const CSS_NATIVE = new Set(['steps', 'flex-end', 'background-position', 'background-size', 'stroke-dashoffset', 'currentColor']);

const srcOf = (kit) => {
  let s = '';
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (/\.(css|tsx)$/.test(f)) s += fs.readFileSync(p, 'utf8');
    }
  };
  walk(path.join(ROOT, 'src/kits', kit));
  return s;
};

const kits = fs.readdirSync(path.join(ROOT, 'src/kits'))
  .filter((d) => fs.statSync(path.join(ROOT, 'src/kits', d)).isDirectory())
  .filter((k) => !ONLY || k === ONLY);
if (!kits.length) { console.error('ERR 0 kits'); process.exit(2); }

let checked = 0;
const unresolved = [];
for (const kit of kits) {
  const doc = path.join(ROOT, `prompt/components/theme/${kit}.md`);
  if (!fs.existsSync(doc)) { console.error(`ERR no skin doc for ${kit}`); process.exit(2); }
  const src = srcOf(kit);
  const lines = fs.readFileSync(doc, 'utf8').split('\n');
  if (PROVE && kit === kits[0]) lines.push('- 假引用：`no-such-token-xyz` 与 `.no-such-class`。');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/`([^`]+)`/g)) {
      const c = m[1];
      if (/^[-0-9.#/ %pxemsdeg]+$/i.test(c)) continue;                 // 数值/hex/单位
      if (/[ ()"'<>=,:：一-鿿]/.test(c)) continue;                     // 多词/表达式/含中文
      if (/^[A-Z]/.test(c) || /[a-z][A-Z]/.test(c)) continue;         // 组件名/camelCase API
      if (/\.(tsx|css|ts)$/.test(c)) continue;                        // 文件名
      if (/^-[a-z]/.test(c)) continue;                                // 族后缀简写 -deep/-a55
      if (/^[^\x20-\x7e]+$/.test(c)) continue;                        // 纯符号字形 ✗ ▼ ✦
      if (CSS_NATIVE.has(c)) continue;
      checked++;
      let ok;
      // data-*：引用一个状态属性，判据是这套 CSS 真的按它选择过
      if (/^data-[a-z-]+$/.test(c)) ok = src.includes(`[${c}]`) || src.includes(`${c}=`);
      else if (c.startsWith('--')) ok = src.includes(c.endsWith('-*') ? c.slice(0, -1) : c);
      else if (c.startsWith('.')) ok = src.includes(c.slice(1));
      else if (c.startsWith('#')) ok = src.includes(c.slice(1));
      else if (c.startsWith(`${kit}-`)) ok = src.includes(c);
      else ok = src.includes(`--${kit}-${c}`) || src.includes(`${kit}-${c}`) || src.includes(`--${c}`)
             || new RegExp(`[\\w-]--${c}(?![\\w-])`).test(src)        // 变体修饰 --ghost
             || src.includes(`${c}?:`);                                // 组件 prop
      if (!ok) unresolved.push(`  ${kit}.md:${i + 1}  \`${c}\``);
    }
  });
}
if (!checked) { console.error('ERR audited 0 citations'); process.exit(2); }
for (const u of unresolved) console.log(u);
console.log(`RESULT: ${unresolved.length ? 'FAIL' : 'PASS'} (${kits.length} kits × 皮肤文档引用对拍 = ${checked} 条${PROVE ? ' · PROVE 注入中,期望 FAIL' : ''})`);
process.exit(unresolved.length ? 1 : 0);
