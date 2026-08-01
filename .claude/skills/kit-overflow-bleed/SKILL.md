---
name: kit-overflow-bleed
description: 滚动容器出血带门——模态与抽屉里凡 overflow 非 visible 的容器，都不得裁掉它承载内容的盒外绘制（焦点环、骑在边界上的旋钮与花记）。改滑块旋钮尺寸、控件焦点环、模态体内衬后跑。
---

# kit-overflow-bleed

一个 `overflow-y: auto` 的容器，CSS 会把另一轴一并提升为 `auto`，于是它在自己的 padding 边上横向裁切。控件的绘制并不都在流内盒里：焦点环画在盒外（`outline-width + outline-offset`），滑块旋钮在两端各悬出半个自身宽度。容器的横向内衬小于这些量，就把它们削掉。

这不是某个控件的毛病——任何能自由摆内容的滚动容器都会碰上，所以判定归容器：**滚动容器的横向出血带 ≥ 它可能承载的最大盒外绘制**。落地写法是 `padding-inline` 加等量负 `margin-inline`，裁切边外扩而内容位置不动。

## Run

```
node .claude/skills/kit-overflow-bleed/check.cjs [port] [kit]
```

打开每套的抽屉与模态，枚举其中所有 overflow 非 visible 的容器，量两类盒外绘制：焦点环（经 CDP 强制 `:focus-visible`，并核对 `outline-style` 真的不是 `none`——程序化 `focus()` 下拿到的宽度是假的，会凭空造出不存在的环）、滑块推到两端时的旋钮包围盒（含倾角撑开的部分，取渲染宽而非标称宽）。任一被裁超过 0.5px 即 FAIL。

出血带取值绑住来源，别写魔数：旋钮悬出取该套旋钮尺寸的一半，旋钮带倾角时渲染盒更宽，取能覆盖它的间距档。
