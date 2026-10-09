import { defineField, defineType } from "sanity"

/** One document: the facts the whole site repeats (phones, address, socials). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    // 9 Oct 2026: the starting values are the site's own (lib/cms.ts
    // DEFAULT_SETTINGS). The old ones named the manufacturer and carried the
    // sibling site's "Follow the work"; a document made from them would have
    // put both back on the page.
    defineField({ name: "positioning", type: "text", title: "Positioning line (footer)", rows: 2, description: "Left empty, the site's own line.", initialValue: "We stamp, coat and mark asphalt and concrete, with our own crews on both sides of the Strait, since 2000." }),
    defineField({ name: "phoneOffice", type: "string", title: "Office phone (Maple Ridge)", initialValue: "604-612-6209" }),
    defineField({ name: "phoneIsland", type: "string", title: "Vancouver Island phone", initialValue: "250-391-0270" }),
    defineField({ name: "phoneTollFree", type: "string", title: "Toll-free", initialValue: "1-877-391-0270" }),
    defineField({ name: "email", type: "string", title: "Email", initialValue: "office@squareonepaving.com" }),
    defineField({ name: "addressLine1", type: "string", title: "Address line 1", initialValue: "19–11720 Stewart Crescent" }),
    defineField({ name: "addressLine2", type: "string", title: "Address line 2", initialValue: "Maple Ridge, BC V2X 9E7" }),
    defineField({ name: "instagram", type: "url", title: "Instagram", initialValue: "https://www.instagram.com/squareonepaving/" }),
    defineField({ name: "tiktok", type: "url", title: "TikTok", description: "Add the account link and the TikTok button appears on the home page and in the footer." }),
    defineField({ name: "facebook", type: "url", title: "Facebook", initialValue: "https://www.facebook.com/squareonepaving/" }),
    defineField({ name: "linkedin", type: "url", title: "LinkedIn", initialValue: "https://www.linkedin.com/company/square-one-paving-ltd/" }),
    defineField({ name: "youtube", type: "url", title: "YouTube", initialValue: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ" }),
    defineField({ name: "socialHeading", type: "string", title: "Home page social section heading", description: "Left empty, “Recent, on Instagram”.", initialValue: "Recent, on Instagram" }),
    defineField({ name: "socialLede", type: "string", title: "Home page social section line", description: "Left empty, the site's own line.", initialValue: "The crews at work, installs as they finish, and the odd before-and-after." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
})
