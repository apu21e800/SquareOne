import Image from "next/image"
import Link from "next/link"

import { services } from "@/lib/services"

/**
 * What we do — streamlined 19 Sept 2026 (Vern, on the four cards: "seems
 * overwhelming. this is too much to digest for the average user. we need to
 * streamline"). The earlier card carried a name, the service tagline, three
 * application chips, an Explore link and a Specs link — five things to read
 * per card, twenty across the row. Now each card is one verb, one trade and
 * one plain line, and the heading tells the visitor how to hold the four:
 * three ways we change a surface, and one way we clean it. The specs live
 * on the service pages and under Specifiers.
 *
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the card reads.
 * Order is the business order (lib/services.ts).
 */
const CARD: Record<string, { verb: string; trade: string; line: string }> = {
  "stamped-asphalt": {
    verb: "Pattern it",
    trade: "Stamped asphalt",
    line: "Brick, cobble or slate, pressed into the asphalt that is already there.",
  },
  "decorative-coatings": {
    verb: "Colour it",
    trade: "Decorative coatings",
    line: "Bike lanes, plazas, spray parks and courts, in colour that holds under traffic.",
  },
  "preformed-thermoplastic": {
    verb: "Mark it",
    trade: "Preformed thermoplastic",
    line: "Crosswalks, symbols and street art, cut to the drawing and fused into the road.",
  },
  "vapor-blasting": {
    verb: "Clean it",
    trade: "Vapour blasting",
    line: "Graffiti, old markings and grime lifted wet, with no damage to the surface under them.",
  },
}

const cardImage: Record<string, { src: string; alt: string }> = {
  // 19 Sept 2026: every tile is a frame from the record (lib/work-captions.ts),
  // none of them repeated in the hero reel or in Selected Work below.
  "stamped-asphalt": {
    src: "/images/applications/streetscapes/victoria-town-centre-crossing-streetprint-01.jpg",
    alt: "A red brick StreetPrint town centre crossing between trees in Victoria",
  },
  "decorative-coatings": {
    src: "/images/applications/public-art/north-vancouver-lynn-valley-plaza-streetbond-01.jpg",
    alt: "Lynn Valley plaza, North Vancouver — a red StreetBond field with black and white line art",
  },
  "preformed-thermoplastic": {
    src: "/images/applications/public-art/burnaby-union-street-thunderbird-decomark-01.jpg",
    alt: "A DecoMark thunderbird on the Union Street greenway in Burnaby, seen from above",
  },
  "vapor-blasting": {
    src: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
  },
}

export default function ServicesGrid() {
  return (
    <section id="services" className="section relative overflow-hidden bg-surface">
      <div className="container-1280 relative z-[1]">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-num">02</span>What we do
            </div>
            <h2 className="mt-5 max-w-[22ch] [text-wrap:balance]">
              Three ways we change a surface, and one way we clean it
            </h2>
          </div>
          <Link href="/services" className="arrow-link whitespace-nowrap">
            All services <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div data-reveal-group className="rail-m mt-12 grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {services.map((service, i) => {
            const img = cardImage[service.slug]
            const card = CARD[service.slug]
            const href = `/services/${service.slug}`
            return (
              <article
                key={service.slug}
                data-reveal
                className="card group relative flex flex-col overflow-hidden rounded-[2px] bg-surface"
              >
                <Link href={href} aria-label={`${card?.trade ?? service.name} — the service`} className="absolute inset-0 z-[2]" />

                {img && (
                  <div className="relative block aspect-[16/11] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 296px"
                      className="object-cover"
                    />
                    <div aria-hidden="true" className="scrim scrim-light" />
                    <div className="caption">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                )}

                <div className="flex flex-1 flex-col border-b border-hairline pt-5 pb-6">
                  <div className="label">{card?.trade ?? service.name}</div>
                  <h3 className="mt-2 transition-colors group-hover:text-[color:var(--accent-deep)]">{card?.verb ?? service.name}</h3>

                  <p className="mt-[10px] text-[15px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                    {card?.line ?? service.tagline}
                  </p>

                  <span aria-hidden="true" className="arrow-link mt-auto pt-6">
                    The service <span>&rarr;</span>
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
