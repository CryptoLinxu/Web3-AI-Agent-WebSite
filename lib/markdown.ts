/**
 * Lightweight Markdown to HTML converter
 * Handles: headings, bold, italic, links, images, lists, code blocks,
 * inline code, tables, blockquotes, horizontal rules, paragraphs
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
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" />')
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>')
  // Bold + Italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  // Italic
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>")
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="bg-secondary/50 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
  return text
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n")
  let html = ""
  let i = 0
  let inCodeBlock = false
  let codeContent = ""
  let codeLanguage = ""
  let inTable = false
  let tableHtml = ""
  let inBlockquote = false
  let blockquoteContent = ""

  while (i < lines.length) {
    let line = lines[i]

    // Code block
    if (line.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        html += `<pre class="bg-secondary/30 rounded-xl p-4 my-4 overflow-x-auto border border-border/50"><code class="text-sm font-mono text-foreground/90">${escapeHtml(codeContent.trim())}</code></pre>`
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
      tableHtml = '<div class="my-6 overflow-x-auto"><table class="w-full border-collapse text-sm"><thead><tr class="border-b border-border/50">'
      const headers = line.split("|").filter(h => h.trim()).map(h => parseInline(h.trim()))
      headers.forEach(h => {
        tableHtml += `<th class="text-left py-3 px-4 text-muted-foreground font-medium">${h}</th>`
      })
      tableHtml += "</tr></thead><tbody>"
      i += 2 // skip header and separator
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].split("|").filter(c => c.trim()).map(c => parseInline(c.trim()))
        tableHtml += '<tr class="border-b border-border/20 hover:bg-secondary/10 transition-colors">'
        cells.forEach(c => {
          tableHtml += `<td class="py-3 px-4">${c}</td>`
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

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = parseInline(headingMatch[2])
      const sizes: Record<number, string> = {
        1: "text-3xl md:text-4xl font-bold mt-12 mb-6 text-foreground",
        2: "text-2xl md:text-3xl font-bold mt-10 mb-4 text-foreground",
        3: "text-xl md:text-2xl font-semibold mt-8 mb-3 text-foreground",
        4: "text-lg md:text-xl font-semibold mt-6 mb-2 text-foreground",
        5: "text-base md:text-lg font-medium mt-4 mb-2 text-foreground",
        6: "text-sm md:text-base font-medium mt-4 mb-2 text-foreground",
      }
      const tag = `h${level}`
      html += `<${tag} class="${sizes[level]}">${text}</${tag}>`
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
      html += `<blockquote class="border-l-4 border-cyan-500/50 pl-4 py-2 my-4 bg-cyan-500/5 rounded-r-lg text-muted-foreground italic">${parseInline(blockquoteContent.trim().replace(/\n/g, "<br/>"))}</blockquote>`
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
    html += `<blockquote class="border-l-4 border-cyan-500/50 pl-4 py-2 my-4 bg-cyan-500/5 rounded-r-lg text-muted-foreground italic">${parseInline(blockquoteContent.trim().replace(/\n/g, "<br/>"))}</blockquote>`
  }

  return html
}
