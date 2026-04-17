import Image from "next/image"
import Link from "next/link"
import { HubBadge } from "@/components/ui/HubBadge"

export default function Hero() {
  return (
    <section
      className="bg-[#F6F4F0] flex flex-col md:flex-row"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* ── Left: Content column ── */}
      <div className="flex flex-col justify-center px-8 py-16 sm:px-12 md:px-14 lg:px-20 xl:px-24 md:w-[55%]">
        <HubBadge variant="light" />

        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8C8C8C] mt-3 mb-6 block">
          Vancouver · Victoria · BC Since 2000
        </span>

        <h1 className="font-light tracking-tight text-[#111111] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
          BC&apos;s most
          <br />
          considered
          <br />
          surfaces.
        </h1>

        <hr className="w-12 border-t border-[#C8601A] my-8" />

        <p className="text-[#5A5A5A] max-w-sm text-lg leading-relaxed">
          We install stamped asphalt, decorative coatings, and preformed thermoplastics
          for municipalities, developers, and property owners across the Lower Mainland
          and Vancouver Island.
        </p>

        <div className="flex gap-3 mt-10">
          <Link
            href="/contact"
            className="bg-[#1C2026] text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#C8601A]"
          >
            Request a Quote →
          </Link>
          <Link
            href="/projects"
            className="border border-[#1C2026] text-[#1C2026] px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-[#1C2026] hover:text-white"
          >
            View Our Work
          </Link>
        </div>

        <div className="mt-16 pt-6 border-t border-[#E2DDD8] grid grid-cols-4 gap-6">
          <div>
            <div className="font-bold text-2xl text-[#111111]">500+</div>
            <div className="text-xs text-[#8C8C8C] tracking-wide uppercase mt-1">
              Projects in BC
            </div>
          </div>
          <div>
            <div className="font-bold text-2xl text-[#111111]">25</div>
            <div className="text-xs text-[#8C8C8C] tracking-wide uppercase mt-1">
              Years expertise
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-2xl text-[#111111]">4</div>
            <div className="text-xs text-[#8C8C8C] tracking-wide uppercase mt-1">
              Core services
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-2xl text-[#111111]">2</div>
            <div className="text-xs text-[#8C8C8C] tracking-wide uppercase mt-1">
              Regions served
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Static hero image (desktop) ── */}
      <div className="hidden md:block relative flex-1 min-h-[500px]">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A] z-10" />
        <div className="absolute inset-0 bg-[#EDE9E3]">
          <Image
            src="/images/og-image.jpg"
            alt="Square One Paving — decorative hardscape BC"
            fill
            className="object-cover"
            priority
            sizes="45vw"
          />
        </div>
      </div>

      {/* ── Mobile: Image below content ── */}
      <div
        className="block md:hidden relative w-full bg-[#EDE9E3]"
        style={{ height: "60vw", minHeight: 240, maxHeight: 380 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A] z-10" />
        <Image
          src="/images/og-image.jpg"
          alt="Square One Paving — decorative hardscape BC"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  )
}
