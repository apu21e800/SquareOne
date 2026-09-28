import Link from "next/link"
import IndexImageHero from "@/components/IndexImageHero"
import Frame from "@/components/ui/Frame"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { clampDescription } from "@/lib/seo"
import { STREETBOND_COLOURS } from "@/lib/palette"

export const metadata: Metadata = {
  openGraph: { title: "Decorative Pavement Applications in BC", description: clampDescription("Decorative pavement across BC: crosswalks, streetscapes, parking lots, parks, schools, bike lanes, public art and driveways in stamped asphalt and coatings."), images: [{ url: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg" }] },
  title: "Decorative Pavement Applications in BC",
  description:
    clampDescription("Decorative pavement across BC: crosswalks, streetscapes, parking lots, parks, schools, bike lanes, public art and driveways in stamped asphalt and coatings."),
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
   place a card names is in the record (lib/work.ts, lib/projects.ts).
   28 Sept 2026, second image pass: the 667px and 1334px frames are gone
   from the grid; six of the eleven are 2025–2026 work. */
const applications: AppCard[] = [
  {
    title: "Crosswalks",
    tag: "Municipal",
    desc: "Rainbow intersections to school crossings, in thermoplastic and stamped asphalt.",
    image: `${FIO}/502639628_1112360040926014_5391735583045489560_n.jpg`,
    alt: "The rainbow intersection in Nanaimo from above, full-spectrum TrafficPatternsXD across the whole crossing",
    cta: "See the work",
    href: "/applications/crosswalks",
  },
  {
    title: "Streetscapes",
    tag: "Municipal",
    desc: "Intersections, medians, laneways and forecourts where the surface carries the design.",
    image: `${FIO}/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg`,
    alt: "Blue StreetBond decorative fire lane at Maplewoods Townhomes, North Vancouver",
    cta: "See the work",
    href: "/applications/streetscapes",
  },
  {
    title: "Roundabouts & traffic calming",
    tag: "Municipal",
    desc: "Aprons, islands and calming devices that read as street, not hardware.",
    image: "/images/applications/roundabouts/chilliwack-circular-turnaround-streetprint-01.jpg",
    alt: "A circular turnaround in charcoal herringbone StreetPrint in front of a new apartment building in Chilliwack",
    cta: "See the work",
    href: "/applications/roundabouts",
  },
  {
    title: "Parking lots",
    tag: "Commercial",
    desc: "Thresholds, walkways and crosswalks that organise a lot.",
    image: "/images/applications/parking-lots/mission-parking-bays-at-the-building-streetprint-01.jpg",
    alt: "Grey herringbone StreetPrint parking bays along the glass frontage of a new building in Mission",
    cta: "See the work",
    href: "/applications/parking-lots",
  },
  {
    title: "Parks & paths",
    tag: "Municipal",
    desc: "Greenways, park paths, plazas and spray parks, in colour underfoot.",
    image: "/images/applications/parks-paths/surrey-marine-spray-park-detail-streetbond-01.jpg",
    alt: "A blue StreetBond swirl and sea creatures across the Marine spray park in Surrey",
    cta: "See the work",
    href: "/applications/parks-paths",
  },
  {
    title: "Schools & sports courts",
    tag: "Institutional",
    desc: "Courts, school crosswalks, play markings and a labyrinth, built for recess and rain.",
    image: "/images/applications/schools-sports-courts/vancouver-school-court-streetbond-01.jpg",
    alt: "A teal and yellow StreetBond basketball court at a school in Vancouver, hoops and trees around it",
    cta: "See the work",
    href: "/applications/schools-sports-courts",
  },
  {
    title: "Bike lanes",
    tag: "Municipal",
    desc: "Green bike lanes and multi-use paths, in colour that holds under traffic.",
    image: "/images/applications/bike-lanes/sechelt-cowrie-and-trail-intersection-streetbond-01.jpg",
    alt: "The Cowrie and Trail intersection in Sechelt from above, green StreetBond bike lanes meeting at a crossing",
    cta: "See the work",
    href: "/applications/bike-lanes",
  },
  {
    title: "Public art",
    tag: "Civic",
    desc: "First Nations artwork, community murals and commemorative plazas, set in the pavement.",
    image: `${FIO}/Photo-2023-09-22-1-50-34-PM.jpg`,
    alt: "'Every Child Matters' by Charliss Santos in orange and black TrafficPatterns, New Westminster",
    cta: "See the work",
    href: "/applications/public-art",
  },
  {
    title: "Branding & wayfinding",
    tag: "Commercial",
    desc: "Logos, wayfinding and decals, fused into the pavement.",
    image: "/images/applications/branding-wayfinding/coquitlam-red-sol-courtyard-decomark-01.jpg",
    alt: "Blue DecoMark circles and sweeping lines set into the concrete courtyard at Red Sol in Coquitlam",
    cta: "See the work",
    href: "/applications/branding-wayfinding",
  },
  {
    title: "Driveways",
    tag: "Residential",
    desc: "Brick, herringbone and slate over the driveway you already have.",
    image: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Grey ashlar slate StreetPrint driveway at a three-bay garage, installed by Square One",
    cta: "Explore driveways",
    href: "/driveways",
  },
  {
    title: "Vapour blasting",
    tag: "Extra service",
    desc: "Graffiti, markings and grime off, and the surface primed. Mobile, both regions.",
    image: "/images/services/vapor-blasting/walkway-vapour-blasting-01.jpg",
    alt: "Walkway being cleaned by vapour blasting, Square One Paving",
    cta: "Learn about vapour blasting",
    href: "/services/vapor-blasting",
  },
]

/** Twelve colours off the chart for the "Something else" square: a spread
    of the range rather than its first row of browns. */
const BOARD = [
  "Sandy Beige", "Driftwood", "Butterscotch", "Chestnut Brown",
  "Paprika", "Avocado", "Sea Foam", "Bike Path Green",
  "Patriot Blue", "Merlot", "Graphite", "Pewter",
]
  .map((name) => STREETBOND_COLOURS.find((c) => c.name === name))
  .filter((c): c is (typeof STREETBOND_COLOURS)[number] => Boolean(c))

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
 *   Listing      11 frames, the tag and the name UNDER each, one line,
 *                one underlined link                                   paper
 *   Credentials  quiet hairline row, in the small voice                paper
 *   Close        slate — rendered once by app/layout.tsx (Footer)
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the photo cards with a
 * tag over the image and an arrow are now square-cornered frames with
 * everything under them — the same eleven, the same order, the same
 * words. Every photograph is Square One's own, from a named BC install;
 * each frame opens the application's gallery (lib/work.ts) — driveways to
 * the pillar, vapour to its service page. The opener carries the page's one
 * button; the projects link moved off the photograph onto paper, under the
 * grid.
 */
export default function ApplicationsPage() {
  return (
    <main>
      <IndexImageHero
        src="/images/hero/white-rock-marine-drive-wave-crosswalk.jpg"
        alt="Wave-motif TrafficPatternsXD decorative crosswalk on Marine Drive, White Rock"
        eyebrow="Applications"
        title={<>Decorative pavement, <em>by application</em></>}
        fit="Decorative pavement, by application"
        lede="StreetPrint® stamped asphalt, StreetBond® coatings and preformed thermoplastic, by where it goes. Our own crews, since 2000."
        caption="White Rock · TrafficPatternsXD"
        imagePosition="center 78%"
      >
        <div className="mt-9">
          <Link href="/contact" className="btn-primary">
            Get a quote
          </Link>
        </div>
      </IndexImageHero>

      {/* The eleven applications — frames with the words under them */}
      <section className="sec section bg-surface">
        <div className="container-1280">
          <ul className="grid grid-cols-1 gap-x-7 gap-y-12 min-[701px]:grid-cols-3" role="list">
            {applications.map((app) => (
              <li key={app.title}>
                <Frame
                  src={app.image}
                  alt={app.alt}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 700px) 100vw, (max-width: 1280px) 33vw, 400px"
                  href={app.href}
                />
                <span className="label mt-5">{app.tag}</span>
                <h3 className="mt-1">{app.title}</h3>
                <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                  {app.desc}
                </p>
                <p className="mt-4">
                  <Link href={app.href} className="link">
                    {app.cta}
                  </Link>
                </p>
              </li>
            ))}
            {/* The twelfth square (28 Sept 2026 QA): eleven frames left a
                hole at the end of the grid. It is the way in for a job that
                is none of the above, on a sample board of the chart. */}
            <li>
              <Link href="/contact" className="kit-visual kit-chips app-else" aria-label="Something else: tell us the job">
                {BOARD.map((c) => (
                  <span key={c.name} style={{ background: c.hex }} title={c.name} />
                ))}
              </Link>
              <span className="label mt-5">Your site</span>
              <h3 className="mt-1">Something else</h3>
              <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.55] text-ink-body [text-wrap:pretty]">
                Not sure which of these your job is? Describe the surface and where it is. The site
                visit is free, and the written quote names the system that fits.
              </p>
              <p className="mt-4">
                <Link href="/contact" className="link">
                  Tell us the job
                </Link>
              </p>
            </li>
          </ul>

          {/* The projects link, off the photograph and onto paper (the
              opener keeps its one button). */}
          <p className="mt-14 border-t border-hairline pt-6">
            <Link href="/projects" className="link">
              See the projects
            </Link>
          </p>
        </div>
      </section>

      {/* Credentials — one hairline row, the four lines as words */}
      <section className="section bg-surface !pt-0">
        <div className="container-1280">
          <p className="border-t border-hairline pt-6">
            {credentials.map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </p>
        </div>
      </section>
    </main>
  )
}
