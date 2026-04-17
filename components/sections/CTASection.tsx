import Link from "next/link"

export default function CTASection() {
  return (
    <section className="w-full bg-[#C8601A] py-24 lg:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">

        <h2 className="text-white font-light tracking-[-0.02em] mb-6">
          Ready to transform your surface?
        </h2>

        <p className="text-white/80 text-[17px] font-light leading-relaxed max-w-2xl mx-auto mb-10">
          We work with municipalities, developers, strata corporations, and private property
          owners across Greater Vancouver and Vancouver Island.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#1C2026] px-10 py-4 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#F6F4F0] transition-colors"
          >
            Request a Quote
          </Link>
          <a
            href="tel:18773910270"
            className="inline-flex items-center border border-white/40 text-white px-10 py-4 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-white hover:text-[#1C2026] hover:border-white transition-colors"
          >
            1-877-391-0270
          </a>
        </div>

      </div>
    </section>
  )
}
