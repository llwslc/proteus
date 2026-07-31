# NOCTURNE 审查报告 · 2026-08-01

范围：`src/kits/nocturne/` 37 控件 + App 演示层。方法为实测优先——静态解析只用于产候选，每条候选都在浏览器里驱动或量测后再定性。发起动机是 Panel 题匾的「寄生间距」事故，故第一轴是该类问题的全库扫查。

## 结论摘要

| 轴 | 覆盖 | HIGH | 说明 |
| --- | --- | --- | --- |
| 寄生间距同类 | 7 套全量 DOM | 0 | 全库仅 Panel 一例，已修；探针经反向注入自证有效 |
| 跨套钉值 | 22 门全量 | 1（已修） | hero `padding-top` 违 app.md 钉值，本次审查发现并修复 |
| 交互状态 | 85 个可交互元素 × rest/hover/focus/disabled/选中 | 0 | 8 条 REVIEW 经七套横比确认为全库惯例 |
| 边界 | 极值·空态·超长·窄视口·动效偏好·对比度 | 0 | 1 条候选经横比确认为全库惯例 |

nocturne 自身未发现需要修复的缺陷。审查过程中修掉 1 处本人引入的回归（hero 钉值），另在兄弟套发现 3 类已验证的真实缺陷（见末节，不在本次修复范围）。

## 一、寄生间距同类扫查

事故原型：`.nocturne-panel__head` 因题匾绝对定位而零高，却挂 `margin-bottom: 12px`，在流中悄悄下推内容；随后又用底衬 12px 去对冲，两个数字互相打补丁。

扫查分两层。静态层解析七套全部 CSS，找四种形态：绝对定位元素带非零 margin、负 margin、零尺寸盒带间距、上下不等的 padding。渲染层在真实页面里量：按标签 UA 默认值（`h1` 0.67em、`p` 1em 等）折算后比对计算值以识别 UA margin 泄漏；找零高/零宽却带间距的元素；找绝对定位且 margin 非 `auto` 的元素。

七套结果：**UA margin 泄漏 0、零盒带间距 0、绝对定位寄生 margin 0。**

排除的假阳性：静态层报的 26 条负 margin 是把 `var(--x)` 里的双横线当成了负号（探针 bug，已修）；`margin: auto` 那批（nova 三处、abyss 两处、brass 一处）是配 `inset: 0` 的绝对居中惯用法；riot 胶带的 `margin-left: -58px` 是定宽件的半宽居中；库注入的 `margin: -1px` 是 Base UI 视觉隐藏输入。

探针有效性自证：向页面注入原 bug 的那条 CSS（`.nocturne-panel__head { margin-bottom: 12px }`），探针命中 39 处并逐一给出面板名与盒尺寸；撤销注入后归零。

## 二、跨套钉值：一处回归（已修）

`app.md` 的「外壳几何，各 kit 同值」钉死 hero `padding 30px 28px`。本轮 hero 改为居中构图时我把它改成了 `48px 28px 40px`，六套 30px、nocturne 48px，`kit-equality` 判 FAIL。

修法遵「先问该套能否在现契约内自洽」：容器 padding 回钉值，居中文案列所需的呼吸量落到 nocturne 自有的 `.nocturne-hero__text`（`padding: 18px 0 10px`）。修后 `kit-equality` 恢复 PASS。

过程教训：本轮 hero 全程用 `quick.sh` 按 diff 挑门，而 `kit-equality` 不在 quick 集内，钉值又只写在 `app.md` 文本里，代码侧无锚——所以改了整整数轮才在全量门下暴露。凡动外壳几何（hero/shell/header/网格），必须跑一次全量或单独跑 `kit-equality`。

## 三、状态审查

对 85 个可交互元素逐个用 CDP `forcePseudoState` 驱动 hover 与 focus-visible，各等 420ms 让过渡走完再取峰值，比对元素自身与 `::before`/`::after` 的 12 项视觉属性。禁用件另查是否响应 hover、是否仍在跑动画；选中件另查是否与自身 hover 同值。

**HIGH 0。**每个非禁用控件都有 hover 与 focus-visible 的可见反馈；禁用件无一响应 hover，无一残留动画。

