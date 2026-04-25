import Image from "next/image"
import Link from "next/link"

export default function VaporBlastingBand() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-[40%_60%]">

      {/* Left: Dark content panel */}
      <div className="bg-[#1C2026] px-8 py-16 md:px-12 md:py-20 lg:px-16 flex flex-col justify-center order-2 md:order-1">

        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8601A]">
          Exclusive Capability
        </span>

        <h2 className="mt-6 mb-6 text-white font-light">
          Surface restoration<br />
          nobody else in BC<br />
          does better.
        </h2>

        <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
          Vapor blasting uses a pressurised mix of water and fine abrasive media to
          clean and restore surfaces with zero heat stress. The result: factory-fresh
          texture with no media embedment. We brought this technology to BC because
          we believe preparation is as important as installation.
        </p>

        {/* Feature list - 2 columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 text-sm text-white/80">
          <div className="flex items-start gap-2">
            <span className="text-[#C8601A] flex-shrink-0">✓</span>
            <span>Concrete &amp; stone restoration</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C8601A] flex-shrink-0">✓</span>
            <span>Pre-coating preparation</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C8601A] flex-shrink-0">✓</span>
            <span>Industrial equipment cleaning</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C8601A] flex-shrink-0">✓</span>
            <span>Heritage surface work</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C8601A] flex-shrink-0">✓</span>
            <span>Patio &amp; hardscape refresh</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#C8601A] flex-shrink-0">✓</span>
            <span>Automotive &amp; marine</span>
          </div>
        </div>

        <Link href="/vapor-blasting">
          <button className="border border-white/30 text-white px-8 py-4 font-semibold text-sm tracking-[0.08em] uppercase transition-colors duration-200 hover:border-white hover:bg-white/10">
            Learn About Vapor Blasting →
          </button>
        </Link>
      </div>

      {/* Right: Image */}
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[600px] order-1 md:order-2">
        <Image
          src="/images/services/vapor-blasting/hero.jpg"
          alt="Vapor blasting surface restoration by Square One Paving"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

    </section>
  )
}
