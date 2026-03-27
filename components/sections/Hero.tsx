import Image from "next/image"
import Link from "next/link"

const stats = [
  { value: "25+", label: "Years", sub: "Since 2000" },
  { value: "500+", label: "Projects", sub: "Across BC" },
  { value: "HUB", label: "Authorized", sub: "Western Canada" },
  { value: "BC", label: "& Beyond", sub: "Lower Mainland + VI" },
]

export default function Hero() {
  return (
    <section className="bg-[#F4F4F2] flex flex-col md:flex-row min-h-[90vh] items-stretch">

      {/* ── Left: Content column ── */}
      <div className="flex flex-col justify-center px-8 py-16 sm:px-12 md:px-14 lg:px-20 md:max-w-[55%] md:flex-1">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 mb-6 w-fit">
          <span className="bg-[#D66620]/10 text-[#D66620] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
            BC&apos;s Authorized HUB Applicator
          </span>
        </div>

        {/* Display headline */}
        <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black text-[#1A1A1A] leading-[0.92] tracking-tight mb-6">
          Your Surface.<br />
          Our Craft.
        </h1>

        {/* Sub-text */}
        <p className="text-gray-500 text-lg leading-relaxed max-w-sm mb-8">
          Decorative pavement, surface coatings, and vapor blasting —
          BC&apos;s most experienced installer since 2000.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link href="/contact">
            <button className="w-full sm:w-auto bg-[#D66620] hover:bg-[#C05A18] active:bg-[#B04E15] text-white px-6 py-3 rounded-md font-semibold text-sm transition-colors">
              Get a Free Quote
            </button>
          </Link>
          <Link href="/projects">
            <button className="w-full sm:w-auto border border-[#32373C]/20 text-[#32373C] hover:bg-[#32373C]/5 active:bg-[#32373C]/10 px-6 py-3 rounded-md font-semibold text-sm transition-colors">
              See Our Work
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-x-0 gap-y-4">
          {stats.map((stat, i) => (
            <div key={stat.value} className="flex items-center">
              {i > 0 && (
                <span className="mx-4 text-gray-200 text-lg select-none">|</span>
              )}
              <div>
                <p className="text-[#32373C] font-bold text-sm leading-tight">{stat.value} {stat.label}</p>
                <p className="text-gray-400 text-xs leading-tight">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Photo column (desktop only) ── */}
      <div className="hidden md:block relative flex-shrink-0 w-[45%] overflow-hidden">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="Decorative stamped asphalt installation by Square One Paving"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Soft gradient bleed — connects columns */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F2]/30 to-transparent pointer-events-none" />
        {/* Orange left-edge accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D66620]" />
      </div>

      {/* ── Mobile: Photo below text ── */}
      <div className="block md:hidden relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="Decorative stamped asphalt installation by Square One Paving"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

    </section>
  )
}
