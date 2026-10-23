/**
 * Tests for the Studio at hubss.com's level (14 Oct 2026): `npm run test:studio`.
 *
 * What must hold: every photograph frames itself on the focal point the
 * office drags, inside any crop; a blog post's first Publish dates it in
 * Vancouver's day; Site Settings fall back field by field and change every
 * place a line or the email prints, and with the settings as they ship the
 * pages are exactly as they were; the Studio's list is in the brief's order.
 * No network.
 */
import "./test-env"
import assert from "node:assert/strict"
import { croppedSize, focalPosition, isCropped } from "../lib/focal"
import { firstPublishDate, officeDate } from "../sanity/lib/publish-date"
import { DEFAULT_SETTINGS, PHONE_SHAPE, addressParts, mailtoHref, mergeSettings, schemaPhone, telHref, withSettings } from "../lib/site-settings"
import { mergeWork, type GalleryPhotoDoc } from "../lib/work-cms"
import { mergeProjects, type ProjectDoc } from "../lib/projects-cms"
import { projects as RECORD } from "../lib/projects"
import { organization } from "../components/StructuredData"
import { CONTENT_TOOL, EDIT_ON_THE_PAGE, buildStructure, creatable, structure } from "../sanity/structure"
import { ICONS } from "../sanity/icons"
import { STUDIO_HEADINGS, STUDIO_ROOT_ID } from "../sanity/studio-headings"
import { ADDONS, ADDON_TYPES, addonsOn } from "../lib/addons"
import { vercelStegaCombine } from "@vercel/stega"
import { ABOUT_COPY, CONTACT_COPY, DRIVEWAYS_COPY, HOME_COPY, mergeAboutCopy, mergeContactCopy, mergeDrivewaysCopy, mergeFaqs, mergeHomeCopy, mergeLines, mergeSection } from "../lib/page-copy"
import { mergeService } from "../lib/services-cms"
import { services } from "../lib/services"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { GUIDE_PATH, GUIDE_SOURCE, OFFICE_GUIDE, guideFor, guideText, labelRuns, type OfficeGuideContent } from "../lib/office-guide"
import { post as postSchema } from "../sanity/schemaTypes/post"
import { lintCopy } from "../lib/automation/style"
import { schemaTypes } from "../sanity/schemaTypes"
import { metadata as guideMetadata } from "../app/studio/guide/page"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

