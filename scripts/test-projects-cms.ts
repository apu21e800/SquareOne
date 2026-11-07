/**
 * Tests for the jobs as posts (lib/blog.ts, lib/projects-cms.ts): `npm run test:projects`.
 *
 * 6 Nov 2026 (Vern: "Projects and blog should be combined into the same
 * thing, not two separate sections"): a job is a blog post that carries its
 * facts. The cases are what the office will do in the Studio, and the two
 * promises that matter most: with no Studio at all, every record project
 * comes out as a post at its post's address with the record's facts and
 * photographs; and a Studio post that says nothing of a job yet still
 * carries the record's. No network: the documents are built here from
 * lib/projects.ts and content/blog.
 */
import "./test-env"
import assert from "node:assert/strict"
import { RECORD_POST_DATE, postSlugOf, projects as RECORD, recordOnlyProjects } from "../lib/projects"
import { getAllPosts, getPostBySlug, mergePosts, postFromRecord, type BlogPostMeta, type CmsPostDoc } from "../lib/blog"
import { projectOf, projectsFrom } from "../lib/projects-cms"
import { pinnedFirst } from "../lib/pin"
import { vercelStegaCombine } from "@vercel/stega"

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

const files = getAllPosts()
const own = recordOnlyProjects()
const named = RECORD.filter((p) => p.post)
const file = (slug: string) => files.find((p) => p.slug === slug)!
const encodedName = (src: string) => encodeURI(decodeURIComponent(src.split("/").pop() ?? ""))

/** The Studio's post of a record project as the migration writes it (scripts/merge-projects-into-posts.ts): the post's own words, the job's fields and photographs. */
const migrated = (p: (typeof RECORD)[number], i: number): CmsPostDoc => {
  const post = file(postSlugOf(p))
  return {
    _id: `post-${postSlugOf(p)}`,
    _type: "post",
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.description,
    tags: post.tags,
    mainImage: { asset: { _ref: `image-lead${i}abc-2048x1536-jpg` } },
    mainFile: encodedName(post.featured_image),
    body: [],
    service: p.service,
    application: p.application,
    city: p.city,
    region: p.region,
    systems: p.systems,
    ...(p.year ? { year: p.year } : {}),
    ...(p.client ? { client: p.client } : {}),
    ...(p.artist ? { artist: p.artist } : {}),
    featured: Boolean(p.featured),
    gallery: p.images.filter((src) => encodedName(src) !== encodedName(post.featured_image)).map((src, j) => ({ _key: `g${j}`, file: encodedName(src), asset: { _ref: `image-g${i}x${j}abc-2048x1536-jpg` } })),
  }
}

const GUIDE: CmsPostDoc = { _id: "post-a-guide", _type: "post", title: "How a crossing goes down", slug: "how-a-crossing-goes-down", date: "2026-11-02", category: "Guides", excerpt: "A guide.", body: [], mainImage: { asset: { _ref: "image-guide-1600x900-jpg" } } }

const NEW: CmsPostDoc = {
  _id: "abc123",
  _type: "post",
  title: "Plaza recoat, Port Moody",
  slug: "port-moody-plaza-recoat",
  date: "2026-11-04",
  category: "Streetscapes",
  excerpt: "A plaza recoated in StreetBond.",
  body: [],
  mainImage: { asset: { _ref: "image-0042def-4032x3024-jpg" }, hotspot: { x: 0.3, y: 0.7, width: 0.2, height: 0.2 } },
  mainFile: "IMG_0042.jpg",
  service: "Decorative Coatings",
  application: "Streetscapes",
  city: "Port Moody, BC",
  region: "Lower Mainland",
  systems: ["StreetBond"],
  year: "2026",
  gallery: [{ _key: "g0", file: "IMG_0043.jpg", asset: { _ref: "image-0043def-4032x3024-jpg" }, alt: "The plaza from the steps" }],
}

