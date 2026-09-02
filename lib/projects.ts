/**
 * Project record — every entry is an installation Square One has published on
 * its own site or blog, with the studio's own photography. Nothing here is
 * inferred from stock imagery, and no client, artist, date or place appears
 * unless Square One has stated it.
 *
 *   images[0]   the hero. `heroWide` is true only when that file is ≥1600px
 *               wide and may run full-bleed; otherwise the detail page keeps
 *               the hero contained (low-res never goes big — house rule).
 *   year        only when Square One published an installation date.
 *   flag        location inferred from photo dates and landscape, awaiting a
 *               yes from Square One. Shown, but listed in the review notes.
 *
 * Order is the business hierarchy: municipal and commercial work first,
 * residential driveways last.
 */

export type ProjectService =
  | "Stamped Asphalt"
  | "Decorative Coatings"
  | "Preformed Thermoplastic"
  | "Vapour Blasting"

export type ProjectRegion =
  | "Lower Mainland"
  | "Vancouver Island"
  | "Interior"
  | "Sunshine Coast"
  | "Sea to Sky"

export interface Project {
  title: string
  slug: string
  service: ProjectService
  /** Matches a WORK_APPS label in lib/work.ts so pages can cross-link. */
  application: string
  city: string
  region: ProjectRegion
  systems: string[]
  client?: string
  artist?: string
  year?: string
  excerpt: string
  images: string[]
  /** Convenience alias for images[0] — older callers read this. */
  imageUrl: string
  heroWide: boolean
  featured?: boolean
  flag?: boolean
}

type ProjectInput = Omit<Project, "imageUrl">

const FIO = "/images/S1_update_v2/photos/Featured%20image%20options"
const DRV = "/images/S1_update_v2/photos/Driveways"
const GAL = "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Galleries"

