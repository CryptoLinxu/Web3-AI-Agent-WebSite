"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Mail,
  Globe,
  Zap,
  Shield,
  Brain,
  Code2,
  Rocket,
  Users,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Blocks,
  Bot,
  Wallet,
  LineChart,
  Layers,
  Cpu,
  Database,
  TestTube2,
  Workflow,
  Sparkles,
  Server,
  Smartphone,
} from "lucide-react"
import { useEffect, useRef } from "react"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    const children = el.querySelectorAll("[data-reveal]")
    children.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  return ref
}

function GlowCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty("--mouse-x", `${x}%`)
      card.style.setProperty("--mouse-y", `${y}%`)
    }

    card.addEventListener("mousemove", handleMouseMove)
    return () => card.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      data-reveal
      className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-700 hover:border-cyan-500/30 hover:bg-card/50 hover:shadow-xl hover:shadow-cyan-500/5 hover-glow card-shine opacity-0 translate-y-8 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  )
}

const personalInfo = {
  name: "Devin",
  title: "Web3 AI 应用开发工程师",
  experience: "10年",
  workMode: "Remote",
  education: "武汉大学 · 统招本科 · 2011-2015",
  contacts: [
    { icon: Mail, label: "devinlin9679@gmail.com", href: "mailto:devinlin9679@gmail.com" },
    { icon: MessageCircle, label: "@cryptodevin_0x (Telegram)", href: "https://t.me/cryptodevin_0x" },
  ],
}

const coreCapabilities = [
  {
    icon: Bot,
    title: "AI Agent",
    skills: "Agent Loop (ReAct模式)、Function Calling、Memory策略、SSE流式输出、LLM Factory（OpenAI/Anthropic）",
    depth: "独立设计并实现完整AI Agent系统v0.8.0",
    result: "Token消耗降低≥50%，238 单元测试 + 18 e2e测试100%通过",
    color: "cyan",
  },
  {
    icon: Wallet,
    title: "Web3钱包",
    skills: "多链适配器架构、密钥安全、Swap、MEV防夹、DApp安全交互（EIP-1193）、交易发起/签名/广播",
    depth: "某Top5 交易所 Wallet浏览器扩展核心开发",
    result: "支持20+公链，日均保障数十万笔交易安全签名与广播",
    color: "blue",
  },
  {
    icon: LineChart,
    title: "DEX交易",
    skills: "SqrtPriceX96解析、创建Pool、滑点控制、Tick位图、多跳路由优化、CLMM/DL-AMM模型",
    depth: "深度参与Ambient Finance DEX核心开发",
    result: "滑点精准控制在0.3%以内，多跳路由成本降低18%",
    color: "emerald",
  },
  {
    icon: Layers,
    title: "工程能力",
    skills: "Monorepo架构、CI/CD自动化、Vercel、TDD测试驱动开发、性能优化、RsBuild、Sentry、AI工程配置",
    depth: "搭建完整的工程化体系 + AI自动化工程能力",
    result: "构建速度提升70%，组件复用率40%，依赖缓存命中率95%+",
    color: "violet",
  },
  {
    icon: Cpu,
    title: "AI协作开发",
    skills: "Claude Code + Codex + Cursor全流程协作、SDD模式、OpenSpec双产出、Pipeline分级执行",
    depth: "建立X-Ray AI协作体系（6 Rules + 17 Skills）",
    result: "审计机制保证代码质量，过程生成活文档确保可追溯",
    color: "amber",
  },
  {
    icon: Server,
    title: "全栈开发",
    skills: "React 18+Next.js 14/15前端 + Node.js后端 + Supabase/PostgreSQL/Redis数据层 + Nginx/MQ等中间件",
    depth: "10年全栈经验，主导多个从0到1的完整产品",
    result: "海量数据性能优化，MV3插件服务百万级用户",
    color: "emerald",
  },
]

