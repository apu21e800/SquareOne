import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default function BlogFeed() {
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14 lg:mb-20 max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-6">
            Field Notes
          </p>
          <h2 className="text-[#111111] mb-5">From the studio.</h2>
          <p className="text-[#5A5A5A] text-[17px] font-light leading-relaxed max-w-xl">
            Installation stories, material guides, and insights from 25 years of BC hardscape work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden bg-[#EDE9E3] mb-6">
                {p.featured_image && (
                  <Image
                    src={p.featured_image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              {p.category && (
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8601A] font-semibold mb-3">
                  {p.category}
                </p>
              )}
              <h3 className="text-[#111111] text-[19px] leading-tight mb-3 tracking-[-0.01em] font-semibold">
                {p.title}
              </h3>
              <p className="text-[14px] text-[#5A5A5A] leading-relaxed line-clamp-2 mb-4">
                {p.description}
              </p>
              <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#C8601A] group-hover:text-[#A84F15] transition-colors">
                Read →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-block text-[#C8601A] hover:text-[#A84F15] text-sm font-semibold tracking-[0.1em] uppercase underline underline-offset-8 decoration-1"
          >
            All Posts →
          </Link>
        </div>

      </div>
    </section>
  )
}
