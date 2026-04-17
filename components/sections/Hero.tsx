import Link from "next/link"
import Image from "next/image"

const stats = [
  { number: "500+", label: "Projects" },
  { number: "25",   label: "Years" },
  { number: "2",    label: "Regions" },
  { number: "4",    label: "Services" },
]

export default function Hero() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-8">
              Vancouver · Victoria · BC Since 2000
            </p>

            <h1 className="text-[#111111]">
              BC&apos;s most<br />
              considered<br />
              surfaces.
            </h1>

            <span className="block w-12 h-[3px] bg-[#C8601A] my-7" />

            <p className="text-[#5A5A5A] text-lg font-light max-w-md leading-relaxed">
              We install stamped asphalt, decorative coatings, and preformed thermoplastics
              for municipalities, developers, and discerning property owners
              across the Lower Mainland and Vancouver Island.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center bg-[#1C2026] text-white px-8 py-4 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#111111] transition-colors"
              >
                Request a Quote →
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center border border-[#1C2026] text-[#1C2026] px-8 py-4 text-xs font-semibold tracking-[0.08em] uppercase hover:bg-[#1C2026] hover:text-white transition-colors"
              >
                View Our Work
              </Link>
            </div>

            <div className="border-t border-[#E2DDD8] mt-14 pt-8 grid grid-cols-4 gap-4 max-w-lg">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-[#111111] tracking-[-0.02em]">{s.number}</div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-[#8C8C8C] mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: image with orange edge ── */}
          <div className="relative">
            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8601A] z-10" />
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#EDE9E3]">
              <Image
                src="/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg"
                alt="Estate herringbone driveway — West Vancouver"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
