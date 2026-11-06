/**
 * The Blog plan's first items (14 Oct 2026, as hubss.com's
 * scripts/seed-field-notes-plan.ts): one project story for each real Square
 * One job, chosen by Vern. Nothing is invented: a project story is written
 * only from its job's record (since 6 Nov 2026 the job's blog post, with its
 * job filled in: Studio → Blog posts), so a job has to be a post, with its
 * photographs, before it can be planned.
 *
 * Without --jobs it offers every documented job whose post has no story yet
 * (every job on record is told, so that is a post the office added with its
 * job filled in and an empty body). With --jobs it takes the jobs named, in
 * that order. Each becomes an Idea at priority 2; the drafter takes the top
 * one on its next run (Tuesday or Thursday), or the one marked Ready, and
 * writes the story into the post.
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
import { loadSubjects } from "../lib/automation/facts"
import type { Store } from "../lib/automation/services"

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

interface Job {
  slug: string
  docId?: string
  title: string
  year?: string
  post?: string
  flag: boolean
  photos: number
}

async function main() {
  // The jobs as the drafter sees them (lib/automation/facts.ts, 6 Nov 2026):
  // each a blog post with its job filled in, told once its post has its story.
  const subjects = await loadSubjects({ fetch: <T,>(query: string, params?: Record<string, unknown>) => client.fetch<T>(query, params ?? {}) } as Store)
  const plan =
    (await client.fetch<{ _id: string; title?: string; jobs?: (string | null)[] | null }[] | null>(
      `*[_type == "storyIdea"]{ _id, title, "jobs": projects[]->slug.current }`,
    )) ?? []
  const told = new Map<string, string>()
  for (const p of plan) for (const j of p.jobs ?? []) if (j) told.set(j, p.title ?? p._id)

  const jobs: Job[] = subjects.map((s) => ({ slug: s.slug, docId: s.docId, title: s.title, year: s.year, post: s.post, flag: Boolean(s.flag), photos: s.photos.length }))
  const known = new Map(jobs.map((j) => [j.slug, j]))

  const wanted = JOBS.length ? JOBS.map((slug) => known.get(slug) ?? slug) : jobs.filter((j) => !j.post && !j.flag)
  const docs: Record<string, unknown>[] = []
  const skipped: string[] = []
  for (const j of wanted) {
    if (typeof j === "string") {
      skipped.push(`${j}: no such job (add it in Studio → Blog posts, with its photographs and The job filled in, first)`)
      continue
    }
    const why = j.flag
      ? "its location awaits Square One's yes"
      : j.post
        ? `already told by its post (/blog/${j.post})`
        : !j.photos
          ? "no photograph"
          : !j.docId
            ? "its post is not in the Studio yet"
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
