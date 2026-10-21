/**
 * Tests for the daily social job (lib/automation/social.ts and its helpers):
 * `npm run test:social`. No network: Buffer, Sanity, Claude and the email
 * are stand-ins; the stand-in Sanity runs the job's real GROQ over an
 * in-memory dataset (groq-js). Ported from hubss.com's test-social-outcome
 * and test-social-library, 14 Oct 2026.
 *
 * What they protect: an item is only done with (its socialLog kept) when a
 * draft reached Buffer, when it never could, or after GIVE_UP_DAYS of
 * refusals, so a bad run doesn't use it up and a stuck one can't retry for
 * ever; nothing is drafted twice; the library posts come from checked
 * material only and go out once a week, giving way to a new field post; every
 * failure email names the right key; and what goes to Buffer is exactly the
 * shape its API takes (checked against Buffer's reference, 14 Oct 2026).
 */
import "./test-env"
import assert from "node:assert/strict"
import { evaluate, parse } from "groq-js"
import { BufferApiError, CREATE_DRAFT, draftInput, MANY_ORGS, pickOrganization, type Buffer, type BufferChannel, type DraftPostInput } from "../lib/automation/buffer"
import { namesTheMaker } from "../lib/automation/style"
import { daysSince, decideOutcome, failureHint, GIVE_UP_DAYS, isConflict, NO_CHANNELS, unusableReason, type SkipKind } from "../lib/automation/outcome"
import { assetSize, idFor, libraryDue, libraryQueue, nextLibraryItem, slotStart, socialImageUrl, weekStart } from "../lib/automation/social-library"
import { googleText } from "../lib/automation/social-drafter"
import { CHANNEL_LIMIT_MS, draftSocialForNewPosts, fieldItem, NETWORKS, notifyRunFailure, SOCIAL_SINCE, START_LIMIT_MS, utmLink } from "../lib/automation/social"
import { loadSubjects, type Subject } from "../lib/automation/facts"
import type { Claude, Mail, SanityDoc, Store, ToolRequest } from "../lib/automation/services"
import { projects as RECORD } from "../lib/projects"
import { services } from "../lib/services"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.stack?.split("\n").slice(0, 3).join("\n        ") : err}`)
  }
}

const skips = (...kinds: SkipKind[]) => kinds.map((kind) => ({ kind }))

// ── stand-ins ─────────────────────────────────────────────────────────────────

function sanity(docs: SanityDoc[]) {
  const dataset: SanityDoc[] = docs.map((d) => structuredClone(d))
  const created: SanityDoc[] = []
  const deleted: string[] = []
  const uploads: string[] = []
  let refuseCreate: ((doc: SanityDoc) => Error | null) | null = null
  const store: Store = {
    fetch: async <T,>(query: string, params: Record<string, unknown> = {}) => (await (await evaluate(parse(query, { params }), { dataset, params })).get()) as T,
    create: async (doc) => {
      const refused = refuseCreate?.(doc)
      if (refused) throw refused
      if (dataset.some((d) => d._id === doc._id)) throw Object.assign(new Error(`Document by ID "${doc._id}" already exists`), { statusCode: 409 })
      dataset.push(structuredClone(doc))
      created.push(doc)
    },
    createOrReplace: async (doc) => {
      const i = dataset.findIndex((d) => d._id === doc._id)
      if (i >= 0) dataset[i] = structuredClone(doc)
      else dataset.push(structuredClone(doc))
    },
    patch: async (id, set) => {
      const d = dataset.find((x) => x._id === id)
      if (!d) throw Object.assign(new Error(`The document "${id}" was not found`), { statusCode: 404 })
      Object.assign(d, structuredClone(set))
    },
    createIfNotExists: async (doc) => {
      if (!dataset.some((d) => d._id === doc._id)) dataset.push(structuredClone(doc))
    },
    delete: async (id) => {
      const i = dataset.findIndex((d) => d._id === id)
      if (i >= 0) dataset.splice(i, 1)
      deleted.push(id)
    },
    uploadImage: async (url) => {
      uploads.push(url)
      return "image-upload0001-1600x1000-jpg"
    },
  }
  return { store, dataset, created, deleted, uploads, refuse: (fn: (doc: SanityDoc) => Error | null) => (refuseCreate = fn) }
}

const channel = (service: string, over: Partial<BufferChannel> = {}): BufferChannel => ({ id: `ch-${service}`, name: `squareone-${service}`, displayName: `Square One ${service}`, service, isQueuePaused: false, isDisconnected: false, isLocked: false, ...over })
const FOUR = [channel("facebook"), channel("instagram"), channel("linkedin"), channel("googlebusiness")]

function fakeBuffer(channels: BufferChannel[], refuse: (input: DraftPostInput) => Error | null = () => null) {
  const sent: DraftPostInput[] = []
  const buffer: Buffer = {
    channels: async () => channels,
    createDraft: async (input) => {
      const err = refuse(input)
      if (err) throw err
      sent.push(input)
      return `post-${sent.length}`
    },
  }
  return { buffer, sent }
}

/** Claude: the social copy with the links it was given; the style pass finds nothing to rewrite. `fail` throws for a source whose words match. */
function fakeClaude(over: Partial<Record<"linkedin" | "facebook" | "instagram" | "google", string>> = {}, fail?: { when: RegExp; error: Error }) {
  const calls: ToolRequest[] = []
  const claude: Claude = async <T,>(r: ToolRequest): Promise<T> => {
    calls.push(r)
    if (fail && fail.when.test(r.user)) throw fail.error
    if (r.tool.name === "save_social") {
      const link = (k: string) => new RegExp(`- ${k}: (\\S+)`).exec(r.user)?.[1] ?? ""
      return {
        linkedin: over.linkedin ?? `Square One installed this in BC. ${link("linkedin")}`,
        facebook: over.facebook ?? `The crew finished this one. ${link("facebook")}`,
        instagram: over.instagram ?? "The crew finished this one. Link in bio.\n\n#bc #pavement",
        google: over.google ?? "Square One installed decorative pavement here.",
      } as T
    }
    if (r.tool.name === "save_rewrites") return { rewrites: [] } as T
    throw new Error(`unexpected tool ${r.tool.name}`)
  }
  return { claude, calls }
}

function fakeMail() {
  const sent: Mail[] = []
  return { mail: async (m: Mail) => (sent.push(m), true), sent }
}

function clock(startIso: string, step = 1000) {
  let t = Date.parse(startIso)
  return () => {
    const d = new Date(t)
    t += step
    return d
  }
}

const post = (slug: string, date: string, over: Record<string, unknown> = {}): SanityDoc => ({
  _id: `post-${slug}`,
  _type: "post",
  title: `The ${slug} story`,
  slug: { _type: "slug", current: slug },
  date,
  category: "Crosswalks",
  excerpt: "What went into it.",
  body: [{ _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Square One installed it.", marks: [] }] }],
  mainImage: { _type: "image", asset: { _type: "reference", _ref: "image-abc0001-1600x1000-jpg" }, alt: "A crosswalk", hotspot: { x: 0.5, y: 0.7, width: 0.4, height: 0.4 } },
  ...over,
})

const field = (id: string, over: Record<string, unknown> = {}): SanityDoc => ({
  _id: id,
  _type: "fieldPost",
  _createdAt: "2026-10-14T10:00:00Z",
  place: "Langley, BC",
  service: "stamped-asphalt",
  systems: ["streetprint"],
  application: "driveways",
  note: "A herringbone StreetPrint driveway over the old asphalt.",
  date: "2026-10-14",
  photos: [{ _key: "p1", _type: "image", asset: { _type: "reference", _ref: "image-ph0001-960x1280-jpg" }, alt: "The driveway from the street" }],
  ...over,
})

/** A week in which a job post already went out (the library isn't due). */
const jobPostThisWeek = (at: string): SanityDoc => ({ _id: "socialLog-lib-service-x", _type: "socialLog", slug: "lib:service:x", createdAt: at, drafts: [{ _key: "a", _type: "bufferDraft" }], skipped: [] })

async function run(docs: SanityDoc[], opts: { channels?: BufferChannel[]; refuse?: (i: DraftPostInput) => Error | null; at?: string; step?: number; claude?: ReturnType<typeof fakeClaude> } = {}) {
  const s = sanity(docs)
  const b = fakeBuffer(opts.channels ?? FOUR, opts.refuse)
  const m = fakeMail()
  const c = opts.claude ?? fakeClaude()
  const result = await draftSocialForNewPosts({ claude: c.claude, store: s.store, buffer: b.buffer, mail: m.mail, now: clock(opts.at ?? "2026-10-15T14:00:00Z", opts.step ?? 1000) })
  return { result, ...s, sentToBuffer: b.sent, mails: m.sent, claude: c }
}

async function main() {
  console.log("Done with an item (its log is kept)")
  await check("one draft made, the others refused", () => assert.equal(decideOutcome(1, skips("retry", "retry"), null), "drafted"))
  await check("nothing could ever be drafted (YouTube, Instagram with no photo)", () => assert.equal(decideOutcome(0, skips("lasting", "lasting"), null), "nothing-possible"))
  await check(`failing for more than ${GIVE_UP_DAYS} days since the first try: gave up`, () => assert.equal(decideOutcome(0, skips("retry"), GIVE_UP_DAYS + 1), "gave-up"))
  console.log("Not done: the claim is dropped, the next daily run tries again")
  await check("every channel refused", () => assert.equal(decideOutcome(0, skips("retry", "retry"), null), "retry"))
  await check("YouTube skipped and the rest refused", () => assert.equal(decideOutcome(0, skips("lasting", "retry"), null), "retry"))
  await check(`on day ${GIVE_UP_DAYS} of failing it still retries; a first failure always does`, () => {
    assert.equal(decideOutcome(0, skips("retry"), GIVE_UP_DAYS), "retry")
    assert.equal(decideOutcome(0, skips("retry"), null), "retry")
  })
  await check("days since a date", () => {
    const now = new Date("2026-10-21T14:00:00Z")
    assert.equal(Math.floor(daysSince("2026-10-07", now)), 14)
    assert.equal(daysSince("soon", now), 0)
    assert.equal(daysSince("2026-11-01", now), 0)
  })
  await check("another run has the item: Sanity's 409 or its words", () => {
    assert.equal(isConflict(Object.assign(new Error("Conflict"), { statusCode: 409 })), true)
    assert.equal(isConflict(new Error('Document by ID "socialLog-x" already exists')), true)
    assert.equal(isConflict(Object.assign(new Error("Forbidden"), { statusCode: 403 })), false)
  })
  await check("channels Buffer can't post to say why", () => {
    assert.match(unusableReason({ isDisconnected: true }) ?? "", /reconnect/)
    assert.match(unusableReason({ isLocked: true }) ?? "", /plan/)
    assert.equal(unusableReason({ isDisconnected: false, isLocked: false }), null)
    assert.equal(unusableReason({}), null)
  })

  console.log("What the failure email tells the editor to do")
  const BUFFER_KEY = /publish\.buffer\.com\/settings\/api/
  await check("Buffer refuses the key: make a new one, in Square One's Buffer", () => {
    assert.match(failureHint(new BufferApiError("Buffer API 401: Access token is not valid (UNAUTHENTICATED)", 401), "social"), BUFFER_KEY)
    assert.match(failureHint(new BufferApiError("Buffer API 200: Invalid token (UNAUTHENTICATED)", 200), "social"), BUFFER_KEY)
    assert.match(failureHint("Buffer API 403: Forbidden", "social"), BUFFER_KEY)
    assert.match(failureHint(new Error("Buffer API 401: Unauthorized"), "social"), /Square One's Buffer/)
  })
  await check("no usable channel, disconnected, locked, rate limit, no answer", () => {
    assert.match(failureHint(new Error(`${NO_CHANNELS} (connected: youtube).`), "social"), /Connect Square One's channels/)
    assert.match(failureHint(new Error("disconnected in Buffer: reconnect it there"), "social"), /Reconnect/)
    assert.match(failureHint(new Error("locked by Buffer: the account has more channels than its plan allows"), "social"), /plan/)
    assert.match(failureHint(new BufferApiError("Buffer rate limit; retry after 60 s", 429), "social"), /next daily run/)
    assert.match(failureHint(new BufferApiError("Buffer API unreachable: The operation was aborted due to timeout", 0), "social"), /didn't answer/)
  })
  await check("missing settings are named; anything else points at the logs", () => {
    assert.match(failureHint(new Error("BUFFER_API_KEY is not set"), "social"), /^BUFFER_API_KEY is missing in Vercel/)
    assert.match(failureHint(new Error("Not configured: ANTHROPIC_API_KEY, SANITY_API_WRITE_TOKEN"), "social"), /^ANTHROPIC_API_KEY and SANITY_API_WRITE_TOKEN are missing/)
    assert.match(failureHint(new Error("socket hang up"), "social"), /filtered on \[social\]/)
    assert.match(failureHint(new Error("Buffer refused the draft: Text is too long"), "social"), /Logs/)
  })
  await check("the other keys' refusals are never blamed on Buffer", () => {
    const anthropic = Object.assign(new Error('401 {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"},"request_id":null}'), { status: 401 })
    assert.match(failureHint(anthropic, "social"), /ANTHROPIC_API_KEY/)
    assert.doesNotMatch(failureHint(anthropic, "social"), BUFFER_KEY)
    const sanityWrite = Object.assign(new Error("Unauthorized - Session not found"), { statusCode: 401 })
    assert.match(failureHint(sanityWrite, "social"), /SANITY_API_WRITE_TOKEN/)
    assert.doesNotMatch(failureHint(sanityWrite, "social"), BUFFER_KEY)
  })

  console.log("What goes to Buffer (its API reference, 14 Oct 2026)")
  await check("a draft, queued automatically, with the photo and its alt text", () => {
    const input = draftInput({ channelId: "c1", text: "Hello", imageUrl: "https://cdn.sanity.io/x.jpg", imageAlt: "A driveway", metadata: { facebook: { type: "post" } } })
    assert.deepEqual(input, {
      channelId: "c1",
      text: "Hello",
      schedulingType: "automatic",
      mode: "addToQueue",
      saveToDraft: true,
      aiAssisted: true,
      source: "squareonepaving.com",
      assets: [{ image: { url: "https://cdn.sanity.io/x.jpg", metadata: { altText: "A driveway" } } }],
      metadata: { facebook: { type: "post" } },
    })
    assert.match(CREATE_DRAFT, /createPost\(input: \$input\)[\s\S]*\.\.\. on PostActionSuccess \{ post \{ id \} \}[\s\S]*\.\.\. on MutationError \{ message \}/)
  })
  await check("no alt text sent when there is none (Google takes none); no assets without a photo", () => {
    assert.deepEqual(draftInput({ channelId: "c", text: "t", imageUrl: "https://x/y.jpg" }).assets, [{ image: { url: "https://x/y.jpg" } }])
    assert.deepEqual(draftInput({ channelId: "c", text: "t" }).assets, [])
  })
  await check("each network's metadata as Buffer names it; Google's button opens the page", () => {
    assert.deepEqual(NETWORKS.facebook.metadata?.("x"), { facebook: { type: "post" } })
    assert.deepEqual(NETWORKS.instagram.metadata?.("x"), { instagram: { type: "post", shouldShareToFeed: true } })
    assert.deepEqual(NETWORKS.googlebusiness.metadata?.("https://www.squareonepaving.com/blog/x?utm_source=google"), {
      google: { type: "whats_new", detailsWhatsNew: { button: "learn_more", link: "https://www.squareonepaving.com/blog/x?utm_source=google" } },
    })
    assert.equal(NETWORKS.linkedin.metadata, undefined)
  })
  await check("Google's text: no link, never a phone number, at most 1,500 characters", () => {
    assert.equal(googleText("Done in Langley. https://www.squareonepaving.com/x").text, "Done in Langley.")
    assert.match(googleText("Call 604-612-6209 for a quote.").problem ?? "", /phone number/)
    assert.match(googleText("Or 1-877-391-0270.").problem ?? "", /phone number/)
    assert.match(googleText("x".repeat(1501)).problem ?? "", /1500/)
    assert.equal(googleText("Installed in 2025 on 32nd Avenue.").problem, undefined)
  })

  console.log("The library queue")
  const subjects: Subject[] = await loadSubjects({ fetch: async <T,>() => [] as T, create: async () => {}, createOrReplace: async () => {}, patch: async () => {}, createIfNotExists: async () => {}, delete: async () => {}, uploadImage: async () => null })
  const queue = libraryQueue(subjects, services)
  const kind = (key: string) => key.split(":")[1]
  await check("documented projects and the four service pages, every key once", () => {
    assert.ok(queue.some((i) => kind(i.key) === "project"))
    assert.equal(queue.filter((i) => kind(i.key) === "service").length, services.length)
    assert.equal(new Set(queue.map((i) => i.key)).size, queue.length)
  })
  await check("projects and service pages take turns, the featured projects first", () => {
    assert.deepEqual(queue.slice(0, 4).map((i) => kind(i.key)), ["project", "service", "project", "service"])
    const featured = RECORD.filter((p) => p.featured).map((p) => `lib:project:${p.slug}`)
    assert.ok(featured.length > 0)
    assert.ok(featured.includes(queue[0].key), queue[0].key)
  })
  await check("every item links to its page and has a photo; the facts name the place and the service", () => {
    for (const i of queue) {
      assert.match(i.path, /^\/(projects|services)\/[a-z0-9-]+$/, i.key)
      assert.ok(i.photo && (i.photo.asset || i.photo.src), `${i.key} has a photo`)
    }
    const job = queue.find((i) => kind(i.key) === "project")!
    assert.match(job.text, /^Where: /m)
    assert.match(job.text, /^Service: /m)
  })
  await check("nothing the writer is given has an em dash or names the manufacturer", () => {
    for (const i of queue) {
      assert.ok(!/—/.test(`${i.title} ${i.excerpt} ${i.text} ${i.linkTo}`), i.key)
      assert.doesNotMatch(i.text, /\bHUB\b|Surface Systems/, i.key)
    }
  })
  await check("next: the first not posted; never a project whose article had its own posts", () => {
    assert.equal(nextLibraryItem(queue, new Set())?.key, queue[0].key)
    assert.equal(nextLibraryItem(queue, new Set([queue[0].key]))?.key, queue[1].key)
    const withPost = queue.find((i) => i.post)
    assert.ok(withPost, "a project with an article")
    const logged = new Set(queue.slice(0, queue.indexOf(withPost)).map((i) => i.key))
    logged.add(withPost.post!)
    assert.notEqual(nextLibraryItem(queue, logged)?.key, withPost.key)
    assert.equal(nextLibraryItem(queue, new Set(queue.map((i) => i.key))), undefined)
  })

  console.log("Once a week, unless the crew's photos take the turn")
  const at = (iso: string) => new Date(iso)
  await check("the very first goes out at once; then not again that week; the next Monday it's due", () => {
    assert.equal(libraryDue(at("2026-10-14T14:00:00Z"), undefined), true)
    assert.equal(libraryDue(at("2026-10-15T14:00:00Z"), "2026-10-14T14:01:00Z"), false)
    assert.equal(libraryDue(at("2026-10-19T14:00:00Z"), "2026-10-14T14:01:00Z"), true)
  })
  await check("a missed Monday catches up; Sunday night is still the old week", () => {
    assert.equal(libraryDue(at("2026-10-20T14:00:00Z"), "2026-10-12T14:01:00Z"), true)
    assert.equal(libraryDue(at("2026-10-25T23:59:00Z"), "2026-10-20T14:01:00Z"), false)
  })
  await check("a new field post takes the turn", () => assert.equal(libraryDue(at("2026-10-19T14:00:00Z"), "2026-10-14T14:01:00Z", true), false))
  await check("weeks start Monday 00:00 UTC; with two a week, Thursday too", () => {
    assert.equal(weekStart(at("2026-10-25T23:59:00Z")).toISOString(), "2026-10-19T00:00:00.000Z")
    assert.equal(slotStart(at("2026-10-21T14:00:00Z"), 2).toISOString(), "2026-10-19T00:00:00.000Z")
    assert.equal(slotStart(at("2026-10-22T14:00:00Z"), 2).toISOString(), "2026-10-22T00:00:00.000Z")
    assert.equal(libraryDue(at("2026-10-22T14:00:00Z"), "2026-10-19T14:01:00Z", false, 2), true, "Thursday's turn")
    assert.equal(libraryDue(at("2026-10-22T14:00:00Z"), "2026-10-19T14:01:00Z", false, 1), false)
  })
  await check("four weeks of daily runs: four library posts, all on Mondays", () => {
    let last: string | undefined
    const went: string[] = []
    for (let i = 0; i < 28; i++) {
      const now = new Date(Date.parse("2026-10-19T14:00:00Z") + i * 86_400_000)
      if (libraryDue(now, last)) {
        went.push(now.toISOString().slice(0, 10))
        last = now.toISOString()
      }
    }
    assert.equal(went.length, 4)
    for (const d of went) assert.equal(new Date(`${d}T12:00:00Z`).getUTCDay(), 1, d)
  })

  console.log("Log ids and photos")
  await check("keys become ids Sanity accepts", () => {
    assert.equal(idFor("socialLog", "rainbow-intersection-nanaimo"), "socialLog-rainbow-intersection-nanaimo")
    assert.equal(idFor("socialLog", "lib:project:white-rock-pier-crosswalk"), "socialLog-lib-project-white-rock-pier-crosswalk")
    assert.match(idFor("socialRetry", "field:3f2a9c1e-0b7d-4c55-9e1a-2b6f0d4c8a11"), /^socialRetry-field-[a-z0-9-]+$/)
  })
  await check("a landscape photo gets 1200 x 630; Instagram, and any portrait photo, 4:5", () => {
    assert.match(socialImageUrl({ asset: "image-abc0001-1600x1000-jpg" }, "landscape") ?? "", /w=1200&h=630.*fm=jpg/)
    assert.match(socialImageUrl({ asset: "image-abc0001-1600x1000-jpg" }, "portrait") ?? "", /w=1080&h=1350/)
    assert.match(socialImageUrl({ asset: "image-ph0001-960x1280-jpg" }, "landscape") ?? "", /w=1080&h=1350/)
    assert.deepEqual(assetSize("image-abc0001-1600x1000-jpg", { top: 0, bottom: 0, left: 0.25, right: 0.25 }), { w: 800, h: 1000 })
  })
  await check("the crop centres on the focal point the office set", () => {
    const low = socialImageUrl({ asset: "image-abc0001-1600x1600-jpg", hotspot: { x: 0.5, y: 0.85, width: 0.2, height: 0.2 } }, "landscape") ?? ""
    const high = socialImageUrl({ asset: "image-abc0001-1600x1600-jpg", hotspot: { x: 0.5, y: 0.15, width: 0.2, height: 0.2 } }, "landscape") ?? ""
    const top = (u: string) => Number(/rect=\d+,(\d+),/.exec(u)?.[1])
    assert.ok(top(low) > top(high), `${low} vs ${high}`)
  })

  console.log("The daily run, end to end against stand-ins")
  await check("a new blog post: a draft on each network, each its own crop, link and metadata; the log and the email", async () => {
    const { result, sentToBuffer, dataset, mails } = await run([post("rainbow-intersection-nanaimo", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")])
    assert.equal(result.posts.length, 1)
    assert.equal(result.posts[0].outcome, "drafted")
    assert.equal(sentToBuffer.length, 4)
    const by = (id: string) => sentToBuffer.find((s) => s.channelId === id)!
    assert.match(by("ch-facebook").text, /utm_source=facebook&utm_medium=social&utm_campaign=blog&utm_content=rainbow-intersection-nanaimo/)
    assert.match(by("ch-facebook").imageUrl ?? "", /w=1200&h=630/)
    assert.match(by("ch-instagram").imageUrl ?? "", /w=1080&h=1350/)
    assert.equal(by("ch-instagram").imageAlt, "A crosswalk")
    assert.deepEqual(by("ch-instagram").metadata, { instagram: { type: "post", shouldShareToFeed: true } })
    const g = by("ch-googlebusiness")
    assert.equal(g.imageAlt, undefined, "Google takes no alt text")
    assert.match(JSON.stringify(g.metadata), /"button":"learn_more","link":"https:\/\/www\.squareonepaving\.com\/blog\/rainbow-intersection-nanaimo\?utm_source=google/)
    const log = dataset.find((d) => d._id === "socialLog-rainbow-intersection-nanaimo")!
    assert.equal((log.drafts as unknown[]).length, 4)
    assert.equal(mails.length, 1)
    assert.match(mails[0].subject, /^Social drafts ready in Buffer: The rainbow-intersection-nanaimo story$/)
  })
  await check("posts dated before SOCIAL_SINCE (the imported library) never get drafts", async () => {
    const { result, sentToBuffer } = await run([post("old-one", "2026-04-02"), jobPostThisWeek("2026-10-13T14:00:00Z")])
    assert.ok("2026-04-02" < SOCIAL_SINCE)
    assert.equal(result.posts.length, 0)
    assert.equal(sentToBuffer.length, 0)
  })
  await check("a field post: linked to its service's page, campaign field, its own photo at 4:5 (a phone shot)", async () => {
    const { result, sentToBuffer, claude } = await run([field("fp-1")])
    assert.equal(result.posts[0].stream, "From the field")
    const fb = sentToBuffer.find((s) => s.channelId === "ch-facebook")!
    assert.match(fb.text, /\/services\/stamped-asphalt\?utm_source=facebook&utm_medium=social&utm_campaign=field&utm_content=fp-1/)
    assert.match(fb.imageUrl ?? "", /ph0001-960x1280\.jpg\?.*w=1080&h=1350/)
    const ask = claude.calls.find((c) => c.tool.name === "save_social")!
    assert.match(ask.user, /FIELD POST/)
    assert.match(ask.user, /What the crew says: A herringbone StreetPrint driveway/)
    assert.equal(result.posts.length, 1, "the field post took the week's turn: no library post")
  })
  await check("a field post without its photo, place, service or note is skipped, not stuck", () => {
    assert.equal(fieldItem({ _id: "x", place: "Langley, BC", note: "n", service: "stamped-asphalt", photo: null }), null)
    assert.equal(fieldItem({ _id: "x", place: "", note: "n", service: "stamped-asphalt", photo: { asset: "image-a-1x1-jpg" } }), null)
    assert.equal(fieldItem({ _id: "x", place: "Langley, BC", note: "n", service: "asphalt-repair", photo: { asset: "image-a-1x1-jpg" } }), null)
  })
  await check("the library, once a week: a featured project first, campaign library, its own photo", async () => {
    const { result, sentToBuffer, claude } = await run([], { at: "2026-10-19T14:00:00Z" })
    assert.equal(result.posts.length, 1)
    assert.equal(result.posts[0].stream, "From the library")
    assert.match(result.posts[0].key, /^lib:project:/)
    assert.match(sentToBuffer[0].text + sentToBuffer[1].text, /utm_campaign=library&utm_content=project%3A/)
    const ask = claude.calls.find((c) => c.tool.name === "save_social")!
    assert.match(ask.user, /never call it new/)
  })
  await check("an item with a log is never drafted again; a claim another run holds is skipped", async () => {
    const again = await run([post("done-one", "2026-10-14"), { _id: "socialLog-done-one", _type: "socialLog", slug: "done-one", createdAt: "2026-10-14T14:00:00Z", drafts: [], skipped: [] }, jobPostThisWeek("2026-10-13T14:00:00Z")])
    assert.equal(again.sentToBuffer.length, 0)
    const s = sanity([post("racing", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")])
    s.refuse((doc) => (doc._type === "socialLog" ? Object.assign(new Error("Conflict"), { statusCode: 409 }) : null))
    const b = fakeBuffer(FOUR)
    const out = await draftSocialForNewPosts({ claude: fakeClaude().claude, store: s.store, buffer: b.buffer, mail: fakeMail().mail, now: clock("2026-10-15T14:00:00Z") })
    assert.equal(out.posts.length, 0)
    assert.equal(b.sent.length, 0, "nothing went to Buffer")
  })
  await check("every channel refuses: the claim is dropped, the first failure noted, the editor told; it retries", async () => {
    const refuse = () => new Error("Buffer refused the draft: something")
    const { result, dataset, deleted, mails } = await run([post("refused", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")], { refuse })
    assert.equal(result.posts[0].outcome, "retry")
    assert.ok(deleted.includes("socialLog-refused"))
    assert.ok(!dataset.some((d) => d._id === "socialLog-refused"))
    assert.equal(dataset.find((d) => d._id === "socialRetry-refused")?.firstFailedAt, "2026-10-15T14:00:00.000Z")
    assert.match(mails[0].subject, /^Social drafts not made yet/)
    assert.match(mails[0].text, /tries again, for up to 14 days/)
  })
  await check(`after ${GIVE_UP_DAYS} days of failing: given up, its log kept, the clock kept honest`, async () => {
    const refuse = () => new Error("Buffer refused the draft: something")
    const { result, dataset, mails } = await run(
      [post("stuck", "2026-10-01"), { _id: "socialRetry-stuck", _type: "socialRetry", slug: "stuck", firstFailedAt: "2026-10-01T14:00:00Z" }, jobPostThisWeek("2026-10-13T14:00:00Z")],
      { refuse, at: "2026-10-16T14:05:00Z" },
    )
    assert.equal(result.posts[0].outcome, "gave-up")
    assert.ok(dataset.some((d) => d._id === "socialLog-stuck"), "kept, so it isn't tried again")
    assert.match(mails[0].subject, /^Social drafts given up/)
  })
  await check("an item that failed before waits behind the ones not tried yet", async () => {
    const { result } = await run(
      [post("failed-before", "2026-10-02"), post("fresh-a", "2026-10-03"), post("fresh-b", "2026-10-04"), { _id: "socialRetry-failed-before", _type: "socialRetry", slug: "failed-before", firstFailedAt: "2026-10-10T14:00:00Z" }, jobPostThisWeek("2026-10-13T14:00:00Z")],
    )
    assert.deepEqual(result.posts.map((p) => p.key), ["fresh-a", "fresh-b"])
    assert.equal(result.waiting, 1)
  })
  await check("disconnected and locked channels are skipped with the reason; YouTube for good", async () => {
    const { result, sentToBuffer } = await run([post("mixed", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")], {
      channels: [channel("facebook", { isDisconnected: true }), channel("instagram", { isLocked: true }), channel("youtube"), channel("linkedin")],
    })
    const r = result.posts[0]
    assert.equal(r.outcome, "drafted")
    assert.equal(sentToBuffer.length, 1)
    assert.deepEqual(r.skipped.map((s) => [s.service, s.kind]), [["facebook", "retry"], ["instagram", "retry"], ["youtube", "lasting"]])
  })
  await check("no photo: no Instagram draft, the rest go", async () => {
    const { result } = await run([post("no-photo", "2026-10-14", { mainImage: null }), jobPostThisWeek("2026-10-13T14:00:00Z")])
    assert.deepEqual(result.posts[0].skipped.map((s) => s.service), ["instagram"])
    assert.equal(result.posts[0].drafted.length, 3)
  })
  await check("Google copy with a phone number: Google skipped, the rest drafted", async () => {
    const { result } = await run([post("phone", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")], { claude: fakeClaude({ google: "Call 604-612-6209 today." }) })
    assert.deepEqual(result.posts[0].skipped.map((s) => s.service), ["googlebusiness"])
    assert.equal(result.posts[0].drafted.length, 3)
  })
  await check("no channel the job can write for: the run stops before claiming anything", async () => {
    const s = sanity([post("lonely", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")])
    await assert.rejects(
      draftSocialForNewPosts({ claude: fakeClaude().claude, store: s.store, buffer: fakeBuffer([channel("youtube")]).buffer, mail: fakeMail().mail, now: clock("2026-10-15T14:00:00Z") }),
      new RegExp(NO_CHANNELS),
    )
    assert.equal(s.created.length, 0)
  })
  await check("no item is started after two minutes: the rest wait for the next day", async () => {
    const { result } = await run([post("a1", "2026-10-11"), post("a2", "2026-10-12"), jobPostThisWeek("2026-10-13T14:00:00Z")], { step: START_LIMIT_MS / 2 + 1 })
    assert.equal(result.posts.length, 1)
    assert.equal(result.waiting, 1)
  })
  await check("a library photo that lives on the site (a service page's) is uploaded first, so it can be cropped", async () => {
    // The first project has gone out, so a service page is next.
    const first = queue[0].key
    const { uploads, sentToBuffer, result } = await run(
      [jobPostThisWeek("2026-10-01T14:00:00Z"), { _id: idFor("socialLog", first), _type: "socialLog", slug: first, createdAt: "2026-10-01T14:00:00Z", drafts: [{ _key: "a", _type: "bufferDraft" }], skipped: [] }],
      { at: "2026-10-19T14:00:00Z" },
    )
    assert.match(result.posts[0]?.key ?? "", /^lib:service:/)
    assert.equal(uploads.length, 1)
    assert.match(uploads[0], /^https:\/\/www\.squareonepaving\.com\/images\//)
    assert.ok(sentToBuffer.every((d) => /upload0001-1600x1000\.jpg\?/.test(d.imageUrl ?? "")), "every network gets the uploaded photo, cropped")
  })
  await check("the run-failure email names the key", async () => {
    const m = fakeMail()
    await notifyRunFailure(m.mail, new Error("BUFFER_API_KEY is not set"))
    assert.match(m.sent[0].subject, /^Social drafts didn't run/)
    assert.match(m.sent[0].text, /What to do: BUFFER_API_KEY is missing in Vercel/)
  })
  console.log("From the review (14 Oct 2026)")
  await check("one Buffer organization only, or the one BUFFER_ORG_ID names; never a guess", () => {
    assert.deepEqual(pickOrganization([{ id: "o1" }]), [{ id: "o1" }])
    assert.throws(() => pickOrganization([{ id: "o1" }, { id: "hub" }]), new RegExp(MANY_ORGS))
    assert.deepEqual(pickOrganization([{ id: "o1" }, { id: "hub" }], "o1"), [{ id: "o1" }])
    assert.throws(() => pickOrganization([{ id: "o1" }], "nope"), /BUFFER_ORG_ID/)
    assert.match(failureHint(new Error(`${MANY_ORGS} (2): the job drafts into one only`), "social"), /BUFFER_ORG_ID/)
  })
  await check("a scheduled version of a post (Content Releases) is never drafted before it's live", async () => {
    const scheduled = { ...post("next-week", "2026-10-14"), _id: "versions.rABC.post-next-week" }
    const { result, sentToBuffer } = await run([scheduled, jobPostThisWeek("2026-10-13T14:00:00Z")])
    assert.equal(result.posts.length, 0)
    assert.equal(sentToBuffer.length, 0)
  })
  await check("past 220 s no channel is started (the skipped ones are named), and the run settles in time", async () => {
    const { result } = await run([post("late", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")], { step: 50_000 })
    const r = result.posts[0]
    assert.ok(r, "the item ran")
    assert.ok(r.skipped.some((x) => /out of time/.test(x.why) && x.kind === "retry"), JSON.stringify(r.skipped))
    assert.ok(CHANNEL_LIMIT_MS < 300_000 - 20_000 - 40_000 - 15_000 + 1)
  })
  await check("a draft call Buffer never answered isn't tried again (it may be saved): look in Buffer first", async () => {
    const { result, dataset } = await run([post("quiet", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")], {
      refuse: () => new BufferApiError("Buffer API unreachable: The operation was aborted due to timeout", 0),
    })
    const r = result.posts[0]
    assert.equal(r.outcome, "nothing-possible")
    assert.ok(r.skipped.every((x) => x.kind === "lasting" && /look in Buffer's drafts/.test(x.why)))
    assert.ok(dataset.some((d) => d._id === "socialLog-quiet"), "kept: never a second set")
  })
  await check("one item Claude can't write up is retried behind the others; the run carries on", async () => {
    const claude = fakeClaude({}, { when: /The bad-one story/, error: new Error("The google copy came back empty") })
    const { result, dataset, mails } = await run([post("bad-one", "2026-10-11"), post("good-one", "2026-10-12"), jobPostThisWeek("2026-10-13T14:00:00Z")], { claude })
    assert.deepEqual(result.posts.map((p) => [p.key, p.outcome]), [["bad-one", "retry"], ["good-one", "drafted"]])
    assert.ok(dataset.some((d) => d._id === "socialRetry-bad-one"))
    assert.ok(!dataset.some((d) => d._id === "socialLog-bad-one"))
    assert.ok(mails.some((m) => /^Social drafts not made yet: The bad-one story/.test(m.subject)))
  })
  await check(`after ${GIVE_UP_DAYS} days it is given up for good, with a record`, async () => {
    const claude = fakeClaude({}, { when: /The bad-one story/, error: new Error("The google copy came back empty") })
    const { result, dataset } = await run(
      [post("bad-one", "2026-10-01"), { _id: "socialRetry-bad-one", _type: "socialRetry", slug: "bad-one", firstFailedAt: "2026-10-01T14:00:00Z" }, jobPostThisWeek("2026-10-13T14:00:00Z")],
      { claude, at: "2026-10-16T14:05:00Z" },
    )
    assert.equal(result.posts[0].outcome, "gave-up")
    assert.ok(dataset.some((d) => d._id === "socialLog-bad-one"))
    assert.ok(!dataset.some((d) => d._id === "socialRetry-bad-one"))
  })
  await check("a refused key still stops the whole run (the route emails)", async () => {
    const claude = fakeClaude({}, { when: /./, error: Object.assign(new Error('401 {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}'), { status: 401 }) })
    const s = sanity([post("any", "2026-10-14"), jobPostThisWeek("2026-10-13T14:00:00Z")])
    await assert.rejects(draftSocialForNewPosts({ claude: claude.claude, store: s.store, buffer: fakeBuffer(FOUR).buffer, mail: fakeMail().mail, now: clock("2026-10-15T14:00:00Z") }), /authentication_error/)
  })
  await check("a phone number in any shape keeps a post off Google", () => {
    for (const t of ["(604)612-6209", "Call 6046126209", "604\u2013612\u20136209", "604\u2011612\u20116209", "+1 604 612 6209"]) assert.match(googleText(t).problem ?? "", /phone number/, t)
  })
  await check("the manufacturer run together in a hashtag is caught; a transit hub isn't", () => {
    assert.equal(namesTheMaker("#HUBSurfaceSystems"), true)
    assert.equal(namesTheMaker("#HubSurfaceSystems"), true)
    assert.equal(namesTheMaker("#hubsurfacesystems"), true)
    assert.equal(namesTheMaker("#transithub and a busy hub"), false)
  })
  await check("no retouched or generated photo is ever posted as a job: vapour blasting posts its real one", () => {
    for (const i of queue) assert.doesNotMatch(i.photo?.src ?? "", /\/generated\//, i.key)
    const vapour = queue.find((i) => i.key === "lib:service:vapor-blasting")!
    assert.equal(vapour.photo?.src, "/images/services/vapor-blasting/granville-island-vapour-blasting-01.jpg")
    assert.doesNotMatch(vapour.photo?.alt ?? "", /clear sky/)
  })
  await check("UTM links: the network, social, the stream's campaign, what it was", () => {
    assert.equal(
      utmLink({ pageUrl: "https://www.squareonepaving.com/projects/x", campaign: "library", key: "lib:project:x" }, "facebook"),
      "https://www.squareonepaving.com/projects/x?utm_source=facebook&utm_medium=social&utm_campaign=library&utm_content=project%3Ax",
    )
  })

  if (failures) {
    console.log(`\n${failures} failed`)
    process.exit(1)
  }
  console.log("\nall passed")
}

main()
