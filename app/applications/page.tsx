import Image from "next/image"
import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Applications | Decorative Pavement Across BC",
  description:
    "Decorative paving and vapour blasting for driveways, commercial spaces, crosswalks, bike lanes, parks and public art across BC. Square One Paving — Lower Mainland and Vancouver Island.",
  alternates: {
    canonical: "https://squareonepaving.ca/applications",
  },
}

// ─── Data ───

type AppCard = {
  title: string
  tag: string
  desc: string
  image: string
  alt: string
  cta: string
  href: string
}

const applications: AppCard[] = [
  {
    title: "Driveways",
    tag: "Residential",
    desc: "Stamped asphalt and StreetBond coatings for the entrance you use every day — brick, cobble and slate patterns for Victoria and Vancouver homes.",
    image: "/images/applications/driveways/victoria-craigdarroch-castle-driveway-streetprint-01.jpg",
    alt: "Stamped asphalt driveway at Craigdarroch Castle, Victoria",
    cta: "Explore driveways",
    href: "/driveways",
  },
  {
    title: "Commercial spaces",
    tag: "Commercial",
    desc: "Plazas, retail thresholds and strata surfaces that bring order and identity to large paved sites — built for coastal BC weather.",
    image: "/images/applications/commercial-spaces/little-italy-aerial-colourful-intersection-01.jpg",
    alt: "Little Italy intersection in Vancouver, from above",
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Crosswalks",
    tag: "Municipal",
    desc: "Decorative and high-visibility crossings in preformed thermoplastic or stamped asphalt — from Bastion Square to Maple Ridge.",
    image: "/images/applications/crosswalks/victoria-bastion-square-crosswalk-trafficpatternsxd-01.jpg",
    alt: "TrafficPatternsXD crosswalk at Bastion Square, Victoria",
    cta: "See the work",
    href: "/projects",
  },
  {
    title: "Bus & bike lanes",
    tag: "Municipal",
    desc: "Red and green priority-lane surfacing that holds its colour under daily traffic, plows and weather.",
    image: "/images/products/premark/premark-north-vancouver-green-bike-lane-01.jpg",
    alt: "Green PreMark bike lane in North Vancouver",
    cta: "See the work",
    href: "/projects",
  },
  {
    title: "Parking areas",
    tag: "Commercial",
    desc: "Decorative thresholds, stall markings and accessible-space graphics for retail, strata and multi-family lots.",
    image: "/images/applications/parking-lots/victoria-hillside-mall-crosswalk-streetprint-01.jpg",
    alt: "StreetPrint crosswalk at Hillside Mall, Victoria",
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Parks, paths & walkways",
    tag: "Municipal",
    desc: "Greenways, park paths and pedestrian routes with pattern and colour underfoot — slip-resistant finishes throughout.",
    image: "/images/applications/parks-paths/coquitlam-sheffield-park-01.jpg",
    alt: "Decorative pavement path at Sheffield Park, Coquitlam",
    cta: "See the work",
    href: "/projects",
  },
  {
    title: "Public art",
    tag: "Civic",
    desc: "Artist-designed pavement — First Nations artwork, murals and community pieces rendered durably in the road surface.",
    image: "/images/applications/public-art/sechelt-rainbow-crosswalk-trafficpatterns-01.jpg",
    alt: "Rainbow crosswalk in Sechelt",
    cta: "See the work",
    href: "/projects",
  },
  {
    title: "Traffic calming & roundabouts",
    tag: "Municipal",
    desc: "Raised crossings, speed tables and roundabout aprons that slow traffic while looking like streetscape, not hardware.",
    image: "/images/applications/roundabouts/surrey-roundabout-streetbond-01.jpg",
    alt: "StreetBond-coated roundabout in Surrey",
    cta: "See the work",
    href: "/projects",
  },
  {
    title: "Vapour blasting",
    tag: "All surfaces",
    desc: "Mobile wet-abrasive restoration for pavement, brick, concrete and steel — no silica dust, no substrate damage.",
    image: "/images/services/vapor-blasting/walkway-vapour-blasting-01.jpg",
    alt: "Walkway during vapour blasting by Square One",
    cta: "Learn about vapour blasting",
    href: "/vapor-blasting",
  },
]

const credentials = [
  "Serving BC since 2000",
  "BC's decorative pavement studio",
  "Lower Mainland & Vancouver Island",
  "Free site consultations",
]

// ─── Page ───

/**
 * Applications index — rebuilt in review round 1 (31 Aug 2026).
 *
 *   Header       IndexImageHero (h1 scale, top scrim — no nav collision)
 *   Listing      9 edge-to-edge photo cards, tag caption on image     warm
 *   Credentials  quiet hairline row                                   white
 *   Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * Cards are photographic edge to edge — no padded frame around the image.
 * Every photograph is a named, verified BC install.
 */
export default function ApplicationsPage() {
  return (
    <main>
      <IndexImageHero
        src="/images/hero/white-rock-marine-drive-wave-crosswalk.jpg"
        alt="Wave-motif decorative crosswalk on Marine Drive, White Rock"
        eyebrow="Applications"
        title="Where these systems are specified"
        lede="From residential driveways to commercial parking areas — decorative pavement systems and vapour blasting, applied across British Columbia."
        caption="White Rock · TrafficPatternsXD"
        imagePosition="center 78%"
      >
        <div className="mt-9">
          <Link href="/contact" className="btn-primary">
            Request a quote
          </Link>
        </div>
      </IndexImageHero>

      {/* Application cards — photographic, edge to edge */}
      <section className="section border-t border-b border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <div className="grid grid-cols-1 gap-6 min-[701px]:grid-cols-3">
            {applications.map((app) => (
              <Link
                key={app.title}
                href={app.href}
                className="card group flex flex-col overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-[color:var(--surface)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={app.image}
                    alt={app.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 400px"
                    className="object-cover"
                  />
                  <div aria-hidden className="scrim scrim-light" />
                  <div className="caption">{app.tag}</div>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3>{app.title}</h3>

                  <p className="mt-[10px] text-[15px] leading-[1.55] text-[color:var(--ink-body)]">
                    {app.desc}
                  </p>

                  <span className="arrow-link mt-auto pt-6">
                    {app.cta}{" "}
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

      {/* Credentials */}
      <section className="section bg-[color:var(--surface)]">
        <div className="container-1280">
          <div className="flex flex-wrap gap-x-10 gap-y-3 border-t border-[color:var(--hairline)] pt-6">
            {credentials.map((c) => (
              <span key={c} className="text-[13px] font-medium text-[color:var(--ink-muted)]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
