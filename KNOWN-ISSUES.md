# 已知问题（组件工厂）

追踪已定位、待修的组件/规格问题。修掉一条就从这里删。

## 1. 全控件扫描结果（找「demo 装置焊进生产 wrapper」同类问题）

**结论：唯一确犯 ContextMenu 已修**——wrapper 曾把 `<kit>-context__zone` 占位盒焊死在 `ContextMenu.Trigger` 上，现改 `render={trigger}` 透传（同 Popover／PreviewCard），wrapper 只保留右键 + Shift+F10／Menu 键行为；投放区占位盒连皮挪进各 App 层（`App.css`／`App.tsx`，`--<kit>-contextmenu-min-h` 随迁 App 层 `:root`、zone 专属色 token 内联后删除），`components.md` 的 ContextMenu 触发器契约、`app.md` 的 context 行、各 `app/theme/<kit>.md` 面板特例与 theme 目录同步改写。其余 wrapper 未见把 demo 脚手架焊进生产层：

- 锚定弹层（Tooltip / Popover / PreviewCard / Menu / Menubar / NavigationMenu / ContextMenu）：均透传 trigger（`render`）或只上生产触发钮皮（Menubar 触发 chip 五套用 `seg__btn`、nova 用自有 `menubar__trigger`；NavMenu 触发器各套用 `<kit>-navmenu__trigger`、唯 hanabi 复用 `seg__btn`——皆本控件自身外观，不是 demo 装置）。
- 观察项（非缺陷）：Menu 把触发器默认成 `<Button variant="ghost">`——是个「默认 ghost 皮」的主观取向、不是 demo 装置，可接受；若日后要让消费方换触发器皮再议。
- wrapper 均不携带硬编码可见文案；`placeholder`（Autocomplete / Combobox / Select 的 `Search…` / `Select…`）与 `emptyText`（`No matches`）是正常输入件默认值、非 demo 焊入。

## 2. Collapsible 容器框超出 spec 治理、违反「同 Accordion」（brass + hanabi）

契约三处都说要一致：`components.md:143`「Collapsible 折叠配方、缩进与状态**同 Accordion**」+ `:79`「折叠类（Accordion、Collapsible）共用 trigger／marker／title／chevron／panel／content」+ `components/theme/hanabi.md:37`「复用 Accordion 折叠皮」。

代码却给 Collapsible 加了整框卡片、Accordion 没有：hanabi `.hanabi-collapsible` = `border: ink 实线 + shadow-sm`（整框卡片），其 Accordion 走 `dashed tone` 行分隔、无整框；brass `.brass-collapsible` = `border: 1px line + surface-zone 底`（整框卡片），其 Accordion 只有 `border-top/bottom`、无整框盒。共享的「折叠皮」（trigger/marker/chevron/panel）是兑现的，越界的只有**根容器框**。

其余四套都兑现「同 Accordion」：nova／abyss 的 Collapsible 根与各自 Accordion item 画同款框（`nova-surface`／`abyss-frame`、变量同值——Collapsible 恰是一张 Accordion item 卡），bauhaus／riot 两侧皆无框。违约的 brass 与 hanabi 病还不同：brass 皮肤文档无 Collapsible 条目（真治理空白，`kit-spec-coverage` 以 WARN 挂账）；hanabi 皮肤文档 `:37` 后半句自己写着「唯 hover 例外——独立卡片，外层卡片框转 `primary`」——皮肤层与契约「同 Accordion」正面相抵（spec 对 spec 冲突，非无人 governed）。

待你拍：Collapsible 是「独立卡片」还是「同 Accordion」？定卡片 → 契约 `:143` 改明写「Collapsible = 带框卡片」、bauhaus/riot 补框、brass 补条目；定同 Accordion → 改 brass/hanabi 去掉根框、hanabi.md:37 删「独立卡片」从句。

## 3. 本轮全量对账：范围·方法·边界（诚实标注，别当「全查过了」）

查了（覆盖）——轴 A｜spec 跨组件等价声明：把 `components.md` + 6 套 `theme/<kit>.md` 里所有「复用／同 X／共用／皮同」逐条抓出对码，**除 §2 的 Collapsible↔Accordion 外全部兑现**（list 项皮 Select↔Combobox↔Autocomplete↔Menu 共用 `list-item`；分段 chip ToggleGroup↔Menubar↔NavMenu↔Toolbar 共用 `seg__btn`；字段皮 Select↔Input 共用 `field`；浮层面 PreviewCard↔Popover、riot Popover↔Tooltip 共用 `surface`／`pop`／`lift`；Menu/parts 共用——均到位）。轴 B｜根容器框治理：37 组件 × 6 套脚本比对根块画不画框、跨套是否一致，唯一被等价声明约束又违约的是 Collapsible；Button／Badge／Checkbox／Switch／Fieldset／ScrollArea／Toast 的跨套框差异 = 各套自有皮肤、无等价声明约束、非漂移，已排除。

