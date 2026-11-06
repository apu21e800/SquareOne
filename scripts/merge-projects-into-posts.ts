/**
 * Every project becomes part of its post (6 Nov 2026, Vern: "Projects and
 * blog should be combined into the same thing, not two separate sections").
 *
 * Until now a job was a Project document with a page under /projects, and
 * most jobs were also told by a blog post. From now a job is a blog post
 * that carries its facts (sanity/schemaTypes/post.ts, "The job"). This moves
 * each Project into its post:
 *
 *  - A project with a post (the Studio's "Blog post" field, else the record's
 *    lib/projects.ts `post`): the post gets the job's fields it doesn't have
 *    yet (place, region, year, service, application, systems, client,
 *    designer, Featured, Pin to top) and the project's photographs as its
 *    "More photographs" (the one that is the post's own lead left out).
 *    Nothing the post already says is changed.
 *  - A project with no post: a new published post of the same slug, dated the
 *    day the project pages went live (lib/projects.ts RECORD_POST_DATE) or,
 *    for a project the office added later, the day it was added; its summary
 *    and paragraphs as the body, its first photograph as the lead, the rest
 *    as "More photographs". The site already shows the record's version of
 *    these (lib/blog.ts postFromRecord), so nothing new appears.
 *  - A project that exists only as a draft: the same, into the post's draft.
 *
 * Run from the site's folder, signed in to Sanity. The script's own flags go
 * after "--" (sanity exec takes anything before it as its own and prints
 * its help for one it doesn't know):
 *   npx sanity exec scripts/merge-projects-into-posts.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/merge-projects-into-posts.ts --with-user-token
 *
 * A Blog idea that points at a Project is pointed at the Project's post
 * instead (the same job), so the drafter still finds it.
 *
 * It never deletes: the Project documents stay until the separate, explicit
 *   npx sanity exec scripts/merge-projects-into-posts.ts --with-user-token -- --remove-projects
 * which deletes each Project only once its post carries the job, and the
 * /projects page opener with them. A second run of either changes nothing.
 */
import { createClient, type SanityClient } from "next-sanity"
import { RECORD_POST_DATE, categoryForJob, cityName, postSlugOf, projects as RECORD } from "../lib/projects"

const DRY_RUN = process.argv.includes("--dry-run")
const REMOVE = process.argv.includes("--remove-projects")
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN

interface Img {
  _key?: string
  _type?: string
  asset?: { _ref: string; _type?: string }
  alt?: string
  hotspot?: unknown
  crop?: unknown
}
interface ProjectDoc {
  _id: string
  _createdAt: string
  title?: string
  slug?: string
  application?: string
  service?: string
  systems?: string[]
  city?: string
  region?: string
  year?: string
  client?: string
  artist?: string
  excerpt?: string
  story?: string[]
  post?: string | null
  featured?: boolean
  hidden?: boolean
  pinned?: boolean
  pinnedAt?: string
  images?: Img[]
}
interface IdeaDoc {
  _id: string
  title?: string
  projects?: { _key?: string; _type?: string; _ref: string; _weak?: boolean }[] | null
}
interface PostDoc {
  _id: string
  slug?: string
  title?: string
  jobTitle?: string
  mainImage?: Img
  gallery?: Img[]
  application?: string
  service?: string
  city?: string
  region?: string
  systems?: string[]
  year?: string
  client?: string
  artist?: string
  featured?: boolean
  pinned?: boolean
}

const PROJECTS = `*[_type == "project"]{ _id, _createdAt, title, "slug": slug.current, application, service, systems, city, region, year, client, artist, excerpt, story, "post": post->slug.current, featured, hidden, pinned, pinnedAt, images }`
const POSTS = `*[_type == "post"]{ _id, "slug": slug.current, title, jobTitle, mainImage, gallery, application, service, city, region, systems, year, client, artist, featured, pinned }`
const IDEAS = `*[_type == "storyIdea" && count(projects) > 0]{ _id, title, projects }`

