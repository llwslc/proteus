# kit-skeleton

骨架层在场性（F5）。`components.md §6.1` 用 `>` 串起来的结构层（`Content > grid > Link` 的 grid、`Popup > list > Item` 的 list、`Root > section > header` 的 section/header…），每套 kit 都必须真渲染出来。

A19 的教训：brass 的 NavigationMenu 整层 `__grid` 不存在（网格属性被塞进 `__content`），`kit-naming`（块类同名）、`kit-structure §5`（Base UI 接线）、`kit-lint`、`kit-visual`、`kit-api` 五个门禁全绿——**中间这层包裹谁都不管**。

判定：骨架里 `> 小写词` 的层，在该组件 `.tsx` 里要么有含该词的类名，要么有同名 JSX 标签（`section`/`header` 这类语义标签层）。方括号里的角色名（title/desc/body/cap）不在此列——它们由共享配方类承载。

```
node .claude/skills/kit-skeleton/check.cjs
```
