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
      style={{ background: "#111111" }}
    >
      {/* Subtle diagonal bloom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(200,96,26,0.10) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">

        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-14"
        >
          <p
            className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 flex items-center gap-3"
            style={{ color: "#E8895A" }}
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
              color: "white",
            }}
          >
            The Work,{" "}
            <span style={{ color: "#C8601A" }}>Documented.</span>
          </h2>
        </motion.div>

        {/* 3-col image-forward cards */}
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
                {/* Image — full-bleed, no border box */}
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                  <Image
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                    src={post.featured_image || "/images/og-image.jpg"}
                    alt={post.title}
                  />
                  {/* Dark overlay on hover */}
                  <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{ background: "rgba(0,0,0,0)" }}
                  />
                  {/* Orange bottom reveal on hover */}
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: "#C8601A" }}
                  />
                </div>

                {/* Content */}
                <div className="pt-5 pb-1">
                  {post.category && (
                    <span
                      className="text-[10px] uppercase tracking-[0.16em] font-semibold mb-2.5 block"
                      style={{ color: "#C8601A" }}
                    >
                      {post.category}
                    </span>
                  )}
                  <h3
                    className="font-bold leading-tight tracking-tight line-clamp-2 mb-2 transition-colors duration-200"
                    style={{
                      fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                      letterSpacing: "-0.015em",
                      color: "white",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed line-clamp-2"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                  >
                    {post.description}
                  </p>
                  <span
                    className="text-[12px] font-semibold mt-4 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
                    style={{ color: "#E8895A" }}
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
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white px-8 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-all duration-200 rounded-lg hover:bg-white/[0.06]"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          >
            All Field Notes
            <svg
              width="12"
              height="12"
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
          </Link>
        </div>
      </div>
    </section>
  )
}
