/**
 * The social copy for one item, one version per channel, written by Claude in
 * Square One's voice (ported from hubss.com's lib/social-drafter.ts,
 * 14 Oct 2026). The source is the only source of facts: a published blog
 * post a person reviewed, a field post the crew wrote, or something the site
 * already publishes (lib/automation/social-library.ts). The posts can't say
 * anything their source doesn't.
 *
 * Four channels: LinkedIn, Facebook, Instagram ("Link in bio") and Google
 * Business Profile (no URL and no phone number in the text: the post's
 * button carries the link, and Google refuses phone numbers in posts).
 */
import type Anthropic from "@anthropic-ai/sdk"
import { HOUSE_RULES, styleRewrite, type StylePass } from "@/lib/automation/drafter"
import { SOCIAL_MODEL, type Claude } from "@/lib/automation/services"

export interface SocialCopy {
  linkedin: string
  facebook: string
  instagram: string
  /** Google Business Profile: the post on Square One's listing in Search and Maps. */
  google: string
}

export const SOCIAL_KEYS = ["linkedin", "facebook", "instagram", "google"] as const

/**
 * What the posts are written from. A new blog post is the first case; since
 * 14 Oct 2026 also a field post (photos the crew took of a finished job,
 * Studio → Job photos) and a library item (a documented project or a
 * service page). For those two, the rules' word "post" means this source,
 * and `linkTo` says what the link opens, so the ask fits the page.
 */
export interface SocialSource {
  kind: "article" | "field" | "library"
  title: string
  /** For an article, its blog section; for the others, a short label ("A documented Square One project"). */
  type: string
  excerpt: string
  text: string
  /** What the link opens: "the stamped asphalt page on squareonepaving.com". */
  linkTo?: string
}

/** Up to 1,500 characters on Google, and none of them a phone number. */
export const GOOGLE_MAX = 1500

const SYSTEM = `You write social posts for Square One Paving, a decorative pavement installer in British Columbia (office in Maple Ridge; its own crews across the Lower Mainland and Vancouver Island), to bring people to squareonepaving.com.

VOICE: plain, local, "we": the crew that did the job, proud of it, not a marketer. Canadian English. No hype, no clickbait, no ALL CAPS. At most one emoji, and only on Facebook or Instagram.

FACTS: say only what the SOURCE says. No new numbers, claims, places, clients or promises.

${HOUSE_RULES}

EACH POST: one thing from the source that a municipal engineer, planner, developer, strata council, property manager or homeowner would stop for, then the link where the channel takes one, then ONE ask that fits what the link opens. One link only: the exact URL given for that channel.

CHANNELS:
- linkedin: 400 to 900 characters. Short paragraphs. The practical point for people who specify or approve pavement. Up to 3 hashtags at the very end.
- facebook: 200 to 500 characters. Conversational and neighbourly: the street, the school, the park. Up to 2 hashtags.
- instagram: 300 to 800 characters. A strong first line, line breaks between thoughts. Links aren't clickable on Instagram, so no URL: say "Link in bio". End with 6 to 10 relevant hashtags on their own line, drawn from the source: the system, the place, the kind of work, BC.
- google: 150 to 600 characters, for someone who found Square One on Google Search or Maps: what was done and where, in plain words. No URL (the post's button opens the page), no phone number (Google refuses them), no hashtags, no emoji.`

const TOOL: Anthropic.Tool = {
  name: "save_social",
  description: "Save the social posts.",
  input_schema: {
    type: "object",
    properties: {
      linkedin: { type: "string" },
      facebook: { type: "string" },
      instagram: { type: "string" },
      google: { type: "string" },
    },
    required: ["linkedin", "facebook", "instagram", "google"],
  },
}

