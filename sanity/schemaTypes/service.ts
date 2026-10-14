import { defineArrayMember, defineField, defineType, type ConditionalPropertyCallback } from "sanity"
import { copyCheck } from "./style"

/**
 * One of the four services (14 Oct 2026): the words a visitor reads about it.
 * The site reads these through lib/services-cms.ts; lib/services.ts stays the
 * record (the name and web address, the systems and applications it links
 * to, the photographs). A field left empty shows the site's own words.
 *
 * There are four services and their addresses are fixed: the office can't
 * add, delete or duplicate one (sanity.config.ts). `npm run sync:pages`
 * creates the four and fills them with the words the site shows today.
 */

/** Vapour blasting's page is its own: it prints the tagline and the questions only. */
const VAPOUR_ONLY_SHOWS_SOME: ConditionalPropertyCallback = ({ document }) => (document as { slug?: unknown } | undefined)?.slug === "vapor-blasting"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Service", readOnly: true, description: "Fixed: the name and the web address come with the site." }),
    defineField({ name: "slug", type: "string", title: "Web address", readOnly: true, hidden: true }),
    defineField({
      name: "tagline",
      type: "string",
      title: "One-line tagline",
      description: "Under the service's name on /services, and under the headline of the service's page (unless its Page opener has its own line). Left empty, the site's own.",
      validation: (r) => [r.max(140), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      title: "Intro",
      description: "The paragraph that opens the service's page; also what Google shows under the link (the first 158 characters or so). Left empty, the site's own.",
      hidden: VAPOUR_ONLY_SHOWS_SOME,
      validation: (r) => r.custom(copyCheck).warning(),
    }),
    defineField({
      name: "idealClients",
      type: "array",
      title: "Who we work with",
      description: "One per line; the page shows the first five. Left empty, the site's own list.",
      of: [{ type: "string", validation: (r) => r.custom(copyCheck).warning() }],
      hidden: VAPOUR_ONLY_SHOWS_SOME,
    }),
    defineField({
      name: "benefits",
      type: "array",
      title: "What you get",
      description: "One per line; the page shows up to five. Lines about the site walk or our own crews are left off this list, because the page's process band says them. Left empty, the site's own list.",
      of: [{ type: "string", validation: (r) => r.custom(copyCheck).warning() }],
      hidden: VAPOUR_ONLY_SHOWS_SOME,
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "Questions and answers",
      description: "On the service's page, and to Google as its FAQ. Each answer may only say what the page already says. Drag to reorder. Left empty, the site's own questions.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "q", type: "string", title: "Question", validation: (r) => [r.required(), r.custom(copyCheck).warning()] }),
            defineField({ name: "a", type: "text", rows: 4, title: "Answer", validation: (r) => [r.required(), r.custom(copyCheck).warning()] }),
          ],
          preview: { select: { title: "q", subtitle: "a" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "tagline" } },
})
