// kit-baseui-surface —— 以 node_modules 的 .d.ts 为环外基准，盯住「库有我无」。
// 包装层挡住库的 prop 不一定错，但必须在裁决账上有一笔。升版冒出新 prop 而账上
// 没有 → 报「新增待裁」；账上有、面上已经不存在 → 报「陈账」。
const fs = require('fs');
const path = require('path');
const PKG = path.join(__dirname, '../../../node_modules/@base-ui/react');
const LEDGER = path.join(__dirname, 'ledger.md');
const ONLY = process.argv[2];

const rootPropsOf = (pkg) => {
  const dir = path.join(PKG, pkg, 'root');
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).find((n) => n.endsWith('Root.d.ts'));
  if (!f) return null;
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = src.match(/(?:interface|type)\s+\w*RootProps[^{]*\{([^]*?)\n\}/);
  return new Set([...(m ? m[1] : src).matchAll(/^\s{2}([a-zA-Z]+)\??:/gm)].map((x) => x[1]));
};

const scanKit = (kit) => {
  const dir = `src/kits/${kit}/components`;
  const found = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const f = path.join(dir, e.name, `${e.name}.tsx`);
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, 'utf8');
    const imp = src.match(/import \{ \w+(?: as \w+)? \} from "@base-ui\/react\/([a-z-]+)"/);
    if (!imp) continue;
    const lib = rootPropsOf(imp[1]);
    if (!lib || !lib.size) continue;
    const main = src.match(new RegExp(`export interface ${e.name}Props([^]*?)\\{`));
    if (!main) continue;
    const head = main[1];
    const wired = /ComponentProps(?:WithoutRef)?<\s*\n?\s*typeof/.test(head);
    if (!wired) { found.push({ comp: e.name, prop: '*', n: lib.size }); continue; }
    const om = head.match(/Omit<[^]*?,([^>]*)>/);
    if (!om) continue;
    const at = src.indexOf(main[0]) + main[0].length;
    const body = src.slice(at, src.indexOf('\n}', at));
    const own = new Set([...body.matchAll(/^\s{2}([a-zA-Z]+)\??:/gm)].map((x) => x[1]));
    for (const m of om[1].matchAll(/"([a-zA-Z]+)"/g))
      if (lib.has(m[1]) && !own.has(m[1])) found.push({ comp: e.name, prop: m[1] });
  }
  return found;
};

const kits = fs.readdirSync('src/kits', { withFileTypes: true })
  .filter((e) => e.isDirectory() && (!ONLY || e.name === ONLY)).map((e) => e.name);
if (!kits.length) { console.error(`ERR 没有 kit 可审（ONLY=${ONLY}）`); process.exit(2); }

const ledger = fs.existsSync(LEDGER) ? fs.readFileSync(LEDGER, 'utf8') : '';
const onLedger = new Set([...ledger.matchAll(/^- `([A-Za-z]+)\.([A-Za-z*]+)`/gm)].map((m) => `${m[1]}.${m[2]}`));

const seen = new Set();
let audited = 0;
for (const kit of kits) {
  const rows = scanKit(kit);
  audited += rows.length;
  for (const r of rows) seen.add(`${r.comp}.${r.prop}`);
  console.log(`  ${kit.padEnd(9)} 挡住库 prop 的位置 ${rows.length} 处`);
}
if (!audited) { console.error('ERR 审计了 0 处 —— 该门什么都没量（包装写法变了？）'); process.exit(2); }

const unjudged = [...seen].filter((k) => !onLedger.has(k)).sort();
const stale = [...onLedger].filter((k) => !seen.has(k)).sort();
for (const k of unjudged) console.log(`  新增待裁  ${k} —— 库有此 prop，包装层挡住了，账上没有交代`);
for (const k of stale) console.log(`  陈账      ${k} —— 账上有，但代码里已经不挡了，删掉这一笔`);

const bad = unjudged.length + stale.length;
console.log(`\nRESULT: ${bad === 0
  ? `PASS (${kits.length} kits × ${seen.size} 处「库有我无」全部在账)`
  : `${unjudged.length} 笔新增待裁 · ${stale.length} 笔陈账 —— 更新 ledger.md 后再提交`}`);
process.exit(bad === 0 ? 0 : 1);
