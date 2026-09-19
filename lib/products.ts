export interface Product {
  slug: string
  name: string
  tagline: string
  category: "Stamped Asphalt" | "Decorative Coatings" | "Thermoplastic" | "Surface Protection"
  shortDescription: string
  fullDescription: string
  keyBenefits: string[]
  applications: string[]
  image: string
  /**
   * What the hero photograph shows — the surface, the system and the place
   * where the record carries it (the filename, lib/work-captions.ts or
   * lib/projects.ts). Never "installed by Square One" unless the record says
   * the frame is Square One's own.
   */
  imageAlt: string
  galleryImages: string[]
  serviceSlug: string
  /**
   * The data-sheet rows on the product page. Every value here is a
   * restatement of something the page already publishes — HUB's own
   * figures, the substrate, the method — and nothing in it is inferred.
   * Retired 17 Sept 2026: "System", "Category", "Installed by Square One
   * Paving, since 2000", "7 applications listed below". Vern, relaying the
   * client: "iMPROVE PRODUCT SPECIFICATIONS DETAILS. For example, we don't
   * need to say 'Installed by Square One Paving, since 2000' that's
   * obvious." A specification panel that restates the page's own furniture
   * is furniture. Add a row only when a HUB document says so.
   */
  specs: { k: string; v: string }[]
  /** HUB's registered/trade mark, shown on first mention (the product page H1). Never appended to `name` — lib/work.ts matches on the bare name. */
  mark?: "®" | "™"
}

/*
 * Copy rules for every entry (the 19 Sept 2026 editorial pass):
 *   - HUB Surface Systems manufactures; Square One installs. Performance
 *     figures are HUB's and say so.
 *   - shortDescription is the meta description (≤ 158 characters through
 *     clampDescription) and the aside on project pages: system, region,
 *     one concrete benefit.
 *   - fullDescription names only places that are on the record in
 *     lib/projects.ts or lib/work.ts as Square One's own installs.
 *   - The product's own mark rides the H1; other systems named in the copy
 *     carry theirs on first mention.
 */
