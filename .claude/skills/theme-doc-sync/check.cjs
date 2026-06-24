const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const themesDir = path.join(ROOT, 'prompt/themes');
const kitsDir = path.join(ROOT, 'src/kits');

const kits = fs.readdirSync(kitsDir).filter((k) =>
  fs.existsSync(path.join(kitsDir, k, 'theme/tokens.css')) && fs.existsSync(path.join(themesDir, `${k}.md`)));

const CITE = /`([a-z][a-z0-9-]*)\s+(#[0-9a-fA-F]{3,8})`/g;
let total = 0;
for (const kit of kits) {
  const doc = fs.readFileSync(path.join(themesDir, `${kit}.md`), 'utf8');
  const css = fs.readFileSync(path.join(kitsDir, kit, 'theme/tokens.css'), 'utf8');
  const findings = [];
  for (const [, name, hex] of doc.matchAll(CITE)) {
    const def = css.match(new RegExp(`--${kit}-${name}\\s*:\\s*([^;]+);`));
    if (!def) findings.push(`cited \`${name} ${hex}\` — no --${kit}-${name} in tokens.css`);
    else if (!def[1].toLowerCase().includes(hex.toLowerCase()))
      findings.push(`\`${name}\`: doc ${hex}, code ${def[1].trim()}`);
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
