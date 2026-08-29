export interface Project {
  title: string
  slug: string
  service: string
  application: string
  city: string
  excerpt: string
  imageUrl: string
  year?: string
  featured?: boolean
}

export const projects: Project[] = [
  // ── Featured commercial case studies ──────────────────────────────────

  {
    title: "UBC & Musqueam Crosswalk",
    slug: "ubc-musqueam-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    year: "2025",
    featured: true,
    excerpt:
      "Collaborative crosswalk at University Boulevard and Wesbrook Mall — UBC and Musqueam crests woven together in TrafficPatterns, acknowledging the campus stands on unceded Musqueam territory.",
    imageUrl: "/images/S1_update_v2/photos/Featured image options/UBC-crosswalk-3-300dpi.jpg",
  },
  {
    title: "Joyce SkyTrain Station Public Art",
    slug: "joyce-skytrain-art-installation",
    service: "Decorative Coatings",
    application: "Public Spaces",
    city: "Vancouver, BC",
    year: "2025",
    featured: true,
    excerpt:
      "StreetBond colour coating across the concourse at Joyce SkyTrain Station, installed for TransLink. Public art by Renée Van Halm, installed during overnight non-revenue windows.",
    imageUrl: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg",
  },
  {
    title: "Langley Events Centre — Circle of Life",
    slug: "langley-events-centre-streetbond",
    service: "Decorative Coatings",
    application: "Public Spaces",
    city: "Langley, BC",
    year: "2024",
    featured: true,
    excerpt:
      "Circular motif by Drew and Elinor Atkins of Spring Salmon Studio, installed in StreetBond across the forecourt at Langley Events Centre. Indigenous public art at civic scale.",
    imageUrl: "/images/products/streetbond/streetbond-multicolour-plaza-green-circles-01.jpg",
  },
  {
    title: "Brighouse Station — TrafficPatternsXD",
    slug: "richmond-brighouse-translink",
    service: "Preformed Thermoplastic",
    application: "Bus & Bike Lanes",
    city: "Richmond, BC",
    year: "2025",
    featured: true,
    excerpt:
      "TrafficPatternsXD install across pedestrian transition zones at Brighouse SkyTrain Station on No. 3 Road, Richmond. Heavy-duty thermoplastic for the Canada Line terminus.",
    imageUrl: "/images/S1_update_v2/photos/Featured image options/IMG_3178-scaled-e1590114559108.jpeg",
  },
  {
    title: "Every Child Matters — New Westminster",
    slug: "every-child-matters-new-westminster",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "New Westminster, BC",
    year: "2023",
    featured: true,
    excerpt:
      "Every Child Matters pavement art for the National Day for Truth and Reconciliation. Design by Charliss Santos, installed in TrafficPatterns. Funded by Orange Shirt Society and Spirit of Children Society.",
    imageUrl: "/images/products/streetbond/streetbond-compass-rose-decorative-asphalt-01.jpg",
  },
  {
    title: "Agnes Greenway — Rain Pierre",
    slug: "agnes-greenway-new-westminster",
    service: "Preformed Thermoplastic",
    application: "Public Spaces",
    city: "New Westminster, BC",
    year: "2023",
    featured: true,
    excerpt:
      "Pavement art along the Agnes Greenway, adjacent to École Qayqayt. Design by Rain Pierre of Katzie First Nation, installed in TrafficPatterns.",
    imageUrl: "/images/applications/parks-paths/eagle-mural-courtyard-aerial-01.jpg",
  },
  {
    title: "South Langford Elementary",
    slug: "south-langford-elementary",
    service: "Preformed Thermoplastic",
    application: "School Zone",
    city: "Langford, BC",
    year: "2025",
    featured: true,
    excerpt:
      "DecoMark and TrafficPatterns install at South Langford Elementary, completed ahead of the September 2025 opening. Pavement branding, crosswalks, and safety markings for a new Island school.",
    imageUrl: "/images/products/streetbond/streetbond-blue-schoolyard-pattern-01.jpg",
  },
  {
    title: "Little Italy Crosswalks — Commercial Drive",
    slug: "little-italy-vancouver-crosswalks",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Vancouver, BC",
    year: "2024",
    featured: true,
    excerpt:
      "TrafficPatterns crosswalks in green, white, and red — Italian flag colours rendered into the intersections of Commercial Drive for the City of Vancouver.",
    imageUrl: "/images/products/streetbond/streetbond-multicolour-grid-texture-detail-01.jpg",
  },
  {
    title: "Keswick Water Park — StreetBond 150 Recoat",
    slug: "keswick-waterpark",
    service: "Decorative Coatings",
    application: "Public Spaces",
    city: "Burnaby, BC",
    year: "2024",
    featured: true,
    excerpt:
      "StreetBond 150 recoat at Keswick Water Park ahead of the 2024 season. Colour-matched refresh of the spray-pad surface for the City of Burnaby.",
    imageUrl: "/images/products/streetbond/streetbond-multicolour-splash-pad-01.jpg",
  },
  {
    title: "Downtown Mission — Streetscape",
    slug: "mission-bc-streetscape",
    service: "Stamped Asphalt",
    application: "Public Spaces",
    city: "Mission, BC",
    year: "2025",
    featured: true,
    excerpt:
      "StreetPrint stamped asphalt and StreetBond 150 in Pewter across downtown Mission's pedestrian crossings and decorative surfaces. Part of the District's downtown renewal program.",
    imageUrl: "/images/products/streetbond/streetbond-stamped-pattern-wide-01.jpg",
  },

  // ── Residential & Strata ──────────────────────────────────────────────

  {
    title: "Bowen Island Residential Driveway",
    slug: "bowen-island-driveway",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Bowen Island, BC",
    excerpt:
      "StreetPrint stamped-asphalt driveway on Bowen Island — a coastal home installation with custom border detailing and slip-resistant finish.",
    imageUrl: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  },
  {
    title: "Windsor Gate Strata — Coquitlam",
    slug: "windsor-gate-coquitlam",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Coquitlam, BC",
    excerpt:
      "StreetPrint cobblestone pattern across strata entrance and visitor driveways at Windsor Gate, Coquitlam. Full resurfacing with colour integration.",
    imageUrl: "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
  },
  {
    title: "Maple Ridge Spray Park",
    slug: "maple-ridge-spray-park",
    service: "Decorative Coatings",
    application: "Public Spaces",
    city: "Maple Ridge, BC",
    excerpt:
      "StreetBond decorative coating for the spray-pad and play surface at a Maple Ridge neighbourhood park. Custom colour palette with slip-resistant finish.",
    imageUrl: "/images/products/streetbond/streetbond-multicolour-splash-pad-01.jpg",
  },
  {
    title: "Tsuyuki Park — Surrey",
    slug: "tsuyuki-park-surrey",
    service: "Decorative Coatings",
    application: "Public Spaces",
    city: "Surrey, BC",
    excerpt:
      "Decorative pavement coatings at Tsuyuki Park, Surrey. StreetBond install across play surfaces and pathways for the City of Surrey Parks department.",
    imageUrl: "/images/products/streetbond/streetbond-blue-schoolyard-pattern-01.jpg",
  },
  {
    title: "Nanaimo Rainbow Crosswalk",
    slug: "nanaimo-rainbow-crosswalk",
    service: "Preformed Thermoplastic",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    excerpt:
      "Rainbow crosswalk installation in downtown Nanaimo — TrafficPatterns preformed thermoplastic for a civic visibility and pride-placemaking project.",
    imageUrl: "/images/applications/crosswalks/crosswalk-1.jpg",
  },

  // ── Transit & Bike Infrastructure ──────────────────────────────────────

  {
    title: "BC Transit Priority Lane — Victoria",
    slug: "bc-transit-victoria",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Victoria, BC",
    year: "2022",
    excerpt:
      "StreetBond SR red coating for a BC Transit priority lane — high-visibility, anti-skid surface on a busy arterial route in Victoria.",
    imageUrl: "/images/applications/bus-bike-lanes/red-bus-lane-brt-transit-station-01.jpg",
  },
  {
    title: "UBC Campus Bike Lane Network",
    slug: "ubc-bike-lanes",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Vancouver, BC",
    year: "2021",
    excerpt:
      "Green bike-lane coatings across UBC campus, improving cyclist visibility and safety at key intersections and conflict zones.",
    imageUrl: "/images/applications/bus-bike-lanes/green-bike-lane-urban-crosswalk-01.jpg",
  },
  {
    title: "Downtown Vancouver Crosswalk Enhancement",
    slug: "downtown-vancouver-crosswalk",
    service: "Stamped Asphalt",
    application: "Crosswalks",
    city: "Vancouver, BC",
    year: "2023",
    excerpt:
      "StreetPrint stamped-asphalt crosswalks at a high-traffic downtown Vancouver intersection. Brick-pattern inlay with retroreflective finish.",
    imageUrl: "/images/products/streetbond/streetbond-crosswalk-perspective-01.jpg",
  },

  // ── Parking & Surface Prep ───────────────────────────────────────────────

  {
    title: "Westshore Parking Markings — Langford",
    slug: "westshore-parking-markings",
    service: "Preformed Thermoplastic",
    application: "Parking Lot",
    city: "Langford, BC",
    year: "2021",
    excerpt:
      "Complete parking-lot layout in TrafficPatterns preformed thermoplastic — custom arrows, stall markings, and accessible parking graphics.",
    imageUrl: "/images/applications/parking-lots/community-center-parking-streetprint-01.jpg",
  },
  {
    title: "Highway 1 Marking Removal",
    slug: "highway-1-marking-removal",
    service: "Vapour Blasting",
    application: "Surface Prep",
    city: "Lower Mainland, BC",
    year: "2023",
    excerpt:
      "Mobile vapour blasting for road-marking removal on Highway 1 ahead of a new lane configuration. No silica dust, no chemical runoff.",
    imageUrl: "/images/products/durashield/durashield-1.jpg",
  },
  {
    title: "Whistler Village Plaza — Surface Restoration",
    slug: "whistler-plaza-refresh",
    service: "Vapour Blasting",
    application: "Surface Prep",
    city: "Whistler, BC",
    year: "2022",
    excerpt:
      "Graffiti and coating removal from brick and stone surfaces in Whistler Village, restoring original surface appearance without chemical damage.",
    imageUrl: "/images/applications/public-spaces/charcoal-herringbone-brick-public-plaza-01.jpg",
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured)
}
