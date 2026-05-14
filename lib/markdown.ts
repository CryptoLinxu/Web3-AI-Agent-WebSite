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
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="wiki-image" loading="lazy" />')
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="wiki-link" target="_blank" rel="noopener noreferrer">$1</a>')
  // Bold + Italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  // Italic
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>")
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="wiki-inline-code">$1</code>')
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

  // Remove UTF-8 BOM (Byte Order Mark) at file start
  cleaned = cleaned.replace(/^\uFEFF/, "")

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
          html += `<div class="wiki-mermaid" data-mermaid="${escapeHtml(codeContent.trim())}" data-index="${mermaidIndex++}">
            <div class="wiki-mermaid-header">
              <span class="wiki-mermaid-badge">
                <svg class="wiki-mermaid-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                图表
              </span>
              <span class="wiki-mermaid-status">加载中...</span>
            </div>
            <pre class="wiki-mermaid-source mermaid-source">${escapeHtml(codeContent.trim())}</pre>
          </div>`
        } else {
          // Regular code block with language label
          const labelHtml = codeLanguage
            ? `<div class="wiki-code-block-header">
                <span class="wiki-code-block-lang">${escapeHtml(codeLanguage)}</span>
              </div>`
            : ""
          html += `<div class="wiki-code-block">
            ${labelHtml}
            <pre class="wiki-code-block-content"><code>${escapeHtml(codeContent.trim())}</code></pre>
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
      tableHtml = '<div class="wiki-table-wrapper"><table class="wiki-table"><thead><tr>'
      const headers = line.split("|").filter(h => h.trim()).map(h => parseInline(h.trim()))
      headers.forEach(h => {
        tableHtml += `<th>${h}</th>`
      })
      tableHtml += "</tr></thead><tbody>"
      i += 2
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].split("|").filter(c => c.trim()).map(c => parseInline(c.trim()))
        tableHtml += '<tr>'
        cells.forEach(c => {
          tableHtml += `<td>${c}</td>`
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
      html += '<hr class="wiki-hr" />'
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
        1: "wiki-heading wiki-h1",
        2: "wiki-heading wiki-h2",
        3: "wiki-heading wiki-h3",
        4: "wiki-heading wiki-h4",
        5: "wiki-heading wiki-h5",
        6: "wiki-heading wiki-h6",
      }
      const tag = `h${level}`
      html += `<${tag} id="${id}" class="${sizes[level]}">
        ${text}
        <a href="#${id}" class="wiki-heading-anchor" title="复制链接">#</a>
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
      html += `<blockquote class="wiki-blockquote">${parseInline(blockquoteContent.trim().replace(/\n/g, "<br/>"))}</blockquote>`
      inBlockquote = false
      blockquoteContent = ""
      continue
    }

    // Unordered list
    if (/^(\s*)[-*+]\s+(.+)/.test(line)) {
      html += '<ul class="wiki-list-ul">'
      while (i < lines.length && /^(\s*)[-*+]\s+(.+)/.test(lines[i])) {
        const itemMatch = lines[i].match(/^(\s*)[-*+]\s+(.+)/)
        if (itemMatch) {
          html += `<li class="wiki-list-item">${parseInline(itemMatch[2])}</li>`
        }
        i++
      }
      html += "</ul>"
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+(.+)/.test(line)) {
      html += '<ol class="wiki-list-ol">'
      while (i < lines.length && /^\s*\d+\.\s+(.+)/.test(lines[i])) {
        const itemMatch = lines[i].match(/^\s*\d+\.\s+(.+)/)
        if (itemMatch) {
          html += `<li class="wiki-list-item">${parseInline(itemMatch[1])}</li>`
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
    html += `<p class="wiki-paragraph">${parseInline(paragraph)}</p>`
  }

  // Close remaining blockquote
  if (inBlockquote) {
    html += `<blockquote class="wiki-blockquote">${parseInline(blockquoteContent.trim().replace(/\n/g, "<br/>"))}</blockquote>`
  }

  return { html, toc }
}
