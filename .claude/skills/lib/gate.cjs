// gate.cjs — shared harness for the dynamic kit gates.
// Owns the pieces every browser gate needs identically: the /tmp/pw
// playwright-core load (with an actionable precheck instead of a bare crash),
// the Chrome path, port resolution (explicit arg > GATE_PORT env > 5273 — kit-qa
// exports GATE_PORT so [port] reaches every gate), the audit viewports, and kit
// discovery from the live switcher — which ASSERTS the list is non-empty and
// that a requested kit filter matches, so a renamed switcher class or a typoed
// kit id exits 2 instead of silently auditing nothing.
const fs = require('fs');
const path = require('path');
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

// kits come from src/kits/ — the gates guard the kits, so the shell's home page
// (and its live thumbnail iframes) stays off their path entirely. Still asserts
// non-empty, so a moved directory exits 2 instead of silently auditing nothing.
const KITS_DIR = path.join(__dirname, '..', '..', '..', 'src', 'kits');
async function kitsOf(_page, only) {
  const kits = fs.existsSync(KITS_DIR)
    ? fs.readdirSync(KITS_DIR).filter((d) => fs.statSync(path.join(KITS_DIR, d)).isDirectory()).sort()
    : [];
  if (!kits.length) {
    console.error(`ERR kit discovery matched 0 kits under ${KITS_DIR} — the gate would audit NOTHING`);
    process.exit(2);
  }
  if (only) {
    const f = kits.filter((k) => k === only);
    if (!f.length) {
      console.error(`ERR kit '${only}' not under src/kits [${kits.join(' ')}] — nothing would be audited`);
      process.exit(2);
    }
    return f;
  }
  return kits;
}

// one kit, no shell chrome, no thumbnail iframes. Waits for the sidebar rather
// than for `networkidle` — the home page's external font requests never reliably
// settle, which is what used to hang goto for the full 30s timeout.
const embedUrl = (url, kit) => `${url}${url.includes('?') ? '&' : '?'}embed=1&kit=${kit}`;
const READY = '[class*="-sidebar__link"]';

async function setKit(page, url, kit) {
  await page.goto(embedUrl(url, kit), { waitUntil: 'domcontentloaded' });
  // attached, not visible — the sidebar is display:none at phone width
  await page.waitForSelector(READY, { state: 'attached', timeout: 20000 });
  // `document.fonts.ready` alone LIES here: each kit pulls its faces through an
  // @import inside typography.css, so at first paint the font set is still EMPTY
  // and an empty set reports "loaded" instantly. The 700+ faces register ~500ms
  // later and take ~1.5s to settle — measuring before that gives unstable text
  // metrics. Wait for a non-empty set that has finished.
  await page
    .waitForFunction(() => document.fonts.size > 0 && document.fonts.status === 'loaded', null, { timeout: 15000 })
    .catch(() => {});
  await page.evaluate(() => document.fonts.ready);
}

module.exports = { pw, CHROME, port, urlOf, embedUrl, READY, DESKTOP, PHONE, kitsOf, setKit };
