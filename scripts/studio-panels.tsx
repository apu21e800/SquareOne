/**
 * The Studio's panels, every state, light and dark, without a signed-in
 * Studio (12 Nov 2026): `npm run studio:panels` writes one page per scheme to
 * .studio-panels/ (not committed) from the same views the Studio draws
 * (JobPhotosCardView, EditOnThePageCardView) and the same words
 * (sanity/job-photos-line.ts). Open them in a browser, or take a picture:
 *   google-chrome --headless=new --hide-scrollbars --window-size=760,3200 \
 *     --screenshot=.studio-panels/light.png .studio-panels/light.html
 * A preview's Studio isn't registered with Square One's Sanity project, so
 * this is the way to see a panel before it is live.
 */
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { createElement as h, type ReactElement } from "react"
import { renderToString } from "react-dom/server"
import { ServerStyleSheet } from "styled-components"
import { Box, Card, Heading, Stack, Text, ThemeProvider, studioTheme } from "@sanity/ui"
import { JobPhotosCardView } from "../sanity/components/JobPhotosInput"
import { EditOnThePageCardView, editOnThePageWords } from "../sanity/components/EditOnThePage"
import { jobPhotosLine, jobPhotosListLine, type JobState } from "../sanity/job-photos-line"
import { postListLine } from "../sanity/post-line"
import { GUIDE_PATH } from "../lib/office-guide"

const OUT = path.join(process.cwd(), ".studio-panels")
const OPEN = { href: "#open-the-article" }
const SITE = "#see-it-on-the-site"
const TITLE = "Rainbow crosswalk, Langley"

const job = (over: Partial<JobState>): JobState => ({ published: false, story: false, hasArticle: false, article: null, ...over })
const written = (article: NonNullable<JobState["article"]>) => job({ published: true, story: true, hasArticle: true, article })

/** Each state the job photos card can be in, with the buttons it shows. */
const JOB_STATES: { name: string; state: JobState; open?: boolean; site?: boolean }[] = [
  { name: "New, no story", state: job({}) },
  { name: "Published, no story", state: job({ published: true }) },
  { name: "New, with the story", state: job({ story: true }) },
  { name: "Published with the story: being written up", state: job({ published: true, story: true }) },
  { name: "Published with the story: no article could be written", state: job({ published: true, story: true, gaveUp: true }) },
  { name: "Written up: waiting for Publish", state: written({ title: TITLE, live: false, draft: true }), open: true },
  { name: "Written up: goes live by itself", state: written({ title: TITLE, live: false, draft: true, when: "on Monday 16 November at 9:00 a.m." }), open: true },
  { name: "Written up: on the site", state: written({ title: TITLE, live: true, draft: false }), open: true, site: true },
  { name: "Written up: the article was deleted", state: written({ live: false, draft: false }) },
  { name: "Written up: the article couldn't be read just now", state: job({ published: true, story: true, hasArticle: true, article: null }) },
]

function section(title: string, children: ReactElement[]): ReactElement {
  return h(Stack, { gap: 4 }, h(Heading, { size: 1, as: "h2" }, title), ...children)
}

function state(name: string, panel: ReactElement): ReactElement {
  return h(Stack, { gap: 2, key: name }, h(Text, { size: 0, muted: true }, name), panel)
}

function page(scheme: "light" | "dark"): ReactElement {
  return h(
    ThemeProvider,
    { theme: studioTheme, scheme },
    h(
      Card,
      { padding: 5, style: { minHeight: "100vh" } },
      h(
        Box,
        { style: { maxWidth: 680 } },
        h(
          Stack,
          { gap: 6 },
          h(Text, { size: 1, muted: true }, `Square One's Studio, the panels in every state (${scheme})`),
          section(
            "Job photos: the card above the form",
            JOB_STATES.map((s) => state(s.name, h(JobPhotosCardView, { line: jobPhotosLine(s.state), open: s.open ? OPEN : undefined, site: s.site ? SITE : undefined }))),
          ),
          section("Job photos: the line in the list, by state", [
            state("No story", h(Text, { size: 1 }, `2026-11-12 · ${jobPhotosListLine({ story: false, hasArticle: false })}`)),
            state("Story in", h(Text, { size: 1 }, `2026-11-12 · ${jobPhotosListLine({ story: true, hasArticle: false })}`)),
            state("Written up", h(Text, { size: 1 }, `2026-11-12 · ${jobPhotosListLine({ story: true, hasArticle: true })}`)),
          ]),
          section("Blog posts: the line in the list", [
            state("A draft set to go live by itself, written from Job photos", h(Text, { size: 1 }, postListLine({ date: "2026-11-12", scheduled: true, scheduledFor: "2026-11-16T16:00:00Z", fromJob: "fieldPost-1" }))),
            state("The pinned post", h(Text, { size: 1 }, postListLine({ date: "2026-11-05", pinned: true }))),
          ]),
          section("Edit on the page: the card above a post or a page", [
            state("A post with its web address", h(EditOnThePageCardView, { words: editOnThePageWords("post", true), link: { href: "#edit-on-the-page" } })),
            state("A page", h(EditOnThePageCardView, { words: editOnThePageWords("homePage", true), link: { href: "#edit-on-the-page" } })),
            state("A new post, before Generate", h(EditOnThePageCardView, { words: editOnThePageWords("post", false) })),
          ]),
          section("Start here: if the guide ever fails to show", [
            state(
              "What the pane says instead",
              h(Text, { size: 1 }, `The guide can't show here just now. Read it on its own page: squareonepaving.com${GUIDE_PATH}`),
            ),
          ]),
        ),
      ),
    ),
  )
}

mkdirSync(OUT, { recursive: true })
for (const scheme of ["light", "dark"] as const) {
  const sheet = new ServerStyleSheet()
  try {
    const body = renderToString(sheet.collectStyles(page(scheme)))
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Studio panels (${scheme})</title>${sheet.getStyleTags()}<style>body{margin:0}</style></head><body>${body}</body></html>`
    writeFileSync(path.join(OUT, `${scheme}.html`), html)
    console.log(`wrote ${path.relative(process.cwd(), path.join(OUT, `${scheme}.html`))}`)
  } finally {
    sheet.seal()
  }
}
