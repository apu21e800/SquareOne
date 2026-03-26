import Image from "next/image"
import Link from "next/link"

const credentials = ["25+ Years", "500+ Projects", "HUB Authorized", "BC & Beyond"]

export default function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-end overflow-hidden">
      {/* Background image with warm dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Decorative stamped asphalt by Square One Paving"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
        {/* Warm orange tint at bottom for brand warmth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D66620]/20 via-transparent to-transparent" />
      </div>

      {/* Main content — bottom-left anchored */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 pb-24 pt-40">
        <p className="text-[#F0A04B] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
          BC&apos;s Surface Specialists
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-6 max-w-3xl">
          Where Every<br />Street Tells<br />a Story.
        </h1>
        <p className="text-white/70 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
          Decorative pavement, surface coatings, and vapor blasting —
          installed by BC&apos;s most experienced HUB applicator since 2000.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact">
            <button className="bg-[#D66620] hover:bg-[#C05A18] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
              Get a Free Quote
            </button>
          </Link>
          <Link href="/projects">
            <button className="border border-white/35 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-sm transition-colors">
              See Our Work
            </button>
          </Link>
        </div>
      </div>

      {/* Credential strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-3 flex gap-8 sm:gap-12 overflow-x-auto">
          {credentials.map((c) => (
            <span key={c} className="text-white/55 text-xs uppercase tracking-[0.18em] whitespace-nowrap font-medium">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
