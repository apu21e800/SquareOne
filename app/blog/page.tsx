"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/blog"

const CATEGORIES = ["All", "Municipal", "Driveways", "Vapor Blasting", "Public Art", "Case Studies"]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function estimateReadTime(content: string) {
  const words = content?.split(/\s+/).length ?? 0
  return Math.max(2, Math.ceil(words / 200))
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allPosts
    return allPosts.filter((p) => {
      const cat = p.category?.toLowerCase() ?? ""
      const tag = p.tags?.join(" ").toLowerCase() ?? ""
      const search = activeCategory.toLowerCase()
      return cat.includes(search) || tag.includes(search)
    })
  }, [activeCategory, allPosts])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main style={{ background: "var(--bg-warm, #F6F4F0)" }}>

      {/* ── Page header ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E2DDD8] pt-28 pb-12 px-6 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow mb-3">From the Field</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "-0.03em", color: "#111111" }}>
                Square One Blog
              </h1>
              <p className="text-lg mt-3 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
                Project guides, product insights, and real talk about decorative paving in BC.
              </p>
            </div>
            <Link href="/contact">
              <span
                className="inline-block px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
              >
                Get a Quote
              </span>
            </Link>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mt-8 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-4 py-2 whitespace-nowrap transition-all"
                style={{
                  background: activeCategory === cat ? "#C8601A" : "white",
                  color: activeCategory === cat ? "white" : "#5A5A5A",
                  border: activeCategory === cat ? "1px solid #C8601A" : "1px solid #E2DDD8",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-14">

        {filtered.length === 0 ? (
          <p style={{ color: "#5A5A5A" }} className="py-12 text-center">
            No posts in this category yet — check back soon.
          </p>
        ) : (
          <>
            {/* ── Featured post ──────────────────────────────────────── */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block mb-14"
              >
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden transition-all duration-300"
                  style={{
                    background: "white",
                    border: "1px solid #E2DDD8",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  {/* Image */}
                  {featured.featured_image && (
                    <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
                      <Image
                        src={featured.featured_image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      {/* Featured badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 text-white"
                          style={{ background: "#C8601A" }}
                        >
                          Featured
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Copy */}
                  <div className="flex flex-col justify-center p-10 lg:p-14">
                    {featured.category && (
                      <p className="eyebrow mb-4">{featured.category}</p>
                    )}
                    <h2
                      className="mb-5 transition-colors duration-200 group-hover:text-[#C8601A]"
                      style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)", fontWeight: 300, letterSpacing: "-0.025em", color: "#111111", lineHeight: 1.15 }}
                    >
                      {featured.title}
                    </h2>
                    <p className="text-base leading-relaxed mb-8" style={{ color: "#5A5A5A" }}>
                      {featured.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm" style={{ color: "#8C8C8C" }}>
                        <span>{formatDate(featured.date)}</span>
                        {featured.content && (
                          <span>{estimateReadTime(featured.content)} min read</span>
                        )}
                      </div>
                      <span
                        className="text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                        style={{ color: "#C8601A" }}
                      >
                        Read Article →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* ── Remaining posts grid ───────────────────────────────── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden transition-all duration-250"
                    style={{
                      background: "white",
                      border: "1px solid #E2DDD8",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "rgba(200,96,26,0.4)"
                      el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"
                      el.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "#E2DDD8"
                      el.style.boxShadow = "none"
                      el.style.transform = "translateY(0)"
                    }}
                  >
                    {/* Image */}
                    {post.featured_image && (
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {post.category && (
                          <div className="absolute top-3 left-3">
                            <span
                              className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 text-white"
                              style={{ background: "rgba(200,96,26,0.88)", backdropFilter: "blur(4px)" }}
                            >
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card body */}
                    <div className="p-6">
                      <h3
                        className="mb-3 leading-snug transition-colors duration-200 group-hover:text-[#C8601A]"
                        style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111111" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "#5A5A5A" }}>
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #EDEBE7" }}>
                        <span className="text-xs" style={{ color: "#8C8C8C" }}>
                          {formatDate(post.date)}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest transition-all duration-200 group-hover:tracking-[0.2em]" style={{ color: "#C8601A" }}>
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8" style={{ background: "#1C2026" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-5" style={{ color: "#E8895A" }}>
            Ready to Start a Project?
          </p>
          <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 3rem)", fontWeight: 300, color: "white", letterSpacing: "-0.025em" }} className="mb-6">
            Get a Free Consultation
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
            We serve the Lower Mainland and Vancouver Island. Free site visits, no pressure quotes.
          </p>
          <Link href="/contact">
            <span
              className="inline-block px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)" }}
            >
              Contact Us
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
