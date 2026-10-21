import { defineArrayMember, defineField, defineType } from "sanity"

/**
 * What the daily social job did for one blog post, field post or library
 * item (lib/automation/social.ts, run by app/api/cron/social-drafts): the
 * drafts it left in Buffer, the channels it skipped, and the style check on
 * the copy. Studio → Social drafts, read only (14 Oct 2026, as hubss.com's).
 *
 * The job writes these; the Studio only shows them, so the office can see the
 * style check next to the drafts it is about to approve in Buffer (the posts
 * themselves live in Buffer, not here). The document's existence is also what
 * stops the next run drafting the same item again: deleting one has that item
 * drafted again.
 */
export const socialLog = defineType({
  name: "socialLog",
  title: "Social drafts",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "title", title: "Drafted from", type: "string" }),
    defineField({
      name: "source",
      title: "Stream",
      type: "string",
      description: "Article (a new blog post), From the field (a field post) or From the library (a documented project or a service page).",
    }),
    defineField({
      name: "styleCheck",
      title: "Style check",
      type: "text",
      rows: 6,
      description: "Sentences in the Buffer drafts that still break the house style after the drafter's own rewrite. Fix them in Buffer before you approve the posts.",
    }),
    defineField({
      name: "slug",
      title: "Key",
      type: "string",
      description: "For a blog post, its web address: squareonepaving.com/blog/ followed by this. For a field post, field: and its id; for a library post, lib: and what it was.",
    }),
    defineField({ name: "createdAt", title: "Drafted", type: "datetime" }),
    defineField({
      name: "drafts",
      title: "Drafts waiting in Buffer",
      type: "array",
      of: [
        defineArrayMember({
          name: "bufferDraft",
          title: "Draft",
          type: "object",
          fields: [
            defineField({ name: "channel", title: "Channel", type: "string" }),
            defineField({ name: "service", title: "Network", type: "string" }),
            defineField({ name: "bufferPostId", title: "Buffer post id", type: "string" }),
          ],
          preview: { select: { title: "channel", subtitle: "service" } },
        }),
      ],
    }),
    defineField({
      name: "skipped",
      title: "Skipped",
      type: "array",
      of: [
        defineArrayMember({
          name: "skippedChannel",
          title: "Skipped channel",
          type: "object",
          fields: [
            defineField({ name: "channel", title: "Channel", type: "string" }),
            defineField({ name: "service", title: "Network", type: "string" }),
            defineField({ name: "why", title: "Why", type: "string" }),
          ],
          preview: { select: { title: "channel", subtitle: "why" } },
        }),
      ],
    }),
  ],
  orderings: [{ title: "Newest first", name: "createdDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", createdAt: "createdAt", styleCheck: "styleCheck", source: "source" },
    prepare: ({ title, createdAt, styleCheck, source }) => ({
      title,
      subtitle: [
        source && source !== "Article" ? source : null,
        typeof createdAt === "string" ? createdAt.slice(0, 10) : null,
        // styleReport (lib/automation/drafter.ts) starts a clean check with these words.
        typeof styleCheck === "string" ? (/^STYLE CHECK: clean/.test(styleCheck) ? "Style check clean" : "Style check: sentences to fix") : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
})
