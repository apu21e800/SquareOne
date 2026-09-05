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
    "Decorative pavement for BC since 2000. Installer of HUB Surface Systems products, based in Maple Ridge and working across the Lower Mainland and Vancouver Island.",
  phoneOffice: "604-466-9902",
  phoneIsland: "250-391-0270",
  phoneTollFree: "1-877-391-0270",
  email: "office@squareonepaving.com",
  addressLine1: "505–20800 Lougheed Highway",
  addressLine2: "Maple Ridge, BC V2X 3P2",
  instagram: "https://www.instagram.com/squareonepaving/",
  facebook: "https://www.facebook.com/squareonepaving/",
  linkedin: "https://www.linkedin.com/company/square-one-paving-ltd/",
  youtube: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ",
  socialHeading: "Follow the work",
  socialLede: "Installs as they happen, before-and-afters, and the crews at work.",
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
  const picks: { slug?: string; src?: string; alt?: string; caption: string }[] = [
    { slug: "nanaimo-rainbow-intersection", caption: "Rainbow intersection, Nanaimo · TrafficPatternsXD" },
    { slug: "white-rock-custom-crosswalk", caption: "Artist-designed crosswalk, White Rock · TrafficPatterns" },
    { slug: "ubc-musqueam-crosswalk", caption: "UBC & Musqueam crosswalk, Vancouver · TrafficPatterns" },
    {
      src: "/images/applications/driveways/victoria-offset-brick-ashlar-driveway-streetprint-01.jpg",
      alt: "Offset brick and ashlar slate StreetPrint driveway in Victoria",
      caption: "Offset brick on ashlar slate, Victoria · StreetPrint driveway",
    },
    { slug: "langley-events-centre-streetbond", caption: "Circle of Life, Langley Events Centre · StreetBond" },
    {
      src: "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg",
      alt: "Square One crew vapour blasting at Granville Island",
      caption: "Vapour blasting, Granville Island · surface prep",
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
