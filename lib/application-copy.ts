import type { WorkApp } from "@/lib/work"

/**
 * The words of the nine application pages (/applications/<slug>), moved
 * here verbatim from app/applications/[slug]/page.tsx on 14 Oct 2026 so the
 * blog drafter can read them as Square One's own published copy
 * (lib/automation/facts.ts). The page renders them exactly as before.
 * Driveways has its own page (/driveways, lib/page-copy.ts).
 *
 * Copy rules (CANON): every place, artist and system named here is in the
 * record: lib/work.ts, lib/work-captions.ts, lib/projects.ts,
 * lib/products.ts, lib/services.ts or content/blog. Performance figures are
 * the manufacturer's and say so. ® / ™ go on the first mention of each mark
 * per page, which is the intro.
 */

export interface AppCopy {
  /** The <title>, before the root template adds " | Square One Paving". */
  title: string
  headline: string
  /** Paragraphs above the gallery — the first is set as the lede. */
  intro: string[]
  /** Product slugs (lib/products.ts) rendered as the systems cards, in order. */
  products: string[]
  /** The meta description — application, region, systems and one concrete benefit. Clamped on the way out. */
  seo: string
  /** Gallery heading, in the words a searcher would use. */
  work: string
  /** Where this application sits in the site: the service behind it, a system, the projects. Existing routes only. */
  links: { label: string; href: string }[]
}

