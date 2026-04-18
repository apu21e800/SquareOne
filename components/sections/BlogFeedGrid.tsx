"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { BlogPostMeta } from "@/lib/blog"
import Container from "@/components/ui/Container"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function BlogFeedGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-12 flex flex-wrap gap-4 justify-between items-end"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-3">From the Field</p>
            <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-light text-[#111111] leading-tight tracking-[-0.02em]">Case studies &amp; insights.</h2>
          </div>
          <Link href="/blog" className="hover-underline text-[#C8601A] text-sm font-semibold whitespace-nowrap">
            All Posts →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block rounded-none transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[3/2] overflow-hidden rounded-none border border-[#E2DDD8] group-hover:border-[#C8601A] transition-colors duration-300">
                  {post.category && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] font-semibold bg-[#111111] text-white px-3 py-1.5">
                      {post.category}
                    </span>
                  )}
                  <Image
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover rounded-none group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={post.featured_image || "/images/blog/placeholder.jpg"}
                    alt={post.title}
                  />
                </div>
                <div className="pt-5">
                  <h3 className="font-semibold text-[#111111] text-lg leading-tight line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-[#5A5A5A] mt-2 line-clamp-2">{post.description}</p>
                  <span className="hover-underline text-[#C8601A] text-sm font-semibold mt-4 inline-flex items-center gap-1">
                    Read case study
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
