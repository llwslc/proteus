# 控件皮肤 · NOCTURNE —— 暗夜花园

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Checkbox = `accent-surface` 酒红丝绒渐变 + `on-fill` 骨白前景（含箭头、占位符、数值），描边保持 `gilt-50`、顶缘一线 `glow-12` 内光；hover 渐变换 `primary` 亮头 + 幽光外辉（Checkbox 勾选另有衬底画法，见 §2 Checkbox 行）。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = chip 盖 `accent-surface` + `gilt-50` 框 + `text` 字；未选 chip 透明无框 `text-dim` 字；Menubar 触发 chip 打开态复用此填充。
- 「文字强调选中」用于列表、Tab、NavMenu，文字转 `gilt-bright`；Select、Combobox 选中行右侧一枚满月圆点（`accent-fill`）；Tab 另带 `gilt` 渐变底线指示（见 §2 Tabs 行）。
- 悬停：带框控件描边升 `gilt` + `glow-12` 幽光；ghost、quiet 类盖 `gilt-10`；列表项、菜单项盖酒红行扫 `linear-gradient(90deg, primary-50, primary-12)`；菜单触发器文字转 `text-bright`。
- 焦点：全站 2px `gilt` outline、offset 3px，按控件族落位（components.md §5）；输入类聚焦另将整框 border 转 `gilt` + `glow-12` 幽光圈。
- 危险态：静止红字红图标 `danger`；填充件 `danger-deep` 渐变 + `on-fill` 前景；危险行扫换 `danger-50 → danger-12`。
- 禁用：`disabled-opacity` 挂控件根一层；实填钮底退 `disabled-fill` 夜面、去影去光。
- 禁用+选中/数值填充（Switch、Checkbox、Radio、Slider）：保持各自填充，花开、月相、描画动画随禁用静止，整根走 `disabled-opacity`。

## 2. 组件皮肤决定

