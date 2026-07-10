const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const themesDir = path.join(ROOT, 'prompt/theme');
const kitsDir = path.join(ROOT, 'src/kits');

// every kit with a tokens.css MUST have a catalog doc — an intersection here would
// silently drop a kit whose doc was never written and still PASS
const withTokens = fs.readdirSync(kitsDir).filter((k) => fs.existsSync(path.join(kitsDir, k, 'theme/tokens.css')));
const undocumented = withTokens.filter((k) => !fs.existsSync(path.join(themesDir, `${k}.md`)));
if (undocumented.length) {
  console.log(`RESULT: FAIL — kit(s) with no prompt/theme/<kit>.md catalog doc: ${undocumented.join(', ')}`);
  process.exit(1);
}
const kits = withTokens;

const readAll = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? readAll(p) : [fs.readFileSync(p, 'utf8')];
}).join('\n');

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
const SINGLE = /^(base|void|stone|paper|off|track|text|ink|scrim|surface|sheen|tint|line)$/;
const isHex = (s) => /^#[0-9a-fA-F]{3,8}$/.test(s);
const isVal = (s) => isHex(s) || /^\.\d+$/.test(s) || /^\d+(px|em|rem|ms|s)$/.test(s);

let total = 0;
for (const kit of kits) {
  const doc = fs.readFileSync(path.join(themesDir, `${kit}.md`), 'utf8');
  const css = fs.readFileSync(path.join(kitsDir, kit, 'theme/tokens.css'), 'utf8');
  const findings = [];
  const seen = new Set();
  for (const span of doc.matchAll(/`([^`]+)`/g)) {
    for (const frag of span[1].split(/[·/;、,]/)) {
      const parts = frag.trim().split(/\s+/).filter(Boolean);
      if (parts.length < 2) continue;
      const name = parts[0];
      if (!KEBAB.test(name) && !SINGLE.test(name)) continue;
      const val = parts.slice(1).find(isVal);
      if (!val) continue;
      const k = `${name} ${val}`;
      if (seen.has(k)) continue;
      seen.add(k);
      const def = css.match(new RegExp(`--${kit}-${name}\\s*:\\s*([^;]+);`));
      if (!def) findings.push(`cited \`${name} ${val}\` — no --${kit}-${name} in tokens.css`);
      else if (isHex(val) && !def[1].toLowerCase().includes(val.toLowerCase()))
        findings.push(`\`${name}\`: doc ${val}, code ${def[1].trim()}`);
    }
  }
  const skinPath = path.join(ROOT, 'prompt/components/theme', `${kit}.md`);
  if (fs.existsSync(skinPath)) {
    const skin = fs.readFileSync(skinPath, 'utf8');
    const src = readAll(path.join(kitsDir, kit));
    const cited = new Set();
    for (const span of skin.matchAll(/`([^`]+)`/g)) {
      let sawFull = false;
      for (const part of span[1].split('/')) {
        const t = part.trim();
        const full = t.match(new RegExp(`^--${kit}-[a-z0-9-]+`));
        if (full) { sawFull = true; if (full[0].endsWith('-color')) cited.add(full[0]); }
        else if (sawFull && /^-[a-z][a-z0-9-]*-color$/.test(t)) cited.add(`--${kit}${t}`);
      }
    }
    for (const name of cited)
      if (!src.includes(name)) findings.push(`skin doc cites \`${name}\` — not found anywhere in src/kits/${kit}`);
  }

  if (findings.length) {
    console.log(`\n=== ${kit} ===`);
    findings.forEach((f) => console.log(`  DRIFT ${f}`));
  }
  total += findings.length;
}
console.log(total
  ? `\nRESULT: ${total} drift(s) — theme catalog out of sync with tokens.css`
  : `\nRESULT: PASS (theme docs match code across ${kits.length} kits)`);
process.exit(total ? 1 : 0);
