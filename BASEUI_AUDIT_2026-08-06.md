# Base UI 能力面审计 —— 2026-08-06

装机版 `@base-ui/react` **1.7.0**（2026-08-07 自 1.5.0 升级，`OTPFieldPreview`→`OTPField` 迁移随行；首版审计基于 1.5.0，1.7.0 增量见文末附录）的 `.d.ts` 能力面（不是网页文档）↔ 我们的三层现状：包装层签名（截获了什么、透不透传）、七套 App demo 的属性用例并集、七套 CSS 里被样式化的 `data-*` 并集。**只查不改。**

起因：`Slider.orientation` 与 `Slider.thumbAlignment` 连续两个能力被用户亲手发现——21 道门全部向内看（七套互拍、代码对规格、驱动 demo 已有的东西），Base UI 的能力面从不在任何对拍的另一端。本文即那次缺席的对拍。

## 判定档位

- **✅ 已接**：有皮、有 demo 或纯行为透传即正确。
- **🟡 行为透传即用**：类型与行为都走 `...rest` 透传、渲染无需新皮；但零 demo 零规格，用户用了才知道。低危。
- **🟠 透传但无皮**：类型透传，但 CSS 没有对应处理——**传了渲染垃圾**（orientation 类）。中危，本次 Slider 竖向就是这类。
- **🔴 结构级缺口**：能力住在我们没渲染的零件族里，透传也到不了。
- **⛔ 被墙（NO-REST）**：包装层不展开 `...rest`，Base UI 的能力整体不可达——是否故意收窄，待裁。

---

## 一、结构级缺口（🔴 零件族没建，透传无效）

| # | 组件 | 能力 | 证据 | 建议 |
|---|---|---|---|---|
| R1 | **Menu / ContextMenu / Menubar** | **可勾选菜单项**：`Menu.CheckboxItem`＋`CheckboxItemIndicator`、**单选组**：`Menu.RadioGroup`＋`RadioItem` | 零件在库中存在，我们的 Menu 骨架 0 处引用；items 模型只有普通项／danger／子菜单 | 常见真实需求（视图开关、排序单选）。接的话三个菜单宿主同吃，估 60–80k |
| R2 | **Combobox** | **多选＋chips 标签输入**：`multiple` prop ＋ `Combobox.Chips/Chip/ChipRemove` 零件族 | 零件族 0 引用；`multiple` 透传后 trigger 值渲染也不成立 | 大件（tag-input 是半个新控件），接=每套设计 chip 皮，估 120k+；不接=在契约写明单选定位 |
| R3 | **Select** | **多选**：`multiple`（`Select.Value` 要渲染数组、每行复选指示） | `multiple` 透传但 Value/指示未按多选设计 | 同 R2 联动裁；Select 多选比 chips 轻，估 40–60k |
| R4 | **NumberField** | **划擦输入**：`ScrubArea`＋`ScrubAreaCursor` 零件（按住 label 左右拖改值，虚拟光标） | 零件 0 引用 | 桌面向彩蛋能力，脚感强；接=label 挂 ScrubArea＋七套光标皮，估 40k；不接也成立（触屏无感） |

## 二、透传但无皮（🟠 传了会乱，orientation 家族为主）

| # | 组件 | prop | 现状 | 建议 |
|---|---|---|---|---|
| P1 | **Tabs** | `orientation="vertical"` | CSS 只有横排布局＋底轨/下划线语言；竖排=列布局＋指示条改侧轨，七套全无 | 最常用的竖向变体（侧边设置页）。接=七套各改布局＋指示语言，估 80–100k |
| P2 | **ToggleGroup** | `orientation="vertical"` | 分段条全横排（brass 凹槽箱、hanabi 药丸散排…） | 接=竖排箱体变体；或裁「横排定位」写进契约 |
| P3 | **Toolbar** | `orientation="vertical"` | 同上，箱体横排 | 同 P2 联动裁 |
| P4 | **Menubar** | `orientation="vertical"` | 同上 | 使用场景弱，倾向裁「不接」 |
| P5 | **Accordion** | `orientation="horizontal"` | 折叠全竖排；横向手风琴=完全另一套布局 | 使用场景弱，倾向裁「不接」 |
| P6 | **NavigationMenu** | `orientation="vertical"` | 触发条横排＋下拉 | 场景弱（侧边导航是另一个控件的活），倾向「不接」 |
| P7 | **Menu** | `orientation` | 只影响 roving focus 方向键轴 | 菜单横排本身怪异，裁「不接」 |
| P8 | **Slider** | **双拇指区间** `value={[a,b]}`＋`minStepsBetweenValues`＋`thumbCollisionBehavior` | 库会渲染两只 thumb、indicator 内联定位在两者之间；我们的皮**大概率能扛**（indicator 全内联定位）但 0 验证 0 demo——hanabi 的不对称圆角、nocturne 的花 thumb 成对时观感未知 | 半成品状态最危险：要么验一轮＋加 demo 转 ✅，要么契约写明单拇指定位。验＋demo 估 30k |
| P9 | **Tooltip** | `trackCursorAxis` | 跟随光标模式下 connector 三角的锚定假设可能破 | 场景弱；裁「不接」或验一轮 |

