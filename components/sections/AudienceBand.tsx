import Image from "next/image"
import Link from "next/link"

/**
 * Audience band — the hubss.com persona-routing move, ordered by the
 * business hierarchy (canon, 30 Aug): municipal/commercial owners lead,
 * homeowners close. Carries no ghost-index — like StatsBar and
 * EditorialBand it sits between the numbered content sections.
 * White surface: keeps the warm/white alternation between Stats (warm)
 * and Editorial (warm).
 */
const audiences = [
  {
    label: "Cities & municipalities",
    desc: "Crosswalks, transit lanes, plazas and parks — specified to survive tenders, plows and BC winters.",
    href: "/applications",
    cta: "See municipal work",
    image: "/images/applications/crosswalks/victoria-bastion-square-crosswalk-trafficpatternsxd-01.jpg",
    alt: "TrafficPatternsXD crosswalk at Bastion Square, Victoria",
  },
  {
    label: "Commercial & strata",
    desc: "Parking areas, retail thresholds and strata surfaces that keep their colour under daily traffic.",
    href: "/applications",
    cta: "See commercial work",
    image: "/images/applications/parking-lots/victoria-hillside-mall-crosswalk-streetprint-01.jpg",
    alt: "StreetPrint crosswalk at Hillside Mall, Victoria",
  },
  {
    label: "Homeowners",
    desc: "Stamped driveways for Victoria and Vancouver homes — brick, cobble and slate, over the asphalt you already have.",
    href: "/driveways",
    cta: "Explore driveways",
    image: "/images/applications/driveways/victoria-craigdarroch-castle-driveway-streetprint-01.jpg",
    alt: "Stamped asphalt driveway at Craigdarroch Castle, Victoria",
  },
]

export default function AudienceBand() {
  return (
    <section className="section bg-surface">
      <div className="container-1280">
        <div data-reveal>
          <p className="eyebrow">Who we build for</p>

          <h2 className="mt-5">Three kinds of owner, one standard of work</h2>
        </div>

        <div data-reveal-group className="mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {audiences.map((audience) => (
            <Link
              key={audience.label}
              href={audience.href}
              data-reveal
              className="card group flex flex-col overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={audience.image}
                  alt={audience.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, (max-width: 1280px) 33vw, 411px"
                  className="object-cover"
                />
                <div aria-hidden className="scrim scrim-light" />
              </div>

              <div className="flex flex-1 flex-col p-7 pt-6 max-[700px]:p-6">
                <h3>{audience.label}</h3>

                <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                  {audience.desc}
                </p>

                <span className="arrow-link mt-auto pt-6">
                  {audience.cta}{" "}
                  <span aria-hidden="true" className="group-hover:translate-x-1">
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
