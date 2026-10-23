import { resolve } from "./presentation"

/**
 * Where a Studio document is edited on the site, and the link that opens it
 * there in Edit on the page (Sanity's Presentation tool, sanity.config.ts).
 *
 * Vern, 23 Oct 2026: "I go to a blog page in sanity, and click 'Edit on the
 * page' in the top nav, it opens the homepage preview, not the blog in
 * question". The tool in the top bar always starts on the home page; that is
 * Sanity's. So a document with a page of its own gets its own Edit on the
 * page button above its fields (sanity/components/EditOnThePage.tsx), as
 * hubss.com's Studio has had since 21 Oct.
 *
 * The page is the first one the "Used on" list names for that document
 * (`resolve.locations` in sanity/presentation.ts), so the button and the
 * list can never point at different pages. `npm run test:studio` checks it.
 */

/** The Presentation tool's name: its address in the Studio is /studio/edit-on-the-page. */
export const EDIT_ON_THE_PAGE_TOOL = "edit-on-the-page"

/**
 * The documents with a page of their own. Not gallery photos, the social
 * grid or Site Settings: each shows on several pages, and its "Used on" list
 * names them.
 */
export const TYPES_WITH_A_PAGE: ReadonlySet<string> = new Set(["homePage", "aboutPage", "contactPage", "drivewaysPage", "service", "pageHero", "post", "project"])

export interface StudioPage {
  title: string
  href: string
}

interface LocationsObject {
  select?: Record<string, string>
  resolve?: (doc: Record<string, unknown> | null) => { locations?: StudioPage[] } | null | undefined
  locations?: StudioPage[]
}

/** A field's value by its path, as Sanity's `select` names it ("slug.current"). */
function at(doc: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((v, key) => (v && typeof v === "object" ? (v as Record<string, unknown>)[key] : undefined), doc)
}

/**
 * The page a document is edited on, or null when it has none (yet): a post
 * or project before its web address, an opener before its page is picked,
 * or a type without a page of its own. Pure.
 */
export function documentPage(type: string, doc: Record<string, unknown> | null | undefined): StudioPage | null {
  if (!TYPES_WITH_A_PAGE.has(type) || !doc) return null
  const def = (resolve?.locations as Record<string, unknown> | undefined)?.[type] as LocationsObject | undefined
  if (!def) return null
  let pages: StudioPage[] | undefined = def.locations
  if (def.resolve) {
    const selected = Object.fromEntries(Object.entries(def.select ?? {}).map(([key, path]) => [key, at(doc, path)]))
    pages = def.resolve(selected)?.locations
  }
  const first = pages?.[0]
  return first && typeof first.href === "string" && first.href.startsWith("/") ? first : null
}

/** A document id without the Studio's draft or version prefix. Pure. */
export function publishedId(id: string): string {
  return id.replace(/^drafts\./, "").replace(/^versions\.[^.]+\./, "")
}

/**
 * The link that opens Edit on the page at `href` with the document beside
 * it: the same intent the Studio's own "Used on" links send (LocationItem in
 * node_modules/sanity/lib/presentation.js, Sanity 6.12: intent "edit", mode
 * "presentation", the tool's name, `preview` the page). `npm run
 * test:studio` checks the installed Sanity still sends that. Pure.
 */
export function editOnThePageIntent(id: string, type: string, href: string) {
  return {
    intent: "edit",
    params: { id: publishedId(id), type, mode: "presentation", presentation: EDIT_ON_THE_PAGE_TOOL, preview: href },
  }
}
