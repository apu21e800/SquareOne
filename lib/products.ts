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
  galleryImages: string[]
  serviceSlug: string
}

export const products: Product[] = [
  {
    slug: "streetprint",
    name: "StreetPrint",
    tagline: "Stamped asphalt that looks like brick, cobblestone, or custom pattern.",
    category: "Stamped Asphalt",
    shortDescription:
      "The industry standard for decorative stamped asphalt. StreetPrint transforms ordinary asphalt into beautiful, durable surfaces that mimic natural materials.",
    fullDescription:
      "StreetPrint is the world's leading decorative asphalt imprinting system. Using heated templates pressed into fresh asphalt, it creates realistic brick, cobblestone, slate, and custom patterns that are built into the asphalt itself — not painted on. The result is a surface that looks stunning and performs reliably in BC's demanding climate, from wet coastal winters to freeze-thaw cycles inland.",
    keyBenefits: [
      "ASTM D3939 slip-resistant surface",
      "8+ year service life in BC conditions",
      "Snowplow and de-icing salt safe",
      "Custom patterns and colours available",
      "Retroreflective options for crosswalks",
      "Minimal road closure time",
    ],
    applications: ["Crosswalks", "Roundabouts", "Traffic Calming", "Decorative Driveways", "Plaza Entries", "Commercial Streetscapes"],
    image: "/images/products/streetprint/streetprint-1.jpg",
    galleryImages: ["/images/products/streetprint/streetprint-1.jpg"],
    serviceSlug: "stamped-asphalt",
  },
  {
    slug: "streetbond",
    name: "StreetBond",
    tagline: "Coloured pavement coating for bike lanes, plazas, courts, and driveways.",
    category: "Decorative Coatings",
    shortDescription:
      "High-performance water-based coating system available in dozens of colours. Anti-skid, UV stable, and engineered for both municipal and residential applications.",
    fullDescription:
      "StreetBond is a versatile coloured pavement surface treatment used across North America for bike lanes, bus priority corridors, decorative driveways, sports courts, and public plazas. The water-based formula is eco-friendly, and the anti-skid aggregate provides grip even in wet BC conditions. Retroreflective options support Vision Zero nighttime visibility requirements.",
    keyBenefits: [
      "50+ standard colours + custom mixing",
      "Anti-skid aggregate for wet surfaces",
      "UV stable — 5+ year colour retention",
      "Retroreflective options available",
      "Eco-friendly water-based formula",
      "Works on asphalt and concrete",
    ],
    applications: ["Bike Lanes", "Bus Priority Corridors", "Decorative Driveways", "Sports Courts", "Plazas", "School Zones", "Parking Lots"],
    image: "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
    galleryImages: [
      "/images/products/streetbond/streetbond-red-roundabout-mountains-01.jpg",
      "/images/products/streetbond/streetbond-driveway.jpg",
      "/images/products/streetbond/streetbond-multicolour-geometric-plaza-01.jpg",
    ],
    serviceSlug: "decorative-coatings",
  },
  {
    slug: "trafficpatterns",
    name: "TrafficPatterns",
    tagline: "Decorative preformed thermoplastic for crosswalks and pedestrian zones.",
    category: "Thermoplastic",
    shortDescription:
      "Preformed thermoplastic patterns that combine visual interest with high-durability road marking performance. No spray drift, no inconsistency.",
    fullDescription:
      "TrafficPatterns preformed thermoplastic delivers decorative crosswalk, transit stop, and pedestrian zone markings with precision impossible to achieve with spray paint. Each element is manufactured to specification and heat-fused to the pavement surface for a bond that lasts. Available in a wide range of colours and patterns.",
    keyBenefits: [
      "No spray drift or overspray",
      "Precise placement every time",
      "Retroreflective glass beads included",
      "7+ year service life",
      "MUTCD compliant",
      "Fast installation, minimal downtime",
    ],
    applications: ["Decorative Crosswalks", "Transit Stop Platforms", "Pedestrian Zones", "School Entrances", "Plaza Accents"],
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
    galleryImages: ["/images/products/traffic-patterns/trafficpatterns-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "trafficpatterns-xd",
    name: "TrafficPatternsXD",
    tagline: "Heavy-duty thermoplastic for high-traffic intersections and transit corridors.",
    category: "Thermoplastic",
    shortDescription:
      "Extra-durable version of TrafficPatterns engineered for the highest-wear environments — major intersections, transit hubs, and arterial crosswalks.",
    fullDescription:
      "TrafficPatternsXD uses a thicker thermoplastic formulation with enhanced wear resistance for BC's busiest intersections and transit corridors. Where standard thermoplastic would show wear within 3–4 years, XD maintains appearance and retroreflectivity for 10+ years in high-traffic environments.",
    keyBenefits: [
      "10+ year service life in high-traffic zones",
      "Thicker formulation resists wear",
      "Enhanced retroreflectivity maintained longer",
      "Same precision placement as TrafficPatterns",
      "Ideal for transit hubs and major intersections",
    ],
    applications: ["Major Intersections", "Transit Hubs", "Arterial Crosswalks", "Bus Stops", "High-Volume Pedestrian Zones"],
    image: "/images/products/traffic-patterns-xd/trafficpatterns-xd-1.jpg",
    galleryImages: ["/images/products/traffic-patterns-xd/trafficpatterns-xd-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "decomark",
    name: "DecoMark",
    tagline: "Custom decorative graphics and logos in preformed thermoplastic.",
    category: "Thermoplastic",
    shortDescription:
      "Fully custom preformed thermoplastic graphics — municipality logos, school mascots, wayfinding icons, and any complex design imaginable.",
    fullDescription:
      "DecoMark takes preformed thermoplastic beyond standard crosswalk patterns into fully custom graphic territory. Community logos, school district emblems, wayfinding symbols, and complex artistic designs can be reproduced in thermoplastic with the same durability as standard road markings. Used extensively for community identity projects across Canada.",
    keyBenefits: [
      "Any custom design or logo",
      "Full colour spectrum available",
      "Same durability as standard thermoplastic",
      "Used for community identity projects",
      "Wayfinding and ADA-compliant options",
    ],
    applications: ["Community Logos", "School Zone Graphics", "Wayfinding Symbols", "Public Art", "Event Markings"],
    image: "/images/products/decomark/decomark-1.jpg",
    galleryImages: ["/images/products/decomark/decomark-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "durashield",
    name: "DuraShield",
    tagline: "Protective asphalt sealer that extends pavement life and improves appearance.",
    category: "Surface Protection",
    shortDescription:
      "Coal tar-free asphalt sealer that protects against oxidation, water infiltration, and surface deterioration while giving pavement a refreshed appearance.",
    fullDescription:
      "DuraShield is a professional-grade asphalt protective coating that extends the service life of existing pavement while improving its appearance. The coal tar-free formula is suitable for residential driveways, parking lots, and commercial properties across BC. When combined with decorative coatings, DuraShield provides an excellent base layer.",
    keyBenefits: [
      "Extends pavement life 5–7 years",
      "Coal tar-free, environmentally responsible",
      "Resists oil, fuel, and UV oxidation",
      "Gives worn asphalt a fresh appearance",
      "Ideal prep layer before decorative coatings",
    ],
    applications: ["Residential Driveways", "Parking Lots", "Commercial Properties", "Strata Complexes", "Pavement Maintenance"],
    image: "/images/products/durashield/durashield-parking-lot-sealcoat-01.jpg",
    galleryImages: [
      "/images/products/durashield/durashield-parking-lot-sealcoat-01.jpg",
      "/images/products/durashield/durashield-residential-driveway-01.jpg",
    ],
    serviceSlug: "decorative-coatings",
  },
  {
    slug: "duratherm",
    name: "DuraTherm",
    tagline: "Standard thermoplastic road markings built for long service life.",
    category: "Thermoplastic",
    shortDescription:
      "Professional thermoplastic pavement markings for stop bars, arrows, legends, and lane lines. High retroreflectivity and proven durability for BC municipalities.",
    fullDescription:
      "DuraTherm is the workhorse thermoplastic marking product for arrows, stop bars, crosswalk bars, legends, and zone markings. Applied using inset or surface-applied methods, DuraTherm provides the retroreflectivity and durability that BC municipalities demand, with a service life well beyond painted markings.",
    keyBenefits: [
      "Superior retroreflectivity vs. paint",
      "Inset or surface-applied options",
      "Works on asphalt and concrete",
      "MUTCD and TAC compliant",
      "Resistant to BC freeze-thaw cycles",
    ],
    applications: ["Stop Bars", "Turn Arrows", "Crosswalk Bars", "Speed Legends", "Lane Lines", "Yield Triangles"],
    image: "/images/products/duratherm/duratherm-1.jpg",
    galleryImages: ["/images/products/duratherm/duratherm-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "mmax",
    name: "MMAX",
    tagline: "MMA-based high-performance coloured pavement for bus rapid transit and bike infrastructure.",
    category: "Decorative Coatings",
    shortDescription:
      "Methyl methacrylate (MMA) coloured pavement system for the most demanding urban mobility infrastructure. Faster cure time, higher durability, maximum colour retention.",
    fullDescription:
      "MMAX is a cold-applied MMA (methyl methacrylate) coloured pavement system developed for high-wear BRT corridors, bus-only lanes, high-volume bike lanes, and complex multi-colour transit infrastructure. Compared to water-based coatings, MMA offers faster cure times (even in cold BC weather), superior bond strength, and dramatically longer service life in heavy-wear environments.",
    keyBenefits: [
      "MMA chemistry for superior wear resistance",
      "Rapid cure — open to traffic in under an hour",
      "Works in near-freezing BC temperatures",
      "High retroreflectivity maintained long-term",
      "Specified by TransLink and BC Transit",
      "Multi-colour capability for complex designs",
    ],
    applications: ["Bus Rapid Transit Corridors", "Bus-Only Lanes", "High-Volume Bike Lanes", "Transit Priority Infrastructure", "Urban BRT Systems"],
    image: "/images/products/mmax/mmax-red-bus-lane-downtown-highrise-01.jpg",
    galleryImages: [
      "/images/products/mmax/mmax-red-bus-lane-downtown-highrise-01.jpg",
      "/images/products/mmax/mmax-green-bike-lane-installation-01.jpg",
      "/images/products/mmax/red-bus-green-bike-lane-dual-colour-01.jpg",
    ],
    serviceSlug: "decorative-coatings",
  },
  {
    slug: "premark",
    name: "PreMark",
    tagline: "Preformed thermoplastic arrows, legends, and symbols — fast installation.",
    category: "Thermoplastic",
    shortDescription:
      "Industry-standard preformed thermoplastic pavement markings for arrows, symbols, and legends. Consistent quality, fast deployment, long service life.",
    fullDescription:
      "PreMark preformed thermoplastic markings are manufactured to exact dimensions for arrows, legends, symbols, and specialty markings used on BC roads. Unlike spray-applied alternatives, PreMark ensures dimensional consistency every time — no irregular edges, no spray overspray. Heat-applied to pavement for a permanent bond with embedded retroreflective glass beads.",
    keyBenefits: [
      "Consistent dimensions — no irregular edges",
      "Embedded retroreflective glass beads",
      "Faster installation than spray marking",
      "Available in all standard arrow/legend types",
      "MUTCD and TAC standard compliant",
    ],
    applications: ["Turn Arrows", "Speed Legends", "Bicycle Symbols", "Accessible Parking Symbols", "School Zone Markings", "Bus Stop Markings"],
    image: "/images/products/premark/premark-arrows-installation-intersection-01.jpg",
    galleryImages: [
      "/images/products/premark/premark-arrows-installation-intersection-01.jpg",
      "/images/products/premark/roadway-turn-arrows-pavement-marking-01.jpg",
    ],
    serviceSlug: "preformed-thermoplastic",
  },
]

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)
