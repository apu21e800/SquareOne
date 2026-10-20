import type { CustomValidator, PortableTextBlock, ValidationError } from "sanity"
import { lintCopy, lintHeading, type StyleIssue } from "../../lib/automation/style"

/**
 * Yellow warnings in the Studio (14 Oct 2026): Square One's house style and
 * canon on the words a visitor reads, as the blog drafter already writes to
 * them (lib/automation/style.ts): no dashes used as dashes, no "not just X,
 * it's Y", no filler or stock phrases, the manufacturer never named, never
 * "our" system, "installed at", no guarantee, price or lead time, Vancouver
 * Island never an office, headings in sentence case and without "vs".
 *
 * Warnings only: they never stop Publish. A rule would rather miss a slip
 * than cry wolf. Posts dated before 1 Oct 2026 (the library imported from
 * the old site) are left alone, so the office isn't met with warnings on
 * words they didn't write; anything new is checked.
 */

const NEW_WRITING_FROM = "2026-10-01"

function say(issues: StyleIssue[]): true | string {
  if (!issues.length) return true
  const shown = issues.slice(0, 2).map((i) => `${i.message} (“${i.excerpt.replace(/\s+/g, " ").trim()}”)`)
  return issues.length > 2 ? `${shown.join(" ")} And ${issues.length - 2} more like it.` : shown.join(" ")
}

function importedPost(doc: unknown): boolean {
  const d = doc as { _type?: unknown; date?: unknown } | undefined
  return d?._type === "post" && typeof d.date === "string" && d.date < NEW_WRITING_FROM
}

/** Words a visitor reads: a line, a summary, a caption, a title with names in it. */
export const copyCheck: CustomValidator<string | undefined> = (value, context) =>
  typeof value === "string" && !importedPost(context.document) ? say(lintCopy(value)) : true

/** A headline: sentence case, and no "vs" (left alone on the imported library's posts, as the copy rules are). */
export const headingCheck: CustomValidator<string | undefined> = (value, context) =>
  typeof value === "string" && !importedPost(context.document) ? say(lintHeading(value)) : true

/** Paragraphs typed one per box (a project's story). */
export const paragraphsCheck: CustomValidator<string[] | undefined> = (paragraphs) => {
  if (!Array.isArray(paragraphs)) return true
  const out: ValidationError[] = []
  paragraphs.forEach((p, i) => {
    const r = typeof p === "string" ? say(lintCopy(p)) : true
    if (r !== true) out.push({ message: r, path: [i] })
  })
  return out.length ? out : true
}

/** A blog post's body: each paragraph on its own, so the warning sits beside it. */
export const bodyCheck: CustomValidator<PortableTextBlock[] | undefined> = (blocks, context) => {
  if (!Array.isArray(blocks) || importedPost(context.document)) return true
  const out: ValidationError[] = []
  for (const block of blocks) {
    const b = block as { _type?: string; _key?: string; children?: { text?: unknown }[] }
    if (b._type !== "block" || !b._key || !Array.isArray(b.children)) continue
    const r = say(lintCopy(b.children.map((c) => (typeof c?.text === "string" ? c.text : "")).join("")))
    if (r !== true) out.push({ message: r, path: [{ _key: b._key }] })
  }
  return out.length ? out : true
}
