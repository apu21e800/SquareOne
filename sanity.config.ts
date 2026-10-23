"use client"

/**
 * Sanity Studio: the office's editing desk, served by the site at /studio.
 * Content (sanity/structure.ts): Website Pages (the home, about, contact and
 * driveways pages' words, every page's opener, the photo galleries, the
 * social grid), Services, Projects, Blog posts and Site Settings, with Blog
 * ideas, Job photos and Sent to Buffer when the add-ons are on
 * (lib/addons.ts), and (under Advanced) the older text/photo slots. Edit on
 * the page (14 Oct 2026): the same, clicked on the page itself; from a
 * document with a page, its own button opens that page (23 Oct 2026).
 */
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { presentationTool } from "sanity/presentation"
import { dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"
import { resolve } from "./sanity/presentation"
import { CONTENT_TOOL, EDIT_ON_THE_PAGE, FIXED_TYPES, MACHINE_TYPES, SINGLETONS, creatable, structure } from "./sanity/structure"
import { datedPublish } from "./sanity/actions"
import { ADDONS } from "./lib/addons"
import { EDIT_ON_THE_PAGE_TOOL } from "./sanity/studio-pages"
import { EditOnThePageInput } from "./sanity/components/EditOnThePage"

export default defineConfig({
  name: "square-one",
  title: "Square One Paving",
  basePath: "/studio",
  projectId,
  dataset,
  // Only what Square One's plan includes, so nothing in the office's way
  // leads to a paywall (Vern, 22 Oct 2026: "a super awesome pro CMS"; Sanity's
  // free plan, checked at sanity.io/pricing/compare that day, has no Content
  // Releases, scheduled drafts, comments or tasks). Off: the Releases tool and
  // its Drafts picker, Sanity's own scheduling (a post goes live by itself
  // through its own fields, sanity/schemaTypes/post.ts) and Tasks; comments
  // are off in `document` below. Edit on the page is included and stays.
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  scheduledPublishing: { enabled: false },
  tasks: { enabled: false },
  schema: {
    types: schemaTypes,
    // A single document is created through its list item, never from "new
    // document"; the four services come with the site (npm run sync:pages).
    // The social job's records are its own (read only). The add-ons' types
    // only with the add-ons on (lib/addons.ts).
    templates: (templates) => templates.filter((t) => creatable(t.schemaType, ADDONS)),
  },
  // Every document with a page of its own gets an Edit on the page button
  // above its fields, opening that page (23 Oct 2026,
  // sanity/components/EditOnThePage.tsx); every other input is unchanged.
  form: {
    components: { input: EditOnThePageInput },
  },
  document: {
    comments: { enabled: false },
    actions: (actions, { schemaType }) => {
      // The social job's records too: deleting one would have its item drafted into Buffer again.
      if (SINGLETONS.has(schemaType) || FIXED_TYPES.has(schemaType) || MACHINE_TYPES.has(schemaType)) return actions.filter((a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? ""))
      // A blog post's first Publish dates it today (sanity/actions.ts).
      if (schemaType === "post") return actions.map((a) => (a.action === "publish" ? datedPublish(a) : a))
      return actions
    },
  },
  plugins: [
    structureTool({ structure, title: CONTENT_TOOL }),
    // Edit on the page (14 Oct 2026): the site, live, beside the document;
    // click any outlined words or photograph to open its field
    // (sanity/presentation.ts, app/api/draft-mode/*). The query console
    // (Vision) was taken out the same day: it is a developer's tool, and
    // the office's Studio should hold only what they edit.
    presentationTool({
      name: EDIT_ON_THE_PAGE_TOOL,
      title: EDIT_ON_THE_PAGE,
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" } },
      resolve,
    }),
  ],
})
