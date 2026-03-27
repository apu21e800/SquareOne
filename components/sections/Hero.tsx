import Image from "next/image"
import Link from "next/link"

const pills = [
  "25+ Years Experience",
  "500+ Projects Installed",
  "HUB Authorized Applicator",
  "Lower Mainland + Vancouver Island",
]

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row bg-[#F2EFE9] overflow-hidden">
      {/* LEFT — warm cream content column */}
      <div className="order-last lg:order-first lg:w-[55%] flex flex-col justify-center px-12 py-20 sm:py-28 lg:py-0">
        {/* Eyebrow */}
        <p className="text-[#D66620] text-xs font-semibold uppercase tracking-[0.2em] mb-5">
          BC&apos;s Most Trusted Applicator Since 2000
        </p>

        {/* H1 */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#333333] leading-[1.05] mb-6">
          Surface Excellence,<br />Installed.
        </h1>

        {/* Subtext */}
        <p className="text-[#626262] text-lg leading-relaxed max-w-md mb-10">
          Decorative pavement, surface coatings, and vapor blasting — installed
          by BC&apos;s most experienced HUB applicator since 2000.
        </p>

        {/* CTAs */}
        <div className="flex flex-row flex-wrap gap-4">
          <Link
            href="/contact"
            className="bg-[#D66620] hover:bg-[#C05A18] text-white px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-colors"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/projects"
            className="border-2 border-[#333333]/20 text-[#333333] hover:border-[#D66620] hover:text-[#D66620] px-7 py-3.5 rounded-lg font-semibold text-sm transition-colors"
          >
            See Our Work
          </Link>
        </div>

        {/* Credential pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          {pills.map((pill) => (
            <span
              key={pill}
              className="bg-white border border-[#E8E4DE] text-[#626262] text-xs font-medium px-4 py-2 rounded-full"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — cinematic image column */}
      <div className="order-first lg:order-last lg:w-[45%] h-[50vw] min-h-[260px] lg:h-auto relative overflow-hidden">
        {/* Orange corner accent (top-right) */}
        <div className="absolute top-0 right-0 z-10 w-16 h-16 bg-[#D66620] rounded-bl-[32px]" />

        {/* Inner wrapper with left rounded edge on desktop */}
        <div className="absolute inset-0 lg:rounded-l-[32px] overflow-hidden">
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="Decorative stamped asphalt"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