/** The framing for each kind of source: the facts stay the source's own, and the ask fits the link. */
function framing(source: SocialSource): string[] {
  const link = source.linkTo ?? "a page on squareonepaving.com"
  if (source.kind === "field") {
    return [
      "SOURCE: a FIELD POST, a finished Square One job photographed by the crew. Say only what it says, and add nothing about the client, the date or the size of the job that it doesn't give.",
      `The link opens ${link}, not an article: invite them to see the service and ask for a free site visit. Never write "read the story" or "read the article".`,
      "Lead with the job itself: where it is and what went down. The photo carries the post.",
    ]
  }
  if (source.kind === "library") {
    return [
      "SOURCE: from Square One's LIBRARY, an earlier documented project or a service page on squareonepaving.com. Say only what it says.",
      "It is not news: never call it new, recent, just finished or this week's.",
      `The link opens ${link}${/story|article|blog/i.test(link) ? "" : ': invite them to see it and ask for a free site visit, and never write "read the story" or "read the article"'}.`,
    ]
  }
  return ["SOURCE: a new post on the Blog at squareonepaving.com. The ask: read the story."]
}

export async function writeSocialCopy(claude: Claude, source: SocialSource, links: { linkedin: string; facebook: string }): Promise<SocialCopy> {
  const head = source.kind === "article" ? `POST (${source.type || "Blog"}): ${source.title}` : `${source.type.toUpperCase()}: ${source.title}`
  const user = [
    ...framing(source),
    "",
    head,
    source.excerpt,
    "",
    source.text.slice(0, 9000),
    "",
    "LINKS (use exactly these, one per channel; none for instagram and google):",
    `- linkedin: ${links.linkedin}`,
    `- facebook: ${links.facebook}`,
    "",
    "Save them with save_social.",
  ].join("\n")
  const copy = await claude<SocialCopy>({ model: SOCIAL_MODEL, system: SYSTEM, user, tool: TOOL, maxTokens: 3000, timeoutMs: 60_000, maxRetries: 0 })
  for (const k of SOCIAL_KEYS) {
    if (typeof copy?.[k] !== "string" || !copy[k].trim()) throw new Error(`The ${k} copy came back empty`)
  }
  return { linkedin: copy.linkedin, facebook: copy.facebook, instagram: copy.instagram, google: copy.google }
}

const LABELS: Record<keyof SocialCopy, string> = { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram", google: "Google Business Profile" }

/**
 * The copy through the style pass (lib/automation/drafter.ts): one rewrite of
 * any sentence that breaks the house style or the canon, then a second lint.
 * A rewrite may not make a post longer, and Facebook and Instagram keep the
 * one emoji the rules allow them.
 */
export async function polishSocialCopy(claude: Claude, copy: SocialCopy): Promise<{ copy: SocialCopy; style: StylePass }> {
  const style = await styleRewrite(
    claude,
    SOCIAL_KEYS.map((k) => ({ key: k, label: LABELS[k], text: copy[k], headings: "none" as const, ignore: k === "facebook" || k === "instagram" ? ["emoji" as const] : [] })),
    { model: SOCIAL_MODEL, system: SYSTEM, maxGrowth: 1, timeoutMs: 30_000 },
  )
  const out: SocialCopy = { ...copy }
  for (const k of SOCIAL_KEYS) out[k] = style.text[k] ?? copy[k]
  return { copy: out, style }
}

/**
 * Google's text as Google will take it: no phone number (Google refuses
 * posts with one; the style pass can't know that rule), no URL, at most
 * GOOGLE_MAX characters. Returns the problem when it can't be made right.
 */
export function googleText(text: string): { text: string; problem?: string } {
  const t = text.replace(/https?:\/\/\S+/g, "").replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim()
  // Any dash (en, em, non-breaking hyphen, minus) reads as a hyphen; the separators are optional.
  const plain = t.replace(/[\u2010-\u2015\u2212]/g, "-")
  if (/(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/.test(plain)) return { text: t, problem: "the Google copy has a phone number, which Google refuses" }
  if (t.length > GOOGLE_MAX) return { text: t, problem: `the Google copy is longer than ${GOOGLE_MAX} characters` }
  return { text: t }
}
