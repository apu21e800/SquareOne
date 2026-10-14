/**
 * Site Settings: Square One's phone lines, email, address, social accounts
 * and the footer's line, the same everywhere they print (14 Oct 2026, as
 * hubss.com since 7 Oct). The office edits them in the Studio (Site
 * Settings); a phone number changed there changes the footer, the menu, the
 * quote form, the contact and about pages, every "or call" line, the legal
 * pages, llms.txt and the search engines' data, within seconds of Publish.
 *
 * The values below are the code's copy and the fallback, on the site-wide
 * rule: a blank Studio field shows these (mergeSettings). Server code reads
 * the merged settings with getSiteSettings() (lib/cms.ts); client components
 * with useSiteSettings() (components/SiteSettingsProvider.tsx).
 *
 * Two places keep the code's copy on purpose: the quote form's server
 * message when a send fails (lib/contact.ts FALLBACK: a failure message must
 * never wait on the CMS), and the words of blog posts, which are articles
 * the office edits as articles.
 *
 * Pure data and string functions: safe in server and client components.
 */

export interface SiteSettings {
  /** The footer's line under the logo. */
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
  /** Kept for the documents that carry them; nothing prints these since 14 Oct 2026 (the Home page has its own words). */
  socialHeading: string
  socialLede: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  // The footer's line (components/Footer.tsx) as it has printed since
  // 2 Oct 2026. Until 14 Oct the Studio's "Positioning line (footer)" was
  // read by nothing and the footer kept its own words.
  positioning: "Decorative pavement across British Columbia since 2000. One office in Maple Ridge, crews on both sides of the Strait.",
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
  socialHeading: "Recent, on Instagram",
  socialLede: "The crews at work, installs as they finish, and the odd before-and-after.",
}

const KEYS = Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[]

/** The Studio's value for each field when it has one, else the code's. */
export function mergeSettings(doc: Partial<Record<keyof SiteSettings, unknown>> | null | undefined): SiteSettings {
  const out: SiteSettings = { ...DEFAULT_SETTINGS }
  if (!doc) return out
  for (const key of [...KEYS, "tiktok" as const]) {
    const v = doc[key]
    if (typeof v === "string" && v.trim()) (out as unknown as Record<string, string>)[key] = v.trim()
  }
  return out
}

/** A phone line as people write it, the only shape the Studio accepts: "604-612-6209", "1-877-391-0270". */
export const PHONE_SHAPE = /^(1-)?\d{3}-\d{3}-\d{4}$/

/** The digits with the country code: "16046126209". */
function digits(phone: string): string {
  const d = phone.replace(/\D/g, "")
  return d.length === 10 ? `1${d}` : d
}

/** A tel: link: "604-612-6209" gives "tel:+16046126209". */
export function telHref(phone: string): string {
  return `tel:+${digits(phone)}`
}

/** The number for structured data: "+1-604-612-6209". */
export function schemaPhone(phone: string): string {
  const d = digits(phone)
  return d.length === 11 ? `+${d[0]}-${d.slice(1, 4)}-${d.slice(4, 7)}-${d.slice(7)}` : `+${d}`
}

/** A mailto: link, with an optional "?subject=…" already encoded. */
export function mailtoHref(email: string, query = ""): string {
  return `mailto:${email.trim()}${query}`
}

/** "@squareonepaving" from an Instagram or TikTok profile URL; "" when it is not a profile. */
export function handleFrom(url: string | undefined): string {
  if (!url) return ""
  const m = /^https?:\/\/(?:www\.)?(?:instagram\.com|tiktok\.com)\/@?([A-Za-z0-9._]+)\/?$/.exec(url.trim())
  return m ? `@${m[1]}` : ""
}

/**
 * The office's address for structured data, from the two lines as printed:
 * "19–11720 Stewart Crescent" and "Maple Ridge, BC V2X 9E7". A second line
 * that doesn't read as town, province and postal code keeps the code's.
 */
export function addressParts(s: SiteSettings): { street: string; locality: string; region: string; postalCode: string } {
  const parse = (line: string) => /^(.+?),\s*([A-Z]{2})\s+([A-Z]\d[A-Z] ?\d[A-Z]\d)$/.exec(line.trim())
  const m = parse(s.addressLine2) ?? (parse(DEFAULT_SETTINGS.addressLine2) as RegExpExecArray)
  return {
    // Machines read a plain hyphen in a unit number.
    street: s.addressLine1.replace(/[–—]/g, "-"),
    locality: m[1].trim(),
    region: m[2],
    postalCode: m[3].replace(/^(...)(...)$/, "$1 $2"),
  }
}

/**
 * Prose that names a line or the email (an FAQ answer, the legal pages'
 * contact paragraph) with the Studio's values in place of the code's. With
 * the settings as they ship, the text comes back exactly as written.
 */
export function withSettings(text: string, s: SiteSettings): string {
  const swaps = new Map<string, string>([
    [DEFAULT_SETTINGS.phoneTollFree, s.phoneTollFree],
    [DEFAULT_SETTINGS.phoneOffice, s.phoneOffice],
    [DEFAULT_SETTINGS.phoneIsland, s.phoneIsland],
    [DEFAULT_SETTINGS.email, s.email],
    [DEFAULT_SETTINGS.addressLine1, s.addressLine1],
    [DEFAULT_SETTINGS.addressLine2, s.addressLine2],
  ])
  for (const [from, to] of [...swaps]) if (from === to) swaps.delete(from)
  if (!swaps.size) return text
  // One pass, longest first, so the toll-free number is never half-replaced
  // and a value swapped in is never swapped again.
  const pattern = new RegExp([...swaps.keys()].sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g")
  return text.replace(pattern, (hit) => swaps.get(hit) ?? hit)
}
