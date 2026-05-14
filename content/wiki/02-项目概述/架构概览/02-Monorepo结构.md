# Monorepo 结构

## 架构概览

```
AI-Agent/
├── apps/web/              # Next.js Web 应用
│   ├── app/               # App Router（API路由 + 页面）
│   ├── components/        # React 组件
│   ├── hooks/             # 自定义 Hooks
│   └── types/             # TypeScript 类型
├── packages/
│   ├── ai-config/         # AI 配置包（LLM Factory + Providers）
│   └── web3-tools/        # Web3 工具包（价格/余额/Gas）
├── skills/x-ray/          # 技能系统
└── docs/                  # 项目文档
```

## 工具链

| 工具 | 用途 |
|------|------|
| pnpm workspace | 依赖管理 |
| Turborepo | 构建编排与缓存 |
| Next.js 14 | Web 框架 |
| TypeScript 5 | 类型系统 |
| Tailwind CSS | 样式 |

## 包依赖关系

```
apps/web
├── @web3-ai-agent/ai-config  (OpenAI + Anthropic)
└── @web3-ai-agent/web3-tools (ethers.js)
```

## 数据流

```
用户输入 → Chat API → LLM Factory → AI Provider → Tool Calling → Web3 Tools → Ethereum RPC
                                                                                    ↓
用户显示 ← SSE Stream ← Chat API ← AI Provider ← Tool Results ←─────────────────────┘
```

## 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 启动开发
pnpm build          # 构建所有包
pnpm lint           # 代码检查
pnpm type-check     # 类型检查
```

## Turbo 优化

- **构建缓存**：持久化缓存加速重复构建
- **增量构建**：仅重建受影响的包
- **并行执行**：利用多核 CPU
- **依赖共享**：pnpm 避免重复安装
