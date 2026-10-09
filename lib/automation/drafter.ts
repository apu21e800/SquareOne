/**
 * The AI half of the blog pipeline: write a draft, pass it through the house
 * style, then check it. Ported from hubss.com's lib/field-note-drafter.ts
 * (the pipeline Vern runs there), rewritten for Square One's voice and canon.
 *
 * Three calls to Claude. The first writes the post from the FACTS block
 * (lib/automation/facts.ts): Square One's own record and the copy the site
 * already publishes, nothing else. The second rewrites only the sentences
 * that break the house style or the canon (lib/automation/style.ts). The
 * third is a separate fact check that compares the draft with the same FACTS
 * and lists every statement they don't support. The leftovers of both checks
 * go in the draft's "Notes for the editor" and in the email, so the person
 * who presses Publish knows exactly what to look at. Nothing here publishes.
 */
import type Anthropic from "@anthropic-ai/sdk"
import { BLOG_MODEL, type Claude } from "@/lib/automation/services"
import { flagSentences, keepsFacts, PRODUCT_NAMES, type FlagOptions, type StyleRule } from "@/lib/automation/style"

export interface Draft {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  body: string
  factsUsed: string[]
}

export interface FactCheck {
  verdict: "clean" | "needs edits"
  unsupported: { quote: string; reason: string }[]
}

/** The rules every piece of Square One copy follows, shared with the social drafter. */
export const HOUSE_RULES = `THE CANON, which beats everything else:
- The company that makes the systems is never named, whatever you know about it: say "the manufacturer".
- Square One installs the systems; it doesn't make them: never "our StreetPrint", never "we developed".
- A project is "installed at" its site, never "for" someone.
- A figure about how a system performs (service life, slip resistance) is the manufacturer's, and is said so: "the manufacturer publishes a 10–20 year service life".
- No guarantee, warranty, certification, award, price or lead time. The only warranty line on record: the manufacturer warrants the material; Square One warrants the workmanship.
- The office is in Maple Ridge. Vancouver Island is a service region with its own phone line, never an office or a base.
- "Blog" and "project story", never "journal" or "case study". No counts as a selling point ("hundreds of crosswalks"): say "since 2000", or show the one job.

HOUSE STYLE: sentence case for titles and headings ("How the crossing goes down", not "How The Crossing Goes Down"). System names exactly: ${PRODUCT_NAMES.join(", ")}. No em dashes, none at all: an aside goes between commas or in parentheses, a pivot gets a full stop or a colon, a list gets commas. En dash only inside a span (10–20 years, 2025–26).

MACHINE TELLS: readers recognise machine-written copy on sight and it costs trust, so none of these appears:
- Em dashes, anywhere, even one.
- The reversal: "It's not X, it's Y", "not just X", "more than a crosswalk".
- Three of everything: three adjectives, three fragments, three parallel clauses, because three felt complete. Use two, or four, or one.
- Stacked fragments as a device ("Bright. Durable. Local.").
- "Whether you're a ... or a ...", "From X to Y", "In today's ...", "In a world where ...", "Here's the thing", "Let's dive in", "When it comes to", "Think of it as".
- Headings that ask a question, headings built as "X: Y".
- Filler: seamless, robust, elevate, leverage, unlock, empower, harness, streamline, holistic, tailored, bespoke, cutting-edge, game-changing, world-class, stunning, vibrant, solutions (as filler), journey, landscape (as a metaphor), ensure, delve.
- A last line that restates the paragraph. The hedge that says nothing ("it's worth noting").
- Exclamation marks. "Discover", "Explore", "Learn more"; say what happens instead ("Get a quote", "Read the story").
The test: read it aloud. If the person who ran the job wouldn't say it on the phone, cut it.`

const VOICE = `You write project stories for the Blog on squareonepaving.com. Square One Paving installs decorative pavement in British Columbia with its own crews: stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting. The readers specify, approve and pay for pavement: municipal engineers and planners, landscape architects, developers, contractors, property managers, and homeowners.

VOICE: plain, local, "we". Write like the person who ran the job telling a client about it: concrete, practical, proud of the work without selling it. Canadian English (colour, centre, metre, curb, neighbourhood). Short paragraphs.

THE FACTS RULE:
- Every statement about Square One, the project, the systems (what they are, how they go down, how they last), numbers, years, places, sites, clients and artists comes from the FACTS. If the FACTS don't say it, don't write it.
- Never invent a date, a dimension, a quantity, a duration, a crew size, a client, an artist, a quote from anyone, a price or a lead time. Don't name a person, business, agency or place the FACTS don't name.
- General context that isn't about Square One or the systems (why a crossing needs to be seen, what freeze-thaw does to paint) is fine in plain words, without numbers.
- If the story needs a fact you don't have, leave it out. A shorter post is better than a guessed one.

${HOUSE_RULES}

SHAPE: 450 to 750 words of markdown. Open with one or two short paragraphs, no heading, that say what was installed and where. Then two to four sections with "## " headings a reader can scan: what the site needed, how the system goes down, what to know if you're planning one, whichever the FACTS support. A short bullet list where it helps. No "# " title line, no images, no tables, no HTML. End with one or two sentences on the next step, from the FACTS (the free site walk with the sample boards, then a written quote), linking [Get a quote](/contact). No hard sell.

LINKS: link the first mention of each system and the service to their pages, with the paths the FACTS give; the project page if the FACTS give one; one or two RELATED POSTS where they genuinely help. No other links.`

