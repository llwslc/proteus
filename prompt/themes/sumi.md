# Theme · SUMI —— 水墨禅

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `sumi`。

## 0. 身份

- 代号 **SUMI**，水墨禅：宣纸本白底、焦墨黑字、单枚朱印；大量留白、不对称错落、竖排书法；一切边框是手绘墨线，强调即墨之浓淡与一点朱。

## 1. 调色板

- 背景走宣纸：`paper #f4eee2` 为页底；`paper-deep #ece3d0` 是页底渐变末端兼最深氛围档；面板渐变两端 `mist #efe7d7`、`mist-raised #f8f2e7`。
- 墨线：边框用焦墨低 alpha 而非强调色——`ink-line rgba(28,24,18,.22)`、`ink-line-strong .42`、`ink-line-faint .09`。
- 文本走墨之浓淡四档，最深即强调：`text-bright #1b1712` 焦墨标题强调、`text #2c2619` 浓墨正文强、`text-dim #5e5647` 淡墨正文、`text-mute #968c79` 清墨用于 caption、占位、禁用。
- 单枚朱印是唯一色相 `seal #c0392b`，配 `seal-deep #8c2820` 作渐变暗端与填充底、`seal-soft rgba(192,57,43,.12)`；primary、danger、所有激活与选中点睛、行内链接、印章皆用它。
- success、warning 不引新色相：`success #1d1a13` 焦墨最深配勾记，另配 `-soft`；warning = 朱印淡施 `seal` 洗档配警记；danger = 朱印浓施 `seal-deep`；三者靠墨色深浅与图记相分。
- secondary 如 Button 次要 = 墨洗变体，不另立色相。
- 主色填充上的反色前景档 `on-fill #f6f1e6` 纸色：墨洗或朱填变深时，箭头、占位符、数值前景一并转纸色。
- alpha 档：朱印走 `seal-soft .12`、`seal-a30 .30`、`seal-a55 .55`，外加点亮渐变 `seal-wash`、`-strong`；墨线三档即上方 ink-line 系；success 配 `-soft`，warning 复用 seal 洗档；新同色 alpha 先并入最近档。

## 2. 字体与排版

- **Ma Shan Zheng** 马善政毛笔楷作 display，用于标题与分组；**Noto Serif SC** 思源宋细明朝作正文，用 300 字重；**Zhi Mang Xing** 志莽行草作 brand，仅 logo；**Cutive Mono** 暖打字机用于数值。皆 Google Fonts，`display=swap`。
- 尺度档：字号 `fs-12 / 13 / 15 / 16 / 20 / 26 / 38`，字距 `ls-2 / 6 / 12`，行高 `lh-100 / 150 / 180`，字重 `fw-300 / 400 / 600`。
- 标题三档 `fw-400`、不大写：`h1` fs-38 + ls-2，`h2` fs-20 + ls-6，`h3` fs-13 + ls-12 + dim；正文 `text` = fs-15 + lh-180 + dim + fw-300；`h1--accent` 修饰 = 转 `seal` + 极淡 `ink-wet` 墨润。
- 字段 caption 独立类 **`.sumi-cap`** = display · fs-12 · ls-12 · dim，组件统一引用。`.sumi-brand` = 草书 brand，只给 logo。
- 竖排：编辑层走 `writing-mode: vertical-rl`——hero 标题、分组标记 GroupRule、Panel 标题、侧栏索引、区块 caption；控件本体一律横排。typography.css 出一组竖排类 `.sumi-vert`，列右起、错落留白。

## 3. 几何与描边

- 形状 = 近乎生纸直边，无 clip-path。半径阶梯极小 `--sumi-round-0 / 1 / 2 / 3` = `0 / 1px / 2px / 3px`，按角色选：嵌套项、chip = round-0，默认控件 = round-1，容器、弹层 = round-2，模态、超大框 = round-3；组件不裸写 radius。
- 全套统一 frame 原语 `.sumi-frame::before`：`inset: 0`、1px 墨线 border + radius；输入变量 `--sumi-frame-fill / -ink / -round / -bevel`。`--double` 变体加 `inset: 3px` 内圈细墨线。多数面以留白与柔影分界，墨线只在需要处轻描。
- `#sumi-edge`：演示页顶部内联 SVG filter，feTurbulence `0.012 0.018` + feDisplacementMap，frame、分隔线、连接线、指示条统一挂它，线条呈毛笔颤动飞白。
- 浮层抬升原语 `.sumi-elevation`，挂 positioner 与模态 popup 且不带 etch：`drop-shadow` 暖柔灰影，输入变量 `--sumi-overlay-shadow / -lift`；默认 `shadow-pop + lift-popup`，模态走 `shadow-modal + lift-modal`，Tooltip 小档；浮层用柔影、不用辉光。
- 边框层级：页内 idle = `ink-line / -strong` 墨线；浮层 = `ink-line-strong` 配柔影；状态走墨线加深至 `seal` 点睛。

## 4. 氛围层

定义在 `global.css`。

- `body` 底 = `paper`；`body::before`：宣纸纤维即 feTurbulence fractalNoise 暖灰瓦片，`mix-blend-mode: multiply`、alpha ~.05 平铺全页；叠极淡四角做旧晕，暖褐径向、multiply、低 alpha。
- `body::after`：几点极淡墨渍缓移，radial 点 180/260px、`sumi-drift` 60s 漂、径向遮罩。
- 根元素 `::before`：四角更淡泛黄晕；`::after`：同一纤维噪点补强、overlay 低 alpha。
- `::selection` = `seal-a30` 朱洗配 `text-bright` 字。
- 全局滚动条 9px、圆角 thumb = `ink-line-strong` 墨色、轨透明。

