# Hardhat 本地网络支持

## 功能概述

为开发者提供完整的本地开发环境, 使用标准 Hardhat 网络配置 (chainId: 31337), 支持智能合约调试、钱包连接、转账签名, 无需连接真实区块链。

## 链配置

```typescript
// EVM 链类型 (已扩展 hardhat)
type EvmChainId = 'ethereum' | 'polygon' | 'bsc' | 'hardhat';

// Hardhat 链配置
const hardhatConfig: EvmChainConfig = {
  id: 'hardhat',
  name: 'Hardhat Local',
  nativeToken: 'ETH',
  chainId: 31337,
  rpcUrls: ['http://127.0.0.1:8545'],
  explorerUrl: ''  // 本地无浏览器
};
```

## 集成点

| 模块 | 文件 | 变更 |
|------|------|------|
| 类型定义 | `packages/web3-tools/src/types.ts` | EvmChainId 新增 `'hardhat'` |
| 链配置 | `packages/web3-tools/src/chains/config.ts` | 注册 hardhat 链配置 |
| 转账工具 | `packages/web3-tools/src/transfer.ts` | CHAIN_MAP 新增 hardhat 映射 |
| 前端 wagmi | `apps/web/lib/wagmi-config.ts` | chains 数组新增 hardhat |
| TransferCard | `apps/web/components/TransferCard.tsx` | 支持 hardhat 网络展示 |

## 环境变量

```
NEXT_PUBLIC_HARDHAT_RPC_URL=http://127.0.0.1:8545
```

RPC URL 获取优先级: 环境变量自定义 > 链配置默认值

## 使用前提

1. 启动 Hardhat 节点: `npx hardhat node`
2. MetaMask 添加网络: RPC `http://127.0.0.1:8545`, Chain ID `31337`
3. 导入 Hardhat 测试账户 (10000 ETH)

## 向后兼容

- 不影响现有 ethereum/polygon/bsc 链配置
- 仅在检测到 hardhat 链 ID 时激活相关逻辑
