import Image from "next/image"
import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Decorative Pavement Applications in BC",
  description:
    clampDescription("Decorative pavement across BC — crosswalks, streetscapes, parking lots, parks, schools, bike lanes, public art and driveways in stamped asphalt and coatings."),
  alternates: {
    canonical: `${SITE_URL}/applications`,
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
   Every photograph is Square One's own, from a named BC install, and every
   place a card names is in the record (lib/work.ts, lib/projects.ts). */
const applications: AppCard[] = [
  {
    title: "Crosswalks",
    tag: "Municipal",
    desc: "Decorative and high-visibility crosswalks in preformed thermoplastic and StreetPrint stamped asphalt — from the rainbow intersection in Nanaimo to a school crossing in Surrey.",
    image: `${FIO}/UBC-crosswalk-3-300dpi.jpg`,
    alt: "UBC and Musqueam crosswalk in TrafficPatterns preformed thermoplastic, University Boulevard, Vancouver",
    cta: "See the work",
    href: "/applications/crosswalks",
  },
  {
    title: "Streetscapes",
    tag: "Municipal",
    desc: "Intersections, medians, laneways and civic forecourts where the surface carries the design — pattern pressed into the asphalt, StreetBond colour on top. Victoria's town centre to a strata lane in Squamish.",
    image: `${FIO}/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg`,
    alt: "Blue StreetBond decorative fire lane at Maplewoods Townhomes, North Vancouver",
    cta: "See the work",
    href: "/applications/streetscapes",
  },
  {
    title: "Roundabouts & traffic calming",
    tag: "Municipal",
    desc: "Roundabout aprons, traffic islands, medians and calming devices in stamped asphalt — snowplow safe, and part of the street rather than hardware bolted onto it.",
    image: "/images/applications/roundabouts/surrey-roundabout-streetbond-01.jpg",
    alt: "StreetBond-coated median and roundabout in Surrey",
    cta: "See the work",
    href: "/applications/roundabouts",
  },
  {
    title: "Parking lots",
    tag: "Commercial",
    desc: "Thresholds, walkways and crosswalks that organise retail, strata and commercial lots — Ralph's Farm Market in Langley to Hillside Mall in Victoria.",
    image: `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`,
    alt: "Red brick StreetPrint stamped asphalt walkway across the parking lot at Ralph's Farm Market, Murrayville, Langley",
    cta: "See the work",
    href: "/applications/parking-lots",
  },
  {
    title: "Parks & paths",
    tag: "Municipal",
    desc: "Greenways, park walkways, plazas and spray parks with StreetBond colour and stamped pattern underfoot — anti-skid, and recoated rather than rebuilt.",
    image: `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`,
    alt: "StreetBond 150 coated community walkway at Snug Cove, Bowen Island",
    cta: "See the work",
    href: "/applications/parks-paths",
  },
  {
    title: "Schools & sports courts",
    tag: "Institutional",
    desc: "Sports courts, school crosswalks, sensory pathways, play markings and a labyrinth — surfaces built to hold up to recess and rain.",
    image: `${FIO}/StreetBond-Sports-Court-Brookmere-Park-Coquitlam-BC.jpg`,
    alt: "StreetBond coated sports court at Brookmere Park, Coquitlam",
    cta: "See the work",
    href: "/applications/schools-sports-courts",
  },
  {
    title: "Bike lanes",
    tag: "Municipal",
    desc: "Green bike lanes in PreMark thermoplastic and red bus priority lanes in StreetBond — colour that holds under buses, bikes and BC winters.",
    image: `${FIO}/Photo-2024-07-04-10-58-08-AM-scaled.jpg`,
    alt: "Red brick StreetPrint stamped asphalt multi-use path with bike lane markings",
    cta: "See the work",
    href: "/applications/bike-lanes",
  },
  {
    title: "Public art",
    tag: "Civic",
    desc: "Artist-designed pavement — First Nations artwork, community murals and commemorative plazas rendered in thermoplastic and StreetBond, from Granville Street to Oak Bay.",
    image: `${FIO}/Langley-event-3-2048x1536.jpg`,
    alt: "'Circle of Life' by Drew and Elinor Atkins in StreetBond at Langley Events Centre, Langley",
    cta: "See the work",
    href: "/applications/public-art",
  },
  {
    title: "Branding & wayfinding",
    tag: "Commercial",
    desc: "Logos, wayfinding symbols and decals heat-fused into the pavement for schools, retail centres and civic sites — Little Italy on Commercial Drive to Tsawwassen Commons.",
    image: `${FIO}/Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
    alt: "Oak-leaf DecoMark thermoplastic decals on an asphalt sidewalk at Reunion, Murrayville, Langley",
    cta: "See the work",
    href: "/applications/branding-wayfinding",
  },
  {
    title: "Driveways",
    tag: "Residential",
    desc: "StreetPrint stamped asphalt and StreetBond colour over the driveway you already have — brick, herringbone and ashlar slate patterns for homes across Greater Victoria and Metro Vancouver.",
    image: "/images/applications/driveways/saanich-ten-mile-point-driveway-streetprint-01.jpg",
    alt: "Grey ashlar slate StreetPrint stamped asphalt driveway at a Ten Mile Point home, Saanich",
    cta: "Explore driveways",
    href: "/driveways",
  },
  {
    title: "Vapour blasting",
    tag: "Extra service",
    desc: "Surface cleaning, priming, graffiti and mould removal — mobile wet-abrasive blasting with up to 92% less dust than dry blasting, across both regions.",
    image: "/images/services/vapor-blasting/walkway-vapour-blasting-01.jpg",
    alt: "Walkway being cleaned by vapour blasting, Square One Paving",
    cta: "Learn about vapour blasting",
    href: "/services/vapor-blasting",
  },
]

const credentials = [
  "Serving BC since 2000",
  "Stamped asphalt, coatings and preformed thermoplastic",
  "Lower Mainland & Vancouver Island",
  "Free site visit and written quote",
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
        alt="Wave-motif TrafficPatternsXD decorative crosswalk on Marine Drive, White Rock"
        eyebrow="Applications"
        title="Decorative pavement, by application"
        lede="Crosswalks in Vancouver and Nanaimo, spray parks and parking lots across the Lower Mainland, driveways in Greater Victoria — StreetPrint® stamped asphalt, StreetBond® coatings and preformed thermoplastic, installed by Square One since 2000 on both sides of the Strait."
        caption="White Rock · TrafficPatternsXD"
        imagePosition="center 78%"
      >
        <div className="mt-9 flex flex-wrap items-center gap-[14px]">
          <Link href="/contact" className="btn-primary">
            Request a quote
          </Link>
          <Link href="/projects" className="btn-on-image">
            See the projects
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