async function main() {
  console.log("photographs frame on the focal point")

  await check("a photograph nobody framed keeps the page's own framing", () => {
    assert.equal(focalPosition(undefined), undefined)
    assert.equal(focalPosition(null, null), undefined)
    assert.equal(focalPosition({ width: 0.3 } as never), undefined)
  })

  await check("the focal point, uncropped, is where it was dragged", () => {
    assert.equal(focalPosition({ x: 0.5, y: 0.5 }), "50% 50%")
    assert.equal(focalPosition({ x: 0.31, y: 0.8 }), "31% 80%")
  })

  await check("inside a crop it is measured from the crop, as the photograph is served", () => {
    // 60% across a photograph cropped to its middle half sits at 70% of what is served.
    assert.equal(focalPosition({ x: 0.6, y: 0.5 }, { left: 0.25, right: 0.25, top: 0.1, bottom: 0.2 }), "70% 57%")
    // A point outside the crop holds to the crop's edge.
    assert.equal(focalPosition({ x: 0.05, y: 0.95 }, { left: 0.2, right: 0, top: 0, bottom: 0.2 }), "0% 100%")
    assert.ok(isCropped({ top: 0.1 }) && !isCropped({ top: 0, left: 0 }) && !isCropped(null))
    assert.deepEqual(croppedSize(4000, 3000, { left: 0.25, right: 0.25, top: 0.1, bottom: 0.2 }), { width: 2000, height: 2100 })
  })

  const galleryDoc = (over: Partial<GalleryPhotoDoc> = {}): GalleryPhotoDoc => ({
    _id: "galleryPhoto-a",
    _type: "galleryPhoto",
    image: { asset: { _ref: "image-abc123-4000x3000-jpg" } },
    dims: { width: 4000, height: 3000 },
    gallery: "crosswalks",
    subject: "Decorative crosswalk",
    region: "Lower Mainland",
    systems: ["StreetPrint"],
    ...over,
  })

  await check("a gallery tile crops around a Studio photograph's focal point", () => {
    const [p] = mergeWork([], [galleryDoc({ image: { asset: { _ref: "image-abc123-4000x3000-jpg" }, hotspot: { x: 0.2, y: 0.7 } } })], null)
    assert.equal(p.position, "20% 70%")
    assert.equal(p.edit, undefined, "no edit mark outside the preview")
  })

  await check("a cropped Studio photograph is sized as served, so its tile isn't stretched", () => {
    const crop = { left: 0.25, right: 0.25, top: 0, bottom: 0 }
    const [p] = mergeWork([], [galleryDoc({ image: { asset: { _ref: "image-abc123-4000x3000-jpg" }, crop, hotspot: { x: 0.5, y: 0.5 } } })], null)
    assert.equal(p.w, 2000)
    assert.equal(p.h, 3000)
    assert.ok(p.src.includes("rect=1000,0,2000,3000"), p.src)
    assert.equal(p.position, "50% 50%")
  })

  await check("in an editor's preview a gallery photograph opens its own field", () => {
    const [p] = mergeWork([], [galleryDoc()], null, true)
    assert.ok(p.edit && p.edit.includes("galleryPhoto-a") && p.edit.includes("image"), String(p.edit))
  })

  const seededDoc = (): ProjectDoc => {
    const r = RECORD[0]
    return {
      _id: `project-${r.slug}`,
      _type: "project",
      title: r.title,
      slug: r.slug,
      service: r.service,
      application: r.application,
      city: r.city,
      region: r.region,
      systems: r.systems,
      excerpt: r.excerpt,
      images: r.images.map((src, j) => ({
        _key: `k${j}`,
        alt: j === 0 ? r.title : `${r.title}, photo ${j + 1}`,
        file: encodeURI(decodeURIComponent(src.split("/").pop() ?? "")),
        asset: { _ref: `image-${j}abc-2048x1536-jpg` },
      })),
    }
  }

  await check("a project's photographs carry the alt text the office wrote", () => {
    const p = mergeProjects([seededDoc()], RECORD).find((x) => x.slug === RECORD[0].slug)!
    assert.equal(p.images[0], RECORD[0].images[0], "the site's own file still serves")
    assert.equal(p.photoMeta?.[p.images[0]]?.alt, RECORD[0].title)
    assert.equal(p.photoMeta?.[p.images[0]]?.position, undefined)
  })

  await check("a project photograph's focal point and, in the preview, its field", () => {
    const d = seededDoc()
    d.images![0] = { ...d.images![0], hotspot: { x: 0.4, y: 0.25 } }
    const plain = mergeProjects([d], RECORD).find((x) => x.slug === RECORD[0].slug)!
    assert.equal(plain.photoMeta?.[plain.images[0]]?.position, "40% 25%")
    assert.equal(plain.photoMeta?.[plain.images[0]]?.edit, undefined)
    const preview = mergeProjects([d], RECORD, true).find((x) => x.slug === RECORD[0].slug)!
    const edit = preview.photoMeta?.[preview.images[0]]?.edit ?? ""
    assert.ok(edit.includes(`project-${RECORD[0].slug}`) && edit.includes("k0"), edit)
  })

  console.log("a blog post's first Publish dates it")

  await check("never published, blank or past date: today", () => {
    assert.equal(firstPublishDate(false, undefined, "2026-10-14"), "2026-10-14")
    assert.equal(firstPublishDate(false, "", "2026-10-14"), "2026-10-14")
    assert.equal(firstPublishDate(false, "2026-10-06", "2026-10-14"), "2026-10-14")
  })

  await check("already today, or a date in the future, or a later Publish: left alone", () => {
    assert.equal(firstPublishDate(false, "2026-10-14", "2026-10-14"), null)
    assert.equal(firstPublishDate(false, "2026-11-02", "2026-10-14"), null)
    assert.equal(firstPublishDate(true, "2026-10-06", "2026-10-14"), null)
    assert.equal(firstPublishDate(true, undefined, "2026-10-14"), null)
  })

  await check("today is Vancouver's day, not UTC's", () => {
    assert.equal(officeDate(new Date("2026-10-15T02:30:00Z")), "2026-10-14")
    assert.equal(officeDate(new Date("2026-10-15T08:00:00Z")), "2026-10-15")
    assert.equal(officeDate(new Date("2026-01-15T07:59:00Z")), "2026-01-14")
  })

  await check("from 1 November 2026 BC keeps UTC-7, on any timezone data: half past midnight on 2 November is the 2nd", () => {
    assert.equal(officeDate(new Date("2026-11-02T07:30:00Z")), "2026-11-02")
    assert.equal(officeDate(new Date("2027-01-15T07:30:00Z")), "2027-01-15")
  })

  console.log("Site Settings, everywhere the details print")

  await check("a blank or missing field shows the site's own value", () => {
    assert.deepEqual(mergeSettings(null), DEFAULT_SETTINGS)
    const s = mergeSettings({ phoneOffice: "  ", email: "", phoneIsland: "250-555-0100 ", instagram: 7 })
    assert.equal(s.phoneOffice, DEFAULT_SETTINGS.phoneOffice)
    assert.equal(s.email, DEFAULT_SETTINGS.email)
    assert.equal(s.phoneIsland, "250-555-0100")
    assert.equal(s.instagram, DEFAULT_SETTINGS.instagram)
    assert.equal(mergeSettings({ tiktok: "https://www.tiktok.com/@squareonepaving" }).tiktok, "https://www.tiktok.com/@squareonepaving")
  })

  await check("a value that would break every link keeps the site's own", () => {
    const s = mergeSettings({
      email: "mailto:hello@squareonepaving.com",
      phoneOffice: "604\u200B-612-6209",
      phoneIsland: "(250) 391-0270",
      instagram: "http://instagram.com/squareonepaving",
      facebook: "javascript:alert(1)",
    })
    assert.equal(s.email, "hello@squareonepaving.com", "a pasted mailto: comes off")
    assert.equal(s.phoneOffice, "604-612-6209", "an invisible character comes off")
    assert.equal(s.phoneIsland, DEFAULT_SETTINGS.phoneIsland, "a number in another shape keeps the site's")
    assert.equal(s.instagram, DEFAULT_SETTINGS.instagram, "only https links")
    assert.equal(s.facebook, DEFAULT_SETTINGS.facebook)
    assert.equal(mergeSettings({ email: "office@squareonepaving" }).email, DEFAULT_SETTINGS.email)
    assert.equal(mailtoHref("mailto:office@squareonepaving.com"), "mailto:office@squareonepaving.com")
  })

  await check("the footer line keeps the preview's marks, so it stays clickable", () => {
    const line = vercelStegaCombine("Decorative pavement since 2000.", { origin: "sanity.io", href: "/studio/intent/edit/id=siteSettings;type=siteSettings;path=positioning" })
    assert.equal(mergeSettings({ positioning: line }).positioning, line)
  })

  await check("phone links and the search engines' numbers", () => {
    assert.equal(telHref("604-612-6209"), "tel:+16046126209")
    assert.equal(telHref("1-877-391-0270"), "tel:+18773910270")
    assert.equal(schemaPhone("250-391-0270"), "+1-250-391-0270")
    assert.equal(schemaPhone("1-877-391-0270"), "+1-877-391-0270")
    assert.equal(mailtoHref(" office@squareonepaving.com "), "mailto:office@squareonepaving.com")
    for (const ok of ["604-612-6209", "1-877-391-0270"]) assert.ok(PHONE_SHAPE.test(ok), ok)
    for (const bad of ["(604) 612-6209", "604 612 6209", "6046126209", "+1 604 612 6209", "604-612-620"]) assert.ok(!PHONE_SHAPE.test(bad), bad)
  })

  await check("the address's parts, and a second line that doesn't parse keeps the code's", () => {
    assert.deepEqual(addressParts(DEFAULT_SETTINGS), { street: "19-11720 Stewart Crescent", locality: "Maple Ridge", region: "BC", postalCode: "V2X 9E7" })
    const moved = addressParts({ ...DEFAULT_SETTINGS, addressLine1: "200–123 Main Street", addressLine2: "Langley, BC V3A5B6" })
    assert.deepEqual(moved, { street: "200-123 Main Street", locality: "Langley", region: "BC", postalCode: "V3A 5B6" })
    assert.equal(addressParts({ ...DEFAULT_SETTINGS, addressLine2: "Maple Ridge" }).postalCode, "V2X 9E7")
  })

  await check("prose that names a line: unchanged as shipped, the new number once changed", () => {
    const faq = "One office in Maple Ridge, and a line of its own for the Island, 250-391-0270. Toll-free 1-877-391-0270, or office@squareonepaving.com."
    assert.equal(withSettings(faq, DEFAULT_SETTINGS), faq)
    const s = { ...DEFAULT_SETTINGS, phoneIsland: "250-555-0100", phoneTollFree: "1-888-555-0199", email: "hello@squareonepaving.com" }
    assert.equal(withSettings(faq, s), "One office in Maple Ridge, and a line of its own for the Island, 250-555-0100. Toll-free 1-888-555-0199, or hello@squareonepaving.com.")
    // Swapped once: a new office line that happens to be the old Island line is not swapped again.
    const swap = { ...DEFAULT_SETTINGS, phoneOffice: "250-391-0270", phoneIsland: "250-555-0100" }
    assert.equal(withSettings("604-612-6209 / 250-391-0270", swap), "250-391-0270 / 250-555-0100")
  })

  await check("the search engines' data, as shipped, is exactly what it was", () => {
    const org = organization(DEFAULT_SETTINGS) as Record<string, unknown>
    assert.equal(org.telephone, "+1-604-612-6209")
    assert.equal(org.email, "office@squareonepaving.com")
    assert.deepEqual(org.contactPoint, [
      { "@type": "ContactPoint", telephone: "+1-604-612-6209", contactType: "customer service", areaServed: "Lower Mainland, BC", availableLanguage: "en" },
      { "@type": "ContactPoint", telephone: "+1-250-391-0270", contactType: "customer service", areaServed: "Vancouver Island, BC", availableLanguage: "en" },
      { "@type": "ContactPoint", telephone: "+1-877-391-0270", contactType: "customer service", areaServed: "CA", availableLanguage: "en" },
    ])
    assert.deepEqual(org.address, [{ "@type": "PostalAddress", streetAddress: "19-11720 Stewart Crescent", addressLocality: "Maple Ridge", addressRegion: "BC", postalCode: "V2X 9E7", addressCountry: "CA" }])
    assert.deepEqual(org.sameAs, [
      "https://www.facebook.com/squareonepaving/",
      "https://www.instagram.com/squareonepaving/",
      "https://www.linkedin.com/company/square-one-paving-ltd/",
      "https://www.youtube.com/channel/UCBDvB4vgdahH67BmP6FeccQ",
    ])
    assert.deepEqual(Object.keys(org), ["@type", "@id", "name", "alternateName", "url", "logo", "image", "description", "telephone", "email", "foundingDate", "contactPoint", "areaServed", "address", "sameAs", "hasOfferCatalog"])
  })

  console.log("every page's words: the Studio's, the site's own where blank")

  const marked = (text: string) => vercelStegaCombine(text, { origin: "sanity.io", href: "/studio/intent/edit/id=x;type=homePage;path=x" })

  await check("nothing in the Studio: every page exactly as the code has it", () => {
    assert.deepEqual(mergeHomeCopy(null), HOME_COPY)
    assert.deepEqual(mergeAboutCopy(undefined), ABOUT_COPY)
    assert.deepEqual(mergeContactCopy({}), CONTACT_COPY)
    assert.deepEqual(mergeDrivewaysCopy("odd"), DRIVEWAYS_COPY)
  })

  await check("a field the office fills wins; a blank one, even with the preview's marks, keeps the site's", () => {
    const s = mergeSection(HOME_COPY.vapour, { label: "  ", line: "Paint off, dust down. " , head: marked("") })
    assert.equal(s.label, HOME_COPY.vapour.label)
    assert.equal(s.line, "Paint off, dust down.")
    assert.equal(s.head, HOME_COPY.vapour.head)
    assert.equal(s.tail, HOME_COPY.vapour.tail)
  })

  await check("a new heading brings its own ending, or none: never the old one glued on", () => {
    const withEnding = mergeSection(HOME_COPY.projects, { head: "Recent", tail: "jobs" })
    assert.deepEqual([withEnding.head, withEnding.tail], ["Recent", "jobs"])
    const alone = mergeSection(HOME_COPY.projects, { head: "Recent work" })
    assert.deepEqual([alone.head, alone.tail], ["Recent work", undefined])
    const endingOnly = mergeSection(HOME_COPY.projects, { tail: "jobs" })
    assert.deepEqual([endingOnly.head, endingOnly.tail], ["", "jobs"])
  })

  await check("a line only where the page prints one", () => {
    assert.equal(mergeSection(HOME_COPY.projects, { line: "Six of the best." }).line, undefined)
    assert.equal(mergeSection(HOME_COPY.materials, { line: "Sheets and chips." }).line, "Sheets and chips.")
  })

  await check("cards, lists and questions: per card, and a list only when it has a real line", () => {
    const home = mergeHomeCopy({ audienceCards: { homeowners: { text: "Driveways, walkways and laneways." } } })
    assert.equal(home.audienceCards.homeowners.text, "Driveways, walkways and laneways.")
    assert.equal(home.audienceCards.homeowners.title, HOME_COPY.audienceCards.homeowners.title)
    assert.deepEqual(home.audienceCards.municipal, HOME_COPY.audienceCards.municipal)
    assert.deepEqual(mergeLines(["a"], ["", "  "]), ["a"])
    assert.deepEqual(mergeLines(["a"], [" b ", ""]), ["b"])
    assert.deepEqual(mergeFaqs([{ q: "Q", a: "A" }], [{ q: "Only a question" }]), [{ q: "Q", a: "A" }])
    assert.deepEqual(mergeFaqs([{ q: "Q", a: "A" }], [{ q: " New? ", a: "Yes." }, { q: "", a: "orphan" }]), [{ q: "New?", a: "Yes." }])
  })

  await check("a service: the Studio's words on the record's name, address, systems and photographs", () => {
    const record = services[0]
    assert.deepEqual(mergeService(record, null), record)
    const s = mergeService(record, { tagline: "Pattern pressed in.", idealClients: [], benefits: ["", "Fast"], faqs: [{ q: "Is it fast?", a: "Yes." }, { q: "No answer" }] })
    assert.equal(s.tagline, "Pattern pressed in.")
    assert.equal(s.shortDescription, record.shortDescription)
    assert.deepEqual(s.idealClients, record.idealClients)
    assert.deepEqual(s.benefits, ["Fast"])
    assert.deepEqual(s.faqs, [{ q: "Is it fast?", a: "Yes." }])
    assert.equal(s.name, record.name)
    assert.equal(s.slug, record.slug)
    assert.deepEqual(s.productsIncluded, record.productsIncluded)
  })

  console.log("the Studio's list")

  await check("the add-ons switch: shown unless Vercel says \"off\"", () => {
    for (const on of [undefined, "", "on", " ON ", "yes", "of"]) assert.equal(addonsOn(on), true, String(on))
    for (const off of ["off", " OFF ", "Off"]) assert.equal(addonsOn(off), false, off)
    assert.equal(ADDONS, addonsOn(process.env.NEXT_PUBLIC_STUDIO_ADDONS))
  })

  await check("with the add-ons switched off: the guide first, then Website Pages, Services, Projects, Blog posts, Site Settings; no Blog ideas, Job photos or Sent to Buffer", () => {
    const titles = listTitles(false)
    assert.equal(titles[0], "Start here: how to update the site")
    assert.deepEqual(titles.slice(1), ["Website Pages", "Services", "Projects", "Blog posts", "Site Settings", "Advanced"], titles.join(" | "))
    assert.ok(allTitles(false).includes("Blog posts · drafts wait here until you press Publish"))
    assert.ok(!allTitles(false).some((t) => /Buffer|go live at their set time|drafter/.test(t)), "nothing in the list names an add-on")
  })

  await check("with the add-ons, as Square One has it: the brief's order, Website Pages, Services, Projects, Blog ideas, Blog posts, Job photos, Sent to Buffer, Site Settings", () => {
    const titles = listTitles(true)
    assert.equal(titles[0], "Start here: how to update the site")
    assert.deepEqual(titles.slice(1), ["Website Pages", "Services", "Projects", "Blog ideas", "Blog posts", "Job photos", "Sent to Buffer", "Site Settings", "Advanced"], titles.join(" | "))
  })

  await check("this build's list is the one its switch says", () => {
    assert.deepEqual(listTitles(ADDONS, structure as unknown as Builder), listTitles(ADDONS))
  })

  await check("every list, at every level, has its picture, and every kind of document the same one (sanity/icons.ts)", () => {
    for (const addons of [false, true]) {
      const missing: string[] = []
      const walk = (n?: Node) => {
        for (const item of n?.items ?? []) {
          if (item.divider) continue
          if (!item.icon) missing.push(item.title ?? "?")
          // A list inside a list: its items too (Website Pages, Advanced).
          if (item.child?.items) walk(item.child)
        }
      }
      walk(listTree(addons))
      assert.deepEqual(missing, [], `no picture: ${missing.join(", ")}`)
    }
    const documents = schemaTypes.filter((t) => (t as { type?: string }).type === "document")
    assert.ok(documents.length >= 17, `${documents.length} document types`)
    for (const t of documents) {
      const { name, icon } = t as { name: string; icon?: unknown }
      assert.ok(icon, `${name} has no picture`)
      assert.equal(icon, (ICONS as Record<string, unknown>)[name], `${name}'s picture isn't its list's`)
    }
  })

  await check("the Studio's own headings stay the Studio's: its frame carries the id the rules name, no site stylesheet styles a heading by an id, and no site colour for a heading leaves its layer", () => {
    const frame = readFileSync(path.join(process.cwd(), "app/studio/[[...tool]]/Studio.tsx"), "utf8")
    assert.ok(frame.includes("id={STUDIO_ROOT_ID}") && frame.includes("{STUDIO_HEADINGS}"), "Studio.tsx puts the id and the rules on the Studio's frame")
    // No specificity, so Sanity's own muted and accent colours still win.
    assert.ok(STUDIO_HEADINGS.includes(`:where(#${STUDIO_ROOT_ID} [data-ui="Heading"]) { color: inherit; }`), "every Studio heading takes its pane's colour")
    assert.ok(/#studio h2\[data-ui="Heading"\] \{[^}]*font-size: 1\.3125rem/.test(STUDIO_HEADINGS), "a title gets Sanity's own size back")
    assert.ok(/#studio h2\[data-ui="Heading"\]\[data-testid="text-style--h2"\] \{[^}]*font-size: 2\.0625rem/.test(STUDIO_HEADINGS), "a post's Heading gets Sanity's own size back")
    assert.ok(/#studio h2\[data-ui="Text"\] \{[^}]*font-size: 0\.8125rem/.test(STUDIO_HEADINGS), "a dialog's title gets Sanity's own size back")
    for (const file of ["globals", "own", "refine", "mobile"]) {
      const css = readFileSync(path.join(process.cwd(), `app/${file}.css`), "utf8").replace(/\/\*[\s\S]*?\*\//g, "")
      // Each rule, with the @layer blocks it sits in.
      const layers: boolean[] = []
      for (const m of css.matchAll(/([^{};]*)([{};])/g)) {
        const [, head, brace] = m
        if (brace === "}") { layers.pop(); continue }
        if (brace === ";") continue
        const prelude = head.trim()
        layers.push(/^@layer\b/.test(prelude) || layers.includes(true))
        if (prelude.startsWith("@")) continue
        const end = css.indexOf("}", m.index! + m[0].length)
        const body = css.slice(m.index! + m[0].length, end)
        for (const part of prelude.split(",")) {
          // An id selector on a heading could outrank the Studio's rules (one id, one attribute, one element).
          if (/#[A-Za-z_-]/.test(part) && /(^|[\s>+~(])h[1-6]\b/.test(part)) assert.fail(`app/${file}.css styles a heading by an id: ${part.trim()}`)
          // A colour for every heading of a level, outside a layer, would outrank the colour rule above.
          if (/^h[1-6](:not\([^)]*\))*$/.test(part.trim()) && /(^|;)\s*color\s*:/.test(body) && !layers.includes(true))
            assert.fail(`app/${file}.css colours ${part.trim()} outside a layer: the Studio's headings would take it`)
        }
      }
    }
  })

  await check("Sanity's own keys work in the Studio (Escape closes, Ctrl/⌘K searches): its frame stops no key press, and the site's search shortcut stands down while the frame is on the page", () => {
    const frame = readFileSync(path.join(process.cwd(), "app/studio/[[...tool]]/Studio.tsx"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "")
    // Sanity listens for these on the window: a frame that stops a key press keeps them from it.
    assert.ok(!/stopPropagation|onKeyDown|onKeyDownCapture/.test(frame), "the Studio's frame lets key presses through")
    const nav = readFileSync(path.join(process.cwd(), "components/Nav.tsx"), "utf8")
    const shortcut = nav.slice(nav.indexOf("Cmd/Ctrl+K"), nav.indexOf("Cmd/Ctrl+K") + 600)
    assert.ok(shortcut.includes("document.getElementById(STUDIO_ROOT_ID)) return"), "the site's Ctrl/⌘K returns early while the Studio is on the page")
  })

  await check("\"new document\" offers the add-ons' types only with them on, and never a single document, a fixed set or the automation's records", () => {
    for (const t of ADDON_TYPES) {
      assert.equal(creatable(t, false), false, t)
      assert.equal(creatable(t, true), t !== "socialLog", t)
    }
    for (const t of ["post", "project", "galleryPhoto", "pageHero", "socialPost"]) assert.ok(creatable(t, false) && creatable(t, true), t)
    for (const t of ["homePage", "siteSettings", "gallerySettings", "service", "socialLog"]) assert.ok(!creatable(t, false) && !creatable(t, true), t)
  })

  await check("a post's \"Goes live by itself\" shows only with the add-ons, and when hidden never stops a Publish", async () => {
    const field = (name: string) => (postSchema.fields as unknown as { name: string; hidden?: unknown; validation?: unknown }[]).find((f) => f.name === name)!
    if (!ADDONS) {
      assert.equal(field("scheduled").hidden, true)
      const hidden = field("scheduledFor").hidden as (ctx: { parent: unknown }) => boolean
      assert.equal(hidden({ parent: { scheduled: true } }), true)
      // The rule itself: a post left scheduled with no time still publishes.
      let rule: ((value: unknown, ctx: { parent: unknown }) => unknown) | undefined
      const r = new Proxy({}, { get: (_t, prop) => (prop === "custom" ? (fn: typeof rule) => ((rule = fn), r) : () => r) })
      ;(field("scheduledFor").validation as (r: unknown) => unknown)(r)
      assert.equal(await rule!(undefined, { parent: { scheduled: true } }), true)
    } else {
      assert.notEqual(field("scheduled").hidden, true)
    }
  })

  console.log("the office's guide")

  const FREE = guideFor(false)
  const ALL = guideFor(true)

  await check("without the add-ons: three things, change a page, add gallery photos, write a post, then the basics; nothing about Buffer, job photos or going live by itself", () => {
    assert.deepEqual(
      FREE.steps.map((s) => s.id),
      ["edit-page", "gallery-photos", "own-post", "basics"],
    )
    assert.equal(FREE.title, "How to update the site")
    const text = guideText(FREE).join("\n")
    for (const word of ["Buffer", "Job photos", "Goes live by itself", "Tuesday", "social media", "drafter"]) assert.ok(!text.includes(word), `the free guide never says "${word}"`)
    assert.match(FREE.lead, /Nothing changes on the site until you press Publish\.$/)
  })

  await check("with the add-ons: the same three, then job photos, the Tuesday and Thursday drafts and Buffer, each pointing to the right step, then the basics", () => {
    assert.deepEqual(
      ALL.steps.map((s) => s.id),
      ["edit-page", "gallery-photos", "own-post", "job-photos", "drafts", "buffer", "basics"],
    )
    const buffer = ALL.steps.find((s) => s.id === "buffer")!
    assert.match(buffer.steps.join(" "), /Add to Queue/)
    assert.match(buffer.next.join(" "), /Delete/)
    const jobs = ALL.steps.find((s) => s.id === "job-photos")!.next.join(" ")
    assert.ok(jobs.includes("(step 6)") && jobs.includes("(step 5)"), jobs)
    assert.ok(!guideText(ALL).some((l) => l.includes("{step:")), "every pointer is filled in")
    assert.ok(ALL.steps.find((s) => s.id === "own-post")!.steps.some((l) => l.includes("Goes live by itself")))
  })

  await check("this build's guide is the one its switch says", () => {
    assert.deepEqual(OFFICE_GUIDE, guideFor(ADDONS))
  })

  await check("every step: what you do, then what happens next", () => {
    for (const g of [FREE, ALL]) for (const s of g.steps) assert.ok(s.steps.length >= 3 && s.next.length >= 1, s.id)
  })

  await check("every label it names in the Studio is a label the Studio prints (a renamed field fails here)", () => {
    const titles = new Set<string>()
    const walk = (v: unknown) => {
      if (Array.isArray(v)) return v.forEach(walk)
      if (v && typeof v === "object") {
        for (const [k, x] of Object.entries(v)) {
          if (k === "title" && typeof x === "string") titles.add(x)
          else walk(x)
        }
      }
    }
    walk(schemaTypes)
    for (const t of [...allTitles(false), ...allTitles(true), CONTENT_TOOL, EDIT_ON_THE_PAGE]) titles.add(t)
    // The Studio's own buttons and tabs (checked in the live Studio, 21 and
    // 23 Oct 2026), and Buffer's words: not field titles.
    const app = new Set(["+", "Publish", "Generate", "Upload", "Select", "Crop image", "Discard changes", "Draft", "Published", "Unpublish", "Structure", "Edit", "Drafts", "Add to Queue", "Delete"])
    const labels = (g: OfficeGuideContent) => [...new Set(g.steps.flatMap((s) => [...s.steps, ...s.next]).flatMap((l) => labelRuns(l).filter((r) => r.bold).map((r) => r.text)))]
    assert.ok(labels(FREE).length > 15 && labels(ALL).length > labels(FREE).length)
    for (const label of labels(ALL)) {
      if (app.has(label)) continue
      assert.ok([...titles].some((t) => t === label || t.startsWith(`${label} `) || t.startsWith(`${label},`) || t.startsWith(`${label}:`)), `"${label}" is a Studio label`)
    }
    for (const label of labels(FREE)) assert.ok(labels(ALL).includes(label) || app.has(label), label)
  })
  await check("in the house style, with the add-ons off and on: no em dash, nothing against the canon, no phone number or address", () => {
    for (const g of [FREE, ALL]) for (const line of guideText(g)) assert.deepEqual(lintCopy(line).map((i) => i.message), [], line)
  })
  await check("a page to bookmark at /studio/guide: never indexed, never in the sitemap", () => {
    assert.equal(GUIDE_PATH, "/studio/guide")
    assert.deepEqual((guideMetadata.robots as { index?: boolean }).index, false)
    assert.equal((guideMetadata.title as { absolute?: string }).absolute, `${OFFICE_GUIDE.title} | Square One Paving`)
    const vercel = JSON.parse(readFileSync(path.join(process.cwd(), "vercel.json"), "utf8")) as { headers: { source: string; headers: { key: string; value: string }[] }[] }
    const studio = vercel.headers.find((h) => h.source === "/studio/(.*)")
    assert.ok(studio?.headers.some((h) => h.key === "X-Robots-Tag" && /noindex/.test(h.value)), "vercel.json keeps /studio/* out of search")
    assert.ok(!readFileSync(path.join(process.cwd(), "app/sitemap.ts"), "utf8").includes("/studio"), "the sitemap never lists /studio")
  })
  await check("each screenshot it names, in either guide, is on disk, at the size it says", () => {
    for (const s of GUIDE_SOURCE.steps) {
      if (!s.shot) continue
      const file = path.join(process.cwd(), "public", s.shot.src)
      assert.ok(existsSync(file), s.shot.src)
      const b = readFileSync(file)
      assert.equal(b.toString("ascii", 1, 4), "PNG", `${s.shot.src} is a PNG`)
      assert.deepEqual([b.readUInt32BE(16), b.readUInt32BE(20)], [s.shot.width, s.shot.height], s.shot.src)
      assert.ok(s.shot.alt.trim().length > 10, `${s.shot.src} has alt text`)
    }
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

type Builder = (s: unknown, c: unknown) => unknown
type Node = { title?: string; items?: Node[]; child?: Node; divider?: boolean; icon?: unknown }

/**
 * The Studio's list, by running the structure against a stand-in builder
 * that records each item's title, its picture, its child and the items
 * under it.
 */
function listTree(addons: boolean, resolver?: Builder): Node {
  const chain = (node: Node): unknown =>
    new Proxy(() => undefined, {
      get(_t, prop) {
        if (prop === "__node") return node
        return (...args: unknown[]) => {
          if (prop === "title") node.title = String(args[0])
          if (prop === "icon") node.icon = args[0]
          if (prop === "items") node.items = (args[0] as { __node: Node }[]).map((i) => i.__node)
          if (prop === "child") node.child = (args[0] as { __node?: Node })?.__node
          return chain(node)
        }
      },
    })
  const S = new Proxy(
    {},
    {
      get(_t, prop) {
        return () => (prop === "divider" ? chain({ divider: true }) : chain({}))
      },
    },
  )
  const built = resolver ? resolver(S, {}) : buildStructure(S as never, addons)
  return (built as unknown as { __node: Node }).__node
}

/** The top-level items' titles. */
function listTitles(addons: boolean, resolver?: Builder): string[] {
  return (listTree(addons, resolver).items ?? []).filter((i) => !i.divider).map((i) => i.title ?? "")
}

/** Every title anywhere in the list, nested ones too. */
function allTitles(addons: boolean): string[] {
  const out: string[] = []
  const walk = (n?: Node) => {
    if (!n) return
    if (n.title) out.push(n.title)
    n.items?.forEach(walk)
    walk(n.child)
  }
  walk(listTree(addons))
  return out
}

main()
