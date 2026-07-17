---
name: kit-a11y
description: Demo 页可访问性合同门禁——表单控件可访问名、右键区键盘可达、图标钮命名、Avatar 状态语义、Loader 主题名。改 App demo 或 wrapper 语义时跑。
---

# kit-a11y

`node .claude/skills/kit-a11y/check.cjs [kit] [port]`（默认全 kit、:5273，需 dev server + /tmp/pw playwright-core）。

五组检查，每组计数审计面、零命中即 FAIL（防 no-op 绿灯）：

- **A acc-name**：`#select [aria-haspopup="listbox"]`、`#combobox/#autocomplete/#number/#input input`、`#otp [role="group"]`、`#slider input` 逐个要有可访问名（aria-label / aria-labelledby 解析非空 / label[for] / 包裹 label），每 kit 至少 10 个目标。
- **B ctx-kbd**：`.<kit>-context__zone` 非禁用区 `tabindex=0`、禁用区 `-1`；聚焦后真实按 Shift+F10 开出 `[role="menu"]`，Escape 关闭。
- **C icon-btn**：全页 `button` 无文本者必须有 aria-label/labelledby/title；静息态与 popover 打开态各扫一遍。
- **D avatar-status**：`[class*="avatar__status"]` 全部 `role="img"` + aria-label。
- **E loader-name**：demo Loader 的 aria-label 非空且 ≠ "Loading"（须含主题名）。

对应钉文：app.md「caption 一律与控件建立可访问名关联」、components.md ContextMenu 键盘条款、OtpField `label`、Slider label 兼作可访问名。
