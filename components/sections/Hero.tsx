import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-end pb-20 overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Decorative pavement installation in British Columbia"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
      </div>

      {/* Main content — bottom-left anchored */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full">
        <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
          BC's Surface Specialists Since 2000
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-6 max-w-3xl">
          Where Every<br />Street Tells<br />a Story.
        </h1>
        <p className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed">
          Decorative pavement, surface coatings, and vapor blasting —
          installed by BC&apos;s most experienced HUB authorized applicator.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact">
            <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors w-full sm:w-auto">
              Get a Quote
            </button>
          </Link>
          <Link href="/projects">
            <button className="border border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-sm transition-colors w-full sm:w-auto">
              See Our Work
            </button>
          </Link>
        </div>
      </div>

      {/* Credential strip pinned to very bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-3 flex gap-10 overflow-x-auto scrollbar-hide">
          {["25+ Years Experience", "500+ BC Projects", "HUB Authorized Applicator", "Lower Mainland & Vancouver Island"].map((s) => (
            <span key={s} className="text-white/55 text-xs uppercase tracking-widest whitespace-nowrap font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
