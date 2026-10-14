/**
 * The Blog plan's vocabulary (14 Oct 2026, as hubss.com's Insights plan):
 * the three kinds of article, the blog section each lands in, and the
 * services, systems and kinds of work a guide can be written from.
 *
 * Pure data with no imports, because the Studio's schema reads it too
 * (sanity/schemaTypes/storyIdea.ts) and the Studio bundle should not carry
 * the site's copy. The lists repeat lib/services.ts, lib/products.ts and
 * lib/work.ts's WORK_APPS by slug; `npm run test:planner` fails if they
 * drift apart.
 *
 * Square One's blog is "Project stories and guides" (/blog). Never a "case
 * study": that word is off the site (the canon), so no kind, section or tag
 * here uses it.
 */

export type PlanKind = "project" | "roundup" | "guide"

export const PLAN_KINDS: readonly { value: PlanKind; title: string }[] = [
  { value: "project", title: "Project story: one documented job" },
  { value: "roundup", title: "Project roundup: three to six documented jobs" },
  { value: "guide", title: "Guide: answers a question customers search for" },
]

/** The category a guide is filed under (sanity/schemaTypes/post.ts); a project story or roundup takes its job's (lib/automation/facts.ts categoryFor). */
export const GUIDE_CATEGORY = "Guides"

/**
 * The tag every project story and roundup carries, so the blog's "Project
 * stories" topic (components/blog/BlogFilterClient.tsx) finds them. Until
 * 14 Oct 2026 that topic matched "Case Studies", which no post carries and
 * the canon bans.
 */
export const PROJECT_STORIES_TAG = "Project stories"

/**
 * The first line of a guide's brief written by the planner
 * (lib/automation/planner.ts): what follows are questions to answer, never
 * facts, so the FACTS block files them apart (lib/automation/facts.ts) and
 * the writer and the fact check are told they support nothing.
 */
export const QUESTIONS_BRIEF = "Questions to answer (not facts):"

export type PlanStatus = "idea" | "ready" | "drafted" | "published" | "dropped"

export const PLAN_STATUSES: readonly { value: PlanStatus; title: string }[] = [
  { value: "idea", title: "Idea: not ready to draft" },
  { value: "ready", title: "Ready: draft it next" },
  { value: "drafted", title: "Drafted: waiting in Blog" },
  { value: "published", title: "Published" },
  { value: "dropped", title: "Not doing it" },
]

/** The four services (lib/services.ts), by slug. */
export const SERVICE_OPTIONS: readonly { value: string; title: string }[] = [
  { value: "stamped-asphalt", title: "Stamped asphalt" },
  { value: "decorative-coatings", title: "Decorative coatings" },
  { value: "preformed-thermoplastic", title: "Preformed thermoplastic" },
  { value: "vapor-blasting", title: "Vapour blasting" },
]

/** The systems Square One installs (lib/products.ts), by slug. */
export const SYSTEM_OPTIONS: readonly { value: string; title: string }[] = [
  { value: "streetprint", title: "StreetPrint" },
  { value: "streetbond", title: "StreetBond" },
  { value: "trafficpatterns", title: "TrafficPatterns" },
  { value: "trafficpatterns-xd", title: "TrafficPatternsXD" },
  { value: "decomark", title: "DecoMark" },
  { value: "durashield", title: "DuraShield" },
  { value: "duratherm", title: "DuraTherm" },
  { value: "premark", title: "PreMark" },
]

/** The kinds of work, each with its page on the site (lib/work.ts WORK_APPS; driveways is /driveways). */
export const APPLICATION_OPTIONS: readonly { value: string; title: string }[] = [
  { value: "crosswalks", title: "Crosswalks" },
  { value: "streetscapes", title: "Streetscapes" },
  { value: "roundabouts", title: "Roundabouts & traffic calming" },
  { value: "parking-lots", title: "Parking lots" },
  { value: "parks-paths", title: "Parks & paths" },
  { value: "schools-sports-courts", title: "Schools & sports courts" },
  { value: "bike-lanes", title: "Bike lanes" },
  { value: "public-art", title: "Public art" },
  { value: "branding-wayfinding", title: "Branding & wayfinding" },
  { value: "driveways", title: "Driveways" },
]

export const isService = (s: unknown): s is string => SERVICE_OPTIONS.some((o) => o.value === s)
export const isSystem = (s: unknown): s is string => SYSTEM_OPTIONS.some((o) => o.value === s)
export const isApplication = (s: unknown): s is string => APPLICATION_OPTIONS.some((o) => o.value === s)

/** A roundup features this many documented jobs. */
export const ROUNDUP_MIN = 3
export const ROUNDUP_MAX = 6
