import Link from "next/link"

export default function CTASection() {
  return (
    <section className="w-full bg-[#1C2026] py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end">
          <div className="max-w-3xl">
            <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-6">
              Start a Project
            </p>
            <h2
              className="text-white mb-8"
              style={{
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              }}
            >
              A surface is a decision.<br />Make it a considered one.
            </h2>
            <div className="w-12 h-[2px] bg-[#C8601A] mb-8" />
            <p className="text-white/60 text-base leading-relaxed max-w-md">
              Walk-through, written quote, and a realistic schedule. Free to request,
              anywhere in the Lower Mainland or on Vancouver Island.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <Link href="/contact">
              <button className="w-full sm:w-auto bg-white hover:bg-[#F6F4F0] text-[#1C2026] px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                Request a Quote
              </button>
            </Link>
            <a href="tel:16043098212">
              <button className="w-full sm:w-auto border border-white/25 hover:border-white text-white hover:bg-white/5 px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                604-309-8212
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
