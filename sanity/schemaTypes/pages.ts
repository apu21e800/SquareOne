import { defineArrayMember, defineField, defineType, type ValidationContext } from "sanity"
import { OPENERS, RECORD_OPENER_PAGES } from "../../lib/openers"

/**
 * The home page's hero, every page's opener, and the photo galleries
 * (9 Oct 2026): what the client was told, "you will be able to easily edit
 * all of the text, images and blog articles", for the parts a visitor sees
 * first. The site reads these through lib/page-content.ts and
 * lib/work-cms.ts; a field left empty keeps what the site shows today.
 */

const API = "2025-06-01"

/** The galleries, in the order the site lists them (lib/work.ts WORK_APPS). */
export const GALLERIES = [
  { title: "Crosswalks", value: "crosswalks" },
  { title: "Streetscapes", value: "streetscapes" },
  { title: "Roundabouts and traffic calming", value: "roundabouts" },
  { title: "Parking lots", value: "parking-lots" },
  { title: "Parks and paths", value: "parks-paths" },
  { title: "Schools and sports courts", value: "schools-sports-courts" },
  { title: "Bike lanes", value: "bike-lanes" },
  { title: "Public art", value: "public-art" },
  { title: "Branding and wayfinding", value: "branding-wayfinding" },
  { title: "Driveways", value: "driveways" },
]

const SYSTEMS = ["StreetPrint", "StreetBond", "StreetBondSR", "StreetBond150", "TrafficPatterns", "TrafficPatternsXD", "DuraTherm", "DecoMark", "PreMark", "DuraShield"]
const REGIONS = ["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"]

/** A photograph's words are required once there is a photograph. */
function neededWithPhoto(value: unknown, context: ValidationContext, photoField: string, message: string) {
  const parent = (context.parent ?? context.document) as Record<string, { asset?: unknown } | undefined> | undefined
  return parent?.[photoField]?.asset && !(typeof value === "string" && value.trim()) ? message : true
}

const headlineFields = [
  defineField({ name: "headline", type: "string", title: "Headline", description: "Set in the bold face. Left empty with the ending, the page keeps its own headline." }),
  defineField({ name: "headlineEnd", type: "string", title: "Headline, lighter ending", description: "The words after the headline, in the lighter face (“across BC”)." }),
]

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    ...headlineFields,
    defineField({ name: "line", type: "text", rows: 3, title: "Line under the headline", description: "Left empty, the site's own line." }),
    defineField({
      name: "reel",
      type: "array",
      title: "Hero photographs",
      description: "The reel under the headline, in this order. Drag to reorder. Photographs of Square One's own work, at least 1600px wide; drag each one's focal point onto the pavement. Left empty, the site's own reel shows.",
      of: [
        defineArrayMember({
          type: "object",
          name: "slide",
          fields: [
            defineField({ name: "image", type: "image", title: "Photograph", options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: "alt", type: "string", title: "What the photo shows", validation: (r) => r.required() }),
            defineField({ name: "caption", type: "string", title: "Caption (place · system · year)" }),
          ],
          preview: { select: { title: "caption", subtitle: "alt", media: "image" } },
        }),
      ],
      validation: (r) =>
        r.custom((value) =>
          Array.isArray(value) && value.length > 0 && value.length < 3 ? "Add at least three photographs, or leave it empty for the site's own reel." : true,
        ),
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
})

export const pageHero = defineType({
  name: "pageHero",
  title: "Page opener",
  type: "document",
  fields: [
    defineField({
      name: "page",
      type: "string",
      title: "Page",
      options: { list: [...OPENERS.map((o) => ({ title: o.label, value: o.page })), ...RECORD_OPENER_PAGES.map((o) => ({ title: o.label, value: o.page }))] },
      validation: (r) =>
        r.required().custom(async (value, context) => {
          if (!value) return true
          const id = (context.document?._id ?? "").replace(/^drafts\./, "")
          const others = await context
            .getClient({ apiVersion: API })
            .fetch<number>(`count(*[_type == "pageHero" && page == $page && !(_id in [$id, $draft])])`, { page: value, id, draft: `drafts.${id}` })
          return others === 0 ? true : "That page already has an opener. Edit that one instead."
        }),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photograph",
      description: "Square One's own work, at least 1600px wide. Drag the focal point onto the pavement. Left empty, the page keeps its photograph.",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "What the photo shows",
      validation: (r) => r.custom((v, ctx) => neededWithPhoto(v, ctx, "image", "Say what the photograph shows.")),
    }),
    defineField({ name: "caption", type: "string", title: "Caption (place · system · year)", description: "Shown on the photograph's ledger. A new photograph shows only its own caption." }),
    ...headlineFields,
    defineField({ name: "line", type: "text", rows: 3, title: "Line under the headline", description: "Left empty, the page keeps its own line." }),
  ],
  preview: {
    select: { page: "page", media: "image", headline: "headline" },
    prepare: ({ page, media, headline }: { page?: string; media?: unknown; headline?: string }) => ({
      title: [...OPENERS, ...RECORD_OPENER_PAGES].find((o) => o.page === page)?.label ?? page ?? "Page opener",
      subtitle: headline,
      media: media as never,
    }),
  },
})

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Gallery photo",
  type: "document",
  fields: [
    defineField({ name: "image", type: "image", title: "Photograph", description: "Square One's own work. At least 1600px wide shows large; smaller stays a gallery tile.", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "gallery", type: "string", title: "Gallery", options: { list: GALLERIES }, validation: (r) => r.required() }),
    defineField({ name: "subject", type: "string", title: "What it shows", description: "Short, as the captions read: “Decorative crosswalk”, “School playground labyrinth”.", validation: (r) => r.required().max(80) }),
    defineField({ name: "place", type: "string", title: "Where", description: "“Bastion Square, Victoria”. Leave empty unless Square One says so publicly; never a guess." }),
    defineField({ name: "region", type: "string", title: "Region", options: { list: REGIONS }, description: "Driveway photographs show on the Vancouver or Victoria page by this.", validation: (r) => r.required() }),
    defineField({ name: "systems", type: "array", of: [{ type: "string" }], title: "Systems installed", options: { list: SYSTEMS } }),
    defineField({ name: "lead", type: "boolean", title: "Lead the gallery", description: "Shows first in its gallery (and on the home page's tile for it). Otherwise it shows near the top, newest first.", initialValue: false }),
    defineField({ name: "hidden", type: "boolean", title: "Take off the site", initialValue: false }),
    defineField({ name: "date", type: "date", title: "Added", initialValue: () => new Date().toISOString().slice(0, 10), description: "Newer photographs show first." }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "subject", place: "place", gallery: "gallery", media: "image", hidden: "hidden" },
    prepare: ({ title, place, gallery, media, hidden }: { title?: string; place?: string; gallery?: string; media?: unknown; hidden?: boolean }) => ({
      title: `${hidden ? "(Off the site) " : ""}${title ?? "Photo"}`,
      subtitle: [GALLERIES.find((g) => g.value === gallery)?.title, place].filter(Boolean).join(" · "),
      media: media as never,
    }),
  },
})

export const gallerySettings = defineType({
  name: "gallerySettings",
  title: "Galleries",
  type: "document",
  fields: [
    defineField({
      name: "removed",
      type: "array",
      title: "Photos that came with the site, taken off",
      description: "To take one off: on the site, right-click the photograph, choose “Copy image address”, and paste it here as a new line. Delete the line to bring it back. (Photos added in the Studio have their own “Take off the site”.)",
      of: [{ type: "string" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Galleries" }) },
})