没查（边界，未覆盖，下一趟）——逐属性核每个单控件的每句视觉声明：每处「hover 盖 X」「某 token 名值」「某阶影档」是否与码一字不差，这是比本轮大一个量级的逐条全量核，本轮未做；交互态／动效／响应式的 spec↔码一致亦不在本轮（部分另有动态门覆盖）。

## 4. 逐属性核·第一趟：token 引用轴（全 6 套已跑）

方法：脚本抽出每套 `components/theme/<kit>.md` 每个控件行点名的 token／类／效果，核验它是否真落在该控件自身 CSS／TSX 或它复用的共享 `effects` 配方里；漏的逐条读确认真伪。

- **hanabi `primary-deep` 误当文字色 → 已回写 spec 为 `primary-shade`（已修，a1b8c31）**：spec 5 处（`:9` 列表选中文字、`:24` Slider 数值、`:27` OtpField filled、`:28` Select 选中项、`:51` Toolbar 链接）写「文字 `primary-deep`」，但代码这些文字**一律用 `primary-shade`**（`#bf245b` 深粉；`primary-deep #e82f73` 只做 hover 加深的**实填**、从不做文字）。代码一致且合理（深色文字更可读、`-shade` 本就属阶影／深色家族），判 spec 笔误、改 deep→shade；`:7`／`:19` 的 `primary-deep` 是实填、正确、保留。
- **demo 层内容样式被写进组件皮（非码漂移，记一笔）**：riot Switch「标签走 `.riot-tag`」、hanabi PreviewCard「身份行 `.hanabi-cap`」——两个 class 都在**排版层定义、demo 层施加**（组件本身不渲染 label／身份行、内容由消费方传），组件皮文档把 demo 施加的内容 class 归给了组件。代码正确，属**层分离**小瑕（组件皮 ⊥ demo）；要更严可把这类内容样式的描述挪去 app 层。
- **nova／abyss／brass／bauhaus：本轴无候选**（所点名 token 均落在各自控件代码里）。

本趟边界：只核了「spec 点名的 token 是否被该控件用到」；**仍未核**「有没有用在 spec 说的那个属性／状态上」以及结构／尺寸／效果声明——留下一趟。

## 5. 逐属性核·第二趟：状态轴／动效轴／覆盖轴（全 6 套）

- **状态轴：干净，无漂移**。核「spec 说某态用某 token，码里那个态的规则是否真用它」，3 个候选逐条读后全是误报——riot `stroke-bold` 是宽度 token（3px）挂在 indicator 上、非选中态色；hanabi Menu `danger-wash` 经 `--hanabi-item-color` 间接实现（spec 自己就写明了这条间接）；hanabi Toolbar `primary-shade` 是 rest 字色、hover 是下划线，两者都对。
- **动效轴：基本干净，一处候选**。各套 keyframe 与 spec 双向比对，「spec 未点名」的绝大多数其实**被散文描述过**（abyss「自转的 sigil」「开启一记钥匙转启」、riot「`.riot-jitter` 微抖」、hanabi「白勾描线动画」「不定态＝斜纹段左右巡游」）——命名与否不构成漂移。**唯 nova `panel-scan`**（Panel 上 6s 无限循环的纵向扫光）在 nova 的 Panel 条目里毫无描述（该条只写了「对角两枚 L 形辉光角框」），属「码有动效、spec 未述」候选。
- **覆盖轴（新发现，是 §2 漂移的结构性根因）**：契约层零外观（「由 theme 定」通篇 21 处）、不存在默认皮肤；皮肤规格 §2 只收控件级独创决定，「无条目」=隐含声明「可由全局语法（theme DNA＋皮肤 §1＋共享配方）完全推导」，本身不等于失控。且此收录章程先前无处成文（playbook 只说「从自由稿回写」，未定完整性标准），现已钉进 playbook 步骤 2。但各套覆盖悬殊——hanabi **50 条（37/37 全覆盖）**、riot 39、brass 29、bauhaus 28、nova 26、abyss 25。**当某套确实为某控件做了独特视觉决定、而该控件又恰好没有条目时，这个决定就无人 governed**：§2 的 Collapsible 正是此类（brass 给它整框卡片 + `surface-zone` 底，而 brass 文档里根本没有 Collapsible 条目）。把「码里有独立根框」与「无条目」交叉，同类候选还有 brass Fieldset、riot Fieldset、riot／abyss／bauhaus Badge。另：**abyss 全文没有 Progress 条目**，而其余五套都有。

本趟边界：结构／尺寸／几何声明（间距、尺寸、对齐公式）与 app 层规格尚未核，留下一趟。

## 6. 逐属性核·第三趟：结构／尺寸／几何轴（全 6 套）

