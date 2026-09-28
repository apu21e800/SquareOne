import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { services } from "@/lib/services"

/**
 * What we do. Display copy per service: the verb, the trade, one line.
 *
 * Display copy only. Routes and slugs come from lib/services.ts untouched —
 * "vapor-blasting" stays the slug, "Vapour blasting" is what the row reads.
 * Order is the business order (lib/services.ts).
 */
const CARD: Record<string, { verb: string; trade: string; line: string }> = {
  "stamped-asphalt": {
    verb: "Pattern it",
    trade: "Stamped asphalt",
    line: "Brick, cobble or slate, pressed into the asphalt already there.",
  },
  "decorative-coatings": {
    verb: "Colour it",
    trade: "Decorative coatings",
    line: "Colour for bike lanes, plazas, spray parks and courts.",
  },
  "preformed-thermoplastic": {
    verb: "Mark it",
    trade: "Preformed thermoplastic",
    line: "Crosswalks, symbols and street art, fused into the road.",
  },
  "vapor-blasting": {
    verb: "Clean it",
    trade: "Vapour blasting",
    line: "Graffiti, old markings and grime, lifted wet.",
  },
}

const cardImage: Record<string, { src: string; alt: string; caption: string }> = {
  // 19 Sept 2026: every frame is from the record (lib/work-captions.ts),
  // none of them repeated in the hero reel or in Selected work below. The
  // captions say what the alt text already said: the place and the system.
  "stamped-asphalt": {
    src: "/images/applications/streetscapes/victoria-town-centre-crossing-streetprint-01.jpg",
    alt: "A red brick StreetPrint town centre crossing between trees in Victoria",
    caption: "Town centre crossing, Victoria · StreetPrint",
  },
  "decorative-coatings": {
    src: "/images/applications/public-art/north-vancouver-lynn-valley-plaza-streetbond-01.jpg",
    alt: "Lynn Valley plaza, North Vancouver: a red StreetBond field with black and white line art",
    caption: "Lynn Valley plaza, North Vancouver · StreetBond",
  },
  "preformed-thermoplastic": {
    src: "/images/applications/public-art/burnaby-union-street-thunderbird-decomark-01.jpg",
    alt: "A DecoMark thunderbird on the Union Street greenway in Burnaby, seen from above",
    caption: "Union Street greenway, Burnaby · DecoMark",
  },
  "vapor-blasting": {
    src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
    alt: "Square One crew vapour blasting at Granville Island",
    caption: "Granville Island · vapour blasting",
  },
}

/**
 * 27 Sept 2026 (Vern: "service oriented… make it pop"): the four services
 * lead the page, straight after the reel, as four large frames two by two,
 * each with its caption under it, then the trade and one line (28 Sept:
 * "cut the fat", the verb label and the repeated link came off; the frame
 * and the name are the links).
 * Square corners, no box, no chips, no arrow: HUB's services are three-up
 * rounded cards with a chip row and "Specs →"; these are photographs with
 * words under them.
 */
export default function ServicesGrid() {
  return (
    <Section
      id="services"
      label="What we do"
      title={<>Three ways we change a surface, <em>and one way we clean it</em></>}
      link={{ href: "/services", label: "All services" }}
      wide
    >
      <ul data-reveal-group className="grid grid-cols-2 gap-x-10 gap-y-14 max-[700px]:grid-cols-1 max-[700px]:gap-y-11">
        {services.map((service) => {
          const img = cardImage[service.slug]
          const card = CARD[service.slug]
          const href = `/services/${service.slug}`
          const trade = card?.trade ?? service.name
          return (
            <li key={service.slug} data-reveal>
              {img && (
                <Frame
                  src={img.src}
                  alt={img.alt}
                  aspect="aspect-[16/10]"
                  sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 620px"
                  href={href}
                />
              )}
              <h3 className="mt-5 text-[30px] leading-[1.1] max-[700px]:text-[24px]">
                <Link href={href} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                  {trade}
                </Link>
              </h3>
              <p className="mt-2 max-w-[46ch] text-ink-body [text-wrap:pretty]">{card?.line ?? service.tagline}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
