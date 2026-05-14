import Link from "next/link"
import { BookOpen, Zap, ArrowRight, FileText, Rocket, Shield, Wrench, Palette, Code, Cpu, Layers, Terminal } from "lucide-react"

const categories = [
  {
    title: "快速开始",
    desc: "初次接触项目？从这里开始，快速上手并配置钱包登录。",
    icon: Rocket,
    href: "/wiki/01-快速开始/01-快速上手指南",
    count: 2,
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    title: "项目概述",
    desc: "了解项目背景、目标受众、技术特色和整体架构设计。",
    icon: BookOpen,
    href: "/wiki/02-项目概述/01-项目介绍",
    count: 6,
    gradient: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-400",
  },
  {
    title: "核心概念",
    desc: "深入学习 AI Agent 核心知识：学习指南、技能系统与文档驱动开发。",
    icon: Cpu,
    href: "/wiki/03-核心概念/01-AI-Agent学习指南",
    count: 3,
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
  },
  {
    title: "技能系统",
    desc: "12 个核心技能模块：Origin、Pipeline、Architect、QA、Coder 等完整技能链。",
    icon: Layers,
    href: "/wiki/04-技能系统/00-技能系统架构",
    count: 14,
    gradient: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    title: "Web3 工具集成",
    desc: "钱包余额查询、ETH/BTC 价格、Gas 费用、Token 信息等链上工具实现。",
    icon: Zap,
    href: "/wiki/05-Web3工具集成/00-工具集成概述",
    count: 10,
    gradient: "from-orange-500/20 to-yellow-500/10",
    iconColor: "text-orange-400",
  },
  {
    title: "UI 组件与特性",
    desc: "SSE 流式聊天、对话持久化、内存管理、主题系统等前端组件详解。",
    icon: Palette,
    href: "/wiki/06-UI组件与特性/01-SSE流式聊天",
    count: 8,
    gradient: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-400",
  },
  {
    title: "API 参考",
    desc: "完整的 API 接口文档，包括聊天 API 安全增强等核心接口说明。",
    icon: Code,
    href: "/wiki/07-API参考/01-API总览",
    count: 2,
    gradient: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
  },
  {
    title: "部署指南",
    desc: "从本地开发到生产部署的完整指南，包含 CI/CD 和 Vercel 部署方案。",
    icon: Terminal,
    href: "/wiki/08-部署指南/01-部署总览",
    count: 3,
    gradient: "from-slate-500/20 to-gray-500/10",
    iconColor: "text-slate-400",
  },
  {
    title: "安全与风控",
    desc: "风险控制指南与安全增强系统，确保 Agent 在可信范围内运行。",
    icon: Shield,
    href: "/wiki/09-安全与风控/01-风险控制指南",
    count: 2,
    gradient: "from-red-500/20 to-orange-500/10",
    iconColor: "text-red-400",
  },
  {
    title: "故障排除",
    desc: "常见问题与解决方案，快速定位和修复开发过程中的各类问题。",
    icon: Wrench,
    href: "/wiki/10-故障排除/01-常见问题与解决方案",
    count: 1,
    gradient: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
  },
]

const roleBasedGuides = [
  {
    role: "初学者",
    desc: "Web3 前端开发者，想学习 AI Agent 开发",
    steps: ["快速上手指南", "AI Agent 学习指南", "技能系统概述", "文档驱动开发"],
    href: "/wiki/01-快速开始/01-快速上手指南",
  },
  {
    role: "开发者",
    desc: "参与项目开发，需要了解架构和实现",
    steps: ["项目介绍", "整体架构", "技能系统架构", "相关技能文档"],
    href: "/wiki/02-项目概述/01-项目介绍",
  },
  {
    role: "架构师",
    desc: "进行架构设计或重构",
    steps: ["整体架构", "技能系统架构", "Monorepo 结构", "工具抽象层"],
    href: "/wiki/02-项目概述/架构概览/01-整体架构",
  },
  {
    role: "运维人员",
    desc: "部署或维护系统",
    steps: ["部署总览", "CI/CD 自动化", "风险控制指南", "常见问题与解决方案"],
    href: "/wiki/08-部署指南/01-部署总览",
  },
]

export default function WikiPage() {
  return (
    <div>
      {/* Hero Section */}
      <div id="introduction" className="relative mb-16 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 p-8 md:p-12">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-purple-500/10 blur-[60px]" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400">
            <BookOpen className="h-3.5 w-3.5" />
            Web3 AI Agent 文档中心
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Web3 AI Agent 项目文档
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            面向 Web3 前端开发者的 AI Agent 技能体系文档。以"文档驱动开发"为核心，
            构建了一套面向 Web3 场景的多技能自治开发体系，覆盖"对话 + 工具调用 + Agent 循环 + 记忆"的完整 MVP。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/wiki/01-快速开始/01-快速上手指南"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-600 transition-colors"
            >
              快速上手
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/wiki/02-项目概述/01-项目介绍"
              className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              项目介绍
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div id="quick-start" className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2">📖 按角色阅读</h2>
        <p className="text-muted-foreground mb-6">根据你的角色选择最合适的阅读路径</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {roleBasedGuides.map((guide) => (
            <Link
              key={guide.role}
              href={guide.href}
              className="group rounded-xl border border-border/40 bg-card/50 p-5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
            >
              <h3 className="font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                {guide.role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{guide.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {guide.steps.map((step) => (
                  <span
                    key={step}
                    className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {step}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div id="categories" className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2">📚 文档分类</h2>
        <p className="text-muted-foreground mb-6">共 10 大分类，51 篇文档，覆盖从入门到部署的完整知识体系</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br ${cat.gradient} p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/80 ${cat.iconColor}`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {cat.count} 篇
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{cat.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                浏览文档
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">📊 文档统计</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "文档总数", value: "51", icon: FileText },
            { label: "分类数量", value: "10", icon: Layers },
            { label: "版本", value: "v1.0", icon: Zap },
            { label: "最后更新", value: "2026-05-08", icon: Terminal },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/40 bg-card/50 p-5 text-center"
            >
              <stat.icon className="mx-auto h-6 w-6 text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl border border-border/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">准备好开始了吗？</h2>
        <p className="mt-2 text-muted-foreground">
          从快速上手指南开始，10 分钟了解 Web3 AI Agent 的核心概念。
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link
            href="/wiki/01-快速开始/01-快速上手指南"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-600 transition-colors"
          >
            <Rocket className="h-4 w-4" />
            开始阅读
          </Link>
          <Link
            href="https://github.com/CryptoLinxu/Web3-AI-Agent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
          >
            <Code className="h-4 w-4" />
            GitHub 仓库
          </Link>
        </div>
      </div>
    </div>
  )
}
