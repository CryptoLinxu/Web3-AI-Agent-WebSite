# BTC 价格查询 (getBTCPrice)

## 功能

BTC 价格查询, 已重构为 `getTokenPrice('BTC')` 的向后兼容包装函数。

## 接口签名

```typescript
// 推荐使用统一接口
function getTokenPrice(symbol: 'BTC'): Promise<ToolResult<TokenPriceData>>

// 向后兼容 (已 @deprecated)
function getBTCPrice(): Promise<ToolResult<TokenPriceData>>
```

## 返回值

```typescript
interface TokenPriceData {
  symbol: "BTC";
  price: number;       // 当前价格 (USD)
  change24h: number;   // 24h 涨跌百分比
  currency: "USD";
}
```

## 数据源

| 优先级 | 数据源 | 交易对 |
|--------|--------|--------|
| 1 | Binance CN API | BTCUSDT |
| 2 | Huobi API | btcusdt |

与 ETH 价格查询共用相同的双数据源容错架构、10s 超时机制和代理支持。

## 示例调用

```json
// 请求
{ "name": "getTokenPrice", "arguments": { "symbol": "BTC" } }

// 成功响应
{ "success": true, "data": { "symbol": "BTC", "price": 67500.00, "change24h": -1.2, "currency": "USD" }, "source": "Binance CN", "timestamp": "2025-01-01T00:00:00Z" }
```

## 错误处理

与 getTokenPrice 统一: 主源失败自动切换备用源, 全部失败返回 "无法获取 BTC 价格, 所有数据源均失败"。

## 说明

本工具已与 ETH 价格查询合并为统一的 `getTokenPrice` 接口, 详细实现见 [02-ETH价格查询](./02-ETH价格查询.md)。
