# 控件皮肤 · NOCTURNE —— 暗夜花园

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色 `primary` 黄铜填 + `on-fill` 深字（含箭头、占位符、数值），保留 `line` 描线；hover 加深到 `primary-deep`。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = 实色 `secondary` 酒红填 chip + `on-wine` 骨白字；未选是 `surface` 面 + `line` 框；Menubar 触发 chip 的打开态只复用填色。
- 「文字强调选中」用于列表，把文字转 `primary-lit` + `fw-600`；Tab 的选中由亮金指示条自证（见 §2 Tabs 行）。
- 悬停：带框盒子控件（secondary 按钮、分段控件与触发条、步进钮、Tabs、输入框）描线由 `line` 转 `line-strong`；ghost 按钮盖 `primary-wash`、文字转 `primary-lit`；图标和动作按钮文字转 `primary-lit`，菜单触发器转 `bright`；列表项、Accordion 行、菜单项盖 `drape` 酒红横扫。
- 焦点：布尔开关（Checkbox、Switch、Radio）整控件一圈灯光外环（`2px primary-lit` + `3px` 外让 + `glow-strong` 暖晕）；其余按钮、字段、触发条、分段钮同取这圈灯光落在自身，输入框聚焦时整框 border 转 `primary-lit` + inset 一层 `glow`。
- 危险态：`danger` 浆果红实填、前景 `on-wine` 骨白，描线仍 `line`；静止态红字红图标走 `danger`。
- 禁用 + 选中／数值填充（Switch、Checkbox、Radio、Slider）：保持 `primary` 实填，花开与落笔动画随禁用去掉，靠 `disabled-opacity` 整体变灰。

## 2. 组件皮肤决定