const techStackCategories = [
  {
    icon: Blocks,
    title: "区块链 / Web3",
    items: ["Solidity", "Hardhat", "Ethers.js", "Wagmi v2", "Viem", "OpenZeppelin", "RainbowKit", "MetaMask", "UniswapV3", "IPFS", "DeFi", "DEX"],
    color: "cyan",
  },
  {
    icon: Brain,
    title: "AI / LLM",
    items: ["Agent Loop (ReAct)", "Function Calling", "Memory管理", "System Prompt工程", "OpenAI API", "Anthropic API", "SSE流式输出", "LLM Factory"],
    color: "blue",
  },
  {
    icon: Code2,
    title: "前端开发",
    items: ["React 18+", "Next.js 14/15", "TypeScript", "Tailwind CSS", "Radix UI", "Zustand", "React Query", "Shadcn/ui", "Chrome Extension MV3"],
    color: "emerald",
  },
  {
    icon: Database,
    title: "后端开发",
    items: ["Node.js", "NestJS", "Express", "GraphQL", "Supabase", "PostgreSQL", "Redis", "MySQL", "WebSocket", "RESTful API"],
    color: "violet",
  },
  {
    icon: Workflow,
    title: "工程能力",
    items: ["Monorepo (pnpm+Turborepo)", "Docker", "GitHub CI/CD", "Jenkins", "Harbor", "Sentry", "Vitest", "Playwright", "Rsbuild"],
    color: "amber",
  },
  {
    icon: Cpu,
    title: "AI 协同开发",
    items: ["Claude Code", "Codex", "Cursor", "Harness", "Superpowers", "SDD", "OpenSpec 双产出", "Pipeline 分级执行", "Rules 体系", "Skills 编排", "Vibe Coding"],
    color: "rose",
  },
]

const workExperience = [
  {
    company: "某 Top5 交易所",
    role: "高级 Web3 前端开发工程师",
    period: "2026.1 – 至今",
    description: "全球 Top 5 加密货币交易所，旗下 Web3 钱包插件服务百万级用户，支持 20+ 公链资产管理与 DApp 交互。",
    highlights: [
      {
        title: "Wallet 浏览器扩展核心开发",
        details: [
          "主导钱包插件六大核心模块：账户与钱包体系、密钥安全（Argon2id + AES-GCM）、多链统一交易入口、DApp 安全交互（EIP-1193 + 弹窗确认）、Swap 兑换、AI 协作开发体系",
          "多链适配器架构：EVM/UTXO/Solana/Cosmos/Aptos/Substrate 统一接入，新链配置化完成",
          "密钥安全：基于 BIP39/BIP44 标准，Argon2id + AES-GCM 行业标准加密，5 步流程保障密钥安全",
        ],
      },
      {
        title: "AI Cards 对话场景金融卡片",
        details: [
          "负责 AI 聊天场景下的 DEX 系列富卡片，完成预览→签名校验→广播→状态轮询全流程",
          "处理 20+ 业务错误场景，将技术错误转换成用户可理解的中文提示，交易成功率提升至 96%",
          "创新 AI 聊天内交易场景，交易转化率提升 35%",
        ],
      },
      {
        title: "AI 协作开发体系建设",
        details: [
          "建立 6 个 Rules + 17 个专业 Skills，推动 SDD 式 AI 开发模式落地",
          "Pipeline 按任务复杂度分级执行（PATCH/FEATURE/REFACTOR），审计机制（100分制）保证代码质量",
        ],
      },
    ],
    result: "支持 20+ 公链资产管理，日均保障数十万笔交易的安全签名与广播",
    color: "cyan",
  },
  {
    company: "Web3 AI Agent",
    role: "个人项目",
    period: "2026.04 – 至今",
    description: "面向 Web3 用户的 AI Agent 系统，通过自然语言交互实现链上数据查询、多链钱包管理、转账操作等场景的自动化处理。",
    highlights: [
      {
        title: "Agent Loop 架构设计与实现",
        details: [
          "基于 ReAct 模式的 Agent Loop，支持「意图识别→工具选择→执行→结果回填→自然语言回复」完整循环",
          "实现 6 个 Web3 工具的 Function Calling 全链路",
          "动态 System Prompt 注入机制，AI 可自动感知用户钱包地址和当前网络上下文",
        ],
      },
      {
        title: "会话 Memory 管理系统",
        details: [
          "Strategy 模式设计，支持 L2 滑动窗口和 L3 摘要压缩两种策略",
          "L3 摘要压缩：Token 消耗降低 ≥ 50%",
        ],
      },
      {
        title: "测试与质量保障",
        details: [
          "31 个测试文件、238 个测试用例、100% 通过率",
          "Playwright E2E 测试：18 个用例覆盖 API、对话、转账、基础功能",
        ],
      },
    ],
    result: "Agent 工具调用准确率经 238 个单元测试验证，Memory 模块策略可无缝切换",
    color: "blue",
  },
  {
    company: "Ambient Finance",
    role: "高级 Web3 前端开发工程师",
    period: "2023 – 2025",
    description: "专注于集中流动性（CLMM）+ 单池架构的下一代 DEX，TVL 稳定在 3–7 亿美元区间，多部署于 Layer2。",
    highlights: [
      {
        title: "DEX 核心功能开发",
        details: [
          "参照 Uniswap V3 和 CLMM + DL-AMM 模型实现 Pool 管理、流动性添加/移除、Position 管理",
          "自主解析 SqrtPriceX96 与 Tick 位图，实现价格曲线实时渲染和价格预估",
        ],
      },
      {
        title: "工具库建设",
        details: [
          "沉淀内部 Web3JS-Libs 工具库，统一钱包连接、事件监听、balanceOf 查询等模块",
          "工具库供团队多个项目复用，开发效率提升 40%",
        ],
      },
    ],
    result: "滑点精准控制在 0.3% 以内，多跳路由自动优化，交易成本平均降低 18%",
    color: "emerald",
  },
  {
    company: "国内某区块链头部企业",
    role: "前端架构师",
    period: "2019 – 2023",
    description: "国内区块链试验区头部企业+技术服务商，主营 DID 数字身份、数字资产托管钱包、供应链金融、区块链 BaaS 平台等企业级应用。",
    highlights: [
      {
        title: "前端技术架构设计",
        details: [
          "多条产品线前端技术选型与架构设计，覆盖 Next.js + TypeScript + Vite + TailwindCSS + Wagmi 全套",
          "深度使用 wagmi + viem + RainbowKit 构建多钱包连接与链上交互模块",
        ],
      },
      {
        title: "核心成果",
        details: [
          "部委级医师数字身份平台：基于 DID 的去中心化身份认证，服务执业医师超 50 万",
          "数字资产托管钱包：3 个月用户量突破 23 万，支持 MPC-TSS 多签",
          "供应链金融平台：服务 1.4 万+ 企业，累计放款超 15 亿人民币",
        ],
      },
    ],
    result: "落地多个企业级 Web3 产品，覆盖数字身份、托管钱包、供应链金融",
    color: "violet",
  },
  {
    company: "海南航空",
    role: "全栈开发工程师（偏前端）",
    period: "2016 – 2019",
    description: "中国四大航空公司之一，连续 14 年获 SKYTRAX 五星航空称号。",
    highlights: [
      {
        title: "核心业务系统开发",
        details: [
          "主导航班运行控制系统 A-CDM、机票分销系统、特种车辆 GIS 调度平台前端开发",
          "基于 Cesium.js + WebGL 实现航空器/特种车辆三维实时轨迹渲染，单画面 1000+ 目标，60fps",
        ],
      },
      {
        title: "工程化与性能优化",
        details: [
          "CI/CD 流水线（Jenkins + Docker + Harbor + K8s），部署时间提升 70%，回滚成功率 100%",
          "复杂 GIS 页面首屏加载时间从 12s 降至 2.8s",
        ],
      },
    ],
    result: "2018 年获海南航空技术创新奖，特种车辆 GIS 调度系统落地 10+ 机场，年节约成本超 800 万元",
    color: "amber",
  },
]