export const products: Product[] = [
  {
    slug: "streetprint",
    specs: [
      { k: "Method", v: "Heated steel template pressed into the asphalt" },
      { k: "Substrate", v: "New asphalt, or sound existing asphalt" },
      { k: "Colour", v: "StreetBond coating, rolled into the imprint" },
      { k: "Service life", v: "10–20 years, published by the manufacturer" },
      { k: "Surface", v: "Slip-resistant texture; snowplough and de-icing salt safe" },
      { k: "Options", v: "Custom patterns and colours; retroreflective for crosswalks" },
    ],
    mark: "®",
    name: "StreetPrint",
    tagline: "Stamped asphalt in brick, cobble or slate — pressed into the asphalt itself.",
    category: "Stamped Asphalt",
    shortDescription:
      "Brick, cobble or slate pressed into the asphalt — the imprinting system Square One installs across the Lower Mainland and Vancouver Island; 10–20 year service life, per the manufacturer.",
    fullDescription:
      "StreetPrint is an asphalt imprinting system — the regular kind of stamped asphalt Square One installs; TrafficPatternsXD™ is the heavy-duty kind. The asphalt — new, or existing and sound — is reheated and a steel template is pressed into it, so the brick, cobble, slate or custom pattern is part of the surface rather than a layer on top of it: nothing to peel, nothing to re-lay, no demolition and no new base. StreetBond® colour is then rolled into the imprint. The textured surface is slip-resistant and safe for snowploughs and de-icing salt, and the manufacturer publishes a 10–20 year service life for it. Square One installs StreetPrint across the Lower Mainland and Vancouver Island — the school crosswalk at Grandview Heights in Surrey, the parking lot walkways at Ralph's Farm Market in Langley and the pewter herringbone streetscape in Mission are all on the record.",
    keyBenefits: [
      "10–20 year service life, published by the manufacturer",
      "Slip-resistant textured surface",
      "Snowplough and de-icing salt safe",
      "Goes into new or sound existing asphalt — no demolition, no new base",
      "Custom patterns, coloured with StreetBond",
      "Retroreflective option for crosswalks",
    ],
    applications: ["Crosswalks", "Roundabouts", "Traffic Calming", "Commercial Streetscapes", "Parking Lots", "Plaza Entries", "Decorative Driveways"],
    image: "/images/products/streetprint/streetprint-new-westminster-city-hall-01.jpg",
    imageAlt: "A red brick-pattern StreetPrint walkway crossing the parking lot to the front doors of New Westminster City Hall",
    galleryImages: ["/images/products/streetprint/streetprint-1.jpg"],
    serviceSlug: "stamped-asphalt",
  },
  {
    slug: "streetbond",
    specs: [
      { k: "Type", v: "Water-based acrylic pavement coating" },
      { k: "Versions", v: "StreetBond 150; StreetBond SR, solar-reflective" },
      { k: "Substrate", v: "Asphalt or concrete, each with its own primer" },
      { k: "Colour", v: "50+ standard, custom mixing" },
      { k: "Life cycle", v: "8+ years, published by the manufacturer; recoated rather than replaced" },
      { k: "Surface", v: "Anti-skid aggregate" },
      { k: "Options", v: "Retroreflective" },
    ],
    mark: "®",
    name: "StreetBond",
    tagline: "Coloured pavement coating for bike lanes, plazas, spray parks, courts and driveways.",
    category: "Decorative Coatings",
    shortDescription:
      "Coloured pavement coating for asphalt and concrete across the Lower Mainland and Vancouver Island — 50+ colours, anti-skid, 8+ year life cycle per the manufacturer.",
    fullDescription:
      "StreetBond is a coloured pavement coating: a UV-stable, water-based acrylic that bonds to asphalt and to concrete, with the appropriate primer for each. It comes in more than fifty standard colours with custom mixing, in two versions — StreetBond 150, and the solar-reflective StreetBond SR — and carries an anti-skid aggregate for wet surfaces, with a retroreflective option where the owner needs night visibility. The manufacturer publishes an 8+ year life cycle, and a worn surface is recoated rather than rebuilt. Square One installs it across the Lower Mainland and Vancouver Island on bike lanes, bus priority corridors, spray parks, plazas, sports courts, school zones and driveways, and as the colour on StreetPrint® stamped asphalt: the Circle of Life plaza at Langley Events Centre, the public art at Joyce Station in Vancouver, the spray parks in Maple Ridge and Burnaby and a decorative fire lane in North Vancouver are on the record.",
    keyBenefits: [
      "50+ standard colours, plus custom mixing",
      "Anti-skid aggregate for wet surfaces",
      "8+ year life cycle, published by the manufacturer — recoated, not rebuilt",
      "UV-stable, water-based acrylic",
      "Bonds to asphalt and concrete, with the right primer for each",
      "Retroreflective and solar-reflective (SR) versions",
    ],
    applications: ["Bike Lanes", "Bus Priority Corridors", "Spray Parks", "Plazas", "Sports Courts", "School Zones", "Parking Lots", "Decorative Driveways"],
    image: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
    imageAlt: "Multicolour StreetBond plaza in stripes of yellow, orange, red and green under the SkyTrain guideway at Joyce Station, Vancouver, at dusk",
    galleryImages: [
      "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
      "/images/products/streetbond/streetbond-multicolour-plaza-green-circles-01.jpg",
      "/images/products/streetbond/streetbond-driveway.jpg",
      "/images/products/streetbond/streetbond-multicolour-geometric-plaza-01.jpg",
    ],
    serviceSlug: "decorative-coatings",
  },
  {
    slug: "trafficpatterns",
    specs: [
      { k: "Type", v: "Preformed thermoplastic, heat-fused to the pavement" },
      { k: "Thickness", v: "125 mil" },
      { k: "Surface", v: "Anti-skid elements throughout the sheet" },
      { k: "Return to traffic", v: "Minutes after application" },
      { k: "Design", v: "Patterns, borders and custom artwork, cut to the drawing" },
      { k: "Made to", v: "The owner's marking standard" },
    ],
    mark: "™",
    name: "TrafficPatterns",
    tagline: "Decorative preformed thermoplastic for crosswalks, transit stops and pedestrian zones.",
    category: "Thermoplastic",
    shortDescription:
      "Decorative preformed thermoplastic for crosswalks, heat-fused in place across the Lower Mainland and Vancouver Island — open to traffic in minutes.",
    fullDescription:
      "TrafficPatterns is a decorative preformed thermoplastic. Each sheet is manufactured to the design — a brick pattern, a border, an artist's crosswalk, a community graphic — and cut before it reaches the site, so the placement is precise and there is no spray drift or overspray. Square One heat-fuses the 125-mil sheets to the pavement, and the crossing is open to traffic within minutes of application. Anti-skid elements run through the whole sheet, and the colours and symbols follow the owner's marking standard. It is the system behind decorative crosswalks, transit stop platforms and pedestrian zones across the Lower Mainland and Vancouver Island, including the UBC and Musqueam crosswalk on University Boulevard, the Musqueam crossing on Granville Street, the artist-designed crosswalk in White Rock and the Every Child Matters crossing in New Westminster.",
    keyBenefits: [
      "Manufactured to the design — precise placement, no overspray",
      "Open to traffic within minutes of application",
      "Anti-skid elements throughout the 125-mil sheet",
      "Colours and symbols to the owner's marking standard",
      "Patterns, borders and custom artwork",
      "Heat-fused to the pavement in place — short closures",
    ],
    applications: ["Decorative Crosswalks", "Transit Stop Platforms", "Pedestrian Zones", "School Entrances", "Plaza Accents", "Public Art"],
    image: "/images/products/traffic-patterns/trafficpatterns-ubc-musqueam-plate-01.jpg",
    imageAlt: "Musqueam artwork in blue, green and gold TrafficPatterns thermoplastic on the crosswalk beside the UBC letters on University Boulevard, Vancouver",
    galleryImages: ["/images/products/traffic-patterns/trafficpatterns-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "trafficpatterns-xd",
    specs: [
      { k: "Type", v: "Aggregate-reinforced preformed thermoplastic, heated and stamped into the asphalt" },
      { k: "Thickness", v: "150 mil — 125 mil on standard TrafficPatterns" },
      { k: "Substrate", v: "Prepared asphalt" },
      { k: "Surface", v: "New anti-skid elements exposed as the sheet wears" },
      { k: "Range", v: "The TrafficPatterns patterns, borders and colours" },
    ],
    mark: "™",
    name: "TrafficPatternsXD",
    tagline: "The heavy-duty kind of stamped asphalt — for the busiest intersections and transit corridors.",
    // Sold beside StreetPrint as the second kind of stamped asphalt (Jan, via
    // the client's review, 10 and 19 Sept 2026): StreetPrint is the regular
    // system, TrafficPatternsXD the durable one. What it is made of stays
    // exact in the specs and the copy — a preformed thermoplastic, heated
    // and stamped into the top of the asphalt rather than pressed from it.
    category: "Stamped Asphalt",
    shortDescription:
      "Heavy-duty stamped asphalt across the Lower Mainland and Vancouver Island: 150-mil aggregate-reinforced thermoplastic, heated and stamped into the asphalt.",
    fullDescription:
      "Square One installs two kinds of stamped asphalt. StreetPrint® presses the pattern into the asphalt itself; TrafficPatternsXD is the heavy-duty alternative from the same manufacturer — 150-mil aggregate-reinforced preformed thermoplastic sheets, 25 mil thicker than standard TrafficPatterns™, heated and stamped into the top layer of prepared asphalt. As the surface wears, new anti-skid elements are exposed. It takes the same patterns, borders and colours as TrafficPatterns, and it is the material Square One puts down where the traffic is heaviest across the Lower Mainland and Vancouver Island: the rainbow intersection in Nanaimo, the railroad-inspired crosswalk in the City of Langley, the Brighouse Station crossings in Richmond, the Little Italy crosswalks on Commercial Drive, the White Rock Pier crosswalk and the Granville Island crosswalk, photographed two years on.",
    keyBenefits: [
      "150-mil sheets — 25 mil heavier than standard TrafficPatterns",
      "New anti-skid elements exposed as the surface wears",
      "Heated and stamped into the asphalt",
      "Same patterns, borders and colours as TrafficPatterns",
      "Fast installation, short traffic closures",
      "For transit hubs, arterial crosswalks and major intersections",
    ],
    applications: ["Major Intersections", "Arterial Crosswalks", "Transit Hubs", "Bus Stops", "Traffic Calming", "High-Volume Pedestrian Zones"],
    image: "/images/applications/crosswalks/langley-railways-crossing-at-the-heritage-block-trafficpatternsxd-01.jpg",
    imageAlt: "Artist-designed crosswalk of waves, sand and sky on Marine Drive, White Rock, with yellow tactile plates at the curb and red brick-pattern curb extensions either side",
    galleryImages: ["/images/products/traffic-patterns-xd/trafficpatterns-xd-1.jpg"],
    serviceSlug: "stamped-asphalt",
  },
  {
    slug: "decomark",
    specs: [
      { k: "Type", v: "Preformed thermoplastic, heat-fused to the pavement" },
      { k: "Artwork", v: "Fully custom — logos, emblems, wayfinding symbols, artist's designs" },
      { k: "Colour", v: "Full spectrum" },
      { k: "Durability", v: "As standard thermoplastic" },
    ],
    mark: "®",
    name: "DecoMark",
    tagline: "Custom decorative graphics and logos in preformed thermoplastic.",
    category: "Thermoplastic",
    shortDescription:
      "Custom preformed thermoplastic — logos, emblems and artwork heat-fused into the pavement across the Lower Mainland and Vancouver Island.",
    fullDescription:
      "DecoMark is a custom preformed thermoplastic. The artwork is fully custom — a municipal logo, a school emblem, a wayfinding or accessibility symbol, an artist's design — cut in a full spectrum of colour and heat-fused to the pavement with the durability of standard thermoplastic. Square One installs it across the Lower Mainland and Vancouver Island for community branding, school grounds and public art: the Little Italy branding on Commercial Drive in Vancouver, the oak-leaf sidewalk decals at Reunion in Murrayville, the sensory play pathway at South Langford Elementary and the whorl and canoes at Victoria High School are on the record.",
    keyBenefits: [
      "Fully custom artwork — logos, emblems, wayfinding symbols",
      "Full colour spectrum",
      "Same durability as standard thermoplastic",
      "Heat-fused to the pavement",
      "Community branding, school and public art projects across BC",
      "Wayfinding and accessibility symbols",
    ],
    applications: ["Branding & Wayfinding", "Community Logos", "School Zone Graphics", "Public Art", "Parks & Paths", "Event Markings"],
    image: "/images/products/decomark/decomark-victoria-harbour-01.jpg",
    imageAlt: "A DecoMark sun emblem in orange on a white disc, set into a grey stone-pattern surface under a timber play structure at Victoria harbour",
    galleryImages: ["/images/products/decomark/decomark-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "durashield",
    specs: [
      { k: "Type", v: "Two-component waterborne epoxy-modified acrylic" },
      { k: "Substrate", v: "Asphalt" },
      { k: "Finish", v: "Black or Solar Gray" },
      { k: "Solar reflectance", v: "0.33 initial, Solar Gray, per the manufacturer" },
      { k: "VOC", v: "Low; no unpleasant odour during installation" },
      { k: "End of life", v: "Recyclable with the asphalt" },
    ],
    name: "DuraShield",
    tagline: "Two-component asphalt maintenance coating — black or solar-reflective grey.",
    category: "Surface Protection",
    shortDescription:
      "Asphalt maintenance coating, black or Solar Gray, shielding asphalt from UV oxidation — installed across the Lower Mainland and Vancouver Island.",
    fullDescription:
      "DuraShield Pavement Coating is an asphalt maintenance coating: a two-component waterborne epoxy-modified acrylic formulated to preserve the asphalt beneath it — flexibility, adhesion, colour stability and chemical resistance in one coat — while shielding it from UV oxidation. It is made primarily for parking lots, and goes on driveways, pathways, raised medians and pedestrian plazas as well, with a friction level suited to pedestrian and vehicle traffic. It comes in black or in Solar Gray, which the manufacturer rates at an initial solar reflectance of 0.33 to keep the pavement cooler and reduce the urban heat island effect. It is low in VOCs, has no unpleasant odour during installation, and is recyclable with the asphalt at the end of its life. Square One installs it across the Lower Mainland and Vancouver Island.",
    keyBenefits: [
      "Shields asphalt from UV oxidation",
      "Black or Solar Gray — initial solar reflectance 0.33, per the manufacturer",
      "Chemical resistance, flexibility and adhesion in one coat",
      "Friction suited to pedestrian and vehicle traffic",
      "Low VOC — no unpleasant odour during installation",
      "Recyclable with the asphalt",
    ],
    applications: ["Parking Lots", "Residential Driveways", "Pathways", "Raised Medians", "Pedestrian Plazas"],
    image: "/images/products/durashield/durashield-rejuvenated-driveway-02.jpg",
    imageAlt: "A residential driveway freshly coated black with DuraShield, running up to a carport beside a shrub garden",
    galleryImages: [
      "/images/products/durashield/durashield-parking-lot-sealcoat-01.jpg",
      "/images/products/durashield/durashield-residential-driveway-01.jpg",
    ],
    serviceSlug: "decorative-coatings",
  },
  {
    slug: "duratherm",
    specs: [
      { k: "Type", v: "Thermoplastic pavement marking" },
      { k: "Application", v: "Inset or surface-applied" },
      { k: "Substrate", v: "Asphalt or concrete" },
      { k: "Optics", v: "Retroreflective" },
      { k: "Standards", v: "TAC shapes and legends" },
    ],
    mark: "®",
    name: "DuraTherm",
    tagline: "Thermoplastic road markings — stop bars, arrows and legends, inset or surface-applied.",
    category: "Thermoplastic",
    shortDescription:
      "Thermoplastic road marking — retroreflective, inset or surface-applied on asphalt and concrete across the Lower Mainland and Vancouver Island.",
    fullDescription:
      "DuraTherm is a thermoplastic pavement marking for the markings a road cannot do without: stop bars, turn arrows, crosswalk bars, speed legends, lane lines and zone markings, in TAC-standard shapes and legends. It is applied inset into the pavement or on the surface, on asphalt or concrete, and it is retroreflective; the manufacturer puts its service life well beyond painted markings. Square One installs it across the Lower Mainland and Vancouver Island, for standard markings and for decorative crosswalks — the St. Paul's Hospital crossing on Comox Street in Vancouver and crosswalks in Maple Ridge and Chilliwack are on the record.",
    keyBenefits: [
      "Retroreflective — night visibility built in",
      "Inset or surface-applied",
      "Asphalt or concrete",
      "TAC-standard shapes and legends",
      "Service life well beyond paint, per the manufacturer",
      "Standard markings and decorative crosswalks",
    ],
    applications: ["Decorative Crosswalks", "Stop Bars", "Turn Arrows", "Crosswalk Bars", "Speed Legends", "Lane Lines", "Yield Triangles"],
    image: "/images/products/duratherm/duratherm-maple-ridge-crosswalk-01.jpg",
    imageAlt: "Black and white circle-pattern DuraTherm crosswalks meeting at a signalled intersection in Maple Ridge, wet after rain",
    galleryImages: ["/images/products/duratherm/duratherm-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "premark",
    specs: [
      { k: "Type", v: "Preformed thermoplastic, heat-applied" },
      { k: "Substrate", v: "Asphalt or concrete" },
      { k: "Optics", v: "Embedded retroreflective glass beads" },
      { k: "Tolerance", v: "Manufactured to exact dimensions — no irregular edges" },
      { k: "Standards", v: "TAC arrows, legends and symbols" },
    ],
    mark: "®",
    name: "PreMark",
    tagline: "Preformed thermoplastic arrows, legends, bicycle symbols and green bike-lane markings.",
    category: "Thermoplastic",
    shortDescription:
      "Preformed thermoplastic arrows, legends and symbols, cut to exact dimensions and heat-applied across the Lower Mainland and Vancouver Island.",
    fullDescription:
      "PreMark is a preformed thermoplastic for the symbols and legends on BC roads: turn arrows, speed legends, bicycle and accessible-parking symbols, school zone and bus stop markings, in TAC-standard shapes. Every piece is manufactured to exact dimensions, so there are no irregular edges and no overspray, and it is heat-applied to asphalt or concrete with retroreflective glass beads embedded in the material — faster to install than spray marking. Square One installs it across the Lower Mainland and Vancouver Island, on its own and alongside green bike lanes and TrafficPatterns™ crossings.",
    keyBenefits: [
      "Manufactured to exact dimensions — no irregular edges, no overspray",
      "Embedded retroreflective glass beads",
      "Heat-applied to asphalt or concrete",
      "TAC-standard arrows, legends and symbols",
      "Faster to install than spray marking",
      "Bicycle symbols and green bike-lane markings",
    ],
    applications: ["Turn Arrows", "Speed Legends", "Bicycle Symbols", "Bike Lanes", "Accessible Parking Symbols", "School Zone Markings", "Bus Stop Markings"],
    image: "/images/products/premark/premark-north-vancouver-green-bike-lane-01.jpg",
    imageAlt: "A white bicycle symbol in PreMark preformed thermoplastic being heat-applied to a green bike lane in North Vancouver, the heater rig over the marking",
    galleryImages: [
      "/images/products/premark/premark-arrows-installation-intersection-01.jpg",
      "/images/products/premark/roadway-turn-arrows-pavement-marking-01.jpg",
    ],
    serviceSlug: "preformed-thermoplastic",
  },
]

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)
