"use client"

import Link from "next/link"

/**
 * CTASection — THE one dark section on the page.
 * #0A0C10 background. Full weight. This is where the page lands.
 */
export default function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0A0C10" }}>
      {/* Radial orange bloom */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,96,26,0.14) 0%, transparent 65%)" }}
      />
      {/* Subtle noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      <div className="relative max-w-[1000px] mx-auto px-6 lg:px-10 py-28 lg:py-40 text-center">

        {/* Eyebrow */}
        <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-8 inline-flex items-center gap-3" style={{ color: "#E8895A" }}>
          <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
          Ready to Start?
          <span className="inline-block w-8 h-px" style={{ background: "#C8601A" }} />
        </p>

        {/* H2 — color in style prop: global CSS h2{color:#111} beats className="text-white" */}
        <h2
          className="max-w-2xl mx-auto"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 800,
            lineHeight: 0.93,
            letterSpacing: "-0.048em",
            color: "white",
          }}
        >
          Your Surface Is Ready.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 700, color: "#E8895A" }}>
            Let&apos;s Talk.
          </em>
        </h2>

        {/* Body */}
        <p className="mt-8 max-w-lg mx-auto leading-relaxed" style={{ fontSize: 15, color: "rgba(255,255,255,0.65)" }}>
          Free site visit. Written quote in 48 hours. We&apos;ve been doing this in BC since 2000.
        </p>

        {/* CTA pair */}
        <div className="mt-10 flex justify-center flex-wrap gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-white px-8 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-colors"
            style={{
              background: "#C8601A",
              boxShadow: "0 4px 28px rgba(200,96,26,0.40)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#A84F15")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C8601A")}
          >
            Request a Quote
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="tel:+16044669902"
            className="inline-flex items-center gap-2 border text-white px-8 py-4 text-[13px] font-bold tracking-[0.02em] uppercase transition-all hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 10.5a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Call Us
          </a>
        </div>

        {/* Footer strip */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.30)" }}
        >
          <span>Metro Vancouver</span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.15)" }}>&#183;</span>
          <span>Vancouver Island</span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.15)" }}>&#183;</span>
          <span>Serving BC since 2000</span>
        </div>
      </div>
    </section>
  )
}
