# 裁决账 —— 包装层挡住的 Base UI prop

`kit-baseui-surface` 逐条比对 `node_modules` 里各 Root 的 prop 面与我们的包装层。挡住不放行的位置必须在这张账上有一笔；升版冒出新 prop 而账上没有 → 门报「新增待裁」，代码里已经不挡了却还留着 → 报「陈账」。

`<Component>.*` 表示该包装层整个没接库的 Root prop 面。

- `Accordion.multiple` —— 已裁·改名。包装层暴露 `openMultiple`，同一能力换了个名字，值域不减。
- `Select.children` —— 已裁·结构自建。列表由 `items` 生成，消费方不塞 children。
- `Tooltip.open` —— 待裁。包装层自持开合状态做触屏点开，消费方拿不到受控开合。
- `Tooltip.onOpenChange` —— 待裁。同上。
- `PreviewCard.open` —— 待裁。同 Tooltip。
- `PreviewCard.onOpenChange` —— 待裁。同上。
- `Dialog.*` —— 待裁。手写 props 面，库的 Root prop 一个都不透传；见 `BASEUI_AUDIT_2026-08-06.md` §三。
- `AlertDialog.*` —— 待裁。同上。
- `Drawer.*` —— 待裁。同上，`snapPoints` 半开抽屉也卡在这里。
