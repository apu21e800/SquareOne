import { defineField, type CustomValidator } from "sanity"
import { apiVersion } from "../env"

/**
 * Pin to top (3 Nov 2026, lib/pin.ts; on projects 5 Nov, back on posts 6 Nov
 * when the projects became posts): one pinned document of a type at a time.
 * The site shows the newest pin first, so a second pin is never an error;
 * the Studio warns while another live document of the type is pinned,
 * naming it.
 */
export function pinnedElsewhereMessage(other: { title?: string | null } | null | undefined, noun = "project"): string | true {
  if (!other) return true
  const title = other.title?.trim()
  return title
    ? `"${title}" is pinned already. Publish this one pinned and it goes on top instead; then turn Pin to top off on "${title}" so only one stays pinned.`
    : `Another ${noun} is pinned already. Publish this one pinned and it goes on top instead; then turn Pin to top off on that one so only one stays pinned.`
}

/** The warning for one document type: the newest live pin of that type, other than this document. */
export const pinnedElsewhere =
  (type: string, noun = "project"): CustomValidator<boolean | undefined> =>
  async (value, ctx) => {
    if (value !== true) return true
    const id = (ctx.document?._id ?? "").replace(/^drafts\./, "").replace(/^versions\.[^.]+\./, "")
    const other = await ctx
      .getClient({ apiVersion })
      .fetch<{ title?: string | null } | null>(
        `*[_type == $type && pinned == true && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && _id != $id] | order(coalesce(pinnedAt, date, _createdAt) desc)[0]{ title }`,
        { type, id },
      )
    return pinnedElsewhereMessage(other, noun)
  }

/**
 * The two fields: the switch (the words are Vern's) and the stamp Publish
 * writes (sanity/actions.ts pinnedPublish), hidden and never typed.
 */
export const pinFields = (type: string, description: string, noun = "project", group?: string) => [
  defineField({
    name: "pinned",
    type: "boolean",
    title: "Pin to top",
    initialValue: false,
    description,
    validation: (r) => r.custom(pinnedElsewhere(type, noun)).warning(),
    ...(group ? { group } : {}),
  }),
  defineField({
    name: "pinnedAt",
    type: "datetime",
    title: "Pinned at",
    description: "Set by Publish when it goes out pinned; the newest pin shows first.",
    readOnly: true,
    hidden: true,
    ...(group ? { group } : {}),
  }),
]

/** The switch's words (Vern, 5 and 6 Nov 2026: the pinned post leads the home page's section and the Projects page). */
export const POST_PIN_DESCRIPTION = "Shows this post first in Selected work on the home page and at the top of the Projects page. One pinned post at a time."
