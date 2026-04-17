"use client"

import Image from "next/image"
import Link from "next/link"
import { HubBadge } from "@/components/ui/HubBadge"

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">

      {/* ── Left column: Content (55%) ── */}
      <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-20 xl:px-24 md:w-[55%] bg-white">

        <HubBadge variant="light" />

        <div className="mt-6 mb-8">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
            Vancouver · Victoria · BC Since 2000
          </span>
        </div>

        <h1 className="font-light text-[#111111] leading-[1.05] tracking-[-0.03em] mb-8"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}>
          BC's most<br />
          considered<br />
          surfaces.
        </h1>

        {/* Thin orange rule */}
        <div className="w-12 h-[1px] bg-[#C8601A] mb-8" />

        <p className="text-[#5A5A5A] text-lg leading-relaxed max-w-sm mb-10">
          We install stamped asphalt, decorative coatings, and preformed thermoplastics
          for municipalities, developers, and discerning property owners
          across the Lower Mainland and Vancouver Island.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/contact">
            <button className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#C8601A] w-full sm:w-auto">
              Request a Quote →
            </button>
          </Link>
          <Link href="/projects">
            <button className="border border-[#1C2026] text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#1C2026] hover:text-white w-full sm:w-auto">
              View Our Work
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E2DDD8]">
          <div>
            <div className="text-2xl font-semibold text-[#111111]">500+</div>
            <div className="text-xs text-[#8C8C8C] mt-1">Projects installed in BC</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-[#111111]">25</div>
            <div className="text-xs text-[#8C8C8C] mt-1">Years of specialized expertise</div>
          </div>
          <div className="hidden md:block">
            <div className="text-2xl font-semibold text-[#111111]">4</div>
            <div className="text-xs text-[#8C8C8C] mt-1">Core services, one studio</div>
          </div>
          <div className="hidden md:block">
            <div className="text-2xl font-semibold text-[#111111]">2</div>
            <div className="text-xs text-[#8C8C8C] mt-1">Regions: Lower Mainland & Island</div>
          </div>
        </div>
      </div>

      {/* ── Right column: Image (45%) ── */}
      <div className="relative md:w-[45%] min-h-[400px] md:min-h-0">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="Decorative stamped asphalt installation by Square One Paving"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        {/* Orange left-edge accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A]" />
      </div>

    </section>
  )
}
