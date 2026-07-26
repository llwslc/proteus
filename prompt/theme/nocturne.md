# Theme · NOCTURNE —— 暗夜花园

> 本套风格：视觉 DNA——身份、调色、字体、几何、氛围、动效语言。`<kit>` = `nocturne`。

## 0. 身份

- 代号 **NOCTURNE**（夜园），取子夜温室的植物图鉴：深茄紫的丝绒衬底上钉着一幅幅黄铜细线画框，框顶骑一枚酒红铭牌题字，四角伸出缠枝小花；纸面用骨白衬线写就，手写体作旁注，一豆铜色灯焰在暗处把光看住。金是唯一的亮色，酒红是帷幔，花与藤是全套的图记——月相、花开、落笔一勾，各承一种状态。

## 1. 调色板

- 背景：`base #1D1126` 是页底的深茄紫，`base-deep #120A18` 是最深的一档，用作凹陷与背板。
- 丝绒面：`surface #251733` 是框内的丝绒面，`surface-raised #2E1D3E` 是浮层与抬升面，`surface-inset #180E20` 是压深的嵌套底。丝绒质感是三层叠：顶部一道暖光晕、`112deg` 的极细斜织纹、`185deg` 的竖直渐变收到近黑；面板、浮层、模态统一引用这层配方。
- 五个强调色家族：primary 黄铜 `primary #C69A4E`，secondary 酒红 `secondary #7A2440`，success 新叶绿 `success #7FA86E`，warning 灯焰琥珀 `warning #E0913A`，danger 颠茄浆果 `danger #D2455F`。
- 黄铜与酒红各配亮暗两档：`primary-lit #E9CC8A` 是点灯的亮金（文字、焦点、指示物），`primary-deep #8A6B3A` 是压暗档；`secondary-lit #93304F` 是帷幔的亮档，`secondary-deep #431222` 是压暗档。另三族各配一个暗档：`success-deep #4C6B41`、`warning-deep #A85E12`、`danger-deep #8E2036`。
- 每族配一个 `-wash` 半透浅底（tone 底、悬停底）：`primary-wash rgba(198,154,78,.12)`、`secondary-wash rgba(122,36,64,.35)`、`success-wash rgba(127,168,110,.16)`、`warning-wash rgba(224,145,58,.16)`、`danger-wash rgba(210,69,95,.16)`。
- 描线只有黄铜一色，按浓淡三档：`line rgba(198,154,78,.5)` 是画框的主细线，`line-faint rgba(198,154,78,.26)` 是框内退一步的内圈线，`line-strong rgba(198,154,78,.78)` 给浮层与升档态。
- 文本是骨白与淡紫灰：`text #EFE6D8`、`-bright #FFF7E9`、`-dim #CBBBD0`、`-mute #A996BC`。
- 对比：暗底一套，强调色当正文与焦点一律取亮档 `primary-lit`，不设深档；酒红只作填充与帷幔、不当正文；`text-mute` 在页底 ≥7:1。
- 两档反色前景：`on-fill #22122A` 压黄铜、琥珀、叶绿这些浅实填，`on-wine #F6EEE0` 压酒红、浆果红这些深实填。
- 帷幔 `drape` 是一条酒红横扫渐变（`.55` 起、`.1` 收），列表行、条目、触发条的悬停与高亮统一盖它，从左掠入。
- 中性与效果色：`track #3A2547` 是未填充的轨底；`scrim rgba(10,5,14,.74)` 是模态背板；暖光两档 `glow rgba(233,204,138,.14)`、`glow-strong rgba(233,204,138,.3)`。
- 投影四档，全部是冷黑、不带色：`shadow 0 6px 20px rgba(8,4,12,.35)` 给页内控件，`shadow-frame 0 18px 50px rgba(8,4,12,.55)` 给画框，`overlay-shadow 0 24px 60px rgba(8,4,12,.7)` 给浮层，`shadow-modal 0 30px 90px rgba(0,0,0,.7)` 给模态。

## 2. 字体与排版

