const themes = [
  {
    id: "sumi",
    name: "SUMI",
    direction: "水墨禅",
    genre: "ZEN INK",
    glyph: "墨",
    kicker: "A quiet system of paper and ink",
    description: "让界面像一张正在呼吸的宣纸：焦墨建立秩序，朱印只在最重要的动作上落下。",
    statement: "“克制不是空白，而是让每个动作都有落笔的理由。”",
    palette: "Paper · Ink · Vermilion",
    type: "Brush · Ming",
    shape: "Asymmetric · Open",
    motion: "Slow brush reveal",
    stageMotion: "BRUSH REVEAL · 640MS",
    colors: ["#F1EEE4", "#FAF7EE", "#171613", "#A33A2B", "#D3B45B"],
    radius: "0 PX",
    typeSample: "形随意生，秩序留白。",
    shapeName: "Open geometry",
    closing: "Make space for the essential.",
  },
  {
    id: "ormolu",
    name: "ORMOLU",
    direction: "洛可可宫廷",
    genre: "ROCOCO",
    glyph: "O",
    kicker: "Ornament becomes gracious order",
    description: "象牙、鼠尾草与旧金共同搭起一座轻盈宫殿；精致不是堆砌，而是把层级包装成礼仪。",
    statement: "“每一次点击都像推开一道鎏金门扉，庄重，却不迟缓。”",
    palette: "Ivory · Sage · Gilt",
    type: "Didot · Script",
    shape: "Cartouche · Symmetry",
    motion: "Curtain reveal",
    stageMotion: "CURTAIN REVEAL · 720MS",
    colors: ["#EEE8DC", "#FFFAF0", "#3A2C2E", "#9A7731", "#C98393"],
    radius: "34 PX",
    typeSample: "Elegance, composed in symmetry.",
    shapeName: "Gilded cartouche",
    closing: "Turn every interaction into an occasion.",
  },
  {
    id: "nocturne",
    name: "NOCTURNE",
    direction: "暗夜花园",
    genre: "DARK BOTANICAL",
    glyph: "✤",
    kicker: "A garden that wakes after dusk",
    description: "深茄紫与酒红铺成夜色，黄铜和骨白从丝绒表面缓慢浮现，让复杂产品也拥有神秘的呼吸。",
    statement: "“信息不必在黑暗里消失，它可以像夜花一样逐层开放。”",
    palette: "Aubergine · Bone · Brass",
    type: "Bodoni · Italic",
    shape: "Framed · Botanical",
    motion: "Night bloom",
    stageMotion: "NIGHT BLOOM · 880MS",
    colors: ["#160F18", "#211722", "#F0E5D5", "#B38A4F", "#762D42"],
    radius: "4 PX",
    typeSample: "Nocturnal forms, quietly unfolding.",
    shapeName: "Botanical frame",
    closing: "Let the interface bloom after dark.",
  },
  {
    id: "pulp",
    name: "PULP",
    direction: "复古廉价小说",
    genre: "PULP PAPERBACK",
    glyph: "!",
    kicker: "High stakes in four-color ink",
    description: "做旧米黄、砖红和芥末黄把产品变成一本抓住眼球的廉价小说；每个状态都像标题一样直接。",
    statement: "“别让用户猜。把重点印得更大、更黑，再狠狠盖上一枚章。”",
    palette: "Aged paper · Brick · Mustard",
    type: "Slab · Condensed",
    shape: "Ticket · Stamp",
    motion: "Hard page turn",
    stageMotion: "STAMP IMPACT · 180MS",
    colors: ["#E3CC98", "#F1DCA8", "#172C2B", "#AA372B", "#D3A525"],
    radius: "0 PX",
    typeSample: "Tonight: the interface fights back.",
    shapeName: "Hard-edged ticket",
    closing: "Print the message too loud to miss.",
  },
  {
    id: "totem",
    name: "TOTEM",
    direction: "民艺图腾",
    genre: "FOLK CRAFT",
    glyph: "◆",
    kicker: "A rhythm woven into every state",
    description: "赭石、靛蓝和骨白编成清晰的边饰与网格；重复纹样负责秩序，手作温度负责记忆。",
    statement: "“组件不是孤立的图形，它们共同编成一块有节拍的织物。”",
    palette: "Ochre · Indigo · Bone",
    type: "Woodcut · Geometric",
    shape: "Band · Symmetry",
    motion: "Pattern step",
    stageMotion: "PATTERN STEP · 240MS",
    colors: ["#D9C39E", "#EAD8B7", "#1D3F50", "#A94431", "#D39B35"],
    radius: "2 PX",
    typeSample: "Pattern carries meaning forward.",
    shapeName: "Woven rhythm",
    closing: "Build a system people can feel.",
  },
  {
    id: "kiln",
    name: "KILN",
    direction: "陶土侘寂",
    genre: "WABI-SABI",
    glyph: "◒",
    kicker: "Useful objects, shaped by hand",
    description: "燕麦米、窑烟黑与赤陶橙保留材料的重量；柔软的不规则边缘让数字产品像一件被反复使用的器物。",
    statement: "“完整不等于无瑕，真正可靠的系统允许材料留下痕迹。”",
    palette: "Oat · Smoke · Terracotta",
    type: "Humanist serif · Soft sans",
    shape: "Irregular · Off-center",
    motion: "Gentle settling",
    stageMotion: "SOFT SETTLE · 520MS",
    colors: ["#D8CCB6", "#EEE5D4", "#2E2A25", "#B65D3F", "#927055"],
    radius: "32 / 11",
    typeSample: "有用之物，自有温度。",
    shapeName: "Hand-shaped edge",
    closing: "Make digital objects worth keeping.",
  },
  {
    id: "chrome",
    name: "CHROME",
    direction: "千禧液态铬",
    genre: "Y2K AERO",
    glyph: "C",
    kicker: "The optimistic future is glossy",
    description: "钢蓝、液态铬与水蓝凝胶折射出千禧年的乐观未来；按钮像气泡，信息像悬浮在玻璃中的光。",
    statement: "“未来不必冷酷，它可以圆润、清澈，并且闪着令人想按下去的光。”",
    palette: "Steel · Aqua · Hologram",
    type: "Rounded tech · Stretched",
    shape: "Bubble · Ellipse",
    motion: "Gel bounce",
    stageMotion: "LIQUID BOUNCE · 420MS",
    colors: ["#B7D5E8", "#EBF8FF", "#26324B", "#2B78D4", "#EF7BD1"],
    radius: "38 PX",
    typeSample: "A brighter interface is loading.",
    shapeName: "Liquid bubble",
    closing: "Bring back the future we were promised.",
  },
  {
    id: "arcade",
    name: "ARCADE",
    direction: "8-bit 街机",
    genre: "RETRO ARCADE",
    glyph: "▶",
    kicker: "Every workflow becomes a high score",
    description: "机柜黑、鬼影色和磷光白把产品状态写成一局街机：反馈即时、目标清晰、每次进展都有得分感。",
    statement: "“状态必须像吃到能量豆一样明确：看得见、听得懂、下一步立刻开始。”",
    palette: "Cabinet black · Ghost cyan",
    type: "Pixel · Score mono",
    shape: "Brick · Segmented",
    motion: "Frame step",
    stageMotion: "FRAME STEP · 120MS",
    colors: ["#080812", "#111126", "#F4F5DF", "#12E0D0", "#FFD631"],
    radius: "0 PX",
    typeSample: "PRESS START TO SHIP",
    shapeName: "Pixel geometry",
    closing: "Turn progress into a high score.",
  },
  {
    id: "bitmap",
    name: "BITMAP",
    direction: "1-bit 位图",
    genre: "ONE-BIT DITHER",
    glyph: "▦",
    kicker: "One bit. Zero ambiguity.",
    description: "只留下纸白和纯黑，用像素边、反白行与抖动网纹建立毫不含糊的系统；限制反而让层级更加锋利。",
    statement: "“当颜色只剩两种，每一个像素都必须承担明确的职责。”",
    palette: "Paper white · Pure black",
    type: "Bitmap system · Dot matrix",
    shape: "Pixel · Window",
    motion: "Hard pop",
    stageMotion: "WINDOW POP · 90MS",
    colors: ["#FFFFFF", "#FFFFFF", "#000000", "#000000", "#FFFFFF"],
    radius: "0 PX",
    typeSample: "SYSTEM READY_",
    shapeName: "Single-pixel edge",
    closing: "Say more with only black and white.",
  },
  {
    id: "mochi",
    name: "MOCHI",
    direction: "软陶泡芙",
    genre: "CLAYMORPHIC",
    glyph: "●",
    kicker: "A system soft enough to squeeze",
    description: "奶油白、马卡龙粉蓝黄与可可字色把组件捏成柔软器物；每一次按压都有重量，也有一点甜。",
    statement: "“友好不只是圆角，而是让反馈像真的被手指压下去一样可信。”",
    palette: "Cream · Macaron · Cocoa",
    type: "Rounded geometric",
    shape: "Pill · Squish",
    motion: "Press and rebound",
    stageMotion: "SQUISH REBOUND · 360MS",
    colors: ["#FFF2E5", "#FFF8EF", "#523B34", "#EE7F9E", "#F3C85E"],
    radius: "36 PX",
    typeSample: "Soft forms, serious function.",
    shapeName: "Inflated clay",
    closing: "Make every action feel good to touch.",
  },
  {
    id: "scribble",
    name: "SCRIBBLE",
    direction: "手账涂鸦",
    genre: "NOTEBOOK DOODLE",
    glyph: "✎",
    kicker: "A working system that shows its thinking",
    description: "横线纸、圆珠蓝与荧光笔把组件文档变成活着的工作手账；批注、重点和修改痕迹都参与表达。",
    statement: "“系统不是一块完美石碑，它是一页不断被画线、修正和补充的笔记。”",
    palette: "Paper · Ballpoint · Highlighter",
    type: "Handwritten · Rounded",
    shape: "Note · Tape",
    motion: "Sticker slap",
    stageMotion: "STICKER SLAP · 260MS",
    colors: ["#F9F6E8", "#FFFDF3", "#153F7D", "#EE598D", "#F6DF54"],
    radius: "8 / 4",
    typeSample: "圈起来，这里很重要！",
    shapeName: "Hand-drawn frame",
    closing: "Show the thinking behind the system.",
  },
  {
    id: "axon",
    name: "AXON",
    direction: "轴测蓝图",
    genre: "ISOMETRIC BLUEPRINT",
    glyph: "⌁",
    kicker: "The system, drawn from every angle",
    description: "蓝图青灰、制图白与橙色标记把界面拆成可解释的结构；尺寸、关系与层级全部暴露出来。",
    statement: "“好的设计系统不只展示表面，它应该让每个连接点都能够被测量。”",
    palette: "Blueprint · Drafting white",
    type: "Condensed geo · Mono",
    shape: "30° axis · Extrusion",
    motion: "Layer lift",
    stageMotion: "LAYER LIFT · 300MS",
    colors: ["#204B5A", "#285B69", "#EBF4EF", "#F28B47", "#D6E7DF"],
    radius: "0 PX",
    typeSample: "SECTION A—A / SCALE 1:8",
    shapeName: "Axonometric plane",
    closing: "Expose the structure. Earn the trust.",
  },
  {
    id: "corona",
    name: "CORONA",
    direction: "日蚀玻璃",
    genre: "ECLIPSE GLASS",
    glyph: "◉",
    kicker: "Precision at the edge of darkness",
    description: "黑曜石、琥珀日冕与大气青光建立一座观测台；毛玻璃承载信息，光只标记最关键的轨迹。",
    statement: "“最强的强调并不需要照亮一切，只需要让边缘在正确时刻发光。”",
    palette: "Obsidian · Corona · Cyan",
    type: "Geometric tech · Wide caps",
    shape: "Orbit · Glass",
    motion: "Halo breathe",
    stageMotion: "HALO BREATHE · 1200MS",
    colors: ["#080D12", "#151E27", "#EDF2F4", "#E6A543", "#38B7BC"],
    radius: "24 PX",
    typeSample: "TOTALITY / OBSERVATION 13",
    shapeName: "Orbital glass",
    closing: "Put the critical signal in orbit.",
  },
  {
    id: "qalam",
    name: "QALAM",
    direction: "纳斯塔利克书斋",
    genre: "NASTALIQ MODERN",
    glyph: "ق",
    kicker: "A modern system written with grace",
    description: "羊皮纸、墨青与赤陶在镜像秩序里相遇；鎏金细线和词尾花押把工具界面写成安静的现代书斋。",
    statement: "“阅读有自己的方向，好的界面愿意跟随文字，而不是强迫文字迁就网格。”",
    palette: "Parchment · Ink teal · Terra",
    type: "Nastaliq · Latin sans",
    shape: "Mirror · Octagram",
    motion: "Rightward flourish",
    stageMotion: "INK FLOURISH · 680MS",
    colors: ["#EBDFC1", "#F7ECD0", "#173B3B", "#A84F3D", "#A78338"],
    radius: "4 PX",
    typeSample: "قلم، سکون اور ترتیب",
    shapeName: "Mirrored geometry",
    closing: "Let language lead the layout.",
  },
  {
    id: "gazette",
    name: "GAZETTE",
    direction: "报章排印",
    genre: "BROADSHEET",
    glyph: "G",
    kicker: "All the information fit to design",
    description: "新闻纸、油墨黑与单色墨蓝把复杂产品编排成清晰头版；字号、栏线和留白就是最可靠的导航。",
    statement: "“当内容足够重要，排印本身就是界面，标题本身就是路径。”",
    palette: "Newsprint · Ink · Editorial blue",
    type: "Display serif · News text",
    shape: "Column · Hairline",
    motion: "Ink underline",
    stageMotion: "INK SETTLE · 220MS",
    colors: ["#E9E4D7", "#F3EFE4", "#171717", "#234B74", "#B2AA99"],
    radius: "0 PX",
    typeSample: "THE SYSTEM EDITION — FINAL",
    shapeName: "Editorial column",
    closing: "Make the hierarchy the headline.",
  },
];

