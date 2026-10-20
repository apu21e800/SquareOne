/**
 * The Blog plan's first items (14 Oct 2026, as hubss.com's
 * scripts/seed-field-notes-plan.ts): one project story for each real Square
 * One job, chosen by Vern. Nothing is invented: a project story is written
 * only from its job's record (Studio → Projects, as the site shows it), so a
 * job has to be in Projects, with its photographs, before it can be planned.
 *
 * Without --jobs it offers every documented job that has no article of its
 * own, newest work first (nine on 14 Oct 2026). With --jobs it takes the
 * jobs named, in that order. Each becomes an Idea at priority 2; the drafter
 * takes the top one on its next run (Tuesday or Thursday), or the one marked
 * Ready.
 *
 * Each item is created once, with a fixed id (storyIdea-seed-<nn>-<job>),
 * and never overwritten: a re-run leaves Studio edits alone. A job another
 * plan item already tells is left out.
 *
 * Usage:
 *   npm run plan:seed -- --dry-run                       what it would add; no token, reads the public data
 *   npm run plan:seed -- --dry-run --jobs=a,b,c          the jobs named (their web addresses), in that order
 *   npx sanity login                                     once, in a browser
 *   SEED_JOBS=a,b,c npx sanity exec scripts/seed-blog-plan.ts --with-user-token
 *                                                        adds them, as the person logged in
 *
 * (SANITY_API_WRITE_TOKEN in the environment works as well as the login.)
 */
import { createClient, type SanityClient } from "next-sanity"
import { projects as RECORD } from "../lib/projects"

const DRY_RUN = process.argv.includes("--dry-run")
const JOBS = (process.argv.find((a) => a.startsWith("--jobs="))?.slice("--jobs=".length) ?? process.env.SEED_JOBS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token && !DRY_RUN) {
  console.error("No way to write: run it with `npx sanity exec scripts/seed-blog-plan.ts --with-user-token` (after `npx sanity login`), or add --dry-run to see what it would add.")
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "g4yp3p0k",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-01",
  useCdn: false,
  perspective: "published",
  token: token || undefined,
})

interface StudioProject {
  _id: string
  slug: string
  title?: string
  year?: string
  post?: string | null
  hidden?: boolean | null
  images?: number | null
  _createdAt?: string
}

interface Job {
  slug: string
  docId?: string
  title: string
  year?: string
  post?: string
  hidden: boolean
  flag: boolean
  photos: number
  studioOnly: boolean
  createdAt?: string
}

async function main() {
  const studio =
    (await client.fetch<StudioProject[] | null>(
      `*[_type == "project" && defined(slug.current)]{ _id, "slug": slug.current, title, year, "post": post->slug.current, hidden, "images": count(images), _createdAt }`,
    )) ?? []
  const plan =
    (await client.fetch<{ _id: string; title?: string; jobs?: (string | null)[] | null }[] | null>(
      `*[_type == "storyIdea"]{ _id, title, "jobs": projects[]->slug.current }`,
    )) ?? []
  const told = new Map<string, string>()
  for (const p of plan) for (const j of p.jobs ?? []) if (j) told.set(j, p.title ?? p._id)

  const bySlug = new Map(studio.map((p) => [p.slug, p]))
  const recordSlugs = new Set(RECORD.map((r) => r.slug))
  // The site's version of each job: the Studio's fields over the record's (lib/projects-cms.ts).
  const jobs: Job[] = [
    ...studio
      .filter((p) => !recordSlugs.has(p.slug))
      .map((p) => ({ slug: p.slug, docId: p._id, title: p.title ?? p.slug, year: p.year, post: p.post ?? undefined, hidden: Boolean(p.hidden), flag: false, photos: p.images ?? 0, studioOnly: true, createdAt: p._createdAt }))
      .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")),
    ...RECORD.map((r, i) => ({ r, i }))
      .sort((a, b) => Number(b.r.year ?? 0) - Number(a.r.year ?? 0) || a.i - b.i)
      .map(({ r }) => {
        const s = bySlug.get(r.slug)
        return {
          slug: r.slug,
          docId: s?._id,
          title: s?.title?.trim() || r.title,
          year: s ? s.year : r.year,
          post: s?.post ?? r.post,
          hidden: Boolean(s?.hidden),
          flag: Boolean(r.flag),
          photos: s?.images || r.images.length,
          studioOnly: false,
        }
      }),
  ]
  const known = new Map(jobs.map((j) => [j.slug, j]))

  const wanted = JOBS.length ? JOBS.map((slug) => known.get(slug) ?? slug) : jobs.filter((j) => !j.post && !j.hidden && !j.flag)
  const docs: Record<string, unknown>[] = []
  const skipped: string[] = []
  for (const j of wanted) {
    if (typeof j === "string") {
      skipped.push(`${j}: no such job in Projects (add it in Studio → Projects, with its photographs, first)`)
      continue
    }
    const why = j.hidden
      ? "taken off the site"
      : j.flag
        ? "its location awaits Square One's yes"
        : j.post
          ? `already has a post (/blog/${j.post})`
          : !j.photos
            ? "no photograph"
            : !j.docId
              ? "not in Studio yet (run npm run cms:import first)"
              : told.has(j.slug)
                ? `already in the plan ("${told.get(j.slug)}")`
                : null
    if (why) {
      skipped.push(`${j.slug}: ${why}`)
      continue
    }
    const n = String(docs.length + 1).padStart(2, "0")
    docs.push({
      _id: `storyIdea-seed-${n}-${j.slug}`.slice(0, 120),
      _type: "storyIdea",
      title: j.title,
      status: "idea",
      priority: 2,
      type: "project",
      projects: [{ _type: "reference", _ref: j.docId, _key: j.slug.slice(0, 40), _weak: true }],
    })
  }

  console.log(`${DRY_RUN ? "Would add" : "Adding"} ${docs.length} project stor${docs.length === 1 ? "y" : "ies"} to Blog ideas, in this order:`)
  for (const d of docs) console.log(`  ${d._id}  "${d.title}"`)
  if (skipped.length) console.log(`Left out:\n${skipped.map((s) => `  ${s}`).join("\n")}`)
  if (DRY_RUN || !docs.length) return

  const tx = client.transaction()
  for (const d of docs) tx.createIfNotExists(d as { _id: string; _type: string })
  await tx.commit({ visibility: "async" })
  console.log(`Done: ${docs.length} item(s) in Studio → Blog plan. An item that was already there was left as it is.`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
