import Image from "next/image"
import Link from "next/link"

import { services } from "@/lib/services"

/**
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the card reads.
 * Review round 2: cards go photographic — a real install above each body,
 * matching the mega-menu tile voice. Numerals ride the image as captions.
 * 11 Sept 2026: three application chips and a "Specs" link per card — the
 * hubss.com card carries both; ours did not.
 */
const displayName: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "decorative-coatings": "Decorative coatings",
  "vapor-blasting": "Vapour blasting",
}

/** Three of the things each service is ordered for, and where its specs live. */
const cardMeta: Record<string, { chips: string[]; specs?: { href: string; label: string } }> = {
  "stamped-asphalt": { chips: ["Crosswalks", "Roundabouts", "Driveways"], specs: { href: "/resources#streetprint", label: "StreetPrint specs" } },
  "preformed-thermoplastic": { chips: ["Crosswalks", "School zones", "Logos & art"], specs: { href: "/resources#traffic-patterns", label: "TrafficPatterns specs" } },
  "decorative-coatings": { chips: ["Bike lanes", "Transit", "Parking lots"], specs: { href: "/resources#streetbond", label: "StreetBond specs" } },
  "vapor-blasting": { chips: ["Graffiti", "Marking removal", "Surface prep"] },
}

const cardImage: Record<string, { src: string; alt: string }> = {
  "stamped-asphalt": {
    src: "/images/hero/victoria-ellis-point-walkway-streetprint.jpg",
    alt: "British Cobble StreetPrint walkway at Ellis Point, Victoria",
  },
  "decorative-coatings": {
    src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    alt: "StreetBond multicolour plaza at Joyce Station, Vancouver",
  },
  "preformed-thermoplastic": {
    src: "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
    alt: "Musqueam crosswalk artwork at UBC, Vancouver",
  },
  "vapor-blasting": {
    src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
  },
}

export default function ServicesGrid() {
  return (
    <section id="services" className="section relative overflow-hidden bg-surface">
      <div className="container-1280 relative z-[1]">
        <div data-reveal>
          <div className="eyebrow">
            <span className="eyebrow-num">01</span>What we do
          </div>
          <h2 className="mt-5">Four services, one standard</h2>
        </div>

        <div data-reveal-group className="rail-m mt-10 grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {services.map((service, i) => {
            const img = cardImage[service.slug]
            return (
              <article
                key={service.slug}
                data-reveal
                className="card group flex flex-col overflow-hidden rounded-[2px] border border-hairline bg-surface"
              >
                {img && (
                  <Link
                    href={`/services/${service.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative block aspect-[16/11] overflow-hidden"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 296px"
                      className="object-cover"
                    />
                    <div aria-hidden="true" className="scrim scrim-light" />
                    <div className="caption">{String(i + 1).padStart(2, "0")}</div>
                  </Link>
                )}

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3>{displayName[service.slug] ?? service.name}</h3>

                  <p className="mt-[10px] text-[15px] leading-[1.55] text-ink-body">
                    {service.tagline}
                  </p>

                  {cardMeta[service.slug] && (
                    <ul className="mt-4 flex flex-wrap gap-[6px]">
                      {cardMeta[service.slug].chips.map((chip) => (
                        <li key={chip} className="tag">
                          {chip}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
                    <Link
                      href={`/services/${service.slug}`}
                      className="arrow-link"
                      aria-label={`Explore ${displayName[service.slug] ?? service.name}`}
                    >
                      Explore <span aria-hidden="true">&rarr;</span>
                    </Link>
                    {cardMeta[service.slug]?.specs && (
                      <Link
                        href={cardMeta[service.slug].specs!.href}
                        className="text-[13px] font-semibold text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                        aria-label={cardMeta[service.slug].specs!.label}
                      >
                        Specs
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
