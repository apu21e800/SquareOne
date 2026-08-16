import Image from "next/image"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"

const FALLBACK_IMAGE =
  "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

/** "2026-07-14" -> "July 14, 2026". Parsed as calendar parts, never local time. */
function formatDate(value: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (iso) {
    const month = MONTHS[Number(iso[2]) - 1]
    if (month) return `${month} ${Number(iso[3])}, ${iso[1]}`
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return `${MONTHS[parsed.getUTCMonth()]} ${parsed.getUTCDate()}, ${parsed.getUTCFullYear()}`
}

export default function BlogFeedGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section
      id="journal"
      className="section relative overflow-hidden border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]"
    >

      <div className="container-1280 relative z-[1]">
        <h2>Field notes</h2>

        <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="card relative">
              <Link
                href={`/blog/${post.slug}`}
                aria-label={post.title}
                className="absolute inset-0 z-[2]"
              />

              <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[color:var(--surface-stone)]">
                <Image
                  src={post.featured_image || FALLBACK_IMAGE}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 411px"
                  className="object-cover"
                />

                <div aria-hidden className="scrim scrim-light" />

                <div className="caption">{post.author}</div>
              </div>

              {post.category && (
                <div className="mt-6">
                  <span className="tag">{post.category}</span>
                </div>
              )}

              <h3 className="mt-[14px]">{post.title}</h3>

              <div className="mt-[10px] text-[13px] text-[var(--ink-muted)]">
                {formatDate(post.date)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
