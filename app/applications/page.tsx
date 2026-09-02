import Image from "next/image"
import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Applications | Decorative Pavement Across BC",
  description:
    "Decorative paving for crosswalks, commercial spaces, bike lanes, parks and public art across BC — plus residential driveways and vapour blasting. Square One Paving — Lower Mainland and Vancouver Island.",
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

const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"

/* Card order is the business hierarchy: municipal and commercial work leads,
   residential driveways follow, vapour blasting closes as the extra service.
   Every photograph is Square One's own, from a named BC install. */
const applications: AppCard[] = [
  {
    title: "Crosswalks",
    tag: "Municipal",
    desc: "Decorative and high-visibility crossings in preformed thermoplastic and stamped asphalt — from Bastion Square to a school zone in Surrey.",
    image: `${FIO}/UBC-crosswalk-3-300dpi.jpg`,
    alt: "UBC and Musqueam crosswalk in TrafficPatterns, University Boulevard, Vancouver",
    cta: "See the work",
    href: "/applications/crosswalks",
  },
  {
    title: "Streetscapes",
    tag: "Municipal",
    desc: "Intersections, medians, lanes and civic frontages where the surface carries the design — pattern imprinted, colour that holds.",
    image: `${FIO}/Photo-2023-05-19-5-56-47%E2%80%AFPM-scaled%20%281%29.jpg`,
    alt: "Blue StreetBond decorative fire lane at Maplewoods Townhomes, North Vancouver",
    cta: "See the work",
    href: "/applications/streetscapes",
  },
  {
    title: "Roundabouts & traffic calming",
    tag: "Municipal",
    desc: "Truck aprons, splitter islands, speed tables and raised crossings that slow traffic while looking like streetscape, not hardware.",
    image: "/images/applications/roundabouts/surrey-roundabout-streetbond-01.jpg",
    alt: "StreetBond-coated median and roundabout in Surrey",
    cta: "See the work",
    href: "/applications/roundabouts",
  },
  {
    title: "Parking lots",
    tag: "Commercial",
    desc: "Thresholds, walkways and crosswalks that organise retail, strata and institutional lots — and tie a site to its branding.",
    image: `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`,
    alt: "Red brick StreetPrint walkway across the parking lot at Ralph's Farm Market, Langley",
    cta: "See the work",
    href: "/applications/parking-lots",
  },
  {
    title: "Parks & paths",
    tag: "Municipal",
    desc: "Greenways, park walkways, plazas and spray parks with colour and pattern underfoot — slip-resistant finishes throughout.",
    image: `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`,
    alt: "StreetBond 150 public art walkway at Snug Cove, Bowen Island",
    cta: "See the work",
    href: "/applications/parks-paths",
  },
  {
    title: "Schools & sports courts",
    tag: "Institutional",
    desc: "Sports courts, school-zone crossings, sensory pathways and labyrinths — surfaces that take hundreds of kids a day.",
    image: `${FIO}/StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg`,
    alt: "StreetBond sports court at Brookmere Park, Coquitlam",
    cta: "See the work",
    href: "/applications/schools-sports-courts",
  },
  {
    title: "Bike lanes",
    tag: "Municipal",
    desc: "Green bike lanes and red priority lanes in PreMark thermoplastic and MMAX coatings — colour that survives sweepers and winter grit.",
    image: `${FIO}/Photo-2024-07-04-10-58-08-AM-scaled.jpg`,
    alt: "Red brick stamped asphalt multi-use path with bike lane markings",
    cta: "See the work",
    href: "/applications/bike-lanes",
  },
  {
    title: "Public art",
    tag: "Civic",
    desc: "Artist-designed pavement — First Nations artwork, community murals and memorial plazas rendered durably in the road surface.",
    image: `${FIO}/Langley-event-3-2048x1536.jpg`,
    alt: "Circle of Life artwork in StreetBond at Langley Events Centre",
    cta: "See the work",
    href: "/applications/public-art",
  },
  {
    title: "Branding & wayfinding",
    tag: "Commercial",
    desc: "Logos, legends and decals heat-fused into the pavement for campuses, retail centres and civic sites.",
    image: `${FIO}/Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
    alt: "Oak-leaf DecoMark decals on an asphalt sidewalk at Reunion, Murrayville, Langley",
    cta: "See the work",
    href: "/applications/branding-wayfinding",
  },
  {
    title: "Driveways",
    tag: "Residential",
    desc: "Stamped asphalt and StreetBond coatings for the entrance you use every day — brick, cobble and slate patterns for Victoria and Vancouver homes.",
    image: "/images/applications/driveways/saanich-ten-mile-point-driveway-streetprint-01.jpg",
    alt: "Stamped asphalt driveway at Ten Mile Point, Saanich",
    cta: "Explore driveways",
    href: "/driveways",
  },
  {
    title: "Vapour blasting",
    tag: "Extra service",
    desc: "Surface cleaning, priming, graffiti and mould removal — mobile wet-abrasive restoration with up to 92% less dust than dry blasting.",
    image: "/images/services/vapor-blasting/walkway-vapour-blasting-01.jpg",
    alt: "Walkway during vapour blasting by Square One",
    cta: "Learn about vapour blasting",
    href: "/services/vapor-blasting",
  },
]

const credentials = [
  "Serving BC since 2000",
  "Installer of HUB Surface Systems products",
  "Lower Mainland & Vancouver Island",
  "Free site consultations",
]

// ─── Page ───

/**
 * Applications index — rebuilt in review round 1 (31 Aug 2026).
 * Card order set to the business hierarchy in round 5: commercial first,
 * driveways second-to-last as the residential anchor, vapour closes.
 *
 *   Header       IndexImageHero (h1 scale, top scrim — no nav collision)
 *   Listing      11 edge-to-edge photo cards, tag caption on image    warm
 *   Credentials  quiet hairline row                                   white
 *   Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * Cards are photographic edge to edge — no padded frame around the image.
 * Every photograph is Square One's own, from a named BC install; each card
 * opens the application's gallery (lib/work.ts) — driveways to the pillar,
 * vapour to its service page.
 */
export default function ApplicationsPage() {
  return (
    <main>
      <IndexImageHero
        src="/images/hero/white-rock-marine-drive-wave-crosswalk.jpg"
        alt="Wave-motif decorative crosswalk on Marine Drive, White Rock"
        eyebrow="Applications"
        title="Where the work lives"
        lede="Crosswalks in Vancouver, plazas and parking lots across the Lower Mainland, driveways in Victoria — the same systems, specified for the way BC actually uses its streets."
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
