import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"

/**
 * Who we work with — the persona-routing move, ordered by the business
 * hierarchy (canon, 30 Aug): the people who draw it lead, the people who
 * build it follow, homeowners close.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.4): the three photo cards —
 * image on top, title, one-liner, chip row, arrow — were HUB's persona
 * strip in light mode. The same three, now as hairline rows: the
 * photograph inset with its caption under it, the text beside it, the
 * three things they order as words, one underlined link. Every line is on
 * record: the pattern library, the colour chart, the specification
 * library, the free site walk, Square One's own crews, the warranty split
 * (app/about, app/patterns, app/resources).
 */
// 2 Oct 2026, the client's notes: the audience is the people who buy
// decorative hardscapes for commercial and residential sites, and the
// specifiers' card is not required. Three buyers: the municipality, the
// commercial or strata owner, the homeowner.
const audiences = [
  {
    label: "Municipalities",
    desc: "Crosswalks, intersections, parks and school zones, installed by our own crews.",
    orders: ["Crosswalks", "Streetscapes", "Parks"],
    href: "/applications/crosswalks",
    cta: "Municipal work",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg",
    alt: "Rail ties in tan TrafficPatternsXD thermoplastic set into dark stamped asphalt, the railroad-inspired crosswalk in the City of Langley",
    caption: "City of Langley · TrafficPatternsXD",
    position: "center 60%",
  },
  {
    label: "Commercial and strata",
    desc: "Entries, parking, plazas and laneways: a written quote, our own crews, the workmanship warranted.",
    orders: ["Site walk", "Own crews", "Workmanship warranty"],
    href: "/applications/parking-lots",
    cta: "Commercial work",
    // 28 Sept 2026, second image pass: the Chilliwack turnaround, April
    // 2026, a developer's frontage in herringbone StreetPrint (was the 2023
    // Agnus Green frame).
    image: "/images/applications/roundabouts/chilliwack-circular-turnaround-streetprint-01.jpg",
    alt: "A circular turnaround in charcoal herringbone StreetPrint in front of a new apartment building in Chilliwack",
    caption: "Chilliwack · Circular turnaround · StreetPrint",
    position: "center 60%",
  },
  {
    label: "Homeowners",
    desc: "Brick, cobble or slate, pressed into the driveway you already have.",
    orders: ["Driveways", "Walkways", "Laneways"],
    href: "/driveways",
    cta: "Driveways",
    image: "/images/S1_update_v2/photos/Driveways/Number%204.jpg",
    alt: "A grey ashlar StreetPrint walkway curving through a garden to the house, installed by Square One",
    caption: "Ashlar garden walkway · StreetPrint",
    position: "center 60%",
  },
]

export default function AudienceBand({ tone = "paper" }: { tone?: "paper" | "warm" | "stone" }) {
  // 28 Sept 2026 (Vern: "too much text… cut the fat, make the sale"): the
  // three hairline rows became three columns, a photograph, the name, one
  // line and the way in. The "orders" tags stay in the data for later use.
  return (
    <Section label="Who we work with" title={<>Municipal, commercial, <em>residential</em></>} tone={tone} wide>
      <ul data-reveal-group className="grid grid-cols-3 gap-x-8 gap-y-12 max-[900px]:grid-cols-1" role="list">
        {audiences.map((audience) => (
          <li key={audience.label} data-reveal>
            <Frame
              src={audience.image}
              alt={audience.alt}
              aspect="aspect-[4/5] max-[900px]:aspect-[4/3]"
              sizes="(max-width: 900px) 100vw, 400px"
              position={audience.position}
              href={audience.href}
            />
            <h3 className="mt-5 text-[26px] leading-[1.12]">
              <Link href={audience.href} className="hover:underline hover:decoration-1 hover:underline-offset-[6px]">
                {audience.label}
              </Link>
            </h3>
            <p className="mt-2 max-w-[36ch] text-ink-body [text-wrap:pretty]">{audience.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
