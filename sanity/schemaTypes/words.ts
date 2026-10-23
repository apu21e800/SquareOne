import { defineArrayMember, defineField, defineType } from "sanity"
import { ICONS } from "../icons"
import { copyCheck, headingCheck } from "./style"

/**
 * The words below each page's opener (14 Oct 2026): the home page's
 * sections, and the About, Contact and Driveways pages. The site reads them
 * through lib/page-copy.ts; a field left empty shows the site's own words,
 * and `npm run sync:pages` fills the empty fields with the words the site
 * shows today, so every field starts as what is live.
 *
 * Every section is the same few fields: the small label in the margin, the
 * heading, its lighter ending, and (where the section has one) the line
 * under it. The photographs and links stay with the page's code.
 */

const EMPTY = "Left empty, the site's own words."

/** A section's words. `line` only where the section prints one. */
export const sectionFields = (line: boolean) => [
  defineField({ name: "label", type: "string", title: "Label", description: `The small label in the margin. ${EMPTY}`, validation: (r) => r.custom(copyCheck).warning() }),
  defineField({ name: "head", type: "string", title: "Heading", description: `In the bold face. ${EMPTY}`, validation: (r) => r.custom(headingCheck).warning() }),
  defineField({
    name: "tail",
    type: "string",
    title: "Heading, lighter ending",
    description: "The words after the heading, in the lighter face. With a new heading, write its ending here too, or leave it empty for none.",
    validation: (r) => r.custom(headingCheck).warning(),
  }),
  ...(line ? [defineField({ name: "line", type: "text", rows: 3, title: "Line under the heading", description: EMPTY, validation: (r) => r.custom(copyCheck).warning() })] : []),
]

/** One section, as a field of a page document. */
export const section = (name: string, title: string, line = false, description?: string) =>
  defineField({
    name,
    type: "object",
    title,
    ...(description ? { description } : {}),
    options: { collapsible: true, collapsed: true },
    fields: sectionFields(line),
  })

/** A card's or a step's name and line. */
const cardFields = [
  defineField({ name: "title", type: "string", title: "Name", description: EMPTY, validation: (r) => r.custom(headingCheck).warning() }),
  defineField({ name: "text", type: "text", rows: 2, title: "Line", description: EMPTY, validation: (r) => r.custom(copyCheck).warning() }),
]

/** A fixed set of cards (each with its photograph and link in the code). */
export const cards = (name: string, title: string, items: { name: string; title: string }[], description?: string) =>
  defineField({
    name,
    type: "object",
    title,
    ...(description ? { description } : {}),
    options: { collapsible: true, collapsed: true },
    fields: items.map((i) => defineField({ name: i.name, type: "object", title: i.title, fields: cardFields })),
  })

/** Questions and answers: they also go to Google as the page's FAQ. */
export const faqs = (name: string, title: string) =>
  defineField({
    name,
    type: "array",
    title,
    description: "Drag to reorder. Each answer may only say what the page already says. Left empty, the site's own questions.",
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
  })

/** A list of short lines. */
export const lines = (name: string, title: string, description: string) =>
  defineField({ name, type: "array", title, description, of: [{ type: "string", validation: (r) => r.custom(copyCheck).warning() }] })

const SERVICE_CARDS = [
  { name: "stampedAsphalt", title: "Stamped asphalt" },
  { name: "decorativeCoatings", title: "Decorative coatings" },
  { name: "preformedThermoplastic", title: "Preformed thermoplastic" },
  { name: "vapourBlasting", title: "Vapour blasting" },
]

/** The home page's sections, below the hero: added to the Home page document (pages.ts). */
export const homeSectionFields = [
  section("services", "What we do (the four services)"),
  cards("serviceCards", "What we do: each service's name and line", SERVICE_CARDS, "The photographs and links stay as they are."),
  section("projects", "Selected work"),
  section("process", "How a job goes"),
  section("audiences", "Who we work with"),
  cards("audienceCards", "Who we work with: the three cards", [
    { name: "municipal", title: "Municipalities" },
    { name: "commercial", title: "Commercial and strata" },
    { name: "homeowners", title: "Homeowners" },
  ]),
  section("driveways", "Driveways", true),
  section("drivewaysOffer", "Driveways: the free site visit offer", true),
  section("materials", "Patterns and colours", true),
  section("vapour", "Vapour blasting", true),
  section("social", "From the crews (the social section)"),
]

const pagePreview = (title: string) => ({ prepare: () => ({ title }) })

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: ICONS.aboutPage,
  description: "The words below the About page's opener. Its photograph and headline are in Page openers.",
  fields: [
    section("story", "Our story"),
    lines("storyText", "Our story: the paragraphs", "One box per paragraph, in order. Left empty, the site's own."),
    defineField({
      name: "mission",
      type: "object",
      title: "Our mission",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string", title: "Label", description: EMPTY }),
        defineField({ name: "text", type: "text", rows: 2, title: "The mission, as quoted", description: "Without quotation marks: the page adds them. Left empty, the site's own.", validation: (r) => r.custom(copyCheck).warning() }),
      ],
    }),
    section("trades", "What we install"),
    cards("tradeCards", "What we install: each service's name and line", SERVICE_CARDS),
    section("principles", "How we work"),
    cards("principleCards", "How we work: the three points", [
      { name: "weather", title: "First point" },
      { name: "care", title: "Second point" },
      { name: "site", title: "Third point" },
    ]),
    section("work", "The work (the statement)", true),
    section("regions", "Where we work", true),
  ],
  preview: pagePreview("About page"),
})

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: ICONS.contactPage,
  description: "The words of the quote page. The phone lines and the email are in Site Settings; the form itself stays as it is.",
  fields: [
    section("intro", "The top of the page (the headline)", true),
    defineField({ name: "nextLabel", type: "string", title: "Steps: label", description: EMPTY }),
    cards("steps", "Steps: what happens next", [
      { name: "first", title: "First" },
      { name: "second", title: "Second" },
      { name: "third", title: "Third" },
    ]),
    defineField({ name: "sendLabel", type: "string", title: "What to send: label", description: EMPTY }),
    lines("send", "What to send: the list", "One line each, in order. Left empty, the site's own."),
    section("regions", "Where we work", true),
  ],
  preview: pagePreview("Contact page"),
})

export const drivewaysPage = defineType({
  name: "drivewaysPage",
  title: "Driveways page",
  type: "document",
  icon: ICONS.drivewaysPage,
  description: "The words below the Driveways page's opener. Its photograph and headline are in Page openers; its photographs are in Gallery photos.",
  fields: [
    section("patterns", "Patterns", true),
    section("process", "How it works"),
    cards("steps", "How it works: the four steps", [
      { name: "visit", title: "First" },
      { name: "quote", title: "Second" },
      { name: "install", title: "Third" },
      { name: "winters", title: "Fourth" },
    ]),
    section("gallery", "Photographed on site", true),
    section("area", "Service area", true),
    section("questions", "Questions (the heading)"),
    faqs("faqs", "Questions and answers"),
  ],
  preview: pagePreview("Driveways page"),
})