- Button：primary = 酒红丝绒渐变实填（见 §1）；secondary = 透明底 + `gilt-50` 框 + `gilt-bright` 字，hover 盖 `gilt-10`；danger = `danger-deep` 渐变实填；ghost = 无框透明 `text-dim` 字，hover 字转 `gilt-bright` + 1px `gilt` 底线自中央展开；icon = secondary 皮方钮等宽高；icon-ghost = 无框图标钮，hover 字转 `gilt-bright`；按压整钮下沉 1px、影收拢。
- Switch：枝上花开——轨 = 一段黄铜蔓枝（2px 枝线自左向右、梢端上挑）+ 枝上 1 片实填叶（`leaf` 渐变实填，不许描线减配）；花头固定在梢端、斜置约 42° 如摘下平放，原地开合：关态是垂头花苞（带双瓣纹）+ 5 枚萼片收拢（`leaf` 渐变实填、缩 76%），开态苞隐、5 萼张满、5 瓣 `petal-lit` 过冲绽开（`ease-bloom`）、花芯金盘睁眼亮起（含 3 粒 `primary-deep` 芯点，迟 .1s）；开态枝转 `gilt`、花辉 `glow-40`，关态枝 `gilt-dim`。
- Checkbox：`notch` 八角小匣 + `surface-inset` 凹底；勾选 = `primary-25` 衬底 + `gilt` 框 + `gilt-bright` 单笔勾按笔势画出（`pathLength` dashoffset、`ease-draw`）+ 幽辉；indeterminate = `gilt-bright` 粗横杠；hover 框升 `gilt`。
- CheckboxGroup：父子竖排，items 左缩进，引导线 1px `gilt-30` 垂线。
- Radio：月相盘——正圆 `gilt-30` 框内一轮满月（`moon-face` 金盘 + 3 粒陨坑暗点），`moon-shade` 夜影盘盖满；hover 夜影平移退一分露月牙；选中夜影退尽露满月 + 框转 `gilt-bright` + 月辉 `glow-40`；组竖排。
- ToggleGroup：分段条家族——外箱体 1px `gilt-30` 框横条压 `bg-deep` 底、内衬 `space-1`；chip 无框、`ls-2` 衬线字；选中见 §1。
- Slider：黄铜导轨（6px 高、1px `gilt-30` 框、`surface-inset` 底）+ 灯焰填充 `linear-gradient(90deg, warning, gilt-bright)`；thumb = 一朵随值开合的花——5 枚萼片实填常驻（`leaf` 渐变、缩 70%），5 枚 `petal-lit` 花瓣张角随值连续缩放（0 值收苞 30%、满值全绽）、花芯金盘常明；拖动与悬停花辉升档；数值 mono `gilt-bright` 靠右。
- NumberField：减·输入·加三连——步进钮 secondary 皮方钮（衬线 − +），中位 mono 居中；到界步进钮按禁用置灰。
- Input/Field：`surface-inset` 凹面 + 1px `gilt-30` 框、底边压 `gilt-50`；聚焦见 §1；placeholder `text-mute`；描述行 `text-mute`，错误行 `danger` 且整框转 `danger`。
- OtpField：cell = `notch` 八角凹格 + mono 居中；filled 字转 `gilt-bright`；focus 格框转 `gilt` + 幽光；`splitAt` 处一枚满月圆点分隔。
- Select：触发器同 Input 皮 + 右侧 `gilt` chevron 开态翻转、开态整框转 `gilt`；弹层 = `surface-pop` 丝绒面 + `gilt-50` 框 + 菱形棱尖；行悬停与高亮盖酒红行扫，选中行 `gilt-bright` 字 + 右侧满月圆点。
- Combobox：列表皮复用 Select；InputGroup 左图标 `text-mute`，clear 钮 icon-ghost；空态行 `text-mute` 居中。
- Autocomplete：列表皮复用 Select、无选中指示。
- Fieldset：legend 走 `.nocturne-cap`，尾接一条延伸到框尾的 `gilt` 渐变发丝线；体竖排。
- Form：竖排 `space-4`。
- Progress：窄轨解剖——6px 轨（1px `gilt-30` 框 + `surface-inset` 底）+ `accent-surface` 转横向的酒红填充，推进端一朵五瓣满花压轨随值绽（0 值收蕾 15%、满值全绽，瓣 `petal-lit`）；数值 mono `text-dim`；不定态 = 酒红短条 `nocturne-sweep` 单向扫掠。
- Meter：解剖同 Progress，填充按 `tone` 重染（primary 酒红、success 苔绿、warning 琥珀、danger 赤红各家渐变）；端花取夜园花色（`petal-lit` 酒红，success 档换 `petal-moon` 月光白），不吃语义色板。
- Tabs：页签压黄铜书线——通栏底线 1px `gilt-30`（双盒横滚），tab 衬线 `ls-2` 字，hover 转 `text`，选中 `gilt-bright`；指示 = 2px `gilt` 两端隐没渐变线随 `--active-tab-*` 滑移压住底线。
- Accordion：折叠配方——marker = `gilt` 四瓣花窗（定宽）、title 衬线 `fw-600`、chevron `gilt` 开态翻转；行 hover 盖 `gilt-10`；panel 高度过渡 `dur`。
- Collapsible：复用折叠配方，独立件自带 1px `gilt-30` 行框。
- Tooltip：小夜牌——`surface-pop` 丝绒面 + `gilt-50` 框 + 菱形棱尖，`fs-12` `text` 字。
- Popover：`surface-pop` 丝绒面 + `gilt-50` 框 + 棱尖；title = h3 + 底发丝线；close icon-ghost 右上。
- PreviewCard：皮同 Popover、无题行。
- Menu：行 = 图标 `text-mute` + label + 快捷键 mono `text-mute` 靠右 + 子菜单 chevron；高亮酒红行扫、图标随行转 `gilt-bright`；danger 行见 §1 危险态（行扫换色走 `--nocturne-item-sweep`）。
- Menubar：触发 chip 同 ToggleGroup；弹层复用 Menu 皮。
- NavigationMenu：触发 chip 同 Menubar、chevron 开态翻转；下拉两列，link = 衬线 label + `text-mute` `fs-12` 描述，悬停酒红行扫；菱形棱尖随 morph 移动。
- ContextMenu：复用 Menu 皮。
- Dialog：夜册——`velvet--wine` 酒红丝绒面 + `gilt-50` 框 + 发丝内衬线；title 居中 `h2`、上方一行 `font-script` 拉丁引言 `gilt-bright`，title 下一条蔓枝分隔线自中央向两侧生长（每半支 3 片实填叶 + 末端 1 苞，中心一朵满花错拍绽开）；close 右上 icon-ghost；backdrop = `scrim` + 模糊。
- AlertDialog：Dialog 基底按 `tone` 重染——拉丁引言与确认钮转 tone、题下蔓枝换 tone 色；无 close。
- Drawer：`velvet` 丝绒面板，朝屏内缘 1px `gilt-50` + 发丝内衬线；title 同 Dialog 减配（引言保留、无蔓枝）；body 自滚动。
- Toast：锚右上；静止层叠收拢（后条下探、微缩），悬停展开整列；条 = `velvet` 面 + `gilt-50` 框 + 左端一朵五瓣满花记取夜园花色（info `gilt`、success `petal-moon` 月光白、warning 琥珀、danger 赤红）+ 底缘 2px `gilt` 计时线（`nocturne-life` 随 timeout 燃尽、悬停暂停）+ close 右上；动作钮复用 secondary `sm`；手机端横向撑满。
- Avatar：圆形画框——1px `gilt-50` 外环 + 1px `bg` 内隙 + `surface-pop` 底；图裁圆；fallback = 衬线单字 `gilt-bright`；status 右下小圆（`bg` 描边）：online `success`、busy `danger`、away `warning`、offline `text-mute`。
- Badge：铭签 chip——1px 框、`fs-12` `ls-2` 字；primary = `accent-surface` 底 `on-fill` 字；success、warning、danger = 各家 `-deep` 底 `on-fill` 字；secondary = 透明底 `gilt-50` 框 `gilt-bright` 字；neutral = `bg-deep` 底 `text-dim` 字；dot = 前缀圆点取本 tone 亮档。
- Toolbar：chip 同 ToggleGroup；ToolbarLink 与钮等高、`gilt-bright` 字 + hover 底线；组间分隔竖发丝线。
- ScrollArea：panel 型 thumb = `gilt-dim` 细条、hover 转 `gilt`、轨透明；popup 型 thumb `gilt` 3px 常显、离框 `space-1`，充当弹层溢出提示。
- Separator：`gilt` 两端隐没渐变发丝线；带 label 版 = 线 + `.nocturne-cap` 字 + 线；竖向 1px `gilt-30` 实线；`start`／`end` 档文字侧的短线取 `separator-stub-w`。
- Panel：丝绒图版——`velvet` 面 + 1px `gilt-50` 框 + 发丝内衬线 + `shadow-frame` + 四角 sprig 角饰垫于内容之下（prop `corners` 默认开）；title 落在骑双线框组居中半出的酒红题匾（母题 plaque）；嵌套 Panel 无 sprig 无题匾，title 行内 `h3`。
- 占位图标是 1.5 描线圆头简笔（`icons.tsx` 统一 `1em`、`currentColor`）。
- 弹层列表内衬 `space-2`。
- 模态体内间距三档（成对/同级/分段）= `8/16/24`。
- 共享配方换色就近覆盖：`--nocturne-item-sweep`、`--nocturne-bloom-tone`。
- 动效：花开、月相、蔓枝生长、计时线之外只有交互过渡；控件无持续辉光呼吸。
