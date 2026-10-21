import { defineArrayMember, defineField, defineType } from "sanity"
import { copyCheck } from "./style"
import { officeDate } from "../lib/publish-date"
import { APPLICATION_OPTIONS, SERVICE_OPTIONS, SYSTEM_OPTIONS } from "../../lib/automation/plan"

/**
 * A field post (14 Oct 2026, as hubss.com's): photos of a finished job,
 * straight from a phone, with the place, the service and a line of facts.
 * Studio → From the field.
 *
 * Publishing one is all it takes: the next daily social run (14:00 UTC,
 * lib/automation/social.ts) writes a post per channel from it and leaves them
 * as drafts in Square One's Buffer, linked to the service's page. Nothing
 * posts until someone approves it in Buffer. The posts say only what this
 * document says, so the note is the only writing anyone does.
 *
 * Not shown on the website: the photos live here and in the posts.
 */
const optionList = (list: readonly { value: string; title: string }[]) => list.map((o) => ({ value: o.value, title: o.title }))

export const fieldPost = defineType({
  name: "fieldPost",
  title: "Field post",
  type: "document",
  fields: [
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description:
        "1 to 10 photos of the finished job, from your phone or computer. The first one leads the posts, so put the best one first (drag to reorder). Press the crosshair and drag the focal point onto the pavement: the posts crop around it. Only Square One's own photos of this job, and no faces of children.",
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
      validation: (r) => [r.required().error("Add at least one photo"), r.min(1).error("Add at least one photo"), r.max(10).error("Ten photos at most")],
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
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { place: "place", service: "service", media: "photos.0", date: "date" },
    prepare: ({ place, service, media, date }) => ({
      title: [SERVICE_OPTIONS.find((o) => o.value === service)?.title, place].filter(Boolean).join(" in ") || "New field post",
      subtitle: typeof date === "string" ? date : undefined,
      media,
    }),
  },
})
