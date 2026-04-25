"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { BlogPostMeta } from "@/lib/blog"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function BlogFeedGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section className="bg-[#F6F4F0] relative">
      <span
        aria-hidden
        className="absolute left-6 lg:left-10 top-0 w-16 h-[3px]"
        style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-14 flex flex-wrap gap-4 justify-between items-end"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#C8601A]" />
              From the Field
            </p>
            <h2
              className="text-[#111111]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
              }}
            >
              Case studies.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "#C8601A" }}>Insights.</em>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[#C8601A] text-sm font-semibold hover:gap-3 transition-all whitespace-nowrap"
          >
            All Posts
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-[#E2DDD8] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-[#EDE9E3]">
                  {post.category && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] font-semibold bg-[#111111] text-white px-3 py-1.5">
                      {post.category}
                    </span>
                  )}
                  <Image
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    src={post.featured_image || "/images/blog/placeholder.jpg"}
                    alt={post.title}
                  />
                </div>
                <div className="p-6 border-t-[3px] border-[#C8601A]">
                  <h3 className="font-semibold text-[#111111] text-[17px] leading-tight tracking-tight line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[13.5px] text-[#5A5A5A] leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <span className="text-[12.5px] font-semibold text-[#C8601A] mt-5 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read case study
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
