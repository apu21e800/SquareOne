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
import { structure } from "../sanity/structure"
import { vercelStegaCombine } from "@vercel/stega"
import { ABOUT_COPY, CONTACT_COPY, DRIVEWAYS_COPY, HOME_COPY, mergeAboutCopy, mergeContactCopy, mergeDrivewaysCopy, mergeFaqs, mergeHomeCopy, mergeLines, mergeSection } from "../lib/page-copy"
import { mergeService } from "../lib/services-cms"
import { services } from "../lib/services"

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

  await check("in the brief's order: Website Pages, Services, Projects, Blog, Site Settings", () => {
    const titles = topLevelTitles()
    const want = ["Website Pages", "Services", "Projects", "Blog plan", "Blog", "From the field", "Social drafts", "Site Settings"]
    const present = want.filter((t) => titles.includes(t))
    assert.deepEqual(titles.filter((t) => want.includes(t)), present, titles.join(" | "))
    for (const t of ["Website Pages", "Services", "Projects", "Blog", "Site Settings"]) assert.ok(titles.includes(t), `${t} is in the list`)
    assert.equal(titles[titles.length - 1], "Advanced", "the older slots stay last")
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

/**
 * The titles of the Studio list's top-level items, by running the structure
 * against a stand-in builder that records each item's title.
 */
function topLevelTitles(): string[] {
  type Node = { title?: string; items?: Node[]; divider?: boolean }
  const chain = (node: Node): unknown =>
    new Proxy(() => undefined, {
      get(_t, prop) {
        if (prop === "__node") return node
        return (...args: unknown[]) => {
          if (prop === "title") node.title = String(args[0])
          if (prop === "items") node.items = (args[0] as { __node: Node }[]).map((i) => i.__node)
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
  const root = (structure as unknown as (s: unknown, c: unknown) => { __node: Node })(S, {}).__node
  return (root.items ?? []).filter((i) => !i.divider).map((i) => i.title ?? "")
}

main()
