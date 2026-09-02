"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPostMeta } from "@/lib/blog"

/**
 * `label` is display copy (Canadian English, sentence case); `match` is the
 * original filter token and must not change — it is what post categories and
 * tags are tested against.
 */
const CATEGORIES: ReadonlyArray<{ label: string; match: string }> = [
  { label: "All", match: "All" },
  { label: "Municipal", match: "Municipal" },
  { label: "Driveways", match: "Driveways" },
  { label: "Vapour blasting", match: "Vapour Blasting" },
  { label: "Public art", match: "Public Art" },
  { label: "Case studies", match: "Case Studies" },
]

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
          <div className="eyebrow">Blog</div>

          <h1 className="stop mt-5">Guides and project stories</h1>

          <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] text-[color:var(--ink-body)] [text-wrap:pretty]">
            Notes from the crews and the estimating desk: materials, methods and what
            holds up.
          </p>

          <div className="mt-10 text-[13px] text-[color:var(--ink-muted)]">
            {filtered.length} {filtered.length === 1 ? "note" : "notes"}
          </div>

          {/* Filter tabs */}
          <div
            role="group"
            aria-label="Filter posts by topic"
            className="mt-4 flex flex-wrap gap-x-6 gap-y-3 border-b border-[color:var(--hairline)] pb-4"
          >
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.match
              return (
                <button
                  key={cat.match}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(cat.match)}
                  className={`
                    cursor-pointer border-b-2 pb-[2px] text-[14px] transition-colors
                    ${
                      isActive
                        ? "border-[color:var(--ink)] font-semibold text-[color:var(--ink)]"
                        : "border-transparent font-medium text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
                    }
                  `}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* ── Posts ─────────────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[18px] text-[color:var(--ink)]">Nothing filed here yet</p>
              <p className="mt-2 text-[15px] text-[color:var(--ink-body)]">
                No notes under this topic — check back soon.
              </p>
              <button
                type="button"
                onClick={() => setActive("All")}
                className="btn-secondary mt-7 cursor-pointer"
              >
                Show all notes
              </button>
            </div>
          ) : (
            <>
              {featured && <FeaturedCard post={featured} />}

              {rest.length > 0 && (
                <div className="mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-10">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────────
          Warm, not slate. The single dark close on every page is the site
          footer, rendered by app/layout.tsx. */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280 max-w-[720px] text-center">
          <div className="eyebrow eyebrow-center">Start a project</div>

          <h2 className="mt-5">Free site visit, written quote</h2>

          <p className="mx-auto mt-5 max-w-[48ch] text-[17px] leading-[1.65] text-[color:var(--ink-body)]">
            We work across the Lower Mainland and Vancouver Island. Tell us what the
            surface has to do and we will tell you what it takes.
          </p>

          <Link href="/contact" className="btn-primary mt-9">
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  )
}

/* ── Featured note ──────────────────────────────────────────────────────────────── */

function FeaturedCard({ post }: { post: BlogPostMeta }) {
  const caption = captionFor(post)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group mt-10 grid grid-cols-[7fr_5fr] items-stretch overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface-warm)] max-[820px]:grid-cols-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-stone)]">
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 820px) 100vw, 700px"
            className="object-cover"
          />
        )}
        {post.featured_image && caption && (
          <>
            <div aria-hidden="true" className="scrim scrim-light" />
            <div className="caption">{caption}</div>
          </>
        )}
      </div>

      <div className="flex flex-col justify-center px-12 py-10 max-[820px]:px-7 max-[820px]:py-8">
        {post.category && (
          <div>
            <span className="tag">{post.category}</span>
          </div>
        )}

        <h3 className="mt-5 text-[28px] leading-[1.25] [text-wrap:pretty] max-[820px]:text-[22px]">
          {post.title}
        </h3>

        <p className="mt-[14px] max-w-[48ch] text-[16px] leading-[1.6] text-[color:var(--ink-body)]">
          {post.description}
        </p>

        <div className="mt-4 text-[13px] text-[color:var(--ink-muted)]">
          {post.author || "Square One Paving"}
          {post.date && <> &middot; {formatDate(post.date)}</>}
          {post.description && <> &middot; {readTime(post.description)}</>}
        </div>

        <span className="arrow-link mt-6">
          Read{" "}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}

/* ── Grid note ────────────────────────────────────────────────────────────────── */

function PostCard({ post }: { post: BlogPostMeta }) {
  const caption = captionFor(post)

  return (
    <Link href={`/blog/${post.slug}`} className="card block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 400px"
            className="object-cover"
          />
        )}
        {post.featured_image && caption && (
          <>
            <div aria-hidden="true" className="scrim scrim-light" />
            <div className="caption">{caption}</div>
          </>
        )}
      </div>

      {post.category && (
        <div className="mt-5">
          <span className="tag">{post.category}</span>
        </div>
      )}

      <h3 className="mt-[14px] [text-wrap:pretty]">{post.title}</h3>

      <p className="mt-[10px] line-clamp-3 text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
        {post.description}
      </p>

      <div className="mt-[10px] text-[13px] text-[color:var(--ink-muted)]">
        {post.date && formatDate(post.date)}
        {post.date && post.description && <> &middot; </>}
        {post.description && readTime(post.description)}
      </div>
    </Link>
  )
}
