# 演示 · NOCTURNE —— 暗夜花园

> 演示页里随主题换的部分。

## 1. 文案

- **语言**：全部演示文案英文（`app.md` 默认，本套无指派）——夜园词汇取自由稿字面量的英文译法；植物拉丁学名作 `font-script` 点缀。下列中文条目是当前自由稿的词表记录，随自由稿改英文后同步重写。
- logo：`NOCTURNE`，前缀一枚满月圆点；副标题 `DARK BOTANICAL UI KIT`；状态徽章 `NIGHT WATCH`，走 gilt 色。
- hero：eyebrow `Hortus Nocturnus · 37 Blooms`；标题 `A **night-blooming** interface kit / kept in wine, brass & bone till dawn`；描述关键词 deep-violet velvet、wine-red blooms、brass hairlines；单位词 `Blooms`。
- 区块组副题（中文）：Inputs 「园中令，一钮一诺。」；Forms 「夜册登记，落笔即存档。」；Feedback 「焰拨高一分，针挪一寸。」；Overlays 「有事请轻声，浮层自会来。」；Display 「勋牌铭签，都上了铜。」；Foundations 「从一根发丝线起造夜。」；Signature 「花在夜里，替灯把光看住。」
- demo 文案走夜园词汇：颠茄、夜来香、月见草、看守人、更铃、露水、暖房、夜册、标本、巡灯、封瓶、蒸馏；暖房名用 南翼暖房、月光回廊、毒草小间、垂枝亭；时间用更次（子时、亥时三刻）。
- otp 预填：`217`（固定，标本号），与 input 面板锁定值 `BELLADONNA-217` 同源。
- toast：success 条的动作按钮文案 `封瓶收存`。
- combobox、autocomplete 空态文案 `园中无此花`。
- preview 人物：`颠茄夫人` · `@belladonna`，简介一句夜园看守人设定。

## 2. 招牌

- hero：标题上方一行 `font-script` 拉丁引言，左缘一株缠枝蔓自下而上生长（`nocturne-branch` + 叶与花错拍绽放）；右侧主题装饰件 = **黄铜提灯**——SVG 提灯灯焰呼吸，点击点灯或吹熄：页顶幽金灯晕亮起或隐去，灯下一行 `font-hand` 手写灯语随之换句。
- Loader：`#1D1126` 夜底 + 蔓枝自两侧向中生长、一朵五瓣酒红花绽开 + `NOCTURNE` 宽字距铜字，色值硬编码。

## 3. 入场

- 顶栏自上淡落；hero 蔓枝生长、文案按 eyebrow → 标题 → 描述次第 `nocturne-rise` 浮现；面板进视口 `nocturne-rise`（22px 上移淡入 1s）；App.css 带 reduced-motion 门。

## 4. 面板特例

- scroll 面板 12 行做成夜巡日志：mono 更次码 + 中文日志行。
- context 投放区：1px dashed `gilt-30` 虚线箱 + `surface-inset` 底（hover 提亮一档）+ mono 居中提示「在此右键，唤看守人」。
- preview 面板身份行：衬线名 + `.nocturne-cap` 注记。

## 5. 外壳

- 侧栏项 = 控件名 + 三字母缩码（缩码 mono、`text-mute`、靠右）；直角行；rest `text-dim`；hover 盖 `gilt-10` + 字转 `gilt-bright`；键盘焦点 = 2px `gilt` outline 收进行内（offset -2），去原生默认。
- 顶栏：`bg` 底 + 底缘 1px `gilt-30` 发丝线；logo 衬线 `ls-3`；时钟 mono 时分秒 + `font-hand` 更次字。
