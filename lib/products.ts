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

export const products: Product[] = [
  {
    slug: "streetprint",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Method", v: "Heated template imprinted into the asphalt" },
      { k: "Substrate", v: "New or existing asphalt" },
      { k: "Service life", v: "10–20 years, published by HUB" },
      { k: "Surface", v: "Slip-resistant texture, snowplough and salt safe" },
      { k: "Options", v: "Custom patterns and colours; retroreflective for crosswalks" },
    ],
    mark: "®",
    name: "StreetPrint",
    tagline: "Stamped asphalt that looks like brick, cobblestone, or custom pattern.",
    category: "Stamped Asphalt",
    shortDescription:
      "HUB's decorative asphalt imprinting system, and the one most BC municipalities specify by name. StreetPrint presses ordinary asphalt into patterned, durable surfaces that read as brick, cobble or slate.",
    fullDescription:
      "StreetPrint works by pressing a heated steel template into fresh asphalt, so the brick, cobble, slate or custom pattern is built into the surface rather than painted onto it — there is nothing to peel, and nothing to re-lay. StreetBond colour is then rolled into the imprint. The surface holds its pattern and its colour through wet coastal winters and freeze-thaw cycles inland.",
    keyBenefits: [
      "Slip-resistant textured surface",
      "10–20 year published service life",
      "Snowplow and de-icing salt safe",
      "Custom patterns and colours available",
      "Retroreflective options for crosswalks",
      "Minimal road closure time",
    ],
    applications: ["Crosswalks", "Roundabouts", "Traffic Calming", "Decorative Driveways", "Plaza Entries", "Commercial Streetscapes"],
    image: "/images/products/streetprint/streetprint-new-westminster-city-hall-01.jpg",
    galleryImages: ["/images/products/streetprint/streetprint-1.jpg"],
    serviceSlug: "stamped-asphalt",
  },
  {
    slug: "streetbond",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Water-based acrylic pavement coating" },
      { k: "Substrate", v: "Asphalt or concrete" },
      { k: "Colour", v: "50+ standard, custom mixing" },
      { k: "Life cycle", v: "8+ years, refreshed rather than replaced" },
      { k: "Surface", v: "Anti-skid aggregate" },
      { k: "Options", v: "Retroreflective" },
    ],
    mark: "®",
    name: "StreetBond",
    tagline: "Coloured pavement coating for bike lanes, plazas, courts, and driveways.",
    category: "Decorative Coatings",
    shortDescription:
      "High-performance water-based coating system available in dozens of colours. Anti-skid, UV stable, and engineered for both municipal and residential applications.",
    fullDescription:
      "StreetBond is HUB's coloured pavement coating, specified across North America; we install it across BC for bike lanes, bus priority corridors, driveways, sports courts, and public plazas. The water-based formula keeps application simple, and the anti-skid aggregate holds grip through wet BC winters. Retroreflective options support nighttime visibility where the owner requires it.",
    keyBenefits: [
      "50+ standard colours + custom mixing",
      "Anti-skid aggregate for wet surfaces",
      "UV-stable acrylic — 8+ year life cycle, easily refreshed",
      "Retroreflective options available",
      "Eco-friendly water-based formula",
      "Works on asphalt and concrete",
    ],
    applications: ["Bike Lanes", "Bus Priority Corridors", "Decorative Driveways", "Sports Courts", "Plazas", "School Zones", "Parking Lots"],
    image: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
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
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Preformed thermoplastic, heat-fused to the pavement" },
      { k: "Thickness", v: "125 mil" },
      { k: "Surface", v: "Anti-skid elements throughout the sheet" },
      { k: "Return to traffic", v: "Minutes after application" },
      { k: "Made to", v: "The owner's marking standard" },
    ],
    mark: "™",
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
      "Anti-skid elements throughout the 125-mil sheet",
      "Open to traffic within minutes of application",
      "Made to the owner's marking standard",
      "Fast installation, minimal downtime",
    ],
    applications: ["Decorative Crosswalks", "Transit Stop Platforms", "Pedestrian Zones", "School Entrances", "Plaza Accents"],
    image: "/images/products/traffic-patterns/trafficpatterns-ubc-musqueam-plate-01.jpg",
    galleryImages: ["/images/products/traffic-patterns/trafficpatterns-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "trafficpatterns-xd",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Preformed thermoplastic, heat-fused to the pavement" },
      { k: "Thickness", v: "150 mil — 125 mil on standard TrafficPatterns" },
      { k: "Substrate", v: "Prepared asphalt" },
      { k: "Surface", v: "New anti-skid elements exposed as the sheet wears" },
      { k: "Range", v: "The TrafficPatterns patterns, borders and colours" },
    ],
    mark: "™",
    name: "TrafficPatternsXD",
    tagline: "Heavy-duty thermoplastic for high-traffic intersections and transit corridors.",
    category: "Thermoplastic",
    shortDescription:
      "Extra-durable version of TrafficPatterns engineered for the highest-wear environments — major intersections, transit hubs, and arterial crosswalks.",
    fullDescription:
      "TrafficPatternsXD is the heavy-duty version of TrafficPatterns: 150-mil sheets instead of 125, positioned on prepared asphalt and heat-fused, for BC's busiest intersections and transit corridors where the standard material would wear faster. As the surface wears, new anti-skid elements are exposed.",
    keyBenefits: [
      "150-mil sheets — heavier than standard TrafficPatterns",
      "New anti-skid elements exposed as the material wears",
      "Fast installation, minimal traffic downtime",
      "Same patterns, borders and colours as TrafficPatterns",
      "Built for transit hubs and major intersections",
    ],
    applications: ["Major Intersections", "Transit Hubs", "Arterial Crosswalks", "Bus Stops", "High-Volume Pedestrian Zones"],
    image: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg",
    galleryImages: ["/images/products/traffic-patterns-xd/trafficpatterns-xd-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "decomark",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Preformed thermoplastic, heat-fused to the pavement" },
      { k: "Artwork", v: "Fully custom — logos, emblems, wayfinding symbols" },
      { k: "Colour", v: "Full spectrum" },
      { k: "Durability", v: "As standard thermoplastic" },
    ],
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
      "Wayfinding and accessibility symbol options",
    ],
    applications: ["Community Logos", "School Zone Graphics", "Wayfinding Symbols", "Public Art", "Event Markings"],
    image: "/images/products/decomark/decomark-victoria-harbour-01.jpg",
    galleryImages: ["/images/products/decomark/decomark-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "durashield",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Two-component waterborne epoxy-modified acrylic" },
      { k: "Substrate", v: "Asphalt" },
      { k: "Finish", v: "Black or Solar Gray" },
      { k: "Solar reflectance", v: "0.33 initial, Solar Gray" },
      { k: "VOC", v: "Low; no unpleasant odour during installation" },
      { k: "End of life", v: "Recyclable with the asphalt" },
    ],
    name: "DuraShield",
    tagline: "Two-component asphalt maintenance coating — black or solar-reflective grey.",
    category: "Surface Protection",
    shortDescription:
      "HUB's waterborne epoxy-modified acrylic maintenance coating for asphalt. It protects the pavement from UV oxidation, resists chemicals and gives tired asphalt a uniform finish — in black or Solar Gray.",
    fullDescription:
      "DuraShield Pavement Coating is a two-component waterborne epoxy-modified acrylic formulated as an asphalt pavement maintenance coating — primarily for parking lots, and used on driveways, pathways, raised medians and pedestrian plazas. It balances flexibility, adhesion, colour stability and chemical resistance to preserve the asphalt while shielding it from UV oxidation. The Solar Gray version has an initial solar reflectance of 0.33, which keeps pavement cooler and helps mitigate urban heat island effects.",
    keyBenefits: [
      "Protects asphalt from UV oxidation",
      "Excellent chemical resistance",
      "Black or Solar Gray (initial SR 0.33) finish",
      "Friction suited to pedestrian and vehicle traffic",
      "Low VOC, no unpleasant odour during installation",
      "Fully recyclable with asphalt",
    ],
    applications: ["Parking Lots", "Residential Driveways", "Pathways", "Raised Medians", "Pedestrian Plazas", "Pavement Restoration"],
    image: "/images/products/durashield/durashield-rejuvenated-driveway-02.jpg",
    galleryImages: [
      "/images/products/durashield/durashield-parking-lot-sealcoat-01.jpg",
      "/images/products/durashield/durashield-residential-driveway-01.jpg",
    ],
    serviceSlug: "decorative-coatings",
  },
  {
    slug: "duratherm",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Thermoplastic pavement marking" },
      { k: "Application", v: "Inset or surface-applied" },
      { k: "Substrate", v: "Asphalt or concrete" },
      { k: "Optics", v: "Retroreflective" },
      { k: "Standards", v: "TAC shapes and legends" },
    ],
    name: "DuraTherm",
    tagline: "Standard thermoplastic road markings built for long service life.",
    category: "Thermoplastic",
    shortDescription:
      "Thermoplastic pavement markings for stop bars, arrows, legends and lane lines — retroreflective, and a service life well beyond paint.",
    fullDescription:
      "DuraTherm is the workhorse thermoplastic marking product for arrows, stop bars, crosswalk bars, legends, and zone markings. Applied using inset or surface-applied methods, DuraTherm provides the retroreflectivity and durability that BC municipalities demand, with a service life well beyond painted markings.",
    keyBenefits: [
      "Superior retroreflectivity vs. paint",
      "Inset or surface-applied options",
      "Works on asphalt and concrete",
      "TAC-standard shapes and legends",
      "Resistant to BC freeze-thaw cycles",
    ],
    applications: ["Stop Bars", "Turn Arrows", "Crosswalk Bars", "Speed Legends", "Lane Lines", "Yield Triangles"],
    image: "/images/products/duratherm/duratherm-maple-ridge-crosswalk-01.jpg",
    galleryImages: ["/images/products/duratherm/duratherm-1.jpg"],
    serviceSlug: "preformed-thermoplastic",
  },
  {
    slug: "premark",
    specs: [
      { k: "Manufacturer", v: "HUB Surface Systems" },
      { k: "Type", v: "Preformed thermoplastic, heat-applied" },
      { k: "Substrate", v: "Asphalt or concrete" },
      { k: "Optics", v: "Embedded retroreflective glass beads" },
      { k: "Tolerance", v: "Manufactured to exact dimensions — no irregular edges" },
      { k: "Standards", v: "TAC arrows, legends and symbols" },
    ],
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
      "TAC-standard arrows, legends and symbols",
    ],
    applications: ["Turn Arrows", "Speed Legends", "Bicycle Symbols", "Accessible Parking Symbols", "School Zone Markings", "Bus Stop Markings"],
    image: "/images/products/premark/premark-north-vancouver-green-bike-lane-01.jpg",
    galleryImages: [
      "/images/products/premark/premark-arrows-installation-intersection-01.jpg",
      "/images/products/premark/roadway-turn-arrows-pavement-marking-01.jpg",
    ],
    serviceSlug: "preformed-thermoplastic",
  },
]

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)
