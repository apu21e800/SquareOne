import { defineField, defineType, type CustomValidator } from "sanity"
import { bodyCheck, copyCheck, headingCheck } from "./style"
import { officeDate } from "../lib/publish-date"

/**
 * New writing (dated from 1 Oct 2026) can't be published without a title, a
 * photograph with its alt text, a body and a section (Vern's brief, 20 Oct
 * 2026: "required fields only"; everything else is optional). The library
 * imported from the old site (dated earlier; seven of its posts have no
 * photograph) is only warned, so an old post can still be corrected and
 * republished.
 */
const NEW_WRITING_FROM = "2026-10-01"
const imported = (doc: unknown) => {
  const date = (doc as { date?: unknown } | undefined)?.date
  return typeof date === "string" && date < NEW_WRITING_FROM
}
const empty = (value: unknown) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && !value.trim()) ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" && !Array.isArray(value) && "_type" in (value as object) && (value as { _type?: unknown })._type === "image" && !(value as { asset?: unknown }).asset)
/** Required for new writing (an error: Publish waits). */
const needed =
  (message: string): CustomValidator<unknown> =>
  (value, ctx) =>
    empty(value) && !imported(ctx.document) ? message : true
/** The same, as a warning, for the imported library. */
const wanted =
  (message: string): CustomValidator<unknown> =>
  (value, ctx) =>
    empty(value) && imported(ctx.document) ? message : true

/** A blog post — the same fields the file-based posts carry, plus a body. */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    // 30 Sept 2026: what the drafter (lib/automation/blog.ts) found to check
    // before publishing. Shown only when there are notes; the site never reads it.
    defineField({
      name: "editorNotes",
      type: "text",
      title: "Notes for the editor",
      rows: 12,
      description: "Written by the drafter: the fact check, the style check, the photo. Never shown on the site; clear it before publishing.",
      hidden: ({ document }) => !document?.editorNotes,
      group: "content",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The headline: a sentence a person would say, under 70 characters, in sentence case.",
      validation: (r) => [r.required().error("Give the post a title"), r.max(110), r.custom(copyCheck).warning(), r.custom(headingCheck).warning()],
      group: "content",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web address",
      description: "The part after squareonepaving.com/blog/ — set once, then leave it (links and Google depend on it).",
      options: { source: "title", maxLength: 80 },
      validation: (r) => [
        r.required().error("Press Generate to make the web address from the title"),
        r
          .custom((slug: { current?: string } | undefined) => (!slug?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current) ? true : "Use lowercase letters, numbers and hyphens only, like how-the-crossing-goes-down"))
          .warning(),
      ],
      group: "content",
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Date",
      description: "The date printed on the post. The first Publish sets it to that day (or the day it goes live by itself), so you can leave it; a date in the future is kept. After that it changes only by hand.",
      initialValue: () => officeDate(),
      validation: (r) => r.required(),
      group: "content",
    }),
    // Scheduling (20 Oct 2026, as hubss.com's, lib/automation/project-posts.ts):
    // a draft set to go live by itself is published by the daily run (14:00
    // UTC) on or after its time. Any draft can be; a project article written
    // from job photos waits for Publish instead, unless
    // PROJECT_ARTICLES_AUTO_PUBLISH is on (Vern, 21 Oct 2026). A boolean, not
    // a status list: the posts from before show it plainly off.
    defineField({
      name: "scheduled",
      type: "boolean",
      title: "Goes live by itself",
      initialValue: false,
      description: "On: it goes live at the time below, with the morning run. Off: it goes live when you press Publish, as always.",
      group: "content",
    }),
    defineField({
      name: "scheduledFor",
      type: "datetime",
      title: "Goes live at",
      options: { timeStep: 60 },
      description: "It goes live with the first morning run on or after this time (7:00 a.m. Vancouver time, all year). Change it to a later day to move it.",
      hidden: ({ parent }) => !(parent as { scheduled?: boolean } | undefined)?.scheduled,
      validation: (r) =>
        r.custom((value, ctx) => ((ctx.parent as { scheduled?: boolean } | undefined)?.scheduled && !value ? "Say when it should go live, or turn \"Goes live by itself\" off" : true)),
      group: "content",
    }),
    defineField({
      name: "fieldPost",
      type: "reference",
      title: "Written from the job photos",
      to: [{ type: "fieldPost" }],
      weak: true,
      readOnly: true,
      hidden: ({ value }) => !value,
      description: "The Job photos post this article was written from.",
      group: "content",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Section",
      description: "Which part of the Blog it belongs to; it prints on the post.",
      validation: (r) => [r.custom(needed("Pick the section")), r.custom(wanted("Pick the section")).warning()],
      // "Case Studies" came off the list on 14 Oct 2026: the canon says "project
      // story", never "case study", and the category prints on the post. The
      // blog's Project stories topic finds project stories by their tag.
      options: { list: ["Municipal", "Commercial", "Residential", "Public Art", "Crosswalks", "Parks & Paths", "Streetscapes", "Transit", "School Zones", "Bike Lanes", "Roundabouts", "Vapour Blasting", "Guides"] },
      group: "content",
    }),
    defineField({ name: "author", type: "string", title: "Author", initialValue: "Square One Paving", group: "content" }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Lead photograph",
      description: "Shown at the top of the post and on the blog index. Press the crosshair and drag the focal point onto the pavement: every frame of it crops around that point.",
      options: { hotspot: true },
      validation: (r) => [r.custom(needed("Add the lead photograph: one of Square One's own")), r.custom(wanted("This post has no photograph of its own")).warning()],
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "What the photo shows",
          description: "One plain line, read aloud to people who can't see the photograph: what, where, and the system if you know it.",
          validation: (r) => [r.required().error("Say what the photograph shows: it is read aloud to people who can't see it."), r.custom(copyCheck).warning()],
        }),
      ],
      group: "content",
    }),
    defineField({ name: "excerpt", type: "text", title: "One-paragraph summary", rows: 3, validation: (r) => [r.max(300), r.custom(copyCheck).warning()], description: "Shown on the blog index and in link previews.", group: "content" }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Body",
      validation: (r) => [r.custom(needed("Write the post")), r.custom(wanted("This post has no body")).warning(), r.custom(bodyCheck).warning()],
      group: "content",
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], title: "Tags", options: { layout: "tags" }, group: "seo" }),
    defineField({ name: "seoTitle", type: "string", title: "Search title (optional)", description: "Overrides the title in Google and link previews. Leave blank to use the title.", validation: (r) => r.custom(copyCheck).warning(), group: "seo" }),
    defineField({ name: "seoDescription", type: "text", title: "Search description (optional)", rows: 2, validation: (r) => [r.max(160), r.custom(copyCheck).warning()], group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "mainImage" },
  },
})
