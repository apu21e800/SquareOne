"use client"

import Image from "next/image"
import Link from "next/link"

/**
 * DrivewaysBand — split 50/50 layout. Image left (full bleed), content panel right.
 */
export default function DrivewaysBand() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 bg-[#F6F4F0]">
      {/* Image */}
      <div className="relative h-[420px] lg:h-auto lg:min-h-[640px] bg-[#EDE9E3]">
        <Image
          src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
          alt="Stamped asphalt driveway with herringbone pattern"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute left-5 bottom-5 lg:left-8 lg:bottom-8 bg-white/90 backdrop-blur-sm px-4 py-3 max-w-[280px] rounded-lg">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C8601A] font-bold mb-1">Featured Driveway</p>
          <p className="text-[13px] text-[#111111] font-semibold leading-snug">Coastal estate · Bowen Island</p>
          <p className="text-[12px] text-[#5A5A5A] mt-0.5">StreetPrint herringbone, custom border</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-6 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
        <span
          aria-hidden
          className="absolute left-6 lg:left-16 top-0 w-16 h-[3px]"
          style={{ background: "linear-gradient(90deg, #C8601A 0%, #E8895A 100%)" }}
        />
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#C8601A] font-semibold mb-5 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[#C8601A]" />
          Premium Residential
        </p>
        <h2
          className="text-[#111111] max-w-lg"
          style={{
            fontSize: "clamp(2rem, 3.6vw, 3rem)",
            fontWeight: 800,
            lineHeight: 0.97,
            letterSpacing: "-0.04em",
            textWrap: "balance",
          }}
        >
          Your driveway.{" "}
          <span style={{ color: "#C8601A" }}>Reimagined.</span>
        </h2>
        <p className="text-[15px] leading-relaxed text-[#2C2C2C] mt-6 max-w-md">
          From stamped asphalt that echoes the architecture of your home to vapor-blasted surfaces ready for a
          fresh coat — we bring the same municipal-grade precision to residential projects across Metro Vancouver
          and Vancouver Island.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
          {["ASTM D3939 slip-resistant", "20+ year service life", "Snowplow safe", "Custom patterns + colour"].map(
            (spec) => (
              <li key={spec} className="text-[12.5px] text-[#5A5A5A] flex items-start gap-2">
                <span aria-hidden className="inline-block w-1 h-1 bg-[#C8601A] mt-2 flex-shrink-0" />
                {spec}
              </li>
            ),
          )}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/applications/private-driveways"
            className="group inline-flex items-center gap-2 bg-[#C8601A] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[#A84F15] transition-colors rounded-lg"
          >
            See Driveway Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#C8601A] text-[#C8601A] px-6 py-3.5 text-sm font-semibold hover:bg-[#C8601A]/5 transition-colors rounded-lg"
          >
            Get a Quote
          </Link>
        </div>
        <p className="mt-7 text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: "#767676" }}>
          <span aria-label="Five stars">★★★★★</span> &nbsp; Metro Vancouver · Victoria · Vancouver Island
        </p>
      </div>
    </section>
  )
}
