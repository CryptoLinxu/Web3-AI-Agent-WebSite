"use client"

import { useEffect, useState } from "react"
import type { TocItem } from "@/lib/markdown"

interface PageTocProps {
  items: TocItem[]
}

export function PageToc({ items }: PageTocProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-20 py-8">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          本页导航
        </h4>
        <nav className="space-y-0.5 border-l border-border/40 pl-3">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block py-1 text-sm transition-colors hover:text-foreground ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "text-cyan-400 font-medium border-l-2 border-cyan-400 -ml-[13px] pl-3"
                  : "text-muted-foreground"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
