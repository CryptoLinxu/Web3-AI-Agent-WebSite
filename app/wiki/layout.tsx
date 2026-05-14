import type { Metadata } from "next"
import { WikiHeader } from "@/components/wiki/wiki-header"
import { WikiSidebar } from "@/components/wiki/wiki-sidebar"
import "@/styles/wiki-content.css"

export const metadata: Metadata = {
  title: "文档中心 - Quantum Nexus",
  description: "Web3 AI Agent 项目文档 — 面向 Web3 前端开发者的 AI Agent 技能体系文档",
}

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wiki-layout min-h-screen bg-background">
      <WikiHeader />
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex gap-10">
          <WikiSidebar />
          {children}
        </div>
      </div>
    </div>
  )
}
