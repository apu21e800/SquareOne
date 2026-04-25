import Link from "next/link"
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import BlogFilterClient from "@/components/blog/BlogFilterClient"

export const metadata: Metadata = {
  title: "Blog | Square One Paving",
  description: "Project guides, product insights, and real talk about decorative paving in BC.",
  alternates: { canonical: "https://squareonepaving.com/blog" },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main style={{ background: "var(--bg-warm, #F6F4F0)" }}>

      {/* ── Editorial page header ───────────────────────────────────── */}
      <section className="bg-white border-b border-[#E2DDD8] pt-28 pb-16 px-6 sm:px-8">
        <div className="max-w-[1500px] mx-auto">
          <p className="eyebrow mb-5">From the Field</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h1
                style={{
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                  color: "#111111",
                }}
              >
                The Blog
              </h1>
              <p className="text-[17px] mt-5 max-w-xl leading-relaxed" style={{ color: "#5A5A5A" }}>
                Project guides, product insights, and real talk about
                decorative paving across BC.
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: "#8C8C8C" }}>
                {posts.length} Articles
              </p>
              <Link href="/contact">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-[0.02em] text-white transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)", boxShadow: "0 4px 20px rgba(200,96,26,0.25)" }}
                >
                  Get a Quote
                </span>
              </Link>
            </div>
          </div>

          {/* Divider rule */}
          <div className="mt-12 pt-8 border-t border-[#E2DDD8] flex items-center gap-6">
            {["All", "Projects", "Products", "How-To", "Industry"].map((cat) => (
              <span key={cat} className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C8C8C]">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Posts — handled by client component */}
      <BlogFilterClient posts={posts} />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 sm:px-8" style={{ background: "#1C2026" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-5" style={{ color: "#E8895A" }}>Ready to Start a Project?</p>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
            className="mb-7"
          >
            Get a Free
            <br />
            Consultation
          </h2>
          <p className="text-[17px] mb-12" style={{ color: "rgba(255,255,255,0.55)" }}>
            We serve the Lower Mainland and Vancouver Island.
            Free site visits, no pressure quotes.
          </p>
          <Link href="/contact">
            <span
              className="inline-flex items-center gap-2 px-10 py-4 text-sm font-bold tracking-[0.04em] uppercase text-white transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #C8601A 0%, #E8895A 100%)", boxShadow: "0 4px 24px rgba(200,96,26,0.35)" }}
            >
              Contact Us
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
