import type { StructureBuilder, StructureResolver } from "sanity/structure"
import GuidePane from "./components/GuidePane"
import { ADDONS, ADDON_TYPES } from "../lib/addons"
import { GUIDE_TITLE } from "../lib/office-guide"
import { ICONS } from "./icons"

/**
 * The Studio's list (14 Oct 2026), in the order the office works through it:
 * "Start here" (the office's guide, first since 21 Oct 2026), then Website
 * Pages, Services, Projects, Blog ideas, Blog posts, Job photos, Sent to
 * Buffer, Site Settings (the automation brief; docs/AUTOMATION.md). In
 * plain words since 20 Oct 2026, as hubss.com's: each list says what it is
 * for in its own title, so nobody needs a manual to know what happens. Since
 * 22 Oct 2026 each has its picture too, the same one its documents show
 * (sanity/icons.ts).
 *
 * Blog ideas, Job photos and Sent to Buffer are the add-ons' (lib/addons.ts):
 * shown, as Square One has the Studio (Vern, 22 Oct 2026). With
 * NEXT_PUBLIC_STUDIO_ADDONS=off they aren't in the list or in "new
 * document", and Blog posts says only what Publish does. Nothing in them is
 * deleted.
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

/** Written by the automation, read only in the Studio: never made by hand (lib/automation/social.ts). */
export const MACHINE_TYPES = new Set(["socialLog"])

/** Whether "new document" offers a type: never a single document, a fixed set or the automation's records, and an add-on's only with the add-ons on. */
export function creatable(schemaType: string, addons: boolean): boolean {
  return !SINGLETONS.has(schemaType) && !FIXED_TYPES.has(schemaType) && !MACHINE_TYPES.has(schemaType) && (addons || !ADDON_TYPES.has(schemaType))
}

/** The Studio's two tools, as its top bar names them (sanity.config.ts); the guide names them too. */
export const CONTENT_TOOL = "Content"
export const EDIT_ON_THE_PAGE = "Edit on the page"

/** The list for this build (lib/addons.ts). */
export const structure: StructureResolver = (S) => buildStructure(S, ADDONS)

/** The list with the add-ons off or on. */
export function buildStructure(S: StructureBuilder, addons: boolean) {
  const single = (id: keyof typeof ICONS, title: string) => S.listItem().title(title).id(id).icon(ICONS[id]).child(S.document().schemaType(id).documentId(id).title(title))
  return S.list()
    .title("Square One")
    .items([
      // The office's one-page guide (lib/office-guide.ts), first: how to
      // update the site. The same page to bookmark: /studio/guide.
      S.listItem().title(`Start here: ${GUIDE_TITLE.toLowerCase()}`).id("guide").icon(ICONS.guide).child(S.component(GuidePane).id("guide-page").title(GUIDE_TITLE)),
      S.divider(),
      S.listItem()
        .title("Website Pages")
        .id("website-pages")
        .icon(ICONS.websitePages)
        .child(
          S.list()
            .title("Website Pages")
            .items([
              single("homePage", "Home page"),
              single("aboutPage", "About page"),
              single("contactPage", "Contact page"),
              single("drivewaysPage", "Driveways page"),
              S.divider(),
              S.listItem().title("Page openers: each page's photograph and headline").id("pageHero").schemaType("pageHero").icon(ICONS.pageHero).child(S.documentTypeList("pageHero").title("Page openers")),
              S.listItem()
                .title("Gallery photos")
                .id("galleryPhoto")
                .schemaType("galleryPhoto")
                .icon(ICONS.galleryPhoto)
                .child(S.documentTypeList("galleryPhoto").title("Gallery photos").defaultOrdering([{ field: "date", direction: "desc" }])),
              single("gallerySettings", "Galleries: photos taken off"),
              S.listItem()
                .title("Social grid (home page)")
                .id("socialPost")
                .schemaType("socialPost")
                .icon(ICONS.socialPost)
                .child(S.documentTypeList("socialPost").title("Social grid").defaultOrdering([{ field: "date", direction: "desc" }])),
            ]),
        ),
      S.listItem()
        .title("Services")
        .id("service")
        .schemaType("service")
        .icon(ICONS.service)
        .child(S.documentTypeList("service").title("Services").initialValueTemplates([])),
      S.listItem().title("Projects").id("project").schemaType("project").icon(ICONS.project).child(S.documentTypeList("project").title("Projects")),
      // What to write next (sanity/schemaTypes/storyIdea.ts). The drafter, on
      // Tuesdays and Thursdays, takes the top Ready item, else the top Idea,
      // and tops the plan up when it runs low (lib/automation/planner.ts).
      // An add-on.
      ...(addons
        ? [
            S.listItem()
              .title("Blog ideas")
              .id("storyIdea")
              .schemaType("storyIdea")
              .icon(ICONS.storyIdea)
              .child(
                S.documentTypeList("storyIdea")
                  .title("Blog ideas · the drafter writes the top one on Tuesdays and Thursdays")
                  .defaultOrdering([
                    { field: "priority", direction: "asc" },
                    { field: "_createdAt", direction: "asc" },
                  ]),
              ),
          ]
        : []),
      // Drafts wait here for Publish; with the add-ons, one set to go live by
      // itself goes at the daily run after its time (lib/automation/project-posts.ts).
      S.listItem()
        .title("Blog posts")
        .id("post")
        .schemaType("post")
        .icon(ICONS.post)
        .child(
          S.documentTypeList("post")
            .title(addons ? "Blog posts · drafts wait here for Publish, or go live at their set time" : "Blog posts · drafts wait here until you press Publish")
            .defaultOrdering([{ field: "date", direction: "desc" }]),
        ),
      ...(addons
        ? [
            // Photos of a finished job with a line of facts (sanity/schemaTypes/fieldPost.ts).
            // Publishing one has the next daily run draft its posts in Buffer; with
            // the story filled in it becomes a project article instead. An add-on.
            S.listItem()
              .title("Job photos")
              .id("fieldPost")
              .schemaType("fieldPost")
              .icon(ICONS.fieldPost)
              .child(S.documentTypeList("fieldPost").title("Job photos · publish one and its posts go to Buffer the next morning; add the story and it becomes a project article").defaultOrdering([{ field: "date", direction: "desc" }])),
            // What the daily run left in Buffer for each item, with the style check
            // on its copy (lib/automation/social.ts). The run writes these; nothing
            // here is created or edited by hand. An add-on.
            S.listItem()
              .title("Sent to Buffer")
              .id("socialLog")
              .schemaType("socialLog")
              .icon(ICONS.socialLog)
              .child(S.documentTypeList("socialLog").title("Sent to Buffer · read only · approve and edit the posts themselves in Buffer").defaultOrdering([{ field: "createdAt", direction: "desc" }]).initialValueTemplates([])),
          ]
        : []),
      S.divider(),
      single("siteSettings", "Site Settings"),
      S.divider(),
      // The first way in (30 Sept 2026): a key per spot, read only by the home
      // page's hero. Website Pages covers the same spots more simply; kept so
      // anything saved here is never lost.
      S.listItem()
        .title("Advanced")
        .id("advanced")
        .icon(ICONS.advanced)
        .child(
          S.list()
            .title("Advanced")
            .items([
              S.listItem().title("Text slots").id("copySlot").schemaType("copySlot").icon(ICONS.copySlot).child(S.documentTypeList("copySlot").title("Text slots")),
              S.listItem().title("Photo slots").id("imageSlot").schemaType("imageSlot").icon(ICONS.imageSlot).child(S.documentTypeList("imageSlot").title("Photo slots")),
            ]),
        ),
    ])
}
