/**
 * The blog pipeline: the next project with no post → a draft from its record
 * → the style pass → the fact check → an UNPUBLISHED post in Studio → an
 * email. Ported from hubss.com's Field Notes pipeline; see
 * lib/automation/drafter.ts for the writing and lib/automation/facts.ts for
 * what it may say.
 *
 * Run weekly by app/api/cron/draft-post (vercel.json), and on demand from
 * Vercel → square-one → Settings → Cron Jobs → Run.
 *
 * What it will never do: publish. It writes a document whose id starts with
 * "drafts.", which Sanity keeps out of the published perspective the site
 * reads (sanity/lib/client.ts), so nothing shows on squareonepaving.com until
 * a person opens it in Studio, checks the notes and presses Publish.
 */
import { SITE_URL } from "@/lib/site"
import { toPortableText, type PortableBlock } from "@/lib/automation/markdown"
import { checkDraft, polishDraft, styleReport, writeDraft, type Draft, type FactCheck, type StylePass } from "@/lib/automation/drafter"
import {
  captionFor,
  categoryFor,
  factsFor,
  ineligible,
  loadSubjects,
  PUBLISHED_POSTS,
  recordTags,
  relatedLines,
  type PublishedPost,
  type Subject,
} from "@/lib/automation/facts"
import { notifyList, type Claude, type Mailer, type SanityDoc, type Store } from "@/lib/automation/services"

export interface BlogDeps {
  claude: Claude
  store: Store
  mail: Mailer
  now: () => Date
}

export type BlogResult =
  | { drafted: false; reason: string }
  | {
      drafted: true
      project: string
      slug: string
      title: string
      factCheck: FactCheck["verdict"]
      toCheck: number
      style: { flagged: number; left: number }
      photo: boolean
      notified: string[]
    }

/** Where a drafted project is written down, so it is never drafted twice. Ids with a dot are private in Sanity. */
export const DRAFT_LOG = "automation.draftlog."

/** Today in BC, as the post's date (YYYY-MM-DD). */
export function pacificDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}

export function cleanSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "")
}

/** A web path with each segment encoded once (the record mixes raw and encoded names). */
function encodePath(src: string): string {
  return src
    .split("/")
    .map((seg) => {
      try {
        return encodeURIComponent(decodeURIComponent(seg))
      } catch {
        return encodeURIComponent(seg)
      }
    })
    .join("/")
}

export async function draftNextPost(opts: { project?: string }, deps: BlogDeps): Promise<BlogResult> {
  const { store } = deps
  const subjects = await loadSubjects(store)
  const drafted = new Set(await store.fetch<string[]>(`*[_id in path("${DRAFT_LOG}*")].project`))

  let subject: Subject | undefined
  if (opts.project) {
    // Asked for by name: drafted even if it was drafted before (a second go), never if it has no photo.
    subject = subjects.find((s) => s.slug === opts.project)
    if (!subject) return { drafted: false, reason: `no project "${opts.project}" on the record or in Studio` }
    if (!subject.photos.length) return { drafted: false, reason: `"${opts.project}" has no photograph` }
  } else {
    subject = subjects.find((s) => ineligible(s, drafted) === null)
    if (!subject) {
      return { drafted: false, reason: "every project on the record has a post or a draft; add a project in Studio (Projects) and the next run writes it up" }
    }
  }

  const posts = (await store.fetch<PublishedPost[] | null>(PUBLISHED_POSTS)) ?? []
  const facts = factsFor(subject)
  const written = await writeDraft(deps.claude, subject.title, facts, relatedLines(subject, posts))
  // House style before the fact check, so the check (and the notes) quote the final wording.
  const { draft, style } = await polishDraft(deps.claude, written)
  const check = await checkDraft(deps.claude, draft, facts)

  // A web address nobody uses, drafts included.
  const base = cleanSlug(draft.slug || draft.title) || cleanSlug(subject.title) || `project-story-${Date.now()}`
  let slug = base
  for (let n = 2; await store.fetch<number>(`count(*[_type == "post" && slug.current == $slug])`, { slug }); n++) slug = `${base}-${n}`

  // The lead photograph: the project's first, already in Sanity or uploaded from the site.
  const lead = subject.photos[0]
  let asset = lead?.asset ?? null
  if (!asset && lead?.src) {
    const name = decodeURIComponent(lead.src.split("/").pop() ?? "photo.jpg")
    asset = await store.uploadImage(`${SITE_URL}${encodePath(lead.src)}`, name).catch((err: unknown) => {
      console.error(`[blog] photo upload failed: ${err instanceof Error ? err.message : String(err)}`)
      return null
    })
  }
  const alt = (lead && captionFor(lead)) || `${subject.title}, ${subject.city}`

  const doc = buildDraftDocument(subject, draft, check, style, slug, asset ? { asset, alt } : null, pacificDate(deps.now()))
  await store.create(doc)
  await store.createOrReplace({
    _id: `${DRAFT_LOG}${subject.slug}`,
    _type: "automationDraftLog",
    project: subject.slug,
    post: slug,
    title: doc.title,
    createdAt: deps.now().toISOString(),
    factCheck: check.verdict,
    toCheck: check.unsupported.length,
    styleLeft: style.left.length,
  })
  console.log(
    `[blog] drafted "${doc.title}" as ${doc._id} from ${subject.slug}; fact check: ${check.verdict} (${check.unsupported.length}); style: ${style.left.length} of ${style.flagged} left${style.error ? ` (rewrite failed: ${style.error})` : ""}`,
  )

  const to = notifyList()
  const sent = await deps.mail({ to, subject: `Blog draft ready in Studio: ${doc.title}`, text: draftEmail(doc.title, doc.excerpt, slug, check, style, Boolean(asset)) })
  return {
    drafted: true,
    project: subject.slug,
    slug,
    title: doc.title,
    factCheck: check.verdict,
    toCheck: check.unsupported.length,
    style: { flagged: style.flagged, left: style.left.length },
    photo: Boolean(asset),
    notified: sent ? to : [],
  }
}

