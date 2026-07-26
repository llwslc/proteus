# 演示 · NOCTURNE —— 暗夜花园

> 演示页里随主题换的部分。

## 1. 文案

- **全套英文**：外壳、仪表标签、演示内容一律英文——面板清单、meta 码、数据条、hero、logo、状态徽章、footer，以及面板内的 caption、条目、正文段、菜单项、toast 标题与描述、对话框文案、组副题。学名／题词走拉丁（Tangerine 草书）。
- logo：`NOCTURNE`，前缀走 `primary-lit` 亮金一枚小花；副标题 `DARK-BOTANICAL UI KIT`；状态徽章 `GARDEN OPEN`，走 primary 色。
- hero：eyebrow `Hortus Nocturnus · 37 Blooms`；标题 `A **dark-botanical** interface kit / inked in brass, kept by lamplight`；描述关键词 velvet ground、brass hairline frames、wine plaques、lamp-warm glow；单位词 `Blooms`。
- 区块组副题：Inputs `A vow per switch, a stroke per record.`；Forms `The night register, entry by entry.`；Feedback `Flame high or low, told at a glance.`；Overlays `Ring once, and aid comes quietly.`；Display `Plaques and marks, each in its place.`；Foundations `One brass line draws the whole garden.`；Signature `One bead of light, kept till dawn.`
- demo 文案走夜园词汇：light the lamp、register bloom、moonlight distilling、lamp flame、greenhouse temp、night mist、bloom on duty、catalogue fields；花名 Belladonna、Night Jasmine、Evening Primrose；暖房 South Conservatory、Moonlit Gallery、Poison Cabinet、Weeping Arbor；人名 Lampkeeper、Warden。
- otp 预填：`217`（固定，夜册标本号），与 input 面板锁定值 `Register 217` 同源。
- toast：success 条的动作按钮文案 `Received`。
- combobox、autocomplete 空态文案 `No such bloom in the garden` / `No such keeper in the garden`。

## 2. 招牌

- hero：黄铜双线画框衬底（丝绒面 + 内圈 `line-faint` 细线 + 顶部 `glow` 暖晕）；右侧主题装饰件 = **提灯**——一盏带玻璃罩的黄铜油灯，焰身 `flame-flicker` 轻跳、外围 `glow-strong` 暖晕 `breathe` 呼吸，灯上一行 `.nocturne-script` 拉丁题词、灯下一行同款草书旁注。
- Loader：`base` 底 + 大马士革壁纸 + 一朵大 `secondary-lit` 五瓣花 `petal-open` 绽开 + `core-in` 亮金花心 + Courier Prime `NOW OPENING` 码位行，色值硬编码。

## 3. 入场

- 顶栏 `drop` 自上落位；hero 文案按 eyebrow → 标题 → 描述 → 数据条次序 `rise` 淡入上浮；面板进视口时 `22px` 上移淡入落定——缓入不发光，是克制的 fade-up 而非响度签名。

## 4. 面板特例

- scroll 面板的 12 行列表做成夜巡记录：Courier Prime 时刻码 + 英文日志行。
- slider 面板的灯焰控件用泪滴灯焰 thumb 在黄铜轨上滑动（灯焰渐变填充随值长，属常规态，无需额外 prop）。
- preview 面板的身份行：display 体名 + `.nocturne-cap` 注记。
- context 面板的投放区：`1px` `line-faint` 虚线箱 + `surface-inset` 底（hover 升 `drape`）+ 右下角一枝 `primary` 缠枝小花；居中提示文字。

## 5. 外壳

- 侧栏项 = 控件名 + 三字母缩码（缩码走 Courier Prime、`text-mute`、靠右）；直角行、无左竖轨。rest 取 `text` 骨白；hover 盖 `drape` 酒红横扫 + `primary-lit` 字；键盘焦点在 hover 底上再套全站那圈灯光焦点环——`2px primary-lit` + `glow` 暖晕，去原生 outline。
