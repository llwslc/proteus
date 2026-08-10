---
name: kit-standalone
description: 验控件库不依赖 demo 外壳——摘掉 src/shell 的样式表后，控件盒尺寸一格不变
---

# kit-standalone

`src/shell/**` 只服务演示页。消费方只装 `src/kits/<kit>`，拿不到外壳的任何一行 CSS。所以凡是控件要靠的规则（`box-sizing`、禁用态指针、`reduced-motion` 总闸）都得写在 `<kit>/theme/global.css` 里。

跑法：`node .claude/skills/kit-standalone/check.cjs [port] [kit]`

做法：逐套渲染演示页，采一遍控件盒尺寸；把外壳的 `reset.css` 从 DOM 上摘掉（`Shell.css` 是演示页自己的排版，不摘），再采一遍；两次不一致即该套依赖外壳。摘不到样式表直接报错退出，不给「静默通过」的机会。

修法：把那条规则从 `src/shell/reset.css` 复制进各套各自的 `theme/global.css`（外壳那份留着，落地页自己要用）。
