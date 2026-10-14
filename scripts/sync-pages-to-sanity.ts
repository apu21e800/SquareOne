/**
 * Fill-only: puts the site's own words into the Studio's empty fields, so the
 * office starts from what is live (14 Oct 2026, as hubss.com's
 * scripts/sync-pages-to-sanity.ts). Never overwrites a field the Studio
 * already has: once the office edits a line, the Studio's line is the one.
 *
 *   pages     the home page's sections, the About, Contact and Driveways pages
 *             (lib/page-copy.ts)
 *   services  the four services: tagline, intro, who we work with, what you
 *             get, the questions (lib/services.ts)
 *   settings  Site Settings' empty fields, the footer line among them
 *             (lib/site-settings.ts)
 *
 * Usage:
 *   npm run sync:pages -- --dry-run            what it would fill; no token, reads the public data
 *   npm run sync:pages -- --dry-run --only=services
 *   npx sanity login                           once, in a browser
 *   npx sanity exec scripts/sync-pages-to-sanity.ts --with-user-token
 *                                              fills, as the person logged in
 *
 * (SANITY_API_WRITE_TOKEN in the environment works as well as the login.)
 *
 * A document with an unpublished draft open in the Studio is left alone and
 * named: publishing that draft would put back the empty fields over this
 * run's, so publish or discard it first, then run again. Writes go to the
 * published documents, so the site shows them within seconds.
 */
import { createClient, type SanityClient } from "next-sanity"
import { ABOUT_COPY, CONTACT_COPY, DRIVEWAYS_COPY, HOME_COPY, type CardWords, type Faq, type SectionWords } from "../lib/page-copy"
import { services } from "../lib/services"
import { DEFAULT_SETTINGS } from "../lib/site-settings"

const DRY_RUN = process.argv.includes("--dry-run")
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice("--only=".length)
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token && !DRY_RUN) {
  console.error("No way to write: run it with `npx sanity exec scripts/sync-pages-to-sanity.ts --with-user-token` (after `npx sanity login`), or add --dry-run to see what it would fill.")
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "g4yp3p0k",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-01",
  useCdn: false,
  // Published documents only: the fill is judged against what the site shows.
  perspective: "published",
  token: token || undefined,
})

/** Nothing there: missing, null, blank text or an empty list. */
const blank = (v: unknown) => v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0)

type Value = string | string[] | { _key: string; _type: string; q: string; a: string }[]

/** The blank fields of one document, as path → value: what this run would set. */
type Fill = Map<string, Value>

function at(doc: Record<string, unknown> | null, path: string): unknown {
  let v: unknown = doc
  for (const p of path.split(".")) v = v && typeof v === "object" ? (v as Record<string, unknown>)[p] : undefined
  return v
}

function fillSection(doc: Record<string, unknown> | null, fill: Fill, key: string, code: SectionWords) {
  // A heading and its ending travel together: a Studio heading keeps its own ending, even none.
  const headSet = !blank(at(doc, `${key}.head`)) || !blank(at(doc, `${key}.tail`))
  if (blank(at(doc, `${key}.label`))) fill.set(`${key}.label`, code.label)
  if (!headSet) {
    fill.set(`${key}.head`, code.head)
    if (code.tail) fill.set(`${key}.tail`, code.tail)
  }
  if (code.line !== undefined && blank(at(doc, `${key}.line`))) fill.set(`${key}.line`, code.line)
}

function fillCards(doc: Record<string, unknown> | null, fill: Fill, key: string, code: Record<string, CardWords>) {
  for (const [k, card] of Object.entries(code)) {
    if (blank(at(doc, `${key}.${k}.title`))) fill.set(`${key}.${k}.title`, card.title)
    if (blank(at(doc, `${key}.${k}.text`))) fill.set(`${key}.${k}.text`, card.text)
  }
}

const faqItems = (faqs: Faq[], prefix: string) => faqs.map((f, i) => ({ _key: `${prefix}${i}`, _type: "faq", q: f.q, a: f.a }))

function fillValue(doc: Record<string, unknown> | null, fill: Fill, path: string, value: Value) {
  if (blank(at(doc, path))) fill.set(path, value)
}

interface Plan {
  id: string
  type: string
  /** Fields set only when the document is first made. */
  create?: Record<string, string>
  fill: (doc: Record<string, unknown> | null) => Fill
}

const pages: Plan[] = [
  {
    id: "homePage",
    type: "homePage",
    fill: (doc) => {
      const f: Fill = new Map()
      const c = HOME_COPY
      for (const key of ["services", "projects", "process", "audiences", "driveways", "drivewaysOffer", "materials", "vapour", "social"] as const) fillSection(doc, f, key, c[key])
      fillCards(doc, f, "serviceCards", c.serviceCards)
      fillCards(doc, f, "audienceCards", c.audienceCards)
      return f
    },
  },
  {
    id: "aboutPage",
    type: "aboutPage",
    fill: (doc) => {
      const f: Fill = new Map()
      const c = ABOUT_COPY
      for (const key of ["story", "trades", "principles", "work", "regions"] as const) fillSection(doc, f, key, c[key])
      fillValue(doc, f, "storyText", c.storyText)
      fillValue(doc, f, "mission.title", c.mission.title)
      fillValue(doc, f, "mission.text", c.mission.text)
      fillCards(doc, f, "tradeCards", c.tradeCards)
      fillCards(doc, f, "principleCards", c.principleCards)
      return f
    },
  },
  {
    id: "contactPage",
    type: "contactPage",
    fill: (doc) => {
      const f: Fill = new Map()
      const c = CONTACT_COPY
      fillSection(doc, f, "intro", c.intro)
      fillSection(doc, f, "regions", c.regions)
      fillValue(doc, f, "nextLabel", c.nextLabel)
      fillCards(doc, f, "steps", c.steps)
      fillValue(doc, f, "sendLabel", c.sendLabel)
      fillValue(doc, f, "send", c.send)
      return f
    },
  },
  {
    id: "drivewaysPage",
    type: "drivewaysPage",
    fill: (doc) => {
      const f: Fill = new Map()
      const c = DRIVEWAYS_COPY
      for (const key of ["patterns", "process", "gallery", "area", "questions"] as const) fillSection(doc, f, key, c[key])
      fillCards(doc, f, "steps", c.steps)
      fillValue(doc, f, "faqs", faqItems(c.faqs, "q"))
      return f
    },
  },
]

