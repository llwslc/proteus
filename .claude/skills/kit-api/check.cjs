#!/usr/bin/env node
// kit-api — wrapper-layer API parity across kits.
// The kits = Base UI primitive + a hand-written wrapper per kit. Base UI keeps
// behavior consistent; it does NOT keep the wrappers' PUBLIC API consistent.
// This gate diffs each component's exported API (export names, <Comp>Props prop
// names, prop types, DEFAULT VALUES, the `extends` clause) across kits and FAILs
// on divergence. Default-value exceptions: sideOffset (tuned per kit border so the
// rendered gap matches — cf. kit-submenu-gap) and copy strings (theme voice).
const fs = require('fs');
const DEFAULT_EXEMPT = new Set(['sideOffset', 'placeholder', 'emptyText']);

const KITROOT = 'src/kits';
const KITS = fs.readdirSync(KITROOT).filter((k) => {
  try { return fs.existsSync(`${KITROOT}/${k}/components`); } catch { return false; }
});
const SKIP = new Set(['icons', 'Panel']);
const compSet = new Set();
for (const k of KITS) {
  for (const d of fs.readdirSync(`${KITROOT}/${k}/components`)) {
    try { if (fs.statSync(`${KITROOT}/${k}/components/${d}`).isDirectory() && !SKIP.has(d)) compSet.add(d); } catch {}
  }
}
const comps = [...compSet].sort();

