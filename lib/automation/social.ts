/**
 * Social drafts for new blog posts: a published post → a draft in each
 * connected Buffer channel (Instagram, Facebook, LinkedIn) → an email. Ported
 * from hubss.com's lib/social-pipeline.ts and lib/social-drafter.ts.
 *
 * Run daily by app/api/cron/social-drafts (vercel.json). A post qualifies once
 * it is published in Studio, is dated on or after SOCIAL_SINCE, and has no
 * social log yet. The imported library is dated earlier, so it never floods
 * Buffer; a draft that sat in Studio for weeks still gets its social drafts
 * the day it goes live. At most two posts a run, oldest first.
 *
 * The post itself is the only source of facts: a person reviewed and
 * published it, so the social copy can't say anything the page doesn't. The
 * copy gets the same style pass as the blog drafts. Nothing is posted: a
 * person approves and schedules each draft in Buffer.
 *
 * Every link carries UTM tags (utm_source = the network, utm_medium=social,
 * utm_campaign=blog, utm_content = the post's slug).
 */
import type Anthropic from "@anthropic-ai/sdk"
import type { SanityImageSource } from "@sanity/image-url"
import { SITE_URL } from "@/lib/site"
import { portableToText } from "@/lib/automation/markdown"
import { HOUSE_RULES, styleReport, styleRewrite, type StylePass } from "@/lib/automation/drafter"
import type { Buffer, BufferChannel } from "@/lib/automation/buffer"
import { croppedImageUrl, notifyList, SOCIAL_MODEL, type Claude, type Mailer, type Store } from "@/lib/automation/services"

/** Posts dated before this never get social drafts (the imported library runs to April 2026). */
export const SOCIAL_SINCE = "2026-10-01"
const MAX_POSTS_PER_RUN = 2
export const SOCIAL_LOG = "automation.sociallog."

export interface SocialCopy {
  linkedin: string
  facebook: string
  instagram: string
}

/** Which copy each Buffer service gets, and what it needs. Anything else is skipped and named in the email. */
const NETWORKS: Record<string, { copy: keyof SocialCopy; shape: "portrait" | "landscape"; needsImage?: boolean; metadata?: Record<string, unknown> }> = {
  linkedin: { copy: "linkedin", shape: "landscape" },
  facebook: { copy: "facebook", shape: "landscape", metadata: { facebook: { type: "post" } } },
  instagram: { copy: "instagram", shape: "portrait", needsImage: true, metadata: { instagram: { type: "post", shouldShareToFeed: true } } },
}

export const utmLink = (slug: string, source: string) =>
  `${SITE_URL}/blog/${slug}?utm_source=${source}&utm_medium=social&utm_campaign=blog&utm_content=${encodeURIComponent(slug)}`

const SYSTEM = `You write social posts for Square One Paving, a decorative pavement installer in British Columbia (office in Maple Ridge; its own crews across the Lower Mainland and Vancouver Island), to bring people to a new post on the Blog at squareonepaving.com.

VOICE: plain, local, "we": the crew that did the job, proud of it, not a marketer. Canadian English. No hype, no clickbait, no ALL CAPS. At most one emoji, and only on Facebook or Instagram.

FACTS: say only what the POST says. No new numbers, claims, places, clients or promises.

${HOUSE_RULES}

EACH POST: one thing from the post that a municipal engineer, planner, developer, property manager or homeowner would stop for, then the link, then ONE ask: read the story. One link only: the exact URL given for that channel.

CHANNELS:
- linkedin: 400 to 900 characters. Short paragraphs. The practical point for people who specify or approve pavement. Up to 3 hashtags at the very end.
- facebook: 200 to 500 characters. Conversational and neighbourly: the street, the school, the park. Up to 2 hashtags.
- instagram: 300 to 800 characters. A strong first line, line breaks between thoughts. Links aren't clickable on Instagram, so no URL: say "Link in bio". End with 6 to 10 relevant hashtags on their own line, drawn from the post: the system, the place, the kind of work, BC.`

const TOOL: Anthropic.Tool = {
  name: "save_social",
  description: "Save the social posts.",
  input_schema: {
    type: "object",
    properties: {
      linkedin: { type: "string" },
      facebook: { type: "string" },
      instagram: { type: "string" },
    },
    required: ["linkedin", "facebook", "instagram"],
  },
}

export async function writeSocialCopy(
  claude: Claude,
  post: { title: string; excerpt: string; text: string; category: string },
  links: { linkedin: string; facebook: string },
): Promise<SocialCopy> {
  const user = [
    `POST (${post.category || "Blog"}): ${post.title}`,
    post.excerpt,
    "",
    post.text.slice(0, 9000),
    "",
    "LINKS (use exactly these, one per channel; none for instagram):",
    `- linkedin: ${links.linkedin}`,
    `- facebook: ${links.facebook}`,
    "",
    "Save them with save_social.",
  ].join("\n")
  const copy = await claude<SocialCopy>({ model: SOCIAL_MODEL, system: SYSTEM, user, tool: TOOL, maxTokens: 2500 })
  for (const k of ["linkedin", "facebook", "instagram"] as const) {
    if (typeof copy[k] !== "string" || !copy[k].trim()) throw new Error(`The ${k} copy came back empty`)
  }
  return copy
}

