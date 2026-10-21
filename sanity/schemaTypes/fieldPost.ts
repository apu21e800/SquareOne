import { defineArrayMember, defineField, defineType } from "sanity"
import { copyCheck } from "./style"
import { officeDate } from "../lib/publish-date"
import { APPLICATION_OPTIONS, SERVICE_OPTIONS, SYSTEM_OPTIONS } from "../../lib/automation/plan"

/**
 * Job photos (14 Oct 2026, as hubss.com's; "From the field" until 20 Oct):
 * photos of a finished job, straight from a phone, with the place, the
 * service and a line of facts. Studio → Job photos.
 *
 * Publishing one is all it takes: the next daily run (14:00 UTC,
 * lib/automation/social.ts) writes a post per channel from it and leaves them
 * as drafts in Square One's Buffer, linked to the service's page. Nothing
 * posts until someone approves it in Buffer. The posts say only what this
 * document says, so the note is the only writing anyone does.
 *
 * With The story filled in (20 Oct 2026, lib/automation/project-posts.ts) the
 * job becomes a project article on the Blog instead: written from this
 * document and the service's page, scheduled to go live by itself two
 * weekdays out (the editors are emailed first and can hold or change it), and
 * its social posts follow the day after it is live. A job with a story gets
 * no social posts of its own: it goes out once, as the article.
 *
 * Not shown on the website by itself: the photos live here, in the posts and
 * in the article.
 */
const optionList = (list: readonly { value: string; title: string }[]) => list.map((o) => ({ value: o.value, title: o.title }))

export const fieldPost = defineType({
  name: "fieldPost",
  title: "Job photos",
  type: "document",
  fields: [
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description:
        "3 to 10 photos of the finished job, from your phone or computer. The first one leads the posts and the article, so put the best one first (drag to reorder). Press the crosshair and drag the focal point onto the pavement: the posts crop around it. Only Square One's own photos of this job, and no faces of children.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "What the photo shows",
              description: "One plain line, read aloud to people who can't see the photo: what, where, and the system if you know it.",
              validation: (r) => [r.required().error("Say what the photo shows: it is read aloud to people who can't see it."), r.custom(copyCheck).warning()],
            }),
          ],
        }),
      ],
      validation: (r) => [
        r.required().error("Add at least one photo"),
        r.min(1).error("Add at least one photo"),
        r.min(3).warning("Three or more photos make a better post: add a couple more if you have them"),
        r.max(10).error("Ten photos at most"),
      ],
    }),
    defineField({
      name: "place",
      title: "Where",
      type: "string",
      description: "The town, e.g. 'Langley, BC'. Add the site only if the client is happy to be named, e.g. 'Ralph's Farm Market, Langley, BC'.",
      validation: (r) => [r.required().error("Say where the job is"), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
      options: { list: optionList(SERVICE_OPTIONS), layout: "radio" },
      description: "The service on the job. The posts link to its page.",
      validation: (r) => r.required().error("Pick the service"),
    }),
    defineField({
      name: "systems",
      title: "Systems (optional)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: optionList(SYSTEM_OPTIONS), layout: "grid" },
      description: "Tick the systems installed, if you know them.",
    }),
    defineField({
      name: "application",
      title: "Kind of work (optional)",
      type: "string",
      options: { list: optionList(APPLICATION_OPTIONS) },
      description: "What kind of job it is, e.g. Crosswalks or Driveways.",
    }),
    defineField({
      name: "note",
      title: "What was done",
      type: "text",
      rows: 3,
      description:
        "One or two sentences of facts in your own words: what went down and anything worth knowing (the pattern, the colours, the deadline). The posts say nothing that isn't here or on the service's page, so no guesses, no prices and no phone numbers.",
      validation: (r) => [r.required().error("Write a line about the job"), r.max(600).warning("Keep it to a few sentences"), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "date",
      title: "When it was done",
      type: "date",
      initialValue: () => officeDate(),
    }),
    defineField({
      name: "writeUp",
      title: "The story, for a project article (optional)",
      type: "text",
      rows: 8,
      description:
        "A few sentences or a list, in your own words: the site (name it only if the client is happy to be named), what was needed, what went in and when, anything about the design or the colours, and how it has held up. Fill this in and the job is written up as a project article on the Blog, scheduled to go live in a couple of weekdays; you'll get an email to read it first. Everything the article says about the job comes from here and the line above, so no guesses, no prices, no phone numbers or home addresses, and no figures you aren't sure of. Leave it empty and the photos go to social only.",
      validation: (r) => [r.max(4000).warning("That is a lot: a few sentences or a short list is enough"), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "article",
      title: "The article written from this",
      type: "reference",
      to: [{ type: "post" }],
      weak: true,
      readOnly: true,
      hidden: ({ value }) => !value,
      description: "The project article written from these photos and the story, once it exists. Open it in Blog posts.",
    }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { place: "place", service: "service", media: "photos.0", date: "date" },
    prepare: ({ place, service, media, date }) => ({
      title: [SERVICE_OPTIONS.find((o) => o.value === service)?.title, place].filter(Boolean).join(" in ") || "New job photos",
      subtitle: typeof date === "string" ? date : undefined,
      media,
    }),
  },
})
