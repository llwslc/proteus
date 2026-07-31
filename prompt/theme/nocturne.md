# Theme · NOCTURNE —— 暗夜花园

> 本套风格：视觉 DNA——身份、调色、字体、几何、氛围、动效语言。`<kit>` = `nocturne`。

## 0. 身份

- 代号 **NOCTURNE**（夜曲），取维多利亚暗夜温室的《颠茄夜园》图版册：深茄紫黑的丝绒衬底上，黄铜发丝线压出双线画框，酒红丝绒作填充，骨白衬线字押着宽字距；缠枝蔓叶自框角探入，花朵是它的活动部件——枝上花开、月相盈亏、端花随值绽。每个控件都是一页夜册图版，也是一株夜里睁眼的花。

## 1. 调色板

- 背景：`bg #1d1126` 深茄紫黑页底，`bg-deep #120a18` 更沉的夜（暗隙、分段箱底）。
- 表面：`surface #251733` 面板丝绒基色，`surface-pop #2e1d3e` 浮层面，`surface-inset rgba(18,10,24,.6)` 输入凹面与未填充轨道共用的暗底，`scrim rgba(10,5,14,.74)` 模态背板；模态面 = `surface-pop` 走酒红丝绒配方（见 §3）。
- 黄铜 gilt 家族（描边、题字、焦点、选中指示）：`gilt #c69a4e`、`gilt-bright #e9cc8a`、`gilt-dim #8a6b3a`；alpha 档 `gilt-50 rgba(198,154,78,.5)`（浮层与升档描边）、`gilt-30 rgba(198,154,78,.3)`（静止描边、内衬线）、`gilt-10 rgba(198,154,78,.1)`（ghost 悬停底）；亮铜辉 `glow-12 rgba(233,204,138,.12)`（幽光）、`glow-40 rgba(233,204,138,.4)`（标记辉）。
- 酒红 primary 家族（主动作填充、激活表面）：`primary #93304f`（亮头）、`primary-bright #c4718a`（tone 强调亮档）、`primary-deep #7a2440`（填充主体）、`primary-shadow #431222`（暗尾、按压）；alpha 档 `primary-50 rgba(122,36,64,.5)`（行扫亮端）、`primary-25 rgba(122,36,64,.25)`（衬底）、`primary-12 rgba(122,36,64,.12)`（行扫尾）。
- 其余语义：success 苔绿 `#9dbb7a`、`success-deep #45602f`；warning 琥珀 `#e0873a`、`warning-deep #7a431c`；danger 赤红 `#d66a76`、`danger-deep #8c2735`；危险行扫 `danger-50 rgba(140,39,53,.5)`、`danger-12 rgba(140,39,53,.12)`。
- 文本：`text #efe6d8` 骨白、`text-bright #f9f3e7`、`text-dim #cbbbd0` 冷藕灰、`text-mute #af9dc2` 紫灰；反色前景 `on-fill #f6efe2`（深填充上）。
- 对比取舍：功能字最低档 `text-mute` 于 `surface-pop` ≥4.5:1；强调正文与焦点走 gilt 家族，wine 只作填充与装饰、不作正文。
- 强调填充：`accent-surface linear-gradient(180deg, primary-deep, primary-shadow)` 点亮激活表面（悬停换 `primary` 亮头）；`accent-fill radial-gradient(circle at 35% 30%, gilt-bright, gilt)` 满月圆点，作选中与方向指示。
- 花体配色（花叶部件的渐变端点）：花瓣暗档 `petal #8a2a48` 渐入 `petal-deep #55152b`、花瓣亮档 `petal-lit #a63a5c` 渐入 `petal-lit-deep #6b1e38`、叶 `leaf #6e5a2e` 渐入 `leaf-deep #3e3118`；叶脉与瓣纹描 `gilt`，花芯盘 `gilt-bright`、蕊点 `gilt`、芯上点 `primary-deep`。
- 中性与效果：禁用透明度 `disabled-opacity .45`；禁用实填底 `disabled-fill linear-gradient(180deg, surface-pop, surface)`；月相盘面 `moon-face`（金盘 + 陨坑多层 radial）、夜影 `moon-shade`（暗紫 radial）。
- 投影：`shadow-frame 0 18px 50px rgba(8,4,12,.55)`（图版、面内框件）、`shadow-modal 0 30px 90px rgba(0,0,0,.7)`、`shadow-btn 0 6px 20px rgba(8,4,12,.35)` 与按压收拢档 `shadow-btn-press 0 3px 10px rgba(8,4,12,.4)`、题匾 `shadow-plaque 0 6px 18px rgba(8,4,12,.5)`、轨内影 `track-shadow inset 0 1px 4px rgba(0,0,0,.55)`；随形层：锚定浮层 `drop-pop drop-shadow(0 18px 40px rgba(8,4,12,.7))` + 幽辉 `drop-glow`，SVG 花记 `drop-mark drop-shadow(0 1px 3px rgba(8,4,12,.7))`；辉光用 glow 档合成 box-shadow（如 `0 0 22px glow-12`）。

## 2. 字体与排版

