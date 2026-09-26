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
 * on the service pages and under Specifiers. Later the same day the four
 * photograph blocks came out too ("garish, take up too much space") — the
 * row is four columns of type on one rule, a 72px thumbnail each.
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

        {/* Four columns of type on one rule — no photograph blocks (Vern,
            19 Sept: "the 4 big image blocks… are garish, take up too much
            space"). The applications index above already carries the
            photographs; this row carries the words. Each column is one
            left edge: a small frame from the record, the trade, the verb, one
            line, and the link on a shared bottom rule. 21 Sept 2026: it used to
            set the thumbnail beside the heading and the paragraph beneath it,
            so every card had two left edges and the four verbs sat at
            different heights — Vern, "looks like a jumble of text". */}
        <ol data-reveal-group className="mt-12 grid grid-cols-4 gap-x-8 border-t border-hairline max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {services.map((service) => {
            const img = cardImage[service.slug]
            const card = CARD[service.slug]
            const href = `/services/${service.slug}`
            return (
              <li key={service.slug} data-reveal className="group relative flex flex-col border-b border-hairline py-7 max-[900px]:py-6">
                <Link href={href} aria-label={`${card?.trade ?? service.name} — the service`} className="absolute inset-0 z-[2]" />
                {img && (
                  <span className="thumb relative block aspect-[16/10] w-[96px] shrink-0 overflow-hidden rounded-[2px] bg-surface-stone">
                    <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                )}
                {/* "Preformed thermoplastic" is the one name long enough to
                    wrap, and it is not shortened — the trade is called what it
                    is. Between 900 and 1024 the four columns are narrow enough
                    that it takes two lines, so the label reserves two there and
                    the four verbs stay on one baseline; above 1024 every name
                    fits on one line and the reserve would only be dead air. */}
                <div className="label mt-5 block min-h-0 max-[900px]:mt-4 min-[900px]:min-h-[2.8em] min-[1024px]:min-h-0">
                  {card?.trade ?? service.name}
                </div>
                <h3 className="mt-[2px] transition-colors group-hover:text-[color:var(--accent-deep)]">
                  {card?.verb ?? service.name}
                </h3>
                <p className="mt-[10px] text-[15px] leading-[1.6] text-ink-body [text-wrap:pretty]">
                  {card?.line ?? service.tagline}
                </p>
                <span aria-hidden="true" className="arrow-link mt-auto inline-flex gap-[0.35em] pt-6">
                  The service <span>&rarr;</span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
