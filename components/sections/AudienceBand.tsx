import Image from "next/image"
import Link from "next/link"

/**
 * Audience band — the hubss.com persona-routing move, ordered by the
 * business hierarchy (canon, 30 Aug): municipal/commercial owners lead,
 * homeowners close. Carries no ghost-index — like StatsBar and
 * EditorialBand it sits between the numbered content sections.
 *
 * Rebuilt 11 Sept 2026 (Vern: the photo-plus-white-box cards were "the
 * last generic thing on the page"). Each owner is now one tall photograph
 * with the promise, three of the things they actually order, and the way
 * in — the same voice as the mega-menu tiles, at band scale. Every
 * photograph is from the record and at least 2000px wide.
 */
const audiences = [
  {
    label: "Cities & municipalities",
    desc: "Crosswalks, transit lanes, plazas and parks — specified to survive tenders, plows and BC winters.",
    chips: ["Crosswalks", "Transit lanes", "Parks & plazas"],
    href: "/applications",
    cta: "See municipal work",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg",
    alt: "Railroad-inspired TrafficPatternsXD crosswalk in the City of Langley, installed by Square One",
    caption: "City of Langley · TrafficPatternsXD",
    position: "center 60%",
  },
  {
    label: "Commercial & strata",
    desc: "Parking areas, retail thresholds and strata lanes that keep their colour under daily traffic.",
    chips: ["Parking lots", "Entrances", "Strata lanes"],
    href: "/applications/parking-lots",
    cta: "See commercial work",
    image: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2023-09-29-4-48-15%E2%80%AFPM-1-scaled.jpg",
    alt: "Ashlar slate StreetPrint laneway at a townhome development, installed by Square One",
    caption: "Townhome laneway · StreetPrint",
    position: "center 55%",
  },
  {
    label: "Homeowners",
    desc: "Stamped driveways for Victoria and Vancouver homes — brick, cobble and slate, over the asphalt you already have.",
    chips: ["Driveways", "Walkways", "Patios"],
    href: "/driveways",
    cta: "Explore driveways",
    image: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Ashlar slate StreetPrint driveway installed by Square One",
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
            <p className="eyebrow">Who we build for</p>
            <h2 className="mt-5">Three kinds of owner, one standard of work</h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-[1.6] text-ink-muted">
            Same crews, same manufacturer&rsquo;s specification, whether the job is a transit
            corridor or a forty-foot driveway.
          </p>
        </div>

        <div data-reveal-group className="rail-m mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {audiences.map((audience) => (
            <Link
              key={audience.label}
              href={audience.href}
              data-reveal
              className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-surface-stone max-[900px]:aspect-[16/10] max-[560px]:aspect-[4/5]"
            >
              <Image
                src={audience.image}
                alt={audience.alt}
                fill
                sizes="(max-width: 900px) 100vw, (max-width: 1280px) 33vw, 411px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: audience.position }}
              />
              <div aria-hidden className="scrim-rise" />

              {/* The caption sits top-right, small, like a contact-sheet label */}
              <span className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/75" style={{ fontFamily: "var(--font-display)" }}>
                {audience.caption}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-7 max-[700px]:p-5">
                <h3 className="text-[22px] leading-[1.15] text-white max-[700px]:text-[20px]">{audience.label}</h3>
                <p className="mt-3 max-w-[40ch] text-[14.5px] leading-[1.55] text-white/85">{audience.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {audience.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-[2px] border border-white/25 bg-white/10 px-[9px] py-[4px] text-[11.5px] font-semibold tracking-[0.04em] text-white backdrop-blur-[2px]"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {audience.cta}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
