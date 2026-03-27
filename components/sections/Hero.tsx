import Image from "next/image"
import Link from "next/link"

const credentials = ["25+ Years", "500+ Projects", "HUB Authorized", "BC & Beyond"]

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Decorative stamped asphalt by Square One Paving"
          fill
          className="object-cover"
          priority
        />
        {/* Strong gradient — dark at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        {/* Warm orange tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D66620]/15 via-transparent to-transparent" />
      </div>

      {/* ── Content wrapper — full height, text anchored to bottom ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12">

          {/* Text block */}
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.25em] font-semibold mb-4 text-shadow-sm">
            BC&apos;s Surface Specialists
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-5 max-w-3xl">
            BC&apos;s Surface<br />Specialists. Built<br />for Communities.
          </h1>
          <p
            className="text-white/90 text-base sm:text-xl max-w-xl mb-8 leading-relaxed"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
          >
            Decorative pavement, surface coatings, and vapor blasting —
            installed by BC&apos;s most experienced HUB applicator since 2000.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-20 sm:pb-24">
            <Link href="/contact">
              <button className="w-full sm:w-auto bg-[#D66620] hover:bg-[#C05A18] active:bg-[#B04E15] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Get a Free Quote
              </button>
            </Link>
            <Link href="/projects">
              <button className="w-full sm:w-auto border border-white/40 text-white hover:bg-white/10 active:bg-white/20 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
                See Our Work
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Credential strip — pinned to absolute bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/55 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-3 flex gap-6 sm:gap-12 overflow-x-auto scrollbar-none">
          {credentials.map((c) => (
            <span
              key={c}
              className="text-white/85 text-xs uppercase tracking-[0.18em] whitespace-nowrap font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
