import Image from "next/image"
import Link from "next/link"

const stats = [
  { number: "500+", label: "Projects" },
  { number: "25", label: "Years" },
  { number: "2", label: "Regions" },
  { number: "4", label: "Services" },
]

export default function Hero() {
  return (
    <section className="bg-white w-full" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-full">
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-16 md:py-20">
          <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-5">
            Vancouver · Victoria · BC Since 2000
          </p>

          <h1
            className="text-[#111111] mb-0"
            style={{
              fontWeight: 300,
              fontFamily: "var(--font-inter), sans-serif",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
            }}
          >
            BC&apos;s most considered surfaces.
          </h1>

          <div className="w-12 h-[3px] bg-[#C8601A] my-6" />

          <p className="text-lg font-light text-[#5A5A5A] max-w-sm leading-relaxed">
            We install stamped asphalt, decorative coatings, and preformed thermoplastics
            for municipalities, developers, and discerning property owners across the Lower
            Mainland and Vancouver Island.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Link href="/contact">
              <button className="w-full sm:w-auto bg-[#1C2026] hover:bg-black text-white px-7 py-3.5 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                Request a Quote
              </button>
            </Link>
            <Link href="/projects">
              <button className="w-full sm:w-auto border border-[#1C2026] text-[#1C2026] hover:bg-[#1C2026] hover:text-white px-7 py-3.5 text-sm font-semibold tracking-[0.08em] uppercase rounded-none transition-colors">
                View Our Work
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6 border-t border-[#E2DDD8] mt-12 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-[#111111] leading-none mb-2">{stat.number}</p>
                <p className="text-xs uppercase tracking-wide text-[#8C8C8C]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[400px] md:min-h-0">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A] z-10" />
          <Image
            src="/images/hero/hero-1.jpg"
            alt="Decorative pavement installation by Square One Paving"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  )
}