8 条 REVIEW 是「已选中的分段钮 hover 不再叠加反馈」（ToggleGroup 三枚 + Toolbar 一枚）。七套横比：nova/abyss/brass/prism/riot/hanabi **每套都恰好 8 条同型**，故为全库既定表现——选中填充已强于 hover，符合「committed state 必须压过 hover」的既有规则。不作缺陷。

探针曾出两个假信号，均已修正后重跑：取值不等过渡结束（导致 68 条假 HIGH），以及未识别 Base UI 的 `aria-pressed`/`data-pressed`（导致选中件被当作普通件）。

## 四、边界审查

实际执行的检查：NumberField 极值与越界 1 组、Combobox 空态 1 组、超长文本注入 5 处、320px 窄视口 1 次、Progress/Meter 填充比例 8 条，Slider 端点另以键盘手工驱动。

- **NumberField**：打到上界步进钮转禁用，打到下界同理；输入 `999` 被夹回上界。
- **Slider**：`Home` 到 0 时填充 0%、`End` 到 100 时填充 100%，旋钮在两端各悬出轨道 17px（等于旋钮半宽，居中惯例，左右对称）。
- **Combobox**：过滤到无结果时弹层仍在，且有空态文案。
- **窄视口 320px**：页面无横向溢出。
- **Progress/Meter**：8 条的填充宽度与 `aria-valuenow` 一致（如 28/100 实测 28.0%）。
- **动效偏好**：`prefers-reduced-motion: reduce` 下 0 个动画在跑、0 个元素卡在半透明未入场、`scroll-behavior` 复位为 `auto`。
- **对比度**：采样 58 组不同「类 + 颜色 + 字号」组合，全部达 WCAG AA（正文 4.5、大字 3.0）。

一条候选经横比排除：向 Badge 注入 59 字符长文本会溢出面板。七套 Badge 全部是 `text-overflow: clip` + 无 `max-width`（riot 另为 `white-space: normal`），即全库都把 Badge 当短标签用，非 nocturne 独有。

Progress/Meter 一度报「填充仅 5.7%」，是探针选择器把数值标签（`__value`，DOM 顺序在前）当成了填充条；改选择器后归零。Slider 一度报「未找到 thumb」，因 nocturne 旋钮不带 `role="slider"`，改为手工键盘驱动完成检查。

## 五、门禁基线

全量门复跑：32 项 PASS、0 FAIL（指纹在 hero 修复后按差异面核对为 nocturne 39 面板，已刷基线）。对 nocturne 逐门为（kit-a11y 97 个目标、kit-anim-sync、kit-api、kit-deadcode、kit-demo-states、kit-distinct 51%/36% 远低于阈值、kit-entrance、kit-equality、kit-glyph-center、kit-interact、kit-lint、kit-naming、kit-parity、kit-skeleton、kit-spec-coverage、kit-spec-props、kit-structure、kit-submenu-gap、kit-visual、theme-doc-sync、fingerprint）。唯一 FAIL 即第二节的 hero 钉值，已修。

## 六、兄弟套顺带发现（已验证，不在本次修复范围）

状态探针跨套跑时暴露的问题，均已用真实鼠标/键盘输入 + 自身与四层祖先 + 整棵子树的计算样式比对复核，排除了「焦点环画在别处」的可能：

1. **brass 选中态分段钮无键盘焦点提示**。未选中的分段钮有，选中的在自身、四层祖先与整个子树内都无任何变化——选中填充盖掉了焦点环。键盘用户无法看到焦点落点。
2. **nova ghost 钮无焦点提示**（`#toast` 面板的四枚）。hover 有反馈，focus-visible 无。
3. **折叠触发器 hover 缺失**：nova accordion、abyss accordion（focus 也缺）、hanabi collapsible。

要不要修、什么时候修，待定。

## 七、覆盖声明

已覆盖：静息与四种交互态的渲染差异、禁用与选中的正确性、数值控件极值与越界、空态、超长文本、320px 与 768px 断点、动效偏好、文本对比度、22 门全量、七套横向对照。

未覆盖：读屏软件实机朗读、真实触屏手势、键盘 Tab 序与焦点陷阱的完整遍历（`kit-a11y` 只查可访问名与右键区可达）、动画中间帧（`kit-anim-sync` 只查浮层进出同步）、长时运行的内存与性能、非 Chrome 内核。
