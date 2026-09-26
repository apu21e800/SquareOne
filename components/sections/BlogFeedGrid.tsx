import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
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

/**
 * Project stories and guides — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.10):
 * the same three posts as a hairline list — a small frame, the title, one
 * line of category and date — no cards. Named for what the posts are, not
 * for the route they live on (Vern, 19 Sept: "we say 'from the blog' but
 * it's not the blog"); /blog's own H1 says the same.
 */
export default function BlogFeedGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <Section
      id="journal"
      label="Recently written"
      title="Project stories and guides"
      link={{ href: "/blog", label: "All stories and guides" }}
      tone="warm"
    >
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="row row-compact relative">
            <Link href={`/blog/${post.slug}`} aria-label={post.title} className="absolute inset-0 z-[2]" />
            <Frame src={post.featured_image || FALLBACK_IMAGE} alt="" aspect="aspect-[3/2]" sizes="132px" />
            <div className="min-w-0">
              <h3 className="[text-wrap:pretty]">{post.title}</h3>
              <p className="mt-2 text-[15px] italic text-ink-muted">
                {post.category ? `${post.category} · ` : ""}
                {formatDate(post.date)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