console.log("the record, told as posts")
check("every record project is a post at its post's address, with the record's facts", () => {
  const jobs = projectsFrom(files)
  assert.equal(jobs.length, RECORD.length)
  for (const p of RECORD) {
    const job = jobs.find((j) => j.slug === postSlugOf(p))!
    assert.ok(job, p.slug)
    assert.equal(job.city, p.city)
    assert.equal(job.service, p.service)
    assert.equal(job.application, p.application)
    assert.deepEqual(job.systems, p.systems)
    assert.equal(job.year, p.year)
    assert.equal(job.artist, p.artist)
    assert.equal(job.featured, p.featured)
    assert.equal(job.title, p.title, "the job's short name in lists is the record's, whatever its post's headline")
  }
})
check("a project with no post of its own is a post made from its record: its title, summary, paragraphs, photographs and the launch day's date", () => {
  assert.ok(own.length > 0)
  for (const p of own) {
    const post = file(p.slug)
    assert.equal(post.title, p.title)
    assert.equal(post.description, p.excerpt)
    assert.equal(post.date, RECORD_POST_DATE)
    assert.equal(post.featured_image, p.images[0])
    assert.deepEqual(post.job?.photos.slice(0, p.images.length - 1), p.images.slice(1))
    assert.ok(post.tags.includes("Project stories"))
    const full = getPostBySlug(p.slug)!
    assert.ok(full.content.startsWith(p.excerpt))
    for (const paragraph of p.story ?? []) assert.ok(full.content.includes(paragraph))
  }
  assert.deepEqual(postFromRecord(own[0]).job?.systems, own[0].systems)
})
check("a post that tells a record project keeps its own lead photograph; the project's other photographs follow, its hero among them when the post leads with another", () => {
  for (const p of named) {
    const post = file(p.post!)
    assert.ok(post.job, p.post)
    const lead = encodedName(post.featured_image)
    for (const src of p.images) {
      if (encodedName(src) === lead) assert.ok(!post.job!.photos.includes(src), "the lead is not repeated")
      else assert.ok(post.job!.photos.includes(src), `${p.slug}: ${src} kept`)
    }
  }
})
check("a post that tells no job has none", () => {
  const guides = files.filter((p) => !p.job)
  assert.ok(guides.length > 0)
  assert.equal(projectsFrom(guides).length, 0)
})
check("every job lists under its post's address, lead photograph first", () => {
  for (const job of projectsFrom(files)) {
    assert.equal(job.post, job.slug)
    assert.equal(job.images[0], job.imageUrl)
    assert.ok(job.imageUrl)
  }
})