export const APP_COPY: Record<Exclude<WorkApp, "driveways">, AppCopy> = {
  crosswalks: {
    title: "Decorative Crosswalks in BC",
    headline: "Decorative crosswalks that read from a block away",
    intro: [
      "A decorative crosswalk does two jobs at once: it protects the person in it and it tells the driver something is happening here. Square One installs them in preformed thermoplastic (TrafficPatterns™, heat-fused to the pavement and open to traffic within minutes, and TrafficPatternsXD™, the 150-mil aggregate-reinforced sheet made for arterial crossings and transit hubs) and in StreetPrint® stamped asphalt, which the manufacturer publishes at a 10–20 year service life and offers with retroreflective options. DuraTherm carries the crosswalk bars, stop bars and legends around them.",
      "The record runs from the UBC and Musqueam crossing on University Boulevard and the rainbow intersection in Nanaimo to a plain high-visibility brick crosswalk at Grandview Heights School in Surrey. Municipalities, school districts, developers and transit agencies commission them. Square One installs across the Lower Mainland and Vancouver Island, with crossings in Kelowna, Sechelt and Squamish also on record.",
    ],
    products: ["trafficpatterns", "trafficpatterns-xd", "streetprint", "duratherm", "streetbond"],
    seo: "Decorative crosswalks in TrafficPatterns thermoplastic and StreetPrint stamped asphalt, Lower Mainland and Vancouver Island. Open to traffic in minutes.",
    work: "Decorative crosswalks across BC",
    links: [
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "Crosswalk projects", href: "/projects" },
    ],
  },
  streetscapes: {
    title: "Stamped Asphalt Streetscapes in BC",
    headline: "Streetscapes with pattern and colour built in",
    intro: [
      "A streetscape is the part of the road people are meant to notice: the intersection, the median, the lane behind a townhome row, the forecourt of a civic building. Square One builds them in StreetPrint® stamped asphalt (a heated steel template presses brick, herringbone or ashlar slate into the asphalt, so the pattern is part of the surface rather than painted on it) and colours the imprint with StreetBond®, a water-based acrylic coating with an anti-skid aggregate and more than fifty standard colours. TrafficPatternsXD™ takes the highest-wear crossings; DuraTherm and DecoMark add the markings and graphics.",
      "On record: a StreetPrint town centre, plaza and heritage forecourt in Victoria, the 32nd Avenue median in Surrey, a pewter herringbone street in Mission, the StreetBond fire lane at Maplewoods Townhomes in North Vancouver and a strata laneway in Squamish. Municipalities, developers and landscape architects specify the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetprint", "streetbond", "trafficpatterns-xd", "duratherm", "decomark"],
    seo: "Stamped asphalt streetscapes in StreetPrint and StreetBond, Lower Mainland and Vancouver Island: medians, laneways and forecourts with the pattern pressed in.",
    work: "Stamped asphalt streetscapes across BC",
    links: [
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Streetscape projects", href: "/projects" },
    ],
  },
  roundabouts: {
    title: "Roundabouts & Traffic Calming in BC",
    headline: "Roundabouts and traffic calming that read as streetscape",
    intro: [
      "Roundabout aprons, traffic islands and medians have to take turning trucks and plow blades and still tell drivers to slow down. Square One builds them in StreetPrint® stamped asphalt (a textured, slip-resistant surface the manufacturer rates snowplow and de-icing salt safe, with a published 10–20 year service life and nothing to peel or re-lay) and in TrafficPatternsXD™, the 150-mil aggregate-reinforced thermoplastic for the busiest intersections. StreetBond® colour sets the apron off from the travel lane, and PreMark carries the turn arrows.",
      "Roundabouts in Duncan, North Cowichan and at McTavish Exchange in North Saanich; aprons and islands in Abbotsford and Maple Ridge; a coloured median and roundabout in Surrey; traffic-calming devices in View Royal and North Vancouver. The record covers both sides of the Strait and reaches into the Interior at Kelowna and Vernon. Municipalities and developers commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetprint", "trafficpatterns-xd", "streetbond", "premark"],
    seo: "Roundabout aprons, traffic islands and traffic calming in StreetPrint stamped asphalt and TrafficPatternsXD across BC. Snowplow safe; published 10–20 yr life.",
    work: "Roundabouts and traffic calming across BC",
    links: [
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "StreetPrint", href: "/products/streetprint" },
      { label: "All projects", href: "/projects" },
    ],
  },
  "parking-lots": {
    title: "Decorative Parking Lot Paving in BC",
    headline: "Parking lots that direct people without a sign",
    intro: [
      "A brick-pattern walkway across a parking lot moves pedestrians where you want them and tells drivers to expect them. Square One builds thresholds, entrance aprons, walkways and crosswalks for retail centres, strata and commercial sites: StreetPrint® stamped asphalt for the pattern, pressed into the lot's own asphalt with minimal closure time; StreetBond® for colour and grip, on asphalt or concrete; and preformed thermoplastic (TrafficPatternsXD™ for the crossings, PreMark for the arrows and accessible-parking symbols, DecoMark for a logo at the entrance) heat-fused to the pavement rather than sprayed on. For a lot that is sound but tired, DuraShield is the maintenance coating, in black or Solar Gray.",
      "The record runs from Ralph's Farm Market in Murrayville, Langley and StreetPrint parking bays in Mission to a high-visibility walkway at Shipspoint and the Hillside Mall crosswalk in Victoria, with a townhouse lot in Kelowna and a parkade in Victoria alongside. Property managers, developers and parking operators commission it; Square One installs across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetprint", "streetbond", "trafficpatterns-xd", "premark", "decomark", "durashield"],
    seo: "Decorative parking lot paving, Lower Mainland and Vancouver Island: StreetPrint walkways and crosswalks, StreetBond colour, thermoplastic stall markings.",
    work: "Parking lot paving across BC",
    links: [
      { label: "Stamped asphalt", href: "/services/stamped-asphalt" },
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Parking lot projects", href: "/projects" },
    ],
  },
  "parks-paths": {
    title: "Park Paths & Spray Park Surfacing in BC",
    headline: "Park paths and spray parks with colour underfoot",
    intro: [
      "Park pathways, greenways, plazas and spray parks are surfaces people walk, run and play on, often barefoot. Square One coats them in StreetBond®, a water-based acrylic with an anti-skid aggregate for wet surfaces, UV-stable colour and a manufacturer-published 8+ year life cycle that is refreshed with a recoat rather than rebuilt; StreetBond SR is the solar-reflective version. StreetPrint® gives a park walkway the look of stone, pressed into the asphalt, and DecoMark and TrafficPatterns™ add medallions, wayfinding and crossings in preformed thermoplastic.",
      "Spray parks in Maple Ridge, Surrey and Vancouver and at Wesburn Park and Keswick Water Park in Burnaby; the Spirit Trail in West Vancouver; Alexandra Park in Richmond; the Snug Cove walkway on Bowen Island; a StreetPrint walkway at Mount Douglas in Saanich and the Harbour Walkway in Victoria, with Rutland Centennial Park in Kelowna and a solar-reflective pathway in Osoyoos in the Interior. Municipalities, landscape architects and strata councils commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetbond", "streetprint", "trafficpatterns", "decomark"],
    seo: "Park paths, greenways and spray parks in StreetBond coatings and StreetPrint stamped asphalt across BC. Anti-skid colour that is recoated rather than rebuilt.",
    work: "Park paths and spray parks across BC",
    links: [
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "StreetBond", href: "/products/streetbond" },
      { label: "Park projects", href: "/projects" },
    ],
  },
  "schools-sports-courts": {
    title: "School & Sports Court Surfacing in BC",
    headline: "School grounds and sports courts that survive recess",
    intro: [
      "School grounds take more wear than almost any other pavement a district owns. Square One turns an asphalt court into a colour-coded playing surface with StreetBond®, an anti-skid, UV-stable acrylic coating that is recoated rather than replaced; drops hopscotch grids, target circles, play shapes and a labyrinth onto the playground in DecoMark and PreMark preformed thermoplastic, cut to the design and heat-fused in place; and makes a school crosswalk hard to miss in StreetPrint® stamped asphalt, which the manufacturer offers with retroreflective options, or TrafficPatterns™ thermoplastic.",
      "On record: StreetBond sports courts at Brookmere Park in Coquitlam and St. Michael's University School in Victoria; the sensory play pathway at South Langford Elementary; PreMark play markings at Corpus Christi in Vancouver; the Eagle Mountain labyrinth in Abbotsford; KB Woodward's hexagons in Surrey; and the high-visibility school crosswalk at Grandview Heights in Surrey. School districts, municipalities and strata councils commission the work; Square One installs across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetbond", "decomark", "premark", "trafficpatterns", "streetprint"],
    seo: "School crosswalks, sports court coatings and play markings in StreetBond, DecoMark and PreMark for schools across the Lower Mainland and Vancouver Island.",
    work: "School and sports court surfaces across BC",
    links: [
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "School projects", href: "/projects" },
    ],
  },
  "bike-lanes": {
    title: "Bike Lane Coatings & Markings in BC",
    headline: "Bike lanes that keep their colour",
    intro: [
      "A green bike lane is only useful while it is still green. Square One installs the lane surface itself: PreMark preformed thermoplastic, manufactured to exact dimensions with embedded retroreflective glass beads and heat-applied for a permanent bond, and StreetBond®, a water-based acrylic coating with an anti-skid aggregate for wet conditions, UV-stable colour and a manufacturer-published 8+ year life cycle that is refreshed with a recoat. The bicycle symbols and arrows go down in PreMark to the owner's marking standard, and StreetPrint® stamped asphalt gives a multi-use path a brick pattern with the manufacturer's published 10–20 year service life.",
      "Green PreMark bike lanes in North Vancouver, a blue bike lane in Richmond, the Cowrie and Trail lane and crossing in Sechelt, a StreetPrint bike path on 32nd Avenue in Surrey. The record covers both regions. Municipalities commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["premark", "streetbond", "trafficpatterns", "streetprint"],
    seo: "Green bike lanes and multi-use paths in PreMark thermoplastic, StreetBond coatings and StreetPrint, Lower Mainland and Vancouver Island. A published 8+ year life cycle.",
    work: "Bike lanes across BC",
    links: [
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "PreMark", href: "/products/premark" },
      { label: "Why green means more than visibility", href: "/blog/why-green-means-more-than-visibility" },
    ],
  },
  "public-art": {
    title: "Pavement Public Art in BC",
    headline: "Public art rendered in the road itself",
    intro: [
      "Pavement public art is a piece where the artist's drawing becomes the road surface. Square One carries it from the drawing to the ground: colour-matched fields in StreetBond®, a water-based acrylic coating with custom colour mixing and an anti-skid aggregate, and factory-cut graphics in TrafficPatterns™ and DecoMark preformed thermoplastic, which reproduce a logo, emblem or complex design in full colour with the durability of a standard road marking. DuraTherm handles the crosswalk bars where the piece is also a crossing, and the layout is set out on site to the geometry a circular motif or a woven crest demands.",
      "Robyn Sparrow's Musqueam design on Granville Street; 'Every Child Matters' by Charliss Santos in New Westminster; 'Circle of Life' by Drew and Elinor Atkins at Langley Events Centre; the whorl-and-canoes medallion at Victoria High School; 'Carpeting' by Renée Van Halm at Joyce Station; Terry Fox Hometown Square in Port Coquitlam; the labyrinth at c̓əsqənelə Elementary in Maple Ridge; the village traffic circle in Cadboro Bay. Municipalities, transit agencies, First Nations and community organisations commission the work; Square One installs it across the Lower Mainland and Vancouver Island.",
    ],
    products: ["streetbond", "trafficpatterns", "decomark", "duratherm"],
    seo: "Pavement public art in TrafficPatterns, DecoMark thermoplastic and StreetBond, Lower Mainland and Vancouver Island: First Nations designs, murals and plazas.",
    work: "Pavement public art across BC",
    links: [
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "Decorative coatings", href: "/services/decorative-coatings" },
      { label: "Public art projects", href: "/projects" },
    ],
  },
  "branding-wayfinding": {
    title: "Pavement Branding & Wayfinding in BC",
    headline: "Logos and wayfinding fused into the pavement",
    intro: [
      "Pavement branding puts a school mark, a neighbourhood logo or a wayfinding symbol into the surface itself, heat-fused rather than painted. DecoMark, the fully custom preformed thermoplastic, reproduces a logo's exact geometry in the full colour spectrum with the durability of a standard road marking; PreMark carries the arrows and the bicycle and accessible-parking symbols to the owner's marking standard, with embedded retroreflective glass beads; StreetBond® fills the field behind them in any of more than fifty standard colours or a custom match.",
      "Little Italy's neighbourhood branding on Commercial Drive; community branding at Tsawwassen Commons in Delta; school branding at Katzie Elementary in Surrey; oak-leaf sidewalk decals at Reunion in Murrayville, Langley; wayfinding on the Pacific Spirit Trail in North Vancouver; corporate branding in Chilliwack and provincial branding in Salmon Arm. Municipalities, developers, school districts and commercial properties commission the work; Square One installs across the Lower Mainland and Vancouver Island.",
    ],
    products: ["decomark", "premark", "streetbond", "duratherm"],
    seo: "Pavement branding and wayfinding in DecoMark and PreMark thermoplastic with StreetBond colour for schools, retail and civic sites in BC. Fused, not painted.",
    work: "Pavement branding and wayfinding across BC",
    links: [
      { label: "Preformed thermoplastic", href: "/services/preformed-thermoplastic" },
      { label: "DecoMark", href: "/products/decomark" },
      { label: "Branding projects", href: "/projects" },
    ],
  },
}