## 5. 动效个性

- `dur .4s / -slow .9s`，`ease (0.4, 0, 0.2, 1)`、`ease-out (0.16, 1, 0.3, 1)`。
- 笔锋缓显是主旋律：`brush` = `stroke-dashoffset` 描画出现，用于一圆相、Checkbox 墨勾、Tab 与 NavMenu 下划墨痕。
- 墨滴扩散：`bleed` = radial `scale(0.5→1)` + opacity 晕开，用于 Radio 墨点、选中点睛、印章落定。
- `breath` 8s 极淡呼吸，给状态点、印章、Toast 图记。
- Hero 一圆相：单笔 `stroke-dashoffset` 约 2.4s 描成、缺口不闭合；朱印随后按落配 bleed 于一角作落款。
- 入场：编辑层竖排列 `sumi-rise` 墨色渐显 stagger；区块滚动渐入。

## 6. 交互态配色

填充 core §5 的留白。层次靠墨晕 `bleed`、暖柔灰影与一点朱，不用辉光。

- 选中、激活：覆盖 frame 输入变量——`-fill` 给墨洗渐变 `ink-wash` 或 `seal-wash`，`-ink` 升到 `seal`，关键标记转 `seal` 并叠 `bleed`。点亮表面如 Button、Switch、Checkbox = `seal-wash` + seal 文字 + bleed；分段选中如 ToggleGroup、Toolbar、Menubar = 浓墨实洗 `ink-wash-strong` 填 + 反色 `on-fill` 字。
- 墨实洗或朱实填上前景必转 `on-fill` 纸色。
- 文字强调选中如列表、Tab、NavMenu 只转 `seal` 不填；Tab、NavMenu 配 `seal` 下划墨痕、brush 描出。
- Button 变体同构换色：primary = `seal-wash` + seal 字 + bleed，hover 转 `seal-wash-strong` + on-fill 字；secondary = 墨洗 + scorch 字；danger = `seal-deep` 实填 + on-fill；ghost 透明、hover 点亮 ink-line。
- 悬停：面 `ink-line-faint` 淡墨底；图标、动作按钮转 `seal`；菜单触发器、列表项转 `text-bright`。Tabs 与 NavMenu 复用同一 tab 皮肤：竖向墨洗 + 底部 seal 墨痕。
- 焦点：布尔件 Switch、Checkbox、Radio 用 `bleed` 柔墨晕配极淡 seal 环；分段、触发条用 `inset 0 0 0 1px` 墨线；输入框边框点到 `seal` 配字段级淡 seal 衬；可聚焦浮层 popup 加 `outline:none`。
- 选中点睛统一 `bleed-mark`：Switch 墨点、Checkbox 盒、Radio 圈选中时整件柔墨外晕；弹层勾记、指示条同档；条与值文字用极淡 `ink-wet`。
- 禁用：`opacity: var(--sumi-disabled-opacity)` + `cursor: not-allowed`，整行 dim、不叠两层 opacity。

## 7. 组件皮肤决定

- Switch 是一笔墨：`.sumi-stroke` 纸槽配墨点 thumb；关 = 墨点居左收敛；开 = 墨点滑右、槽内墨洗刷过、点 `bleed` 晕开。
- Checkbox：墨勾 `stroke-dashoffset` brush 描出；Radio：墨点 `bleed` 扩散落定。
- Panel：一角落款朱印配极简墨边，余靠留白；Toast：右下向上堆叠，左缘墨笔脊配呼吸朱印图记。
- 模态：整张纸配暖柔影；Dialog 标题前缀朱印记；AlertDialog 按 `tone` 重染——danger = `seal` 实为默认、warning = seal 淡施、primary = seal；表面顶部按 tone 朱径向 `color-mix(seal 14%)`。
- NavigationMenu 触发器栏复用 Tabs 皮肤；Hero 一圆相、分组线 GroupRule 带朱印小记。
- 背板 scrim = 暖墨薄纱压暗页面；连接线 1px `seal` 或墨配 edge 滤镜。
- Loader 自包含：一滴墨在纸上扩散或一圆相自描，硬编码纸 `#f4eee2` + 墨 `#1b1712` + 朱 `#c0392b`，不引 theme token。

## 8. 文案

用于填充 `app.md` 的文案槽位。全中文竖排：编辑层与功能 UI 文案皆中文，footer 技术署名即 token 名与框架名留原样。

- logo：`墨` 用草书 brand 体，副标 `水墨禅 · UI 套件`；状态徽章 `临池` 作 primary；时钟带时辰。
- Hero：eyebrow `水墨 · 三十七器`；标题两行竖排 `一套**水墨**界面组件 / 落笔即成`，`h1--accent` 强调「水墨」；描述关键词 宣纸本白、焦墨浓淡、单枚朱印、手描墨线；数据条 `37 / 器`、`1 / token 文件`、`0 / 运行时依赖`、`A11y / 内建`。
- 区块组名带宋体小注：输入 · 落笔之意，表单 · 缚约，反馈 · 纸上回响，浮层 · 浮出之物，展示 · 陈于案，基座 · 纸与墨；demo 文案走文房、禅词，如 砚、宣、临帖、留白、飞白。
- Footer：`SUMI · built on @base-ui/react · themed via --sumi-* tokens · 2026`。
