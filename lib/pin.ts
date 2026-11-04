/**
 * Pin to top (3 Nov 2026, Vern: "Shows this article first on the home page
 * articles section and at the top of the blog page. One pinned article at a
 * time."). A post's `pinned` switch is the Studio's (sanity/schemaTypes/post.ts);
 * `pinnedAt` is never typed: Publish stamps it when a post goes out pinned
 * and clears it when one goes out unpinned (sanity/actions.ts), and the
 * morning run does the same for a post that goes live by itself
 * (lib/automation/project-posts.ts toPublished). The site shows the newest
 * pin first (pinnedFirst); any older pin reads as an ordinary post, and the
 * Studio warns while another post is pinned. Pure: no Sanity, no disk.
 *
 * Where it shows: /blog (app/blog/page.tsx), as the lead, and the home
 * page's articles band (components/sections/BlogFeed.tsx), back since 3 Nov
 * 2026. npm run test:studio keeps the switch's description and the guide
 * in step with whether the home page shows articles.
 */

export interface Pinnable {
  pinned?: unknown
  pinnedAt?: unknown
}

/** The patch Publish makes for the pin, or null when it needs none. */
export type PinPatch = { set: { pinnedAt: string } } | { unset: ["pinnedAt"] }

/**
 * What going live does to the pin: pinned with no stamp → stamped now;
 * unpinned with a stamp → the stamp cleared; otherwise nothing, so an edit to
 * a post that stays pinned keeps its place among the pins.
 */
export function pinOnPublish(doc: Pinnable | null | undefined, now: Date = new Date()): PinPatch | null {
  const pinned = doc?.pinned === true
  const stamped = typeof doc?.pinnedAt === "string" && doc.pinnedAt.trim() !== ""
  if (pinned && !stamped) return { set: { pinnedAt: now.toISOString() } }
  if (!pinned && doc?.pinnedAt != null) return { unset: ["pinnedAt"] }
  return null
}

/** A document as it goes live, with the pin's patch applied (the morning run's publish). */
export function withPinStamp<T extends object>(doc: T, now: Date = new Date()): T {
  const patch = pinOnPublish(doc as Pinnable, now)
  if (!patch) return doc
  if ("set" in patch) return { ...doc, pinnedAt: patch.set.pinnedAt }
  const { pinnedAt: _gone, ...rest } = doc as T & Pinnable
  void _gone
  return rest as T
}

interface Listed {
  slug: string
  date?: string
  pinned?: boolean
  pinnedAt?: string
}

/** When a pin counts as made: its stamp, else (pinned some other way) its date. */
function pinTime(p: Listed): string {
  return (p.pinnedAt && p.pinnedAt.trim()) || p.date || ""
}

/**
 * The list a visitor reads: the newest pin first, marked `pinned`, then every
 * other post in the order it came, the pinned one not repeated. Every other
 * post reads as unpinned, an older pin included. No pin: the same order.
 */
export function pinnedFirst<T extends Listed>(posts: T[]): T[] {
  let top: T | undefined
  for (const p of posts) {
    if (p.pinned !== true) continue
    if (!top || pinTime(p) > pinTime(top)) top = p
  }
  const rest = posts.filter((p) => p !== top).map((p) => (p.pinned ? { ...p, pinned: false } : p))
  return top ? [{ ...top, pinned: true }, ...rest] : rest
}
