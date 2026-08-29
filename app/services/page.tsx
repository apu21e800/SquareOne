import Image from "next/image"
import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Decorative Pavement Services BC | Square One Paving",
  description:
    "BC's trusted decorative pavement applicator. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapour blasting services across the Lower Mainland and Vancouver Island.",
}

/**
 * Display copy only. Slugs and image paths are unchanged — "vapor-blasting"
 * stays the route, "Vapour blasting" is what the card reads.
 */
const services = [
  {
    num: "01",
    slug: "stamped-asphalt",
    name: "Stamped asphalt",
    tagline: "Pattern, colour, and texture — built into the asphalt itself.",
    desc: "Custom StreetPrint patterns for crosswalks, driveways, plazas, and roundabouts. Durable, slip-resistant, and designed for BC's climate.",
    image: "/images/products/streetprint/streetprint-1.jpg",
    applications: ["Crosswalks", "Roundabouts", "Driveways", "Commercial Entries"],
    featured: false,
  },
  {
    num: "02",
    slug: "decorative-coatings",
    name: "Decorative coatings",
    tagline: "Colour and safety for bike lanes, bus corridors, and parking lots.",
    desc: "StreetBond coatings in dozens of colours — retroreflective, anti-skid, and UV stable. The go-to for Vision Zero infrastructure across BC.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    applications: ["Bike Lanes", "Bus Rapid Transit", "Parking Lots", "School Zones"],
    featured: false,
  },
  {
    num: "03",
    slug: "preformed-thermoplastic",
    name: "Preformed thermoplastic",
    tagline: "Precision road markings with no spray drift, no inconsistency.",
    desc: "TrafficPatterns and DecoMark preformed systems for crosswalk markings, custom logos, arrows, and zone graphics. Fast deployment, long service life.",
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
    applications: ["Crosswalk Markings", "School Zones", "Custom Logos", "Stop Bars"],
    featured: false,
  },
  {
    num: "04",
    slug: "vapor-blasting",
    name: "Vapour blasting",
    tagline: "Mobile surface prep — clean, safe, and environmentally responsible.",
    desc: "BC's only mobile vapour blasting service. Graffiti removal, road marking removal, and surface prep without silica dust or harsh chemicals.",
    image: "/images/products/streetbond/streetbond-1.jpg",
    applications: ["Road Marking Removal", "Graffiti Removal", "Surface Prep", "Marine"],
    featured: true,
  },
]

const facts = [
  "BC decorative pavement studio",
  "Serving BC since 2000",
  "Free site consultations",
  "Lower Mainland & Vancouver Island",
]

export default function ServicesPage() {
  const total = String(services.length).padStart(2, "0")

  return (
    <main className="bg-[color:var(--surface)]">
      {/* ---- Header — full-bleed image band (Rockstar Part 4) ---- */}
      <IndexImageHero
        src="/images/hero/granville-island-crosswalk-streetprint.jpg"
        alt="Decorative stamped asphalt crosswalk at Granville Island, Vancouver"
        eyebrow="What we do"
        title="Four services, one standard"
        lede="Stamped asphalt, decorative coatings, preformed thermoplastic and mobile vapour blasting — installed by the same crews across the Lower Mainland and Vancouver Island since 2000."
        caption="Granville Island · StreetPrint"
        imagePosition="center 70%"
      />

      {/* ---- The four services ---- */}
      <section
        aria-labelledby="services-heading"
        className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]"
      >
        <h2 id="services-heading" className="sr-only">
          All services
        </h2>

        <div className="container-1280">
          <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card group flex flex-col overflow-hidden border border-[color:var(--hairline)] bg-[color:var(--surface)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-stone)]">
                  <Image
                    src={service.image}
                    alt={`${service.name} — Square One Paving`}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 616px"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="scrim scrim-light" />
                </div>

                <div className="flex flex-1 flex-col p-8 max-[700px]:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="label">
                      {service.num} / {total}
                    </span>
                    {service.featured && <span className="tag">Square One exclusive</span>}
                  </div>

                  <h3 className="mt-5">{service.name}</h3>

                  <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                    {service.tagline}
                  </p>

                  <p className="mt-4 text-[15px] leading-[1.6] text-[color:var(--ink-muted)]">
                    {service.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.applications.map((application) => (
                      <span key={application} className="tag">
                        {application}
                      </span>
                    ))}
                  </div>

                  <span className="arrow-link mt-auto pt-8">
                    Explore service{" "}
                    <span aria-hidden="true" className="group-hover:translate-x-[4px]">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Fact strip ---- */}
      <section className="border-t border-[color:var(--hairline)] bg-[color:var(--surface-stone)] py-7">
        <div className="container-1280 flex flex-wrap justify-center gap-x-12 gap-y-3">
          {facts.map((fact) => (
            <span key={fact} className="label">
              {fact}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
