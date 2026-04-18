import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-[#1C2026] py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8601A] font-semibold mb-4">Ready to Start?</p>
        <h2 className="text-[2.5rem] font-light text-white leading-tight tracking-[-0.02em]">
          Let&#39;s build something{' '}
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', color: '#C8601A' }}>
            worth looking at.
          </span>
        </h2>
        <p className="max-w-xl mx-auto text-white/60 mt-4 leading-relaxed">
          Whether it&#39;s a municipal crosswalk, a commercial plaza, or your home driveway —
          we bring 25 years of BC expertise to every square metre.
        </p>
        <div className="mt-10 flex justify-center flex-wrap gap-4">
          <Link
            href="/contact"
            className="bg-[#C8601A] text-white px-8 py-4 rounded-none font-semibold hover:brightness-110 transition-all"
          >
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="border border-white/30 text-white px-8 py-4 rounded-none hover:border-white transition-colors"
          >
            Book a Site Visit
          </Link>
        </div>
      </div>
    </section>
  )
}
