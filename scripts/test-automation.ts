/**
 * Tests for the parts of the blog and social automation that guard it:
 * `npm run test:automation`. The cron gate (nobody in without CRON_SECRET)
 * and the drafter's subjects (the Studio's version of a project, as the site
 * shows it; never one taken off the site). No network: the store is a fake.
 */
import "./test-env"
import assert from "node:assert/strict"
import { NextRequest } from "next/server"
import { cronGate } from "../lib/automation/cron"
import { loadSubjects } from "../lib/automation/facts"
import type { Store } from "../lib/automation/services"
import { projects as RECORD } from "../lib/projects"

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

const req = (auth?: string) =>
  new NextRequest("https://www.squareonepaving.com/api/cron/draft-post", auth ? { headers: { authorization: auth } } : undefined)

/** A store that answers the drafter's one query with these Studio projects. */
const store = (studio: unknown[]): Store => ({
  fetch: async <T,>() => studio as T,
  create: async () => {},
  createOrReplace: async () => {},
  uploadImage: async () => null,
})

const seeded = (p: (typeof RECORD)[number], i: number) => ({
  slug: p.slug,
  title: p.title,
  application: p.application,
  service: p.service,
  systems: p.systems,
  city: p.city,
  region: p.region,
  ...(p.year ? { year: p.year } : {}),
  excerpt: p.excerpt,
  images: p.images.map((src, j) => ({ asset: `image-${i}-${j}`, alt: p.title, file: encodeURI(decodeURIComponent(src.split("/").pop() ?? "")) })),
  _createdAt: "2026-10-07T02:55:30Z",
})

async function main() {
  console.log("the cron gate")
  const saved = process.env.CRON_SECRET
  delete process.env.CRON_SECRET
  await check("no CRON_SECRET: everyone refused, nothing said about why", async () => {
    const res = cronGate(req("Bearer anything"), "test", [])
    assert.equal(res?.status, 401)
    assert.ok(!JSON.stringify(await res?.json()).includes("CRON_SECRET"))
  })
  process.env.CRON_SECRET = "s3cret-for-tests"
  await check("a wrong or missing secret: 401", () => {
    assert.equal(cronGate(req("Bearer wrong"), "test", [])?.status, 401)
    assert.equal(cronGate(req(), "test", [])?.status, 401)
  })
  await check("the right secret with a key missing: does nothing and says so", async () => {
    const res = cronGate(req("Bearer s3cret-for-tests"), "test", ["SOME_KEY_THAT_IS_NOT_SET"])
    assert.equal(res?.status, 200)
    assert.match(JSON.stringify(await res?.json()), /not switched on/)
  })
  await check("the right secret and every key: through the gate", () => {
    process.env.AUTOMATION_TEST_KEY = "x"
    assert.equal(cronGate(req("Bearer s3cret-for-tests"), "test", ["AUTOMATION_TEST_KEY"]), null)
  })
  if (saved === undefined) delete process.env.CRON_SECRET
  else process.env.CRON_SECRET = saved

  console.log("what the drafter writes from")
  await check("the Studio as seeded: the record's words, the Studio's photos with their web paths", async () => {
    const subjects = await loadSubjects(store(RECORD.map(seeded)))
    const first = subjects.find((s) => s.slug === RECORD[0].slug)!
    assert.equal(first.title, RECORD[0].title)
    assert.deepEqual(first.story, RECORD[0].story ?? [])
    assert.deepEqual(first.photos.map((p) => p.src), RECORD[0].images)
    assert.ok(first.photos.every((p) => p.asset))
    assert.equal(subjects.length, RECORD.length)
  })
  await check("a summary edited in the Studio is what the drafter reads", async () => {
    const docs = RECORD.map(seeded)
    docs[0] = { ...docs[0], excerpt: "Edited in the Studio." }
    assert.equal((await loadSubjects(store(docs))).find((s) => s.slug === RECORD[0].slug)!.excerpt, "Edited in the Studio.")
  })
  await check("a project taken off the site is never a subject", async () => {
    const docs: Record<string, unknown>[] = RECORD.map(seeded)
    docs[2] = { ...docs[2], hidden: true }
    docs.push({ slug: "studio-only", title: "New job", city: "Surrey, BC", excerpt: "A new job.", hidden: true, images: [{ asset: "image-x" }] })
    const subjects = await loadSubjects(store(docs))
    assert.ok(!subjects.some((s) => s.slug === RECORD[2].slug || s.slug === "studio-only"))
  })
  await check("a blog post picked in the Studio counts as 'already has a post'", async () => {
    const docs: Record<string, unknown>[] = [{ slug: "studio-only", title: "New job", city: "Surrey, BC", excerpt: "A new job.", post: "the-story", images: [{ asset: "image-x" }] }]
    assert.equal((await loadSubjects(store(docs))).find((s) => s.slug === "studio-only")?.post, "the-story")
  })
  await check("no Studio at all: the record", async () => {
    const subjects = await loadSubjects(store([]))
    assert.equal(subjects.length, RECORD.length)
    assert.deepEqual(subjects.find((s) => s.slug === RECORD[0].slug)!.photos.map((p) => p.src), RECORD[0].images)
  })

  if (failures) {
    console.log(`\n${failures} failed`)
    process.exit(1)
  }
  console.log("\nall passed")
}

main()
