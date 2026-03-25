export interface Project {
  title: string
  slug: string
  service: string
  application: string
  city: string
  excerpt: string
  imageUrl: string
}

export const projects: Project[] = [
  {
    title: "Downtown Vancouver Crosswalk Enhancement",
    slug: "downtown-vancouver-crosswalk",
    service: "Stamped Asphalt",
    application: "Crosswalks",
    city: "Vancouver, BC",
    excerpt:
      "Custom StreetPrint stamped asphalt crosswalks for a high-traffic downtown intersection, featuring brick pattern and retroreflective finish.",
    imageUrl: "/images/projects/crosswalk-vancouver.jpg",
  },
  {
    title: "BC Transit Priority Lane — Victoria",
    slug: "bc-transit-victoria",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Victoria, BC",
    excerpt:
      "StreetBond SR red coating for BC Transit priority lane, providing high-visibility and anti-skid performance on arterial route.",
    imageUrl: "/images/projects/transit-victoria.jpg",
  },
  {
    title: "Westshore Town Centre Parking Markings",
    slug: "westshore-parking-markings",
    service: "Preformed Thermoplastic",
    application: "Parking Lot",
    city: "Langford, BC",
    excerpt:
      "Complete parking lot layout with TrafficPatterns preformed thermoplastic — custom arrows, stall markings, and accessible parking graphics.",
    imageUrl: "/images/projects/parking-langford.jpg",
  },
  {
    title: "UBC Campus Bike Lane Network",
    slug: "ubc-bike-lanes",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Vancouver, BC",
    excerpt:
      "Green bike lane coatings across UBC campus, improving cyclist visibility and safety at key intersections and conflict zones.",
    imageUrl: "/images/projects/bike-lanes-ubc.jpg",
  },
  {
    title: "Nanaimo Waterfront Crosswalk Art",
    slug: "nanaimo-waterfront-crosswalk",
    service: "Stamped Asphalt",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    excerpt:
      "Decorative stamped asphalt crosswalks featuring custom marine-themed patterns for the Nanaimo waterfront district revitalization.",
    imageUrl: "/images/projects/crosswalk-nanaimo.jpg",
  },
  {
    title: "Road Marking Removal — Highway 1",
    slug: "highway-1-marking-removal",
    service: "Vapor Blasting",
    application: "Surface Prep",
    city: "Lower Mainland, BC",
    excerpt:
      "Mobile vapor blasting for road marking removal on Highway 1 before new lane configuration installation. Environmentally responsible surface prep.",
    imageUrl: "/images/projects/vapor-blasting-highway.jpg",
  },
  {
    title: "Surrey City Centre School Zone",
    slug: "surrey-school-zone",
    service: "Preformed Thermoplastic",
    application: "School Zone",
    city: "Surrey, BC",
    excerpt:
      "High-visibility school zone markings with DecoMark graphics, including crosswalks, school logo, and speed limit markings.",
    imageUrl: "/images/projects/school-zone-surrey.jpg",
  },
  {
    title: "Whistler Village Plaza Refresh",
    slug: "whistler-plaza-refresh",
    service: "Vapor Blasting",
    application: "Surface Prep",
    city: "Whistler, BC",
    excerpt:
      "Graffiti and coating removal from brick and stone surfaces in Whistler Village plaza, restoring original surface appearance.",
    imageUrl: "/images/projects/plaza-whistler.jpg",
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug)
}