## 三、被墙的能力（⛔ NO-REST 包装：Dialog／AlertDialog／Drawer）

三个模态包装**不展开 `...rest`**，以下 Base UI 能力整体不可达。是「接口故意收窄」还是「顺手墙死」，逐条裁：

| # | 组件 | 被墙的能力 | 评注 |
|---|---|---|---|
| W1 | Dialog / AlertDialog / Drawer | `modal: boolean \| 'trap-focus'`（非模态/仅陷焦模式） | 我们钉死全模态。收窄合理，建议裁「故意，写进契约一句」 |
| W2 | 同上 | `disablePointerDismissal`（点外不关） | 场景真实（表单弹窗防误触关闭）。建议「接」：三个包装各透传或开一个 prop，估 10k |
| W3 | 同上 | `onOpenChangeComplete`（动画完成回调） | 行为钩子，透传零成本。建议顺手放行 |
| W4 | 同上 | `handle` / payload 家族（外部触发器、载荷渲染） | 高级用法，demo 库定位用不上。裁「不接」合理 |
| W5 | **Drawer** | **`snapPoints` 家族**（半开抽屉、吸附点、`onSnapPointChange`） | Drawer 的招牌能力被整体墙死。接=手机半开抽屉，很出效果但涉及每套皮的高度语义，估 60k；不接=契约写明「全开/关两态」 |
| W6 | Drawer | `swipeDirection`（我们由 `side` 内部推导） | 现状合理，裁「故意」即可 |

## 四、行为透传即用（🟡 能用、但零 demo 零规格——用户用了才发现没样例）

- **表单三件套**：`readOnly` / `required` / `form`（Checkbox、Switch、Radio、RadioGroup、NumberField、OtpField、Select、Slider）。行为正确；`readOnly` 无禁用灰,视觉与常态同——要不要给 readOnly 一档皮，可裁（七套 0 处理）。
- **数值格式化**：`format` / `locale`（Slider、NumberField、Progress、Meter）——**能用**，四处都在用 Base 的 `.Value` 零件，格式化会流到渲染 ✅（本审计的意外好消息）。
- **Accordion**：`hiddenUntilFound`（浏览器页内搜索自动展开）、`keepMounted`、`loopFocus`。
- **NumberField**：`allowWheelScrub`、`smallStep`／`largeStep`、`snapOnStep`、`allowOutOfRange`。
- **OtpField**：`autoSubmit`、`validationType`、`inputMode`、`normalizeValue`、`onValueComplete`。
- **Combobox / Autocomplete**：`autoHighlight`、`openOnInputClick`、`keepHighlight`、`highlightItemOnHover`；Autocomplete 的 `mode: list/both/inline/none`（inline 补全是可感知行为差异，值得一个 demo）。
- **Field / Form**：`validate` 自定义校验、`validationMode`、`validationDebounceTime`（我们只 demo 了受控 error 与 Form errors 路径）。
- **Toast**：管理器 `promise/update` 等能力经 hooks 可用，demo 已覆盖 create/action。
- **ScrollArea**：`data-has-overflow-x`、四端 `overflow-*-start/end` 状态属性——可做「滚动边缘渐隐」增强皮，当前只用了 has-overflow-y 让位。裁「增强候选」。
- **Avatar**：`Fallback.delay`（避免闪兜底）。

## 五、37 组件支持矩阵（速览）

