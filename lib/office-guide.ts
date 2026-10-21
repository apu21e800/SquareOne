/**
 * The office's one-page guide (20 Oct 2026 brief, Phase 2): how one person at
 * Square One posts, from a phone, without reading a manual. Written in the
 * style of hubss.com's docs/DOUG-PROJECT-POSTS.md: what you do, in the order
 * you do it, and what happens next. Four things: job photos, the Tuesday and
 * Thursday drafts, a post of your own, and Buffer.
 *
 * Shown twice from this one source (components/OfficeGuide.tsx): first in
 * the Studio's list ("Start here", sanity/structure.ts) and as a page to
 * bookmark, squareonepaving.com/studio/guide (noindex, like the Studio).
 *
 * Every name in bold is the label the person taps, as the Studio and Buffer
 * print it (sanity/schemaTypes/fieldPost.ts and post.ts; Buffer's help pages,
 * checked 21 Oct 2026). Change a field's title there and change it here.
 * Times are Vancouver's, the same all year since BC kept UTC-7 from 1
 * November 2026: the daily run 14:00 UTC (7 a.m.), the article run 15:00 UTC
 * (8 a.m.), the drafter 13:00 UTC (6 a.m.) on Tuesdays and Thursdays
 * (vercel.json).
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
  /** The anchor: squareonepaving.com/studio/guide#job-photos. */
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

export const GUIDE_PATH = "/studio/guide"

export interface OfficeGuideContent {
  title: string
  lead: string
  steps: GuideStep[]
  foot: string
}

export const OFFICE_GUIDE: OfficeGuideContent = {
  title: "How to post",
  lead: "Four things, all from your phone. Sign in at squareonepaving.com/studio with your Google work account. Nothing reaches social media until you approve it in Buffer, and anything that goes on the site by itself is emailed to you first.",
  steps: [
    {
      id: "job-photos",
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
        "No story: the next morning its posts wait in Buffer for your approval (step 4).",
        "With a story: the next morning an article is written from your words and the service's page, nothing else, and you get an email. It goes live two working days later unless you hold it (step 2).",
      ],
    },
    {
      id: "drafts",
      title: "Read and publish the Tuesday and Thursday drafts",
      when: "Tuesday and Thursday mornings, when the email comes.",
      steps: [
        'The email says "Blog draft ready in Studio". Tap its link.',
        "Read **Notes for the editor** at the top: it lists anything the fact check couldn't confirm. Lines marked in yellow break the house style.",
        "Change anything by typing. It saves as you go.",
        "Happy with it? Press **Publish**. To have it go out on a later day instead, turn on **Goes live by itself** and pick the day in **Goes live at**: it goes out that morning.",
      ],
      next: [
        'An article from job photos comes with its own email: "Goes live (that day) unless you hold it". To change a line, edit it: it still goes out on time. To hold it, turn **Goes live by itself** off.',
        "The morning after a post goes live, its social posts wait in Buffer for you (step 4).",
      ],
    },
    {
      id: "own-post",
      title: "Write your own post",
      when: "Any time.",
      steps: [
        "**Blog posts**, then the **+** button.",
        "**Title**: a sentence a person would say. Then press **Generate** under **Web address**.",
        "**Section**, then the **Lead photograph** and **What the photo shows**. Drag the circle onto the pavement so the photo is framed on it.",
        "**Body**: write it. A yellow line is worth a second look.",
        "Press **Publish**, or turn on **Goes live by itself** and pick the day.",
      ],
      next: ["It shows on the site within a minute of going live, and its social posts wait in Buffer the next morning."],
    },
    {
      id: "buffer",
      title: "What you'll see in Buffer",
      when: "The morning after something new goes live.",
      steps: [
        "An email says the social drafts are waiting in Buffer. Nothing is posted until you approve it.",
        "In the Buffer app: **Publish**, then **Drafts**. Each channel (Facebook, Instagram, LinkedIn) has its own draft.",
        "To change one: tap **Edit**, change the words, save it.",
        "To approve it: the three dots, then **Add to Queue**. It goes out at that channel's next set time.",
        "Don't want it? Tap **Delete**.",
      ],
      next: ["A post already in the queue: open it from the queue or the calendar to edit it, or the three dots, then **Delete**. A deleted post can't be brought back."],
    },
  ],
  foot: "Stuck, or something looks wrong? Ask Vern at 21e8. This page is squareonepaving.com/studio/guide, and it is the first item in the Studio's list.",
}

/** A line with **bold** labels, split into runs for rendering. */
export function labelRuns(line: string): { text: string; bold: boolean }[] {
  return line
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) => (/^\*\*[^*]+\*\*$/.test(part) ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false }))
}

/** Every sentence the guide prints, labels unmarked: for the house-style check. */
export function guideText(): string[] {
  const plain = (s: string) => s.replace(/\*\*/g, "")
  return [OFFICE_GUIDE.title, OFFICE_GUIDE.lead, OFFICE_GUIDE.foot, ...OFFICE_GUIDE.steps.flatMap((s) => [s.title, s.when, ...s.steps, ...s.next, ...(s.shot ? [s.shot.alt] : [])])].map(plain)
}
