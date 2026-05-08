"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { User, Server, Bot, Wrench, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

const layers = [
  {
    id: "user",
    title: "用户层",
    subtitle: "Frontend",
    icon: User,
    image: "/images/layer-user.jpg",
    color: "emerald",
    description: "Next.js 前端应用，支持 RainbowKit 钱包连接、流式聊天界面",
    details: ["React Server Components", "RainbowKit 多链钱包", "流式 UI 渲染", "响应式设计"],
  },
  {
    id: "api",
    title: "API 层",
    subtitle: "Backend",
    icon: Server,
    image: "/images/layer-api.jpg",
    color: "blue",
    description: "Next.js API Routes，处理请求路由、会话管理、工具编排",
    details: ["RESTful API 设计", "会话状态管理", "请求验证与中间件", "错误处理机制"],
  },
  {
    id: "agent",
    title: "Agent 层",
    subtitle: "AI Core",
    icon: Bot,
    image: "/images/layer-agent.jpg",
    color: "cyan",
    description: "AI SDK 核心，负责意图识别、工具调用决策、响应生成",
    details: ["AI SDK streamText", "意图识别引擎", "工具调用决策", "上下文记忆管理"],
  },
  {
    id: "tools",
    title: "工具层",
    subtitle: "Web3 Tools",
    icon: Wrench,
    image: "/images/layer-tools.jpg",
    color: "amber",
    description: "Web3 工具集，包括价格查询、余额查询、Gas 估算、交易执行等",
    details: ["get-crypto-price", "get-wallet-balance", "get-gas-price", "dex-transfer"],
  },
]

const colorConfig: Record<string, { gradient: string; border: string; bg: string; text: string; shadow: string }> = {
  emerald: {
    gradient: "from-emerald-500 to-emerald-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    shadow: "shadow-emerald-500/30",
  },
  blue: {
    gradient: "from-blue-500 to-blue-600",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    shadow: "shadow-blue-500/30",
  },
  cyan: {
    gradient: "from-cyan-500 to-cyan-600",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    shadow: "shadow-cyan-500/30",
  },
  amber: {
    gradient: "from-amber-500 to-amber-600",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    shadow: "shadow-amber-500/30",
  },
}

function LayerCard({ layer, isActive, onClick, index }: { 
  layer: typeof layers[0]
  isActive: boolean
  onClick: () => void
  index: number
}) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const colors = colorConfig[layer.color]

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-500 hover-glow md:p-5",
        isActive
          ? `${colors.border} ${colors.bg} shadow-xl ${colors.shadow}`
          : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
      )}
    >
      {/* 活跃指示器 */}
      {isActive && (
        <div className={`absolute -left-px top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b ${colors.gradient}`} />
      )}

      {/* 序号 */}
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold transition-all duration-300",
          isActive
            ? `bg-gradient-to-br ${colors.gradient} text-white shadow-lg ${colors.shadow}`
            : "bg-secondary text-muted-foreground group-hover:scale-105"
        )}
      >
        {index + 1}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{layer.title}</h3>
          <span className={cn(
            "rounded-md px-2 py-0.5 text-xs transition-colors",
            isActive ? `${colors.bg} ${colors.text}` : "bg-secondary/50 text-muted-foreground"
          )}>
            {layer.subtitle}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{layer.description}</p>
      </div>

      {/* 图标 */}
      <layer.icon className={cn(
        "h-5 w-5 shrink-0 transition-all duration-300",
        isActive ? `${colors.text} scale-110` : "text-muted-foreground group-hover:scale-105"
      )} />
    </button>
  )
}

export function Architecture() {
  const [activeLayer, setActiveLayer] = useState<string>("agent")
  const detailRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const activeData = layers.find((l) => l.id === activeLayer)
  const activeColors = activeData ? colorConfig[activeData.color] : colorConfig.cyan

  // 鼠标跟踪效果
  useEffect(() => {
    const detail = detailRef.current
    if (!detail) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = detail.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      detail.style.setProperty('--mouse-x', `${x}%`)
      detail.style.setProperty('--mouse-y', `${y}%`)
    }

    detail.addEventListener('mousemove', handleMouseMove)
    return () => detail.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 自动轮播
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveLayer((prev) => {
        const currentIndex = layers.findIndex((l) => l.id === prev)
        const nextIndex = (currentIndex + 1) % layers.length
        return layers[nextIndex].id
      })
    }, 4000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return (
    <section id="architecture" className="relative overflow-hidden py-24 md:py-32">
      {/* 斜切背景 */}
      <div className="absolute inset-0 -skew-y-2 transform bg-gradient-to-b from-card/30 via-card/50 to-card/30" />
      
      {/* 背景光效 */}
      <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-500/5 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* 标题 */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            技术架构
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            四层架构设计
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            清晰分离关注点，每层专注自己的职责
          </p>
        </div>

        {/* 主内容 */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* 左侧 - 层级选择器 */}
          <div className="space-y-3">
            {layers.map((layer, index) => (
              <div key={layer.id}>
                <LayerCard
                  layer={layer}
                  isActive={activeLayer === layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  index={index}
                />

                {/* 连接箭头 */}
                {index < layers.length - 1 && (
                  <div className="my-2 flex justify-center">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                      activeLayer === layer.id || activeLayer === layers[index + 1].id
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-muted-foreground/30"
                    )}>
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右侧 - 详情卡片 */}
          {activeData && (
            <div
              ref={detailRef}
              className="sticky top-0 hover-glow"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-500",
                  activeColors.border,
                  activeColors.bg,
                  "shadow-2xl",
                  activeColors.shadow
                )}
              >
                {/* 图片区域 */}
                <div className="relative h-56 overflow-hidden md:h-72">
                  <Image
                    src={activeData.image}
                    alt={activeData.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* 浮动图标 */}
                  {/* <div className="absolute bottom-4 left-4">
                    <div
                      className={cn(
                        "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 hover:scale-110",
                        activeColors.gradient
                      )}
                    >
                      <activeData.icon className="h-7 w-7 text-white" />
                    </div>
                  </div> */}

                  {/* 动态光效 */}
                  <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                </div>

                {/* 内容 */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-foreground">{activeData.title}</h3>
                    <span className={cn("rounded-full px-3 py-1 text-xs", activeColors.bg, activeColors.text)}>
                      {activeData.subtitle}
                    </span>
                  </div>
                  <p className="mt-3 text-muted-foreground">{activeData.description}</p>

                  {/* 详情网格 */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {activeData.details.map((detail, i) => (
                      <div
                        key={detail}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border bg-background/50 px-3 py-2.5 transition-all duration-300 hover:scale-[1.02]",
                          activeColors.border
                        )}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className={cn("h-2 w-2 rounded-full bg-gradient-to-br shrink-0", activeColors.gradient)} />
                        <span className="text-sm text-foreground truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部流程图 */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-border/50 bg-card/50 px-6 py-4 backdrop-blur-sm">
            {layers.map((layer, i) => {
              const colors = colorConfig[layer.color]
              const isActive = activeLayer === layer.id
              return (
                <div key={layer.id} className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveLayer(layer.id)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300",
                      colors.gradient,
                      isActive ? "scale-110 shadow-lg " + colors.shadow : "opacity-60 hover:opacity-100 hover:scale-105"
                    )}
                  >
                    <layer.icon className="h-5 w-5 text-white" />
                  </button>
                  {i < layers.length - 1 && (
                    <div className={cn(
                      "h-px w-8 transition-colors duration-300",
                      activeLayer === layer.id || activeLayer === layers[i + 1].id
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-500/20"
                        : "bg-muted-foreground/20"
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