| 组件 | Base 模块 | 状态 |
|---|---|---|
| Accordion | accordion | ✅ 主干 · 🟠 orientation(P5) · 🟡 hiddenUntilFound |
| AlertDialog | alert-dialog | ✅ 主干 · ⛔ W1–W4 |
| Autocomplete | autocomplete | ✅ 主干 · 🟡 mode/autoHighlight |
| Avatar | avatar | ✅ 主干 · 🟡 Fallback.delay |
| Badge | —(纯自制) | ✅ |
| Button | button | ✅（focusableWhenDisabled 🟡） |
| Checkbox | checkbox | ✅ 主干（parent 机制在用）· 🟡 readOnly/uncheckedValue |
| CheckboxGroup | checkbox-group | ✅ |
| Collapsible | collapsible | ✅ |
| Combobox | combobox | ✅ 单选主干 · 🔴 multiple+chips(R2) |
| ContextMenu | context-menu | ✅ 主干 · 🔴 随 R1 |
| Dialog | dialog | ✅ 主干 · ⛔ W1–W4 |
| Drawer | drawer | ✅ 主干 · ⛔ W1–W6（snapPoints） |
| Fieldset | fieldset | ✅ |
| Form | form | ✅ 主干 · 🟡 validationMode |
| Input | input+field | ✅ 主干 · 🟡 validate 族 |
| Menu | menu | ✅ 主干 · 🔴 CheckboxItem/RadioItem(R1) |
| Menubar | menubar | ✅ 主干 · 🟠 orientation(P4) |
| Meter | meter | ✅（format 🟡 可用） |
| NavigationMenu | navigation-menu | ✅ 主干 · 🟠 orientation(P6) · 🟡 delay/closeDelay |
| NumberField | number-field | ✅ 主干 · 🔴 ScrubArea(R4) · 🟡 格式化/滚轮族 |
| OtpField | otp-field | ✅ 主干 · 🟡 autoSubmit 族 |
| Panel | —(纯自制) | ✅ |
| Popover | popover | ✅ 主干 · 🟡 modal/handle 透传在 |
| PreviewCard | preview-card | ✅ |
| Progress | progress | ✅（format 🟡 可用） |
| Radio/RadioGroup | radio(-group) | ✅ · 🟡 readOnly/required |
| ScrollArea | scroll-area | ✅ 主干 · 🟡 边缘状态属性增强 |
| Select | select | ✅ 单选主干 · 🔴 multiple(R3) |
| Separator | separator | ✅（orientation 已接） |
| Slider | slider | ✅（本周 +orientation/+thumbAlignment）· 🟠 双拇指(P8) · 🟡 format 可用 |
| Switch | switch | ✅ · 🟡 readOnly/uncheckedValue |
| Tabs | tabs | ✅ 主干 · 🟠 **orientation(P1，最大件)** |
| Toast | toast | ✅（provider 三参已钉） |
| ToggleGroup | toggle-group | ✅ · 🟠 orientation(P2) · 🟡 multiple |
| Toolbar | toolbar | ✅ · 🟠 orientation(P3) |
| Tooltip | tooltip | ✅ · 🟠 trackCursorAxis(P9) · 🟡 disableHoverablePopup |

## 六、裁决建议（按值当排序）

**建议接**（真实使用场景 + 展示库价值）：
1. **P1 Tabs 竖向**（80–100k）——最常见的缺口。
2. **R1 Menu 可勾选项/单选组**（60–80k）——三菜单宿主同吃。
3. **P8 Slider 双拇指验证＋demo**（30k）——皮大概率已扛得住，验完即转 ✅。
4. **W2+W3 模态透传两个小口子**（10k）。

**建议不接、契约写死一句**（收窄即定位）：P4 Menubar 竖向、P5 Accordion 横向、P6 NavMenu 竖向、P7 Menu orientation、P9 Tooltip 跟随光标、W1 全模态、W4 handle 族、W6 swipe 推导。

**真裁决题**（值当与成本都大，等你拍）：R2 Combobox chips 多选（120k+）、W5 Drawer snapPoints 半开抽屉（60k）、R4 NumberField 划擦（40k）、P2/P3 分段条竖向（联动裁）。

**卫生项**（🟡 转 ✅ 的低成本路径）：给 `readOnly` 是否设皮做一次裁定；Autocomplete `mode="inline"`、`format` 格式化各补一个 demo 实例可选。

## 七、为什么 21 道门全体失明（复盘）

kit-api 拍七套互相（**七套一起缺 → 零分歧**）；kit-spec-props 拍代码对规格（**规格没写 → 无从红**）；kit-demo-states 只扫 disabled/error；动态门驱动 demo 已有的东西（**demo 没有 → 永不触发**）。包装层 `extends ComponentProps<Root>` 让类型检查也绿。**没有任何仪器以 Base UI 能力面为基准。**

常驻修法（裁决后另行实施）：`kit-baseui-surface` 门——以 `node_modules` 的 `.d.ts` 为基准抽取 Root props 与零件清单，比对：①本文件的裁决账（接/不接均入账，新出现的 prop（版本升级）→ 报新增待裁）；②NO-REST 包装白名单。让「库有我无」从此有人站岗。

---

## 附录：1.7.0 对 1.5.0 的能力面增量（2026-08-07 重抽）

- **autocomplete**：+`form`（表单关联）、+`inline`——新增待裁，归入 🟡。
- **radio**：state 面新增 `dirty/filled/focused/touched/valid`（数据属性钩子扩容）——🟡 样式增强候选。
- **scroll-area**：+`overflowEdgeThreshold`（边缘判定阈值）——🟡。
- **select**：+`items`（与 Combobox 同型的条目模型，`Select.Value` 可按条目映射渲染）——值得看一眼是否简化我们的 Select 包装，新增待裁。
- Slider `thumbAlignment` 默认仍为 `center`；**拖拽松手不回算 `--position` 的上游 bug 在 1.7.0 原样存在**（绕修保留）。`OTPFieldPreview` 在 1.7.0 定名 `OTPField`（已迁移）。
