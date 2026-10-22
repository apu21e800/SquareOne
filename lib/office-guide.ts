import { ADDONS } from "./addons"

/**
 * The office's one-page guide (20 Oct 2026 brief, Phase 2): how one person at
 * Square One updates the site, from a phone or a computer, without reading a
 * manual. Written in the style of hubss.com's docs/DOUG-PROJECT-POSTS.md:
 * what you do, in the order you do it, and what happens next.
 *
 * Two guides from one source (lib/addons.ts). With the add-ons, as Square
 * One has the Studio (Vern, 22 Oct 2026): change words and photos on a page,
 * add photos to a gallery, write a blog post, then job photos from a phone,
 * the Tuesday and Thursday drafts and Buffer, and a post can go live by
 * itself. With NEXT_PUBLIC_STUDIO_ADDONS=off, the first three only. A line marked `only` is in one guide; `{step:buffer}` becomes
 * that step's number in the guide it's printed in.
 *
 * Shown twice (components/OfficeGuide.tsx): first in the Studio's list
 * ("Start here", sanity/structure.ts) and as a page to bookmark,
 * squareonepaving.com/studio/guide (noindex, like the Studio).
 *
 * Every name in bold is the label the person taps, as the Studio and Buffer
 * print it (sanity/schemaTypes, sanity/structure.ts, the Studio's own
 * buttons, checked in the live Studio 21 Oct 2026; Buffer's help pages,
 * checked the same day). Change a field's title there and change it here:
 * npm run test:studio fails until they agree. Times are Vancouver's, the same
 * all year since BC kept UTC-7 from 1 November 2026: the daily run 14:00 UTC
 * (7 a.m.), the article run 15:00 UTC (8 a.m.), the drafter 13:00 UTC (6 a.m.)
 * on Tuesdays and Thursdays (vercel.json).
 *
 * Pure data: safe in the Studio and on the site. `**bold**` marks a label.
 */

export interface GuideShot {
  /** A file under public/images/guide/, one per step. */
  src: string
  /** What the screenshot shows, read aloud. */
  alt: string
  width: number
  height: number
}

export interface GuideStep {
  /** The anchor: squareonepaving.com/studio/guide#gallery-photos. */
  id: string
  title: string
  /** When this comes up, in a line. */
  when: string
  /** What you do, in order. */
  steps: string[]
  /** What happens after. */
  next: string[]
  /** One screenshot per step, from the live Studio and Square One's Buffer. */
  shot?: GuideShot
}

export interface OfficeGuideContent {
  title: string
  lead: string
  steps: GuideStep[]
  foot: string
}

/** A line in both guides, or in one: "free" without the add-ons, "addons" with them. */
export type GuideLine = string | { text: string; only: "free" | "addons" }

export interface GuideStepSource extends Omit<GuideStep, "steps" | "next"> {
  /** An add-on's step: in the guide only with the add-ons on. */
  only?: "addons"
  steps: GuideLine[]
  next: GuideLine[]
}

export const GUIDE_PATH = "/studio/guide"
export const GUIDE_TITLE = "How to update the site"

const SIGN_IN = "From a phone or a computer. Sign in at squareonepaving.com/studio with your Google work account."
const FRAMED = "Press the crop button on the photo (**Crop image**), then drag the circle onto the pavement so the photo is framed on it."

