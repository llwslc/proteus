// kit-a11y — the demo page's accessibility contract, per kit.
// Kills the THEME_AUDIT C-01/C-02/H-02 class: visible captions not wired to
// controls, keyboard-unreachable context menus, unnamed icon-only buttons in
// mounted UI, status glyphs absent from the accessibility tree, generic loader
// names. Every check counts its audited targets and fails on zero — a green
// run that audited nothing is a broken gate, not a pass.
// node .claude/skills/kit-a11y/check.cjs [kit] [port]
const { pw, CHROME, port, urlOf, DESKTOP, kitsOf, setKit } = require("../lib/gate.cjs");

(async () => {
  const only = process.argv[2];
  const url = urlOf(port(process.argv[3]));
  const { chromium } = pw();
  const browser = await chromium.launch({ executablePath: CHROME, args: ["--disable-gpu"] });
  const page = await browser.newPage({ viewport: DESKTOP });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  const kits = await kitsOf(page, only);
  const fails = [];
  let audited = 0;

  for (const kit of kits) {
    await setKit(page, url, kit);
    await page.waitForSelector("#select", { timeout: 20000 });

    // A — every demo form control carries an accessible name
    const A = await page.evaluate(() => {
      const named = (el) => {
        if ((el.getAttribute("aria-label") || "").trim()) return true;
        const lb = el.getAttribute("aria-labelledby");
        if (lb && lb.split(/\s+/).some((id) => (document.getElementById(id)?.textContent || "").trim())) return true;
        if (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) return true;
        if (el.closest("label")) return true;
        return false;
      };
      const targets = [
        ...document.querySelectorAll('#select [aria-haspopup="listbox"]'),
        ...document.querySelectorAll("#combobox input, #autocomplete input"),
        ...document.querySelectorAll("#number input, #input input"),
        ...document.querySelectorAll('#otp [role="group"]'),
        ...document.querySelectorAll("#slider input"),
      ].filter((el) => el.getAttribute("aria-hidden") !== "true");
      return {
        count: targets.length,
        bad: targets
          .filter((el) => !named(el))
          .map((el) => `${el.tagName.toLowerCase()}#${el.id || "?"} in #${el.closest("[id]")?.id}`),
      };
    });
    if (A.count < 10) fails.push(`${kit}: acc-name audited only ${A.count} targets (<10) — selector rot?`);
    for (const b of A.bad) fails.push(`${kit}: unnamed form control ${b}`);
    audited += A.count;

    // B — context-menu zone is keyboard-reachable and Shift+F10 opens it
    const zone = page.locator(`.${kit}-context__zone`).first();
    if (!(await zone.count())) fails.push(`${kit}: no context zone found`);
    else {
      if ((await zone.getAttribute("tabindex")) !== "0") fails.push(`${kit}: ctx zone tabindex != 0`);
      await zone.scrollIntoViewIfNeeded();
      await zone.focus();
      await page.keyboard.press("Shift+F10");
      await page.waitForTimeout(400);
      const open = await page.locator('[role="menu"]').count();
      if (!open) fails.push(`${kit}: Shift+F10 on ctx zone did not open the menu`);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
      if (await page.locator('[role="menu"]').count()) fails.push(`${kit}: Escape did not close ctx menu`);
      audited += 1;
    }

    // C — icon-only buttons must have names (rest sweep + open popover sweep)
    const sweep = () =>
      page.evaluate(() =>
        [...document.querySelectorAll("button")]
          .filter((b) => {
            const txt = (b.textContent || "").trim();
            const named =
              txt ||
              (b.getAttribute("aria-label") || "").trim() ||
              b.getAttribute("aria-labelledby") ||
              (b.getAttribute("title") || "").trim();
            return !named;
          })
          .map((b) => b.className.split(/\s+/).slice(0, 2).join(".")),
      );
    const restBtns = await page.evaluate(() => document.querySelectorAll("button").length);
    for (const c of await sweep()) fails.push(`${kit}: nameless icon button .${c}`);
    audited += restBtns;
    await page.locator("#popover button").first().click();
    await page.waitForTimeout(400);
    for (const c of await sweep()) fails.push(`${kit}: nameless icon button (popover open) .${c}`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // D — avatar status dots live in the accessibility tree
    const D = await page.evaluate(() => {
      const st = [...document.querySelectorAll('[class*="avatar__status"]')];
      return {
        count: st.length,
        bad: st.filter((s) => s.getAttribute("role") !== "img" || !(s.getAttribute("aria-label") || "").trim()).length,
      };
    });
    if (!D.count) fails.push(`${kit}: avatar-status audited 0 targets`);
    if (D.bad) fails.push(`${kit}: ${D.bad} avatar status dot(s) lack role="img"+aria-label`);
    audited += D.count;

    // E — loader announces its theme, not a generic "Loading"
    const E = await page.evaluate(() => {
      const l = document.querySelector('[class$="-loader"][role="status"]');
      return l ? l.getAttribute("aria-label") || "" : null;
    });
    if (E === null) fails.push(`${kit}: demo loader not found`);
    else if (!E || E === "Loading") fails.push(`${kit}: loader aria-label generic ("${E}")`);
    audited += 1;
  }

  await browser.close();
  if (fails.length) {
    for (const f of fails) console.log("FAIL " + f);
    console.log(`RESULT: FAIL (${fails.length} finding(s), ${audited} targets audited)`);
    process.exit(1);
  }
  console.log(`RESULT: PASS (a11y contract holds — ${kits.length} kits, ${audited} targets audited)`);
})().catch((e) => {
  console.error("ERR " + e.message);
  process.exit(2);
});
