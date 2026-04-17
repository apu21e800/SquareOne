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
  // ── Real installs from squareonepaving.com archive ──────────────────────────

  {
    title: "Keswick Waterpark — Aquatic Play Surface",
    slug: "keswick-waterpark",
    service: "Decorative Coatings",
    application: "Public Spaces",
    city: "Surrey, BC",
    year: "2023",
    featured: true,
    excerpt:
      "StreetBond decorative coating for the splash pad and play surface at Keswick Community Park. Custom colours matched to the aquatic theme — slip-resistant, UV-stable, and built for heavy seasonal use.",
    imageUrl: "/images/products/streetbond/streetbond-multicolour-splash-pad-01.jpg",
  },
  {
    title: "South Langford Elementary — School Zone & Play Court",
    slug: "south-langford-elementary",
    service: "Preformed Thermoplastic",
    application: "School Zone",
    city: "Langford, BC",
    year: "2022",
    featured: true,
    excerpt:
      "Complete school zone package for South Langford Elementary: TrafficPatterns preformed thermoplastic crosswalks, school logo branding on pavement, speed limit legends, and accessible pathway markings.",
    imageUrl: "/images/products/streetbond/streetbond-blue-schoolyard-pattern-01.jpg",
  },

  // ── Municipal & Commercial ───────────────────────────────────────────────────

  {
    title: "Downtown Vancouver Crosswalk Enhancement",
    slug: "downtown-vancouver-crosswalk",
    service: "Stamped Asphalt",
    application: "Crosswalks",
    city: "Vancouver, BC",
    year: "2023",
    featured: true,
    excerpt:
      "Custom StreetPrint stamped asphalt crosswalks for a high-traffic downtown intersection, featuring brick pattern and retroreflective finish.",
    imageUrl: "/images/products/streetbond/streetbond-crosswalk-perspective-01.jpg",
  },
  {
    title: "BC Transit Priority Lane — Victoria",
    slug: "bc-transit-victoria",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Victoria, BC",
    year: "2022",
    featured: true,
    excerpt:
      "StreetBond SR red coating for a BC Transit priority lane, providing high-visibility and anti-skid performance on a busy arterial route.",
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
      "Green bike lane coatings across UBC campus, improving cyclist visibility and safety at key intersections and conflict zones.",
    imageUrl: "/images/applications/bus-bike-lanes/green-bike-lane-urban-crosswalk-01.jpg",
  },
  {
    title: "Nanaimo Waterfront Crosswalk Art",
    slug: "nanaimo-waterfront-crosswalk",
    service: "Stamped Asphalt",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    year: "2022",
    excerpt:
      "Decorative stamped asphalt crosswalks featuring custom marine-themed patterns for the Nanaimo waterfront district revitalization.",
    imageUrl: "/images/applications/crosswalks/crosswalk-1.jpg",
  },
  {
    title: "Surrey City Centre School Zone",
    slug: "surrey-school-zone",
    service: "Preformed Thermoplastic",
    application: "School Zone",
    city: "Surrey, BC",
    year: "2023",
    excerpt:
      "High-visibility school zone markings with DecoMark graphics, including crosswalks, school logo, and speed limit markings.",
    imageUrl: "/images/products/streetbond/streetbond-red-track-school-markings-01.jpg",
  },
  {
    title: "Westshore Town Centre Parking Markings",
    slug: "westshore-parking-markings",
    service: "Preformed Thermoplastic",
    application: "Parking Lot",
    city: "Langford, BC",
    year: "2021",
    excerpt:
      "Complete parking lot layout with TrafficPatterns preformed thermoplastic — custom arrows, stall markings, and accessible parking graphics.",
    imageUrl: "/images/applications/parking-lots/community-center-parking-streetprint-01.jpg",
  },

  // ── Residential & Strata ────────────────────────────────────────────────────

  {
    title: "Coquitlam Strata Driveway Refresh",
    slug: "coquitlam-strata-driveway",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "Coquitlam, BC",
    year: "2024",
    excerpt:
      "StreetPrint cobblestone pattern applied to 22-unit strata complex entry and visitor driveways. Full resurfacing with colour integration and border detailing — no disruption to existing asphalt base.",
    imageUrl: "/images/applications/private-driveways/chilliwack-townhomes-brick-driveway-01.jpg",
  },
  {
    title: "West Vancouver Residential Driveway",
    slug: "west-vancouver-driveway",
    service: "Stamped Asphalt",
    application: "Driveways",
    city: "West Vancouver, BC",
    year: "2023",
    excerpt:
      "Custom ashlar slate StreetPrint pattern with contrasting border for a hillside property in West Vancouver. Slip-resistant finish rated for steep-grade driveways.",
    imageUrl: "/images/applications/private-driveways/estate-herringbone-gated-driveway-01.jpg",
  },

  // ── Vapor Blasting ──────────────────────────────────────────────────────────

  {
    title: "Road Marking Removal — Highway 1",
    slug: "highway-1-marking-removal",
    service: "Vapor Blasting",
    application: "Surface Prep",
    city: "Lower Mainland, BC",
    year: "2023",
    excerpt:
      "Mobile vapor blasting for road marking removal on Highway 1 before new lane configuration installation. Environmentally responsible surface prep — no silica dust, no chemical runoff.",
    imageUrl: "/images/products/durashield/durashield-1.jpg",
  },
  {
    title: "Whistler Village Plaza — Graffiti Removal",
    slug: "whistler-plaza-refresh",
    service: "Vapor Blasting",
    application: "Surface Prep",
    city: "Whistler, BC",
    year: "2022",
    excerpt:
      "Graffiti and coating removal from brick and stone surfaces in Whistler Village plaza, restoring original surface appearance without chemical damage.",
    imageUrl: "/images/applications/public-spaces/charcoal-herringbone-brick-public-plaza-01.jpg",
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured)
}
