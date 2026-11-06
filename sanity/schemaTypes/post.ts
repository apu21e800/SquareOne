import { defineArrayMember, defineField, defineType, type CustomValidator } from "sanity"
import { ICONS } from "../icons"
import { bodyCheck, copyCheck, headingCheck } from "./style"
import { officeDate } from "../lib/publish-date"
import { ADDONS } from "../../lib/addons"
import { POST_PIN_DESCRIPTION, pinFields } from "./pin"

const SYSTEMS = ["StreetPrint", "StreetBond", "StreetBondSR", "StreetBond150", "TrafficPatterns", "TrafficPatternsXD", "DuraTherm", "DecoMark", "PreMark", "DuraShield"]
const APPLICATIONS = ["Crosswalks", "Streetscapes", "Roundabouts & traffic calming", "Parking lots", "Parks & paths", "Schools & sports courts", "Bike lanes", "Public art", "Branding & wayfinding", "Driveways"]
const REGIONS = ["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"]
const SERVICES = ["Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapour Blasting"]

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

/** The job's fields, as the Studio holds them; a post that fills one in fills in the three the page needs. */
const JOB_FIELDS = ["application", "service", "systems", "city", "region", "year", "client", "artist", "gallery", "jobTitle"] as const
type JobDoc = Partial<Record<(typeof JOB_FIELDS)[number], unknown>>
const saysAJob = (doc: unknown) => JOB_FIELDS.some((f) => !empty((doc as JobDoc | undefined)?.[f]))
/** Required once the post says anything about a job (an error: Publish waits). */
const jobNeeded =
  (message: string): CustomValidator<unknown> =>
  (value, ctx) =>
    empty(value) && saysAJob(ctx.document) ? message : true

