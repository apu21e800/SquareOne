/**
 * Each page's opener as the site ships it: the photograph, what it shows,
 * its caption and crop, and the headline with its lighter ending and the line
 * under it (9 Oct 2026). The Studio's "Page openers" change any of these
 * (lib/page-content.ts), and scripts/cms-seed.ts copies them into the Studio
 * so the office starts from what the site shows. Plain data: no imports, so
 * the seed script can read it with Node alone.
 *
 * `head` is set in the display face and `tail` in its lighter weight, the
 * house shape for a headline (CLAUDE.md, Brand). `fit` says the page sizes
 * its headline to the measure (components/IndexImageHero.tsx).
 */

export interface OpenerDefault {
  /** The page's address. */
  page: string
  /** How the Studio names it. */
  label: string
  src: string
  alt: string
  caption?: string
  /** CSS object-position: which part of the photograph stays in frame. */
  position?: string
  head: string
  tail?: string
  /** Absent where the page writes its own line (the document count on /resources). */
  lede?: string
  fit?: boolean
}

export const OPENERS: OpenerDefault[] = [
  {
    page: "/about",
    label: "About",
    src: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg",
    alt: "Artist-designed crosswalk of waves, sand and sky in TrafficPatterns on Marine Drive, White Rock, installed by Square One Paving",
    caption: "Marine Drive, White Rock · TrafficPatterns · 2025",
    position: "center 60%",
    head: "Decorative pavement",
    tail: "in BC since 2000",
    lede: "Crosswalks, streetscapes, plazas, parks, school grounds and driveways, installed by our own crews from one office in Maple Ridge, on both sides of the Strait.",
  },
  {
    page: "/services",
    label: "Services (what we do)",
    src: "/images/applications/public-art/new-westminster-boundary-pump-station-full-field-streetbond-01.jpg",
    alt: "The Boundary Road pump station in New Westminster from above, a quilt of red, blue, yellow, pink, black and white StreetBond squares across the whole plaza, installed by Square One",
    caption: "New Westminster · Boundary Road pump station · StreetBond",
    position: "center 45%",
    head: "What",
    tail: "we do",
    lede: "Three ways to change a surface and one to clean it: a free site walk, a written quote and our own crews, across the Lower Mainland and Vancouver Island since 2000.",
    fit: true,
  },
  {
    page: "/services/vapor-blasting",
    label: "Vapour blasting",
    src: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-wide.jpg",
    alt: "A Square One operator vapour blasting a painted marking off the boardwalk at Granville Island, Vancouver, the Burrard Street Bridge behind under a clear sky",
    caption: "Granville Island, Vancouver · marking removal",
    position: "center 70%",
    head: "Clean it, prime it,",
    tail: "bring it back",
    lede: "Graffiti, old markings, paint and grime off almost any hard surface, with the dust held down in water. The rig comes to you.",
    fit: true,
  },
  {
    page: "/products",
    label: "Products (the systems we install)",
    src: "/images/S1_update_v2/photos/Featured%20image%20options/504448297_1112360024259349_5235743119624258372_n-1.jpg",
    alt: "The rainbow intersection in Nanaimo at street level, bands of TrafficPatternsXD colour across the road in front of the shops",
    caption: "Nanaimo · Rainbow intersection · TrafficPatternsXD",
    position: "center 84%",
    head: "The right system",
    tail: "for the surface",
    lede: "Eight pavement systems, from pattern to protection. If it is not listed here, we do not install it.",
    fit: true,
  },
  {
    page: "/applications",
    label: "Applications",
    src: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg",
    alt: "Wave-motif TrafficPatternsXD decorative crosswalk on Marine Drive, White Rock",
    caption: "White Rock · TrafficPatternsXD",
    position: "center 78%",
    head: "Decorative pavement,",
    tail: "by application",
    lede: "StreetPrint® stamped asphalt, StreetBond® coatings and preformed thermoplastic, by where it goes. Our own crews, since 2000.",
    fit: true,
  },
  {
    page: "/projects",
    label: "Projects",
    src: "/images/applications/public-art/oak-bay-village-intersection-wide-streetbond-01.jpg",
    alt: "An octopus and fish on a blue sea, painted in StreetBond on the Cadboro Bay Village traffic circle in Saanich, the village shops behind",
    caption: "Cadboro Bay, Saanich · Village traffic circle · StreetBond",
    position: "center 55%",
    head: "Decorative pavement projects",
    tail: "across BC",
    lede: "Municipal, commercial and residential work, each with the system and the place on record.",
    fit: true,
  },
  {
    page: "/galleries",
    label: "Galleries",
    src: "/images/hero/white-rock-pier-crosswalk-trafficpatternsxd.jpg",
    alt: "Red brick-pattern TrafficPatternsXD crosswalk with white edge lines, leading across the road to the White Rock Pier and the beach",
    caption: "White Rock Pier · TrafficPatternsXD · 2019",
    position: "center 62%",
    head: "Photographs of",
    tail: "our own work",
    lede: "Our own installation photographs, captioned with the system and the place.",
    fit: true,
  },
  {
    page: "/driveways",
    label: "Driveways",
    src: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Grey ashlar slate StreetPrint stamped asphalt driveway at a three-bay garage, installed by Square One Paving",
    caption: "StreetPrint · Ashlar slate · Square One install",
    position: "center 70%",
    head: "Stamped asphalt driveways",
    tail: "for BC homes",
    lede: "Brick or stone to look at, asphalt to live with: a StreetPrint® pattern pressed into the driveway you have, sealed in StreetBond® colour. No new base.",
  },
  {
    page: "/resources",
    label: "Resources (the document library)",
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg",
    alt: "Rail ties in tan TrafficPatternsXD thermoplastic set into dark stamped asphalt, the railroad-inspired crosswalk in the City of Langley, installed by Square One Paving",
    caption: "City of Langley · TrafficPatternsXD",
    position: "center 60%",
    head: "The document",
    tail: "library",
    fit: true,
  },
  {
    page: "/specifiers",
    label: "For specifiers",
    src: "/images/applications/streetscapes/victoria-town-centre-crossing-streetprint-01.jpg",
    alt: "Brick-red StreetPrint stamped asphalt crossing at the edge of a town centre plaza in Victoria, with shops and trees beyond",
    caption: "Victoria · Town centre crossing · StreetPrint",
    position: "center 60%",
    head: "Drawings, specifications",
    tail: "and samples",
    lede: "What a landscape architect, an engineer or a municipal specifier needs to put decorative pavement on a drawing and out to tender, and a site walk with the samples when you are ready.",
  },
  {
    page: "/blog",
    label: "Blog",
    src: "/images/hero/bowen-island-polka-dot-walkway-streetbond.jpg",
    alt: "Blue, green, yellow and grey StreetBond dots along the Snug Cove walkway on Bowen Island, with an eagle asking 'Will you see me before I see you?'",
    caption: "Bowen Island · StreetBond",
    position: "center 40%",
    head: "Project stories",
    tail: "and guides",
    lede: "What holds up on BC pavement, told project by project.",
    fit: true,
  },
]

