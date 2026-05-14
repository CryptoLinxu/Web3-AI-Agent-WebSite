# Markdown渲染功能

## 概述

基于 ReactMarkdown + remark-gfm 的 Markdown 渲染组件，负责将 AI 回复转换为格式化 HTML。支持 GFM 扩展、CSS变量主题适配、Token Logo 智能显示和流式实时渲染。

## 组件接口

```typescript
interface MarkdownRendererProps {
  content: string
  className?: string
}
```

## 渲染特性

| Markdown元素 | 样式特点 | 特殊处理 |
|-------------|---------|---------|
| 段落 | 1.7倍行高，底部边距 | 最后段落无底部边距 |
| 标题(h1-h3) | 加粗，层级差异化边距 | CSS变量颜色 |
| 列表(ul/ol) | 项目符号，外边距控制 | 嵌套间距统一 |
| 代码块 | 等宽字体，背景色，圆角 | 区分内联/块级 |
| 表格 | 边框，圆角 | 水平滚动响应式 |
| 引用 | 左侧边框，斜体 | 主题透明度 |
| 链接 | 主色调下划线 | 悬停动画过渡 |
| 图片 | Next.js Image组件 | Token Logo智能识别 |

## Token Logo智能显示

自动识别 Token 图标（alt含"logo"/"icon"或为空），以 16x16 像素内联显示并垂直对齐。使用 `unoptimized` 策略支持外部 CDN 资源，含图片加载失败降级处理。

## 主题集成

所有样式通过CSS变量动态适配:
- 文本: `text-[rgb(var(--text-primary))]`
- 背景: `bg-[rgb(var(--bg-tertiary))]`
- 边框: `border-[rgb(var(--border-color))]`

## 流式渲染

与 `useChatStream` Hook 配合，SSE 每次推送 content 片段时触发重渲染，实现打字机效果的实时 Markdown 渲染。

## 消息渲染逻辑

- 用户消息: 直接显示原始文本
- AI消息: 通过 MarkdownRenderer 格式化渲染
- 工具调用: 独立的状态可视化展示
