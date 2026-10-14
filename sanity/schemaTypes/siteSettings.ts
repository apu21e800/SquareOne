import { defineField, defineType } from "sanity"
import { copyCheck, headingCheck } from "./style"
import { DEFAULT_SETTINGS as D, PHONE_SHAPE } from "../../lib/site-settings"

/**
 * One document: the facts the whole site repeats (phones, email, address,
 * the social accounts, the footer's line). Since 14 Oct 2026 every place
 * they print reads them from here (lib/site-settings.ts): the footer, the
 * menu, the phone bar, the quote form, the contact, about and legal pages,
 * every "or call" line, llms.txt and the search engines' data. A field left
 * empty shows the site's own value, so clearing one can never blank a page.
 */

const phone = (name: string, title: string, value: string, where: string) =>
  defineField({
    name,
    type: "string",
    title,
    description: `${where} Written as people dial it, with dashes: “${value}”. Left empty, ${value}.`,
    initialValue: value,
    validation: (r) => r.custom((v) => (typeof v !== "string" || !v.trim() || PHONE_SHAPE.test(v.trim()) ? true : `Write it with dashes, like ${value}.`)),
  })

const account = (name: string, title: string, value: string | undefined, description: string) =>
  defineField({
    name,
    type: "url",
    title,
    description,
    ...(value ? { initialValue: value } : {}),
    validation: (r) => r.uri({ scheme: ["https"] }),
  })

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "positioning",
      type: "text",
      title: "Footer line",
      rows: 2,
      description: "The line under the logo in every page's footer. Left empty, the site's own line.",
      initialValue: D.positioning,
      validation: (r) => r.custom(copyCheck).warning(),
    }),
    phone("phoneOffice", "Office phone (Maple Ridge)", D.phoneOffice, "The main line: the footer, the menu, the phone bar on phones and every “or call” line."),
    phone("phoneIsland", "Vancouver Island phone", D.phoneIsland, "The Island's own line (a service region, never an office)."),
    phone("phoneTollFree", "Toll-free", D.phoneTollFree, "The toll-free line."),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      description: `The office's address, wherever the site prints an email. Left empty, ${D.email}.`,
      initialValue: D.email,
      validation: (r) => r.custom((v) => (typeof v !== "string" || !v.trim() || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? true : "That isn't an email address.")),
    }),
    defineField({ name: "addressLine1", type: "string", title: "Address line 1", description: "The street line, as the footer prints it.", initialValue: D.addressLine1 }),
    defineField({
      name: "addressLine2",
      type: "string",
      title: "Address line 2",
      description: "Town, province and postal code: “Maple Ridge, BC V2X 9E7”. Search engines read the parts from this line.",
      initialValue: D.addressLine2,
      validation: (r) => r.custom((v) => (typeof v !== "string" || !v.trim() || /^.+,\s*[A-Z]{2}\s+[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(v.trim()) ? true : "Write it as town, province and postal code: “Maple Ridge, BC V2X 9E7”.")).warning(),
    }),
    account("instagram", "Instagram", D.instagram, "The profile's link. The footer, the home page's social section and the search engines' data use it."),
    account("tiktok", "TikTok", undefined, "Add the account link and the TikTok button appears on the home page and in the footer."),
    account("facebook", "Facebook", D.facebook, "The page's link."),
    account("linkedin", "LinkedIn", D.linkedin, "The company page's link."),
    account("youtube", "YouTube", D.youtube, "The channel's link."),
    // Read by nothing since 26 Sept 2026: the home page's social section has
    // its own heading (components/sections/FollowTheWork.tsx). Hidden so the
    // office isn't offered a field that changes nothing; anything saved stays.
    defineField({ name: "socialHeading", type: "string", title: "Home page social section heading", hidden: true, validation: (r) => r.custom(headingCheck).warning() }),
    defineField({ name: "socialLede", type: "string", title: "Home page social section line", hidden: true, validation: (r) => r.custom(copyCheck).warning() }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
})