- **尺寸字面值轴：干净**。各套皮肤规格里每条带数字的声明（`12px`／`7px`／`80%`／`0.5s` 之类）逐条回码搜，全部命中，无「spec 写了、码里没有」。
- **契约层同值：`kit-equality` 门 PASS**。跨 kit 同值数（z 阶梯、模态／抽屉宽高与视口上限、NavMenu 列宽、壳体几何）、各套侧栏面板清单、弹层滚动前 7 行、菜单 z 层——全绿。

## 7. 全量对账·总结（截至本轮）

已跑完的轴（每条均覆盖全 6 套）：等价声明 · token 引用 · 状态 · 动效 · 覆盖 · 尺寸几何 · 契约同值。

- **已确认并修掉**：hanabi `primary-deep` 当文字色的笔误 → `primary-shade`，5 处（见 §4）。
- **已确认、待拍板**：§2 Collapsible 容器框违反「同 Accordion」（brass + hanabi）。
- **结构性根因**：皮肤规格 §2 只收全局语法推导不出的独创决定，而其收录章程无处成文、各套回写纪律悬殊（hanabi 37/37 全覆盖，abyss 仅 25 条）；独创决定一旦落在没有条目的控件上就无人 governed——§5 的候选（panel-scan、Fieldset/Badge、abyss Progress）已于第四趟全部入册（§8），完整性现由 `kit-spec-coverage` 门盯（§9）。

**仍未覆盖（下一步）**：交互与动效的运行时一致性（部分已由动态门覆盖）。app 层规格与 props 契约两轴已于第四趟补跑，见 §8。

## 8. 第四趟：补跑剩余两轴 + 回填覆盖缺口（已修，1a797e6）

- **props／行为契约轴：`kit-spec-props` 门 clean**（`components.md §6.1` props ↔ 各套 wrapper interface 对齐）。
- **app 层规格轴：全 6 套全命中**（`prompt/app/theme/<kit>.md` 点名的 token／类逐条回码搜，无「spec 写了、码里没有」）。
- **回填 §5 的无条目控件**（照实回写、不改设计，每条先读码再写）：abyss Progress（此前全文无条目——头部标签 + mono 数值、`6px` 轨 + edge 颤动滤镜、`glow-deep` 到 `glow` 渐变 indicator、`creep` 爬行不定态）；abyss／bauhaus／riot 各自的 Badge；brass Fieldset（`line` 描边 + `round-md` + `surface-zone` 整框）；riot Fieldset；nova Panel 补上 `scan` 变体的 `tint-soft` 横带 6s 循环扫过（§5 的动效候选就此入册）。
- **更正一处我自己的误报**：§5 里「riot Fieldset 有独立根框」是脚本假阳性——riot Fieldset 实为 `border: 0` 无框，脚本把 legend 里的 `.riot-tick`（`12px` 方块）当成了根框。它仍补了条目（原本确实无条目），但不属「无条目的独立框」那一类。
- 过程中 `prompt-lint` 抓到我把 Fieldset 插错位置——skin-doc §2 的条目顺序必须依 `components.md §6`，已挪正；六套现全 PASS。

## 9. 覆盖与入场两洞已上门

「怎么检查通过的」的答案：文档侧三道门全是单向——`prompt-lint` 只审写出来的条目读起来对不对（其 §2 顺序检查只排既有条目，零条目=无可排=绿）、`theme-doc-sync` 只验写出来的 token 值、码侧门不读皮肤文档；**完整性（该写没写）从没有门**。现在有了：

- **`kit-spec-coverage`**：组件码带定制视觉信号（自有 `@keyframes`／SVG 滤镜／渐变／裸块实线框）而皮肤文档无该组件条目 → FAIL。fails-on-broken 已证：拿回填前（`380d89f`）docs 跑出 **17 红**——其中 11 处（abyss／nova／brass／riot 的 Separator、abyss／nova 的 Slider 与 Meter、abyss／brass／riot 的 CheckboxGroup）是 §5 人工覆盖轴**漏掉、这门抓到**的，已全部照码回填条目。`pending.json` 挂账降 WARN 现剩 1 项：brass:Collapsible（§2 待拍板）；abyss／nova:ContextMenu 两项已随 §1 投放区拆迁清账。
- **`kit-entrance`**：§入场 点名的 keyframe 必须存在且被消费；跨套 reveal 归一后逐字相同=FAIL（抄袭类）；App.css 必须带 reduced-motion 门。首跑即抓到真 bug：hanabi app spec 点名 `hanabi-pop`，真 keyframe 是 `hanabi-seat`——已改 spec。fails-on-broken 已证（合成 abyss=改名 nova → 同构红；剥 hanabi 守卫 → 红）。
- 两门自动进 `kit-qa check.sh`（glob 发现），`quick.sh` 按 diff 触发（`prompt/` 或 kit CSS → coverage；`App.css` → entrance）。
