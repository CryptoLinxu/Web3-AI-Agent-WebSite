# ETH/多币种价格查询 (getTokenPrice)

## 功能

统一的多币种价格查询工具, 支持 ETH、BTC、SOL、MATIC、BNB, 采用双数据源故障容错架构。

## 接口签名

```typescript
function getTokenPrice(symbol: string): Promise<ToolResult<TokenPriceData>>

// 向后兼容 (已 @deprecated)
function getETHPrice(): Promise<ToolResult<TokenPriceData>>  // => getTokenPrice('ETH')
function getBTCPrice(): Promise<ToolResult<TokenPriceData>>  // => getTokenPrice('BTC')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| symbol | string | 是 | 币种符号: ETH / BTC / SOL / MATIC / BNB (大小写不敏感) |

## 返回值

```typescript
interface TokenPriceData {
  symbol: string;      // 币种符号
  price: number;       // 当前价格 (USD)
  change24h: number;   // 24h 涨跌百分比
  currency: string;    // 固定 "USD"
}
```

## 数据源与容错

| 优先级 | 数据源 | 交易对格式 | 特点 |
|--------|--------|-----------|------|
| 1 | Binance CN API | ETHUSDT / BTCUSDT / ... | 国内可访问 |
| 2 | Huobi API | ethusdt / btcusdt / ... | 备用, 含 24h 涨跌 |

币种映射表 (SYMBOL_MAP):
- ETH -> ETHUSDT / ethusdt
- BTC -> BTCUSDT / btcusdt
- SOL -> SOLUSDT / solusdt
- MATIC -> MATICUSDT / maticusdt
- BNB -> BNBUSDT / bnbusdt

容错流程: Binance 失败 -> Huobi 失败 -> 返回 "所有数据源均失败"

## 超时与代理

- 超时: `AbortSignal.timeout(10000)` (10 秒)
- 代理: 支持 `HTTPS_PROXY` / `HTTP_PROXY` 环境变量

## 示例调用

```json
// 请求
{ "name": "getTokenPrice", "arguments": { "symbol": "ETH" } }

// 成功响应
{ "success": true, "data": { "symbol": "ETH", "price": 3500.25, "change24h": 2.35, "currency": "USD" }, "source": "Binance CN", "timestamp": "2025-01-01T00:00:00Z" }
```

## 错误处理

| 错误 | 返回 |
|------|------|
| 不支持的币种 | "不支持的币种" + 可用列表 |
| 所有数据源失败 | "无法获取 [币种] 价格, 所有数据源均失败" |
| 数据解析异常 | "数据解析异常, 无法生成价格结果" |
