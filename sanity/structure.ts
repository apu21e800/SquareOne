import type { StructureResolver } from "sanity/structure"

/**
 * The Studio's list (14 Oct 2026), in the order the office works through it:
 * Website Pages, Services, Projects, Blog, Site Settings. The Blog plan, From
 * the field and Social drafts take their places (between Projects and Site
 * Settings) as the blog and social automation are built (docs/AUTOMATION.md).
 *
 * The single documents (the Home page, Site Settings, the galleries' list of
 * photos taken off) open straight into their one document: there is never a
 * second one to make.
 */

export const SINGLETONS = new Set(["siteSettings", "homePage", "gallerySettings"])

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Square One")
    .items([
      S.listItem()
        .title("Website Pages")
        .id("website-pages")
        .child(
          S.list()
            .title("Website Pages")
            .items([
              S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage").title("Home page")),
              S.listItem().title("Page openers: each page's photograph and headline").id("pageHero").schemaType("pageHero").child(S.documentTypeList("pageHero").title("Page openers")),
              S.listItem()
                .title("Gallery photos")
                .id("galleryPhoto")
                .schemaType("galleryPhoto")
                .child(S.documentTypeList("galleryPhoto").title("Gallery photos").defaultOrdering([{ field: "date", direction: "desc" }])),
              S.listItem().title("Galleries: photos taken off").id("gallerySettings").child(S.document().schemaType("gallerySettings").documentId("gallerySettings").title("Galleries")),
              S.listItem()
                .title("Social grid (home page)")
                .id("socialPost")
                .schemaType("socialPost")
                .child(S.documentTypeList("socialPost").title("Social grid").defaultOrdering([{ field: "date", direction: "desc" }])),
            ]),
        ),
      S.divider(),
      S.listItem().title("Projects").id("project").schemaType("project").child(S.documentTypeList("project").title("Projects")),
      S.listItem()
        .title("Blog")
        .id("post")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.divider(),
      S.listItem().title("Site Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site Settings")),
      S.divider(),
      // The first way in (30 Sept 2026): a key per spot, read only by the home
      // page's hero. Website Pages covers the same spots more simply; kept so
      // anything saved here is never lost.
      S.listItem()
        .title("Advanced")
        .id("advanced")
        .child(
          S.list()
            .title("Advanced")
            .items([
              S.listItem().title("Text slots").id("copySlot").schemaType("copySlot").child(S.documentTypeList("copySlot").title("Text slots")),
              S.listItem().title("Photo slots").id("imageSlot").schemaType("imageSlot").child(S.documentTypeList("imageSlot").title("Photo slots")),
            ]),
        ),
    ])