const projects = [
  {
    name: "某Top5交易所 Wallet - 浏览器扩展钱包插件",
    period: "2026.1 - 至今",
    techStack: ["TypeScript", "React 18", "Redux Toolkit", "Chrome Extension MV3", "Service Worker", "pnpm Monorepo", "Rsbuild", "Ethers.js", "多链 SDK"],
    description:
      "头部交易所旗下的 Chrome 浏览器钱包插件，采用 Manifest V3 架构，服务百万级用户，支持 20+ 公链的资产管理与 DApp 交互。",
    modules: [
      {
        title: "Monorepo 架构",
        content:
          "Background（Service Worker，承载状态与链上逻辑）和 Popup/Side Panel UI，通过 webext-redux 同步状态",
      },
      {
        title: "多链适配器架构",
        content:
          "针对 EVM/UTXO/Solana/Cosmos/Aptos/Substrate 进行独立封装，查余额、算 Gas、发交易差异化实现，新增链只需配置化接入",
      },
      {
        title: "密钥安全架构",
        content:
          "Argon2id + AES-GCM 行业标准加密，5 步流程（密码 vault → 收集 → 加密 → 解密 → 禁忌）确保密钥安全",
      },
    ],
    highlights: [
      "支持 20+ 公链资产管理，日均保障数十万笔交易的安全签名与广播",
      "多链适配器架构：新链配置化完成，无需改动核心逻辑",
      "密钥安全：不打日志、不经网页传递、仅内存短暂存在",
      "模块化架构：清晰的组件结构，实现可复用的自定义 Hook",
    ],
    color: "cyan",
  },
  {
    name: "Web3 AI Agent - 智能助手系统",
    period: "2026.04 - 至今",
    techStack: ["TypeScript", "Next.js 14", "React 18", "OpenAI API", "Anthropic API", "SSE", "Vitest", "Playwright", "Supabase", "Turborepo"],
    description:
      "面向 Web3 用户的 AI Agent 系统，通过自然语言交互实现链上数据查询、多链钱包管理、转账操作等场景的自动化处理。",
    modules: [
      {
        title: "五层架构",
        content:
          "用户层（Chat UI）→ API层（/api/chat）→ Agent Core层（Agent Loop + Memory Manager）→ 工具层（6个Web3工具）→ 数据层（LLM + Blockchain RPC）",
      },
      {
        title: "Agent Loop 数据流",
        content:
          "用户输入 → LLMFactory.getProvider() → 第1次调用（决定工具）→ 工具执行 → 结果注入 → 第2次调用（生成回复）→ SSE 流式输出",
      },
      {
        title: "测试体系",
        content:
          "31 个测试文件、238 个单元测试 + 18 个 E2E 测试用例，100% 通过率。Mock 策略：vi.mock() + vi.hoisted() 处理外部 SDK",
      },
    ],
    highlights: [
      "Agent Loop 设计：简化版 ReAct 模式，两次 API 调用完成工具调用闭环",
      "Memory 策略模式：L2 滑动窗口 / L3 摘要压缩策略无缝切换，Token 消耗降低 ≥50%",
      "流式输出工程化：节流 + 重试 + 超时 + 中断，生产级 SSE 实现",
      "多模型工厂：环境变量驱动，零代码切换 Provider",
    ],
    color: "blue",
  },
  {
    name: "Dex - Ambient Finance 去中心化交易平台",
    period: "2023 - 2025",
    techStack: ["Next.js 15", "TypeScript", "Wagmi v2", "Ethers.js v6", "Viem", "RainbowKit", "TanStack Query", "TailwindCSS", "Framer Motion"],
    description:
      "专注于集中流动性（CLMM）+ 单池架构的下一代 DEX，提供免切换池子、免路由、零碎流动性自动聚合等创新机制。",
    modules: [
      {
        title: "DEX 核心模块",
        content:
          "Swap / Liquidity / Pool / Positions 核心页面，支持 Ethereum、Blast 等多链一键切换，使用 App Router + Wagmi v2",
      },
      {
        title: "价格曲线引擎",
        content:
          "自主解析 SqrtPriceX96 与 Tick 位图，前端零依赖后端 oracle，实时渲染价格曲线与深度可视化",
      },
      {
        title: "工具库建设",
        content:
          "内部 Web3JS-Libs 工具库，封装 Wagmi + Ethers.js v6 交互 hooks，实现 DL-AMM 离散流动性管理，供团队多个项目复用",
      },
    ],
    highlights: [
      "滑点精准控制在 0.3% 以内",
      "集中流动性区间选择器 + 预执行收益模拟，减少用户误操作 75%",
      "DL-AMM 多跳路由自动优化，交易成本平均降低 18%",
      "工具库供团队多个项目复用，开发效率提升 40%",
    ],
    color: "emerald",
  },
]

