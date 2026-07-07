// gate.cjs — shared harness for the dynamic kit gates.
// Owns the pieces every browser gate needs identically: the /tmp/pw
// playwright-core load (with an actionable precheck instead of a bare crash),
// the Chrome path, port resolution (explicit arg > GATE_PORT env > 5273 — kit-qa
// exports GATE_PORT so [port] reaches every gate), the audit viewports, and kit
// discovery from the live switcher — which ASSERTS the list is non-empty and
// that a requested kit filter matches, so a renamed switcher class or a typoed
// kit id exits 2 instead of silently auditing nothing.
const fs = require('fs');
const PW = '/tmp/pw/node_modules/playwright-core';

function pw() {
  if (!fs.existsSync(PW)) {
    console.error('ERR /tmp/pw playwright-core missing (lost on reboot) — bootstrap it first:');
    console.error('    mkdir -p /tmp/pw && cd /tmp/pw && npm i playwright-core');
    process.exit(2);
  }
  return require(PW);
}

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = (explicit) => explicit || process.env.GATE_PORT || '5273';
const urlOf = (p) => `http://127.0.0.1:${p}/`;

// one desktop box for every gate — the audit width is part of the audit surface,
// so it must not drift per gate. kit-visual's extra tight/phone widths are its
// own deliberate tri-width sweep, not a divergence.
const DESKTOP = { width: 1440, height: 950 };
const PHONE = { width: 390, height: 844 };

async function kitsOf(page, only) {
  const kits = await page.$$eval('.shell-switch__btn', (els) =>
    els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));
  if (!kits.length) {
    console.error('ERR kit discovery matched 0 kits (.shell-switch__btn[data-kit-id]) — the gate would audit NOTHING; fix the switcher selector');
    process.exit(2);
  }
  if (only) {
    const f = kits.filter((k) => k === only);
    if (!f.length) {
      console.error(`ERR kit '${only}' not in the switcher [${kits.join(' ')}] — nothing would be audited`);
      process.exit(2);
    }
    return f;
  }
  return kits;
}

async function setKit(page, url, kit) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate((k) => localStorage.setItem('kit', k), kit);
  await page.reload({ waitUntil: 'networkidle' });
}

module.exports = { pw, CHROME, port, urlOf, DESKTOP, PHONE, kitsOf, setKit };
