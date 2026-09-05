"use client"

/**
 * Sanity Studio — the client's editing desk, served by the site at /studio.
 * Content: blog posts, case studies, the social grid, site settings, and the
 * text/photo slots that override built-in copy and photography.
 */
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"

const SINGLETONS = new Set(["siteSettings"])

const structure: StructureResolver = (S) =>
  S.list()
    .title("Square One")
    .items([
      S.listItem().title("Blog posts").schemaType("post").child(S.documentTypeList("post").title("Blog posts").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.listItem().title("Projects (case studies)").schemaType("project").child(S.documentTypeList("project").title("Projects")),
      S.listItem().title("Social grid (home page)").schemaType("socialPost").child(S.documentTypeList("socialPost").title("Social posts").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.divider(),
      S.listItem().title("Text slots").schemaType("copySlot").child(S.documentTypeList("copySlot").title("Text slots")),
      S.listItem().title("Photo slots").schemaType("imageSlot").child(S.documentTypeList("imageSlot").title("Photo slots")),
      S.divider(),
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ])

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
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType) ? actions.filter((a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? "")) : actions,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