export const GUIDE_SOURCE: { title: string; lead: { free: string; addons: string }; steps: GuideStepSource[]; foot: string } = {
  title: GUIDE_TITLE,
  lead: {
    free: `${SIGN_IN} Nothing changes on the site until you press Publish.`,
    addons: `${SIGN_IN} Nothing changes on the site until you press Publish (or pick a day for it), and nothing reaches social media until you approve it in Buffer.`,
  },
  steps: [
    {
      id: "edit-page",
      title: "Change words and photos on a page",
      when: "Any time something on the site needs updating.",
      steps: [
        "Open squareonepaving.com/studio, then **Edit on the page** (at the top, or in the menu on a phone). The site opens with **Edit** switched on.",
        "Point at the words you want to change: an outline appears. Click them, and their field opens beside the page. On a phone, tap them, then **Structure** at the top.",
        "Type the new words. For a photo: the three dots on the photo, then **Upload**, and pick the new one.",
        "Press **Publish**.",
      ],
      next: [
        "It's on the site within a minute.",
        "Changed your mind before publishing? The three dots beside **Publish**, then **Discard changes**.",
        "The big photo and headline at the top of a page are also in **Website Pages**: **Home page** for the home page, **Page openers** for the others (the **+** button there adds one for a page that isn't listed).",
      ],
      shot: {
        src: "/images/guide/edit-page.png",
        alt: "Edit on the page: the home page with Edit switched on, and an outline around the headline under the pointer.",
        width: 553,
        height: 695,
      },
    },
    {
      id: "gallery-photos",
      title: "Add photos to a gallery",
      when: "When there are good photos of a finished job.",
      steps: [
        "Open squareonepaving.com/studio, then **Website Pages**, then **Gallery photos**, then the **+** button.",
        `**Photograph**: press **Upload** and pick the photo. ${FRAMED}`,
        "**Gallery**: which gallery it goes in. **Region**: where the job is.",
        '**What it shows**: a few words, as the captions read, like "Decorative crosswalk".',
        "**Where**, only if the client is happy for the place to be named. **Systems installed**, if you know them.",
        "Press **Publish**.",
      ],
      next: [
        "It's in the gallery within a minute, near the top: newer photos show first.",
        "To show it first, turn on **Lead the gallery** and press **Publish**. To take it down later, turn on **Take off the site** and press **Publish**: nothing is deleted.",
      ],
      shot: {
        src: "/images/guide/gallery-photo.png",
        alt: "The Studio's new Gallery photo form: Photograph with Upload, then Gallery, and Publish at the bottom.",
        width: 553,
        height: 695,
      },
    },
    {
      id: "own-post",
      title: "Write a blog post",
      when: "Any time.",
      steps: [
        "**Blog posts**, then the **+** button.",
        "**Title**: a sentence a person would say. Then press **Generate** under **Web address**.",
        `**Section**, then the **Lead photograph** and **What the photo shows**. ${FRAMED}`,
        "**Body**: write it. A yellow line is worth a second look.",
        { text: "Press **Publish**.", only: "free" },
        { text: "Press **Publish**. Or turn on **Goes live by itself** and set **Goes live at** to the day you want, at 7:00 a.m. or earlier.", only: "addons" },
      ],
      next: [
        { text: "It's on the blog within a minute.", only: "free" },
        { text: "It shows on the site within a minute of going live, and its social posts wait in Buffer the next morning.", only: "addons" },
      ],
      shot: {
        src: "/images/guide/own-post.png",
        alt: "The Studio's new Blog post form: Title, then Web address, and Publish at the bottom.",
        width: 553,
        height: 695,
      },
    },
    {
      id: "job-photos",
      only: "addons",
      title: "Add job photos from your phone",
      when: "When a job is finished. About five minutes.",
      steps: [
        "Open squareonepaving.com/studio, then **Job photos**, then the **+** button.",
        "**Photos**: add 3 to 10, the best one first. Under each, **What the photo shows**: one plain line, as you'd describe it to someone who can't see it.",
        '**Where**: the town, like "Langley, BC". Name the site only if the client is happy to be named.',
        "**Service**. Then **Systems** and **Kind of work**, if you know them.",
        "**What was done**: one or two sentences of facts. No prices and no phone numbers.",
        "Want a blog article too? Fill in **The story**: a few sentences in your own words about what was needed, what went in and how it turned out. No guesses, and no customer's phone number or home address. Leave it empty for social posts only.",
        "Press **Publish**.",
      ],
      next: [
        "No story: the next morning its posts wait in Buffer for your approval ({step:buffer}).",
        "With a story: the next morning an article is written from your words and the service's page, nothing else, and you get an email. It waits in the Studio until you read it and press Publish ({step:drafts}).",
        "Added several jobs at once? They go one a day, oldest first.",
      ],
      shot: {
        src: "/images/guide/job-photos.png",
        alt: "The Studio's new Job photos form: Photos with Add item, then Where, and Publish at the bottom.",
        width: 553,
        height: 695,
      },
    },
    {
      id: "drafts",
      only: "addons",
      title: "Read and publish the Tuesday and Thursday drafts",
      when: "Tuesday and Thursday mornings, when the email comes.",
      steps: [
        'The email says "Blog draft ready in Studio". Tap its link.',
        "Read **Notes for the editor** at the top: it lists anything the fact check couldn't confirm. Lines marked in yellow break the house style.",
        "Change anything by typing. It saves as you go.",
        "Happy with it? Press **Publish**. To have it go out on a later day instead, turn on **Goes live by itself**, then set **Goes live at** to that day at 7:00 a.m. or earlier: it goes out that morning.",
      ],
      next: [
        'An article from job photos comes with its own email, "Ready to read" (or "Needs a read before it goes" when a check found something to fix). Read it and press **Publish** the same way.',
        "The morning after a post goes live, its social posts wait in Buffer for you ({step:buffer}).",
      ],
    },
    {
      id: "buffer",
      only: "addons",
      title: "What you'll see in Buffer",
      when: "The morning after something new goes live.",
      steps: [
        "An email says the social drafts are waiting in Buffer. Nothing is posted until you approve it.",
        "In the Buffer app: **Publish**, then **Drafts**. Each channel you've connected (Facebook, Instagram and so on) has its own draft.",
        "To change one: tap **Edit**, change the words, save it.",
        "To approve it: the three dots, then **Add to Queue**. It goes out at that channel's next set time.",
        "Don't want it? Tap **Delete**.",
      ],
      next: ["A post already in the queue: open it from the queue or the calendar to edit it, or the three dots, then **Delete**. A deleted post can't be brought back."],
    },
  ],
  foot: "Stuck, or something looks wrong? Ask Vern at 21e8. This page is squareonepaving.com/studio/guide, and it is the first item in the Studio's list.",
}

