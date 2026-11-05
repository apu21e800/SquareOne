/**
 * Pin to top (3 Nov 2026, Vern; moved from blog posts to projects on 5 Nov:
 * "a pinned project leads Selected work on the home page and leads the
 * /projects page. One pin at a time, newest wins, small Pinned label, never
 * shown twice"). A project's `pinned` switch is the Studio's
 * (sanity/schemaTypes/project.ts); `pinnedAt` is never typed: Publish stamps
 * it when a project goes out pinned and clears it when one goes out unpinned
 * (sanity/actions.ts pinnedPublish). The site shows the newest pin first
 * (pinnedFirst); any older pin reads as an ordinary project, and the Studio
 * warns while another project is pinned. Pure: no Sanity, no disk.
 *
 * Where it shows: the home page's Selected work
 * (components/sections/ProjectsPreview.tsx) and /projects (app/projects).
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
 * a project that stays pinned keeps its place among the pins.
 */
export function pinOnPublish(doc: Pinnable | null | undefined, now: Date = new Date()): PinPatch | null {
  const pinned = doc?.pinned === true
  const stamped = typeof doc?.pinnedAt === "string" && doc.pinnedAt.trim() !== ""
  if (pinned && !stamped) return { set: { pinnedAt: now.toISOString() } }
  if (!pinned && doc?.pinnedAt != null) return { unset: ["pinnedAt"] }
  return null
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
