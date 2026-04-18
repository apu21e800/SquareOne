import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default function BlogFeed() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">From the Field</p>
            <h2 className="text-[2.5rem] font-light text-[#111111] leading-tight tracking-[-0.02em]">Case studies &amp; insights.</h2>
          </div>
          <Link href="/blog" className="text-[#C8601A] text-sm font-semibold hover:underline whitespace-nowrap">
            All Posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-none">
              <div className="relative aspect-[16/10] overflow-hidden rounded-none">
                <Image
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  src={post.featured_image || "/images/blog/placeholder.jpg"}
                  alt={post.title}
                />
              </div>
              <div className="pt-5">
                <p className="text-[10px] uppercase tracking-wider text-[#C8601A] font-semibold">{post.category}</p>
                <h3 className="font-semibold text-[#111111] text-lg leading-tight mt-1.5 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-[#5A5A5A] mt-2 line-clamp-2">{post.description}</p>
                <span className="text-[#C8601A] text-sm font-semibold mt-4 flex items-center gap-1">
                  Read case study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
