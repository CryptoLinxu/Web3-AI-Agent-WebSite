# Gas 价格查询 (getGasPrice)

## 功能

查询 EVM 兼容链的当前 Gas 价格信息, 支持以太坊、Polygon、BSC, 返回基础/优先级/乐观三层价格。

## 接口签名

```typescript
function getGasPrice(chain?: EvmChainId, rpcUrl?: string): Promise<ToolResult<GasData>>
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| chain | EvmChainId | 否 | `'ethereum' \| 'polygon' \| 'bsc'`, 默认 ethereum |
| rpcUrl | string | 否 | 自定义 RPC 节点 URL |

## 返回值

```typescript
interface GasData {
  chain: string;
  gasPrice: string;            // 基础 Gas 价格 (Gwei)
  maxFeePerGas: string;        // 最大费用 (Gwei)
  maxPriorityFeePerGas: string; // 优先级费用 (Gwei)
  unit: "Gwei";
}
```

## 数据源

| 链 | 默认 RPC | 备注 |
|----|----------|------|
| ethereum | eth.llamarpc.com | 支持自定义覆盖 |
| polygon | 公共 Polygon RPC | 支持自定义覆盖 |
| bsc | 公共 BSC RPC | 支持自定义覆盖 |

实现: 通过 `EvmChainAdapter` 调用 `provider.getFeeData()` 获取 Gas 信息。

## 示例调用

```json
// 请求
{ "name": "getGasPrice", "arguments": { "chain": "ethereum" } }

// 成功响应
{ "success": true, "data": { "chain": "ethereum", "gasPrice": "25.5", "maxFeePerGas": "30.2", "maxPriorityFeePerGas": "1.5", "unit": "Gwei" }, "source": "ethereum-rpc", "timestamp": "2025-01-01T00:00:00Z" }
```

## 错误处理

| 错误 | 返回 |
|------|------|
| RPC 连接失败 | "获取 Gas 价格失败" |
| 数据解析失败 | "获取 Gas 价格失败" |
| 不支持的链 | "不支持的链" + 支持列表 |