const records: ProjectInput[] = [
  // ── Municipal & civic ──────────────────────────────────────────────────────

  {
    title: "Rainbow intersection — Nanaimo",
    slug: "nanaimo-rainbow-intersection",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    region: "Vancouver Island",
    systems: ["TrafficPatternsXD"],
    year: "2025",
    featured: true,
    excerpt:
      "A full intersection in rainbow colour, installed June 2025 in TrafficPatternsXD — aggregate-reinforced preformed thermoplastic fused into stamped asphalt, so the colour holds under turning traffic and plow blades.",
    images: [
      `${FIO}/502639628_1112360040926014_5391735583045489560_n.jpg`,
      `${FIO}/504448297_1112360024259349_5235743119624258372_n-1.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Railroad-inspired crosswalk — City of Langley",
    slug: "langley-railroad-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    client: "City of Langley",
    year: "2025",
    featured: true,
    excerpt:
      "Rail ties in tan thermoplastic set into dark stamped asphalt — a nod to the city's railway history, installed March 2025 in TrafficPatternsXD for the City of Langley.",
    images: [
      `${FIO}/Photo-2025-03-07-2-54-05-PM-scaled.jpg`,
      `${FIO}/Photo-2025-03-06-3-06-49-PM-scaled-e1743101603782.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Artist-designed crosswalk — White Rock",
    slug: "white-rock-custom-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "White Rock, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    year: "2025",
    featured: true,
    excerpt:
      "Waves, sand and sky in custom aggregate-reinforced TrafficPatterns — an artist's design for a downtown White Rock crossing, installed spring 2025.",
    images: [
      `${FIO}/White-Rock-crosswalk-29-1-scaled.jpg`,
      `${FIO}/White-Rock-crosswalk-32-scaled.jpg`,
      `${FIO}/White-Rock-Crosswalk.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "UBC & Musqueam Crosswalk",
    slug: "ubc-musqueam-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    client: "University of British Columbia and Musqueam",
    featured: true,
    excerpt:
      "A feature crosswalk at University Boulevard and Wesbrook Mall, built with UBC and Musqueam — the two crests woven together in TrafficPatterns, acknowledging that the campus stands on unceded Musqueam territory.",
    images: [
      `${FIO}/UBC-crosswalk-3-300dpi.jpg`,
      `${FIO}/UBC-Crosswalk-TrafficPatterns_20191010_143939-scaled.jpg`,
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-01.jpg",
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-04.jpg",
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-salmon-detail-01.jpg",
      "/images/projects/ubc-musqueam-crosswalk/ubc-musqueam-crosswalk-trafficpatterns-03.jpg",
    ],
    heroWide: true,
  },
  {
    title: "Musqueam crosswalk on Granville Street",
    slug: "granville-street-musqueam-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Public art",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    client: "Musqueam",
    artist: "Robyn Sparrow",
    excerpt:
      "An original crosswalk design by Musqueam artist Robyn Sparrow, rendered in TrafficPatterns on Granville Street and unveiled to coincide with National Indigenous Peoples Day.",
    images: [
      `${FIO}/TrafficPatterns-Robyn-Sparrow-Design-Granville-68th-Vancouver-BC.jpg`,
      `${FIO}/decorativ-crosswalk_granville-and-70th.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "Public art at Joyce SkyTrain Station",
    slug: "joyce-skytrain-art-installation",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    client: "TransLink",
    artist: "Renée Van Halm",
    featured: true,
    excerpt:
      "Renée Van Halm's 'Carpeting' rendered in StreetBond across the concourse at Joyce Station — commissioned through TransLink's public art program and installed during overnight non-revenue windows.",
    images: [
      "/images/projects/joyce-skytrain-art-installation/joyce-collingwood-station-plaza-streetbond-01.jpg",
      "/images/projects/joyce-skytrain-art-installation/joyce-station-carpeting-renee-van-halm-streetbond-02.jpg",
    ],
    heroWide: false,
  },
  {
    title: "Brighouse Station — TrafficPatternsXD crosswalks",
    slug: "richmond-brighouse-translink",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Richmond, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    client: "TransLink",
    featured: true,
    excerpt:
      "TrafficPatternsXD crosswalks within the Brighouse Station development area and across No. 3 Road — heavy-duty decorative marking at the Canada Line terminus, installed for TransLink.",
    images: [
      `${FIO}/IMG_3178-scaled-e1590114559108.jpeg`,
      "/images/projects/richmond-brighouse-translink/brighouse-station-crosswalk-trafficpatternsxd-01.jpg",
    ],
    heroWide: true,
  },
  {
    title: "Circle of Life — Langley Events Centre",
    slug: "langley-events-centre-streetbond",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    artist: "Nəq̓ɑɬc̓i (Drew Atkins) and Miməwqθelət (Elinor Atkins), k'wy'i'y'e Spring Salmon Studio",
    featured: true,
    excerpt:
      "A circular gathering-space motif portraying the Circle of Life, designed by Drew and Elinor Atkins of Spring Salmon Studio and installed in StreetBond across the plaza at Langley Events Centre.",
    images: [
      `${FIO}/Langley-event-3-2048x1536.jpg`,
      "/images/projects/langley-events-centre-streetbond/langley-events-centre-streetbond-01.jpg",
      `${FIO}/GPTempDownload-1-scaled-e1731616674862-2000x1213.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Every Child Matters — New Westminster",
    slug: "every-child-matters-new-westminster",
    service: "Preformed Thermoplastic",
    application: "Public art",
    city: "New Westminster, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatterns"],
    client: "Orange Shirt Society, City of New Westminster and Spirit of Children Society",
    artist: "Charliss Santos",
    year: "2023",
    excerpt:
      "Every Child Matters pavement art for the National Day for Truth and Reconciliation — the 2023 national design by Charliss Santos, installed in TrafficPatterns on September 22, 2023.",
    images: [
      `${FIO}/Photo-2023-09-22-1-50-34-PM.jpg`,
      `${FIO}/GPTempDow-e1703097129496.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Little Italy crosswalks — Commercial Drive",
    slug: "little-italy-vancouver-crosswalks",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD", "DecoMark"],
    featured: true,
    excerpt:
      "Crosswalks at three Commercial Drive intersections in the green, white and red of the Italian flag — TrafficPatternsXD crossings with DecoMark neighbourhood branding for Little Italy.",
    images: [
      "/images/applications/commercial-spaces/little-italy-aerial-colourful-intersection-01.jpg",
      `${FIO}/IMG_1635.jpeg`,
      `${FIO}/DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg`,
      "/images/projects/little-italy-vancouver-crosswalks/little-italy-community-branding-decomark-01.jpg",
    ],
    heroWide: false,
  },
  {
    title: "Granville Island crosswalk — two years on",
    slug: "granville-island-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    excerpt:
      "A TrafficPatternsXD crosswalk outside Granville Island Brewing, photographed just over two years after installation and looking as it did on day one — the case for aggregate-reinforced thermoplastic under delivery traffic.",
    images: [
      `${FIO}/decorative-crosswalk-with-stamped-asphalt-at-granville-island-brewery-crosswalk-sign-scaled-1-2048x1536.jpg`,
      `${FIO}/decorative-crosswalk-with-stamped-asphalt-at-granville-island-beer-scaled-1-2048x1536.jpg`,
      `${GAL}/Crosswalks/Gallery/TrafficPatternsXD%20%20Decorative%20Crosswalk%2C%20Granville%20Island%2C%20Vancouver%20BC.png`,
    ],
    heroWide: true,
  },
  {
    title: "White Rock Pier crosswalk",
    slug: "white-rock-pier-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "White Rock, BC",
    region: "Lower Mainland",
    systems: ["TrafficPatternsXD"],
    excerpt:
      "When the rebuilt White Rock Pier re-opened on the Labour Day weekend, it came with a new TrafficPatternsXD decorative crosswalk at the waterfront — brick pattern, sea air, and thousands of visitors a day.",
    images: [
      `${FIO}/Whiterock-Pier-Crosswalk-TrafficPatternsXD-1-scaled.jpg`,
      `${FIO}/Whiterock-Pier-Crosswalk-TrafficPatternsXD-2-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Sports-themed crosswalk — Beban Park, Nanaimo",
    slug: "beban-park-sports-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    region: "Vancouver Island",
    systems: ["Preformed thermoplastic"],
    excerpt:
      "A colourful crossing connecting the Beban Park parking lot to the pool, social centre and arena — hockey sticks, baseballs and bikes in preformed thermoplastic on a route walked by thousands of kids.",
    images: [
      `${FIO}/Photo-2024-03-19-3-28-23-PM-1-scaled.jpg`,
      `${FIO}/432882580_808070794688275_3605505723429052731_n-e1715193644580.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Terry Fox Hometown Square — Port Coquitlam",
    slug: "terry-fox-hometown-square",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Port Coquitlam, BC",
    region: "Lower Mainland",
    systems: ["StreetBond", "DecoMark"],
    excerpt:
      "The plaza at Port Coquitlam Community Centre, officially renamed Terry Fox Hometown Square — StreetBond colour fields with DecoMark medallions marking the days and miles of the Marathon of Hope.",
    images: [`${FIO}/decorative-asphalt-design-1.jpg`],
    heroWide: false,
  },
  {
    title: "Boundary Road Pump Station — quilt motif",
    slug: "boundary-road-pump-station",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Boundary Road, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "A utility site turned landmark — a StreetBond quilt motif in eight colours wrapping the paths and stairs around the Boundary Road pump station, so a piece of infrastructure reads as public art.",
    images: [
      `${FIO}/Photo-2023-07-05-11-22-34-AM.jpg`,
      `${FIO}/Photo-2023-04-20-12-58-16-PM.jpg`,
      `${FIO}/Photo-2023-06-08-12-56-51-PM.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Maplewoods Townhomes — decorative fire lane",
    slug: "north-vancouver-maplewoods-fire-lane",
    service: "Decorative Coatings",
    application: "Streetscapes",
    city: "North Vancouver, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "Blue StreetBond with white current lines across the emergency access lane at Maplewoods in North Vancouver — a fire lane that reads as a river instead of a no-parking zone.",
    images: [
      `${FIO}/Photo-2023-05-19-5-56-47%E2%80%AFPM-scaled%20%281%29.jpg`,
      `${FIO}/Photo-2023-05-19-5-59-11%E2%80%AFPM-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Solar-reflective park pathway — Osoyoos",
    slug: "osoyoos-park-pathway",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Osoyoos, BC",
    region: "Interior",
    systems: ["StreetBond SR"],
    flag: true,
    excerpt:
      "A park pathway coated in StreetBond SR — all the durability of StreetBond 150 with solar-reflective pigments that keep the surface cooler underfoot in the South Okanagan sun.",
    images: [
      `${FIO}/Photo-2023-05-25-12-55-19%E2%80%AFPM-scaled.jpg`,
      `${FIO}/Photo-2023-05-25-12-56-23%E2%80%AFPM-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Maple Ridge Spray Park",
    slug: "maple-ridge-spray-park",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Maple Ridge, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    year: "2025",
    flag: true,
    excerpt:
      "StreetBond 150 across a new spray park in Maple Ridge — blue and orange colour fields around the water features, slip-resistant and ready for opening in July 2025.",
    images: [
      `${FIO}/Photo-2025-07-07-11-54-41-AM.jpg`,
      `${FIO}/Photo-2025-06-16-5-06-20-PM-scaled.jpg`,
      `${FIO}/Photo-2025-06-16-5-07-47-PM-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Keswick Water Park — StreetBond 150 recoat",
    slug: "keswick-waterpark",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Burnaby, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    client: "City of Burnaby",
    excerpt:
      "Recoat, restoration and addition at Keswick Splash Water Park — StreetBond 150 remains the product of choice for bold, colourful, long-lasting spray pads.",
    images: [
      `${FIO}/keswick-splash-water-park-burnaby-canada-3.png`,
      "/images/projects/keswick-waterpark/keswick-water-park-streetbond-01.jpg",
    ],
    heroWide: false,
  },
  {
    title: "Rutland Centennial Park — Kelowna",
    slug: "rutland-centennial-park-kelowna",
    service: "Decorative Coatings",
    application: "Parks & paths",
    city: "Kelowna, BC",
    region: "Interior",
    systems: ["StreetBond", "DecoMark"],
    excerpt:
      "The fourth and final phase of Rutland Centennial Park — StreetBond decorative coatings across the plaza and court surfaces with DecoMark medallions: attractive, durable and highly visible at a cost that works for a park budget.",
    images: [
      `${FIO}/Rutland-Park-Kelowna-DecoMark-StreetBond.jpg`,
      `${FIO}/DecoMark-and-StreetBond-Rutland-Park-Kelowna.jpg`,
      `${FIO}/DecoMark-Rutland-Park-Kelowna.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "South Langford Elementary",
    slug: "south-langford-elementary",
    service: "Preformed Thermoplastic",
    application: "Schools & sports courts",
    city: "Langford, BC",
    region: "Vancouver Island",
    systems: ["DecoMark", "TrafficPatterns"],
    year: "2025",
    excerpt:
      "DecoMark sensory play designs and TrafficPatterns crosswalks for a brand-new Island school — an interactive pathway built for longevity, completed ahead of the September 2025 opening.",
    images: [`${FIO}/Photo-2025-09-25-3-48-33-PM-scaled.jpg`],
    heroWide: false,
  },
  {
    title: "c̓əsqənelə Elementary labyrinth — Maple Ridge",
    slug: "cesqenele-elementary-labyrinth",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Maple Ridge, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "A stand-out walking labyrinth at the new c̓əsqənelə Elementary School in Maple Ridge — concentric StreetBond lines held to a consistent width across the full diameter. Our most recent labyrinth, and the most detailed.",
    images: [
      `${FIO}/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg`,
      `${FIO}/IMG_3659-scaled.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "High-visibility school crosswalk — Grandview Heights",
    slug: "grandview-heights-school-crosswalk",
    service: "Stamped Asphalt",
    application: "Schools & sports courts",
    city: "Surrey, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint"],
    excerpt:
      "StreetPrint stamped asphalt in red with yellow borders — a defined, visible crossing for a school zone, where a crossing you can't miss is the whole point.",
    images: [
      `${FIO}/visible-school-crosswalk-for-safety-6.jpg`,
      `${FIO}/visible-school-crosswalk-for-safety-1-e1624560748675.jpg`,
    ],
    heroWide: false,
  },

  // ── Commercial & strata ────────────────────────────────────────────────────

  {
    title: "Ralph's Farm Market — Murrayville, Langley",
    slug: "ralphs-farm-market-parking-lot",
    service: "Stamped Asphalt",
    application: "Parking lots",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint"],
    excerpt:
      "A one-of-a-kind stamped asphalt parking lot for Ralph's Farm Market — red brick StreetPrint walkways and aprons that tie the site to the store's branding, built in partnership with HUB Surface Systems.",
    images: [
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-in-Langley-BC-Canada.jpg`,
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Red-Stamped-Asphalt.jpg`,
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Decorative-Stamped-Asphalt-with-truck.jpg`,
      `${FIO}/Ralphs-Farm-Market-Parking-Lot-with-StreetPrint-Stamped-Asphalt.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "StreetPrint in Pewter — Mission",
    slug: "mission-bc-streetscape",
    service: "Stamped Asphalt",
    application: "Parking lots",
    city: "Mission, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint", "StreetBond"],
    year: "2025",
    excerpt:
      "Herringbone StreetPrint stamped asphalt sealed in StreetBond 150 Pewter — a grey-on-grey commercial frontage in Mission, installed April 2025.",
    images: [`${FIO}/Photo-2025-04-03-1-57-51-PM-scaled.jpg`],
    heroWide: false,
  },
  {
    title: "Reunion Housing — DecoMark sidewalk decals",
    slug: "reunion-housing-murrayville",
    service: "Preformed Thermoplastic",
    application: "Branding & wayfinding",
    city: "Langley, BC",
    region: "Lower Mainland",
    systems: ["DecoMark"],
    excerpt:
      "Oak-leaf DecoMark decals along the asphalt sidewalks of the Reunion housing complex in Murrayville — custom wayfinding and horizontal surface graphics that show best in dappled spring light.",
    images: [
      `${FIO}/Decorative-asphalt-sidewalk-with-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
      `${FIO}/Decorative-asphalt-sidewalk-with-thermoplastic-closeup-decal-at-Reunion-housing-development-in-langley-BC-Canada.jpg`,
    ],
    heroWide: false,
  },
  {
    title: "Snug Cove community walkway — Bowen Island",
    slug: "bowen-island-snug-cove-walkway",
    service: "Decorative Coatings",
    application: "Public art",
    city: "Bowen Island, BC",
    region: "Lower Mainland",
    systems: ["StreetBond"],
    excerpt:
      "A public art feature along the walkway at Snug Cove — StreetBond 150 on asphalt, each custom colour representing part of the island community, with the local wildlife asking the questions.",
    images: [
      `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond150-scaled-1.jpg`,
      `${FIO}/Bowen-Island-asphalt-walkway-with-StreetBond-scaled-1.jpg`,
    ],
    heroWide: true,
  },
  {
    title: "Windsor Gate — Polygon townhomes, Coquitlam",
    slug: "windsor-gate-coquitlam",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Coquitlam, BC",
    region: "Lower Mainland",
    systems: ["StreetPrint", "StreetBond"],
    client: "Polygon Realty",
    excerpt:
      "Developed by Polygon Realty for the Windsor Gate master-planned community — stamped asphalt driveways and crossings, coloured and sealed with the StreetBond coating system.",
    images: [
      "/images/projects/windsor-gate-coquitlam/windsor-gate-crosswalk-streetprint-03.jpg",
      `${FIO}/StreetPrint-%E2%80%94-Stamped-Asphalt-Decorative-Crosswalk-Windsor-Gate.jpg`,
    ],
    heroWide: false,
  },

  // ── Residential driveways ──────────────────────────────────────────────────

  {
    title: "Ten Mile Point driveway — Saanich",
    slug: "ten-mile-point-driveway-saanich",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Saanich, BC",
    region: "Vancouver Island",
    systems: ["StreetPrint"],
    excerpt:
      "A stamped asphalt driveway for a Ten Mile Point home in Saanich — grey ashlar pattern running from the street to a stone-and-timber entry.",
    images: [`${DRV}/Ten%20Mile%20Point%20Driveway%20I.jpg`],
    heroWide: true,
  },
  {
    title: "Cobblestone stamped asphalt — Ellis Point, Victoria",
    slug: "ellis-point-cobblestone-victoria",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Victoria, BC",
    region: "Vancouver Island",
    systems: ["StreetPrint"],
    excerpt:
      "British Cobble StreetPrint in a warm brick tone at Ellis Point — the texture of a cobbled lane with none of the weeds, settling or plow damage.",
    images: [`${FIO}/Cobblestone-stamped-asphalt-driveway-colose-up-at-Ellis-Point-Walkway-Victoria-BC-Canada.jpg`],
    heroWide: true,
  },
]

export const projects: Project[] = records.map((r) => ({ ...r, imageUrl: r.images[0] }))

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const getFeaturedProjects = (): Project[] => projects.filter((p) => p.featured)

/** Projects whose application matches a WORK_APPS label (see lib/work.ts). */
export const getProjectsByApplication = (label: string): Project[] =>
  projects.filter((p) => p.application === label)
