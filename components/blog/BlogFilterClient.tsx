"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPostMeta } from "@/lib/blog"

/**
 * `label` is display copy (Canadian English, sentence case); `match` is the
 * original filter token and must not change — it is what the post categories
 * and tags are tested against.
 */
const CATEGORIES: ReadonlyArray<{ label: string; match: string }> = [
  { label: "All", match: "All" },
  { label: "Municipal", match: "Municipal" },
  { label: "Driveways", match: "Driveways" },
  { label: "Vapour blasting", match: "Vapour Blasting" },
  { label: "Public art", match: "Public Art" },
  { label: "Case studies", match: "Case Studies" },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
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

export default function BlogFilterClient({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts
    return posts.filter((p) => {
      const cat = p.category?.toLowerCase() ?? ""
      const tag = p.tags?.join(" ").toLowerCase() ?? ""
      const search = activeCategory.toLowerCase()
      return cat.includes(search) || tag.includes(search)
    })
  }, [activeCategory, posts])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    // Section shell, background and container come from app/blog/page.tsx —
    // this is a child, not a section of its own.
    <>
      <div>
        {/* ── Filter tabs ─────────────────────────────────────────────── */}
        <div
          role="group"
          aria-label="Filter journal by topic"
          className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[color:var(--hairline)] pb-4"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.match
            return (
              <button
                key={cat.match}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat.match)}
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

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-[16px] text-[color:var(--ink-body)]">
            No notes filed under this topic yet — check back soon.
          </p>
        ) : (
          <>
            {/* ── Featured note ───────────────────────────────────────── */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="card group mt-10 grid grid-cols-[7fr_5fr] items-stretch overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface-warm)] max-[820px]:grid-cols-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-stone)]">
                  {featured.featured_image && (
                    <Image
                      src={featured.featured_image}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 820px) 100vw, 700px"
                      className="object-cover"
                    />
                  )}
                  {featured.featured_image && captionFor(featured) && (
                    <>
                      <div aria-hidden="true" className="scrim scrim-light" />
                      <div className="caption">{captionFor(featured)}</div>
                    </>
                  )}
                </div>

                <div className="flex flex-col justify-center px-12 py-10 max-[820px]:px-7 max-[820px]:py-8">
                  {featured.category && (
                    <div>
                      <span className="tag">{featured.category}</span>
                    </div>
                  )}

                  <h3 className="mt-5 text-[28px] leading-[1.25] [text-wrap:pretty] max-[820px]:text-[22px]">
                    {featured.title}
                  </h3>

                  <p className="mt-[14px] max-w-[48ch] text-[16px] leading-[1.6] text-[color:var(--ink-body)]">
                    {featured.description}
                  </p>

                  {featured.date && (
                    <div className="mt-4 text-[13px] text-[color:var(--ink-muted)]">
                      {formatDate(featured.date)}
                    </div>
                  )}

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
            )}

            {/* ── The rest ────────────────────────────────────────────── */}
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
    </>
  )
}

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

      {post.date && (
        <div className="mt-[10px] text-[13px] text-[color:var(--ink-muted)]">
          {formatDate(post.date)}
        </div>
      )}
    </Link>
  )
}
