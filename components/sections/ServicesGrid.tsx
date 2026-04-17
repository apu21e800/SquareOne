import Image from "next/image"
import Link from "next/link"

const services = [
  {
    slug: "stamped-asphalt",
    eyebrow: "01 · Service",
    name: "Stamped Asphalt",
    desc: "StreetPrint patterns that transform asphalt into architectural pavement.",
    image: "/images/products/streetprint/streetprint-1.jpg",
    dark: false,
  },
  {
    slug: "decorative-coatings",
    eyebrow: "02 · Service",
    name: "Decorative Coatings",
    desc: "Colour systems engineered for BC's freeze-thaw climate.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    dark: false,
  },
  {
    slug: "preformed-thermoplastic",
    eyebrow: "03 · Service",
    name: "Thermoplastic Markings",
    desc: "Precision markings for municipalities and developers.",
    image: "/images/products/trafficpatterns/trafficpatterns-1.jpg",
    dark: false,
  },
  {
    slug: "vapor-blasting",
    eyebrow: "04 · Signature",
    name: "Vapor Blasting",
    desc: "BC's most advanced surface preparation.",
    image: "/images/applications/commercial-spaces/granville-island-installation-crew-01.jpg",
    dark: true,
  },
]

export default function ServicesGrid() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14 lg:mb-20 max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C8601A] font-medium mb-6">
            What We Do
          </p>
          <h2 className="text-[#111111]">
            Four services.<br />
            One studio.
          </h2>
        </div>

        {/* 2×2 grid */}
        <div className="grid md:grid-cols-2 gap-px bg-[#E2DDD8]">
          {services.map((s) => {
            const href = s.slug === "vapor-blasting" ? "/vapor-blasting" : `/services/${s.slug}`
            return (
              <Link
                key={s.slug}
                href={href}
                className={`group relative block ${s.dark ? "bg-[#1C2026]" : "bg-white"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE9E3]">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className={`p-8 lg:p-10 ${s.dark ? "text-white" : "text-[#111111]"}`}>
                  <p className={`text-[10px] tracking-[0.2em] uppercase font-medium mb-4 ${s.dark ? "text-[#C8601A]" : "text-[#C8601A]"}`}>
                    {s.eyebrow}
                  </p>
                  <h3 className={`text-2xl lg:text-3xl font-light tracking-[-0.02em] mb-3 ${s.dark ? "text-white" : "text-[#111111]"}`}>
                    {s.name}
                  </h3>
                  <p className={`text-[15px] leading-relaxed max-w-sm ${s.dark ? "text-white/70" : "text-[#5A5A5A]"}`}>
                    {s.desc}
                  </p>
                  <span className={`inline-flex items-center gap-2 mt-6 text-[11px] tracking-[0.15em] uppercase font-semibold ${s.dark ? "text-[#C8601A]" : "text-[#C8601A]"} group-hover:gap-3 transition-all`}>
                    Explore →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
