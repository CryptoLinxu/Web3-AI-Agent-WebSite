# Origin 主入口技能

**职责**：所有外部调用的统一入口，负责任务类型识别与路由分流。

## 输入/输出

- **输入**：用户自然语言或斜杠命令
- **输出**：任务类型判定 + 路由到对应子技能或 pipeline

## 路由规则

| 任务类型 | 路由目标 |
|----------|----------|
| DISCOVER | explore |
| BOOTSTRAP | init-docs -> update-map |
| DEFINE | pm/prd/req -> check-in |
| DELIVER-FEAT | pipeline(FEAT) |
| DELIVER-PATCH | pipeline(PATCH) |
| DELIVER-REFACTOR | pipeline(REFACTOR) |
| VERIFY/GOVERN | qa/audit/browser-verify/resolve-doc-conflicts |

## 核心规则

| 规则 | 说明 |
|------|------|
| 非交付任务直接路由 | origin 直接路由到对应子技能 |
| 交付任务进 pipeline | DELIVER-* 进入 pipeline 做二级分流 |
| 强制门禁 | DELIVER-* 与准备实施的 DEFINE 必须先 check-in |
| 无 check-in 不进入实施 | 没有 check-in 不得进入 architect/qa/coder |

## 子技能衔接

| 技能 | 职责 |
|------|------|
| explore | 只读探索，不进入交付链 |
| init-docs | 引导性文档初始化 |
| pm/prd/req | 从模糊到清晰的需求定义 |
| pipeline | 为交付型任务选择执行深度 |
| check-in | 实施前对齐问题、边界、方案和完成标准 |
| digest + update-map | 总结与更新技能地图 |
