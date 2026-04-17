import Link from "next/link"

export default function CTASection() {
  return (
    <section className="w-full py-24 bg-[#C8601A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-white font-light">
          Ready to transform your surface?
        </h2>

        <p className="mt-6 text-white/80 text-lg max-w-lg mx-auto leading-relaxed">
          We work with municipalities, developers, strata corporations,
          and private property owners across Greater Vancouver and Vancouver Island.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-[#1C2026] px-10 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#1C2026] hover:text-white inline-block"
          >
            Request a Quote
          </Link>
          <a
            href="tel:18773910270"
            className="border border-white/30 text-white px-10 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:border-white hover:bg-white/10 inline-block"
          >
            1-877-391-0270
          </a>
        </div>
      </div>
    </section>
  )
}