/**
 * Pages whose opener comes from their own record (a service, an application,
 * a product): the Studio can still change it, and a field left empty keeps
 * the page's own. Not copied into the Studio.
 */
export const RECORD_OPENER_PAGES: { page: string; label: string }[] = [
  { page: "/services/stamped-asphalt", label: "Service: Stamped asphalt" },
  { page: "/services/decorative-coatings", label: "Service: Decorative coatings" },
  { page: "/services/preformed-thermoplastic", label: "Service: Preformed thermoplastic" },
  { page: "/applications/crosswalks", label: "Application: Crosswalks" },
  { page: "/applications/streetscapes", label: "Application: Streetscapes" },
  { page: "/applications/roundabouts", label: "Application: Roundabouts and traffic calming" },
  { page: "/applications/parking-lots", label: "Application: Parking lots" },
  { page: "/applications/parks-paths", label: "Application: Parks and paths" },
  { page: "/applications/schools-sports-courts", label: "Application: Schools and sports courts" },
  { page: "/applications/bike-lanes", label: "Application: Bike lanes" },
  { page: "/applications/public-art", label: "Application: Public art" },
  { page: "/applications/branding-wayfinding", label: "Application: Branding and wayfinding" },
  { page: "/products/streetprint", label: "Product (photograph only): StreetPrint" },
  { page: "/products/streetbond", label: "Product (photograph only): StreetBond" },
  { page: "/products/trafficpatterns", label: "Product (photograph only): TrafficPatterns" },
  { page: "/products/trafficpatterns-xd", label: "Product (photograph only): TrafficPatternsXD" },
  { page: "/products/decomark", label: "Product (photograph only): DecoMark" },
  { page: "/products/durashield", label: "Product (photograph only): DuraShield" },
  { page: "/products/duratherm", label: "Product (photograph only): DuraTherm" },
  { page: "/products/premark", label: "Product (photograph only): PreMark" },
]

export const OPENER_BY_PAGE: Record<string, OpenerDefault> = Object.fromEntries(OPENERS.map((o) => [o.page, o]))