let k = 0
const key = () => `m${(++k).toString(36).padStart(4, "0")}`
const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined)
const isDraft = (id: string) => id.startsWith("drafts.")
const published = (id: string) => id.replace(/^drafts\./, "")

function paragraph(t: string) {
  return { _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: t, marks: [] }] }
}

function image(i: Img): Img {
  return { _type: "image", _key: i._key ?? key(), asset: i.asset, ...(text(i.alt) ? { alt: text(i.alt) } : {}), ...(i.hotspot ? { hotspot: i.hotspot } : {}), ...(i.crop ? { crop: i.crop } : {}) }
}

/** The job's fields the post is given when it has none of its own. */
function jobFields(p: ProjectDoc, record: (typeof RECORD)[number] | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const set = (name: string, value: unknown) => {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length)) return
    out[name] = value
  }
  set("jobTitle", text(p.title) ?? record?.title)
  set("application", text(p.application) ?? record?.application)
  set("service", text(p.service) ?? record?.service)
  set("systems", p.systems?.length ? p.systems : record?.systems)
  set("city", text(p.city) ?? record?.city)
  set("region", text(p.region) ?? record?.region)
  set("year", text(p.year) ?? record?.year)
  set("client", text(p.client) ?? record?.client)
  set("artist", text(p.artist) ?? record?.artist)
  if (p.featured || record?.featured) out.featured = true
  return out
}