- 字体：display 与正文同族 **Cormorant Garamond**，display 档靠字距与字重区分；mono 槽用打字机体 **Courier Prime**（缩码、数值、时钟）；花体 `font-script` **Tangerine**（拉丁学名、引言）；手记语气用本族斜体，不另立字族。
- 尺度：字号 `fs-12 / 13 / 14 / 16 / 18 / 24 / 30 / 40`；字距整数 px `ls-1 1px / ls-2 2px / ls-3 3px / ls-4 5px / ls-5 8px`，宽字距居中标题配等值 `text-indent` 回正；行高 `lh-110 / 140 / 180`；字重 `fw-400 / 500 / 600 / 700`。
- 三档标题：`h1` = serif · fs-40 · fw-600 · ls-5 · text + 幽光字影；`h2` = serif · fs-24 · fw-600 · ls-4 · text；`h3` = serif · fs-16 · fw-600 · ls-3 · 大写 · text-bright。正文 `text` = serif · fs-16 · lh-180 · text。修饰类 `h1--accent` = 强调词转 `gilt-bright`。
- 字段标签 caption 独立类 **`.nocturne-cap`**：serif · fs-12 · 大写 · ls-3 · `gilt`——黄铜刻字的标本标签，组件统一引用。

## 3. 几何与描边

- 造型 = **直角画框 + 圆月**。半径一档打平：`r 0px`（外框、控件、嵌套项、指示条全直角），圆件走 `r-full 999px`（月相盘、状态点、花芯）；勾选匣、密码小格一类小凹格独有 `notch 3px` 八角切角（clip-path）。组件不裸写形状值。
- 描边整数 1px；轻重分档用色：静止 chrome 档 `gilt-30`，浮层与升档 `gilt-50`，hover 与 focus 升 `gilt`，语义变体按 tone 染；双线画框 = 外 1px 框 + 内 1px `gilt-30` 发丝内衬线（`lining-inset 7px`），只给图版、模态级大框。
- frame 原语 `.nocturne-surface`：1px border + 直角 + 背景填充，输入变量 `--nocturne-surface-fill / -border`；发丝内衬线走 `.nocturne-lined`（`::before` 内缩 `lining-inset`）；丝绒配方 `.nocturne-velvet`（顶缘幽金 radial + 112deg 织纹 + 185deg 落夜渐变）、`.nocturne-velvet--wine`（顶部再罩一层酒红 radial），图版、模态、浮层面共用。
- 抬升：锚定浮层挂 `drop-pop` + 幽辉，模态挂 `shadow-modal`，面内图版框挂 `shadow-frame`。
- 浮层连接件（Arrow）是一枚 45° 菱形棱尖，面色随弹层、朝外两边压 `gilt-50` 线。
- 母题（构成件数按此复刻，不减配）：**蔓枝**——黄铜单线枝干，`stroke-dashoffset` 自根梢生长，叶、苞、花着生枝上错拍展开；**实填叶**——豆荚形对称叶，`leaf` 渐变实填 + 1 条 `gilt` 中脉；**苞**——泪滴形 `petal` 渐变实填 + 2 条折线瓣纹 + 基部萼弧；**卷须**——黄铜螺旋单线；**五瓣满花**——5 枚泪滴瓣 72° 环列（`petal` 暗档或 `petal-lit` 亮档）+ 花芯金盘 + 环列蕊点 5 粒，瓣自基点错拍过冲绽开、芯随后亮起；**角饰 sprig**——1 段枝梗弧线 + 3 片互不重叠描线叶 + 基部 1 粒圆点，全描线不实填；**满月圆点**——`accent-fill` 金珠；**酒红题匾 plaque**——`accent-surface` 底 + `gilt-50` 框 + `gilt-bright` 宽距字；**黄铜发丝线**——两端隐没渐变细线。靠输入变量换色。

## 4. 氛围层

定义在 `global.css`。

- `body` = `bg` 底 + 大马士革缠枝暗纹（SVG data-uri 平铺，gilt alpha ≤.07）+ 左上酒红、右下黄铜两团固定幽晕。
- `::selection` = `primary-deep` 底 + `text` 字。
- 滚动条标准细条（`scrollbar-width: thin`），thumb `gilt-dim`、轨透明。

## 5. 动效个性

- 时长 `dur .3s / -fast .12s / -slow .6s / -pop .35s / -sweep 1.5s / -draw .42s`；缓动 `ease cubic-bezier(.4,0,.3,1)` 通用、`ease-pop cubic-bezier(.2,.8,.3,1.1)` 浮层落定、`ease-bloom cubic-bezier(.2,1,.3,1.3)` 花瓣过冲绽开、`ease-draw cubic-bezier(.3,.8,.35,1)` 笔势描画。
- 按压：整钮下沉 `translateY(1px)`、投影收拢；`:active` 瞬间到位（`transition-duration: 0s`），松手按 `dur` 回弹；位移 1px 不超命中兜底线、不设光环。
- 悬停：描边升档转 `gilt` + `glow-12` 幽光外辉；实填件换亮头渐变；ghost 类盖 `gilt-10`。
- 共享动效（`effects.css`）：浮层开合 `.nocturne-drift` = 淡入 + `translateY(-6px)` 浮落；`nocturne-branch` 蔓枝 stroke 生长（dashoffset）；`nocturne-petal` 花瓣自基点绽开；`nocturne-sweep` 不定态单向扫掠；`nocturne-breathe` 幽光呼吸。辉光只在焦点、悬停、花芯与氛围呼吸，无持续脉动。
