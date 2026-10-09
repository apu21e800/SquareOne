/**
 * Tests for the Studio-backed projects (lib/projects-cms.ts): `npm run test:projects`.
 *
 * The cases are what the office will do in the Studio, and the one promise
 * that matters most: with the Studio holding exactly what the seed of
 * 7 Oct 2026 put there, every project comes out byte-for-byte as the record
 * has it, so switching the site to the Studio changes nothing anyone sees.
 * No network: the documents are built here from lib/projects.ts.
 */
import "./test-env"
import assert from "node:assert/strict"
import { projects as RECORD } from "../lib/projects"
import { mergeProjects, type ProjectDoc as Doc } from "../lib/projects-cms"

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

/** What the seed wrote for a record, photos named as the import stored them (URL-encoded). */
const seeded = (): Doc[] =>
  RECORD.map((p, i) => ({
    _createdAt: "2026-10-07T02:55:30Z",
    title: p.title,
    slug: p.slug,
    service: p.service,
    application: p.application,
    city: p.city,
    region: p.region,
    systems: p.systems,
    ...(p.year ? { year: p.year } : {}),
    ...(p.client ? { client: p.client } : {}),
    ...(p.artist ? { artist: p.artist } : {}),
    excerpt: p.excerpt,
    featured: Boolean(p.featured),
    heroWide: Boolean(p.heroWide),
    images: p.images.map((src, j) => ({
      file: encodeURI(decodeURIComponent(src.split("/").pop() ?? "")),
      asset: { _ref: `image-${i}${j}abc-2048x1536-jpg` },
    })),
  }))

const NEW: Doc = {
  _createdAt: "2026-10-20T10:00:00Z",
  title: "Plaza recoat, Port Moody",
  slug: "port-moody-plaza-recoat",
  service: "Decorative Coatings",
  application: "Streetscapes",
  city: "Port Moody, BC",
  region: "Lower Mainland",
  systems: ["StreetBond"],
  year: "2026",
  excerpt: "A plaza recoated in StreetBond.",
  images: [{ file: "IMG_0042.jpg", asset: { _ref: "image-0042def-4032x3024-jpg" } }],
}

console.log("nothing changes until someone edits")
check("no CMS (or Sanity unreachable): the record, exactly", () => assert.equal(mergeProjects(null, RECORD), RECORD))
/** What a page can see of a project: an absent field and an undefined one read the same, as do false and absent flags. */
const seen = (p: object) => {
  const o = JSON.parse(JSON.stringify(p)) as Record<string, unknown>
  for (const k of ["featured", "heroWide", "flag"]) o[k] = Boolean(o[k])
  return o
}
check("the Studio as seeded: every project exactly as the record has it", () => {
  const out = mergeProjects(seeded(), RECORD)
  assert.equal(out.length, RECORD.length)
  for (let i = 0; i < RECORD.length; i++) assert.deepEqual(seen(out[i]), seen(RECORD[i]), RECORD[i].slug)
})
check("an empty Studio: the record", () => assert.deepEqual(mergeProjects([], RECORD), RECORD))

console.log("what the office does in the Studio")
check("a new project leads the list, its photo from Sanity's CDN", () => {
  const out = mergeProjects([NEW, ...seeded()], RECORD)
  assert.equal(out[0].slug, NEW.slug)
  assert.match(out[0].imageUrl, /^https:\/\/cdn\.sanity\.io\/images\/test1234\//)
  assert.equal(out.length, RECORD.length + 1)
})
check("an edited title and summary show; the record's paragraphs stay", () => {
  const docs = seeded()
  docs[0] = { ...docs[0], title: "Rainbow intersection, Nanaimo (2025)", excerpt: "New summary." }
  const out = mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[0].slug)!
  assert.equal(out.title, "Rainbow intersection, Nanaimo (2025)")
  assert.equal(out.excerpt, "New summary.")
  assert.deepEqual(out.story, RECORD[0].story)
})
check("paragraphs typed in the Studio replace the record's", () => {
  const docs = seeded()
  docs[0] = { ...docs[0], story: ["One.", "  ", "Two."] }
  assert.deepEqual(mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[0].slug)!.story, ["One.", "Two."])
})
check("a blog post picked in the Studio replaces the record's link", () => {
  const docs = seeded()
  docs[0] = { ...docs[0], post: "some-other-post" }
  assert.equal(mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[0].slug)!.post, "some-other-post")
})
check("a photo added in the Studio comes from the CDN; the site's own stay on the site", () => {
  const docs = seeded()
  docs[0] = { ...docs[0], images: [...(docs[0].images ?? []), { file: "new-angle.jpg", asset: { _ref: "image-new-2000x1500-jpg" } }] }
  const out = mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[0].slug)!
  assert.deepEqual(out.images.slice(0, -1), RECORD[0].images)
  assert.match(out.images.at(-1)!, /cdn\.sanity\.io/)
})
check("a photo cropped in the Studio comes from the CDN, crop and all", () => {
  const docs = seeded()
  const [first, ...rest] = docs[0].images ?? []
  docs[0] = { ...docs[0], images: [{ ...first, crop: { top: 0.1, bottom: 0, left: 0, right: 0 } }, ...rest] }
  assert.match(mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[0].slug)!.imageUrl, /cdn\.sanity\.io.*rect=/)
})
check("reordered photos: the new first photo leads", () => {
  const docs = seeded()
  const i = RECORD.findIndex((p) => p.images.length > 1)
  docs[i] = { ...docs[i], images: [...(docs[i].images ?? [])].reverse() }
  assert.equal(mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[i].slug)!.imageUrl, RECORD[i].images.at(-1))
})
check("'Take off the site' hides a seeded project and a new one", () => {
  const docs = seeded()
  docs[1] = { ...docs[1], hidden: true }
  const out = mergeProjects([{ ...NEW, hidden: true }, ...docs], RECORD)
  assert.ok(!out.some((p) => p.slug === RECORD[1].slug || p.slug === NEW.slug))
  assert.equal(out.length, RECORD.length - 1)
})
check("a deleted seeded project stays (the record still has it)", () => {
  assert.equal(mergeProjects(seeded().slice(1), RECORD).length, RECORD.length)
})

console.log("nothing breaks on odd data")
check("a new project with no usable photo is left out, not shown broken", () =>
  assert.ok(!mergeProjects([{ ...NEW, images: [] }], RECORD).some((p) => p.slug === NEW.slug)))
check("a seeded project with its photos removed keeps the record's", () => {
  const docs = seeded()
  docs[0] = { ...docs[0], images: [] }
  assert.deepEqual(mergeProjects(docs, RECORD).find((p) => p.slug === RECORD[0].slug)!.images, RECORD[0].images)
})
check("an unknown service or region falls back, never breaks a page", () => {
  const out = mergeProjects([{ ...NEW, service: "Paving", region: "Mars" }], RECORD)[0]
  assert.equal(out.service, "Stamped Asphalt")
  assert.equal(out.region, "Lower Mainland")
})
check("a duplicate web address: the newest document wins, once", () => {
  const out = mergeProjects([NEW, { ...NEW, title: "Older copy", _createdAt: "2026-10-01T00:00:00Z" }], RECORD)
  assert.equal(out.filter((p) => p.slug === NEW.slug).length, 1)
  assert.equal(out[0].title, NEW.title)
})

if (failures) {
  console.log(`\n${failures} failed`)
  process.exit(1)
}
console.log("\nall passed")
