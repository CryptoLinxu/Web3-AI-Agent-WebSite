"use client"

import Image from "next/image"
import { MessageSquare, Link2, ArrowUpRight, Wrench, Brain } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const features = [
  {
    id: "chat",
    icon: MessageSquare,
    title: "智能对话",
    description: "自然语言理解，流式输出响应，让 Web3 交互如同聊天般自然流畅。",
    image: "/images/feature-chat.jpg",
    highlight: "自然语言",
    color: "cyan",
  },
  {
    id: "onchain",
    icon: Link2,
    title: "链上查询",
    description: "实时获取 ETH/BTC/SOL 价格、钱包余额、Gas 费用等链上数据。",
    image: "/images/feature-onchain.jpg",
    highlight: "实时数据",
    color: "blue",
  },
  {
    id: "transfer",
    icon: ArrowUpRight,
    title: "在线转账",
    description: "通过 SSE 实时流式传输，安全便捷地完成链上资产转移。",
    image: "/images/feature-transfer.jpg",
    highlight: "SSE 流式",
    color: "emerald",
  },
  {
    id: "tools",
    icon: Wrench,
    title: "工具调用",
    description: "AI 自动识别意图并调用相应 Web3 工具，无需手动操作。",
    image: "/images/feature-tools.jpg",
    highlight: "自动执行",
    color: "violet",
  },
  {
    id: "memory",
    icon: Brain,
    title: "会话记忆",
    description: "支持上下文连续性，采用 L2/L3 记忆策略，对话更智能。",
    image: "/images/feature-memory.jpg",
    highlight: "上下文感知",
    color: "amber",
  },
]

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  violet: { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", glow: "shadow-violet-500/20" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", glow: "shadow-amber-500/20" },
}

function FeatureCard({ feature, index, isVisible }: { feature: typeof features[0]; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const colors = colorMap[feature.color]

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
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl border ${colors.border} bg-card/30 backdrop-blur-sm transition-all duration-700 hover:${colors.border.replace('/30', '/60')} hover:bg-card/50 hover:shadow-2xl ${colors.glow} hover-glow card-shine ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-48 overflow-hidden md:h-56">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        
        <div className={`absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border ${colors.border} ${colors.bg} px-3 py-1 backdrop-blur-sm opacity-0 translate-y-[-10px] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
             style={{ transitionDelay: `${index * 150 + 200}ms` }}>
          <feature.icon className={`h-4 w-4 ${colors.text}`} />
          <span className={`text-xs font-medium ${colors.text}`}>{feature.highlight}</span>
        </div>

        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div 
            className={`absolute h-40 w-40 rounded-full ${colors.bg} blur-3xl transition-all duration-700`}
            style={{ 
              left: 'var(--mouse-x, 50%)', 
              top: 'var(--mouse-y, 50%)',
              transform: 'translate(-50%, -50%)'
            }} 
          />
        </div>
      </div>

      <div className="relative p-6">
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${colors.bg} ring-1 ${colors.border} transition-all duration-500 group-hover:scale-115 group-hover:rotate-6`}>
          <feature.icon className={`h-6 w-6 ${colors.text}`} />
        </div>

        <h3 className={`text-xl font-bold text-foreground md:text-2xl transition-all duration-300 group-hover:text-cyan-400`}>
          {feature.title}
        </h3>
        <p className={`mt-2 text-muted-foreground transition-all duration-300 group-hover:text-foreground/80`}>
          {feature.description}
        </p>

        <div className={`absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full ${colors.bg} opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1`}>
          <ArrowUpRight className={`h-5 w-5 ${colors.text}`} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

function MemoryCard({ isVisible }: { isVisible: boolean }) {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null)
  const feature = features[4]
  const colors = colorMap[feature.color]

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-amber-500/30 bg-card/30 backdrop-blur-sm transition-all duration-700 hover:border-amber-500/60 hover:bg-card/50 hover:shadow-2xl shadow-amber-500/20 card-shine ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
         style={{ transitionDelay: '600ms' }}>
      <div className="grid items-center md:grid-cols-2">
        <div className="relative h-64 overflow-hidden md:order-2 md:h-full md:min-h-[300px]">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-card/40 to-card md:bg-gradient-to-r" />
          
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
          </div>
        </div>
        <div className="relative p-8 md:p-12">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 opacity-0 translate-y-[-10px] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
               style={{ transitionDelay: '700ms' }}>
            <Brain className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium text-amber-400">{feature.highlight}</span>
          </div>
          
          <h3 className={`text-2xl font-bold text-foreground md:text-3xl transition-all duration-300 group-hover:text-amber-400`}>
            {feature.title}
          </h3>
          <p className="mt-3 text-muted-foreground transition-all duration-300 group-hover:text-foreground/80">
            {feature.description}
          </p>
          
          <div className="mt-6 flex items-center gap-4">
            {["L1", "L2", "L3"].map((level, i) => (
              <div key={level} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm font-bold text-amber-400 transition-all duration-300 hover:scale-125 hover:bg-amber-500/20 ${
                    hoveredLevel === level ? 'scale-125 bg-amber-500/20' : ''
                  }`}
                  style={{ opacity: 1 - i * 0.15 }}
                  onMouseEnter={() => setHoveredLevel(level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                >
                  {level}
                </div>
                {i < 2 && (
                  <div className={`h-px w-6 bg-gradient-to-r from-amber-500/50 to-amber-500/20 transition-all duration-300 ${
                    hoveredLevel === level ? 'w-8' : ''
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[150px] animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[120px] animate-float-delayed" />
      
      <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-10 w-24 h-24 rounded-full bg-violet-500/5 blur-3xl animate-pulse-delayed" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className={`inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 opacity-0 translate-y-[-10px] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            核心能力
          </span>
          <h2 className={`mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl opacity-0 translate-y-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
            五大核心功能
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-lg text-muted-foreground opacity-0 translate-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
            打造极致的 Web3 AI 体验，让区块链交互更简单、更智能。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FeatureCard feature={features[0]} index={0} isVisible={isVisible} />
          </div>
          <div>
            <FeatureCard feature={features[1]} index={1} isVisible={isVisible} />
          </div>
          
          <div>
            <FeatureCard feature={features[2]} index={2} isVisible={isVisible} />
          </div>
          <div className="lg:col-span-2">
            <FeatureCard feature={features[3]} index={3} isVisible={isVisible} />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <MemoryCard isVisible={isVisible} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes pulse-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-delayed {
          animation: pulse-delayed 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .card-shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -150%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255,255,255,0.05) 50%,
            transparent 70%
          );
          transform: rotate(45deg);
          animation: shine 3s ease-in-out infinite;
        }
        
        @keyframes shine {
          0% { left: -150%; }
          50%, 100% { left: 100%; }
        }
      `}</style>
    </section>
  )
}
