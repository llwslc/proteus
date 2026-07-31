# CLAUDE.md

跨会话工作纪律。规格与工具的实体规则在 prompt/** 与 .claude/skills/**，此处只放它们之上的流程约束。

## 提示词编辑

- 改 prompt/** 提交前，先对改动行做 prompt-lint 的两轴语义读（正面描述结果形态、how-not-why、母语措辞），再跑 `sh .claude/skills/prompt-lint/check.sh`。check.sh 绿只是机械预检，不等于 lint 通过。
- 语义规则不机械化：告发词硬红名单只收近零误伤的词，禁令与补丁注同形，grep 分不开。
- 改共享契约（components.md、app.md、playbook.md）前先问：该套能否在现契约内自洽？能则填槽，不动契约。下放要有多于一套的真需求，且同一笔在每套 theme 文档写下该套的答案。
- 回写规格引用冻结基准（sandbox）与代码字面量；上一轮「过门禁改出来的设计」不是设计决定。

## 验收与提交

- 改动后自动 commit + push，不问。
- 日常按 diff 挑门：`sh .claude/skills/kit-qa/quick.sh`；收官或动 theme 原语才全量。指纹差异逐条核对属于本次改动面后才 `--update`。
- 套件运行中不改 src/**。
- 声明「一致/检查过」前说明覆盖范围；跨套改动逐套渲染验证，不以共享机制推断像素。

## kit 生成

- 组件层一律主会话单线程手写，不开多 agent；sandbox 自由稿可批产。
- demo 文案默认英文，指派才换语言。