const app = document.querySelector("#app");
const picker = document.querySelector("#themePicker");
const pickerBackdrop = document.querySelector("#pickerBackdrop");
const openPickerButton = document.querySelector("#openPicker");
const closePickerButton = document.querySelector("#closePicker");
const themeSearch = document.querySelector("#themeSearch");
const themeList = document.querySelector("#themeList");
const themeRail = document.querySelector("#themeRail");
const dialog = document.querySelector("#demoDialog");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");
const expressionRange = document.querySelector("#expressionRange");
const rangeOutput = document.querySelector("#rangeOutput");

const textFields = {
  topThemeIndex: document.querySelector("#topThemeIndex"),
  topThemeName: document.querySelector("#topThemeName"),
  topThemeDirection: document.querySelector("#topThemeDirection"),
  heroIndex: document.querySelector("#heroIndex"),
  themeGenre: document.querySelector("#themeGenre"),
  themeKicker: document.querySelector("#themeKicker"),
  themeName: document.querySelector("#themeName"),
  themeDirection: document.querySelector("#themeDirection"),
  themeDescription: document.querySelector("#themeDescription"),
  stageCode: document.querySelector("#stageCode"),
  stageMotion: document.querySelector("#stageMotion"),
  themeGlyph: document.querySelector("#themeGlyph"),
  floatingAccent: document.querySelector("#floatingAccent"),
  floatingRadius: document.querySelector("#floatingRadius"),
  themeStatement: document.querySelector("#themeStatement"),
  paletteLabel: document.querySelector("#paletteLabel"),
  typeLabel: document.querySelector("#typeLabel"),
  shapeLabel: document.querySelector("#shapeLabel"),
  motionLabel: document.querySelector("#motionLabel"),
  tokenCanvas: document.querySelector("#tokenCanvas"),
  tokenSurface: document.querySelector("#tokenSurface"),
  tokenInk: document.querySelector("#tokenInk"),
  tokenAccent: document.querySelector("#tokenAccent"),
  tokenHighlight: document.querySelector("#tokenHighlight"),
  typePair: document.querySelector("#typePair"),
  typeGlyph: document.querySelector("#typeGlyph"),
  typeThemeName: document.querySelector("#typeThemeName"),
  typeSample: document.querySelector("#typeSample"),
  shapeName: document.querySelector("#shapeName"),
  shapeRadius: document.querySelector("#shapeRadius"),
  closingIndex: document.querySelector("#closingIndex"),
  closingTitle: document.querySelector("#closingTitle"),
  closingGlyph: document.querySelector("#closingGlyph"),
};

