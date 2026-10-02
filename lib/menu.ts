import { services } from "@/lib/services"

/**
 * The photographs behind the menu's preview frame (28 Sept 2026, Vern: "give
 * the mega menu some personality, it's rather lacking"). Keyed by the link's
 * href. Every frame is one the site already shows in that place: a service's
 * own opener (read from lib/services.ts), or the lead photograph of a
 * gallery, the same one the home page's "Where the work goes" row uses.
 * Captions are the record's: place · subject · system.
 *
 * Static on purpose, like lib/app-leads.ts: the menu renders in the root
 * layout, and the root layout must never touch the filesystem (the blog
 * routes regenerate at runtime on Vercel, where public/ is not bundled, so
 * lib/work.ts cannot run there). The gallery entries below were read from
 * lib/work.ts on 28 Sept 2026; regenerate by hand when a gallery lead
 * changes (lib/curation.ts, the first `lead` of each gallery).
 */
export interface MenuPreview {
  src: string
  alt: string
  caption: string
}

export type MenuPreviews = Record<string, MenuPreview>

const GALLERY_LEADS: MenuPreviews = {
  "/applications/crosswalks": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/UBC-crosswalk-3-300dpi.jpg",
    alt: "UBC & Musqueam crosswalk in TrafficPatterns, University Boulevard, UBC, BC",
    caption: "University Boulevard, UBC · UBC & Musqueam crosswalk · TrafficPatterns",
  },
  "/applications/streetscapes": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg",
    alt: "Decorative fire lane in StreetBond, Maplewoods Townhomes, North Vancouver, BC",
    caption: "Maplewoods Townhomes, North Vancouver · Decorative fire lane · StreetBond",
  },
  "/applications/roundabouts": {
    src: "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Galleries/Roundabouts/Gallery/TrafficPatterns%20%20Decorative%20Crosswalk%2C%20Sannich.jpg",
    alt: "Decorative crosswalk in TrafficPatterns, Saanich, BC",
    caption: "Saanich · Decorative crosswalk · TrafficPatterns",
  },
  "/applications/parking-lots": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-07-28-2-10-43-PM-scaled.jpg",
    alt: "Retail plaza entrance in StreetBond",
    caption: "Retail plaza entrance · StreetBond",
  },
  "/applications/parks-paths": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2024-06-20-11-31-39-AM-scaled-e1740159565458.jpg",
    alt: "Spray park surfacing in StreetBond",
    caption: "Spray park surfacing · StreetBond",
  },
  "/applications/schools-sports-courts": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/IMG_1145.jpeg",
    alt: "School sports court in StreetBond",
    caption: "School sports court · StreetBond",
  },
  "/applications/bike-lanes": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2024-07-04-10-58-08-AM-scaled.jpg",
    alt: "Red brick multi-use path in StreetPrint",
    caption: "Red brick multi-use path · StreetPrint",
  },
  "/applications/public-art": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg",
    alt: "Labyrinth in StreetBond, c̓əsqənelə Elementary, Maple Ridge, BC",
    caption: "c̓əsqənelə Elementary, Maple Ridge · Labyrinth · StreetBond",
  },
  "/applications/branding-wayfinding": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg",
    alt: "Little Italy neighbourhood branding in DecoMark, Commercial Drive, Vancouver, BC",
    caption: "Commercial Drive, Vancouver · Little Italy neighbourhood branding · DecoMark",
  },
  "/driveways": {
    src: "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
    alt: "Ashlar slate driveway in StreetPrint",
    caption: "Ashlar slate driveway · StreetPrint",
  },
  // The pattern sheets (2 Oct 2026): the herringbone drawing.
  "/patterns": {
    src: "/images/patterns/herringbone.webp",
    alt: "The StreetPrint Standard Herringbone template sheet: a dimensioned drawing of the brick pattern with its title block",
    caption: "StreetPrint · Standard Herringbone · the template sheet",
  },
  // The systems: the drawing a specifier works from, not a photograph.
  "/products": {
    src: "/images/patterns/herringbone.webp",
    alt: "The StreetPrint Standard Herringbone template sheet: a dimensioned drawing of the brick pattern with its title block",
    caption: "StreetPrint · Standard Herringbone · the template sheet",
  },
  // The documents (2 Oct 2026): the library's own opener.
  "/resources": {
    src: "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-03-07-2-54-05-PM-scaled.jpg",
    alt: "Rail ties in tan TrafficPatternsXD thermoplastic set into dark stamped asphalt, the railroad-inspired crosswalk in the City of Langley",
    caption: "City of Langley · TrafficPatternsXD",
  },
}

const SERVICE_OPENERS: MenuPreviews = Object.fromEntries(
  services.map((s) => [
    `/services/${s.slug}`,
    {
      src: s.imageUrl,
      alt: s.imageAlt,
      caption:
        s.imageCaption ??
        (s.slug === "vapor-blasting" ? "Vancouver · Granville Island · marking removal" : s.name),
    },
  ]),
)

export const MENU_PREVIEWS: MenuPreviews = { ...SERVICE_OPENERS, ...GALLERY_LEADS }
