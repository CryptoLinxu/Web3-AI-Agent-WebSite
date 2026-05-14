# Token 信息查询 (getTokenInfo)

## 功能

查询 EVM 链 Token 元数据, 包括合约地址、精度、Logo 等, 支持通过符号或合约地址查询。

## 接口签名

```typescript
function getTokenInfo(chain: EvmChainId, query: { symbol?: string; contractAddress?: string }): Promise<ToolResult<TokenMetadata>>
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| chain | EvmChainId | 是 | `'ethereum' \| 'polygon' \| 'bsc'` |
| symbol | string | 二选一 | Token 符号 (如 USDT, USDC) |
| contractAddress | string | 二选一 | Token 合约地址 |

## 返回值

```typescript
interface TokenMetadata {
  chain: string;
  symbol: string;
  name: string;
  decimals: number;
  contractAddress: string;
  logoUri?: string;
}
```

## 数据源

内置 Token Registry (TOKEN_REGISTRY), 包含主流 Token:

| Token | 链 | 精度 |
|-------|-----|------|
| USDT | ethereum/polygon/bsc | 6 |
| USDC | ethereum/polygon/bsc | 6 |
| DAI | ethereum/polygon | 18 |
| WETH | ethereum/polygon | 18 |
| UNI | ethereum | 18 |

数据来源标注: "Token Registry" (静态注册表)

## 示例调用

```json
// 请求
{ "name": "getTokenInfo", "arguments": { "chain": "ethereum", "symbol": "USDT" } }

// 成功响应
{ "success": true, "data": { "chain": "ethereum", "symbol": "USDT", "name": "Tether USD", "decimals": 6, "contractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7", "logoUri": "https://..." }, "source": "Token Registry", "timestamp": "2025-01-01T00:00:00Z" }
```

## 错误处理

| 错误 | 返回 |
|------|------|
| 非 EVM 链 | "不支持的链, 仅支持 EVM 链" |
| Token 未找到 | "未找到 Token 信息" |
| 参数缺失 | "需要提供 symbol 或 contractAddress" |

## 扩展

在 `TOKEN_REGISTRY` 中添加新条目即可扩展支持的 Token, 格式:
```typescript
{ chain: 'ethereum', symbol: 'XXX', name: 'Full Name', decimals: 18, contractAddress: '0x...', logoUri: '...' }
```
