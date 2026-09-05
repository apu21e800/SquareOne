import { defineField, defineType } from "sanity"

/**
 * Slots — the way to change a headline or swap a photograph anywhere on the
 * site without touching code. Every editable spot has a key (shown in the
 * Studio list, e.g. "home.hero.title"); when a slot document exists for that
 * key, the site shows its value instead of the built-in one. Delete the
 * document and the built-in value comes back.
 */
export const copySlot = defineType({
  name: "copySlot",
  title: "Text slot",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string", title: "Where it appears (key)", readOnly: ({ document }) => Boolean(document?.value), validation: (r) => r.required() }),
    defineField({ name: "value", type: "text", title: "Text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "note", type: "string", title: "Note to self (optional)" }),
  ],
  preview: { select: { title: "key", subtitle: "value" } },
})

export const imageSlot = defineType({
  name: "imageSlot",
  title: "Photo slot",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string", title: "Where it appears (key)", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", title: "Photograph", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", type: "string", title: "What the photo shows", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string", title: "Caption (place · system · year)" }),
  ],
  preview: { select: { title: "key", subtitle: "caption", media: "image" } },
})
