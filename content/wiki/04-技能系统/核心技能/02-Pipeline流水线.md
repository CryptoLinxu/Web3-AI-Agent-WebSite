# Pipeline 交付流水线技能

**职责**：仅服务交付型任务（DELIVER-*），在 FEAT/PATCH/REFACTOR 之间选择执行深度，避免默认跑完整长链路。

## 输入/输出

- **输入**：来自 origin 的交付型任务（FEAT/PATCH/REFACTOR）
- **输出**：确定必经技能、可跳过技能与按需插入点，启动对应链路

## 三类任务处理策略

| 类型 | 链路 | 默认规则 | 按需插入 |
|------|------|----------|----------|
| FEAT | pm(按需)->prd->req->check-in->architect->qa->coder->audit->digest->update-map | 必须有 prd+req，QA 先 RED | pm, architect, audit, browser-verify |
| PATCH | req->check-in->coder->qa->digest->update-map | 不走 pm/prd，轻量验证 | architect, audit, browser-verify, prd |
| REFACTOR | req->check-in->architect->qa->coder->audit->digest->update-map | 不走 pm，回归验证优先 | prd, browser-verify |

## 核心规则

| 规则 | 说明 |
|------|------|
| check-in 是硬门槛 | 未完成 check-in 不得进入 architect/qa/coder |
| 小任务优先短链路 | 不为完整而完整 |
| Coder 最多 10 轮自愈 | 超限终止并输出 STUCK 报告 |
| 按需插入 | 仅在必要时插入 architect/audit/browser-verify/prd |

## 技能间协调

```
req(任务卡) -> check-in(边界与标准) -> architect(结构契约,按需)
  -> qa(验证策略) -> coder(实施,10轮自愈) -> audit(质量把关)
  -> digest(经验沉淀) -> update-map(状态维护)
```
