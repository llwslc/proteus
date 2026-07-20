# 已知问题（组件工厂）

追踪已定位、待修的组件/规格问题。修掉一条就从这里删。

## 1. ContextMenu 把 demo「投放区」焊进了生产 wrapper（六套 kit）

**现象**：`src/kits/<kit>/components/ContextMenu/ContextMenu.tsx` 把 `<kit>-context__zone` 硬编码在 Base UI 的 `ContextMenu.Trigger` 上（hanabi 见 `ContextMenu.tsx:41`），于是消费方传入的 `trigger` 被强行套进一个虚线占位盒：`min-height`、mono 居中字、右下角圆点纹、`cursor:context-menu`、还有一抹 off-palette 的蓝 hover（`--hanabi-surface-zone-hover` `#e4eefa`）。规格里也焊死了这层——`prompt/components/theme/<kit>.md` 的 ContextMenu 行（hanabi 为 `:44`「投放区 = dashed 虚线箱 + surface-zone 底…」）。

**为什么是错的**：真实右键菜单是**包在真实内容上**的——右键一个表格行、卡片、文件、画布、选中文字，就地弹菜单。那个写着「右クリックで…」的虚线框只是 showcase 的可发现性装置（演示里得告诉观众右键哪儿），不是用法。把它焊进 wrapper = 任何消费方用 `<ContextMenu>` 都被强塞一个 demo 占位盒，撞上项目自己的原则「组件是生产件、不是 demo，为任意输入修」。

**正确范式（同族已经这么做）**：其余锚定弹层都把 trigger 透传、让消费方自己的元素当触发器、不焊样式——Tooltip `render={children}`、Popover / PreviewCard `render={trigger}`、Menu `render={<Button variant="ghost" …/>}`。唯 ContextMenu 例外。

**修法（待办，跨 6 套）**：wrapper 的 Trigger 去掉 `context__zone`、改 `render={trigger}`（或透传 className），只保留右键 + 键盘 Shift+F10 行为；虚线占位盒 + 「右键这里」文案挪进 demo（`App.tsx`），当演示外壳；同步改规格的 ContextMenu 行（投放区 → demo-only）；那抹蓝 hover 一并随之进 demo。

## 2. 全控件扫描结果（找「demo 装置焊进生产 wrapper」同类问题）

**结论：ContextMenu 是唯一确犯**。其余 wrapper 未见把 demo 脚手架焊进生产层：

- 锚定弹层（Tooltip / Popover / PreviewCard / Menu / Menubar / NavigationMenu）：均透传 trigger（`render`）或只上生产皮（Menubar / NavMenu 触发器 = `seg__btn` 分段钮皮，是本控件自身外观，不是 demo 装置）。
- 观察项（非缺陷）：Menu 把触发器默认成 `<Button variant="ghost">`——是个「默认 ghost 皮」的主观取向、不是 demo 装置，可接受；若日后要让消费方换触发器皮再议。
- wrapper 均不携带硬编码文案；`placeholder`（Autocomplete / Combobox / Select 的 `Search…` / `Select…`）是正常输入框默认值、非 demo 焊入。