/**
 * A blog post — the same fields the file-based posts carry, plus a body.
 *
 * 6 Nov 2026 (Vern: "Projects and blog should be combined into the same
 * thing, not two separate sections"): a post is also where a job lives. The
 * job tab holds what the project page showed: the place, the year, the
 * systems, the application and service that list it, the other
 * photographs. Filled in, the post joins Selected work, the application and
 * service pages and search as a project (lib/blog.ts Job,
 * lib/projects-cms.ts); left empty, it is a guide. The Studio's Projects
 * list is gone; scripts/merge-projects-into-posts.ts moved each project into
 * its post.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: ICONS.post,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "job", title: "The job" },
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
      description: "The part after squareonepaving.com/blog/. Press Generate once the title is in, then leave it: links and Google depend on it.",
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
      description: ADDONS
        ? "The date printed on the post. The first Publish sets it to that day (or the day it goes live by itself), so you can leave it; a date in the future is kept. After that it changes only by hand."
        : "The date printed on the post. The first Publish sets it to that day, so you can leave it; a date in the future is kept. After that it changes only by hand.",
      initialValue: () => officeDate(),
      validation: (r) => r.required(),
      group: "content",
    }),
    // Scheduling (20 Oct 2026, as hubss.com's, lib/automation/project-posts.ts):
    // a draft set to go live by itself is published by the daily run (14:00
    // UTC) on or after its time. Any draft can be; a project article written
    // from job photos waits for Publish instead, unless
    // PROJECT_ARTICLES_AUTO_PUBLISH is on (Vern, 21 Oct 2026). A boolean, not
    // a status list: the posts from before show it plainly off. An add-on
    // (lib/addons.ts): with the add-ons off both fields are hidden and never
    // stop a Publish, since nothing would take the post live by itself.
    defineField({
      name: "scheduled",
      type: "boolean",
      title: "Goes live by itself",
      initialValue: false,
      description: "On: it goes live at the time below, with the morning run. Off: it goes live when you press Publish, as always.",
      hidden: !ADDONS,
      group: "content",
    }),
    defineField({
      name: "scheduledFor",
      type: "datetime",
      title: "Goes live at",
      options: { timeStep: 60 },
      description: "It goes live with the first morning run on or after this time (7:00 a.m. Vancouver time, all year). Change it to a later day to move it.",
      hidden: ({ parent }) => !ADDONS || !(parent as { scheduled?: boolean } | undefined)?.scheduled,
      validation: (r) =>
        r.custom((value, ctx) => (ADDONS && (ctx.parent as { scheduled?: boolean } | undefined)?.scheduled && !value ? "Say when it should go live, or turn \"Goes live by itself\" off" : true)),
      group: "content",
    }),
    // Pin to top (3 Nov 2026, Vern; back on posts 6 Nov, lib/pin.ts): the
    // pinned post leads Selected work on the home page and the Projects page.
    // Publish stamps pinnedAt (sanity/actions.ts pinnedPublish); the newest
    // pin shows first.
    ...pinFields("post", POST_PIN_DESCRIPTION, "post", "content"),
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
      description: "Shown at the top of the post and on the blog index. Press the crop button on the photo (Crop image) and drag the circle onto the pavement: every frame of it crops around that point.",
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
    // ── The job (6 Nov 2026) ────────
    defineField({
      name: "application",
      type: "string",
      title: "Application",
      description: "Which gallery and application page the job belongs with. Fill in the job's fields and this post is one of the projects; leave them all empty for a guide.",
      options: { list: APPLICATIONS },
      validation: (r) => r.custom(jobNeeded("Pick the application, or clear the job's fields")),
      group: "job",
    }),
    defineField({ name: "service", type: "string", title: "Service line", description: "Which service page lists it.", options: { list: SERVICES }, validation: (r) => r.custom(jobNeeded("Pick the service line, or clear the job's fields")), group: "job" }),
    defineField({
      name: "jobTitle",
      type: "string",
      title: "Name in lists",
      description: "How the job is named under its photograph on the application and service pages: what and where, like “Rainbow intersection, Nanaimo”. Left blank, the post's title.",
      validation: (r) => [r.max(90), r.custom(copyCheck).warning()],
      group: "job",
    }),
    defineField({ name: "systems", type: "array", of: [{ type: "string" }], title: "Systems installed", description: "Tick every system on this job. They print under the photograph.", options: { list: SYSTEMS }, group: "job" }),
    defineField({ name: "city", type: "string", title: "City", description: "e.g. “Nanaimo, BC”", validation: (r) => r.custom(jobNeeded("Say where the job is, or clear the job's fields")), group: "job" }),
    defineField({ name: "region", type: "string", title: "Region", options: { list: REGIONS }, group: "job" }),
    defineField({ name: "year", type: "string", title: "Year (only if published)", description: "Leave blank unless Square One has stated when it was installed.", group: "job" }),
    defineField({ name: "client", type: "string", title: "Client (only if published)", description: "Leave blank unless the client has agreed to be named. The site says “installed at”, never “for”; the name is kept here and never printed.", group: "job" }),
    defineField({ name: "artist", type: "string", title: "Artist / designer (only if published)", description: "Prints as “Design” with the job's facts.", group: "job" }),
    defineField({
      name: "gallery",
      type: "array",
      title: "More photographs",
      description:
        "The job's other photographs, after the lead photograph; drag to reorder. Add item, then Upload a photograph or Select one already in the Studio's media library. Each one needs a line saying what it shows, and a focal point: press the crop button on the photograph (Crop image) and drag the circle onto the pavement. Only Square One's own photographs of this installation.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "What the photo shows",
              description: "One plain line, read aloud to people who can't see the photograph: what, where, and the system if you know it.",
              validation: (r) => [r.required().error("Say what the photograph shows: it is read aloud to people who can't see it."), r.custom(copyCheck).warning()],
            }),
          ],
        }),
      ],
      group: "job",
    }),
    defineField({ name: "featured", type: "boolean", title: "Featured", description: "Marks one of the strongest jobs. On the home page, the three under the pinned or newest post are chosen by the web team; ask them to change which show there.", initialValue: false, group: "job" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], title: "Tags", options: { layout: "tags" }, group: "seo" }),
    defineField({ name: "seoTitle", type: "string", title: "Search title (optional)", description: "Overrides the title in Google and link previews. Leave blank to use the title.", validation: (r) => r.custom(copyCheck).warning(), group: "seo" }),
    defineField({ name: "seoDescription", type: "text", title: "Search description (optional)", rows: 2, validation: (r) => [r.max(160), r.custom(copyCheck).warning()], group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "mainImage" },
  },
})
