"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { BlogPostMeta } from "@/lib/blog"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function BlogFeedGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      {/* Top separator */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "#E8E4DE" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 flex items-center gap-3"
              style={{ color: "#C8601A" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: "#C8601A" }}
              />
              From the Field
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                color: "#111111",
              }}
            >
              The Work,{" "}
              <span style={{ color: "#C8601A" }}>Documented.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="self-start lg:self-end inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] hover:gap-3 transition-all"
            style={{ color: "#C8601A" }}
          >
            All Field Notes
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* 3-col cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                {/* Card wrapper with elevation */}
                <div
                  className="bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)")
                  }
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      src={post.featured_image || "/images/og-image.jpg"}
                      alt={post.title}
                    />
                    {/* Orange bottom reveal on hover */}
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 bottom-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: "#C8601A" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="px-6 pt-5 pb-6">
                    {post.category && (
                      <span
                        className="text-[10px] uppercase tracking-[0.16em] font-semibold mb-2.5 block"
                        style={{ color: "#C8601A" }}
                      >
                        {post.category}
                      </span>
                    )}
                    <h3
                      className="font-bold leading-tight tracking-tight line-clamp-2 mb-2"
                      style={{
                        fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                        letterSpacing: "-0.015em",
                        color: "#111111",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-[13px] leading-relaxed line-clamp-2"
                      style={{ color: "#767676" }}
                    >
                      {post.description}
                    </p>
                    <span
                      className="text-[12px] font-semibold mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
                      style={{ color: "#C8601A" }}
                    >
                      Read more
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7h10M8 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
