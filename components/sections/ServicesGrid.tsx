import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { services } from "@/lib/services"

/**
 * What we do — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.6): the four
 * services as four hairline rows, no cards, no arrows; the heading in the
 * margin column beside them. Each row is the trade, its verb as the small
 * voice, one plain line, and a frame from the record inset at the left.
 *
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the row reads.
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
  // 19 Sept 2026: every frame is from the record (lib/work-captions.ts),
  // none of them repeated in the hero reel or in Selected work below.
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
    <Section
      id="services"
      label="What we do"
      title="Three ways we change a surface, and one way we clean it"
      link={{ href: "/services", label: "All services" }}
    >
      <ol>
        {services.map((service) => {
          const img = cardImage[service.slug]
          const card = CARD[service.slug]
          const href = `/services/${service.slug}`
          return (
            <li key={service.slug} className="row row-compact relative">
              <Link href={href} aria-label={`${card?.trade ?? service.name} — the service`} className="absolute inset-0 z-[2]" />
              {img ? <Frame src={img.src} alt="" aspect="aspect-[3/2]" sizes="132px" /> : <span />}
              <div className="min-w-0">
                <span className="label">{card?.verb ?? ""}</span>
                <h3 className="mt-1">{card?.trade ?? service.name}</h3>
                <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                  {card?.line ?? service.tagline}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