const colorMap: Record<string, { border: string; bg: string; text: string; gradient: string; ring: string }> = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    gradient: "from-cyan-500 to-cyan-600",
    ring: "ring-cyan-500/20",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    gradient: "from-blue-500 to-blue-600",
    ring: "ring-blue-500/20",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    gradient: "from-emerald-500 to-emerald-600",
    ring: "ring-emerald-500/20",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    gradient: "from-violet-500 to-violet-600",
    ring: "ring-violet-500/20",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    gradient: "from-amber-500 to-amber-600",
    ring: "ring-amber-500/20",
  },
  rose: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    gradient: "from-rose-500 to-rose-600",
    ring: "ring-rose-500/20",
  },
}

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div data-reveal className="mb-12 opacity-0 translate-y-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="text-xs font-medium uppercase tracking-widest text-cyan-400">{subtitle}</span>
      </div>
      <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan-500 to-transparent" />
    </div>
  )
}

export function Resume() {
  const scrollRef = useScrollReveal()

  return (
    <div ref={scrollRef} className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[200px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-12 md:py-20">
        {/* Back button */}
        <div data-reveal className="mb-12 opacity-0 translate-y-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>

        {/* Hero / Personal Info */}
        <section className="mb-24">
          <div data-reveal className="opacity-0 translate-y-8">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="text-sm font-medium text-cyan-300">Open to Remote Work</span>
            </div>
          </div>

          <h1
            data-reveal
            className="text-balance text-4xl font-black uppercase leading-[0.95] tracking-tighter text-foreground md:text-6xl lg:text-7xl opacity-0 translate-y-8"
          >
            <span className="block">{personalInfo.name}</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {personalInfo.title}
            </span>
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed opacity-0 translate-y-8"
          >
            10年全栈开发经验，专注于 <strong className="text-foreground">Web3 AI Agent 领域</strong>。独立设计并实现完整的 Web3 AI Agent 系统（v0.8.0），
            覆盖 Agent Loop、Function Calling、Memory 管理、SSE 流式输出等核心能力。曾主导某 Top5 交易所 Wallet 浏览器扩展和 AI 对话金融卡片系统，
            服务百万级用户。具备从 0 到 1 搭建复杂 DApp 的能力。
          </p>

          {/* Info badges */}
          <div data-reveal className="mt-8 flex flex-wrap gap-3 opacity-0 translate-y-8">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-2 backdrop-blur-sm">
              <Briefcase className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-muted-foreground">{personalInfo.experience} 经验</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-2 backdrop-blur-sm">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-muted-foreground">{personalInfo.workMode}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-2 backdrop-blur-sm">
              <GraduationCap className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-muted-foreground">{personalInfo.education}</span>
            </div>
          </div>

          {/* Contact */}
          <div data-reveal className="mt-6 flex flex-wrap gap-3 opacity-0 translate-y-8">
            {personalInfo.contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300 transition-all hover:bg-cyan-500/15 hover:border-cyan-500/50"
              >
                <contact.icon className="h-4 w-4" />
                {contact.label}
              </a>
            ))}
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="mb-24">
          <SectionHeader title="核心能力矩阵" subtitle="Capabilities" icon={Zap} />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreCapabilities.map((cap, i) => {
              const colors = colorMap[cap.color]
              return (
                <GlowCard
                  key={cap.title}
                  delay={i * 100}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.border} transition-all duration-500 group-hover:scale-110`}
                      >
                        <cap.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{cap.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{cap.skills}</p>
                    <div className={`rounded-lg ${colors.bg} border ${colors.border} p-3 mb-3`}>
                      <p className={`text-xs font-medium ${colors.text}`}>{cap.depth}</p>
                    </div>
                    <p className="text-sm text-foreground/80">{cap.result}</p>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-24">
          <SectionHeader title="技术栈全景" subtitle="Tech Stack" icon={Code2} />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techStackCategories.map((cat, i) => {
              const colors = colorMap[cat.color]
              return (
                <GlowCard key={cat.title} delay={i * 100}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.border}`}
                      >
                        <cat.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="font-semibold text-foreground">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className={`rounded-md border ${colors.border} ${colors.bg} px-2.5 py-1 text-xs ${colors.text} transition-all hover:scale-105`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-24">
          <SectionHeader title="工作经历" subtitle="Experience" icon={Briefcase} />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-border/40 to-transparent hidden md:block" />

            <div className="space-y-8">
              {workExperience.map((exp, i) => {
                const colors = colorMap[exp.color]
                return (
                  <GlowCard key={exp.company} delay={i * 120} className="md:ml-14">
                    <div className="p-6 md:p-8">
                      {/* Timeline dot */}
                      <div
                        className={`hidden md:flex absolute -left-14 top-8 h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${colors.gradient} shadow-lg ring-4 ring-background z-10`}
                      >
                        <span className="text-xs font-bold text-white">{i + 1}</span>
                      </div>

                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                            <span className={`rounded-md px-2 py-0.5 text-xs ${colors.bg} ${colors.text}`}>
                              {exp.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {exp.period}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-5">
                        {exp.highlights.map((hl) => (
                          <div key={hl.title}>
                            <div className="flex items-center gap-2 mb-2">
                              <ChevronRight className={`h-4 w-4 ${colors.text}`} />
                              <h4 className="font-semibold text-foreground">{hl.title}</h4>
                            </div>
                            <ul className="ml-6 space-y-1.5">
                              {hl.details.map((detail, j) => (
                                <li
                                  key={j}
                                  className="relative pl-3 text-sm text-muted-foreground leading-relaxed before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-border"
                                >
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Result */}
                      <div
                        className={`mt-6 rounded-xl ${colors.bg} border ${colors.border} p-4`}
                      >
                        <div className="flex items-start gap-2">
                          <Rocket className={`h-4 w-4 ${colors.text} mt-0.5 shrink-0`} />
                          <p className={`text-sm ${colors.text} leading-relaxed`}>
                            <strong>关键成果：</strong>
                            {exp.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <SectionHeader title="项目经历" subtitle="Projects" icon={Rocket} />

          <div className="space-y-8">
            {projects.map((project, i) => {
              const colors = colorMap[project.color]
              return (
                <GlowCard key={project.name} delay={i * 120}>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {project.period}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-md border ${colors.border} ${colors.bg} px-2.5 py-1 text-xs ${colors.text} transition-all hover:scale-105`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-4 mb-5">
                      {project.modules.map((mod) => (
                        <div key={mod.title}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <ChevronRight className={`h-4 w-4 ${colors.text}`} />
                            <h4 className="font-semibold text-foreground">{mod.title}</h4>
                          </div>
                          <p className="ml-6 text-sm text-muted-foreground leading-relaxed">
                            {mod.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className={`rounded-xl ${colors.bg} border ${colors.border} p-4`}>
                      <h4 className={`text-xs font-semibold ${colors.text} mb-3 uppercase tracking-wider`}>核心亮点</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((hl, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                            {hl}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </section>

        {/* Key Projects */}
        <section className="mb-24">
          <SectionHeader title="技术亮点速览" subtitle="Highlights" icon={Sparkles} />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Bot,
                title: "AI Agent 技术突破",
                color: "cyan",
                items: [
                  "Agent Loop 设计：基于 ReAct 模式，两次 API 调用完成工具调用闭环",
                  "Memory 策略优化：L2 滑动窗口 + L3 摘要压缩，Token 消耗降低 ≥50%",
                  "流式输出工程化：节流 + 重试 + 超时 + 中断，生产级 SSE 实现",
                  "多模型工厂：环境变量驱动，零代码切换 OpenAI/Anthropic Provider",
                ],
              },
              {
                icon: Shield,
                title: "Web3 安全架构",
                color: "blue",
                items: [
                  "密钥安全：Argon2id + AES-GCM 行业标准加密，5 步流程保障私钥安全",
                  "多链适配：EVM/UTXO/Solana/Cosmos/Aptos/Substrate 统一接入",
                  "DApp 交互：EIP-1193 标准 Provider 注入，EIP-712 签名杜绝重放攻击",
                ],
              },
              {
                icon: LineChart,
                title: "DEX 交易优化",
                color: "emerald",
                items: [
                  "价格曲线渲染：自主解析 SqrtPriceX96 与 Tick 位图，前端零依赖后端 oracle",
                  "滑点控制：基于 Uniswap V3 数学模型，滑点精准控制在 0.3% 以内",
                  "路由优化：DL-AMM 多跳路由自动优化，交易成本降低 18%",
                ],
              },
              {
                icon: TestTube2,
                title: "工程化体系",
                color: "violet",
                items: [
                  "测试驱动：Vitest 单元测试 + Playwright E2E 测试，100% 测试覆盖率",
                  "Monorepo 架构：Turborepo 增量构建，构建速度提升 70%",
                  "CI/CD 自动化：Jenkins + Docker + K8s，部署时间缩短 70%，回滚成功率 100%",
                ],
              },
            ].map((block, i) => {
              const colors = colorMap[block.color]
              return (
                <GlowCard key={block.title} delay={i * 100}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.border} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        <block.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="font-bold text-foreground">{block.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <section data-reveal className="text-center opacity-0 translate-y-8">
          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent p-10 md:p-16">
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              期待与你的合作
            </h3>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              如果你正在寻找一位有 Web3 AI Agent 经验的应用开发工程师，欢迎随时联系。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="group h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <a href="mailto:devinlin9679@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  发送邮件
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-2 border-cyan-500/40 text-cyan-400 rounded-xl bg-transparent hover:border-cyan-500 hover:bg-cyan-500/15 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <a href="https://t.me/cryptodevin_0x" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
