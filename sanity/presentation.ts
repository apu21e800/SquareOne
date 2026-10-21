import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation"
import { OPENERS, RECORD_OPENER_PAGES } from "../lib/openers"
import { GALLERIES } from "./schemaTypes/pages"

/**
 * Edit on the page (14 Oct 2026): how the Studio's preview knows which page
 * shows which document.
 *
 * `mainDocuments`: open a page in the preview and its own document opens
 * beside it (the Home page for /, a page's opener for /about, a post for
 * /blog/its-address). `locations`: open a document and the Studio lists the
 * pages that show it, one click to preview each.
 */

const OPENER_PAGES = [...OPENERS.map((o) => ({ page: o.page, label: o.label })), ...RECORD_OPENER_PAGES]
const openerLabel = (page: string) => OPENER_PAGES.find((o) => o.page === page)?.label ?? page
const galleryTitle = (value: string) => GALLERIES.find((g) => g.value === value)?.title ?? value

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/", filter: `_type == "homePage" && _id == "homePage"` },
    { route: "/blog/:slug", filter: `_type == "post" && slug.current == $slug` },
    { route: "/projects/:slug", filter: `_type == "project" && slug.current == $slug` },
    { route: "/contact", filter: `_type == "siteSettings" && _id == "siteSettings"` },
    ...OPENER_PAGES.map((o) => ({ route: o.page, filter: `_type == "pageHero" && page == ${JSON.stringify(o.page)}` })),
  ]),
  locations: {
    homePage: defineLocations({
      message: "The home page's hero: its photographs, headline and line.",
      tone: "positive",
      locations: [{ title: "Home page", href: "/" }],
    }),
    pageHero: defineLocations({
      select: { page: "page" },
      resolve: (doc) => (doc?.page ? { locations: [{ title: openerLabel(doc.page), href: doc.page }] } : null),
    }),
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) =>
        doc?.slug
          ? {
              locations: [
                { title: doc.title || "Untitled post", href: `/blog/${doc.slug}` },
                { title: "Blog", href: "/blog" },
              ],
            }
          : { message: "Give the post a web address to preview it.", tone: "caution" },
    }),
    project: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) =>
        doc?.slug
          ? {
              locations: [
                { title: doc.title || "Untitled project", href: `/projects/${doc.slug}` },
                { title: "Projects", href: "/projects" },
              ],
            }
          : { message: "Give the project a web address to preview it.", tone: "caution" },
    }),
    galleryPhoto: defineLocations({
      select: { gallery: "gallery" },
      resolve: (doc) => {
        const locations = [{ title: "Galleries", href: "/galleries" }]
        if (doc?.gallery === "driveways") locations.push({ title: "Driveways", href: "/driveways" })
        else if (doc?.gallery) locations.push({ title: galleryTitle(doc.gallery), href: `/applications/${doc.gallery}` })
        return { locations }
      },
    }),
    gallerySettings: defineLocations({ locations: [{ title: "Galleries", href: "/galleries" }] }),
    socialPost: defineLocations({ locations: [{ title: "Home page (the social grid)", href: "/" }] }),
    siteSettings: defineLocations({
      message: "In every page's footer, and on the contact page.",
      tone: "caution",
      locations: [
        { title: "Home page (footer)", href: "/" },
        { title: "Contact", href: "/contact" },
      ],
    }),
  },
}
