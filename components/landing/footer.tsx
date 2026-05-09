import Link from "next/link"
import { Github, FileText, Map, Zap, Twitter, MessageCircle, X, PlaneIcon } from "lucide-react"

const footerLinks = {
  product: [
    { href: "#features", label: "功能" },
    { href: "#architecture", label: "架构" },
    { href: "#how-it-works", label: "使用指南" },
    { href: "https://web3-ai-agent-web.vercel.app/", label: "开始使用" },
  ],
  resources: [
    { href: "#", label: "文档" },
    { href: "#", label: "API 参考" },
    { href: "#", label: "更新日志" },
    { href: "#", label: "路线图" },
  ],
  community: [
    { href: "https://github.com/CryptoLinxu/Web3-AI-Agent", label: "GitHub", icon: Github },
    { href: "/resume", label: "Resume", icon: FileText },
  ],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">Quantum Nexus</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Web3 AI Agent — 智能对话，链上即查即用。让区块链交互如同聊天般简单。
            </p>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {footerLinks.community.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">产品</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">资源</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Telegram */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">加入社区</h3>
            <p className="mt-4 text-sm text-muted-foreground">扫码加入 Telegram 群组获取最新更新。</p>
            <div className="mt-4 flex flex-col">
              <a href="https://t.me/+Jl9T5QFOrd9jODZl" target="_blank" rel="noopener noreferrer">
                <div className="rounded-xl bg-card shadow-lg transition-transform">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=https://t.me/+Jl9T5QFOrd9jODZl"
                    alt="Telegram 群组"
                    className="py-1"
                  />
                </div>
              </a>
              {/* <a
                href="https://t.me/+Jl9T5QFOrd9jODZl"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                t.me/+Jl9T5QFOrd9jODZl
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Quantum Nexus. MIT License.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              隐私政策
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              服务条款
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
