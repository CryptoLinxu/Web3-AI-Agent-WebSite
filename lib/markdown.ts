/**
 * Markdown to HTML converter with:
 * - Content cleaning (removes redundant metadata sections)
 * - Enhanced code blocks with language labels
 * - Mermaid diagram support (placeholder for client-side rendering)
 * - Heading extraction for TOC navigation
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function parseInline(text: string): string {
  // Images (must be before links)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" loading="lazy" />')
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
  // Bold + Italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  // Italic
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>")
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="bg-secondary/60 text-cyan-300 px-1.5 py-0.5 rounded text-[0.9em] font-mono">$1</code>')
  return text
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface MarkdownResult {
  html: string
  toc: TocItem[]
}

/**
 * Clean markdown content by removing redundant metadata sections.
 */
function cleanMarkdown(content: string): string {
  let cleaned = content

  // Remove <cite>...</cite> blocks (entire block with content)
  cleaned = cleaned.replace(/<cite>[\s\S]*?<\/cite>/g, "")

  // Remove "**本文引用的文件**" paragraph and following list items
  cleaned = cleaned.replace(/\*\*本文引用的文件\*\*\s*\n([-*]\s+\[.*?\]\(.*?\)\s*\n)+/g, "")

  // Remove "**图表来源**" section (the heading and following list items until next heading or blank line)
  cleaned = cleaned.replace(/\*\*图表来源\*\*\s*\n([-*]\s+\[.*?\]\(.*?\)\s*\n)+/g, "")

  // Remove "**章节来源**" section
  cleaned = cleaned.replace(/\*\*章节来源\*\*\s*\n([-*]\s+\[.*?\]\(.*?\)\s*\n)+/g, "")

  // Remove single line "**图表来源**" with trailing content
  cleaned = cleaned.replace(/\*\*图表来源\*\*\n/g, "")
  cleaned = cleaned.replace(/\*\*章节来源\*\*\n/g, "")
  cleaned = cleaned.replace(/\*\*本文引用的文件\*\*\n/g, "")

  // Clean up excessive blank lines
  const newlineRegex = new RegExp("\\n{4,}", "g")
  cleaned = cleaned.replace(newlineRegex, "\n\n\n")

  return cleaned
}

/**
 * Generate a URL-safe ID from heading text.
 */
function headingToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
}

