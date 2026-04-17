import Link from "next/link"

export default function CTASection() {
  return (
    <section className="w-full py-24 bg-[#C8601A]">
      <div className="max-w-3xl mx-auto px-6 text-center">

        <h2 className="text-white font-light mb-6">
          Ready to transform your surface?
        </h2>

        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          We work with municipalities, developers, strata corporations,
          and private property owners across Greater Vancouver and Vancouver Island.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="bg-white text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#F6F4F0] w-full sm:w-auto">
              Request a Quote
            </button>
          </Link>
          <a href="tel:18773910270">
            <button className="border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:border-white hover:bg-white/10 w-full sm:w-auto">
              1-877-391-0270
            </button>
          </a>
        </div>

      </div>
    </section>
  )
}
