import { notFound } from "next/navigation"
import Link from "next/link"
import fs from "fs"
import path from "path"
import { markdownToHtml, type TocItem } from "@/lib/markdown"
import { ChevronRight, Clock, FileText, ArrowLeft } from "lucide-react"
import { PageToc } from "@/components/wiki/page-toc"
import { MermaidRenderer } from "@/components/wiki/mermaid-renderer"

interface PageProps {
  params: Promise<{ slug: string[] }>
}

/** Decode URI segment only if it contains percent-encoded characters. */
function safeDecode(segment: string): string {
  if (/%[0-9A-Fa-f]{2}/.test(segment)) {
    try { return decodeURIComponent(segment) } catch { /* fall through */ }
  }
  return segment
}

async function getWikiContent(slug: string[]): Promise<{
  html: string
  toc: TocItem[]
  title: string
  filePath: string
} | null> {
  const wikiDir = path.join(process.cwd(), "content", "wiki")
  const decodedSlug = slug.map(safeDecode)
  const relativePath = decodedSlug.join("/")
  const filePath = path.join(wikiDir, `${relativePath}.md`)

  try {
    const rawContent = fs.readFileSync(filePath, "utf-8")
    const titleMatch = rawContent.match(/^#\s+(.+)/m)
    const title = titleMatch ? titleMatch[1] : decodedSlug[decodedSlug.length - 1]
    const { html, toc } = markdownToHtml(rawContent)
    return { html, toc, title, filePath: relativePath }
  } catch {
    return null
  }
}

function getBreadcrumbs(slug: string[]): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [
    { label: "文档首页", href: "/wiki" },
  ]
  let accumulated = ""
  slug.forEach((segment) => {
    accumulated += (accumulated ? "/" : "") + segment
    crumbs.push({ label: segment, href: `/wiki/${accumulated}` })
  })
  return crumbs
}

export default async function WikiDocPage({ params }: PageProps) {
  const { slug } = await params
  const decodedSlug = slug.map(safeDecode)
  const data = await getWikiContent(slug)

  if (!data) {
    notFound()
  }

  const breadcrumbs = getBreadcrumbs(decodedSlug)

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 min-w-0 py-8">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-1.5 text-sm">
            <Link
              href="/wiki"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              文档首页
            </Link>
            {breadcrumbs.slice(1).map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                {index === breadcrumbs.length - 2 ? (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          {/* Document Meta */}
          <div className="mb-8 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {data.filePath}.md
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              更新于 2026-05-08
            </span>
          </div>

          {/* Content */}
          <article
            className="wiki-content"
            dangerouslySetInnerHTML={{ __html: data.html }}
          />

          {/* Bottom Navigation */}
          <div className="mt-16 flex items-center justify-between border-t border-border/40 pt-8">
            <Link
              href="/wiki"
              className="flex items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回文档首页
            </Link>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Dynamic TOC */}
      <PageToc items={data.toc} />

      {/* Client-side Mermaid renderer */}
      <MermaidRenderer />
    </>
  )
}
