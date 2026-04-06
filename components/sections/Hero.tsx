import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-[#F4F4F2] flex flex-col md:flex-row min-h-[92vh] items-stretch">

      {/* ── Left: Content column ── */}
      <div className="flex flex-col justify-center px-8 py-20 sm:px-12 md:px-14 lg:px-20 md:max-w-[58%] md:flex-1">

        {/* Eyebrow — Hero archetype: lead with capability, not supplier badge */}
        <div className="inline-flex items-center gap-2.5 mb-7 w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D66620]" />
          <span className="text-[#D66620] text-xs font-bold uppercase tracking-[0.2em]">
            BC&apos;s Leading Decorative Pavement Installer
          </span>
        </div>

        {/* Display headline */}
        <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-black text-[#1A1A1A] leading-[0.92] tracking-tight mb-7">
          We Build<br />
          <span className="text-[#D66620]">Surfaces</span><br />
          That Last.
        </h1>

        {/* Sub-text */}
        <p className="text-[#626262] text-lg leading-relaxed max-w-[420px] mb-10">
          Stamped asphalt, decorative coatings, preformed thermoplastics,
          and vapor blasting — installed by BC&apos;s most experienced crew
          since 2000. Municipal. Commercial. Residential.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <Link href="/contact">
            <button className="w-full sm:w-auto bg-[#D66620] hover:bg-[#C05A18] active:bg-[#B04E15] text-white px-7 py-3.5 rounded-md font-bold text-sm tracking-wide transition-colors">
              Request a Quote
            </button>
          </Link>
          <Link href="/services">
            <button className="w-full sm:w-auto border border-[#32373C]/20 text-[#32373C] hover:bg-[#32373C]/5 active:bg-[#32373C]/10 px-7 py-3.5 rounded-md font-semibold text-sm transition-colors">
              Our Services
            </button>
          </Link>
        </div>

        {/* Service scan pills — quick orientation for municipal decision makers */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Stamped Asphalt", href: "/services/stamped-asphalt" },
            { label: "Decorative Coatings", href: "/services/decorative-coatings" },
            { label: "Thermoplastic Markings", href: "/services/preformed-thermoplastic" },
            { label: "Vapor Blasting", href: "/services/vapor-blasting" },
            { label: "Driveways", href: "/driveways" },
          ].map((s) => (
            <Link key={s.label} href={s.href}>
              <span className="text-xs font-semibold text-[#626262] border border-[#32373C]/12 bg-white hover:border-[#D66620]/40 hover:text-[#D66620] px-3 py-1.5 rounded-full transition-colors">
                {s.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Right: Photo column (desktop) ── */}
      <div className="hidden md:block relative flex-shrink-0 w-[42%] overflow-hidden">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="Decorative stamped asphalt crosswalk installation — Square One Paving, BC"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Soft gradient bleed */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F2]/25 to-transparent pointer-events-none" />
        {/* Orange left-edge accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#D66620] via-[#F0A04B] to-[#D66620]/40" />

        {/* Floating credential */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/60 shadow-lg max-w-[210px]">
          <p className="text-[#D66620] text-[10px] font-bold uppercase tracking-widest mb-1">Since 2000</p>
          <p className="text-[#1A1A1A] font-black text-sm leading-tight">500+ Projects Across BC</p>
          <p className="text-[#626262] text-xs mt-1">Lower Mainland · Vancouver Island</p>
        </div>
      </div>

      {/* ── Mobile: Photo below text ── */}
      <div className="block md:hidden relative w-full aspect-[16/9] overflow-hidden">
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
