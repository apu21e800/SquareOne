import { defineField, defineType } from "sanity"

/**
 * One tile in the home page "Follow the work" grid. The marketing team posts
 * to Instagram or TikTok first, then adds the same photograph, caption and
 * the post's link here. Newest first; the grid shows the latest six.
 */
export const socialPost = defineType({
  name: "socialPost",
  title: "Social post",
  type: "document",
  fields: [
    defineField({ name: "platform", type: "string", title: "Platform", options: { list: ["Instagram", "TikTok", "Facebook", "LinkedIn", "YouTube"], layout: "radio" }, initialValue: "Instagram", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", title: "Photograph", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "What the photo shows" }], validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string", title: "Caption", validation: (r) => r.required().max(140) }),
    defineField({ name: "url", type: "url", title: "Link to the post", description: "Paste the post's own link (instagram.com/p/… or tiktok.com/@…/video/…).", validation: (r) => r.required().uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "date", type: "date", title: "Posted on", validation: (r) => r.required() }),
    defineField({ name: "isVideo", type: "boolean", title: "Video / reel", initialValue: false }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "caption", subtitle: "platform", media: "image" } },
})
