import { defineArrayMember, defineField, defineType } from "sanity"
import { copyCheck, paragraphsCheck } from "./style"

const SYSTEMS = ["StreetPrint", "StreetBond", "StreetBondSR", "StreetBond150", "TrafficPatterns", "TrafficPatternsXD", "DuraTherm", "DecoMark", "PreMark", "DuraShield"]
const APPLICATIONS = ["Crosswalks", "Streetscapes", "Roundabouts & traffic calming", "Parking lots", "Parks & paths", "Schools & sports courts", "Bike lanes", "Public art", "Branding & wayfinding", "Driveways"]
const REGIONS = ["Lower Mainland", "Vancouver Island", "Interior", "Sunshine Coast", "Sea to Sky"]
const SERVICES = ["Stamped Asphalt", "Decorative Coatings", "Preformed Thermoplastic", "Vapour Blasting"]

/**
 * A project: one installation Square One has done, with its own photographs.
 *
 * Since 9 Oct 2026 the site reads these (lib/projects-cms.ts): /projects, each
 * project's page, the home page's six, and the application and service pages.
 * lib/projects.ts stays the fallback, and still supplies a page's paragraphs
 * and blog link until "The project, told" and "Blog post" are filled in here.
 * Since 14 Oct 2026 each photograph's alt text is required and is the one the
 * page reads out, and its focal point frames it everywhere it shows.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "What and where, as the page's headline reads: “Rainbow intersection, Nanaimo”.",
      validation: (r) => [r.required().max(90), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web address",
      description: "The part after squareonepaving.com/projects/. Press Generate once, then leave it: links and Google depend on it.",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "application", type: "string", title: "Application", description: "Which gallery and application page the project belongs with.", options: { list: APPLICATIONS }, validation: (r) => r.required() }),
    defineField({ name: "service", type: "string", title: "Service line", description: "Which service page lists it.", options: { list: SERVICES }, validation: (r) => r.required() }),
    defineField({ name: "systems", type: "array", of: [{ type: "string" }], title: "Systems installed", description: "Tick every system on this job. They print under the photograph.", options: { list: SYSTEMS }, validation: (r) => r.required().min(1) }),
    defineField({ name: "city", type: "string", title: "City", description: "e.g. “Nanaimo, BC”", validation: (r) => r.required() }),
    defineField({ name: "region", type: "string", title: "Region", options: { list: REGIONS }, validation: (r) => r.required() }),
    defineField({ name: "year", type: "string", title: "Year (only if published)", description: "Leave blank unless Square One has stated when it was installed." }),
    defineField({ name: "client", type: "string", title: "Client (only if published)", description: "Leave blank unless the client has agreed to be named. The site says “installed at”, never “for”." }),
    defineField({ name: "artist", type: "string", title: "Artist / designer (only if published)" }),
    defineField({ name: "excerpt", type: "text", title: "Summary", rows: 5, validation: (r) => [r.required().max(700), r.custom(copyCheck).warning()], description: "Two to four sentences: what was installed, where, and why it matters. It leads the project's page and shows under its photograph on /projects." }),
    defineField({
      name: "story",
      type: "array",
      title: "The project, told",
      of: [{ type: "text", rows: 5 }],
      description: "Optional paragraphs under the summary, one box each. Left empty, the page keeps the paragraphs it has today; anything here replaces them.",
      validation: (r) => r.custom(paragraphsCheck).warning(),
    }),
    defineField({ name: "post", type: "reference", to: [{ type: "post" }], title: "Blog post", description: "Optional: the post that tells this project in full. Left empty, the page keeps the link it has today." }),
    defineField({
      name: "images",
      type: "array",
      title: "Photographs",
      description:
        "The first photograph is the hero; drag to reorder. Add item, then Upload a photograph or Select one already in the Studio's media library. Each one needs a line saying what it shows, and a focal point: press the crosshair on the photograph and drag it onto the pavement, and every frame of it on the site crops around that point. Only Square One's own photographs of this installation.",
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
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "featured", type: "boolean", title: "Featured", description: "Marks one of the strongest projects. The home page's six are chosen by the web team; ask them to change which show there.", initialValue: false }),
    defineField({ name: "heroWide", type: "boolean", title: "Hero can run full width", description: "Only for a photograph at least 1600px wide.", initialValue: false }),
    defineField({ name: "hidden", type: "boolean", title: "Take off the site", description: "Hides this project everywhere on the site without deleting it. Untick to bring it back.", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "city", media: "images.0" } },
})
