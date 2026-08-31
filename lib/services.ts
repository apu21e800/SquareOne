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
    tagline: "Brick, cobble and slate — pressed into the asphalt you already have.",
    shortDescription:
      "Pattern and colour worked into the asphalt you already have. Our stamped asphalt systems are ASTM slip-resistant and built to last 8+ years in BC conditions.",
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
    imageUrl: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    tagline: "Crosswalks, symbols and street art, fused into the road.",
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
    imageUrl: "/images/applications/crosswalks/crosswalk-1.jpg",
  },
  {
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    tagline: "Colour that holds under buses, bikes and BC winters.",
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
    imageUrl: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
  },
  {
    slug: "vapor-blasting",
    name: "Vapour Blasting",
    tagline: "Mobile surface restoration. Dustless. Done right.",
    shortDescription:
      "BC's mobile dustless abrasive blasting service. We restore — not just clean — pavement, brick, concrete, steel, and marine surfaces. No silica dust, no harsh chemicals, no surface scarring. Specified by BC municipalities since 2000.",
    fullDescription:
      "Vapor blasting is controlled surface restoration with water and recycled glass abrasive at calibrated pressure. Unlike traditional dry sandblasting, the water sheath suppresses 95%+ of airborne particulate — which is why we're approved for occupied buildings, schools, food-grade facilities, and heritage permits where dry methods can't enter. The same rig handles a homeowner's oil-stained driveway, a heritage limestone façade in Victoria, and a hydraulic pump frame — the only difference is the pressure setting and the abrasive grade. Mobile across the Lower Mainland and Vancouver Island, owner-operated, no subcontractors.",
    productsIncluded: [
      "Truck-mounted mobile rig",
      "Industrial diesel compressor",
      "Water-recirculation system",
      "Recycled glass abrasive media",
      "Runoff containment system",
      "Profile gauge & sign-off reporting",
    ],
    applications: [
      "Driveway oil & stain removal",
      "Wood deck stripping",
      "Pool-deck calcium removal",
      "Graffiti abatement (heritage-safe)",
      "Storefront & façade restoration",
      "Parking-lot stripe & thermoplastic removal",
      "Heritage stonework — limestone, sandstone, granite",
      "Industrial steel — mill scale, oxidation, weld discoloration",
      "Marine hulls, decks, props (gelcoat preserved)",
      "Tanks, vessels & pressure equipment",
      "Pre-coating substrate prep to spec",
      "Smoke & fire damage restoration",
    ],
    idealClients: [
      "BC homeowners & estates",
      "Strata councils & HOAs",
      "Property managers",
      "BC municipalities",
      "Heritage building owners",
      "Marine operators",
      "Industrial facilities",
      "Restoration contractors",
    ],
    benefits: [
      "< 5% airborne dust (vs. 100% dry blasting)",
      "No harsh chemicals — water + recycled glass",
      "Heritage-safe — preserves original substrate",
      "Approved for occupied & food-grade environments",
      "Eco-responsible — captured runoff, recycled media",
      "Faster than mechanical grinding",
      "Mobile across BC — rig comes to your site",
      "Owner-operated, no subcontractors",
    ],
    imageUrl: "/images/services/vapor-blasting/hero.jpg",
  },
]

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug)
}