function parse(k, c) {
  const dir = `${KITROOT}/${k}/components/${c}`;
  if (!fs.existsSync(dir)) return null;
  let s = '';
  for (const f of fs.readdirSync(dir)) if (/\.tsx?$/.test(f) && f !== 'index.ts') s += fs.readFileSync(`${dir}/${f}`, 'utf8') + '\n';
  const exports = new Set([...s.matchAll(/export (?:function|const) (\w+)/g)].map((m) => m[1]));
  const aliases = {};
  for (const am of s.matchAll(/(?:export )?type (\w+)\s*=\s*([^;{]+);/g)) aliases[am[1]] = am[2].replace(/React\./g, '').replace(/\s+/g, '');
  const ifaces = {};
  const re = /(?:export )?interface (\w+Props)(?:\s+extends ([^{]+?))?\s*\{([\s\S]*?)\n\}/g;
  let m;
  while ((m = re.exec(s))) {
    const props = new Map();
    for (const line of m[3].split('\n')) {
      const pm = line.match(/^\s*(\w+)(\?)?:\s*(.+?);?\s*$/);
      if (!pm) continue;
      let ty = pm[3].replace(/React\./g, '').replace(/\s+/g, '');
      for (const [an, ad] of Object.entries(aliases)) ty = ty.replace(new RegExp('\\b' + an + '\\b', 'g'), ad);
      if (ty.includes('|')) ty = ty.split('|').map((x) => x.trim()).filter(Boolean).sort().join('|'); // union order/leading-pipe agnostic
      props.set(pm[1], { ty, opt: !!pm[2] });
    }
    // normalize extends: drop the React. namespace + all whitespace (formatting-agnostic)
    ifaces[m[1]] = { props, ext: (m[2] || '').replace(/React\./g, '').replace(/\s+/g, '') };
  }
  const defaults = {};
  const fnRe = /(?:export )?function (\w+)\(\s*\{([\s\S]*?)\}\s*:/g;
  let fm;
  while ((fm = fnRe.exec(s))) {
    for (const dm of fm[2].matchAll(/(\w+)\s*=\s*("(?:[^"]*)"|\d+|true|false)/g)) {
      if (!DEFAULT_EXEMPT.has(dm[1])) defaults[`${fm[1]}.${dm[1]}`] = dm[2];
    }
  }
  return { exports, ifaces, defaults, aliases };
}

const data = {};
for (const c of comps) { data[c] = {}; for (const k of KITS) data[c][k] = parse(k, c); }

// resolve type SPELLING per kit so only shape differences fail: cross-file aliases
// (ButtonVariant), indexed access (ButtonProps["variant"]), NonNullable<…>, and the
// Base-import naming (typeof BaseMenu.Item vs typeof Menu.Item) all normalize away.
const kitAliases = {}, kitIfaces = {};
for (const k of KITS) { kitAliases[k] = {}; kitIfaces[k] = {}; }
for (const c of comps) for (const k of KITS) {
  const d = data[c][k];
  if (!d) continue;
  Object.assign(kitAliases[k], d.aliases);
  Object.assign(kitIfaces[k], d.ifaces);
}
const resolveTy = (k, ty) => {
  let t = ty;
  for (let i = 0; i < 5; i++) {
    const prev = t;
    t = t.replace(/typeofBase(?=[A-Z])/g, 'typeof').replace(/\bBase(?=[A-Z])/g, '');
    let m = t.match(/^NonNullable<(.+)>$/);
    if (m) t = m[1];
    m = t.match(/^(\w+Props)\["(\w+)"\]$/);
    if (m && kitIfaces[k][m[1]] && kitIfaces[k][m[1]].props.has(m[2])) t = kitIfaces[k][m[1]].props.get(m[2]).ty;
    if (/^\w+$/.test(t) && kitAliases[k][t]) t = kitAliases[k][t];
    if (t === prev) break;
  }
  if (t.includes('|')) t = t.split('|').map((x) => x.trim()).filter(Boolean).sort().join('|');
  return t;
};
for (const k of KITS) for (const i of Object.values(kitIfaces[k])) {
  for (const [p, v] of i.props) i.props.set(p, { ...v, ty: resolveTy(k, v.ty) });
  i.ext = i.ext.replace(/typeofBase(?=[A-Z])/g, 'typeof').replace(/\bBase(?=[A-Z])/g, '');
}

let fails = 0;
const out = [];
for (const c of comps) {
  const pk = data[c];
  const present = KITS.filter((k) => pk[k]);
  if (present.length < 2) continue; // not a shared component
  const exSets = present.map((k) => [...pk[k].exports].sort().join(','));
  if (new Set(exSets).size > 1) { out.push(`FAIL ${c}: exported symbols differ — ${present.map((k, i) => `${k}:[${exSets[i]}]`).join('  ')}`); fails++; }

  // every *Props interface in the component's files — the main <Comp>Props must
  // exist in all kits; sub-interfaces (MenuItemProps, …) are compared wherever shared
  const inames = new Set();
  present.forEach((k) => Object.keys(pk[k].ifaces).forEach((n) => inames.add(n)));
  for (const mi of [...inames].sort()) {
    const withIface = present.filter((k) => pk[k].ifaces[mi]);
    if (mi === `${c}Props` && withIface.length && withIface.length < present.length) {
      out.push(`FAIL ${c}: ${mi} exists in [${withIface}] but missing in [${present.filter((k) => !pk[k].ifaces[mi])}]`); fails++;
      continue;
    }
    if (withIface.length < 2) continue;
    const union = new Set();
    withIface.forEach((k) => pk[k].ifaces[mi].props.forEach((_t, p) => union.add(p)));
    const diff = [...union].filter((p) => new Set(withIface.map((k) => pk[k].ifaces[mi].props.has(p))).size > 1);
    if (diff.length) { out.push(`FAIL ${c}: ${mi} prop(s) not in every kit — ${diff.join(', ')}  [${withIface.map((k) => `${k}:{${[...pk[k].ifaces[mi].props.keys()].join(',')}}`).join('  ')}]`); fails++; }
    const shared = [...union].filter((p) => withIface.every((k) => pk[k].ifaces[mi].props.has(p)));
    for (const p of shared) {
      const types = withIface.map((k) => pk[k].ifaces[mi].props.get(p).ty);
      if (new Set(types).size > 1) { out.push(`FAIL ${c}: ${mi}.${p} TYPE differs — ${withIface.map((k, i) => `${k}:${types[i]}`).join('  |  ')}`); fails++; }
      const opts = withIface.map((k) => pk[k].ifaces[mi].props.get(p).opt);
      if (new Set(opts).size > 1) { out.push(`FAIL ${c}: ${mi}.${p} OPTIONALITY differs — ${withIface.map((k, i) => `${k}:${opts[i] ? 'optional' : 'REQUIRED'}`).join('  |  ')}`); fails++; }
    }
    const exts = withIface.map((k) => pk[k].ifaces[mi].ext);
    if (new Set(exts).size > 1) { out.push(`FAIL ${c}: ${mi} extends differ — ${withIface.map((k, i) => `${k}:${exts[i] || '∅'}`).join('  |  ')}`); fails++; }
  }

  const dkeys = new Set();
  present.forEach((k) => Object.keys(pk[k].defaults).forEach((d) => dkeys.add(d)));
  for (const d of dkeys) {
    const per = present.filter((k) => pk[k].defaults[d] !== undefined);
    const vals = per.map((k) => pk[k].defaults[d]);
    if (new Set(vals).size > 1) { out.push(`FAIL ${c}: ${d} DEFAULT differs — ${per.map((k, i) => `${k}:${vals[i]}`).join('  |  ')}`); fails++; }
    // present-vs-absent is ALSO drift: a kit that omits the default silently falls
    // through to the library default (bauhaus Tooltip.delay -> Base UI 600 vs 200)
    const fn = d.split('.')[0];
    const missing = present.filter((k) => pk[k].defaults[d] === undefined && pk[k].exports.has(fn));
    if (per.length && missing.length) { out.push(`FAIL ${c}: ${d} DEFAULT missing in [${missing.join(',')}] — others: ${per.map((k, i) => `${k}:${vals[i]}`).join('  ')}`); fails++; }
  }
}

// STRUCTURAL PASSTHROUGH — a Base-UI-backed wrapper must extend the primitive's
// props (interface extends ComponentProps<typeof Base.X>, usually with Omit for
// intercepted keys) so unowned Base UI props flow through structurally; a
// hand-enumerated closed interface silently subsets Base UI (the OtpField
// onValueComplete class). DOM-only presentational comps have no Base target.
const DOM_ONLY = new Set(['Badge']);
for (const c of comps) {
  if (DOM_ONLY.has(c)) continue;
  for (const k of KITS) {
    const f = `${KITROOT}/${k}/components/${c}/${c}.tsx`;
    if (!fs.existsSync(f)) continue;
    const s = fs.readFileSync(f, 'utf8');
    if (!/@base-ui\/react/.test(s)) continue;
    if (!/ComponentProps(WithoutRef)?</.test(s)) {
      out.push(`FAIL ${c}: ${k} wrapper is a CLOSED interface (no ComponentProps extends) — Base UI props cannot pass through`);
      fails++;
    }
  }
}

out.forEach((l) => console.log('  ' + l));
console.log(`\nRESULT: ${fails ? `${fails} API PARITY FAIL` : `PASS (wrapper APIs aligned across ${KITS.length} kits, ${comps.length} components; exempt: ${[...SKIP].join('/')})`}`);
process.exit(fails ? 1 : 0);
