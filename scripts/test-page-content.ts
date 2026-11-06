/**
 * Tests for what the office edits in the Studio's "Home page", "Page
 * openers" and "Gallery photos" (lib/page-content.ts, lib/work-cms.ts):
 * `npm run test:pages`.
 *
 * The promise that matters most: with the Studio holding exactly what the
 * seed copies in (scripts/cms-seed.ts), every page renders as it does today.
 * No network: the documents are built here.
 */
import "./test-env"
import assert from "node:assert/strict"
import { OPENERS } from "../lib/openers"
import { HERO_HEADLINE, HERO_HEADLINE_END, HERO_LINE, HERO_SLIDES } from "../lib/hero-slides"
import { mergeHome, mergeOpener, type PageHeroDoc } from "../lib/page-content"
import { mergeWork, photoPath, type GalleryPhotoDoc } from "../lib/work-cms"
import { getWork } from "../lib/work"
import { pinnedFirst } from "../lib/pin"
import { FEATURED_ORDER, UNDER_THE_LEAD, selectedWork } from "../lib/selected-work"
import { postDate, postYear } from "../lib/dates"

let failures = 0
function check(name: string, fn: () => void) {
  try {
    fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

/** A photograph as the seed's import stores it: the file name URL-encoded, no crop, no hotspot. */
const seededImage = (src: string, n = 0) => ({
  image: { asset: { _ref: `image-${n}abc-2048x1365-jpg` } },
  file: encodeURIComponent(decodeURIComponent(src.split("/").pop() ?? "")),
})

const seededOpener = (o: (typeof OPENERS)[number], n: number): PageHeroDoc => ({
  page: o.page,
  ...seededImage(o.src, n),
  alt: o.alt,
  caption: o.caption,
  headline: o.head,
  headlineEnd: o.tail,
  line: o.lede,
})

const shown = (v: ReturnType<typeof mergeOpener>) => ({ ...v, headlineSet: undefined })

console.log("page openers: nothing changes until someone edits")
check("no Studio document: each page's own opener", () => {
  for (const o of OPENERS) {
    const v = mergeOpener(o, null)
    assert.equal(v.src, o.src)
    assert.equal(v.fit, [o.head, o.tail].filter(Boolean).join(" "))
  }
})
check("the Studio as seeded: every opener exactly as the page has it", () => {
  OPENERS.forEach((o, i) => assert.deepEqual(shown(mergeOpener(o, seededOpener(o, i))), shown(mergeOpener(o, null)), o.page))
})

console.log("page openers: what the office does")
const projects = OPENERS.find((o) => o.page === "/blog")!
check("a new photograph comes from the CDN, with its own words and never the old caption", () => {
  const v = mergeOpener(projects, { page: "/blog", image: { asset: { _ref: "image-new-3000x2000-jpg" } }, file: "IMG_1234.jpg", alt: "A new crosswalk" })
  assert.match(v.src, /^https:\/\/cdn\.sanity\.io\/images\/test1234\//)
  assert.equal(v.alt, "A new crosswalk")
  assert.equal(v.caption, undefined)
  assert.equal(v.position, "center")
})
check("dragging the focal point frames the page's own photograph, still served from the site", () => {
  const v = mergeOpener(projects, { ...seededOpener(projects, 1), image: { ...seededImage(projects.src).image, hotspot: { x: 0.3, y: 0.71 } } })
  assert.equal(v.src, projects.src)
  assert.equal(v.position, "30% 71%")
})
check("cropping the page's own photograph serves the cropped one from the CDN", () => {
  const v = mergeOpener(projects, { ...seededOpener(projects, 1), image: { ...seededImage(projects.src).image, crop: { top: 0.1 } } })
  assert.match(v.src, /cdn\.sanity\.io.*rect=/)
})
check("a new headline, ending and line show; the photograph stays", () => {
  const v = mergeOpener(projects, { page: "/blog", headline: "Our work", headlineEnd: "across BC", line: "New line." })
  assert.equal(v.head, "Our work")
  assert.equal(v.tail, "across BC")
  assert.equal(v.lede, "New line.")
  assert.equal(v.fit, "Our work across BC")
  assert.equal(v.src, projects.src)
  assert.ok(v.headlineSet)
})
check("a headline with no ending shows alone", () => assert.equal(mergeOpener(projects, { headline: "Projects" }).tail, undefined))
check("a caption fixed without a new photograph applies to the page's own", () =>
  assert.equal(mergeOpener(projects, { caption: "Saanich · StreetBond" }).caption, "Saanich · StreetBond"))
check("a record page (a service) keeps its own when the Studio has nothing", () => {
  const d = { page: "/services/stamped-asphalt", label: "Stamped asphalt", src: "/images/x.jpg", alt: "x", head: "Stamped asphalt", lede: "Tag" }
  const v = mergeOpener(d, null)
  assert.equal(v.head, "Stamped asphalt")
  assert.equal(v.tail, undefined)
  assert.equal(v.lede, "Tag")
  assert.ok(!v.headlineSet)
})

console.log("the home page")
const seededHome = {
  headline: HERO_HEADLINE,
  headlineEnd: HERO_HEADLINE_END,
  line: HERO_LINE,
  reel: HERO_SLIDES.map((s, i) => ({ ...seededImage(s.src, i), alt: s.alt, caption: [s.place, s.system, s.year].filter(Boolean).join(" · ") })),
}
const caption = (s: { caption?: string; place: string; system: string; year?: string }) => s.caption ?? [s.place, s.system, s.year].filter(Boolean).join(" · ")
check("no Home page document: nothing changes", () => assert.deepEqual(mergeHome(HERO_SLIDES, null), { line: undefined }))
check("the Studio as seeded: the same reel, headline and line", () => {
  const h = mergeHome(HERO_SLIDES, seededHome)
  assert.equal(h.slides?.length, HERO_SLIDES.length)
  h.slides!.forEach((s, i) => {
    const b = HERO_SLIDES[i]
    assert.deepEqual([s.src, s.alt, s.position, caption(s)], [b.src, b.alt, b.position, caption(b)], b.src)
  })
  assert.equal(h.title, HERO_HEADLINE)
  assert.equal(h.titleEnd, HERO_HEADLINE_END)
  assert.equal(h.line, HERO_LINE)
})
check("a photograph added to the reel comes from the CDN with its caption", () => {
  const h = mergeHome(HERO_SLIDES, { reel: [...seededHome.reel, { image: { asset: { _ref: "image-n-2400x1600-jpg" } }, file: "new.jpg", alt: "New", caption: "Langford · StreetBond · 2026" }] })
  const last = h.slides!.at(-1)!
  assert.match(last.src, /cdn\.sanity\.io/)
  assert.equal(caption(last), "Langford · StreetBond · 2026")
})
check("reordering the reel reorders the hero", () => {
  const h = mergeHome(HERO_SLIDES, { reel: [...seededHome.reel].reverse() })
  assert.equal(h.slides![0].src, HERO_SLIDES.at(-1)!.src)
})
check("an emptied reel gives the site's own back", () => assert.equal(mergeHome(HERO_SLIDES, { reel: [] }).slides, undefined))

console.log("the galleries")
const record = getWork()
const crosswalks = record.filter((p) => p.app === "crosswalks")
const photo = (over: Partial<GalleryPhotoDoc>): GalleryPhotoDoc => ({
  image: { asset: { _ref: "image-g1-3000x2000-jpg" } },
  dims: { width: 3000, height: 2000 },
  gallery: "crosswalks",
  subject: "Decorative crosswalk",
  place: "Langford",
  region: "Vancouver Island",
  systems: ["TrafficPatternsXD"],
  ...over,
})
const of = (all: typeof record, app: string) => all.filter((p) => p.app === app)
check("nothing in the Studio: the galleries exactly as they ship", () => assert.equal(mergeWork(record, null, null), record))
check("a new photograph goes just after the gallery's first, so its face doesn't change", () => {
  const g = of(mergeWork(record, [photo({})], null), "crosswalks")
  assert.equal(g[0].src, crosswalks[0].src)
  assert.match(g[1].src, /cdn\.sanity\.io/)
  assert.equal(g.length, crosswalks.length + 1)
  assert.equal(g[1].w, 2400)
  assert.equal(g[1].h, 1600)
  assert.ok(g[1].hires)
})
check("'Lead the gallery' puts it first", () => assert.match(of(mergeWork(record, [photo({ lead: true })], null), "crosswalks")[0].src, /cdn\.sanity\.io/))
check("'Take off the site' keeps it off", () => assert.equal(of(mergeWork(record, [photo({ hidden: true })], null), "crosswalks").length, crosswalks.length))
check("a photograph that came with the site comes off by its pasted address", () => {
  const target = crosswalks[2]
  const pasted = `https://www.squareonepaving.com/_next/image?url=${encodeURIComponent(decodeURIComponent(target.src))}&w=1920&q=75`
  const g = of(mergeWork(record, null, [pasted]), "crosswalks")
  assert.ok(!g.some((p) => p.src === target.src))
  assert.equal(g.length, crosswalks.length - 1)
})
check("other galleries are untouched by a crosswalk photograph", () => {
  const merged = mergeWork(record, [photo({})], null)
  for (const app of ["driveways", "parking-lots", "public-art"]) assert.deepEqual(of(merged, app), of(record, app), app)
})
check("odd data is left out, not shown broken", () => {
  const merged = mergeWork(record, [photo({ gallery: "airports" }), photo({ subject: "  " }), photo({ dims: null }), photo({ region: "Mars" })], null)
  assert.equal(merged.length, record.length + 1)
  assert.equal(merged.find((p) => p.src.includes("cdn.sanity.io"))?.region, undefined)
})
check("a pasted address in any form reduces to the site's path", () => {
  assert.equal(photoPath("https://www.squareonepaving.com/_next/image?url=%2Fimages%2Fa%2520b.jpg&w=1920&q=75"), "/images/a b.jpg")
  assert.equal(photoPath("/images/a%20b.jpg"), "/images/a b.jpg")
  assert.equal(photoPath("images/a b.jpg"), "/images/a b.jpg")
  assert.equal(photoPath("https://www.squareonepaving.com/images/a%20b.jpg"), "/images/a b.jpg")
})

console.log("the pinned post (Selected work, /blog)")
// A post as the lists see it: a slug and, for a pin, Publish's stamp. A
// post made from the record has no stamp, so an unstamped pin counts from its date and any
// stamped pin beats it.
const project = (slug: string, pin?: { pinnedAt?: string }) => ({ slug, title: slug, ...(pin ? { pinned: true, ...pin } : {}) })
const newestFirst = [project("e"), project("d"), project("c"), project("b"), project("a")]
check("no pin: the order is as it came, and nothing reads as pinned", () => {
  const listed = pinnedFirst(newestFirst)
  assert.deepEqual(listed.map((p) => p.slug), ["e", "d", "c", "b", "a"])
  assert.ok(listed.every((p) => !p.pinned))
})
check("one pin: that project first with the label, the rest in their order, never twice", () => {
  const projects = [newestFirst[0], newestFirst[1], project("c", { pinnedAt: "2026-11-01T17:00:00.000Z" }), newestFirst[3], newestFirst[4]]
  const listed = pinnedFirst(projects)
  assert.deepEqual(listed.map((p) => p.slug), ["c", "e", "d", "b", "a"])
  assert.deepEqual(listed.map((p) => Boolean(p.pinned)), [true, false, false, false, false])
  assert.equal(new Set(listed.map((p) => p.slug)).size, projects.length)
})
check("two pins: the newest pin goes on top, and the older one reads as an ordinary project in its place", () => {
  const projects = [newestFirst[0], project("d", { pinnedAt: "2026-10-31T09:00:00.000Z" }), newestFirst[2], project("b", { pinnedAt: "2026-11-02T09:00:00.000Z" }), newestFirst[4]]
  const listed = pinnedFirst(projects)
  assert.deepEqual(listed.map((p) => p.slug), ["b", "e", "d", "c", "a"])
  assert.deepEqual(listed.map((p) => Boolean(p.pinned)), [true, false, false, false, false])
})
check("a pin with no stamp yields to any stamped pin", () => {
  const projects = [project("e", {}), newestFirst[1], project("a", { pinnedAt: "2026-11-03T20:00:00.000Z" })]
  assert.deepEqual(pinnedFirst(projects).map((p) => p.slug), ["a", "e", "d"])
})
check("the list it was given is left as it was", () => {
  const projects = [newestFirst[0], project("c", { pinnedAt: "2026-11-01T17:00:00.000Z" })]
  pinnedFirst(projects)
  assert.deepEqual(projects.map((p) => p.slug), ["e", "c"])
  assert.equal(projects[1].pinned, true)
})

console.log("Selected work on the home page (lib/selected-work.ts): the pin, else the newest, then three")
// Posts as getPosts hands them over, newest first, each with a photograph unless it says otherwise.
type Card = { slug: string; title: string; date: string; featured_image: string; pinned?: boolean; pinnedAt?: string; job?: { featured?: boolean } }
const card = (slug: string, more: Partial<Card> = {}): Card => ({ slug, title: slug, date: "2026-10-01", featured_image: `/images/${slug}.jpg`, ...more })
const order = ["a", "b", "c", "d"]
const latest = [card("new", { date: "2026-11-03" }), card("x"), card("a"), card("b"), card("c"), card("d")]
check("no pin: the newest leads, unlabelled; under it the first three of the order", () => {
  const { lead, rest } = selectedWork(latest, order)
  assert.equal(lead?.slug, "new")
  assert.ok(!lead?.pinned)
  assert.deepEqual(rest.map((p) => p.slug), ["a", "b", "c"])
  assert.ok(rest.every((p) => !p.pinned))
})
check("a pin leads with its label, however old it is", () => {
  const { lead, rest } = selectedWork([...latest, card("old", { date: "2025-01-01", pinned: true })], order)
  assert.equal(lead?.slug, "old")
  assert.equal(lead?.pinned, true)
  assert.deepEqual(rest.map((p) => p.slug), ["a", "b", "c"])
})
check("a pinned job from the order leads and is not shown twice; the next in the order takes its place", () => {
  const posts = latest.map((p) => (p.slug === "b" ? { ...p, pinned: true, pinnedAt: "2026-11-05T17:00:00.000Z" } : p))
  const { lead, rest } = selectedWork(posts, order)
  assert.equal(lead?.slug, "b")
  assert.deepEqual(rest.map((p) => p.slug), ["a", "c", "d"])
})
check("an older pin among the three reads as an ordinary post", () => {
  const posts = latest.map((p) =>
    p.slug === "a" ? { ...p, pinned: true, pinnedAt: "2026-10-01T09:00:00.000Z" } : p.slug === "x" ? { ...p, pinned: true, pinnedAt: "2026-11-02T09:00:00.000Z" } : p,
  )
  const { lead, rest } = selectedWork(posts, order)
  assert.equal(lead?.slug, "x")
  assert.deepEqual(rest.map((p) => [p.slug, Boolean(p.pinned)]), [["a", false], ["b", false], ["c", false]])
})
check("no photograph, no place: never the lead, never in the row", () => {
  const posts = [card("bare", { date: "2026-11-05", featured_image: "" }), ...latest.map((p) => (p.slug === "a" ? { ...p, featured_image: "" } : p))]
  const { lead, rest } = selectedWork(posts, order)
  assert.equal(lead?.slug, "new")
  assert.deepEqual(rest.map((p) => p.slug), ["b", "c", "d"])
})
check("slugs gone from the order: the ones left, then the Studio's Featured, then the newest; the row is never short", () => {
  const posts = [card("new", { date: "2026-11-03" }), card("x"), card("f", { job: { featured: true } }), card("a")]
  assert.deepEqual(selectedWork(posts, order).rest.map((p) => p.slug), ["a", "f", "x"])
})
check("nothing with a photograph: nothing to show", () => {
  assert.deepEqual(selectedWork([card("bare", { featured_image: "" })], order), { lead: undefined, rest: [] })
})
check("the live order: six different jobs, three show under the lead", () => {
  assert.equal(new Set(FEATURED_ORDER).size, FEATURED_ORDER.length)
  assert.ok(FEATURED_ORDER.length > UNDER_THE_LEAD, "spares for when one leads")
  assert.equal(UNDER_THE_LEAD, 3)
})

console.log("a post's date prints the day the office wrote, in any time zone (lib/dates.ts)")
check("in Vancouver, 2026-11-05 is November 5, 2026 (the browser's own way said November 4)", () => {
  const was = process.env.TZ
  process.env.TZ = "America/Vancouver"
  try {
    assert.equal(new Date("2026-11-05").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }), "November 4, 2026", "the bug this guards against")
    assert.equal(postDate("2026-11-05"), "November 5, 2026")
    assert.equal(postYear("2026-01-01"), "2026")
  } finally {
    if (was === undefined) delete process.env.TZ
    else process.env.TZ = was
  }
})
check("the same in UTC; no date or a bad one prints nothing", () => {
  assert.equal(postDate("2026-11-05"), "November 5, 2026")
  assert.equal(postDate("not a date"), "")
  assert.equal(postYear(undefined), "")
  assert.equal(postYear(""), "")
})

if (failures) {
  console.log(`\n${failures} failed`)
  process.exit(1)
}
console.log("\nall passed")
