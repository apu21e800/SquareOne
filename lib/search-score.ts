/**
 * Client-safe search scoring — shared by the nav overlay, /search page and
 * the resources library. No fs, no server imports.
 *
 * Matching: the query is tokenized; EVERY term must hit at least one field.
 * Weights: title 4 (prefix +2, exact-title +6), subtitle 2, keywords 1.
 */

export type SearchEntryType =
  | "page"
  | "service"
  | "product"
  | "application"
  | "project"
  | "document"
  | "post"
  | "image"

export interface SearchEntry {
  type: SearchEntryType
  title: string
  /** Secondary display line — city, category, "Product · Type · Size", … */
  subtitle?: string
  href: string
  /** Thumbnail path, when the result is visual */
  image?: string
  /** Extra haystack, never displayed */
  keywords?: string
  /** Document rows render Preview + Download instead of a plain link */
  download?: boolean
}

export const GROUP_ORDER: SearchEntryType[] = [
  "page",
  "service",
  "product",
  "application",
  "project",
  "document",
  "post",
  "image",
]

export const GROUP_LABEL: Record<SearchEntryType, string> = {
  page: "Pages",
  service: "Services",
  product: "Products",
  application: "Applications",
  project: "Projects",
  document: "Documents",
  post: "Blog",
  image: "Images",
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

export function tokenize(query: string): string[] {
  return norm(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0)
}

function fieldScore(field: string, term: string, weight: number): number {
  if (!field) return 0
  const i = field.indexOf(term)
  if (i === -1) return 0
  let score = weight
  // Word-prefix bonus: matches at a word start read as intended
  if (i === 0 || /[^a-z0-9]/.test(field[i - 1] ?? "")) score += 2
  return score
}

export function scoreEntry(entry: SearchEntry, terms: string[]): number {
  const title = norm(entry.title)
  const subtitle = norm(entry.subtitle ?? "")
  const keywords = norm(entry.keywords ?? "")
  let total = 0
  for (const term of terms) {
    const s =
      fieldScore(title, term, 4) + fieldScore(subtitle, term, 2) + fieldScore(keywords, term, 1)
    if (s === 0) return 0 // AND semantics — every term must land somewhere
    total += s
  }
  if (terms.length > 0 && title === terms.join(" ")) total += 6
  return total
}

export interface GroupedResults {
  type: SearchEntryType
  label: string
  entries: SearchEntry[]
  total: number
}

export function searchEntries(
  entries: SearchEntry[],
  query: string,
  perGroup = 5,
): { groups: GroupedResults[]; total: number } {
  const terms = tokenize(query)
  if (terms.length === 0) return { groups: [], total: 0 }

  const scored: { entry: SearchEntry; score: number }[] = []
  for (const entry of entries) {
    const score = scoreEntry(entry, terms)
    if (score > 0) scored.push({ entry, score })
  }
  scored.sort((a, b) => b.score - a.score)

  const byType = new Map<SearchEntryType, SearchEntry[]>()
  for (const { entry } of scored) {
    const list = byType.get(entry.type) ?? []
    list.push(entry)
    byType.set(entry.type, list)
  }

  const groups: GroupedResults[] = []
  for (const type of GROUP_ORDER) {
    const list = byType.get(type)
    if (!list || list.length === 0) continue
    groups.push({
      type,
      label: GROUP_LABEL[type],
      entries: perGroup > 0 ? list.slice(0, perGroup) : list,
      total: list.length,
    })
  }
  return { groups, total: scored.length }
}
