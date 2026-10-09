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
const projects = OPENERS.find((o) => o.page === "/projects")!
check("a new photograph comes from the CDN, with its own words and never the old caption", () => {
  const v = mergeOpener(projects, { page: "/projects", image: { asset: { _ref: "image-new-3000x2000-jpg" } }, file: "IMG_1234.jpg", alt: "A new crosswalk" })
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
  const v = mergeOpener(projects, { page: "/projects", headline: "Our work", headlineEnd: "across BC", line: "New line." })
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

if (failures) {
  console.log(`\n${failures} failed`)
  process.exit(1)
}
console.log("\nall passed")