console.log("nothing changes until someone edits")
check("no CMS (or Sanity unreachable): the files and the record, exactly", () => assert.deepEqual(mergePosts(null, files), [...files].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
check("an empty Studio: the same", () => assert.deepEqual(mergePosts([], files), mergePosts(null, files)))
check("a file marked unlisted hides the Studio's copy of the same slug too (7 Nov 2026, Windsor Gate phase two)", () => {
  const p = named[0]
  const doc: CmsPostDoc = { ...migrated(p, 0), slug: "windsor-gate-townhouse-driveway-2", title: "Windsor Gate, phase two" }
  assert.ok(mergePosts([doc], files).some((x) => x.slug === doc.slug), "listed when nothing says otherwise")
  const out = mergePosts([doc], files, false, new Set([doc.slug]))
  assert.ok(!out.some((x) => x.slug === doc.slug), "left out when its file is unlisted")
  assert.equal(out.length, files.length, "nothing else changes")
  assert.ok(!files.some((x) => x.slug === doc.slug), "the file itself is already off the list")
})
check("the Studio as the migration leaves it: every job as before, photographs served from the site", () => {
  const out = projectsFrom(mergePosts(RECORD.map(migrated), files))
  const before = projectsFrom(files)
  assert.equal(out.length, before.length)
  for (const b of before) {
    const a = out.find((x) => x.slug === b.slug)!
    assert.ok(a, b.slug)
    assert.equal(a.imageUrl, b.imageUrl, `${b.slug}: the lead photograph, the site's own file`)
    assert.deepEqual([...a.images].sort(), [...b.images].sort(), `${b.slug}: the same photographs`)
    assert.equal(a.city, b.city)
    assert.deepEqual(a.systems, b.systems)
    assert.equal(a.year, b.year)
  }
})
check("a Studio post that says nothing of a job yet carries the record's facts for its address", () => {
  const p = named[0]
  const doc: CmsPostDoc = { ...migrated(p, 0), service: null, application: null, city: null, region: null, systems: null, year: null, artist: null, client: null, featured: null, gallery: null }
  const post = mergePosts([doc], files).find((x) => x.slug === p.post)!
  assert.equal(post.job?.city, p.city)
  assert.deepEqual(post.job?.systems, p.systems)
  assert.equal(post.job?.year, p.year)
  assert.ok(post.job?.photos.length)
})

console.log("what the office does in the Studio")
check("a fact edited in the Studio is what the site shows; the record fills the rest", () => {
  const p = named[0]
  const doc: CmsPostDoc = { ...migrated(p, 0), city: "Elsewhere, BC", year: "2031", systems: null, artist: "A. Designer", jobTitle: "A shorter name" }
  const job = projectOf(mergePosts([doc], files).find((x) => x.slug === p.post)!)!
  assert.equal(job.title, "A shorter name")
  assert.equal(job.city, "Elsewhere, BC")
  assert.equal(job.year, "2031")
  assert.equal(job.artist, "A. Designer")
  assert.deepEqual(job.systems, p.systems, "untouched: the record's")
})
check("half a job: with a record behind it, the record fills what is missing; with none, a guide until the job is whole", () => {
  const p = named[0]
  const half: CmsPostDoc = { ...migrated(p, 0), service: null, application: null, city: "Elsewhere, BC", systems: ["DuraTherm"], gallery: null }
  const job = mergePosts([half], files).find((x) => x.slug === p.post)!.job!
  assert.equal(job.city, "Elsewhere, BC", "the Studio's")
  assert.equal(job.service, p.service, "the record's")
  assert.deepEqual(job.systems, ["DuraTherm"])
  const fresh: CmsPostDoc = { ...GUIDE, city: "Elsewhere, BC" }
  assert.equal(mergePosts([fresh], files).find((x) => x.slug === GUIDE.slug)!.job, undefined, "no record behind it: a guide until the job is whole")
})
check("a new job added in the Studio: a post with its job, listed first, its photographs from the CDN with the office's focal point and words", () => {
  const posts = mergePosts([NEW], files)
  assert.equal(posts[0].slug, NEW.slug, "newest first")
  const job = projectOf(posts[0])!
  assert.equal(job.city, "Port Moody, BC")
  assert.match(job.imageUrl, /cdn\.sanity\.io/)
  assert.equal(job.images.length, 2)
  assert.match(job.images[1], /cdn\.sanity\.io/)
  assert.equal(job.photoMeta?.[job.images[1]]?.alt, "The plaza from the steps")
  assert.ok(job.photoMeta?.[job.imageUrl]?.position, "the lead's focal point")
})
check("a Studio photograph that is the site's own file is served from the site; cropped, from the CDN", () => {
  const p = named[0]
  const same = projectOf(mergePosts([migrated(p, 0)], files).find((x) => x.slug === p.post)!)!
  assert.ok(same.images.every((src) => !/cdn\.sanity\.io/.test(src)), same.images.join(" "))
  const doc = migrated(p, 0)
  doc.gallery = doc.gallery!.map((g, i) => (i === 0 ? { ...g, crop: { top: 0.1, bottom: 0, left: 0, right: 0 } } : g))
  const cropped = projectOf(mergePosts([doc], files).find((x) => x.slug === p.post)!)!
  assert.match(cropped.images[1], /cdn\.sanity\.io.*rect=/)
})
check("a Studio post without a lead photograph has its page but no place in the lists that show the work", () => {
  const doc: CmsPostDoc = { ...NEW, mainImage: undefined, mainFile: null }
  const posts = mergePosts([doc], files)
  assert.ok(posts.some((x) => x.slug === NEW.slug))
  assert.ok(!projectsFrom(posts).some((x) => x.slug === NEW.slug))
})
check("the Studio's post wins over the file of the same address; a guide stays a guide", () => {
  const p = named[0]
  const posts = mergePosts([{ ...migrated(p, 0), title: "Retitled in the Studio" }, GUIDE], files)
  assert.equal(posts.filter((x) => x.slug === p.post).length, 1)
  assert.equal(posts.find((x) => x.slug === p.post)!.title, "Retitled in the Studio")
  assert.equal(posts.find((x) => x.slug === GUIDE.slug)!.job, undefined)
})

console.log("Pin to top (lib/pin.ts): the newest pin leads Selected work and /blog, once")
check("the pin is the Studio's alone, its stamp cleaned of the preview's marks; the record never has one", () => {
  const p = named[0]
  // As Edit on the page marks a Studio value (sanity/lib/stega.ts).
  const docs: CmsPostDoc[] = [{ ...migrated(p, 0), pinned: true, pinnedAt: vercelStegaCombine("2026-11-05T18:00:00.000Z", { origin: "sanity.io", href: "/studio" }) }, GUIDE]
  const posts = mergePosts(docs, files)
  assert.equal(posts.find((x) => x.slug === p.post)!.pinned, true)
  assert.equal(posts.find((x) => x.slug === p.post)!.pinnedAt, "2026-11-05T18:00:00.000Z")
  assert.ok(files.every((x) => !x.pinned))
})
check("the newest pin leads, marked once; an older pin reads as an ordinary post", () => {
  const [a, b] = named
  const docs: CmsPostDoc[] = [
    { ...migrated(a, 0), pinned: true, pinnedAt: "2026-11-01T17:00:00.000Z" },
    { ...migrated(b, 1), pinned: true, pinnedAt: "2026-11-05T17:00:00.000Z" },
  ]
  const listed: BlogPostMeta[] = pinnedFirst(mergePosts(docs, files))
  assert.equal(listed[0].slug, b.post)
  assert.equal(listed[0].pinned, true)
  assert.equal(listed.filter((x) => x.pinned).length, 1)
  assert.equal(listed.filter((x) => x.slug === b.post).length, 1, "never twice")
  // The lists that show the work keep the record's order and put the pin first themselves (components/sections/ProjectsPreview.tsx).
  const jobs = pinnedFirst(projectsFrom(listed))
  assert.equal(jobs[0].slug, b.post)
  assert.equal(jobs[0].pinned, true)
  assert.equal(jobs.filter((x) => x.pinned).length, 1)
})

if (failures) {
  console.log(`\n${failures} failed`)
  process.exit(1)
}
console.log("\nall passed")
