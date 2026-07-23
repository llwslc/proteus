"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";

const THEMES = [
  {
    id: "sumi",
    name: "SUMI",
    index: "01",
    direction: "水墨禅",
    english: "Zen ink",
    kicker: "間 · THE BEAUTY BETWEEN",
    title: "余白",
    display: "SUMI",
    description:
      "A quiet system built from breath, fibre and one decisive brushstroke.",
    note: "The ink does not fill the page. It gives the silence a shape.",
    glyph: "墨",
    action: "Begin the practice",
    stats: [
      ["BREATH", "08"],
      ["INK", "100%"],
      ["NOISE", "0.2"],
    ],
    palette: ["#f2efe5", "#171613", "#a33a2b", "#d8d1c2"],
  },
  {
    id: "ormolu",
    name: "ORMOLU",
    index: "02",
    direction: "洛可可宫廷",
    english: "Rococo court",
    kicker: "SALON DES FORMES · MMXXVI",
    title: "La belle interface",
    display: "ORMOLU",
    description:
      "An opulent composition of ivory, sage silk and delicately aged gold.",
    note: "Every useful object deserves the entrance of a small ceremony.",
    glyph: "O",
    action: "Enter the salon",
    stats: [
      ["ÉDITION", "VII"],
      ["GILT", "24K"],
      ["GRACE", "∞"],
    ],
    palette: ["#f4eedf", "#9ba98f", "#b48b3e", "#d9a0a7"],
  },
  {
    id: "nocturne",
    name: "NOCTURNE",
    index: "03",
    direction: "暗夜花园",
    english: "Dark botanical",
    kicker: "HERBARIUM / AFTER MIDNIGHT",
    title: "Night blooms slowly",
    display: "NOCTURNE",
    description:
      "A velvet-dark garden where brass labels glow under wine-red petals.",
    note: "Some flowers wait for the room to grow quiet before they open.",
    glyph: "✦",
    action: "Open the glasshouse",
    stats: [
      ["SPECIMEN", "N° 17"],
      ["BLOOM", "23:48"],
      ["LUX", "004"],
    ],
    palette: ["#1b101c", "#501d2b", "#b59352", "#e9e0d2"],
  },
  {
    id: "pulp",
    name: "PULP",
    index: "04",
    direction: "复古廉价小说",
    english: "Pulp paperback",
    kicker: "A 15¢ KIT THRILLER · VOL. 47",
    title: "The Crimson Ledger",
    display: "PULP",
    description:
      "A hard-boiled paperback system printed fast, loud and slightly off-register.",
    note: "She clicked the button. Somewhere, a server began to sweat.",
    glyph: "47",
    action: "Turn the page",
    stats: [
      ["CASE", "47-B"],
      ["PRINT", "15¢"],
      ["RISK", "HIGH"],
    ],
    palette: ["#e6d3a4", "#a43527", "#d5a92e", "#17454c"],
  },
  {
    id: "totem",
    name: "TOTEM",
    index: "05",
    direction: "民艺图腾",
    english: "Folk craft",
    kicker: "HAND / EARTH / RHYTHM",
    title: "Made in pattern",
    display: "TOTEM",
    description:
      "A warm folk system carved from ochre, indigo and repeated human rhythm.",
    note: "The mark of the maker is not an error. It is the beginning of the pattern.",
    glyph: "◆",
    action: "Join the circle",
    stats: [
      ["MOTIF", "12"],
      ["WEAVE", "4×4"],
      ["MAKER", "YOU"],
    ],
    palette: ["#9e4f2c", "#243e62", "#eee3cc", "#b63f2d"],
  },
  {
    id: "kiln",
    name: "KILN",
    index: "06",
    direction: "陶土侘寂",
    english: "Wabi-sabi clay",
    kicker: "OBJECTS / FIRE / TIME",
    title: "Perfectly unfinished",
    display: "KILN",
    description:
      "A tactile collection shaped by smoke, oat paper and soft terracotta.",
    note: "Keep the thumbprint. It remembers how the object came to be.",
    glyph: "◯",
    action: "View the collection",
    stats: [
      ["FIRING", "1220°"],
      ["BATCH", "06"],
      ["FORM", "OPEN"],
    ],
    palette: ["#211f1c", "#e5dbc7", "#bd6844", "#8c8272"],
  },
  {
    id: "chrome",
    name: "CHROME",
    index: "07",
    direction: "千禧液态铬",
    english: "Y2K aero",
    kicker: "FLUID INTERFACE / 2002 ↻ 2026",
    title: "Touch the future",
    display: "CHROME",
    description:
      "A buoyant digital dream in steel blue, water gel and liquid mirror.",
    note: "The future used to be shinier. We brought the shine back.",
    glyph: "C",
    action: "Enter orbit",
    stats: [
      ["AERO", "02K"],
      ["FLOW", "99.8"],
      ["SHINE", "MAX"],
    ],
    palette: ["#375d88", "#d7e8ef", "#6ed4f0", "#e793f0"],
  },
  {
    id: "arcade",
    name: "ARCADE",
    index: "08",
    direction: "8-bit 街机",
    english: "Retro arcade",
    kicker: "1UP · PLAYER READY",
    title: "INSERT WONDER",
    display: "ARCADE",
    description:
      "A cabinet-lit interface of maze lines, phosphor pixels and chasing ghosts.",
    note: "PRESS START. The next screen belongs to you.",
    glyph: "▶",
    action: "Press start",
    stats: [
      ["SCORE", "028640"],
      ["LIVES", "●●●"],
      ["STAGE", "08"],
    ],
    palette: ["#090b16", "#20d7ff", "#ff3f59", "#ffd43b"],
  },
  {
    id: "bitmap",
    name: "BITMAP",
    index: "09",
    direction: "1-bit 位图",
    english: "One-bit dither",
    kicker: "KIT_OS 1.0 / 640K FREE",
    title: "Theme Browser",
    display: "BITMAP",
    description:
      "A strictly monochrome desktop assembled from one-pixel rules and ordered dither.",
    note: "No gradients. No smoothing. No unnecessary bytes.",
    glyph: "⌁",
    action: "OPEN_THEME.EXE",
    stats: [
      ["COLOR", "1-BIT"],
      ["MEM", "640K"],
      ["FILES", "15"],
    ],
    palette: ["#f7f7ef", "#050505", "#f7f7ef", "#050505"],
  },
  {
    id: "mochi",
    name: "MOCHI",
    index: "10",
    direction: "软陶泡芙",
    english: "Clay squish",
    kicker: "FRESHLY MADE · EXTRA SOFT",
    title: "Soft enough to squish",
    display: "MOCHI",
    description:
      "A joyful tray of pillowy controls, frosted edges and tiny sugar-sprinkle details.",
    note: "Good interfaces should feel like they would bounce if you dropped them.",
    glyph: "●",
    action: "Give it a squeeze",
    stats: [
      ["SQUISH", "92%"],
      ["SWEET", "YES"],
      ["BATCH", "10"],
    ],
    palette: ["#fff5df", "#f3a7b9", "#8ccbe4", "#f4cf68"],
  },
  {
    id: "scribble",
    name: "SCRIBBLE",
    index: "11",
    direction: "手账涂鸦",
    english: "Notebook doodle",
    kicker: "TUESDAY / IDEAS BEFORE LUNCH",
    title: "Ideas before they behave",
    display: "SCRIBBLE",
    description:
      "A blue-ink notebook full of highlighter, tape, arrows and unfinished thoughts.",
    note: "Circle the useful bit. Cross out the boring bit. Keep moving.",
    glyph: "↗",
    action: "Add a new idea",
    stats: [
      ["PAGES", "11"],
      ["COFFEE", "2×"],
      ["IDEAS", "LOTS"],
    ],
    palette: ["#f7f4e9", "#2453a5", "#f2df58", "#ef8eb4"],
  },
  {
    id: "axon",
    name: "AXON",
    index: "12",
    direction: "轴测蓝图",
    english: "Isometric blueprint",
    kicker: "SHEET A–12 / SCALE 1:24",
    title: "Systems in three axes",
    display: "AXON",
    description:
      "A precise construction language of projected planes, dimensions and one orange signal.",
    note: "Every surface is a decision. Every gap can be measured.",
    glyph: "⌗",
    action: "Explode the view",
    stats: [
      ["SCALE", "1:24"],
      ["AXIS", "30°"],
      ["REV", "C.12"],
    ],
    palette: ["#365968", "#e7f1ef", "#ef7f45", "#6f919a"],
  },
  {
    id: "corona",
    name: "CORONA",
    index: "13",
    direction: "日蚀玻璃",
    english: "Eclipse glass",
    kicker: "OBSERVATORY / TOTALITY T–00:42",
    title: "Stay for totality",
    display: "CORONA",
    description:
      "Obsidian glass, amber corona and atmospheric cyan arranged for the rarest light.",
    note: "For one brief minute, the sky reveals the machinery behind daylight.",
    glyph: "◉",
    action: "Begin observation",
    stats: [
      ["OBSC.", "98.7%"],
      ["AZ.", "241.8°"],
      ["LUX", "003"],
    ],
    palette: ["#080a0c", "#e6a335", "#44b8bd", "#eef2ee"],
  },
  {
    id: "qalam",
    name: "QALAM",
    index: "14",
    direction: "纳斯塔利克书斋",
    english: "Nastaliq modern",
    kicker: "THE SCRIBE’S ROOM · دفترِ نو",
    title: "قلم",
    display: "QALAM",
    description:
      "A contemplative reading room of warm parchment, ink teal and terracotta seals.",
    note: "The line begins in silence and finishes with a flourish.",
    glyph: "ق",
    action: "ورق کھولیے · Open folio",
    stats: [
      ["FOLIO", "۱۴"],
      ["INK", "TEAL"],
      ["ED.", "I"],
    ],
    palette: ["#f0e2c8", "#163f43", "#b85d3f", "#c7a75c"],
  },
  {
    id: "gazette",
    name: "GAZETTE",
    index: "15",
    direction: "报章排印",
    english: "Broadsheet",
    kicker: "THURSDAY, JULY 23 · FINAL EDITION",
    title: "The Kit Gazette",
    display: "GAZETTE",
    description:
      "A disciplined front page of high-contrast type, hairline rules and inky blue facts.",
    note: "Fifteen new visual systems enter circulation today.",
    glyph: "G",
    action: "Read the edition",
    stats: [
      ["VOL.", "XV"],
      ["PRICE", "2¢"],
      ["COLS.", "06"],
    ],
    palette: ["#ece9df", "#171817", "#254d79", "#aaa69a"],
  },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

function Scene({ theme }: { theme: (typeof THEMES)[number] }) {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-grid" />
      <div className="scene-orbit orbit-one" />
      <div className="scene-orbit orbit-two" />
      <div className="scene-object object-main">
        <span>{theme.glyph}</span>
      </div>
      <div className="scene-object object-small" />
      <div className="scene-object object-tiny" />
      <div className="scene-line line-one" />
      <div className="scene-line line-two" />
      <div className="scene-label label-one">{theme.index}</div>
      <div className="scene-label label-two">{theme.english}</div>
      <div className="petal petal-one" />
      <div className="petal petal-two" />
      <div className="petal petal-three" />
      <div className="pixel-sprite">◆</div>
      <div className="stamp-mark">{theme.glyph}</div>
    </div>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState<ThemeId>("sumi");
  const activeIndex = THEMES.findIndex((theme) => theme.id === activeId);
  const active = THEMES[activeIndex];

  const selectTheme = (id: ThemeId) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#theme=${id}`);
  };

  const stepTheme = (direction: number) => {
    const next = (activeIndex + direction + THEMES.length) % THEMES.length;
    selectTheme(THEMES[next].id);
  };

  const shuffleTheme = () => {
    const jump = 5 + Math.floor(Math.random() * (THEMES.length - 5));
    const next = (activeIndex + jump) % THEMES.length;
    selectTheme(THEMES[next].id);
  };

  useEffect(() => {
    const id = window.location.hash.replace("#theme=", "") as ThemeId;
    if (THEMES.some((theme) => theme.id === id)) {
      setActiveId(id);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "ArrowLeft") stepTheme(-1);
      if (event.key === "ArrowRight") stepTheme(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const themeStyle = useMemo(
    () =>
      ({
        "--theme-progress": `${((activeIndex + 1) / THEMES.length) * 100}%`,
      }) as CSSProperties,
    [activeIndex],
  );

  return (
    <main className="theme-lab" data-theme={active.id} style={themeStyle}>
      <div className="paper-noise" aria-hidden="true" />
      <aside className="theme-rail">
        <header className="rail-header">
          <div className="rail-mark">K</div>
          <div>
            <p className="rail-overline">KIT / THEME LAB</p>
            <p className="rail-title">Candidate archive</p>
          </div>
          <span className="rail-count">15</span>
        </header>

        <nav className="theme-nav" aria-label="Candidate themes">
          {THEMES.map((theme) => (
            <button
              className="theme-link"
              data-theme-id={theme.id}
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              aria-current={active.id === theme.id ? "true" : undefined}
              title={`${theme.name} — ${theme.direction}`}
            >
              <span className="theme-index">{theme.index}</span>
              <span className="theme-name">{theme.name}</span>
              <span className="theme-dot" aria-hidden="true" />
            </button>
          ))}
        </nav>

        <footer className="rail-footer">
          <span>← / →</span>
          <span>15 directions</span>
        </footer>
      </aside>

      <section className="lab-canvas">
        <header className="canvas-topbar">
          <div className="breadcrumb">
            <span>KIT</span>
            <i>/</i>
            <strong>{active.name}</strong>
          </div>
          <div className="topbar-actions">
            <span className="status-dot" />
            <span className="status-text">candidate active</span>
            <button className="shuffle-button" onClick={shuffleTheme}>
              Shuffle <span>↻</span>
            </button>
          </div>
        </header>

        <div className="theme-progress" aria-hidden="true">
          <span />
        </div>

        <div className="theme-content" key={active.id}>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">{active.kicker}</p>
              <div className="hero-heading">
                <h1>{active.title}</h1>
                <span className="hero-glyph">{active.glyph}</span>
              </div>
              <p className="hero-description">{active.description}</p>
              <div className="hero-actions">
                <button className="primary-action">
                  <span>{active.action}</span>
                  <b aria-hidden="true">↗</b>
                </button>
                <button
                  className="icon-action"
                  onClick={() => stepTheme(1)}
                  aria-label="Next theme"
                >
                  →
                </button>
              </div>
            </div>

            <div className="visual-wrap">
              <div className="visual-caption">
                <span>FIG. {active.index}</span>
                <span>{active.english}</span>
              </div>
              <Scene theme={active} />
            </div>
          </section>

          <section className="specimen-grid">
            <article className="specimen-card palette-card">
              <header className="card-heading">
                <span>01</span>
                <h2>Palette</h2>
                <i />
              </header>
              <div className="swatches">
                {active.palette.map((color, index) => (
                  <div className="swatch-wrap" key={`${color}-${index}`}>
                    <span
                      className="swatch"
                      style={{ "--swatch": color } as CSSProperties}
                    />
                    <code>{color}</code>
                  </div>
                ))}
              </div>
            </article>

            <article className="specimen-card type-card">
              <header className="card-heading">
                <span>02</span>
                <h2>Type</h2>
                <i />
              </header>
              <div className="type-sample">
                <strong>{active.display}</strong>
                <p>Aa Bb Cc 0123</p>
                <small>{active.direction} / {active.english}</small>
              </div>
            </article>

            <article className="specimen-card data-card">
              <header className="card-heading">
                <span>03</span>
                <h2>Signals</h2>
                <i />
              </header>
              <div className="data-list">
                {active.stats.map(([label, value], index) => (
                  <div className="data-row" key={label}>
                    <div>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                    <div className="meter">
                      <i style={{ width: `${47 + index * 19}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="specimen-card quote-card">
              <header className="card-heading">
                <span>04</span>
                <h2>Voice</h2>
                <i />
              </header>
              <blockquote>“{active.note}”</blockquote>
              <div className="quote-signature">
                <span>{active.glyph}</span>
                <small>Kit archive / {active.index}</small>
              </div>
            </article>
          </section>

          <footer className="canvas-footer">
            <div className="footer-meta">
              <span>{active.index} / {THEMES.length}</span>
              <strong>{active.direction}</strong>
              <span>{active.english}</span>
            </div>
            <div className="pager">
              <button onClick={() => stepTheme(-1)} aria-label="Previous theme">
                ←
              </button>
              <span>
                <i />
              </span>
              <button onClick={() => stepTheme(1)} aria-label="Next theme">
                →
              </button>
            </div>
          </footer>
        </div>
      </section>

      <div className="theme-announcer" aria-live="polite">
        {active.name} theme selected
      </div>
    </main>
  );
}