- Button：黄铜画框钮——`surface` 底 + `line` 框 + `shadow`；primary = `primary` 填深字 + 顶缘一道 `primary-lit` 高光内线；secondary = 酒红竖向渐变填骨白字；danger = `danger` 填骨白字；ghost = 无框无影透明底，hover 盖 `primary-wash`、文字转 `primary-lit`；icon 钮方形等宽高；icon-ghost 透明无框。
- Switch：花枝开合——关态一截 `primary-deep` 斜挑花枝 + 收拢的花蕾（花萼半抱）+ `track` 轨感；开态花蕾隐去、五瓣 `secondary-lit`／`secondary` 花以 `petal-open` 错拍绽开、`core-in` 亮金花心弹出、花枝转 `primary`、整枝一圈 `glow` 暖晕。
- Checkbox：`r-mark` 直角小方框 + `surface-inset` 底；勾选 = `secondary-wash` 底 + `primary-lit` 一勾以 `draw-in` 从左落笔画出 + `glow` 微晕；indeterminate = 一道 `primary-lit` 横杠；hover 描线转 `line-strong`。
- CheckboxGroup：父子竖排，items 左缩进，引导线是 `1px` `line-faint` 细线。
- Radio：`line` 描线正圆 + `surface-inset` 底；选中 = 一轮**满月**——亮金圆盘 + 暗面渐隐移出（`transform` 拨开夜影）+ 一圈 `glow` 暖晕。
- ToggleGroup：分段条家族——不画外箱体，chip 直角散排、各带 `line` 框 + `shadow`，文字 display 体大写；选中态见 §1「分段选中」。
- Slider：黄铜灯芯——`r-rail` 轨（`track` 底 + `line` 框），indicator 是灯焰渐变（琥珀→亮金）平涂 + 一层 `glow` 暖晕；thumb 是一枚**灯焰**——泪滴形 `primary-lit`→`warning` 径向填 + `line` 描，拖动与键盘焦点亮一圈灯光；数值走 Courier Prime `primary-lit`。
- NumberField：`减·输入·加` 三连——步进钮是画框方钮（display 体符号、`shadow`、hover 描线转 `line-strong`），中间输入位 mono 体居中；到界的步进钮按禁用态置灰。
- Input/Field：`surface-inset` 底 + `line` 框（纸下垫着的凹感）；聚焦见 §1，笔落处一圈 `glow` 暖光；描述行 `dim`、错误行 `danger` 红字，错误态整框 border 转 `danger`。
- OtpField：cell 是等宽输入方格、走输入位凹面（`r-mark` + `surface-inset` 底），分隔处一枚 `primary` 小花；filled cell 字转 `primary-lit`，focus cell 框转 `primary-lit`。
- Select：触发器同 Input 皮 + 右侧 `primary-lit` ▾ chevron 打开翻转，打开时整框转 `line-strong`；弹层 = `surface-raised` 面 + `line-strong` 框 + `overlay-shadow` + `.nocturne-unveil`，顶缘一枚 `45deg` 方块尖指回触发器；列表项直角行，悬停／高亮盖 `drape`，选中项文字 `primary-lit` `fw-600`、右侧指示一枚亮金圆点。
- Combobox：列表项皮肤复用 Select；InputGroup 左图标 `dim`，clear 钮 icon-ghost。
- Autocomplete：列表项皮肤复用 Select（无勾选指示）。
- Fieldset：legend 走 `.nocturne-cap` + 前缀 `primary` 小花，框是 `1px` `line-faint` 细线直角箱。
- Form：竖排间距 `space-4`。
- Progress：月光蒸馏——`r-rail` 轨凹嵌（`line` 框 + `track` 底），indicator 酒红竖向渐变平涂 + 一层 `glow`；推进端骑一朵五瓣花随进度前移、到满绽开；不定态则收成同色扫掠段、不挂花。
- Meter：轨同 Progress，填充改本 `tone`／`tone-deep` 竖向渐变，按 `tone` 重染，无推进端花。
- Tabs：黄铜书线页签——一排 display 体大字距 tab 咬在 `line` 底线上，未选 `dim` 字、hover 转 `bright`，选中 `primary-lit` 字 + 底缘一条亮金指示条（两端渐隐）随 Base UI `--active-tab-*` 移动；content 区衬 `space-4`、不画外框。
- Accordion：折叠配方——trigger 行 marker 是 `primary` 小花（定宽）、title display 体 `fw-600`、chevron `primary-lit` ▾ 开态翻转；panel content 按缩进公式对齐 title；trigger hover 盖 `drape`。
- Collapsible：复用 Accordion 折叠皮。
- Tooltip：黄铜小牌——`surface-raised` 面 + `line-strong` 框 + `overlay-shadow`、`r-mark` 圆角，connector 方块尖同 `line-strong` 描、面色填。
- Popover：`surface-raised` 面 + `line-strong` 框 + `overlay-shadow`；title 走 `.nocturne-cap`，close 复用 icon-ghost，body 右退 `space-7` 让开 close。
- PreviewCard：皮同 Popover（无题）。
- Menu：列表项皮肤复用 Select；图标 `dim` 随高亮转 `bright`；快捷键 Courier Prime `mute` 靠右；子菜单 chevron ▸；danger 项红字红图标、高亮盖 `danger-wash`（换色走 `--nocturne-item-color`）。
- Menubar：chip 同 ToggleGroup；菜单弹层复用 Menu 皮。
- NavigationMenu：触发器 chip 同 ToggleGroup 未选态、chevron 随开合翻转；下拉 = `surface-raised` 面 + `line-strong` 框 + `overlay-shadow`，connector 方块尖指向激活触发器、随 morph 移动；链接 = 直角行，label display 体 `fw-600` + 描述 `dim` fs-13，悬停盖 `drape`；morph 接 Base UI 尺寸变量。
- ContextMenu：菜单皮复用 Menu。
- Dialog：`surface-raised` 面 + `line` 双线框（`--double`）+ `shadow-modal`；标题居中 display 体大字距、上骑一枚酒红铭牌题拉丁；一条缠枝花藤分隔题与体、以 `branch-grow` 画出；backdrop = `scrim` + `blur`。
- AlertDialog：Dialog 基底按 `tone` 重染——铭牌与确认钮同取 tone（danger 浆果红、warning 琥珀、primary 黄铜），铭牌前缀一枚 tone 图记。
- Drawer：面板 = `surface-raised` 面，朝屏内那条边 `line` 描线 + `shadow-modal`，其余三边贴屏不描；题头 = h2 字号 display 体标题（前缀 `primary` 小花），不用铭牌；body 自滚动、行距 `space-4`。
- Toast：锚右上角、竖排整列常显、条间距 `space-3`；条 = `surface-raised` 面 + `line` 框 + `shadow-frame`，左端一朵五瓣花承载 tone——info `primary` 黄铜、success `success` 绿、warning `warning` 琥珀、danger `danger` 浆果红；底缘一条 `primary`→`primary-lit` 计时线随 timeout 收尽；滑入自右、`ease` 落位；手机端横向撑满、边距 `space-4`。
- Avatar：正圆 `line` 框 + 外围一圈 `primary` 外环；fallback = display 体单字压 `secondary-wash` 底；status 点右下角 `line` 描边小圆，online `success`、busy `danger`、away `warning`、offline `primary-deep`。
- Badge：直角小铭牌（`r-mark` + `line` 框）、Courier Prime 字——primary `primary-wash` 底金字、secondary `secondary-wash` 底酒红字、success `success-wash` 底绿字、warning `warning-wash` 底琥珀字、danger `danger-wash` 底红字、neutral `surface-inset` 底 `dim` 字；dot = 前缀实心圆点取本 tone 主色。
- Toolbar：chip 同 ToggleGroup；ToolbarLink 与钮等高、`primary-lit` 字 + 悬停下划线。
- ScrollArea：thumb 是 `primary-deep` 圆条；panel 型悬停显、坐在 `surface-inset` 药丸轨上（thumb 内缩 1px），popup 型常显——thumb 换 `primary`、宽 4px、轨透明、整条离框 `space-1`，充当弹层列表的溢出提示。
- Separator：`1px` `line` 细线；带 label 版 = 线 + `.nocturne-cap` 文字（前缀小花）+ 线；竖向为实线 `line`。
- Panel：黄铜画框卡——`surface` 面 + `line` 双线框（`--double`）+ `shadow-frame`；title 骑顶缘居中一枚酒红铭牌（display 体 `primary-lit` 字），meta 是右上角 Courier Prime `mute` 码；嵌套 Panel 降为单线 + `shadow`、题牌换 `secondary`。
- 占位图标是 1px 圆头描线的简笔线形（`icons.tsx` 统一 `1em`、`currentColor`）。
- 弹层列表的内衬取 `space-1`。
- 共享配方的颜色就近覆盖：`--nocturne-item-color`、`--nocturne-plate-fill`、`--nocturne-hazard-tone`。
- 动效：除花开、落笔、藤生、暖光明灭外只有交互过渡；无脉动、无扫光。
- 模态体内间距三档（成对／同级／分段）= `8/16/24`。