- 字体：display（展示体）用 **Cormorant Garamond**，正文用 **Noto Serif SC**，手写体用 **Tangerine**（拉丁草书：学名、题词、旁注），数值与码位（mono 槽）用打字机体 **Courier Prime**。
- 尺度各档：字号 `fs-11 / 12 / 13 / 15 / 17 / 22 / 34`，字距用整数 px（`ls-1 1px`、`ls-3 3px`、`ls-5 5px`、`ls-8 8px`），行高 `lh-100 / 145 / 180`，字重 `fw-400 / 600 / 700`。
- 大字距是本套的招牌排法：题字、码位、标签一律拉开字距并补等量 `text-indent` 保持居中。
- 三档标题：`h1` = display · fs-34 · fw-600 · ls-8；`h2` = display · fs-22 · fw-600 · ls-5；`h3` = display · fs-13 · fw-600 · ls-5 · 大写 · dim。正文 `text` = Noto Serif SC · fs-15 · lh-180 · text。修饰类 `h1--accent` = 强调词转 `primary-lit` + 一圈 `glow-strong` 文字辉光。
- 字段标签 caption 有独立类 **`.nocturne-cap`**：display 体 · fs-12 · ls-3 · 大写 · dim，组件统一引用。
- `.nocturne-script` = Tangerine 拉丁草书，供题词与旁注引用。

## 3. 几何与描边

- 造型 = **直角画框**。方框一律零圆角，圆角只留给两处细件：`r-mark 2px` 给勾选盒与细指示条，`r-rail 3px` 给轨道；正圆件（月相、印、状态点、头像）直接写 `50%`。组件不裸写这两档以外的形状值。
- 描线恒为 `1px` 实线——黄铜细线，轻重分档用**色**不用宽：页内静止取 `line`，浮层与升档态取 `line-strong`，退一步的内圈线取 `line-faint`；语义变体按 tone 换色。组件不裸写描边色宽。
- 描边走 frame 原语 `.nocturne-frame`：`1px line` border + 填充 + `isolation: isolate`，纯直角矩形直接 border 画；输入变量 `--nocturne-frame-fill / -line / -shadow`。变体 `--double` 再在 `inset` 一档处画一圈 `line-faint` 内线，凑成画框的双线——面板、模态、抽屉这些大框穿它，小控件只穿单线。
- 抬升：浮层走 `.nocturne-elevation`，挂 `overlay-shadow` 冷黑投影 + 一层 `glow` 暖光晕，输入变量 `--nocturne-overlay-shadow / -glow`；模态换 `shadow-modal`。形状挂内层、影挂外层，两者不同元素。
- 浮层连接件（Arrow）是一枚 `45deg` 旋转的方块尖，两条邻边描 `line-strong`、填浮层面色，随浮层同步淡入。
- 园艺母题：黄铜细线画框、骑框顶缘的酒红铭牌、四角缠枝小花、五瓣花、月相、缠枝花藤，用作题牌、图记、指示与招牌，靠输入变量换色。铭牌是酒红竖向渐变 + `line` 描边 + 内嵌一圈暗线，题字走 display 体大字距 `primary-lit`。
- 焦点提示 = **一圈灯光**：`2px` `primary-lit` 外环、`3px` 外让，外加一层 `glow-strong` 暖晕。

## 4. 氛围层

定义在 `global.css`。

- `body` 自身背景 = `base` 底 + 一层大马士革花纹壁纸（`150px` 见方的 SVG 平铺：四瓣叶心、四角藤钩、酒红小点，线色取 `line` 的极淡档）。
- `body::before`：左上一团酒红光晕、右下一团黄铜光晕，两个大半径 radial，压在壁纸之上、内容之下。
- `body::after`：整页四周一圈暗角 vignette，径向压暗收边。
- `::selection` = `secondary-lit` 底 + `text` 骨白字。
- 滚动条走标准细条（`scrollbar-width: thin`），thumb 取 `primary-deep`、轨透明。

## 5. 动效个性

- 时长 `dur .3s / -slow .6s / -draw 1.5s`；缓动 `ease (0.2, 0.8, 0.3, 1)` 缓入缓落，`ease-out (0.16, 1, 0.3, 1)` 给浮层与填充推进。
- 按压：`translateY(1px)` 沉一线 + 投影收到贴地；`:active` 挂透明光环（`inset -6px`）兜住命中盒。
- 悬停：帷幔掠入——行、条目、触发条盖 `drape` 酒红横扫；描线由 `line` 升到 `line-strong`；实填件填色加深到 `-deep`；纯图标与动作件文字转 `primary-lit`。
- 共享动效（`effects.css`）：浮层开合走 `.nocturne-unveil` = 淡入 + `translateY(-6px)` 落位；`petal-open` 五瓣错拍绽开、`core-in` 花心随后弹出，两者是花开的成套动作；`branch-grow` 用 `stroke-dashoffset` 把藤画出来；`breathe` 给暖光晕明灭；`draw-in` 用 `stroke-dashoffset` 落笔画出勾与线。无脉动、无扫光。
