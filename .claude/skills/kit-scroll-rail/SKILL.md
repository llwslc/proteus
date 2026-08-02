---
name: kit-scroll-rail
description: 底轨覆盖门——横向滚动容器里意在铺满的装饰（底轨、外框线），滚到任一端后仍须盖住可视区。改 Tabs／Menubar／Toolbar 的滚动结构或底轨承载层后跑。
---

# kit-scroll-rail

`components.md` 的滚动容器规则给了两条路：固定不动的线挂容器自身的盒子；需要被选中指示压住换色的线走双盒——滚动容器内放 `width: max-content; min-width: 100%` 的内层盒，线挂内层盒的 `border`。

双盒只在内层盒**真的取到内容宽**时成立。内层若是 flex 子项，默认 `flex-shrink: 1` 会把它压回容器宽，`max-content` 形同虚设：线只画到可视宽，滚到端点就露出没线的一截。CSS 静态检查看不出这一点（要知道它有没有 flex 父级、渲染后多宽），所以判定放在渲染层。

## Run

```
node .claude/skills/kit-scroll-rail/check.cjs [port] [kit]
```

在手机宽度打开 `#tabs`／`#menubar`／`#toolbar`，找出其中真正溢出的横向滚动容器，把它推到端点，再量容器内每条铺满型装饰（`border-bottom` 且宽度不小于容器一半）是否仍覆盖可视区。露白超过 1px 即 FAIL。

修法：线挂在内层盒时给内层补 `flex: none`，让 `max-content` 真正生效。
