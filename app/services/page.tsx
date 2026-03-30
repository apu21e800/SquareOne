import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Pavement Services BC | Square One Paving",
  description:
    "BC's trusted decorative pavement applicator. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapor blasting services across the Lower Mainland and Vancouver Island.",
}

const services = [
  {
    slug: "stamped-asphalt",
    name: "Stamped Asphalt",
    tagline: "Pattern, colour, and texture — built into the asphalt itself.",
    desc: "Custom StreetPrint patterns for crosswalks, driveways, plazas, and roundabouts. Durable, slip-resistant, and designed for BC's climate.",
    image: "/images/products/streetprint/streetprint-1.jpg",
    applications: ["Crosswalks", "Roundabouts", "Driveways", "Commercial Entries"],
    icon: "◈",
    accent: "from-amber-900/60",
  },
  {
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    tagline: "Colour and safety for bike lanes, bus corridors, and parking lots.",
    desc: "StreetBond coatings in dozens of colours — retroreflective, anti-skid, and UV stable. The go-to for Vision Zero infrastructure across BC.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    applications: ["Bike Lanes", "Bus Rapid Transit", "Parking Lots", "School Zones"],
    icon: "◉",
    accent: "from-orange-900/60",
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    tagline: "Precision road markings with no spray drift, no inconsistency.",
    desc: "TrafficPatterns and DecoMark preformed systems for crosswalk markings, custom logos, arrows, and zone graphics. Fast deployment, long service life.",
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
    applications: ["Crosswalk Markings", "School Zones", "Custom Logos", "Stop Bars"],
    icon: "◧",
    accent: "from-stone-900/60",
  },
  {
    slug: "vapor-blasting",
    name: "Vapor Blasting",
    tagline: "Mobile surface prep — clean, safe, and environmentally responsible.",
    desc: "BC's only mobile vapor blasting service. Graffiti removal, road marking removal, and surface prep without silica dust or harsh chemicals.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    applications: ["Road Marking Removal", "Graffiti Removal", "Surface Prep", "Marine"],
    icon: "◌",
    accent: "from-teal-900/60",
    featured: true,
  },
]

export default function ServicesPage() {
  return (
    <main className="bg-[#FAFAFA]">

      {/* Hero header */}
      <section className="bg-white border-b border-[#E8E4DE] pt-28 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.22em] font-semibold mb-3">
            What We Do
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-[#333333] mb-5 max-w-3xl leading-tight">
            Decorative Pavement Services
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed">
            Authorized HUB Surface Systems applicator for BC. From stamped asphalt crosswalks to mobile
            vapor blasting — we bring precision and durability to every surface we touch.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Image with overlay */}
                <div className="relative h-64 overflow-hidden bg-[#F2EFE9]">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.accent} to-transparent`} />
                  {service.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#D66620] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        Square One Exclusive
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/80 text-2xl">{service.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-black text-[#333333] mb-1.5 group-hover:text-[#D66620] transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-[#D66620] text-sm font-semibold mb-4">{service.tagline}</p>
                  <p className="text-[#626262] text-sm leading-relaxed mb-6">{service.desc}</p>

                  {/* Application tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.applications.map((app) => (
                      <span
                        key={app}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#F2EFE9] text-[#626262] font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>

                  <span className="text-[#D66620] text-xs font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-200">
                    Explore This Service →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust band */}
      <div className="bg-[#D66620] py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {["Authorized HUB Surface Systems Applicator", "Serving BC Since 2000", "Free Site Consultations", "Lower Mainland & Vancouver Island"].map((t) => (
            <span key={t} className="text-white text-xs font-semibold uppercase tracking-wider">✓ {t}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-24 px-6 sm:px-8 bg-[#32373C]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F0A04B] text-xs uppercase tracking-[0.22em] font-semibold mb-5">Not Sure Where to Start?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Tell Us About Your Project
          </h2>
          <p className="text-white/75 text-lg mb-10">
            We&apos;ll recommend the right system and give you a free, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-[#D66620] hover:bg-[#C05A18] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">
                Get a Free Consultation
              </span>
            </Link>
            <a href="tel:6043098212">
              <span className="inline-block border border-white/25 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold text-sm transition-colors">
                604-309-8212
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
