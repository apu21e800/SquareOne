/**
 * Pin to top (3 Nov 2026, Vern; on projects 5 Nov; back on blog posts 6 Nov,
 * when the projects became posts: "make sure that the pinned article pins
 * to both the homepage blog/projects section, and the blog parent page").
 * One pin at a time, newest wins, small Pinned label, never shown twice. A
 * post's `pinned` switch is the Studio's (sanity/schemaTypes/post.ts);
 * `pinnedAt` is never typed: Publish stamps it when a post goes out pinned
 * and clears it when one goes out unpinned (sanity/actions.ts
 * pinnedPublish; the morning run does the same for a post that goes live by
 * itself, withPinStamp). The site shows the newest pin first (pinnedFirst);
 * any older pin reads as an ordinary post, and the Studio warns while
 * another post is pinned. Pure: no Sanity, no disk.
 *
 * Where it shows: the home page's Selected work
 * (components/sections/ProjectsPreview.tsx) and /blog (app/blog).
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

/** A document as Publish would write it: the pin stamped or its stamp cleared (lib/automation/project-posts.ts, the morning run). */
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
  /** A dated item's date, the pin's time when it was never stamped. */
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
 * other item in the order it came, the pinned one not repeated. Every other
 * item reads as unpinned, an older pin included. No pin: the same order.
 */
export function pinnedFirst<T extends Listed>(items: T[]): T[] {
  let top: T | undefined
  for (const p of items) {
    if (p.pinned !== true) continue
    if (!top || pinTime(p) > pinTime(top)) top = p
  }
  const rest = items.filter((p) => p !== top).map((p) => (p.pinned ? { ...p, pinned: false } : p))
  return top ? [{ ...top, pinned: true }, ...rest] : rest
}
