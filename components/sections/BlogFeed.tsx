import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

function formatDate(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function BlogFeed() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
              Journal
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
              }}
            >
              Notes from the studio.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[#1C2026] hover:text-[#C8601A] text-xs font-semibold uppercase tracking-[0.18em] transition-colors inline-flex items-center gap-2"
          >
            All Articles
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE9E3] mb-5 border border-[#E2DDD8]">
                {post.featured_image && (
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              <p className="text-[#8C8C8C] text-[10px] uppercase tracking-[0.18em] font-semibold mb-3">
                {post.category || "Journal"} · {formatDate(post.date)}
              </p>
              <h3
                className="text-[#111111] mb-3 group-hover:text-[#C8601A] transition-colors"
                style={{
                  fontWeight: 500,
                  fontSize: "1.15rem",
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h3>
              <p className="text-[#5A5A5A] text-sm leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
