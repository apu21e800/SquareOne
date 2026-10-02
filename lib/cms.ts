import { groq } from "next-sanity"
import { sanityFetch, urlFor, type SanityImageSource } from "@/sanity/lib/client"
import { cmsEnabled } from "@/sanity/env"
import { projects } from "@/lib/projects"

/**
 * The CMS readers — every one returns something sensible with no CMS at all.
 *
 *   getSiteSettings()   phones, address, socials, the home social heading
 *   getSocialPosts()    the "Follow the work" tiles (newest six)
 *   getSlots()          text and photo overrides keyed by where they appear
 *
 * Fallbacks are the site's own record: the contact canon and Square One's
 * photography. Nothing here invents a post, a handle or a place.
 */

/* ------------------------------------------------------------------
   Site settings
   ------------------------------------------------------------------ */

export interface SiteSettings {
  positioning: string
  phoneOffice: string
  phoneIsland: string
  phoneTollFree: string
  email: string
  addressLine1: string
  addressLine2: string
  instagram: string
  tiktok?: string
  facebook: string
  linkedin: string
  youtube: string
  socialHeading: string
  socialLede: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  positioning:
    // 26 Sept 2026: the footer is a letterhead now (components/Footer.tsx),
    // with one row of links instead of a "What we do" column, so the line
    // can name the trades again without saying them twice. Plain, local,
    // "we" — the site's voice (docs/OWN-COMPANY-BRIEF.md §3.10).
    // 28 Sept 2026 ("cut the fat"): one sentence.
    "We stamp, coat and mark asphalt and concrete, with our own crews on both sides of the Strait, since 2000.",
  phoneOffice: "604-612-6209",
  phoneIsland: "250-391-0270",
  phoneTollFree: "1-877-391-0270",
  email: "office@squareonepaving.com",
  addressLine1: "19–11720 Stewart Crescent",
  addressLine2: "Maple Ridge, BC V2X 9E7",
  instagram: "https://www.instagram.com/squareonepaving/",
  facebook: "https://www.facebook.com/squareonepaving/",
  linkedin: "https://www.linkedin.com/company/square-one-paving-ltd/",
  youtube: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ",
  // 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.10): "Follow the work" was
  // hubss.com's heading too. A value saved in the Studio's Site settings
  // still overrides these two.
  socialHeading: "Recent, on Instagram",
  socialLede: "The crews at work, installs as they finish, and the odd before-and-after.",
}