const productTabs = {
  overview: {
    symbol: "Aa",
    title: "Theme foundation",
    copy: "Review the core visual language before publishing.",
  },
  tokens: {
    symbol: "{ }",
    title: "Semantic tokens",
    copy: "Color, type, radius and motion map to stable product roles.",
  },
  activity: {
    symbol: "↗",
    title: "Review activity",
    copy: "Seven collaborators evaluated this candidate today.",
  },
};

const showcaseTabs = {
  overview: {
    index: "01",
    title: "Purpose before decoration",
    copy: "Every visual choice maps back to hierarchy, state or brand voice.",
  },
  guidelines: {
    index: "02",
    title: "A stable interaction grammar",
    copy: "Navigation patterns remain predictable while each direction changes its material voice.",
  },
  code: {
    index: "03",
    title: "Semantic roles, portable values",
    copy: "Components consume shared tokens so a theme can change without rewriting product logic.",
  },
};

let activeThemeIndex = 0;
let toastTimer;

function padIndex(index) {
  return String(index + 1).padStart(2, "0");
}

function createPickerItem(theme, index) {
  const button = document.createElement("button");
  button.className = "picker-item";
  button.type = "button";
  button.dataset.themeId = theme.id;
  button.setAttribute("aria-current", String(index === activeThemeIndex));
  button.style.setProperty("--item-canvas", theme.colors[0]);
  button.style.setProperty("--item-ink", theme.colors[2]);
  button.style.setProperty("--item-accent", theme.colors[3]);
  button.style.setProperty("--item-radius", theme.radius.includes("0") ? "0" : "10px");

  const number = document.createElement("span");
  number.textContent = padIndex(index);

  const swatch = document.createElement("i");
  swatch.className = "picker-swatch";
  swatch.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "picker-name";
  const name = document.createElement("strong");
  name.textContent = theme.name;
  const direction = document.createElement("small");
  direction.textContent = `${theme.direction} · ${theme.genre}`;
  label.append(name, direction);

  const glyph = document.createElement("b");
  glyph.textContent = theme.glyph;
  glyph.setAttribute("aria-hidden", "true");

  button.append(number, swatch, label, glyph);
  button.addEventListener("click", () => {
    selectTheme(index);
    closePicker();
  });
  return button;
}

