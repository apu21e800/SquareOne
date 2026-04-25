import Link from "next/link"
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import BlogFilterClient from "@/components/blog/BlogFilterClient"

export const metadata: Metadata = {
  title: "Blog | Square One Paving",
  description:
    "Project guides, product insights, and real talk about decorative paving in BC.",
  alternates: {
    canonical: "https://squareonepaving.com/blog",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main style={{ background: "var(--bg-warm, #F6F4F0)" }}>

      {/* ── Page header ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E2DDD8] pt-28 pb-12 px-6 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow mb-3">From the Field</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "#111111",
                }}
              >
                Square One Blog
              </h1>
              <p
                className="text-lg mt-3 max-w-xl leading-relaxed"
                style={{ color: "#5A5A5A" }}
              >
                Project guides, product insights, and real talk about decorative
                paving in BC.
              </p>
            </div>
            <Link href="/contact">
              <span
                className="inline-block px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)",
                }}
              >
                Get a Quote
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Client component: category tabs + posts ────────────────── */}
      <BlogFilterClient posts={posts} />

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8" style={{ background: "#1C2026" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-5" style={{ color: "#E8895A" }}>
            Ready to Start a Project?
          </p>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3vw, 3rem)",
              fontWeight: 300,
              color: "white",
              letterSpacing: "-0.025em",
            }}
            className="mb-6"
          >
            Get a Free Consultation
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
            We serve the Lower Mainland and Vancouver Island. Free site visits, no
            pressure quotes.
          </p>
          <Link href="/contact">
            <span
              className="inline-block px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)",
              }}
            >
              Contact Us
            </span>
          </Link>
        </div>
      </section>

    </main>
  )
}
