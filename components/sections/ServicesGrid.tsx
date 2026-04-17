import Image from "next/image"
import Link from "next/link"

type Service = {
  slug: string
  name: string
  eyebrow: string
  desc: string
  image: string
  dark?: boolean
}

const services: Service[] = [
  {
    slug: "stamped-asphalt",
    name: "Stamped Asphalt",
    eyebrow: "Pattern & Texture",
    desc: "Custom-patterned asphalt for crosswalks, driveways, and plazas.",
    image: "/images/services/stamped-asphalt/hero.jpg",
  },
  {
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    eyebrow: "Colour & Contrast",
    desc: "Colour-fast coatings for bike lanes, transit corridors, and parking lots.",
    image: "/images/services/decorative-coatings/hero.jpg",
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    eyebrow: "Precision Markings",
    desc: "Thermoplastic crosswalks, logos, and regulatory markings.",
    image: "/images/services/preformed-thermoplastic/hero.jpg",
  },
  {
    slug: "vapor-blasting",
    name: "Vapor Blasting",
    eyebrow: "Signature Service",
    desc: "Wet-abrasive surface restoration and marking removal across BC.",
    image: "/images/services/vapor-blasting/hero.jpg",
    dark: true,
  },
]

const serviceLink = (slug: string) =>
  slug === "vapor-blasting" ? "/vapor-blasting" : `/services/${slug}`

export default function ServicesGrid() {
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="max-w-2xl mb-14">
          <p className="text-[#C8601A] text-xs uppercase tracking-[0.22em] font-semibold mb-4">
            What We Do
          </p>
          <h2
            className="text-[#111111]"
            style={{
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
            }}
          >
            Four services. One studio.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={serviceLink(service.slug)}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-[#E2DDD8] bg-[#F6F4F0]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 45vw"
                />
              </div>

              <div
                className={`border-x border-b border-[#E2DDD8] p-6 sm:p-8 ${
                  service.dark ? "bg-[#1C2026]" : "bg-white"
                }`}
              >
                <p
                  className={`text-xs uppercase tracking-[0.18em] font-semibold mb-3 ${
                    service.dark ? "text-[#C8601A]" : "text-[#C8601A]"
                  }`}
                >
                  {service.eyebrow}
                </p>
                <h3
                  className={`mb-3 ${service.dark ? "text-white" : "text-[#111111]"}`}
                  style={{ fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.3 }}
                >
                  {service.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    service.dark ? "text-white/65" : "text-[#5A5A5A]"
                  }`}
                >
                  {service.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-[#C8601A] text-xs font-semibold uppercase tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-200">
                  Explore
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
