import type { StructureResolver } from "sanity/structure"

/**
 * The Studio's list (14 Oct 2026), in the order the office works through it:
 * Website Pages, Services, Projects, Blog plan, Blog, Site Settings. From the
 * field and Social drafts take their places after Blog when the social
 * automation is built (docs/AUTOMATION.md).
 *
 * The single documents (the four pages' words, Site Settings, the galleries'
 * list of photos taken off) open straight into their one document: there is
 * never a second one to make. The four services are fixed too: their words
 * are the office's, the services themselves come with the site.
 */

/** One document each, opened from its list item; never made from "new document". */
export const SINGLETONS = new Set(["siteSettings", "homePage", "aboutPage", "contactPage", "drivewaysPage", "gallerySettings"])

/** Fixed sets: edited, never added to, duplicated or deleted. */
export const FIXED_TYPES = new Set(["service"])

export const structure: StructureResolver = (S) => {
  const single = (id: string, title: string) => S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id).title(title))
  return S.list()
    .title("Square One")
    .items([
      S.listItem()
        .title("Website Pages")
        .id("website-pages")
        .child(
          S.list()
            .title("Website Pages")
            .items([
              single("homePage", "Home page"),
              single("aboutPage", "About page"),
              single("contactPage", "Contact page"),
              single("drivewaysPage", "Driveways page"),
              S.divider(),
              S.listItem().title("Page openers: each page's photograph and headline").id("pageHero").schemaType("pageHero").child(S.documentTypeList("pageHero").title("Page openers")),
              S.listItem()
                .title("Gallery photos")
                .id("galleryPhoto")
                .schemaType("galleryPhoto")
                .child(S.documentTypeList("galleryPhoto").title("Gallery photos").defaultOrdering([{ field: "date", direction: "desc" }])),
              single("gallerySettings", "Galleries: photos taken off"),
              S.listItem()
                .title("Social grid (home page)")
                .id("socialPost")
                .schemaType("socialPost")
                .child(S.documentTypeList("socialPost").title("Social grid").defaultOrdering([{ field: "date", direction: "desc" }])),
            ]),
        ),
      S.listItem()
        .title("Services")
        .id("service")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services").initialValueTemplates([])),
      S.listItem().title("Projects").id("project").schemaType("project").child(S.documentTypeList("project").title("Projects")),
      // What to write next (sanity/schemaTypes/storyIdea.ts). The drafter, on
      // Tuesdays and Thursdays, takes the top Ready item, else the top Idea,
      // and tops the plan up when it runs low (lib/automation/planner.ts).
      S.listItem()
        .title("Blog plan")
        .id("storyIdea")
        .schemaType("storyIdea")
        .child(
          S.documentTypeList("storyIdea")
            .title("Blog plan")
            .defaultOrdering([
              { field: "priority", direction: "asc" },
              { field: "_createdAt", direction: "asc" },
            ]),
        ),
      S.listItem()
        .title("Blog")
        .id("post")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.divider(),
      single("siteSettings", "Site Settings"),
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
}
