import Link from "next/link"
import Frame from "@/components/ui/Frame"
import { Section, Row } from "@/components/ui/Container"

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
const audiences = [
  {
    label: "Specifiers",
    desc: "Landscape architects and engineers: template sheets, the colour chart, specifications and sample boards at the site walk (what you need to draw it and put it to tender).",
    orders: ["Template sheets", "Colour chart", "Specifications"],
    href: "/specifiers",
    cta: "For specifiers",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg",
    alt: "Rail ties in tan TrafficPatternsXD thermoplastic set into dark stamped asphalt, the railroad-inspired crosswalk in the City of Langley",
    caption: "City of Langley · TrafficPatternsXD",
    position: "center 60%",
  },
  {
    label: "Owners and contractors",
    desc: "Municipalities, developers and general contractors: a site walk, a written quote, installation by Square One's own crews to the published specification, and the workmanship warranted.",
    orders: ["Site walk", "Own crews", "Workmanship warranty"],
    href: "/services",
    cta: "The services",
    image: "/images/applications/crosswalks/richmond-crossing-with-tactile-edge-trafficpatternsxd-01.jpg",
    alt: "A TrafficPatternsXD crossing with a yellow tactile edge between towers in Richmond, installed by Square One",
    caption: "Richmond · TrafficPatternsXD",
    position: "center 55%",
  },
  {
    label: "Homeowners",
    desc: "Stamped asphalt driveways for Vancouver and Victoria homes: brick, cobble and slate patterns pressed into the asphalt you already have.",
    orders: ["Driveways", "Walkways", "Laneways"],
    href: "/driveways",
    cta: "Driveways",
    image: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Grey ashlar slate StreetPrint stamped asphalt driveway in front of a three-car garage, installed by Square One",
    caption: "Ashlar slate · StreetPrint driveway",
    position: "center 70%",
  },
]

export default function AudienceBand() {
  return (
    <Section
      label="Who we work with"
      title="Specifiers, owners, homeowners"
      intro="Whoever the work is for, it gets the same site walk, a written quote and our own crews."
      wide
    >
      <div>
        {audiences.map((audience) => (
          <Row key={audience.label} as="article">
            <Frame
              src={audience.image}
              alt={audience.alt}
              caption={audience.caption}
              aspect="aspect-[4/3]"
              sizes="(max-width: 700px) 100vw, 520px"
              position={audience.position}
              href={audience.href}
            />
            <div>
              <h3>{audience.label}</h3>
              <p className="mt-3 max-w-[48ch] text-ink-body [text-wrap:pretty]">{audience.desc}</p>
              <p className="mt-4">
                {audience.orders.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </p>
              <p className="mt-5">
                <Link href={audience.href} className="link">
                  {audience.cta}
                </Link>
              </p>
            </div>
          </Row>
        ))}
      </div>
    </Section>
  )
}
