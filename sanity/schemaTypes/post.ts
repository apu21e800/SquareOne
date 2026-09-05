import { defineField, defineType } from "sanity"

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
    defineField({ name: "title", type: "string", title: "Title", validation: (r) => r.required().max(110), group: "content" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web address",
      description: "The part after squareonepaving.com/blog/ — set once, then leave it (links and Google depend on it).",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
      group: "content",
    }),
    defineField({ name: "date", type: "date", title: "Date", validation: (r) => r.required(), group: "content" }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: { list: ["Municipal", "Commercial", "Residential", "Public Art", "Crosswalks", "Parks & Paths", "Streetscapes", "Transit", "School Zones", "Bike Lanes", "Roundabouts", "Case Studies", "Vapour Blasting", "Guides"] },
      group: "content",
    }),
    defineField({ name: "author", type: "string", title: "Author", initialValue: "Square One Paving", group: "content" }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Lead photograph",
      description: "Shown at the top of the post and on the blog index. Drag the focal point so the crop keeps the pavement in frame.",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "What the photo shows" }],
      group: "content",
    }),
    defineField({ name: "excerpt", type: "text", title: "One-paragraph summary", rows: 3, validation: (r) => r.max(300), description: "Shown on the blog index and in link previews.", group: "content" }),
    defineField({ name: "body", type: "blockContent", title: "Body", group: "content" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], title: "Tags", options: { layout: "tags" }, group: "seo" }),
    defineField({ name: "seoTitle", type: "string", title: "Search title (optional)", description: "Overrides the title in Google and link previews. Leave blank to use the title.", group: "seo" }),
    defineField({ name: "seoDescription", type: "text", title: "Search description (optional)", rows: 2, validation: (r) => r.max(160), group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "mainImage" },
  },
})