const LABELS: Record<keyof SocialCopy, string> = { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" }

/** The copy through the style pass; a rewrite may not make a post longer, and Facebook and Instagram keep their one emoji. */
export async function polishSocialCopy(claude: Claude, copy: SocialCopy): Promise<{ copy: SocialCopy; style: StylePass }> {
  const keys = Object.keys(LABELS) as (keyof SocialCopy)[]
  const style = await styleRewrite(
    claude,
    keys.map((k) => ({ key: k, label: LABELS[k], text: copy[k], headings: "none" as const, ignore: k === "linkedin" ? [] : ["emoji" as const] })),
    { model: SOCIAL_MODEL, system: SYSTEM, maxGrowth: 1 },
  )
  const out: SocialCopy = { ...copy }
  for (const k of keys) out[k] = style.text[k] ?? copy[k]
  return { copy: out, style }
}

export interface SocialDeps {
  claude: Claude
  store: Store
  buffer: Buffer
  mail: Mailer
  now: () => Date
}

export interface SocialResult {
  slug: string
  title: string
  drafted: { service: string; channel: string }[]
  skipped: { service: string; channel: string; why: string }[]
  styleCheck: string
}

interface DuePost {
  title: string
  slug: string
  date: string
  category?: string
  excerpt?: string
  seoDescription?: string
  body?: unknown
  mainImage?: (SanityImageSource & { asset?: { _ref?: string }; alt?: string }) | null
}

const DUE = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && date >= $since] | order(date asc) {
  title, "slug": slug.current, date, category, excerpt, seoDescription, body, mainImage
}`

export async function draftSocialForNewPosts(deps: SocialDeps): Promise<{ posts: SocialResult[]; waiting: number; note?: string }> {
  const { store } = deps
  const logged = new Set(await store.fetch<string[]>(`*[_id in path("${SOCIAL_LOG}*")].slug`))
  const due = ((await store.fetch<DuePost[] | null>(DUE, { since: SOCIAL_SINCE })) ?? []).filter((p) => !logged.has(p.slug))
  if (!due.length) return { posts: [], waiting: 0 }

  const channels = await deps.buffer.channels()
  // Nothing connected yet: log nothing, so the posts get their drafts once channels are there.
  if (!channels.length) return { posts: [], waiting: due.length, note: "no channels are connected in Buffer yet" }

  const results: SocialResult[] = []
  for (const post of due.slice(0, MAX_POSTS_PER_RUN)) {
    const links = { linkedin: utmLink(post.slug, "linkedin"), facebook: utmLink(post.slug, "facebook") }
    const written = await writeSocialCopy(
      deps.claude,
      { title: post.title, excerpt: post.seoDescription || post.excerpt || "", text: portableToText(post.body), category: post.category ?? "" },
      links,
    )
    const { copy, style } = await polishSocialCopy(deps.claude, written)
    const result: SocialResult = { slug: post.slug, title: post.title, drafted: [], skipped: [], styleCheck: styleReport(style, "in Buffer before approving").join("\n") }

    const drafts: { _key: string; service: string; channel: string; bufferPostId: string }[] = []
    for (const ch of channels) {
      const service = ch.service.toLowerCase()
      const rule = NETWORKS[service]
      const label = channelLabel(ch)
      if (!rule) {
        result.skipped.push({ service, channel: label, why: "not a network this pipeline writes for (TikTok and YouTube need a video)" })
        continue
      }
      const imageUrl = post.mainImage?.asset?._ref ? croppedImageUrl(post.mainImage, rule.shape === "portrait" ? 1080 : 1200, rule.shape === "portrait" ? 1350 : 630) : undefined
      if (rule.needsImage && !imageUrl) {
        result.skipped.push({ service, channel: label, why: "Instagram needs a photo and the post has none" })
        continue
      }
      try {
        const id = await deps.buffer.createDraft({ channelId: ch.id, text: copy[rule.copy], imageUrl, imageAlt: post.mainImage?.alt || post.title, metadata: rule.metadata })
        drafts.push({ _key: ch.id, service, channel: label, bufferPostId: id })
        result.drafted.push({ service, channel: label })
      } catch (err) {
        result.skipped.push({ service, channel: label, why: err instanceof Error ? err.message : String(err) })
      }
    }

    // Logged even if some channels failed, so a post is never drafted twice; what failed is in the log and the email.
    await store.createOrReplace({
      _id: `${SOCIAL_LOG}${post.slug}`,
      _type: "automationSocialLog",
      slug: post.slug,
      title: post.title,
      createdAt: deps.now().toISOString(),
      drafts,
      skipped: result.skipped.map((s, i) => ({ _key: `s${i}`, ...s })),
      styleCheck: result.styleCheck,
    })
    console.log(`[social] ${post.slug}: ${result.drafted.length} Buffer draft(s), ${result.skipped.length} skipped; style: ${style.left.length} of ${style.flagged} left${style.error ? ` (rewrite failed: ${style.error})` : ""}`)
    await deps.mail({ to: notifyList(), subject: `Social drafts ready in Buffer: ${post.title}`, text: socialEmail(result) })
    results.push(result)
  }
  return { posts: results, waiting: Math.max(0, due.length - MAX_POSTS_PER_RUN) }
}

function channelLabel(ch: BufferChannel): string {
  return ch.displayName || ch.name
}

function socialEmail(r: SocialResult): string {
  const list = (xs: { service: string; channel: string }[]) => xs.map((x) => `${x.channel} (${x.service})`).join(", ")
  return [
    `Social drafts for the new post "${r.title}" are waiting in Buffer. Nothing posts until someone approves and schedules them.`,
    "",
    r.drafted.length ? `Drafted: ${list(r.drafted)}` : "Nothing was drafted.",
    ...(r.skipped.length ? ["", "Skipped:", ...r.skipped.map((s) => `- ${s.channel} (${s.service}): ${s.why}`)] : []),
    "",
    r.styleCheck,
    "",
    "Review them: https://publish.buffer.com/drafts",
  ].join("\n")
}
