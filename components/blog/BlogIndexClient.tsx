"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPostMeta } from "@/lib/blog"

const CATEGORIES = ["All", "Municipal", "Driveways", "Vapor Blasting", "Public Art", "Case Studies"]

function readTime(text: string) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length
  // description is an excerpt; estimate full article at ~10× length
  return `${Math.max(2, Math.ceil((words * 10) / 250))} min read`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function matchesCategory(post: BlogPostMeta, cat: string) {
  if (cat === "All") return true
  const haystack = [post.category, ...(post.tags ?? [])].join(" ").toLowerCase()
  return haystack.includes(cat.toLowerCase())
}

interface Props {
  posts: BlogPostMeta[]
}

export default function BlogIndexClient({ posts }: Props) {
  const [active, setActive] = useState("All")

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => matchesCategory(p, active))),
    [active, posts]
  )

  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <main style={{ background: "#F6F4F0", minHeight: "100vh" }}>

      {/* ── Editorial page header with integrated filter tabs ──────────── */}
      <section style={{ background: "white", borderBottom: "1px solid #E2DDD8" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Header content */}
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            style={{ paddingTop: "7rem", paddingBottom: "2.5rem" }}
          >
            <div>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C8601A",
                  marginBottom: "1.25rem",
                }}
              >
                From the Field
              </p>
              <h1
                style={{
                  fontSize: "clamp(3.2rem, 6.5vw, 7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.88,
                  color: "#0A0C10",
                }}
              >
                Field<br />Notes.
              </h1>
              <p
                style={{
                  fontSize: "17px",
                  marginTop: "1.5rem",
                  maxWidth: "40ch",
                  lineHeight: 1.65,
                  color: "#5A5A5A",
                }}
              >
                Project stories, product deep-dives, and real talk from the
                crew behind BC&apos;s best decorative paving work.
              </p>
            </div>

            <div style={{ flexShrink: 0 }} className="md:text-right">
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8C8C8C",
                  marginBottom: "10px",
                }}
              >
                {filtered.length} {filtered.length === 1 ? "Article" : "Articles"}
              </p>
              <Link href="/contact">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "white",
                    background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)",
                    boxShadow: "0 4px 20px rgba(200,96,26,0.25)",
                  }}
                >
                  Get a Quote
                </span>
              </Link>
            </div>
          </div>

          {/* Filter tabs — sit on the header's bottom border */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #E2DDD8",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: "14px 20px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    color: isActive ? "#0A0C10" : "#8C8C8C",
                    background: "none",
                    border: "none",
                    borderBottom: `2px solid ${isActive ? "#C8601A" : "transparent"}`,
                    cursor: "pointer",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 2rem 96px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "96px 0" }}>
            <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0A0C10", marginBottom: "8px" }}>
              Nothing here yet
            </p>
            <p style={{ fontSize: "15px", color: "#5A5A5A", marginBottom: "28px" }}>
              No posts in this category — check back soon.
            </p>
            <button
              onClick={() => setActive("All")}
              style={{
                padding: "12px 28px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "white",
                background: "#C8601A",
                border: "none",
                cursor: "pointer",
              }}
            >
              Show All Posts
            </button>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div style={{ marginBottom: "1px" }}>
                <FeaturedCard post={featured} />
              </div>
            )}

            {/* Gap-grid: 1px background colour bleeds through as dividers */}
            {rest.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1px",
                  background: "#E2DDD8",
                }}
              >
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0A0C10", padding: "96px 2rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#E8895A",
              marginBottom: "1.5rem",
            }}
          >
            Ready to Start a Project?
          </p>
          <h2
            style={{
              fontSize: "clamp(2.25rem, 4vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 0.93,
              color: "white",
              marginBottom: "1.75rem",
            }}
          >
            Get a Free<br />Consultation
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "42ch",
              margin: "0 auto 3rem",
              lineHeight: 1.65,
            }}
          >
            We serve the Lower Mainland and Vancouver Island.
            Free site visits, no pressure quotes.
          </p>
          <Link href="/contact">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 40px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "white",
                background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)",
                boxShadow: "0 4px 24px rgba(200,96,26,0.35)",
              }}
            >
              Contact Us &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Featured card — full-width, 2-column with large image
// ────────────────────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group" style={{ display: "block" }}>
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{
          background: "white",
          transition: "box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(0,0,0,0.10)"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
        }}
      >
        {/* Image */}
        {post.featured_image ? (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: "360px",
            }}
          >
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                padding: "6px 12px",
                background: "#C8601A",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Featured
            </div>
          </div>
        ) : (
          /* Colour block when no image */
          <div
            style={{
              background: "#0A0C10",
              minHeight: "360px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: "clamp(4rem, 8vw, 8rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: "rgba(255,255,255,0.06)",
              }}
            >
              01
            </span>
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                padding: "6px 12px",
                background: "#C8601A",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Featured
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: "clamp(2rem, 4vw, 4rem)" }}
        >
          {post.category && (
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#C8601A",
                marginBottom: "1rem",
              }}
            >
              {post.category}
            </p>
          )}
          <h2
            className="transition-colors duration-200 group-hover:text-[#C8601A]"
            style={{
              fontSize: "clamp(1.7rem, 2.6vw, 2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "#0A0C10",
              marginBottom: "1.25rem",
            }}
          >
            {post.title}
          </h2>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#5A5A5A",
              marginBottom: "2.5rem",
            }}
          >
            {post.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "20px",
              borderTop: "1px solid #E2DDD8",
            }}
          >
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0A0C10", lineHeight: 1.3 }}>
                {post.author || "Square One Paving"}
              </p>
              <p style={{ fontSize: "12px", color: "#8C8C8C", marginTop: "2px" }}>
                {formatDate(post.date)}&nbsp;&middot;&nbsp;{readTime(post.description)}
              </p>
            </div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#C8601A",
              }}
            >
              Read Article &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Regular post card — lives inside the gap-grid
// ────────────────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = "translateY(-2px)"
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"
        el.style.zIndex = "1"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = "translateY(0)"
        el.style.boxShadow = "none"
        el.style.zIndex = "0"
      }}
    >
      {/* Image */}
      {post.featured_image && (
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          {post.category && (
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "5px 10px",
                  color: "white",
                  background: "rgba(200,96,26,0.9)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div
        style={{
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Category label when no image */}
        {!post.featured_image && post.category && (
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C8601A",
              marginBottom: "10px",
            }}
          >
            {post.category}
          </p>
        )}

        <h3
          className="transition-colors duration-200 group-hover:text-[#C8601A]"
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "#0A0C10",
            marginBottom: "10px",
          }}
        >
          {post.title}
        </h3>

        <p
          className="line-clamp-3"
          style={{
            fontSize: "13px",
            lineHeight: 1.65,
            color: "#6B6B6B",
            flex: 1,
            marginBottom: "20px",
          }}
        >
          {post.description}
        </p>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "1px solid #EDEBE7",
          }}
        >
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#0A0C10", lineHeight: 1.3 }}>
              {post.author || "Square One Paving"}
            </p>
            <p style={{ fontSize: "11px", color: "#8C8C8C", marginTop: "1px" }}>
              {formatDate(post.date)}&nbsp;&middot;&nbsp;{readTime(post.description)}
            </p>
          </div>
          <span
            className="transition-all duration-200 group-hover:tracking-widest"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#C8601A",
            }}
          >
            Read &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
