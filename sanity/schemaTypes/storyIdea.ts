import { defineArrayMember, defineField, defineType, type ConditionalPropertyCallback } from "sanity"
import { ICONS } from "../icons"
import { copyCheck } from "./style"
import { APPLICATION_OPTIONS, PLAN_KINDS, PLAN_STATUSES, ROUNDUP_MAX, ROUNDUP_MIN, SERVICE_OPTIONS, SYSTEM_OPTIONS, type PlanKind } from "../../lib/automation/plan"

/**
 * Blog ideas (14 Oct 2026, as hubss.com's Insights plan; "the Blog plan"
 * until 20 Oct): the list of articles Square One wants written, in the order
 * they get written.
 *
 * Every Tuesday and Thursday morning the drafter (lib/automation/blog.ts)
 * takes the top item marked Ready (else the top Idea), writes a first draft
 * from Square One's own pages and documented jobs, and saves it in Blog as an
 * UNPUBLISHED draft with notes for the editor. Nothing reaches the site until
 * someone reads it and presses Publish. When fewer than six items are left,
 * the run adds new Ideas at the bottom (lib/automation/planner.ts).
 *
 * Live edit: a plan item has no Publish step, so a change (say, to Ready)
 * counts the moment it is made.
 */

const kindOf = (document: unknown): PlanKind | undefined => (document as { type?: PlanKind } | undefined)?.type

/** Shown only for guides: what the guide is written from. */
const notAGuide: ConditionalPropertyCallback = ({ document }) => kindOf(document) !== "guide"

const optionList = (list: readonly { value: string; title: string }[]) => list.map((o) => ({ value: o.value, title: o.title }))

export const storyIdea = defineType({
  name: "storyIdea",
  title: "Blog idea",
  type: "document",
  icon: ICONS.storyIdea,
  liveEdit: true,
  fields: [
    defineField({
      name: "title",
      title: "Working title",
      type: "string",
      description: "The idea in a line, e.g. “Stamped asphalt over an old driveway: what has to be true first”. The drafter writes the final headline.",
      validation: (r) => [r.required().error("Give the idea a working title"), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "idea",
      options: { list: optionList(PLAN_STATUSES), layout: "radio" },
      description:
        "Set it to Ready and the drafter writes it next (Tuesday and Thursday mornings); with nothing Ready it takes the top Idea. It sets Drafted itself. New Ideas are added at the bottom by themselves when the plan gets low; set one to Not doing to skip it.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      initialValue: 2,
      options: {
        list: [
          { title: "1: next", value: 1 },
          { title: "2: soon", value: 2 },
          { title: "3: some time", value: 3 },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "type",
      title: "Kind of article",
      type: "string",
      initialValue: "project",
      options: { list: optionList(PLAN_KINDS), layout: "radio" },
      description:
        "A project story tells one job and a roundup three to six, each from its record in Projects; they file under the job's kind of work and the blog's Project stories. A guide answers what customers ask, from Square One's own service, system and application pages, and files under Guides.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "searchPhrase",
      title: "Search phrase to win",
      type: "string",
      description: "What a customer would type into Google, e.g. “stamped asphalt driveway cost”. It goes in the headline, the opening and one heading. Optional.",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      // Weak: a project in the plan can still be deleted from Projects (the
      // drafter then passes the item over and says so).
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }], weak: true })],
      description:
        "The documented jobs the article tells, from Projects: one for a project story, three to six for a roundup. The drafter writes only what their records say, and the first one's lead photograph opens the draft.",
      hidden: ({ document }) => kindOf(document) === "guide",
      validation: (r) =>
        r.custom((refs, context) => {
          const n = Array.isArray(refs) ? refs.length : 0
          const kind = kindOf(context.document)
          if (kind === "project" && n !== 1) return "A project story tells one job: pick it from Projects."
          if (kind === "roundup" && (n < ROUNDUP_MIN || n > ROUNDUP_MAX)) return `A roundup tells ${ROUNDUP_MIN} to ${ROUNDUP_MAX} jobs: pick them from Projects.`
          return true
        }),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: optionList(SERVICE_OPTIONS), layout: "grid" },
      description: "The service pages the guide is written from. The first one's photograph opens the draft as a stand-in.",
      hidden: notAGuide,
    }),
    defineField({
      name: "systems",
      title: "Systems",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: optionList(SYSTEM_OPTIONS), layout: "grid" },
      description: "The system pages the guide is written from.",
      hidden: notAGuide,
    }),
    defineField({
      name: "applications",
      title: "Kinds of work",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: optionList(APPLICATION_OPTIONS), layout: "grid" },
      description: "The application pages the guide is written from (Driveways reads the driveways page and its questions).",
      hidden: notAGuide,
      validation: (r) =>
        r.custom((apps, context) => {
          if (kindOf(context.document) !== "guide") return true
          const d = context.document as { services?: unknown[]; systems?: unknown[] } | undefined
          const n = (Array.isArray(apps) ? apps.length : 0) + (d?.services?.length ?? 0) + (d?.systems?.length ?? 0)
          return n ? true : "Tick at least one service, system or kind of work: the guide is written from their pages."
        }),
    }),
    defineField({
      name: "brief",
      title: "Brief",
      type: "text",
      rows: 6,
      description:
        "What the article must cover, and any real facts to use that aren't in the job's record. The drafter treats what you write here as true and invents nothing else. A brief the planner wrote starts “Questions to answer (not facts)”: those are questions, and the drafter answers them only from the pages. The plan isn't private: keep personal details and prices out of it.",
      // The drafter copies the brief's wording, dashes and all.
      validation: (r) => r.custom(copyCheck).warning(),
    }),
    defineField({
      name: "draftSlug",
      title: "Draft",
      type: "string",
      readOnly: true,
      description: "Set by the drafter: the web address of the draft it wrote, in Blog.",
    }),
    defineField({
      name: "draftedAt",
      title: "Drafted",
      type: "datetime",
      readOnly: true,
    }),
  ],

  orderings: [
    {
      title: "Next to draft",
      name: "queue",
      by: [
        { field: "priority", direction: "asc" },
        { field: "_createdAt", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: { title: "title", status: "status", kind: "type", phrase: "searchPhrase", priority: "priority" },
    prepare: ({ title, status, kind, phrase, priority }) => ({
      title,
      subtitle: [
        { idea: "Idea", ready: `Ready (priority ${priority ?? 2})`, drafted: "Drafted", published: "Published", dropped: "Not doing" }[status as string] ?? status,
        { project: "Project story", roundup: "Project roundup", guide: "Guide" }[kind as string],
        phrase,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
})
