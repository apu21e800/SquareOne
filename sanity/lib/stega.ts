import type { FilterDefault } from "next-sanity"

/**
 * Edit on the page (14 Oct 2026): which words carry the invisible marks that
 * let an editor click them in the Studio's preview and land on their field.
 *
 * Only words a visitor reads as words. Never a slug, a link, a phone number,
 * an email, an address, alt text, a file name, a category or a year: the
 * code compares those, builds links from them or puts them in an attribute,
 * and a hidden mark would break it. The marks exist only in an editor's
 * preview (draft mode, the editor's own browser); the published site never
 * carries them.
 *
 * Keyed by document type, then by the last named field on the value's path
 * (a project's story paragraph is ["story", 0], a blog body's words are
 * [..., "children", {_key}, "text"]).
 */
export const STEGA_FIELDS: Record<string, ReadonlySet<string>> = {
  homePage: new Set(["headline", "headlineEnd", "line", "caption"]),
  pageHero: new Set(["headline", "headlineEnd", "line", "caption"]),
  galleryPhoto: new Set(["subject", "place"]),
  project: new Set(["title", "excerpt", "story", "client", "artist"]),
  post: new Set(["title", "excerpt", "text", "caption"]),
  siteSettings: new Set(["positioning", "socialHeading", "socialLede"]),
  socialPost: new Set(["caption"]),
}

/** The last string segment of a source path: the field the value lives in. */
export function fieldOf(path: readonly unknown[]): string | undefined {
  for (let i = path.length - 1; i >= 0; i--) if (typeof path[i] === "string") return path[i] as string
  return undefined
}

export const stegaFilter: FilterDefault = (props) => {
  const type = props.sourceDocument?._type
  const field = fieldOf(props.sourcePath)
  if (!type || !field || !STEGA_FIELDS[type]?.has(field)) return false
  return props.filterDefault(props)
}
