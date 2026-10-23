import { defineArrayMember, defineField, defineType } from "sanity"

/** Blog body — headings, lists, quotes, links and photographs with captions. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Pull quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Photograph",
      description: "Press the crop button on the photo (Crop image) and drag the circle onto the pavement: the 3:2 frame crops around it.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "What the photo shows",
          description: "Read aloud to screen readers and shown if the image fails. Say what and where, e.g. “StreetBond spray park pad, Wesburn Park, Burnaby”.",
          validation: (r) => r.required().error("Say what the photograph shows: it is read aloud to people who can't see it."),
        }),
        defineField({ name: "caption", type: "string", title: "Caption (optional)", description: "Shown under the photograph." }),
      ],
    }),
  ],
})
