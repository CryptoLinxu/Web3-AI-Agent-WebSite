# API 总览

## 认证方式

基于钱包地址的去中心化认证。所有涉及钱包地址的请求需通过 `isValidEthereumAddress` 验证（0x开头42字符十六进制）。

---

## REST API 端点

### POST /api/chat -- SSE 流式聊天

| 字段 | 说明 |
|------|------|
| 请求体 | `{ messages: [{role, content}], walletAddress?: string, chainId?: number }` |
| 响应 | SSE 流，Header: `Accept: text/event-stream` |
| 超时 | 30秒自动中止，支持 AbortController |

**StreamChunk 类型**：

```typescript
interface StreamChunk {
  type: 'content' | 'tool_call' | 'transfer_data' | 'error' | 'done'
  content?: string
  toolCall?: { id: string; type: 'function'; function: { name: string; arguments: string } }
  transferData?: TransferData
  error?: string
}
```

**前端 Hook**：

```typescript
const { isStreaming, content, toolCalls, transferData, sendMessage, abort } = useChatStream()
```

---

### POST /api/tools -- 工具调用

请求格式：`{ "name": "toolName", "arguments": { ... } }`

| 工具名 | 参数 | 返回 |
|--------|------|------|
| `getTokenPrice` | symbol (ETH/BTC/SOL/MATIC/BNB) | price, timestamp, source |
| `getBalance` | chain, address | balance, symbol, chain |
| `getGasPrice` | chain (ethereum/polygon/bsc) | baseFee, maxFee, priorityFee, unit |
| `getTokenInfo` | chain, symbol | name, symbol, contractAddress, decimals |
| `getTokenBalance` | chain, address, tokenSymbol | balance, symbol, decimals |
| `createTransferCard` | to, tokenSymbol, amount, chain | success, transferData |

---

### GET /api/health -- 健康检查

返回：`{ status: "ok", timestamp, version }`

---

### POST /api/supabase/delete-conversation -- 删除对话

| 字段 | 说明 |
|------|------|
| 请求体 | `{ conversationId: UUID, walletAddress: string }` |
| 成功 | `{ success: true }` |
| 机制 | 服务端特权访问 + 外键 CASCADE 级联删除 messages |

---

### POST /api/supabase/verify-ownership -- 所有权验证

| 字段 | 说明 |
|------|------|
| 请求体 | `{ conversationId: UUID, walletAddress: string }` |
| 成功 | `{ isOwner: true/false }` |

---

## 对话库 API (lib/supabase/conversations.ts)

```typescript
getOrCreateConversation(walletAddress: string): Promise<string>
createNewConversation(walletAddress: string, title?: string): Promise<string>
deleteConversation(conversationId: string, walletAddress: string): Promise<void>
updateConversationTitle(conversationId: string, title: string): Promise<void>
loadMessages(conversationId: string): Promise<Message[]>
getConversations(walletAddress: string): Promise<ConversationSummary[]>
```

---

## 错误码

| 状态码 | 场景 |
|--------|------|
| 400 | 参数缺失、钱包地址格式无效、chainId 无效 |
| 403 | 对话所有权验证失败 |
| 404 | 对话不存在 |
| 500 | RPC/数据库调用失败、服务器内部错误 |
| 503 | 环境变量未配置（LLM Provider 不可用） |

---

## 技能系统斜杠命令

| 命令 | 用途 |
|------|------|
| `/origin` | 统一入口，自动识别任务类型并路由 |
| `/pipeline feat/patch/refactor` | 交付管线，选择执行深度 |
| `/check-in` | 实施前门禁对齐 |
| `/architect` | 输出架构说明与契约 |
| `/qa` | 定义验证策略（FEAT=RED，PATCH=VERIFY） |
| `/coder` | 实施编码，最多10轮自愈 |
| `/audit` | 风险审计评分（>=80通过，<60拒绝） |
| `/digest` | 阶段复盘沉淀 |
| `/update-map` | 更新项目状态与地图 |
| `/explore` | 只读探索项目 |
| `/browser-verify` | 浏览器可视化验收 |

**Pipeline 路由规则**：
- FEAT: pm -> prd -> req -> check-in -> architect -> qa -> coder -> audit -> digest -> update-map
- PATCH: req -> check-in -> coder -> qa -> digest -> update-map
- REFACTOR: req -> check-in -> architect -> qa -> coder -> audit -> digest -> update-map
