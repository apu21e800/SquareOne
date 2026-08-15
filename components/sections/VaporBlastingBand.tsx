import Image from "next/image"
import Link from "next/link"

const features: string[] = [
  "Driveways & estate exteriors",
  "Graffiti & storefront refresh",
  "Heritage stone restoration",
  "Industrial steel & marine",
  "Pre-coating substrate prep",
  "Parking-lot stripe removal",
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export default function VaporBlastingBand() {
  return (
    <section className="relative w-full grid grid-cols-1 md:grid-cols-[42%_58%] bg-[#0A0A0A] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(242,100,48,0.10) 0%, transparent 50%)" }} />

      <div className="relative bg-transparent px-8 py-20 md:px-12 md:py-24 lg:px-20 lg:py-32 flex flex-col justify-center order-2 md:order-1">
        <div className="flex items-center gap-3 mb-7">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430] pulse-dot" />
          <span className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-[#FF8A5C]">Mobile Surface Restoration</span>
        </div>

        <h2 className="text-white display-h mb-7" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}>
          The cleanest way<br />
          <span className="italic font-extralight">to restore</span><br />
          a surface.
        </h2>

        <p className="text-white/70 text-[15px] leading-[1.7] mb-10 max-w-md font-normal">
          Dustless abrasive blasting &mdash; water and recycled glass at calibrated pressure. We strip
          decades of grime, graffiti, and oxidation without silica dust, surface scarring, or harsh
          chemicals. Mobile across BC, specified by municipalities since 2000.
        </p>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-12 text-[13px] text-white/85">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="text-[#F26430] flex-shrink-0 mt-0.5" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Link href="/services/vapor-blasting">
          <span className="group inline-flex items-center gap-3 border border-white/25 text-white px-8 py-4 font-semibold text-[12px] tracking-[0.18em] uppercase transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0A0A0A]">
            Explore Vapor Blasting<ArrowRight />
          </span>
        </Link>
      </div>

      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[680px] order-1 md:order-2 overflow-hidden">
        <Image
          src="/images/products/streetbond/streetbond-cobble-macro-surface-01.jpg"
          alt="Mobile surface restoration substrate — Square One Paving"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-transparent to-[rgba(10,10,10,0.55)] hidden md:block" />
        <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[rgba(10,10,10,0.45)] to-transparent md:hidden" />

        {/* Dustless USP chip — top-left */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">&lt; 5% Airborne Dust</span>
        </div>

        {/* Location chip — bottom-right */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-[#F26430]" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-white font-semibold">Mobile across BC</span>
        </div>

        {/* Method chip — top-right */}
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-[rgba(10,10,10,0.65)] backdrop-blur-md px-3.5 py-2">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/85 font-semibold">Water + Recycled Glass</span>
        </div>
      </div>
    </section>
  )
}
