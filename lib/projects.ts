export interface Project {
  title: string
  slug: string
  service: string
  application: string
  city: string
  excerpt: string
  description: string
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
    description:
      "Custom StreetPrint stamped asphalt crosswalks at a major downtown Vancouver intersection. Features a classic brick pattern with retroreflective finish for night visibility. Completed for the City of Vancouver as part of the Granville Street revitalization.",
    imageUrl: "/images/applications/crosswalks/crosswalk-1.jpg",
  },
  {
    title: "BC Transit Priority Lane — Victoria",
    slug: "bc-transit-victoria",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Victoria, BC",
    excerpt:
      "StreetBond SR red coating for BC Transit priority lane, providing high-visibility and anti-skid performance on arterial route.",
    description:
      "StreetBond SR red coating for a BC Transit priority bus corridor in Victoria. High-visibility anti-skid surface improves safety for passengers and cyclists sharing the route. Installed over 850 linear metres with minimal traffic disruption.",
    imageUrl: "/images/applications/bus-bike-lanes/beebe-hospital-brick-crosswalk-entry-01.jpg",
  },
  {
    title: "Westshore Town Centre Parking Markings",
    slug: "westshore-parking-markings",
    service: "Preformed Thermoplastic",
    application: "Parking Lot",
    city: "Langford, BC",
    excerpt:
      "Complete parking lot layout with TrafficPatterns preformed thermoplastic — custom arrows, stall markings, and accessible parking graphics.",
    description:
      "Complete TrafficPatterns thermoplastic parking lot layout for Westshore Town Centre. Custom arrows, accessible parking graphics, and fire lane markings installed in a single overnight shift.",
    imageUrl: "/images/applications/parking-lots/community-center-parking-streetprint-01.jpg",
  },
  {
    title: "UBC Campus Bike Lane Network",
    slug: "ubc-bike-lanes",
    service: "Decorative Coatings",
    application: "Bus & Bike Lanes",
    city: "Vancouver, BC",
    excerpt:
      "Green bike lane coatings across UBC campus, improving cyclist visibility and safety at key intersections and conflict zones.",
    description:
      "Green StreetBond SR bike lane coatings across the UBC campus active transportation network. Installed at key conflict zones and intersections to improve cyclist visibility and reduce vehicle-bike incidents.",
    imageUrl: "/images/applications/bus-bike-lanes/green-bike-lane-bridge-gopro-01.jpg",
  },
  {
    title: "Nanaimo Waterfront Crosswalk Art",
    slug: "nanaimo-waterfront-crosswalk",
    service: "Stamped Asphalt",
    application: "Crosswalks",
    city: "Nanaimo, BC",
    excerpt:
      "Decorative stamped asphalt crosswalks featuring custom marine-themed patterns for the Nanaimo waterfront district revitalization.",
    description:
      "Marine-themed decorative crosswalks for the Nanaimo waterfront revitalization. Custom StreetPrint patterns with blue and charcoal tones to complement the harbour setting.",
    imageUrl: "/images/applications/crosswalks/crosswalk-1.jpg",
  },
  {
    title: "Road Marking Removal — Highway 1",
    slug: "highway-1-marking-removal",
    service: "Vapor Blasting",
    application: "Surface Prep",
    city: "Lower Mainland, BC",
    excerpt:
      "Mobile vapor blasting for road marking removal on Highway 1 before new lane configuration installation. Environmentally responsible surface prep.",
    description:
      "Mobile vapor blasting for road marking removal along Highway 1 before new lane configuration installation. Water-controlled process left no residue and no lane closure beyond 6 hours.",
    imageUrl: "/images/products/streetbond/streetbond-red-waterfront-promenade-01.jpg",
  },
  {
    title: "Surrey City Centre School Zone",
    slug: "surrey-school-zone",
    service: "Preformed Thermoplastic",
    application: "School Zone",
    city: "Surrey, BC",
    excerpt:
      "High-visibility school zone markings with DecoMark graphics, including crosswalks, school logo, and speed limit markings.",
    description:
      "High-visibility school zone markings for a Surrey elementary school. DecoMark custom graphics including the school mascot, crosswalk markings, and speed zone indicators.",
    imageUrl: "/images/applications/regulatory-markings/premark-arrows-intersection-01.jpg",
  },
  {
    title: "Whistler Village Plaza Refresh",
    slug: "whistler-plaza-refresh",
    service: "Vapor Blasting",
    application: "Surface Prep",
    city: "Whistler, BC",
    excerpt:
      "Graffiti and coating removal from brick and stone surfaces in Whistler Village plaza, restoring original surface appearance.",
    description:
      "Vapor blasting restoration of the Whistler Village plaza's brick and stone surfaces. Removed years of graffiti, sealant buildup, and staining to restore the original appearance.",
    imageUrl: "/images/applications/public-spaces/charcoal-herringbone-brick-public-plaza-01.jpg",
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug)
}
