import Image from "next/image"
import Link from "next/link"

/**
 * Audience band — the persona-routing move, ordered by the business
 * hierarchy (canon, 30 Aug): municipal/commercial owners lead, homeowners
 * close. Carries no ghost-index — like StatsBar and
 * EditorialBand it sits between the numbered content sections.
 *
 * Rebuilt 11 Sept 2026 (Vern: the photo-plus-white-box cards were "the
 * last generic thing on the page"). Each owner is now one tall photograph
 * with the promise, three of the things they actually order, and the way
 * in — the same voice as the mega-menu tiles, at band scale. Every
 * photograph is from the record and at least 2000px wide.
 *
 * 16 Sept 2026 — the copy block used to be absolutely positioned at the
 * foot of a fixed aspect-ratio card. Below 900px the card became short and
 * wide while the copy stayed the same height, so the block overflowed the
 * top of the card, collided with the contact-sheet label and was clipped by
 * overflow-hidden (Vern's screenshot: "weird overlapping text on these
 * cards"). The card is now a flex column with a min-height: it keeps the
 * tall look when copy is short and grows when it is not. A fixed aspect box
 * with absolutely positioned copy inside it is the bug — do not reintroduce.
 *
 * 19 Sept 2026 (evening ruling: the site sells the service, to specifiers)
 * — specifier-first. The people who draw it lead, the people who build it
 * follow, homeowners close. The Langley crosswalk stays on the first card
 * (a design drawn, then installed as drawn); the second card's townhome
 * laneway gave way to the Spirit Trail crossing in West Vancouver with the
 * crew on site, because that card is about crews and keeping a road open.
 * Every line is on record: the pattern library, the colour chart, the
 * specification library, the free site walk, Square One's own crews, the
 * warranty split (app/about, app/patterns, app/resources).
 */
const audiences = [
  {
    label: "Specifiers",
    desc: "Landscape architects and engineers: template sheets, the colour chart, specifications and sample boards at the site walk — what you need to draw it and put it to tender.",
    chips: ["Template sheets", "Colour chart", "Specifications"],
    href: "/specifiers",
    cta: "For specifiers",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg",
    alt: "Rail ties in tan TrafficPatternsXD thermoplastic set into dark stamped asphalt — the railroad-inspired crosswalk in the City of Langley",
    caption: "City of Langley · TrafficPatternsXD",
    position: "center 60%",
  },
  {
    label: "Owners & contractors",
    desc: "Municipalities, developers and general contractors: a site walk, a written quote, installation by Square One's own crews to the published specification, and the workmanship warranted.",
    chips: ["Site walk", "Own crews", "Workmanship warranty"],
    href: "/services",
    cta: "See the services",
    image: "/images/applications/crosswalks/richmond-crossing-with-tactile-edge-trafficpatternsxd-01.jpg",
    alt: "A TrafficPatternsXD crossing with a yellow tactile edge between towers in Richmond, installed by Square One",
    caption: "Richmond · TrafficPatternsXD",
    position: "center 55%",
  },
  {
    label: "Homeowners",
    desc: "Stamped asphalt driveways for Vancouver and Victoria homes — brick, cobble and slate patterns pressed into the asphalt you already have.",
    chips: ["Driveways", "Walkways", "Laneways"],
    href: "/driveways",
    cta: "Explore driveways",
    image: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Grey ashlar slate StreetPrint stamped asphalt driveway in front of a three-car garage, installed by Square One",
    caption: "Ashlar slate · StreetPrint driveway",
    position: "center 70%",
  },
]

export default function AudienceBand() {
  return (
    <section className="section bg-surface">
      <div className="container-1280">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Who we work for</p>
            <h2 className="mt-5">Specifiers, owners, homeowners</h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted">
            Drawings and specifications for the people who draw it, a site walk and a written
            quote for the people who build it, and the same crews and the same published
            specification for a forty-foot driveway &mdash; across the Lower Mainland and
            Vancouver Island.
          </p>
        </div>

        <div data-reveal-group className="rail-m mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {audiences.map((audience) => (
            <Link
              key={audience.label}
              href={audience.href}
              data-reveal
              className="card group flex flex-col overflow-hidden rounded-[2px] border border-hairline bg-surface"
            >
              {/* 19 Sept 2026 (Vern: "make sure all text is readable if it's on
                  images, or find a better solution"). The better solution: the
                  photograph is the top of the card and carries only its
                  caption; every word sits on the solid panel below it. No
                  scrim has to win against a busy frame. */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-stone">
                <Image
                  src={audience.image}
                  alt={audience.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, (max-width: 1280px) 33vw, 411px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: audience.position }}
                />
                <div aria-hidden className="scrim scrim-light" />
                <div className="caption">{audience.caption}</div>
              </div>

              <div className="flex flex-1 flex-col p-7 max-[700px]:p-5">
                <h3 className="text-[22px] leading-[1.15] text-ink max-[700px]:text-[20px]">{audience.label}</h3>
                <p className="mt-3 max-w-[40ch] text-[14.5px] leading-[1.55] text-ink-body">{audience.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {audience.chips.map((chip) => (
                    <li key={chip} className="tag">
                      {chip}
                    </li>
                  ))}
                </ul>
                <span className="arrow-link mt-auto pt-6">
                  {audience.cta} <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