const SAVE_DRAFT: Anthropic.Tool = {
  name: "save_draft",
  description: "Save the finished blog draft.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "The headline, under 70 characters, sentence case: the place and what was installed." },
      slug: { type: "string", description: "The web address: lowercase words joined by hyphens, under 60 characters." },
      excerpt: { type: "string", description: "One or two sentences, under 220 characters: what the reader will get." },
      tags: { type: "array", items: { type: "string" }, description: "Three to six short tags: the systems, the place, the kind of work." },
      body: { type: "string", description: "The post in markdown, as described. No title line." },
      factsUsed: { type: "array", items: { type: "string" }, description: "Each FACT the body relies on, quoted from the FACTS." },
    },
    required: ["title", "slug", "excerpt", "tags", "body", "factsUsed"],
  },
}

const REPORT: Anthropic.Tool = {
  name: "report",
  description: "Report the fact check.",
  input_schema: {
    type: "object",
    properties: {
      verdict: { type: "string", enum: ["clean", "needs edits"] },
      unsupported: {
        type: "array",
        items: {
          type: "object",
          properties: {
            quote: { type: "string", description: "The statement, word for word from the draft." },
            reason: { type: "string", description: "One line: what the FACTS say instead, or that they say nothing about it." },
          },
          required: ["quote", "reason"],
        },
      },
    },
    required: ["verdict", "unsupported"],
  },
}

export async function writeDraft(claude: Claude, workingTitle: string, facts: string, related: string[]): Promise<Draft> {
  const user = [
    `Write a project story for the Blog.`,
    ``,
    `WORKING TITLE: ${workingTitle}`,
    ``,
    `FACTS:`,
    facts,
    ``,
    `RELATED POSTS (published on squareonepaving.com; link where useful):`,
    related.length ? related.join("\n") : "(none)",
    ``,
    `Save it with save_draft.`,
  ].join("\n")
  const draft = await claude<Draft>({ model: BLOG_MODEL, system: VOICE, user, tool: SAVE_DRAFT, maxTokens: 6000 })
  if (!draft.body?.trim() || !draft.title?.trim()) throw new Error("The draft came back empty")
  return { ...draft, tags: Array.isArray(draft.tags) ? draft.tags : [], factsUsed: Array.isArray(draft.factsUsed) ? draft.factsUsed : [] }
}

export async function checkDraft(claude: Claude, draft: Draft, facts: string): Promise<FactCheck> {
  const system = `You fact-check blog posts for Square One Paving before a person publishes them. You are strict and literal. Compare the DRAFT with the FACTS and list every statement about Square One, the project, the systems, numbers, years, durations, dimensions, places, sites, clients, artists or people that the FACTS do not support: numbers that differ, capabilities the FACTS don't claim, a performance figure not attributed to the manufacturer, any place, business, agency or person the FACTS don't name, and any promise (a guarantee, a lead time, a price). Also list any sentence that names the company that makes the systems, or says Square One makes or developed them. General context with no numbers that isn't about Square One or the systems is fine; don't list it. Links are fine. If everything is supported, the verdict is "clean" and the list is empty.`
  const user = `FACTS:\n${facts}\n\nDRAFT:\n# ${draft.title}\n\n${draft.excerpt}\n\n${draft.body}\n\nReport with the report tool.`
  const result = await claude<FactCheck>({ model: BLOG_MODEL, system, user, tool: REPORT, maxTokens: 3000 })
  const unsupported = Array.isArray(result.unsupported) ? result.unsupported : []
  return { verdict: unsupported.length ? "needs edits" : "clean", unsupported }
}

// ── the style pass ──────────────────────────────────────────────────────────

/** One piece of copy for the style pass: a field of a draft, or one network's post. */
export interface CopyPiece {
  key: string
  /** How the prompt and the editor's notes name it: "Title", "Body", "LinkedIn". */
  label: string
  text: string
  headings: FlagOptions["headings"]
  ignore?: StyleRule[]
}

export interface StylePass {
  /** The copy after the rewrite, by key. */
  text: Record<string, string>
  /** How many sentences broke the style as Claude first wrote them. */
  flagged: number
  /** The sentences that still do, for a person to fix. */
  left: { label: string; sentence: string; problems: string[] }[]
  /** Why the rewrite didn't happen, when it didn't. */
  error?: string
}

const REWRITE: Anthropic.Tool = {
  name: "save_rewrites",
  description: "Save the rewritten sentences.",
  input_schema: {
    type: "object",
    properties: {
      rewrites: {
        type: "array",
        items: {
          type: "object",
          properties: {
            n: { type: "integer", description: "The sentence's number, as given." },
            rewrite: { type: "string", description: "The rewritten sentence, and nothing else." },
          },
          required: ["n", "rewrite"],
        },
      },
    },
    required: ["rewrites"],
  },
}

