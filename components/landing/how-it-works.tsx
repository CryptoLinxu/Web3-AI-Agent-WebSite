"use client"

import Image from "next/image"
import { Wallet, MessageCircle, Sparkles, ArrowRight, RefreshCw, ExternalLink, Check, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

const steps = [
  {
    step: 1,
    icon: Wallet,
    title: "连接钱包",
    description: "支持 MetaMask、WalletConnect 等主流钱包，一键连接开始使用。",
    color: "cyan",
  },
  {
    step: 2,
    icon: MessageCircle,
    title: "开始对话",
    description: "用自然语言提问，例如「ETH 当前价格是多少？」或「帮我转账 0.001 USDC」。",
    color: "blue",
  },
  {
    step: 3,
    icon: Sparkles,
    title: "获取结果",
    description: "AI 智能识别意图：查询类请求实时返回链上数据，交易类请求下发卡片执行链上操作。",
    color: "violet",
  },
]

const colorMap: Record<string, { gradient: string; border: string; bg: string; text: string }> = {
  cyan: { gradient: "from-cyan-500 to-cyan-600", border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400" },
  blue: { gradient: "from-blue-500 to-blue-600", border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400" },
  violet: { gradient: "from-violet-500 to-violet-600", border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400" },
}

// 转账状态类型
type TransferStatus = "pending" | "signing" | "confirmed"

const transferStates: Record<TransferStatus, { label: string; color: string; dotColor: string }> = {
  pending: { label: "PENDING", color: "text-amber-400 border-amber-400/50 bg-amber-400/10", dotColor: "bg-amber-400" },
  signing: { label: "SIGNING", color: "text-cyan-400 border-cyan-400/50 bg-cyan-400/10", dotColor: "bg-cyan-400" },
  confirmed: { label: "CONFIRMED", color: "text-emerald-400 border-emerald-400/50 bg-emerald-400/10", dotColor: "bg-emerald-400" },
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [showDemo, setShowDemo] = useState<"query" | "transfer">("query")
  const [transferStatus, setTransferStatus] = useState<TransferStatus>("pending")
  const [queryVisible, setQueryVisible] = useState(0)
  const [transferVisible, setTransferVisible] = useState(0)

  // 查询演示动画
  useEffect(() => {
    if (showDemo !== "query") return
    const timer = setInterval(() => {
      setQueryVisible((prev) => {
        if (prev >= 3) {
          setTimeout(() => setQueryVisible(0), 2000)
          return prev
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [showDemo])

  // 转账演示完整流程：入场动画 + 状态循环 + 自动切换
  useEffect(() => {
    if (showDemo !== "transfer") return
    
    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>
    const statusOrder: TransferStatus[] = ["pending", "signing", "confirmed"]
    
    setTransferVisible(0)
    let visibleStep = 0
    const enterTimer = setInterval(() => {
      visibleStep++
      setTransferVisible(visibleStep)
      if (visibleStep >= 3) {
        clearInterval(enterTimer)
        setTransferStatus("pending")
        let statusIndex = 0
        intervalId = setInterval(() => {
          statusIndex = (statusIndex + 1) % 3
          const nextStatus = statusOrder[statusIndex]
          setTransferStatus(nextStatus)
          if (nextStatus === "confirmed") {
            clearInterval(intervalId)
            timeoutId = setTimeout(() => {
              setQueryVisible(0)
              setShowDemo("query")
            }, 3000)
          }
        }, 2500)
      }
    }, 1200)

    return () => {
      clearInterval(enterTimer)
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [showDemo])

  // 查询模式：6秒后切换到转账
  useEffect(() => {
    if (showDemo !== "query") return
    const timer = setTimeout(() => {
      setShowDemo("transfer")
    }, 6000)
    return () => clearTimeout(timer)
  }, [showDemo])

  // 步骤自动切换
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(stepInterval)
  }, [])

  return (
    <section id="how-it-works" className="relative overflow-hidden py-24 md:py-32">
      {/* 背景 */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* 标题 - 不对称布局 */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              使用指南
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              三步开始
              <br />
              <span className="text-muted-foreground">简单高效</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="max-w-md text-lg text-muted-foreground">
              无需复杂配置，连接钱包即可开始与 AI 对话，轻松获取链上数据或执行交易。
            </p>
          </div>
        </div>

        {/* 主内容 */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 左侧 - 步骤卡片 */}
          <div className="relative space-y-6">
            {steps.map((item, index) => {
              const colors = colorMap[item.color]
              const isActive = activeStep === index

              return (
                <div
                  key={item.step}
                  className={`group relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                    isActive
                      ? `${colors.border} ${colors.bg} shadow-xl`
                      : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* 活跃指示器 */}
                  {isActive && (
                    <div className={`absolute -left-px top-1/2 h-12 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b ${colors.gradient}`} />
                  )}

                  <div className="flex items-start gap-4">
                    {/* 图标 */}
                    <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${colors.gradient} shadow-lg`
                        : `${colors.bg} ${colors.border} border`
                    }`}>
                      <item.icon className={`h-6 w-6 ${isActive ? "text-white" : colors.text}`} />
                      {/* 步骤序号 */}
                      <div className={`absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isActive ? "bg-background text-foreground" : `${colors.bg} ${colors.text}`
                      }`}>
                        {item.step}
                      </div>
                    </div>

                    {/* 内容 */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  {/* 连接线 */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-3 left-10 flex items-center">
                      <div className={`h-6 w-px ${isActive ? colors.bg : "bg-border/50"}`} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 右侧 - 交互式演示 */}
          <div className="relative">
            {/* 发光效果 */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 blur-2xl animate-pulse" />

            {/* 演示窗口 */}
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-sm">
              {/* 头部 */}
              <div className="flex items-center justify-between border-b border-border/50 bg-background/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse-glow">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Quantum AI</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      在线
                    </div>
                  </div>
                </div>
                {/* 切换按钮 */}
                <div className="flex rounded-lg border border-border/50 bg-background/50 p-1">
                  <button
                    onClick={() => setShowDemo("query")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                      showDemo === "query"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    链上查询
                  </button>
                  <button
                    onClick={() => setShowDemo("transfer")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                      showDemo === "transfer"
                        ? "bg-violet-500/20 text-violet-400"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    链上转账
                  </button>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="min-h-[450px] p-6">
                {showDemo === "query" ? (
                  /* 查询演示 */
                  <div className="space-y-4">
                    {/* 用户消息 */}
                    {queryVisible >= 1 && (
                      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-3 text-foreground border border-cyan-500/20">
                          ETH 当前价格是多少？
                        </div>
                      </div>
                    )}

                    {/* AI 加载中 */}
                    {queryVisible >= 2 && queryVisible < 3 && (
                      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex gap-1">
                              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                            </div>
                            正在调用 get-crypto-price 工具...
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI 返回结果 */}
                    {queryVisible >= 3 && (
                      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                          <p className="text-foreground">
                            当前 ETH 价格为{" "}
                            <span className="font-semibold text-cyan-400">$3,245.67</span>
                            ，24小时涨幅{" "}
                            <span className="font-semibold text-emerald-400">+2.34%</span>。
                          </p>
                          {/* 实时数据卡片 */}
                          <div className="mt-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                                  <span className="text-sm font-bold text-white">E</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-foreground">Ethereum</div>
                                  <div className="text-xs text-muted-foreground">ETH</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-foreground">$3,245.67</div>
                                <div className="text-xs text-emerald-400">+2.34%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 转账演示 */
                  <div className="space-y-4">
                    {/* 用户消息 */}
                    {transferVisible >= 1 && (
                      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-4 py-3 text-foreground border border-violet-500/20">
                          帮我转账 0.001 USDC 到 5UunZU...Z2uVuM
                        </div>
                      </div>
                    )}

                    {/* AI 加载中 */}
                    {transferVisible >= 2 && transferVisible < 3 && (
                      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex gap-1">
                              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
                              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                            </div>
                            正在构建交易卡片...
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI 返回转账卡片 */}
                    {transferVisible >= 3 && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="w-full max-w-[320px]">
                        {/* 转账卡片 */}
                        <div className="overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-xl transition-all duration-500">
                          {/* 卡片头部 */}
                          <div className="flex items-center justify-between px-5 py-4">
                            <div className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 text-violet-400" />
                              <span className="text-sm font-semibold tracking-wide text-foreground">TRANSFER</span>
                            </div>
                            {/* 状态徽章 */}
                            <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 ${transferStates[transferStatus].color}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${transferStates[transferStatus].dotColor} ${transferStatus === "signing" ? "animate-pulse" : ""}`} />
                              {transferStates[transferStatus].label}
                            </div>
                          </div>

                          {/* 代币信息 */}
                          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-2 ring-cyan-500/30">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                                  <Image src="/images/USD_Coin_icon.png" alt="USDC" width={32} height={32} className="rounded-full" />
                                </div>
                              </div>
                              <div>
                                <div className="text-xl font-bold text-foreground">USDC</div>
                                <div className="text-xs text-muted-foreground tracking-wider">SOLANA</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                0.001
                              </div>
                              <div className="text-xs text-muted-foreground tracking-wider">AMOUNT</div>
                            </div>
                          </div>

                          {/* 地址信息 */}
                          <div className="space-y-3 px-5 py-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground tracking-wider">FROM</span>
                              <span className="text-sm font-mono text-foreground">Hh1cZc......hMduoA</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground tracking-wider">TO</span>
                              <span className="text-sm font-mono text-foreground">5UunZU......Z2uVuM</span>
                            </div>
                            {/* 签名 - 仅确认状态显示 */}
                            {transferStatus === "confirmed" && (
                              <div className="flex items-center justify-between animate-in fade-in slide-in-from-bottom-1 duration-300">
                                <span className="text-xs text-muted-foreground tracking-wider">TxHash</span>
                                <span className="text-sm font-mono text-cyan-400">612d2S......ftXfQa</span>
                              </div>
                            )}
                          </div>

                          {/* 操作按钮 */}
                          <div className="px-5 py-4 border-t border-white/5">
                            {transferStatus === "pending" && (
                              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98]">
                                <ArrowRight className="h-4 w-4" />
                                确认发送
                              </button>
                            )}
                            {transferStatus === "signing" && (
                              <button disabled className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 py-3.5 text-sm font-semibold text-cyan-400 cursor-not-allowed">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                SIGNING...
                              </button>
                            )}
                            {transferStatus === "confirmed" && (
                              <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-500/50 bg-transparent py-3.5 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]">
                                <ExternalLink className="h-4 w-4" />
                                查看交易详情
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                )}
              </div>

              {/* 输入框 */}
              <div className="border-t border-border/50 bg-background/30 p-4">
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-4 py-3 transition-all focus-within:border-cyan-500/30 focus-within:ring-1 focus-within:ring-cyan-500/20">
                  <input
                    type="text"
                    placeholder="输入你的问题..."
                    className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    disabled
                  />
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background transition-all hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 装饰性浮动元素 - AI助手（压盖在聊天框上） */}
            <div className="absolute bottom-24 -right-4 rounded-2xl border border-cyan-500/30 bg-card/80 p-4 backdrop-blur-sm shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">AI 助手</div>
                  <div className="text-xs text-cyan-400">智能响应中...</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-emerald-500/30 bg-card/80 p-4 backdrop-blur-sm shadow-xl animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">钱包已连接</div>
                  <div className="text-xs text-emerald-400">0x1a2b...3c4d</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
