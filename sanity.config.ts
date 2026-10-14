"use client"

/**
 * Sanity Studio — the client's editing desk, served by the site at /studio.
 * Content: the home page's hero, every page's opener, the photo galleries
 * (9 Oct 2026), blog posts, case studies, the social grid, site settings,
 * and (under Advanced) the older text/photo slots. Edit on the page
 * (14 Oct 2026): the same, clicked on the page itself.
 */
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { presentationTool } from "sanity/presentation"
import { dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"
import { resolve } from "./sanity/presentation"
import { SINGLETONS, structure } from "./sanity/structure"
import { datedPublish } from "./sanity/actions"

export default defineConfig({
  name: "square-one",
  title: "Square One Paving",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // The singleton is created through its list item, never from "new document".
    templates: (templates) => templates.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) => {
      if (SINGLETONS.has(schemaType)) return actions.filter((a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? ""))
      // A blog post's first Publish dates it today (sanity/actions.ts).
      if (schemaType === "post") return actions.map((a) => (a.action === "publish" ? datedPublish(a) : a))
      return actions
    },
  },
  plugins: [
    structureTool({ structure, title: "Content" }),
    // Edit on the page (14 Oct 2026): the site, live, beside the document;
    // click any outlined words or photograph to open its field
    // (sanity/presentation.ts, app/api/draft-mode/*). The query console
    // (Vision) was taken out the same day: it is a developer's tool, and
    // the office's Studio should hold only what they edit.
    presentationTool({
      name: "edit-on-the-page",
      title: "Edit on the page",
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" } },
      resolve,
    }),
  ],
})