function renderPicker(query = "") {
  const normalized = query.trim().toLocaleLowerCase();
  const fragment = document.createDocumentFragment();
  let matches = 0;

  themes.forEach((theme, index) => {
    const searchText = `${theme.name} ${theme.direction} ${theme.genre} ${theme.palette}`.toLocaleLowerCase();
    if (!normalized || searchText.includes(normalized)) {
      fragment.append(createPickerItem(theme, index));
      matches += 1;
    }
  });

  themeList.replaceChildren(fragment);

  if (!matches) {
    const empty = document.createElement("p");
    empty.className = "theme-empty";
    empty.textContent = "没有找到匹配的候选方向";
    themeList.append(empty);
  }
}

function createRailItem(theme, index) {
  const button = document.createElement("button");
  button.className = "rail-item";
  button.type = "button";
  button.dataset.themeId = theme.id;
  button.setAttribute("aria-current", String(index === activeThemeIndex));
  button.style.setProperty("--item-ink", theme.colors[2]);
  button.style.setProperty("--item-accent", theme.colors[3]);
  button.innerHTML = `<i aria-hidden="true"></i><span>${padIndex(index)} ${theme.name}</span>`;
  button.addEventListener("click", () => selectTheme(index));
  return button;
}

function renderRail() {
  const fragment = document.createDocumentFragment();
  themes.forEach((theme, index) => fragment.append(createRailItem(theme, index)));
  themeRail.replaceChildren(fragment);
}

