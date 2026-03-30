import Link from "next/link"

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-[#32373C] relative overflow-hidden">
      {/* Subtle orange accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D66620] via-[#F0A04B] to-transparent" />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
          Let&apos;s Work Together
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
          Ready to Build<br />Something That Lasts?
        </h2>
        <p className="text-white/75 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Free consultation for your next BC surface project.
          Municipal, commercial, or residential — we&apos;ll come to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors w-full sm:w-auto">
              Request a Quote
            </button>
          </Link>
          <a href="tel:18773910270">
            <button className="border border-white/40 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors w-full sm:w-auto">
              1-877-391-0270
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
