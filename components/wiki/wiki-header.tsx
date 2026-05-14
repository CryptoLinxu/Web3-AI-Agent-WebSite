"use client"

import Link from "next/link"
import { BookOpen, Zap } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function WikiHeader() {
  return (
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
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