function updateText(theme, index) {
  const displayIndex = padIndex(index);
  const values = {
    topThemeIndex: `${displayIndex} / 15`,
    topThemeName: theme.name,
    topThemeDirection: theme.direction,
    heroIndex: displayIndex,
    themeGenre: theme.genre,
    themeKicker: theme.kicker,
    themeName: theme.name,
    themeDirection: theme.direction,
    themeDescription: theme.description,
    stageCode: `${theme.name.slice(0, 1)}-${displayIndex}`,
    stageMotion: theme.stageMotion,
    themeGlyph: theme.glyph,
    floatingAccent: theme.colors[3],
    floatingRadius: theme.radius,
    themeStatement: theme.statement,
    paletteLabel: theme.palette,
    typeLabel: theme.type,
    shapeLabel: theme.shape,
    motionLabel: theme.motion,
    tokenCanvas: theme.colors[0],
    tokenSurface: theme.colors[1],
    tokenInk: theme.colors[2],
    tokenAccent: theme.colors[3],
    tokenHighlight: theme.colors[4],
    typePair: theme.type,
    typeGlyph: theme.glyph,
    typeThemeName: theme.name,
    typeSample: theme.typeSample,
    shapeName: theme.shapeName,
    shapeRadius: `R ${theme.radius.replace(" PX", "")}`,
    closingIndex: `${displayIndex} / 15`,
    closingTitle: theme.closing,
    closingGlyph: theme.glyph,
  };

  Object.entries(values).forEach(([key, value]) => {
    textFields[key].textContent = value;
  });
}

