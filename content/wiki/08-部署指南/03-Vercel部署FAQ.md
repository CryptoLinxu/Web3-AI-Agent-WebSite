# Vercel 部署 FAQ

## 常见问题

| 问题 | 根本原因 | 解决方案 |
|------|----------|----------|
| `Cannot find module 'tailwindcss'` | tailwindcss 在 devDependencies 中，Vercel 生产不安装 | 移动 tailwindcss/postcss/autoprefixer 到 dependencies |
| `ERR_PNPM_OUTDATED_LOCKFILE` | package.json 与 pnpm-lock.yaml 不同步 | 根目录执行 `pnpm install` 更新锁文件 |
| `Module not found: @/components/...` | Tailwind 问题导致的级联错误 | 修复 Tailwind 依赖后自动解决 |
| Vercel UI 设置不生效 | vercel.json 优先级高于 UI 配置 | 使用单一配置源（推荐 vercel.json） |
| `pnpm install && pnpm build` 重复安装 | buildCommand 包含了 install | buildCommand 简化为 `pnpm build` |
| @/components 路径无法解析 | Monorepo Root Directory 配置错误 | Vercel 设置 Root Directory 为 `apps/web` |
| `ERR_REQUIRE_ESM` | jsdom 版本与 Node.js 不兼容 | 测试环境改用 happy-dom；或降级 jsdom |
| 构建缓慢/内存不足 | 依赖树中存在重复和冲突包 | 重构依赖树，清理冗余包 |

---

## 正确的 vercel.json 配置

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "git": { "deploymentEnabled": { "main": true } }
}
```

---

## 关键注意事项

1. **Root Directory** 设为 `apps/web`，同时开启 "Include files outside the root directory"
2. **构建时依赖**必须放在 dependencies（不是 devDependencies）
3. **`.npmrc`** 需配置 `shamefully-hoist=true` 解决 pnpm 严格模式下的依赖问题
4. **pnpm-lock.yaml** 必须提交且与 package.json 同步

---

## 诊断流程

1. 检查构建日志 -> 识别错误类型
2. 依赖问题 -> 检查 dependencies vs devDependencies
3. 配置问题 -> 检查 vercel.json 与 UI 是否冲突
4. 路径问题 -> 检查 Root Directory 和 tsconfig paths
5. ESM 问题 -> 检查 jsdom/vitest 版本兼容性
