/**
 * The lead photograph of each application gallery, as a plain map the nav
 * can use on the client. Mirrors the first `lead` in lib/curation.ts for
 * each application (verified against disk 11 Sept 2026). Kept static on
 * purpose: the root layout must never touch the filesystem, because the
 * blog routes regenerate at runtime where public/ is not bundled.
 * Regenerate by hand when a gallery lead changes.
 */
export const APP_LEADS: Record<string, string> = {
  "crosswalks": "/images/S1_update_v2/photos/Featured%20image%20options/UBC-crosswalk-3-300dpi.jpg",
  "driveways": "/images/S1_update_v2/photos/Driveways/Number%201.jpg",
  "parks-paths": "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2024-06-20-11-31-39-AM-scaled-e1740159565458.jpg",
  "public-art": "/images/S1_update_v2/photos/Featured%20image%20options/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg",
  "streetscapes": "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2023-05-19-5-56-47%E2%80%AFPM-scaled%20%281%29.jpg",
  "parking-lots": "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2025-07-28-2-10-43-PM-scaled.jpg",
  "schools-sports-courts": "/images/S1_update_v2/photos/Featured%20image%20options/IMG_1145.jpeg",
  "branding-wayfinding": "/images/S1_update_v2/photos/Featured%20image%20options/DecoMark-on-asphalt-Little-Italy-Community-Branding_Commercia-Drive-Vancouver-BC-Canada-op6t525a5rlrtdb6ycgokn391ncum7c5zqlh8og8kw.jpg",
  "roundabouts": "/images/S1_update_v2/Old%20Square%20One%20Web%20Assets/Galleries/Roundabouts/Gallery/TrafficPatterns%20%20Decorative%20Crosswalk%2C%20Sannich.jpg",
  "bike-lanes": "/images/S1_update_v2/photos/Featured%20image%20options/Photo-2024-07-04-10-58-08-AM-scaled.jpg",
}