export function markdownToHtml(markdown: string): MarkdownResult {
  const cleaned = cleanMarkdown(markdown)
  const lines = cleaned.split("\n")
  let html = ""
  let i = 0
  let inCodeBlock = false
  let codeContent = ""
  let codeLanguage = ""
  let inTable = false
  let tableHtml = ""
  let inBlockquote = false
  let blockquoteContent = ""
  let mermaidIndex = 0

  // Track headings for TOC
  const toc: TocItem[] = []

  while (i < lines.length) {
    let line = lines[i]

    // Code block - check for mermaid
    if (line.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        if (codeLanguage === "mermaid") {
          // Wrap mermaid in a placeholder div for client-side rendering
          html += `<div class="mermaid-placeholder my-6 p-6 rounded-xl border border-border/40 bg-secondary/20" data-mermaid="${escapeHtml(codeContent.trim())}" data-index="${mermaidIndex++}">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                图表
              </span>
              <span class="text-xs text-muted-foreground">加载中...</span>
            </div>
            <pre class="hidden mermaid-source text-xs text-muted-foreground overflow-x-auto">${escapeHtml(codeContent.trim())}</pre>
          </div>`
        } else {
          // Regular code block with language label
          const labelHtml = codeLanguage
            ? `<div class="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-secondary/40 rounded-t-xl">
                <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">${escapeHtml(codeLanguage)}</span>
              </div>`
            : ""
          html += `<div class="code-block-wrapper my-5 rounded-xl border border-border/40 overflow-hidden bg-[#0d1117]">
            ${labelHtml}
            <pre class="p-4 overflow-x-auto"><code class="text-sm font-mono text-[#c9d1d9] leading-relaxed">${escapeHtml(codeContent.trim())}</code></pre>
          </div>`
        }
        codeContent = ""
        inCodeBlock = false
        codeLanguage = ""
      } else {
        inCodeBlock = true
        codeLanguage = line.trimStart().slice(3).trim()
      }
      i++
      continue
    }

    if (inCodeBlock) {
      codeContent += line + "\n"
      i++
      continue
    }

    // Table detection
    if (!inTable && line.includes("|") && i + 1 < lines.length && lines[i + 1].includes("|---")) {
      inTable = true
      tableHtml = '<div class="my-6 overflow-x-auto rounded-xl border border-border/40"><table class="w-full border-collapse text-sm"><thead><tr class="border-b border-border/40 bg-secondary/30">'
      const headers = line.split("|").filter(h => h.trim()).map(h => parseInline(h.trim()))
      headers.forEach(h => {
        tableHtml += `<th class="text-left py-3 px-4 text-foreground font-semibold">${h}</th>`
      })
      tableHtml += "</tr></thead><tbody>"
      i += 2
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].split("|").filter(c => c.trim()).map(c => parseInline(c.trim()))
        tableHtml += '<tr class="border-b border-border/20 hover:bg-secondary/10 transition-colors">'
        cells.forEach(c => {
          tableHtml += `<td class="py-3 px-4 text-muted-foreground">${c}</td>`
        })
        tableHtml += "</tr>"
        i++
      }
      tableHtml += "</tbody></table></div>"
      html += tableHtml
      inTable = false
      tableHtml = ""
      continue
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      html += '<hr class="my-8 border-border/40" />'
      i++
      continue
    }

    // Heading with id for anchor linking
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const rawText = headingMatch[2]
      const text = parseInline(rawText)
      const id = headingToId(rawText.replace(/<[^>]+>/g, ""))

      // Add to TOC (only h2 and h3)
      if (level >= 2 && level <= 3) {
        toc.push({ id, text: rawText.replace(/<[^>]+>/g, ""), level })
      }

      const sizes: Record<number, string> = {
        1: "text-3xl md:text-4xl font-bold mt-12 mb-6 text-foreground scroll-mt-20",
        2: "text-2xl md:text-3xl font-bold mt-10 mb-4 text-foreground scroll-mt-20",
        3: "text-xl md:text-2xl font-semibold mt-8 mb-3 text-foreground scroll-mt-20",
        4: "text-lg md:text-xl font-semibold mt-6 mb-2 text-foreground scroll-mt-20",
        5: "text-base md:text-lg font-medium mt-4 mb-2 text-foreground scroll-mt-20",
        6: "text-sm md:text-base font-medium mt-4 mb-2 text-foreground scroll-mt-20",
      }
      const tag = `h${level}`
      html += `<${tag} id="${id}" class="${sizes[level]} group">
        ${text}
        <a href="#${id}" class="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-cyan-400 text-base no-underline" title="复制链接">#</a>
      </${tag}>`
      i++
      continue
    }

    // Blockquote
    if (line.trimStart().startsWith(">")) {
      if (!inBlockquote) {
        inBlockquote = true
        blockquoteContent = ""
      }
      blockquoteContent += line.trimStart().slice(1).trim() + "\n"
      i++
      continue
    } else if (inBlockquote) {
      html += `<blockquote class="border-l-4 border-cyan-500/50 pl-4 py-2 my-4 bg-cyan-500/5 rounded-r-lg text-muted-foreground">${parseInline(blockquoteContent.trim().replace(/\n/g, "<br/>"))}</blockquote>`
      inBlockquote = false
      blockquoteContent = ""
      continue
    }

    // Unordered list
    if (/^(\s*)[-*+]\s+(.+)/.test(line)) {
      html += '<ul class="list-disc pl-6 my-3 space-y-1 text-muted-foreground">'
      while (i < lines.length && /^(\s*)[-*+]\s+(.+)/.test(lines[i])) {
        const itemMatch = lines[i].match(/^(\s*)[-*+]\s+(.+)/)
        if (itemMatch) {
          html += `<li class="pl-1">${parseInline(itemMatch[2])}</li>`
        }
        i++
      }
      html += "</ul>"
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+(.+)/.test(line)) {
      html += '<ol class="list-decimal pl-6 my-3 space-y-1 text-muted-foreground">'
      while (i < lines.length && /^\s*\d+\.\s+(.+)/.test(lines[i])) {
        const itemMatch = lines[i].match(/^\s*\d+\.\s+(.+)/)
        if (itemMatch) {
          html += `<li class="pl-1">${parseInline(itemMatch[1])}</li>`
        }
        i++
      }
      html += "</ol>"
      continue
    }

    // Empty line
    if (line.trim() === "") {
      i++
      continue
    }

    // Paragraph
    let paragraph = line
    i++
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].trimStart().startsWith("```") && !/^(#{1,6})\s/.test(lines[i]) && !/^(\s*)[-*+]\s/.test(lines[i]) && !/^\s*\d+\.\s/.test(lines[i]) && !lines[i].trimStart().startsWith(">") && !lines[i].includes("|---") && !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())) {
      paragraph += " " + lines[i]
      i++
    }
    html += `<p class="my-3 text-muted-foreground leading-relaxed">${parseInline(paragraph)}</p>`
  }

  // Close remaining blockquote
  if (inBlockquote) {
    html += `<blockquote class="border-l-4 border-cyan-500/50 pl-4 py-2 my-4 bg-cyan-500/5 rounded-r-lg text-muted-foreground">${parseInline(blockquoteContent.trim().replace(/\n/g, "<br/>"))}</blockquote>`
  }

  return { html, toc }
}