function selectTheme(index, options = {}) {
  const safeIndex = (index + themes.length) % themes.length;
  const theme = themes[safeIndex];
  activeThemeIndex = safeIndex;
  app.dataset.theme = theme.id;
  updateText(theme, safeIndex);
  document.title = `${theme.name} — KIT Candidate Themes`;

  document.querySelectorAll("[data-theme-id]").forEach((item) => {
    item.setAttribute("aria-current", String(item.dataset.themeId === theme.id));
  });

  const activeRailItem = themeRail.querySelector(`[data-theme-id="${theme.id}"]`);
  activeRailItem?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

  const productCard = document.querySelector(".product-card");
  productCard.style.animation = "none";
  requestAnimationFrame(() => {
    productCard.style.animation = "";
  });

  if (!options.preserveHash) {
    history.replaceState(null, "", `#${theme.id}`);
  }
}

function openPicker() {
  picker.classList.add("is-open");
  pickerBackdrop.classList.add("is-open");
  picker.setAttribute("aria-hidden", "false");
  openPickerButton.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  window.setTimeout(() => themeSearch.focus(), 220);
}

function closePicker() {
  picker.classList.remove("is-open");
  pickerBackdrop.classList.remove("is-open");
  picker.setAttribute("aria-hidden", "true");
  openPickerButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  themeSearch.value = "";
  renderPicker();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function activateProductTab(tab) {
  const content = productTabs[tab.dataset.productTab];
  if (!content) return;

  document.querySelectorAll("[data-product-tab]").forEach((item) => {
    item.setAttribute("aria-selected", String(item === tab));
  });

  const panel = document.querySelector("#productPanel");
  panel.querySelector(".panel-symbol").textContent = content.symbol;
  panel.querySelector(".product-panel-heading strong").textContent = content.title;
  panel.querySelector(".product-panel-heading p").textContent = content.copy;
}

function activateShowcaseTab(tab) {
  const content = showcaseTabs[tab.dataset.showcaseTab];
  if (!content) return;

  document.querySelectorAll("[data-showcase-tab]").forEach((item) => {
    item.setAttribute("aria-selected", String(item === tab));
  });

  const panel = document.querySelector("#showcaseTabPanel");
  panel.querySelector(":scope > span").textContent = content.index;
  panel.querySelector("strong").textContent = content.title;
  panel.querySelector("p").textContent = content.copy;
}

openPickerButton.addEventListener("click", openPicker);
closePickerButton.addEventListener("click", closePicker);
pickerBackdrop.addEventListener("click", closePicker);
themeSearch.addEventListener("input", (event) => renderPicker(event.currentTarget.value));

document.querySelector("#nextTheme").addEventListener("click", () => selectTheme(activeThemeIndex + 1));
document.querySelector("#closingNextTheme").addEventListener("click", () => {
  selectTheme(activeThemeIndex + 1);
  document.querySelector("#overview").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll("[data-product-tab]").forEach((tab) => {
  tab.addEventListener("click", () => activateProductTab(tab));
});

document.querySelectorAll("[data-showcase-tab]").forEach((tab) => {
  tab.addEventListener("click", () => activateShowcaseTab(tab));
});

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  });
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

toast.querySelector("button").addEventListener("click", () => {
  window.clearTimeout(toastTimer);
  toast.classList.remove("is-visible");
});

document.querySelectorAll(".alert > button").forEach((button) => {
  button.addEventListener("click", () => {
    const alert = button.closest(".alert");
    alert.classList.add("is-dismissed");
    window.setTimeout(() => alert.remove(), 220);
  });
});

document.querySelectorAll(".icon-action-row .icon-button, .chip").forEach((button) => {
  button.addEventListener("click", () => button.classList.toggle(button.classList.contains("chip") ? "is-selected" : "is-selected"));
});

expressionRange.addEventListener("input", () => {
  rangeOutput.value = `${expressionRange.value}%`;
  rangeOutput.textContent = `${expressionRange.value}%`;
});

document.querySelector("#openDialog").addEventListener("click", () => dialog.showModal());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close("cancel");
});

document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const isTyping =
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement instanceof HTMLSelectElement;

  if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
    event.preventDefault();
    picker.classList.contains("is-open") ? closePicker() : openPicker();
    return;
  }

  if (event.key === "Escape" && picker.classList.contains("is-open")) {
    closePicker();
    openPickerButton.focus();
    return;
  }

  if (isTyping || picker.classList.contains("is-open") || dialog.open) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    selectTheme(activeThemeIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

window.addEventListener("hashchange", () => {
  const id = window.location.hash.slice(1).toLocaleLowerCase();
  const index = themes.findIndex((theme) => theme.id === id);
  if (index >= 0) selectTheme(index, { preserveHash: true });
});

renderPicker();
renderRail();

const initialId = window.location.hash.slice(1).toLocaleLowerCase();
const initialIndex = themes.findIndex((theme) => theme.id === initialId);
selectTheme(initialIndex >= 0 ? initialIndex : 0, { preserveHash: initialIndex >= 0 });
