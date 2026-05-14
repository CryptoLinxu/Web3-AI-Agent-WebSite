# 聊天 API 安全增强

## 安全架构

系统采用分层安全设计：客户端层 -> API 网关层 -> 业务逻辑层 -> 数据存储层，每层有独立的安全控制。

---

## 输入验证规则

| 验证类型 | 规则 | 错误处理 |
|----------|------|----------|
| 钱包地址格式 | 0x 开头的 42 字符十六进制 (`isValidEthereumAddress`) | 400 |
| chainId | 必须为有效链 ID（1=Ethereum, 137=Polygon, 56=BSC） | 400 |
| 对话 ID | 非空 UUID 字符串 | 400 |
| 工具参数 | 各工具独立的必需字段检查 | 400 |
| 网络上下文 | chainId 有效性 + 链名称映射 | 400 |

---

## 安全措施清单

### 身份验证
- 钱包地址格式验证（所有涉及地址的 API）
- 对话所有权验证（删除/修改操作前）
- 双重验证机制：前端验证 + 服务端执行

### 数据安全
- RLS 策略：SELECT/INSERT 应用层过滤，DELETE 仅服务端 API 可执行
- 外键级联删除保证数据一致性
- service_role 密钥仅服务端使用

### 传输安全
- SSE 流式响应安全处理
- 错误信息脱敏（区分配置错误和运行时错误）

---

## 速率限制

通过 Nginx 实现 API 速率限制，防止滥用。

---

## 转账卡片状态管理

状态流转：`pending -> approving(ERC20) / signing(原生币) -> confirmed / failed`

安全特性：
- 五种状态：pending、approving、signing、confirmed、failed
- 数据库同步和事务一致性
- 实时状态更新

---

## 工具调用安全

| 工具 | 安全措施 |
|------|----------|
| getTokenPrice | 参数验证、价格缓存 |
| getBalance | 链 ID 枚举验证 |
| getGasPrice | EVM 链验证 |
| getTokenBalance | 地址格式验证 |
| createTransferCard | 转账数据全量验证 |

---

## 对话删除安全流程

1. 前端调用 `verify-ownership` 确认所有权
2. 服务端 `delete-conversation` 使用 service_role 绕过 RLS
3. 删除条件同时匹配 conversationId + walletAddress
4. 外键 CASCADE 自动删除 messages
