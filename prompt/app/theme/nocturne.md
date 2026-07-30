# 演示 · NOCTURNE —— 暗夜花园

> 演示页里随主题换的部分。

## 1. 文案

- logo：`NOCTURNE`，前缀一枚满月圆点；副标题 `DARK BOTANICAL UI KIT`；状态徽章 `NIGHT WATCH`，走 gilt 色。
- hero：eyebrow `Hortus Nocturnus · 37 Blooms`；标题 `A **night-blooming** interface kit / kept in wine, brass & bone till dawn`；描述关键词 deep-violet velvet、wine-red blooms、brass hairlines、one dim glow until dawn；单位词 `Blooms`。
- 区块组副题：Inputs `Garden orders · one touch, one promise.`；Forms `Night-register entries · archived at the stroke of the pen.`；Feedback `Garden gauges · trim the flame, watch the needle.`；Overlays `Summons · knock softly, and the layers will come.`；Display `Plates and seals · all taken to brass.`；Foundations `The night is built from one brass hairline.`；Signature `The flowers stand watch, and keep the light for the lamps.`
- demo 文案走夜园词汇：warden、night round、watch-bell、dew、hothouse、night register、specimen、sealed vial、moonlight distilling；时刻说法用 `the eleventh hour`、`the fourth hour`、`the stroke of midnight`。
- 花名单（选择类列表取前几项、12 项全用时按此序）：Belladonna、Night Jasmine、Evening Primrose、Moonflower、Queen of the Night、Angel's Trumpet、Night Phlox、Four-o'clock、Datura、Mandrake、Wolfsbane、Foxglove。
- 暖房名：South Conservatory、Moonlit Gallery、Poison Cabinet、Weeping Arbor。
- otp 预填：`217`（固定，标本号），与 input 面板锁定值 `BELLADONNA-217` 同源。
- toast：success 条的动作按钮文案 `Seal the vial`。
- combobox、autocomplete 空态文案 `No such flower in the garden`。
- preview 人物：`Lady Belladonna` · `@belladonna`，简介一句夜园看守人设定。

## 2. 招牌

- hero：标题上方一行 `font-script` 拉丁引言 `Hortus Nocturnus`；左右两缘各一株缠枝蔓、右株镜像，自根部向上生长——每株构成 = 主枝 1 + 侧枝 5 + 实填叶 9 + 卷须 3 + 苞 3 + 五瓣满花 3，`nocturne-branch` 主枝先行、侧枝错拍接力，叶花按生长高度次第绽放，满花后开；手机端藏蔓。右侧主题装饰件 = **黄铜提灯**——SVG 提灯灯焰呼吸，点击点灯或吹熄：页顶幽金灯晕亮起或隐去，灯下一行斜体灯语随之换句——点灯 `Warm light spills over the flower wall — the night round begins.`，吹熄 `Let the flowers be by themselves a while.`。
- Loader：`#1d1126` 夜底 + 一条蔓枝分隔自中心向两侧生长——每半支 4 片实填叶 + 1 卷须 + 末端 1 苞，中心一朵五瓣满花后开 + `NOCTURNE` 宽字距铜字，色值硬编码。

## 3. 入场

- 顶栏自上淡落；hero 蔓枝生长、文案按 eyebrow → 标题 → 描述次第 `nocturne-rise` 浮现；面板进视口 `nocturne-rise`（22px 上移淡入 1s）；App.css 带 reduced-motion 门。

## 4. 面板特例

- scroll 面板 12 行做成夜巡日志：mono 时刻码 + 英文巡园行，如 `23:41 · South Conservatory lamps trimmed`。
- context 投放区：1px dashed `gilt-30` 虚线箱 + `surface-inset` 底（hover 提亮一档）+ mono 居中提示 `Right-click to summon the warden`。
- preview 面板身份行：衬线名 + `.nocturne-cap` 注记。

## 5. 外壳

- 侧栏项 = 控件名 + 三字母缩码（缩码 mono、`text-mute`、靠右）；直角行；rest `text-dim`；hover 盖 `gilt-10` + 字转 `gilt-bright`；键盘焦点 = 2px `gilt` outline 收进行内（offset -2），去原生默认。
- 顶栏：`bg` 底 + 底缘 1px `gilt-30` 发丝线；logo 衬线 `ls-3`；时钟 mono 时分秒，前缀一词衬线斜体 `Hora Noctis` 走 gilt。
