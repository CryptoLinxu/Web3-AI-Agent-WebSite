"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Shield, Globe } from "lucide-react"
import { useEffect, useRef } from "react"

// 粒子组件
function Particle({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) {
  return (
    <div
      className="absolute rounded-full bg-cyan-400/60 animate-particle"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

// 轨道节点组件
function OrbitNode({ delay, color }: { delay: number; color: string }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 animate-orbit"
      style={{ animationDelay: `${delay}s`, animationDuration: `${15 + delay * 2}s` }}
    >
      <div className={`h-3 w-3 rounded-full ${color} shadow-lg`} style={{ boxShadow: `0 0 20px ${color === 'bg-cyan-400' ? '#22d3ee' : color === 'bg-blue-400' ? '#60a5fa' : '#a78bfa'}` }} />
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 鼠标跟踪效果
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      container.style.setProperty('--mouse-x', `${x}%`)
      container.style.setProperty('--mouse-y', `${y}%`)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden hover-glow">
      {/* 动态背景 */}
      <div className="absolute inset-0">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cyan-950/20" />
        
        {/* 网格背景 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* 浮动粒子 */}
        {[...Array(20)].map((_, i) => (
          <Particle
            key={i}
            delay={i * 0.3}
            size={Math.random() * 6 + 2}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}

        {/* 中心发光球体 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* 外圈光晕 */}
            <div className="absolute -inset-40 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
            <div className="absolute -inset-20 rounded-full bg-blue-500/10 blur-[60px] animate-pulse" style={{ animationDelay: '-1s' }} />
            
            {/* 轨道 */}
            <div className="absolute -inset-32 border border-cyan-500/20 rounded-full" />
            <div className="absolute -inset-48 border border-cyan-500/10 rounded-full" />
            <div className="absolute -inset-64 border border-cyan-500/5 rounded-full" />

            {/* 轨道节点 */}
            <OrbitNode delay={0} color="bg-cyan-400" />
            <OrbitNode delay={-5} color="bg-blue-400" />
            <OrbitNode delay={-10} color="bg-violet-400" />
          </div>
        </div>
      </div>

      {/* 内容 */}
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-sm animate-border-glow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-sm font-medium text-cyan-300">Web3 AI Agent 已上线</span>
          </div>

          {/* 超大标题 */}
          <h1 className="text-balance text-5xl font-black uppercase leading-[0.9] tracking-tighter text-foreground md:text-7xl lg:text-9xl">
            <span className="block animate-float">智能</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              对话
            </span>
            <span className="block animate-float-delayed">链上即用</span>
          </h1>

          {/* 副标题 */}
          <p className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            基于 AI Agent 构建的 Web3 智能助手，自然语言驱动链上数据查询与交易，
            让区块链交互如同聊天般简单。
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group relative h-14 px-8 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 active:scale-[0.98]" 
              asChild
            >
              <Link href="https://web3-ai-agent-web.vercel.app/">
                立即体验
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group h-14 px-8 text-base font-semibold border-2 border-cyan-500/40 text-cyan-400 rounded-xl bg-transparent transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/15 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="#how-it-works">
                <Play className="mr-2 h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                查看演示
              </Link>
            </Button>
          </div>

          {/* 特性标签 */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Zap, text: "实时响应" },
              { icon: Shield, text: "安全可靠" },
              { icon: Globe, text: "多链支持" },
            ].map((item, i) => (
              <div
                key={item.text}
                className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-2 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <item.icon className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* 统计数据 */}
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-border/50 pt-8 md:gap-16">
            {[
              { value: "10+", label: "区块链支持" },
              { value: "24/7", label: "AI代理运行" },
              { value: "100%", label: "开源开放" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div 
                  className="text-3xl font-bold text-foreground md:text-4xl"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 滚动指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">向下滚动</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </div>
    </section>
  )
}