function draftEmail(title: string, excerpt: string, slug: string, check: FactCheck, style: StylePass, photo: boolean): string {
  return [
    "A new blog draft is waiting in Studio. Nothing is on squareonepaving.com until someone publishes it.",
    "",
    title,
    excerpt,
    "",
    check.unsupported.length
      ? `Fact check: ${check.unsupported.length} statement(s) to check before publishing. They're listed in the draft's "Notes for the editor".`
      : "Fact check: every statement matches the record.",
    style.left.length
      ? `Style check: ${style.left.length} sentence(s) still break the house style. They're listed in the notes.`
      : "Style check: no em dashes, no machine tells, nothing against the canon.",
    photo ? "" : "Photo: none attached. Add one of Square One's own photographs before publishing.",
    "",
    `Open it: ${SITE_URL}/studio/intent/edit/id=post-${slug};type=post`,
  ]
    .filter((l, i, all) => !(l === "" && all[i - 1] === ""))
    .join("\n")
}

/**
 * The unpublished post for a draft. Pure, so it can be checked without
 * Claude or Sanity. Its id is "drafts.post-<slug>", the draft of the same
 * "post-<slug>" id the seed gives every imported post.
 */
export function buildDraftDocument(
  subject: Subject,
  draft: Draft,
  check: FactCheck,
  style: StylePass,
  slug: string,
  photo: { asset: string; alt: string } | null,
  date: string,
): SanityDoc & { title: string; excerpt: string; body: PortableBlock[] } {
  const body = toPortableText(draft.body, "d")
  const tags = [...new Set([...(draft.tags ?? []), ...recordTags(subject)].map((t) => t.trim()).filter(Boolean))].slice(0, 8)
  const notes = [
    `Drafted by Claude on ${date} from the project "${subject.title}" (${subject.source === "record" ? "the record" : "Studio's Projects list"}). Not on the site until someone presses Publish.`,
    "",
    check.unsupported.length
      ? `FACT CHECK: ${check.unsupported.length} statement(s) the record doesn't back up. Fix or remove them before publishing:`
      : "FACT CHECK: every statement matches the record and the site's own copy.",
    ...check.unsupported.map((u) => `- "${u.quote}": ${u.reason}`),
    "",
    ...styleReport(style, "before publishing"),
    "",
    photo ? `PHOTO: the project's lead photograph (${photo.alt}). Drag the focal point onto the pavement.` : "PHOTO: none. Add one of Square One's own photographs before publishing.",
    "",
    "BASED ON:",
    ...draft.factsUsed.map((f) => `- ${f}`),
    "",
    "Before publishing: check the date, read it through, and clear these notes. They are never shown on the site.",
  ].join("\n")

  return {
    _id: `drafts.post-${slug}`,
    _type: "post",
    title: draft.title.trim(),
    slug: { _type: "slug", current: slug },
    date,
    category: categoryFor(subject),
    author: "Square One Paving",
    excerpt: draft.excerpt.trim().slice(0, 300),
    body,
    tags,
    editorNotes: notes,
    ...(photo ? { mainImage: { _type: "image", asset: { _type: "reference", _ref: photo.asset }, alt: photo.alt } } : {}),
  }
}
