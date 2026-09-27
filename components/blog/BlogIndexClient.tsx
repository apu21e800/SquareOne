"use client"

import { useState, useMemo, type CSSProperties } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"
import RecordCard from "@/components/ui/RecordCard"

/**
 * An earlier blog index with its own masthead and topic tabs. As of 26 Sept
 * 2026 no page imports it — /blog renders components/blog/BlogFilterClient
 * inside app/blog/page.tsx — but it is kept compiling and restyled on the
 * shared RecordCard (docs/OWN-COMPANY-BRIEF.md §3.7): no full stop, the
 * topic tabs as underlined words with the one in force in plain ink, the
 * records as frames with their captions under them, the close as a
 * hairline block with the one button. Moving the file out is the
 * maintainer's call.
 *
 * `label` is display copy (Canadian English, sentence case); `match` is the
 * original filter token and must not change — it is what post categories
 * and tags are tested against.
 */
const CATEGORIES: ReadonlyArray<{ label: string; match: string }> = [
  { label: "All", match: "All" },
  { label: "Municipal", match: "Municipal" },
  { label: "Driveways", match: "Driveways" },
  { label: "Vapour blasting", match: "Vapour Blasting" },
  { label: "Public art", match: "Public Art" },
  { label: "Project stories", match: "Case Studies" },
]

/** The tab in force reads as the current word, not a link. own.css sets
    `.link` unlayered, so the override is inline. */
const CURRENT: CSSProperties = { textDecoration: "none", color: "var(--ink)" }

function readTime(text: string) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length
  // description is an excerpt; estimate full article at ~10× length
  return `${Math.max(2, Math.ceil((words * 10) / 250))} min read`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function matchesCategory(post: BlogPostMeta, cat: string) {
  if (cat === "All") return true
  const haystack = [post.category, ...(post.tags ?? [])].join(" ").toLowerCase()
  return haystack.includes(cat.toLowerCase())
}

/** Photo caption — category and year, the only location data frontmatter carries. */
function captionFor(post: BlogPostMeta): string {
  const year = post.date ? new Date(post.date).getFullYear() : Number.NaN
  return [post.category, Number.isFinite(year) ? String(year) : ""]
    .filter(Boolean)
    .join(" · ")
}

function metaFor(post: BlogPostMeta): string {
  return [post.date ? formatDate(post.date) : "", post.description ? readTime(post.description) : ""]
    .filter(Boolean)
    .join(" · ")
}

interface Props {
  posts: BlogPostMeta[]
}

export default function BlogIndexClient({ posts }: Props) {
  const [active, setActive] = useState("All")

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => matchesCategory(p, active))),
    [active, posts]
  )

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <main className="bg-[color:var(--surface)]">
      {/* ── Masthead ──────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden pt-32 max-[700px]:pt-24">
        <div className="container-1280 relative z-[1]">
          <span className="label">Blog</span>

          <h1 className="mt-4">Guides and project stories</h1>

          <p className="lede mt-5 max-w-[56ch] [text-wrap:pretty]">
            Notes from the crews and the estimating desk: materials, methods and what
            holds up.
          </p>

          <p className="label mt-10">
            {filtered.length} {filtered.length === 1 ? "note" : "notes"}
          </p>

          {/* Filter tabs — underlined words; the one in force in plain ink */}
          <div
            role="group"
            aria-label="Filter posts by topic"
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-b border-hairline pb-4"
          >
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.match
              return (
                <button
                  key={cat.match}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(cat.match)}
                  className="link"
                  style={isActive ? CURRENT : undefined}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* ── Posts ─────────────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-ink">Nothing filed here yet</p>
              <p className="mt-2 text-[15px] text-ink-body">
                No notes under this topic. Check back soon.
              </p>
              <button type="button" onClick={() => setActive("All")} className="link mt-7">
                Show all notes
              </button>
            </div>
          ) : (
            <>
              {featured && (
                <div className="mt-10">
                  <RecordCard
                    lead
                    priority
                    href={`/blog/${featured.slug}`}
                    src={featured.featured_image || undefined}
                    alt={featured.title}
                    caption={captionFor(featured)}
                    kicker={featured.category || undefined}
                    title={featured.title}
                    description={featured.description}
                    meta={[featured.author || "Square One Paving", metaFor(featured)].filter(Boolean).join(" · ")}
                  />
                </div>
              )}

              {rest.length > 0 && (
                <ul className="mt-12 grid grid-cols-3 gap-x-7 gap-y-12 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-y-8">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <RecordCard
                        href={`/blog/${post.slug}`}
                        src={post.featured_image || undefined}
                        alt={post.title}
                        caption={captionFor(post)}
                        kicker={post.category || undefined}
                        title={post.title}
                        description={post.description}
                        meta={metaFor(post) || undefined}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────────
          A hairline block on warm paper, the one button. The single dark
          close on every page is the site footer, rendered by app/layout.tsx. */}
      <section className="section sec bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="sec-grid">
            <div className="sec-label">
              <span className="label">Start a project</span>
            </div>
            <div className="sec-body">
              <h2>Free site visit, written quote</h2>
              <p className="mt-5 max-w-[48ch] text-ink-body [text-wrap:pretty]">
                We work across the Lower Mainland and Vancouver Island. Tell us what the
                surface has to do and we will tell you what it takes.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
