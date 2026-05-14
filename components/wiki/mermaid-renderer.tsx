"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function MermaidRenderer() {
  const { theme } = useTheme()
  const renderedRef = useRef(false)

  useEffect(() => {
    // Prevent double rendering in dev mode
    if (renderedRef.current) return
    renderedRef.current = true

    const placeholders = document.querySelectorAll<HTMLElement>(".mermaid-placeholder")
    if (placeholders.length === 0) return

    let cancelled = false

    async function renderAll() {
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === "dark" ? "dark" : "default",
        securityLevel: "loose",
        fontFamily: "Geist, sans-serif",
      })

      for (let i = 0; i < placeholders.length; i++) {
        if (cancelled) return
        const el = placeholders[i]
        const chart = el.getAttribute("data-mermaid")
        if (!chart) continue

        const id = `mermaid-svg-${i}-${Date.now()}`
        try {
          const { svg } = await mermaid.render(id, chart)
          el.innerHTML = svg
          el.classList.add("mermaid-rendered")
          // Style SVG
          const svgEl = el.querySelector("svg")
          if (svgEl) {
            svgEl.style.maxWidth = "100%"
            svgEl.style.height = "auto"
          }
        } catch {
          el.innerHTML = `<div class="p-4"><p class="text-sm text-red-400">图表渲染失败</p><pre class="mt-2 text-xs text-muted-foreground overflow-x-auto">${chart.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></div>`
          el.classList.add("mermaid-error")
        }
      }
    }

    renderAll()
    return () => { cancelled = true }
  }, [theme])

  return null
}