async function main() {
  if (!token && !DRY_RUN) {
    console.error("No Sanity login: run it as `npx sanity exec scripts/merge-projects-into-posts.ts --with-user-token` from the site's folder (after `npx sanity login`).")
    process.exit(1)
  }
  const client: SanityClient = createClient({ projectId: "g4yp3p0k", dataset: "production", apiVersion: "2025-06-01", useCdn: false, perspective: "raw", token })
  const [projects, posts, ideas] = await Promise.all([client.fetch<ProjectDoc[]>(PROJECTS), client.fetch<PostDoc[]>(POSTS), client.fetch<IdeaDoc[]>(IDEAS)])
  const projectIds = new Set(projects.map((p) => published(p._id)))
  const assetIds = [...new Set([...projects.flatMap((p) => (p.images ?? []).map((i) => i.asset?._ref)), ...posts.map((p) => p.mainImage?.asset?._ref)].filter((x): x is string => Boolean(x)))]
  const names = new Map<string, string>()
  for (let i = 0; i < assetIds.length; i += 100) {
    const rows = await client.fetch<{ _id: string; originalFilename?: string }[]>(`*[_type == "sanity.imageAsset" && _id in $ids]{ _id, originalFilename }`, { ids: assetIds.slice(i, i + 100) })
    for (const r of rows) if (r.originalFilename) names.set(r._id, decodeURIComponent(r.originalFilename).toLowerCase())
  }
  const sameFile = (a?: string, b?: string) => Boolean(a && b && (a === b || (names.get(a) && names.get(a) === names.get(b))))

  const livePostBySlug = new Map(posts.filter((p) => !isDraft(p._id) && p.slug).map((p) => [p.slug as string, p]))
  const draftPostBySlug = new Map(posts.filter((p) => isDraft(p._id) && p.slug).map((p) => [p.slug as string, p]))
  const liveProjects = projects.filter((p) => !isDraft(p._id))
  const liveProjectIds = new Set(liveProjects.map((p) => p._id))

  /** The post a project's id now stands for: the post of the slug the project named, else of its own. */
  const postIdFor = (projectId: string): string | undefined => {
    const p = projects.find((x) => published(x._id) === published(projectId))
    if (!p?.slug) return undefined
    const record = RECORD.find((r) => r.slug === p.slug)
    const target = text(p.post) ?? (record ? postSlugOf(record) : p.slug)
    return livePostBySlug.get(target)?._id ?? draftPostBySlug.get(target)?._id?.replace(/^drafts\./, "")
  }

  /** Blog ideas still pointing at a Project: each reference moved to the Project's post. Returns the patches made (or that would be). */
  function repointIdeas(tx: ReturnType<SanityClient["transaction"]>, lines: string[]): number {
    let n = 0
    for (const idea of ideas) {
      const refs = (idea.projects ?? []).filter((r) => r?._ref)
      if (!refs.some((r) => projectIds.has(published(r._ref)))) continue
      const moved = refs.map((r) => {
        if (!projectIds.has(published(r._ref))) return r
        const id = postIdFor(r._ref)
        return id ? { ...r, _ref: id } : r
      })
      const left = moved.filter((r) => projectIds.has(published(r._ref)))
      if (left.length) {
        lines.push(`Blog idea "${idea.title ?? idea._id}" points at a Project with no post yet (${left.map((r) => r._ref).join(", ")}): run the merge first, then pick its post under Blog posts.`)
        continue
      }
      tx.patch(idea._id, (patch) => patch.set({ projects: moved }))
      n++
      lines.push(`${DRY_RUN ? "Would point" : "Pointing"} the Blog idea "${idea.title ?? idea._id}" at the posts: ${moved.map((r) => r._ref).join(", ")}.`)
    }
    return n
  }

  if (REMOVE) {
    const tx = client.transaction()
    const gone: string[] = []
    const kept: string[] = []
    // No Blog idea may be left pointing at a deleted Project.
    const pointed = repointIdeas(tx, gone)
    for (const p of projects) {
      const record = RECORD.find((r) => r.slug === p.slug)
      const target = text(p.post) ?? (record ? postSlugOf(record) : p.slug)
      const post = (isDraft(p._id) && !liveProjectIds.has(published(p._id)) ? draftPostBySlug.get(target ?? "") : undefined) ?? livePostBySlug.get(target ?? "")
      if (p.hidden || (post && text(post.city) && text(post.application))) {
        tx.delete(p._id)
        gone.push(`${p._id} ("${p.title ?? p.slug}") → ${post ? `/blog/${target}` : "was off the site"}`)
      } else kept.push(`${p._id} ("${p.title ?? p.slug}"): its post ${post ? "has no job yet" : "is not there"}; run the merge first`)
    }
    const openers = await client.fetch<{ _id: string }[]>(`*[_type == "pageHero" && page == "/projects"]{ _id }`)
    for (const o of openers) {
      tx.delete(o._id)
      gone.push(`${o._id} (the /projects page opener; the page is gone)`)
    }
    for (const g of gone) console.log(g.startsWith("Would point") || g.startsWith("Pointing") ? g : `${DRY_RUN ? "Would delete" : "Deleting"}: ${g}`)
    for (const m of kept) console.log(`Kept: ${m}`)
    if (!gone.length) return console.log("Nothing to delete.")
    if (!DRY_RUN) await tx.commit()
    console.log(`${gone.length - pointed} document(s) ${DRY_RUN ? "would be" : ""} deleted; ${kept.length} kept.`)
    return
  }

  const tx = client.transaction()
  const lines: string[] = []
  let changes = 0

  for (const p of projects) {
    const live = !isDraft(p._id)
    if (!live && liveProjectIds.has(published(p._id))) {
      lines.push(`Left: ${p._id} is an edit of a published project; its published version is moved, the draft is not. Publish or discard it in the Studio first if it matters.`)
      continue
    }
    if (!p.slug) {
      lines.push(`Left: ${p._id} has no web address.`)
      continue
    }
    if (p.hidden) {
      lines.push(`Left: ${p._id} ("${p.title}") is marked Take off the site; it gets no post.`)
      continue
    }
    const record = RECORD.find((r) => r.slug === p.slug)
    const target = text(p.post) ?? (record ? postSlugOf(record) : p.slug)
    const images = (p.images ?? []).filter((i) => i.asset?._ref)
    const fields = jobFields(p, record)
    const pin = p.pinned ? { pinned: true, ...(p.pinnedAt ? { pinnedAt: p.pinnedAt } : {}) } : {}

    // The post this project joins: the live one for a live project; for a
    // project only in draft, the post's draft when there is one, else the live post.
    const post = (live ? undefined : draftPostBySlug.get(target)) ?? livePostBySlug.get(target)
    if (post) {
      const missing: Record<string, unknown> = {}
      for (const [name, value] of Object.entries(fields)) {
        // A post named as its job already (the posts this script made) needs no second name.
        if (name === "jobTitle" && (post.jobTitle || value === post.title)) continue
        if ((post as Record<string, unknown>)[name] == null || (Array.isArray((post as Record<string, unknown>)[name]) && !((post as Record<string, unknown>)[name] as unknown[]).length)) missing[name] = value
      }
      if (!post.gallery?.length) {
        const gallery = images.filter((i) => !sameFile(i.asset?._ref, post.mainImage?.asset?._ref)).map(image)
        if (gallery.length) missing.gallery = gallery
      }
      if (!post.mainImage?.asset?._ref && images[0]) missing.mainImage = image({ ...images[0], _key: undefined })
      if (p.pinned && !post.pinned) Object.assign(missing, pin)
      if (!Object.keys(missing).length) {
        lines.push(`Already there: ${p._id} ("${p.title}") → ${post._id} (/blog/${target}) has the job.`)
        continue
      }
      tx.patch(post._id, (patch) => patch.setIfMissing(missing))
      changes++
      lines.push(`${DRY_RUN ? "Would add" : "Adding"} to ${post._id} (/blog/${target}): ${Object.keys(missing).join(", ")}${missing.gallery ? ` (${(missing.gallery as unknown[]).length} photograph(s))` : ""}.`)
      continue
    }

    // No post yet: one of the same slug, from the project's own words.
    if (!images[0]) {
      lines.push(`Left: ${p._id} ("${p.title}") has no photograph, so no post can be made from it.`)
      continue
    }
    const excerpt = text(p.excerpt) ?? record?.excerpt ?? ""
    const story = (p.story ?? []).map(text).filter((s): s is string => Boolean(s))
    const paragraphs = [excerpt, ...(story.length ? story : record?.story ?? [])].filter(Boolean)
    const service = text(fields.service as string) ?? "Stamped Asphalt"
    const application = text(fields.application as string) ?? ""
    const doc = {
      _id: `${live ? "" : "drafts."}post-${target}`,
      _type: "post",
      title: text(p.title) ?? record?.title ?? target,
      slug: { _type: "slug", current: target },
      date: record ? RECORD_POST_DATE : p._createdAt.slice(0, 10),
      category: categoryForJob({ service, application }),
      author: "Square One Paving",
      excerpt: excerpt.slice(0, 300),
      body: paragraphs.map(paragraph),
      tags: [...new Set(["Project stories", application, ...((fields.systems as string[] | undefined) ?? []), ...(text(fields.city as string) ? [cityName(fields.city as string)] : [])].filter(Boolean))],
      mainImage: image({ ...images[0], _key: undefined }),
      ...(images.length > 1 ? { gallery: images.slice(1).map(image) } : {}),
      ...Object.fromEntries(Object.entries(fields).filter(([name]) => name !== "jobTitle")),
      ...pin,
    }
    if (livePostBySlug.has(target) || (!live && draftPostBySlug.has(target))) {
      lines.push(`Left: ${p._id}: a post at /blog/${target} appeared mid-run.`)
      continue
    }
    tx.createIfNotExists(doc)
    changes++
    lines.push(`${DRY_RUN ? "Would make" : "Making"} ${doc._id} (/blog/${target}): "${doc.title}", ${paragraphs.length} paragraph(s), ${images.length} photograph(s), dated ${doc.date}${p.pinned ? ", pinned" : ""}${live ? "" : " (a draft, unpublished)"}.`)
  }

  changes += repointIdeas(tx, lines)

  for (const l of lines) console.log(l)
  if (!changes) return console.log("Nothing to change.")
  if (DRY_RUN) return console.log(`${changes} change(s) would be made. Run without --dry-run to make them.`)
  await tx.commit()
  console.log(`${changes} change(s) made. The Project documents stay until --remove-projects.`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