const EDITOR = `You are now the copy editor, not the writer. You get sentences from a draft that break the house style or the canon, each with its problem. Rewrite each one so the problem is gone, and change nothing else:
- Keep every fact: the same numbers, system names, places, names and links, and the same markdown (bold, italic, links).
- Change only what the problem needs; keep the rest of the wording. Where the problem is a claim the canon forbids (a guarantee, a price, the manufacturer's name), take the claim out rather than rewording it.
- One rewrite per number: no new points, and don't merge it with the text around it.
- A title or heading stays short and in sentence case (capitals on the first word and on names only).
- No dash between clauses, of any kind: use a comma, a colon, a full stop or parentheses.
- Don't make it longer than it is.`

/** The rewrite as the original sat in the text: no quotes or markdown marks Claude added round it. */
function asWritten(rewrite: string, original: string): string {
  let out = rewrite.trim()
  if (/^["\u201C][\s\S]*["\u201D]$/.test(out) && !/^["\u201C]/.test(original)) out = out.slice(1, -1).trim()
  if (!/^#/.test(original)) out = out.replace(/^#{1,6}\s+/, "")
  if (!/^[-*+]\s/.test(original)) out = out.replace(/^[-*+]\s+/, "")
  return out
}

/**
 * Lint the copy, ask Claude ONCE to rewrite only the sentences that fail
 * (keeping every fact), then lint again. A rewrite is used only if it kept
 * the sentence's numbers, links and system names and didn't grow; otherwise
 * the original stays and is reported. If the call fails, the copy is kept as
 * written and everything flagged is reported: a style problem never costs a
 * draft.
 */
export async function styleRewrite(
  claude: Claude,
  pieces: CopyPiece[],
  opts: { model: string; system: string; maxGrowth?: number },
): Promise<StylePass> {
  const text: Record<string, string> = Object.fromEntries(pieces.map((p) => [p.key, p.text]))
  const flag = (p: CopyPiece) => flagSentences(text[p.key] ?? "", { headings: p.headings, ignore: p.ignore })
  const problems = (issues: { message: string }[]) => [...new Set(issues.map((i) => i.message))]
  const items = pieces.flatMap((piece) => flag(piece).map((f) => ({ piece, f })))
  if (!items.length) return { text, flagged: 0, left: [] }

  let error: string | undefined
  try {
    const list = items.map(({ piece, f }, i) => `${i + 1}. [${piece.label}] ${f.text}\n   Problem: ${problems(f.issues).join(" ")}`)
    const user = `Rewrite these ${items.length} sentence(s), then save them with save_rewrites.\n\n${list.join("\n\n")}`
    const res = await claude<{ rewrites?: { n: number; rewrite: string }[] }>({
      model: opts.model,
      system: `${opts.system}\n\n${EDITOR}`,
      user,
      tool: REWRITE,
      maxTokens: 4000,
    })
    const growth = opts.maxGrowth ?? 1.3
    for (const r of Array.isArray(res.rewrites) ? res.rewrites : []) {
      const item = items[r.n - 1]
      if (!item || typeof r.rewrite !== "string") continue
      const before = item.f.text
      const after = asWritten(r.rewrite, before)
      if (after === before || !keepsFacts(before, after) || after.length > before.length * growth + 10) continue
      const current = text[item.piece.key]
      if (current.includes(before)) text[item.piece.key] = current.split(before).join(after)
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
  }
  const left = pieces.flatMap((p) => flag(p).map((f) => ({ label: p.label, sentence: f.text, problems: problems(f.issues) })))
  return { text, flagged: items.length, left, ...(error ? { error } : {}) }
}

/** The style pass for the editor to read: one line when it's clean, else the sentences to fix. */
export function styleReport(style: StylePass, fix: string): string[] {
  if (!style.left.length) {
    return [
      style.flagged
        ? `STYLE CHECK: clean. The drafter rewrote ${style.flagged} sentence(s) that broke the house style or the canon.`
        : "STYLE CHECK: clean, nothing against the house style or the canon.",
    ]
  }
  const why = style.error ? ` The automatic rewrite didn't run (${style.error}).` : ""
  return [
    `STYLE CHECK: ${style.left.length} sentence(s) still break the house style or the canon.${why} Fix them ${fix}:`,
    ...style.left.map((l) => `- ${l.label}: "${l.sentence}" ${l.problems.join(" ")}`),
  ]
}

/** A draft through the style pass: title (sentence case too), excerpt and body. */
export async function polishDraft(claude: Claude, draft: Draft): Promise<{ draft: Draft; style: StylePass }> {
  const style = await styleRewrite(
    claude,
    [
      { key: "title", label: "Title", text: draft.title, headings: "whole" },
      { key: "excerpt", label: "Summary", text: draft.excerpt, headings: "none" },
      { key: "body", label: "Body", text: draft.body, headings: "markdown" },
    ],
    { model: BLOG_MODEL, system: VOICE },
  )
  return { draft: { ...draft, title: style.text.title, excerpt: style.text.excerpt, body: style.text.body }, style }
}
