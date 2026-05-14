import Link from "next/link"
import { BookOpen, ChevronRight, Home, Zap } from "lucide-react"

const wikiCategories = [
  {
    title: "快速开始",
    path: "/wiki/01-快速开始",
    items: [
      { label: "快速上手指南", href: "/wiki/01-快速开始/01-快速上手指南" },
      { label: "钱包登录配置", href: "/wiki/01-快速开始/02-钱包登录配置" },
    ],
  },
  {
    title: "项目概述",
    path: "/wiki/02-项目概述",
    items: [
      { label: "项目介绍", href: "/wiki/02-项目概述/01-项目介绍" },
      { label: "目标受众", href: "/wiki/02-项目概述/02-目标受众" },
      { label: "技术特色", href: "/wiki/02-项目概述/03-技术特色" },
      { label: "整体架构", href: "/wiki/02-项目概述/架构概览/01-整体架构" },
      { label: "Monorepo 结构", href: "/wiki/02-项目概述/架构概览/02-Monorepo结构" },
      { label: "AI 提供商集成", href: "/wiki/02-项目概述/架构概览/03-AI提供商集成" },
    ],
  },
  {
    title: "核心概念",
    path: "/wiki/03-核心概念",
    items: [
      { label: "AI Agent 学习指南", href: "/wiki/03-核心概念/01-AI-Agent学习指南" },
      { label: "技能系统概述", href: "/wiki/03-核心概念/02-技能系统概述" },
      { label: "文档驱动开发", href: "/wiki/03-核心概念/03-文档驱动开发" },
    ],
  },
  {
    title: "技能系统",
    path: "/wiki/04-技能系统",
    items: [
      { label: "技能系统架构", href: "/wiki/04-技能系统/00-技能系统架构" },
      { label: "Origin 入口", href: "/wiki/04-技能系统/核心技能/01-Origin入口" },
      { label: "Pipeline 流水线", href: "/wiki/04-技能系统/核心技能/02-Pipeline流水线" },
      { label: "Check-In 门禁", href: "/wiki/04-技能系统/核心技能/03-Check-In门禁" },
      { label: "Architect 架构", href: "/wiki/04-技能系统/核心技能/04-Architect架构" },
      { label: "QA 质量", href: "/wiki/04-技能系统/核心技能/05-QA质量" },
      { label: "Coder 实现", href: "/wiki/04-技能系统/核心技能/06-Coder实现" },
      { label: "Audit 审计", href: "/wiki/04-技能系统/核心技能/07-Audit审计" },
      { label: "辅助技能 (6篇)", href: "/wiki/04-技能系统/辅助技能/01-Explore探索" },
    ],
  },
  {
    title: "Web3 工具集成",
    path: "/wiki/05-Web3工具集成",
    items: [
      { label: "工具集成概述", href: "/wiki/05-Web3工具集成/00-工具集成概述" },
      { label: "工具抽象层", href: "/wiki/05-Web3工具集成/01-工具抽象层" },
      { label: "钱包余额查询", href: "/wiki/05-Web3工具集成/核心工具实现/01-钱包余额查询" },
      { label: "ETH 价格查询", href: "/wiki/05-Web3工具集成/核心工具实现/02-ETH价格查询" },
      { label: "BTC 价格查询", href: "/wiki/05-Web3工具集成/核心工具实现/03-BTC价格查询" },
      { label: "Gas 价格查询", href: "/wiki/05-Web3工具集成/核心工具实现/04-Gas价格查询" },
    ],
  },
  {
    title: "UI 组件与特性",
    path: "/wiki/06-UI组件与特性",
    items: [
      { label: "SSE 流式聊天", href: "/wiki/06-UI组件与特性/01-SSE流式聊天" },
      { label: "对话持久化", href: "/wiki/06-UI组件与特性/02-对话持久化" },
      { label: "内存管理系统", href: "/wiki/06-UI组件与特性/03-内存管理系统" },
      { label: "主题系统", href: "/wiki/06-UI组件与特性/04-主题系统" },
    ],
  },
  {
    title: "API 参考",
    path: "/wiki/07-API参考",
    items: [
      { label: "API 总览", href: "/wiki/07-API参考/01-API总览" },
      { label: "聊天 API 安全增强", href: "/wiki/07-API参考/02-聊天API安全增强" },
    ],
  },
  {
    title: "部署指南",
    path: "/wiki/08-部署指南",
    items: [
      { label: "部署总览", href: "/wiki/08-部署指南/01-部署总览" },
      { label: "CI/CD 自动化", href: "/wiki/08-部署指南/02-CI-CD自动化" },
      { label: "Vercel 部署 FAQ", href: "/wiki/08-部署指南/03-Vercel部署FAQ" },
    ],
  },
  {
    title: "安全与风控",
    path: "/wiki/09-安全与风控",
    items: [
      { label: "风险控制指南", href: "/wiki/09-安全与风控/01-风险控制指南" },
      { label: "安全增强系统", href: "/wiki/09-安全与风控/02-安全增强系统" },
    ],
  },
  {
    title: "故障排除",
    path: "/wiki/10-故障排除",
    items: [
      { label: "常见问题与解决方案", href: "/wiki/10-故障排除/01-常见问题与解决方案" },
    ],
  },
]

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground">Quantum Nexus</span>
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <Link href="/wiki" className="flex items-center gap-1.5 text-sm font-medium text-cyan-400">
            <BookOpen className="h-4 w-4" />
            文档中心
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-20 py-8 pr-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="mb-6">
                <Link
                  href="/wiki"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  文档首页
                </Link>
              </div>
              {wikiCategories.map((category) => (
                <div key={category.title} className="mb-6">
                  <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {category.title}
                  </h4>
                  <ul className="space-y-0.5">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 py-8">
            <div className="max-w-3xl mx-auto">
              {children}
            </div>
          </main>

          {/* Right Sidebar - On this page */}
          <aside className="hidden xl:block w-48 shrink-0">
            <div className="sticky top-20 py-8">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                本页导航
              </h4>
              <nav className="space-y-1 text-sm">
                <a href="#introduction" className="block text-muted-foreground hover:text-foreground transition-colors py-1">
                  项目简介
                </a>
                <a href="#quick-start" className="block text-muted-foreground hover:text-foreground transition-colors py-1">
                  快速开始
                </a>
                <a href="#categories" className="block text-muted-foreground hover:text-foreground transition-colors py-1">
                  文档分类
                </a>
                <a href="#stats" className="block text-muted-foreground hover:text-foreground transition-colors py-1">
                  文档统计
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
