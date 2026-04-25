import Link from "next/link"

/**
 * CTASection — dark close, big editorial headline, two CTAs.
 */
export default function CTASection() {
  return (
    <section className="relative bg-[#1C2026] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/images/textures/stamped-asphalt-texture.webp')",
          backgroundSize: "cover",
        }}
      />
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#E8895A] font-semibold mb-6 inline-flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[#C8601A]" />
          Ready to Start?
          <span className="inline-block w-8 h-px bg-[#C8601A]" />
        </p>
        <h2
          className="text-white max-w-3xl mx-auto"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            textWrap: "balance",
          }}
        >
          Let&apos;s build something{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#E8895A" }}>
            worth looking at.
          </em>
        </h2>
        <p className="text-base text-white/65 mt-6 max-w-xl mx-auto leading-relaxed">
          Whether it&apos;s a municipal crosswalk, a commercial plaza, or your home driveway — we bring 25 years
          of BC expertise to every square metre.
        </p>
        <div className="mt-10 flex justify-center flex-wrap gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-8 py-4 text-sm font-semibold rounded-[8px] hover:bg-[#A84F15] transition-colors"
            style={{ boxShadow: "0 4px 20px rgba(200,96,26,0.35)" }}
          >
            Request a Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold rounded-[8px] hover:border-white hover:bg-white/5 transition-colors"
          >
            Book a Site Visit
          </Link>
        </div>
      </div>
    </section>
  )
}