/* The record's taglines, as the service pages, the other services' cards and
   llms.txt print them. (/services sets vapour blasting's line shorter; it
   keeps its own until the office changes the tagline here.) */
const servicePlans: Plan[] = services.map((s) => ({
  id: `service-${s.slug}`,
  type: "service",
  create: { name: s.name, slug: s.slug },
  fill: (doc) => {
    const f: Fill = new Map()
    fillValue(doc, f, "tagline", s.tagline)
    if (s.slug !== "vapor-blasting") {
      fillValue(doc, f, "shortDescription", s.shortDescription)
      fillValue(doc, f, "idealClients", s.idealClients)
      fillValue(doc, f, "benefits", s.benefits)
    }
    fillValue(doc, f, "faqs", faqItems(s.faqs, "q"))
    return f
  },
}))

const settingsPlan: Plan = {
  id: "siteSettings",
  type: "siteSettings",
  fill: (doc) => {
    const f: Fill = new Map()
    for (const key of ["positioning", "phoneOffice", "phoneIsland", "phoneTollFree", "email", "addressLine1", "addressLine2", "instagram", "facebook", "linkedin", "youtube"] as const) {
      fillValue(doc, f, key, DEFAULT_SETTINGS[key])
    }
    return f
  },
}

const PLANS: Record<string, Plan[]> = { pages, services: servicePlans, settings: [settingsPlan] }

const show = (v: Value) => {
  const s = Array.isArray(v) ? `[${v.length} ${typeof v[0] === "string" ? "lines" : "questions"}]` : JSON.stringify(v)
  return s.length > 90 ? `${s.slice(0, 87)}...` : s
}

async function main() {
  const groups = ONLY ? [ONLY] : Object.keys(PLANS)
  for (const g of groups) if (!PLANS[g]) throw new Error(`--only=${g}: use pages, services or settings`)
  console.log(`${DRY_RUN ? "Dry run" : "Filling"}: ${groups.join(", ")} (project ${client.config().projectId}, ${client.config().dataset})`)
  if (DRY_RUN && !token) console.log("No token: drafts can't be seen, so a document with a draft open would be named only on the real run.\n")

  let fields = 0
  let skipped = 0
  for (const g of groups) {
    for (const plan of PLANS[g]) {
      const doc = await client.fetch<Record<string, unknown> | null>(`*[_id == $id][0]`, { id: plan.id })
      if (doc && doc._type !== plan.type) {
        console.log(`  ${plan.id}: is a ${String(doc._type)}, not a ${plan.type}; left alone`)
        skipped++
        continue
      }
      const fill = plan.fill(doc)
      if (!fill.size && doc) {
        console.log(`  ${plan.id}: nothing empty`)
        continue
      }
      if (token) {
        const draft = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id: `drafts.${plan.id}` }, { perspective: "raw" })
        if (draft) {
          console.log(`  ${plan.id}: has a draft open in the Studio; publish or discard it, then run again. Left alone.`)
          skipped++
          continue
        }
      }
      console.log(`  ${plan.id}${doc ? "" : " (new)"}: ${fill.size} empty field${fill.size === 1 ? "" : "s"}`)
      for (const [path, value] of fill) console.log(`      ${path} = ${show(value)}`)
      fields += fill.size
      if (DRY_RUN) continue

      // The parent objects first, so a nested field has somewhere to go; then
      // only the empty fields. ifRevisionID: if the office saved the document
      // since it was read, the write is refused rather than judged on stale data.
      const parents = new Set<string>()
      for (const path of fill.keys()) {
        const parts = path.split(".")
        for (let i = 1; i < parts.length; i++) parents.add(parts.slice(0, i).join("."))
      }
      const tx = client.transaction()
      tx.createIfNotExists({ _id: plan.id, _type: plan.type, ...(plan.create ?? {}) })
      let patch = client.patch(plan.id)
      if (doc?._rev) patch = patch.ifRevisionId(doc._rev as string)
      for (const parent of [...parents].sort((a, b) => a.split(".").length - b.split(".").length)) patch = patch.setIfMissing({ [parent]: {} })
      patch = patch.set(Object.fromEntries(fill))
      tx.patch(patch)
      await tx.commit({ visibility: "async" })
    }
  }
  console.log(`\n${DRY_RUN ? "Would fill" : "Filled"} ${fields} field${fields === 1 ? "" : "s"}${skipped ? `; ${skipped} document${skipped === 1 ? "" : "s"} left alone` : ""}.`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