/** The guide as printed, with the add-ons off or on. */
export function guideFor(addons: boolean): OfficeGuideContent {
  const keep = (l: GuideLine) => typeof l === "string" || l.only === (addons ? "addons" : "free")
  const steps = GUIDE_SOURCE.steps.filter((s) => !s.only || addons)
  const number = new Map(steps.map((s, i) => [s.id, i + 1]))
  const fill = (line: string) =>
    line.replace(/\{step:([a-z-]+)\}/g, (_all, id: string) => {
      const n = number.get(id)
      if (!n) throw new Error(`The guide points to "${id}", which isn't in this guide`)
      return `step ${n}`
    })
  const lines = (list: GuideLine[]) => list.filter(keep).map((l) => fill(typeof l === "string" ? l : l.text))
  return {
    title: GUIDE_SOURCE.title,
    lead: addons ? GUIDE_SOURCE.lead.addons : GUIDE_SOURCE.lead.free,
    steps: steps.map((s) => ({ id: s.id, title: s.title, when: s.when, steps: lines(s.steps), next: lines(s.next), ...(s.shot ? { shot: s.shot } : {}) })),
    foot: GUIDE_SOURCE.foot,
  }
}

/** This build's guide (lib/addons.ts). */
export const OFFICE_GUIDE: OfficeGuideContent = guideFor(ADDONS)

/** A line with **bold** labels, split into runs for rendering. */
export function labelRuns(line: string): { text: string; bold: boolean }[] {
  return line
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) => (/^\*\*[^*]+\*\*$/.test(part) ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false }))
}

/** Every sentence a guide prints, labels unmarked: for the house-style check. */
export function guideText(guide: OfficeGuideContent = OFFICE_GUIDE): string[] {
  const plain = (s: string) => s.replace(/\*\*/g, "")
  return [guide.title, guide.lead, guide.foot, ...guide.steps.flatMap((s) => [s.title, s.when, ...s.steps, ...s.next, ...(s.shot ? [s.shot.alt] : [])])].map(plain)
}
