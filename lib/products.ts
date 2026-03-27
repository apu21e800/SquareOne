export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  applications: string[]
  imageUrl: string
  hubUrl?: string
}

export const products: Product[] = [
  {
    slug: "streetprint",
    name: "StreetPrint",
    tagline: "Stamped asphalt imprinting system.",
    description: "StreetPrint is the industry-leading asphalt imprinting system for creating decorative pavement patterns on new or existing asphalt surfaces. Engineered for high-traffic roads, crosswalks, driveways, and plazas.",
    applications: ["Crosswalks", "Driveways", "Traffic calming", "Roundabouts", "Commercial entries"],
    imageUrl: "/images/products/streetprint/streetprint-1.jpg",
  },
  {
    slug: "streetbond-sr",
    name: "StreetBond SR",
    tagline: "Decorative surface coating with anti-skid aggregate.",
    description: "StreetBond SR is a high-performance, water-based acrylic coating for asphalt and concrete. Solar reflective formulation reduces urban heat island effect while providing colour, contrast, and safety.",
    applications: ["Bike lanes", "Bus rapid transit", "Parking lots", "Sports courts", "Pedestrian areas"],
    imageUrl: "/images/products/streetbond/streetbond-1.jpg",
  },
  {
    slug: "traffic-patterns",
    name: "TrafficPatterns",
    tagline: "Preformed thermoplastic road markings.",
    description: "TrafficPatterns is a preformed inlaid thermoplastic marking system offering superior durability and retroreflectivity. Custom shapes, logos, and graphics available for any road or parking surface.",
    applications: ["Road markings", "Crosswalks", "School zones", "Parking layouts", "Custom graphics"],
    imageUrl: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  },
  {
    slug: "traffic-patterns-xd",
    name: "TrafficPatterns XD",
    tagline: "Extra durable thermoplastic for high-traffic zones.",
    description: "TrafficPatterns XD is the heavy-duty version of the TrafficPatterns system, engineered for high-traffic intersections, transit corridors, and arterial roads demanding maximum service life.",
    applications: ["High-traffic intersections", "Transit corridors", "Arterial roads", "Airport taxiways"],
    imageUrl: "/images/products/traffic-patterns-xd/trafficpatterns-xd-1.jpg",
  },
  {
    slug: "decomark",
    name: "DecoMark",
    tagline: "Custom decorative thermoplastic graphics.",
    description: "DecoMark is a custom decorative thermoplastic system for creating artistic graphics, logos, murals, and branded pavement installations. Unlimited design possibilities with long service life.",
    applications: ["Custom logos", "School graphics", "Public art", "Community branding", "Wayfinding"],
    imageUrl: "/images/products/decomark/decomark-1.jpg",
  },
  {
    slug: "duratherm",
    name: "DuraTherm",
    tagline: "Inset thermoplastic marking system.",
    description: "DuraTherm is an inset thermoplastic system where material is applied into a pre-routed groove, creating a flush, ultra-durable marking that won't peel or lift under heavy traffic or snowplows.",
    applications: ["Snowplow-heavy zones", "Highway markings", "Airport runways", "Industrial facilities"],
    imageUrl: "/images/products/duratherm/duratherm-1.jpg",
  },
  {
    slug: "durashield",
    name: "DuraShield",
    tagline: "Pavement protective coating and sealcoat.",
    description: "DuraShield is a heavy-duty pavement coating that protects and restores asphalt surfaces. Provides waterproofing, UV resistance, and a fresh appearance for parking lots, driveways, and commercial paving.",
    applications: ["Parking lots", "Driveways", "Commercial paving", "Surface restoration"],
    imageUrl: "/images/products/durashield/durashield-1.jpg",
  },
  {
    slug: "mmax",
    name: "MMAX",
    tagline: "MMA-based rapid-cure pavement coating.",
    description: "MMAX is a methyl methacrylate (MMA) based pavement marking and coating system offering rapid cure times, exceptional durability, and performance in extreme temperature conditions.",
    applications: ["Transit lanes", "Bike lanes", "Cold-weather installs", "High-wear zones"],
    imageUrl: "/images/products/mmax/mmax-1.jpg",
  },
  {
    slug: "premark",
    name: "PreMark",
    tagline: "Preformed thermoplastic pavement markings.",
    description: "PreMark offers a complete range of preformed thermoplastic pavement markings including arrows, symbols, letters, and numbers for road marking compliance and safety.",
    applications: ["Stop bars", "Turn arrows", "Crosswalk symbols", "Accessibility markings", "Speed markings"],
    imageUrl: "/images/products/premark/premark-1.jpg",
  },
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug)
}