const SETTINGS_QUERY = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  positioning, phoneOffice, phoneIsland, phoneTollFree, email, addressLine1, addressLine2,
  instagram, tiktok, facebook, linkedin, youtube, socialHeading, socialLede
}`

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await sanityFetch<Partial<SiteSettings> | null>(SETTINGS_QUERY, {}, ["sanity", "settings"])
  if (!doc) return DEFAULT_SETTINGS
  const merged: SiteSettings = { ...DEFAULT_SETTINGS }
  for (const [k, v] of Object.entries(doc)) {
    if (typeof v === "string" && v.trim()) (merged as unknown as Record<string, string>)[k] = v.trim()
  }
  return merged
}

/** "@squareonepaving" from an Instagram or TikTok profile URL; "" when it is not a profile. */
export function handleFrom(url: string | undefined): string {
  if (!url) return ""
  const m = /^https?:\/\/(?:www\.)?(?:instagram\.com|tiktok\.com)\/@?([A-Za-z0-9._]+)\/?$/.exec(url.trim())
  return m ? `@${m[1]}` : ""
}

/* ------------------------------------------------------------------
   Social grid
   ------------------------------------------------------------------ */

export type SocialPlatform = "Instagram" | "TikTok" | "Facebook" | "LinkedIn" | "YouTube"

export interface SocialTile {
  platform: SocialPlatform
  src: string
  alt: string
  caption: string
  url: string
  date: string
  isVideo: boolean
  /** True for the built-in tiles — they link to the profile, not to a post. */
  fallback?: boolean
}

const SOCIAL_QUERY = groq`*[_type == "socialPost" && defined(image.asset)] | order(date desc)[0...$limit]{
  platform, caption, url, date, isVideo, "alt": image.alt, image
}`

interface SocialDoc {
  platform: SocialPlatform
  caption: string
  url: string
  date: string
  isVideo?: boolean
  alt?: string
  image: SanityImageSource
}

/** Until the marketing team fills the grid: six Square One installs, linking to the profile. */
function fallbackTiles(profileUrl: string): SocialTile[] {
  const bySlug = (slug: string) => projects.find((p) => p.slug === slug)
  // 28 Sept 2026: six installs that appear nowhere else on the home page.
  // The grid used to repeat "Selected work", the driveway band and the
  // vapour photograph a scroll apart. A spread of systems; every frame on
  // the record (lib/work-captions.ts).
  const picks: { slug?: string; src?: string; alt?: string; caption: string }[] = [
    // 2 Oct 2026 (Vern: "need better images for the homepage social media
    // section"): six of the strongest frames in the library, each one
    // holding up as a square, none of them a job the home page shows
    // elsewhere, five systems between them. Every caption is the record's.
    {
      src: "/images/S1_update_v2/photos/Featured%20image%20options/UBC-crosswalk-3-300dpi.jpg",
      alt: "The UBC and Musqueam crosswalk on University Boulevard, a Musqueam design in green, blue and cream TrafficPatterns under the UBC letters",
      caption: "UBC & Musqueam crosswalk, University Boulevard · TrafficPatterns",
    },
    {
      src: "/images/applications/public-art/oak-bay-street-mural-crossing-streetbond-01.jpg",
      alt: "A street mural crossing in Oak Bay, a First Nations design in black, red, yellow and teal StreetBond across the road",
      caption: "Street mural crossing, Oak Bay · StreetBond",
    },
    {
      src: "/images/S1_update_v2/photos/Featured%20image%20options/maplewoods-fire-lane-north-vancouver-streetbond-01.jpg",
      alt: "The decorative fire lane at Maplewoods Townhomes in North Vancouver, white waves across blue StreetBond",
      caption: "Decorative fire lane, Maplewoods, North Vancouver · StreetBond",
    },
    {
      src: "/images/applications/schools-sports-courts/abbotsford-eagle-mountain-labyrinth-decomark-01.jpg",
      alt: "The red and black DecoMark labyrinth at Eagle Mountain in Abbotsford, seen from above",
      caption: "Eagle Mountain labyrinth, Abbotsford · DecoMark",
    },
    {
      src: "/images/applications/bike-lanes/sechelt-cowrie-and-trail-lane-markings-decomark-01.jpg",
      alt: "Salmon and canoe symbols in red DecoMark down the green bike lane at Cowrie and Trail in Sechelt",
      caption: "Cowrie and Trail lane markings, Sechelt · DecoMark",
    },
    {
      src: "/images/S1_update_v2/photos/Featured%20image%20options/Labyrinth-Maple-Ridge-c%CC%93%C9%99sq%C9%99nel%C9%99-Elementary-2-scaled-1.jpg",
      alt: "An orange and purple StreetBond labyrinth on the playground at c\u0313\u0259sq\u0259nel\u0259 Elementary in Maple Ridge",
      caption: "Labyrinth, c\u0313\u0259sq\u0259nel\u0259 Elementary, Maple Ridge · StreetBond",
    },
  ]
  const tiles: SocialTile[] = []
  for (const pick of picks) {
    const project = pick.slug ? bySlug(pick.slug) : undefined
    const src = pick.src ?? project?.imageUrl
    if (!src) continue
    tiles.push({
      platform: "Instagram",
      src,
      alt: pick.alt ?? project?.title ?? pick.caption,
      caption: pick.caption,
      url: profileUrl,
      date: project?.year ? `${project.year}-01-01` : "",
      isVideo: false,
      fallback: true,
    })
  }
  return tiles
}

export async function getSocialPosts(limit = 6): Promise<SocialTile[]> {
  const settings = await getSiteSettings()
  const docs = await sanityFetch<SocialDoc[]>(SOCIAL_QUERY, { limit }, ["sanity", "social"])
  if (!docs || docs.length === 0) return fallbackTiles(settings.instagram)
  return docs.map((d) => ({
    platform: d.platform,
    src: urlFor(d.image, 900, 900),
    alt: d.alt ?? d.caption,
    caption: d.caption,
    url: d.url,
    date: d.date,
    isVideo: Boolean(d.isVideo),
  }))
}

/* ------------------------------------------------------------------
   Slots — text and photo overrides
   ------------------------------------------------------------------ */

export interface ImageValue {
  src: string
  alt: string
  caption?: string
}

export interface Slots {
  copy: Record<string, string>
  image: Record<string, ImageValue>
}

export const EMPTY_SLOTS: Slots = { copy: {}, image: {} }

const SLOTS_QUERY = groq`{
  "copy": *[_type == "copySlot" && defined(key) && defined(value)]{ key, value },
  "image": *[_type == "imageSlot" && defined(key) && defined(image.asset)]{ key, alt, caption, image }
}`

interface SlotsDoc {
  copy: { key: string; value: string }[]
  image: { key: string; alt?: string; caption?: string; image: SanityImageSource }[]
}

/** All slots in one read (cached 60s). Pages pass the result down to sections. */
export async function getSlots(): Promise<Slots> {
  if (!cmsEnabled) return EMPTY_SLOTS
  const doc = await sanityFetch<SlotsDoc>(SLOTS_QUERY, {}, ["sanity", "slots"])
  if (!doc) return EMPTY_SLOTS
  const slots: Slots = { copy: {}, image: {} }
  for (const c of doc.copy ?? []) slots.copy[c.key.trim()] = c.value
  for (const i of doc.image ?? []) {
    slots.image[i.key.trim()] = { src: urlFor(i.image, 2000), alt: i.alt ?? "", caption: i.caption }
  }
  return slots
}

export function slotText(slots: Slots, key: string, fallback: string): string {
  const v = slots.copy[key]
  return v && v.trim() ? v.trim() : fallback
}

export function slotImage(slots: Slots, key: string, fallback: ImageValue): ImageValue {
  const v = slots.image[key]
  return v && v.src ? { ...fallback, ...v, caption: v.caption ?? fallback.caption } : fallback
}
