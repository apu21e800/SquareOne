import { defineField, defineType } from "sanity"

/** One document: the facts the whole site repeats (phones, address, socials). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "positioning", type: "text", title: "Positioning line (footer)", rows: 2, initialValue: "Decorative pavement for BC since 2000. Installer of HUB Surface Systems products, based in Maple Ridge and working across the Lower Mainland and Vancouver Island." }),
    defineField({ name: "phoneOffice", type: "string", title: "Office phone (Maple Ridge)", initialValue: "604-466-9902" }),
    defineField({ name: "phoneIsland", type: "string", title: "Vancouver Island phone", initialValue: "250-391-0270" }),
    defineField({ name: "phoneTollFree", type: "string", title: "Toll-free", initialValue: "1-877-391-0270" }),
    defineField({ name: "email", type: "string", title: "Email", initialValue: "office@squareonepaving.com" }),
    defineField({ name: "addressLine1", type: "string", title: "Address line 1", initialValue: "505–20800 Lougheed Highway" }),
    defineField({ name: "addressLine2", type: "string", title: "Address line 2", initialValue: "Maple Ridge, BC V2X 3P2" }),
    defineField({ name: "instagram", type: "url", title: "Instagram", initialValue: "https://www.instagram.com/squareonepaving/" }),
    defineField({ name: "tiktok", type: "url", title: "TikTok", description: "Add the account link and the TikTok button appears on the home page and in the footer." }),
    defineField({ name: "facebook", type: "url", title: "Facebook", initialValue: "https://www.facebook.com/squareonepaving/" }),
    defineField({ name: "linkedin", type: "url", title: "LinkedIn", initialValue: "https://www.linkedin.com/company/square-one-paving-ltd/" }),
    defineField({ name: "youtube", type: "url", title: "YouTube", initialValue: "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ" }),
    defineField({ name: "socialHeading", type: "string", title: "Home page social section heading", initialValue: "Follow the work" }),
    defineField({ name: "socialLede", type: "string", title: "Home page social section line", initialValue: "Installs as they happen, before-and-afters, and the crews at work." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
})
