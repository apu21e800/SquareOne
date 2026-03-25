export interface Service {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  fullDescription: string
  productsIncluded: string[]
  applications: string[]
  idealClients: string[]
  benefits: string[]
  imageUrl: string
}

export const services: Service[] = [
  {
    slug: "stamped-asphalt",
    name: "Stamped Asphalt",
    tagline: "Decorative asphalt that performs as good as it looks.",
    shortDescription:
      "Transform asphalt surfaces with custom patterns and colours. Our stamped asphalt systems are ASTM slip-resistant and built to last 8+ years in BC conditions.",
    fullDescription:
      "Stamped asphalt is more than aesthetics — it's functional design that performs. Whether it's a vibrant crosswalk in downtown Vancouver or a subtle traffic pattern on Vancouver Island, our StreetPrint Imprinting System delivers precision, colour, and durability. Custom patterns, reflective options, and snowplow-safe surfaces make this the choice for municipalities and developers who demand both form and function.",
    productsIncluded: [
      "StreetPrint Asphalt Imprinting System",
      "TrafficPatterns XD",
      "Custom colour mixing",
    ],
    applications: [
      "Crosswalks",
      "Roundabouts",
      "Traffic calming treatments",
      "Driveways",
      "Commercial entries",
      "Parking lot design elements",
    ],
    idealClients: [
      "BC municipalities",
      "Developers",
      "Landscape architects",
      "Property managers",
      "School districts",
    ],
    benefits: [
      "ASTM D3939 slip-resistant",
      "8+ year BC service life",
      "Snowplow safe",
      "Custom patterns available",
      "Retroreflective options",
      "Fast installation",
    ],
    imageUrl: "/images/services/stamped-asphalt/hero.jpg",
  },
  {
    slug: "vapor-blasting",
    name: "Vapor Blasting",
    tagline: "Surface preparation and removal done right, the first time.",
    shortDescription:
      "BC's premium surface preparation service. We use vapor blasting to remove road markings, graffiti, coatings, and surface contamination — leaving surfaces clean, prepped, and ready for new installations or restoration.",
    fullDescription:
      "Vapor blasting is controlled, precise surface removal. Unlike traditional sandblasting, our mobile vapor blasting system uses water and abrasive — no harsh chemicals, no environmental hazard. It's the smart choice for municipalities removing old road markings before new installations, property managers tackling graffiti, and contractors prepping surfaces for decorative systems. We're mobile across BC and certified for everything from asphalt and concrete to brick, steel, and marine vessels.",
    productsIncluded: [
      "Mobile vapor blasting equipment",
      "Water-recirculation system",
      "Certified abrasive media",
      "Environmental containment",
    ],
    applications: [
      "Road marking removal (before new installations)",
      "Graffiti removal",
      "Concrete and asphalt surface prep",
      "Fire and smoke damage cleanup",
      "Marine surface preparation",
      "Brick and stone cleaning",
      "Paint and coating removal",
      "Oxidation and rust removal",
    ],
    idealClients: [
      "BC municipalities",
      "Property managers",
      "Marine operators",
      "Restoration contractors",
      "Developers",
      "Landscape contractors",
    ],
    benefits: [
      "Environmentally responsible (water-controlled, no harsh chemicals)",
      "Works on concrete, asphalt, brick, steel, marine surfaces",
      "Portable across Lower Mainland and Vancouver Island",
      "Faster than mechanical grinding or sandblasting",
      "Ideal pre-treatment before decorative surface installation",
      "Reduces surface contamination for better adhesion",
      "Certified and insured for all surface types",
    ],
    imageUrl: "/images/services/vapor-blasting/hero.jpg",
  },
  {
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    tagline: "Colour, contrast, and durability for asphalt and concrete.",
    shortDescription:
      "High-performance coatings that add colour and safety to any asphalt or concrete surface. From bike lanes to parking lots, our StreetBond SR system delivers both aesthetics and function.",
    fullDescription:
      "Decorative coatings are the workhorse of modern urban infrastructure. Our StreetBond SR system provides colour, contrast, and critical safety features to high-traffic surfaces. Whether it's Vision Zero bicycle infrastructure in Vancouver or a BC Transit priority lane, our coatings are designed to perform in harsh climates, resist UV fading, and integrate seamlessly with surrounding pavement.",
    productsIncluded: [
      "StreetBond SR decorative coating",
      "Retroreflective aggregate",
      "Anti-skid formulations",
      "Custom colour matching",
    ],
    applications: [
      "Bike lanes",
      "Bus rapid transit corridors",
      "Parking lots and stalls",
      "Community spaces",
      "School zones",
      "Accessible parking areas",
    ],
    idealClients: [
      "BC municipalities",
      "TransLink and transit agencies",
      "Developers",
      "Strata councils",
      "Landscape architects",
    ],
    benefits: [
      "Retroreflective for night visibility",
      "UV stable, colour holds 5+ years",
      "Anti-skid aggregate for wet conditions",
      "Vision Zero compatible",
      "Eco-friendly water-based options",
      "Cost-effective for large areas",
    ],
    imageUrl: "/images/services/decorative-coatings/hero.jpg",
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    tagline: "Precision markings. Fast deployment. Long life.",
    shortDescription:
      "Custom thermoplastic markings and inset graphics for roads, parking lots, and commercial spaces. Our preformed system ensures precision every time — no spray overspray, no inconsistency.",
    fullDescription:
      "Thermoplastic markings are the gold standard for precision. Our preformed system uses TrafficPatterns and DecoMark technology to deliver custom logos, arrows, crosswalks, and graphics that integrate seamlessly with surrounding surfaces. In BC's wet climate, thermoplastic's durability and retroreflective properties make it the choice for municipalities demanding long service life and minimal maintenance.",
    productsIncluded: [
      "TrafficPatterns thermoplastic",
      "DecoMark custom graphics",
      "PreMark preformed markings",
      "DuraTherm inset system",
    ],
    applications: [
      "Crosswalk markings",
      "School zone graphics",
      "Custom logos and branding",
      "Stop bars and arrows",
      "Parking lot layout markings",
      "Transit stop graphics",
    ],
    idealClients: [
      "BC municipalities",
      "School districts",
      "Commercial properties",
      "Transit authorities",
      "Parking operators",
    ],
    benefits: [
      "Retroreflective for night visibility",
      "Quick installation (minimal road closure)",
      "MUTCD compliant",
      "Custom shapes and logos",
      "Long service life (7+ years)",
      "No spray drift or overspray",
    ],
    imageUrl: "/images/services/preformed-thermoplastic/hero.jpg",
  },
]

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug)
}
