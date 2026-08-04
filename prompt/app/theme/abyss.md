# 演示 · ABYSS —— 沉没魔典

> 演示页里随主题换的部分。

## 1. 文案

- logo：`Abyss`，用 rune 符文体，前缀一枚圆形眼徽；副标题 `Eldritch UI Kit`；状态徽章 `Awake`，走 primary 色；时钟带一个月相图标。
- hero：eyebrow `Grimoire`；标题 `An **eldritch** interface kit / dredged from the deep`；描述关键词 wet-stone tablets、watching eyes、inscribed sigils、hand-inked frames；单位词 `Rites`、`Sigil File`。
- 区块组名带 script 斜体副题：Inputs · rites of intent，Forms · binding the acolyte，Feedback · what the deep returns，Overlays · things that surface，Display · what watches back，Foundations · stone & ink，Signature · what stirs below；demo 文案走深海与仪式的词汇，如 R'lyeh、Ward、Tide、Sounding。
- otp 预填：`130`，取 De Profundis（诗篇 130，自深处呼求）。
- toast：success 条的动作按钮文案 `Descend`。
- 时钟串后缀 ` TIDE`，收进一枚 `ink` 描边胶囊 chip。

## 2. 招牌

- hero：右侧法阵——符印 + 外环 96s 正转、内环 62s 反转、触手随 `breath` 呼吸、中心虹膜 6s 脉动、底衬一圈径向辉光；文案区右让 `300` 给法阵。
- Loader：圆环 + 星芒 + 中心眼，旋转加脉动，配 `stirring` 斜体字行；台高 `180`，循环播放。

## 3. 入场

- 顶栏 `abyss-drop` 下滑；hero 文案按 `abyss-rise` 分档错开；面板进视口时自暗水里浮出——`blur` 由浊转清、缓缓上浮微放大，`dur-slow` 慢速、`ease` 收，错开一拍，像自渊底升起。

## 4. 面板特例

- button、panel 两块面板的题匾随 `.abyss-breathe` 呼吸。
- context 面板的投放区：`inset` 底 + `round-4` + `1px dashed ink-strong` 内描（offset −3）+ 底下一层 `glow-soft` 椭圆辉雾；hover 字转 `text`、雾满亮；开菜单字转 `glow`、描线转 `glow-a55`。

## 5. 外壳

- 顶栏底缘一条 glow→ichor→glow 渐隐辉光带。
- 侧栏项 = 控件名 + 三字母缩码（缩码走 mono、`text-mute`、靠右）。rest 取 `text-dim`；hover 与键盘焦点提亮到 `text-bright`、盖 `glow-soft` 幽辉底；键盘焦点再自左缘渗开一团 `glow-a30` 墨晕、字挂 `text-aura` 微辉，去原生 outline。
