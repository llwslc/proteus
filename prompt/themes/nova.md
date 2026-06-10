# Theme · NOVA —— 科幻 / HUD 皮肤

> 配合 `core.md`。本文只填 core 的 token 契约与"留空给 theme"的部分,定本套的**色 / 字 / 形 / 辉光 / 动效 / 配色态**;结构、组件、规则全在 core,不复述。`<kit>` = `nova`。

## 0. 身份

- 代号 **NOVA**;定位 **科幻 / HUD**;基调 深空暗色、锐利、克制。
- 主色 电光青、副色 品红;辉光跟随切角轮廓。

## 1. 调色板(填 core §3 色板 / 强调填充 / alpha 阶梯)

- **强调色**(各配一个 `-deep` 暗档):primary `#2de2ff` · secondary `#ff2d75` · success `#54ffb0` · warning `#ffce54` · danger `#ff4d5e`。
- **背景**:`bg` 深空蓝黑、`bg-2` 略亮(竖直渐变两端)。**文本**:`text` 冷白偏蓝、`-bright / -dim / -mute` 递降。**反色前景** `on-primary / -danger` 取深色(叠在亮填充上)。
- **强调填充**(两条复用渐变):`accent-surface` = `linear-gradient(180deg, primary, primary-deep)`(「点亮表面」激活填充);`accent-fill` = `linear-gradient(90deg, primary-deep, primary 55%)`(方向指示条 Slider / Progress;Meter 同形,走自己的分级色)。
- **青 alpha 阶梯**(同色不同透明度,新青 alpha 先在此找):`tint-faint .05 · tint-soft .08 · highlight .14 · line .22 · tint-active .30 · primary-a40 .40 · line-strong .55 · primary-a70 .70`。
- hex 带不了 alpha 的另立:品牌填充、danger 家族(`-fill / -wash / -highlight / -text / -inset`)、中性效果色(关态轨 / 未填充轨皆蓝灰、不在青阶梯;ghost hover;白色扫光 `sheen / -soft`;关态 thumb 金属渐变)。
- **表面**:`surface / -popup / -modal / -inset`、`scrim`、深表面渐变(Avatar 底 / Switch 选中 thumb)。
- **辉光与阴影**:文字 `glow-text`、焦点 `glow-focus`、选中 `glow-active`(`0 0 8px line-strong`)、触发器 `glow-trigger`(`0 0 10px primary-a40`)、浮层 `glow-popup / -modal`;矩形 `shadow-popup / -modal`。

## 2. 字体(填 core 字体族 + 排版尺度)

- `font-display` **Orbitron**(标题)、`font` **Rajdhani**(正文)、`font-mono` **Share Tech Mono**(数值 / 等宽)。`index.html` 经 Google Fonts 引入。
- **三档标题**(规律:字号越大、字距越紧,皆 display / `fw-700` / 大写):`h1` `fs-22` `ls-4` · `h2` `fs-16` `ls-10`(= 模态标题字型)· `h3` `fs-13` `ls-16`(= 面板小节标题)。`text` = body `fs-14` `lh-160` `text-dim`。
- **字段标签 caption**(控件名):display `fs-12` `fw-600` `ls-10` 大写 `text-dim`;字距固定 `ls-10`,不参与标题档的字号-字距递变。

## 3. 几何(填 core §3 几何槽 + §4.1 描边策略)

- **形状语言 = 锐利切角(`clip-path` polygon)**。→ 因此描边走 core §4.1 的**双层 frame**(外层背景=边框色 + `clip-path`,`::before` 内缩 1px 填表面色;内容 `position:relative; z-index:1`)。
- **切角阶梯 `--nova-clip-N`**(写死 polygon,按角色选;非矩形也命名,组件里不裸写 `polygon()`):`clip-12` 超大外框(Dialog / AlertDialog / Panel)· `clip-9` 默认控件 / 容器框及 `::before` · `clip-7` 容器内嵌套项 + 小交互 / 标签 chip(菜单项、toggle / toolbar 按钮、nav 链接、Badge、icon 按钮、Switch thumb)· `clip-4` Progress / Meter / 滚动条 thumb / Slider thumb · `clip-3` Slider 轨道;`clip-tick` 标题尖角。
- **辉光跟随切角**:用 `filter: drop-shadow()`(非 `box-shadow`);阴影 / 辉光挂**不切角的外层**(core elevation/surface 分层)。

## 4. 氛围层(填 core `global.css`,四层叠)

角落径向辉光(品红右上 + 青左下)→ `bg→bg-2` 竖直渐变 → 漂移网格(径向遮罩向下淡出)→ 扫描线(`multiply`)→ 胶片噪点(内联 `feTurbulence` SVG,`overlay`);分挂 `body::before / ::after` 与根元素 `::before / ::after`。

## 5. 动效个性(填 core 动效语言)

- 微动:按钮高光斜扫、进度条流动条纹、面板扫描光、徽章呼吸、Hero 旋转准星。
- 入场(用于演示页,见 `app.md`):顶栏下滑 + Hero 文案 stagger + 面板滚动渐入。全程尊重 `prefers-reduced-motion`。

## 6. 交互态配色(填 core §5 的"颜色留空")

- 「点亮表面」(Button / Switch / Checkbox)= `accent-surface` 渐变;「分段选中」(ToggleGroup / Toolbar / Menubar)= 实心 `primary`;前景一律翻 `on-primary`(深勾 / 深字 / 深滑块,含箭头 / 占位 / 数值)。「文字强调选中」(列表 / Tab / NavMenu)只转 `primary`。
- 悬停:分段 / 触发条 `tint-soft` 纯底(Tabs 与 NavMenu 复用同一 tab 皮肤:`linear-gradient(180deg, transparent, tint-soft)` + 底部辉光下划线);图标 / 动作按钮文字转 `primary`,菜单触发器 / 列表项转亮文。
- 焦点:布尔开关 `glow-focus`;分段 / 触发条 `inset 0 0 0 1px line-strong`;输入框边框点亮 `primary` + 字段级 `glow-focus`。

## 7. 本套特有的组件皮肤决定(core 下放)

- **NavigationMenu** 触发器栏复用 **Tabs** 皮肤:大写 Orbitron、竖向渐变 hover、底部辉光下划线、开启态文字转 `primary` + 辉光、chevron 翻转。
- **AlertDialog** 按 `tone`(danger / warning…)整体重染。
- **共享配方色**:头部扫光 `--nova-scan-color`、标题尖角 `--nova-tick-color`、模态标题 `--nova-title-color` 等就近覆盖。
