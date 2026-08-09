---
name: kit-baseui-surface
description: 以 node_modules 的 .d.ts 为环外基准，盯住包装层挡掉的 Base UI prop——每一处都要在裁决账上有一笔
---

# kit-baseui-surface

其余的门都在环内：kit-api 拍七套互相，kit-spec-props 拍代码对规格，两端都是我们自己写的。库在环外，没有仪器看着——`orientation`、`multiple`、`thumbAlignment` 这些能力就是这样躲过全部审计的（复盘见 `BASEUI_AUDIT_2026-08-06.md` §七）。

跑法：`node .claude/skills/kit-baseui-surface/check.cjs [kit]`

做法：逐套逐组件找主接口 `<Component>Props`，判两件事——① 它有没有接库 Root 的 prop 面（没接就是整面被挡，记 `<Component>.*`）；② `Omit` 里点名挡掉、又没在自己接口里重新声明的 prop。结果对 `ledger.md`：账上没有 → 「新增待裁」；账上有而代码已不挡 → 「陈账」。审到 0 处直接报错退出。

挡住不一定错（改名、结构自建都正当），但必须有人裁过。升版后库多出的 prop 会自动冒出来要裁决。
