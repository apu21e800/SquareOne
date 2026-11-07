import { pinnedFirst } from "./pin"

/**
 * The home page's Selected work (components/sections/ProjectsPreview.tsx).
 *
 * 6 Nov 2026 (Vern, with a screenshot of /blog: "let's get the projects
 * section on the homepage looking like the Projects parent page, with the
 * most recent or pinned post stand-alone at the top"): the pinned post, else
 * the newest, leads on a row of its own, as /blog sets its first record;
 * under it, one row of three from the order below. The lead is never shown
 * twice, and an older pin among the three reads as an ordinary post
 * (lib/pin.ts). Pure, so `npm run test:pages` can test it.
 *
 * 6 Nov 2026, later (the client, via Vern: the new blog post "does not show
 * up on the homepage projects section"): with another post pinned, the
 * newest post had no place on the home page, since the three under the lead
 * come from the order below. Now the newest post always shows: it leads when
 * nothing is pinned, and opens the row of three when something is.
 */

/**
 * The jobs under the lead, by their posts' web addresses. 28 Sept 2026
 * (Vern: "more recent images… feature the best looking"): newest first, the
 * strongest frames, adjacent ones alternating warm and cool. Only as many as
 * UNDER_THE_LEAD show; the rest wait their turn if one leaves or leads.
 */
export const FEATURED_ORDER = [
  "nanaimo-rainbow-intersection", // warm: full spectrum, 2025
  "white-rock-custom-crosswalk", // cool: sea blues, 2025
  "south-langford-elementary", // warm: alphabet path, 2025
  "victoria-high-school-whorl-canoes", // cool: turquoise, Victoria, 2024
  "boundary-road-pump-station", // warm: the quilt, 2023
  "every-child-matters-new-westminster", // warm: orange, 2023
] as const

/** One row of three under the lead, as /blog's grid runs three across. */
export const UNDER_THE_LEAD = 3

interface Listable {
  slug: string
  date?: string
  pinned?: boolean
  pinnedAt?: string
  featured_image?: string
  job?: { featured?: boolean }
}

/**
 * The lead and the frames under it, from the posts newest first (getPosts).
 * Only posts with a photograph show. Under the lead: the newest post when
 * a pin leads in its place, then the order above, then the jobs the Studio
 * marks Featured, then the newest, so a slug that goes missing never leaves
 * the row short.
 */
export function selectedWork<T extends Listable>(
  posts: readonly T[],
  order: readonly string[] = FEATURED_ORDER,
  count: number = UNDER_THE_LEAD,
): { lead: T | undefined; rest: T[] } {
  const withPhoto = posts.filter((p) => Boolean(p.featured_image))
  const listed = pinnedFirst(withPhoto)
  const lead = listed[0]
  if (!lead) return { lead: undefined, rest: [] }
  // The newest post with a photograph, as listed (an older pin among the
  // rest reads as ordinary); it opens the row only when it isn't leading.
  const newest = listed.find((p) => p.slug === withPhoto[0]?.slug)
  const bySlug = new Map(listed.map((p) => [p.slug, p]))
  const pool = [
    ...(newest && newest.slug !== lead.slug ? [newest] : []),
    ...order.map((slug) => bySlug.get(slug)).filter((p): p is T => p !== undefined),
    ...listed.filter((p) => p.job?.featured),
    ...listed,
  ]
  const seen = new Set([lead.slug])
  const rest: T[] = []
  for (const p of pool) {
    if (rest.length >= count) break
    if (seen.has(p.slug)) continue
    seen.add(p.slug)
    rest.push(p)
  }
  return { lead, rest }
}
