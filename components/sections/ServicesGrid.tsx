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
  // 28 Sept 2026, second image pass (Vern: "more recent images… site
  // wide"): the Mission parking bays, April 2025, crisp grey herringbone at a
  // new building under a big sky. The Victoria town centre job moved to the
  // audience band as its clock-tower plaza frame.
  "stamped-asphalt": {
    src: "/images/applications/parking-lots/mission-parking-bays-and-lot-streetprint-01.jpg",
    alt: "Grey herringbone StreetPrint parking bays in front of a new commercial building in Mission, clouds over the hills beyond",
    caption: "Parking bays, Mission · StreetPrint",
  },
  // 28 Sept 2026 image pass: the Maplewoods fire lane, the strongest
  // StreetBond frame on the record that the home page does not show elsewhere.
  "decorative-coatings": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg",
    alt: "A decorative fire lane in blue StreetBond waves between townhomes at Maplewoods, North Vancouver",
    caption: "Maplewoods Townhomes, North Vancouver · StreetBond",
  },
  // 28 Sept 2026, second image pass: the Beban Park sports crosswalk, March
  // 2024, in place of the 2022 Burnaby greenway frame.
  "preformed-thermoplastic": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2024-03-19-3-28-23-PM-1-scaled.jpg",
    alt: "A sports-themed TrafficPatterns crosswalk across the Beban Park lot in Nanaimo, a soccer ball, a baseball, a golf ball and a bicycle set in green and blue waves",
    caption: "Sports crosswalk, Beban Park, Nanaimo · TrafficPatterns",
  },
  // 2 Oct 2026: the Granville Island frame moved to the vapour band lower
  // on the page (the sunlit copy, Vern's pick), so the card shows the
  // walkway instead; no photograph twice on the home page.
  "vapor-blasting": {
    src: "/images/services/vapor-blasting/walkway-vapour-blasting-01.jpg",
    alt: "Square One stripping a red coating from a public walkway with the vapour blasting rig",
    caption: "Public walkway · coating removal",
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
      {/* 2 Oct 2026 (Vern: "image sections still look too chunky"): four
          across, as the live site set them, each frame a quarter of the
          width instead of half. */}
      <ul data-reveal-group className="grid grid-cols-4 gap-x-7 gap-y-12 max-[900px]:grid-cols-2 max-[900px]:gap-x-6 max-[560px]:grid-cols-1 max-[560px]:gap-y-10">
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
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1280px) 25vw, 300px"
                  href={href}
                />
              )}
              <h3 className="mt-4 text-[22px] leading-[1.15]">
                <Link href={href} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                  {trade}
                </Link>
              </h3>
              <p className="mt-2 max-w-[34ch] text-[15.5px] leading-[1.55] text-ink-body [text-wrap:pretty]">{card?.line ?? service.tagline}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
