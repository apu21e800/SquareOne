/**
 * lib/automation/style.ts: Square One's house style and canon, as code, for
 * the copy the drafters write (lib/automation/blog.ts, lib/automation/social.ts).
 *
 * Two families of rule:
 *  - The machine tells (ported from hubss.com's lib/style-lint.ts, the rules
 *    Vern already runs there): em dashes and dashes used as dashes, the
 *    reversal, stacked fragments, filler words, stock phrases, exclamation
 *    marks, emoji, Title Case headings.
 *  - Square One's canon (CLAUDE.md, "Client"): the manufacturer is never
 *    named; installer, never maker ("our StreetPrint", "we developed");
 *    "installed at", never "for"; no guarantee, certification, price or
 *    timing the record does not carry; no borrowed standards; nothing
 *    Square One does not install; Vancouver Island is a service region,
 *    never an office; "Blog" and "project story", not "journal" or "case
 *    study"; no counts as a selling point.
 *
 * The drafters lint what Claude wrote, ask it once to rewrite the sentences
 * that fail, and put whatever still fails in front of the editor. A rule
 * prefers no false alarm to catching everything. The dashes it hunts are
 * written as \u escapes, so this file never contains one, and the tokens
 * scripts/lint-claims.mjs bans are matched by patterns that never spell them
 * out (lint-claims reads lib/ line by line).
 */

/** The systems Square One installs, spelled exactly (lib/products.ts). */
export const PRODUCT_NAMES = [
  "TrafficPatternsXD",
  "TrafficPatterns",
  "StreetPrint",
  "StreetBond",
  "DecoMark",
  "DuraShield",
  "DuraTherm",
  "PreMark",
] as const

/**
 * Names a sentence-case heading still capitalises: Square One, the systems,
 * the places it works, peoples and observances. Acronyms (BC, TAC), camelCase
 * names and place names ending in a place word ("Beban Park") are recognised
 * without being listed.
 */
export const PROPER_NAMES: readonly string[] = [
  ...PRODUCT_NAMES,
  "Square One", "Square One Paving",
  // BC and its regions
  "British Columbia", "Canada", "Canadian", "Canadians", "Lower Mainland", "Vancouver Island", "Fraser Valley",
  "Sunshine Coast", "Sea to Sky", "Okanagan", "Interior", "Metro Vancouver", "Gulf Islands", "Salish Sea",
  // cities and towns
  "Vancouver", "Victoria", "Nanaimo", "Surrey", "Burnaby", "Richmond", "Coquitlam", "Port Coquitlam", "Port Moody",
  "Maple Ridge", "Pitt Meadows", "Langley", "White Rock", "Delta", "Tsawwassen", "Ladner", "Abbotsford",
  "Chilliwack", "Mission", "Hope", "Squamish", "Whistler", "Sechelt", "Gibsons", "North Vancouver",
  "West Vancouver", "New Westminster", "Saanich", "Central Saanich", "North Saanich", "Oak Bay", "Cadboro Bay",
  "Esquimalt", "View Royal", "Langford", "Colwood", "Sooke", "Metchosin", "Sidney", "Duncan", "Ladysmith",
  "Chemainus", "Parksville", "Qualicum Beach", "Courtenay", "Comox", "Campbell River", "Port Alberni", "Tofino",
  "Ucluelet", "Kelowna", "West Kelowna", "Penticton", "Osoyoos", "Oliver", "Vernon", "Kamloops", "Salmon Arm",
  "Prince George", "Nelson", "Cranbrook",
  // transit and civic names
  "TransLink", "SkyTrain", "BC Transit", "SeaBus",
  // peoples, observances
  "Indigenous", "First Nations", "First Nation", "Coast Salish", "Musqueam", "Squamish Nation", "Tsleil-Waututh",
  "Songhees", "Lekwungen", "Snuneymuxw", "Kwantlen", "Katzie", "Semiahmoo", "Métis", "Inuit",
  "Every Child Matters", "Truth and Reconciliation", "Pride", "Canada Day", "Remembrance Day", "Earth Day",
  // compass, months, days
  "East", "West", "North", "South",
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
  "November", "December", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
]

export type StyleRule =
  | "em-dash"
  | "double-hyphen"
  | "spaced-dash"
  | "reversal"
  | "fragments"
  | "filler"
  | "stock-phrase"
  | "button"
  | "exclamation"
  | "emoji"
  | "title-case"
  | "maker"
  | "installer"
  | "installed-for"
  | "promise"
  | "price"
  | "timing"
  | "standard"
  | "not-offered"
  | "count"
  | "region"
  | "house-words"

export interface StyleIssue {
  rule: StyleRule
  /** What to do, in plain words. */
  message: string
  /** The words around the problem, as written, for a person to find it. */
  excerpt: string
  /** Where the problem starts in the text, and how long it is. */
  index: number
  length: number
}

// ── helpers ─────────────────────────────────────────────────────────────────

const EM = "\u2014"
const BAR = "\u2015" // horizontal bar: looks like an em dash in most fonts
const EN = "\u2013"

/** Blank out what isn't prose (link targets, addresses, emails, code) without moving anything. */
function mask(text: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, " ")
  return text
    .replace(/`[^`\n]*`/g, blank)
    .replace(/\]\([^)\s]*\)/g, (m) => "]" + blank(m.slice(1)))
    .replace(/\b(?:https?:\/\/|www\.|mailto:)[^\s<>"')\]]+/gi, blank)
    .replace(/\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b/g, blank)
}

/** About 60 characters of the text around [index, index + length), cut at word edges. */
function excerptAt(text: string, index: number, length: number): string {
  const pad = 28
  let start = Math.max(0, index - pad)
  let end = Math.min(text.length, index + length + pad)
  if (start > 0) {
    const sp = text.indexOf(" ", start)
    if (sp !== -1 && sp < index) start = sp + 1
  }
  if (end < text.length) {
    const sp = text.lastIndexOf(" ", end)
    if (sp > index + length) end = sp
  }
  const body = text.slice(start, end).replace(/\s+/g, " ").trim()
  return `${start > 0 ? "…" : ""}${body}${end < text.length ? "…" : ""}`
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** The sentence around a match, for a rule that needs its context. */
function sentenceAround(text: string, index: number): string {
  const before = text.slice(0, index)
  const start = Math.max(before.lastIndexOf(". "), before.lastIndexOf("\n")) + 1
  const rest = text.slice(index)
  const stop = rest.search(/[.!?](?:\s|$)|\n/)
  return text.slice(start, stop === -1 ? text.length : index + stop + 1)
}

interface Hit {
  /** Offset of the problem inside the match (after any context the regex had to consume). */
  at?: number
  length?: number
  message: string
}

interface Check {
  rule: StyleRule
  re: RegExp
  /** A message, or a function that can also veto the match (return null). */
  hit: string | ((m: RegExpExecArray, text: string) => Hit | string | null)
}

const DASH_ADVICE = "use a comma, a colon or a full stop instead"
const RANGE_ADVICE = "for a range, use an en dash with no spaces, like 10–20"

// A word character or closing punctuation that can sit right before a dash
// used as a dash, and what can follow one.
const BEFORE = "[\\p{L}\\p{N}.,;:)\\]'\"’”%]"
const AFTER = "[\\p{L}\\p{N}(\\['\"‘“$]"

const QUANTITY =
  "decade|year|month|week|day|hour|minute|second|dozen|hundred|thousand|million|billion|few|couple|" +
  "third|quarter|half|metre|meter|kilometre|kilometer|mile|foot|inch|centimetre|millimetre|litre|" +
  "tonne|kilogram|pound|degree|percent|single|little|bit|lot|handful|fraction|tenth"

const FILLER: [RegExp, (word: string) => string][] = [
  [/\bseamless(?:ly)?\b/giu, (w) => `“${cap(w)}” is filler: say what joins up, or cut it.`],
  [/\brobust(?:ly|ness)?\b/giu, (w) => `“${cap(w)}” is filler: say how it holds up (the published service life, from the manufacturer).`],
  [/\belevat(?:e|es|ing)\b/giu, (w) => `“${cap(w)}” is filler: say raise or improve, or say what changes.`],
  [/\bleverag(?:e|es|ed|ing)\b/giu, (w) => `“${cap(w)}” is filler: say use.`],
  [/\bunlock(?:s|ed|ing)?\b/giu, (w) => `“${cap(w)}” is filler: say what it makes possible.`],
  [/\bempower(?:s|ed|ing|ment)?\b/giu, (w) => `“${cap(w)}” is filler: say what it lets people do.`],
  [/\bharness(?:es|ed|ing)\b|\bharness\s+(?:the|its|their|our|your|this|that)\b/giu, () => `“Harness” is filler: say use.`],
  [/\bstreamlin(?:e|es|ed|ing)\b/giu, (w) => `“${cap(w)}” is filler: say what gets simpler or faster.`],
  [/\bholistic(?:ally)?\b/giu, (w) => `“${cap(w)}” is filler: say what it covers, or cut it.`],
  [/\btailored\b|\btailor-made\b/giu, (w) => `“${cap(w)}” is filler: say made for, or say who it is for.`],
  [/\bbespoke\b/giu, () => `“Bespoke” is filler: say custom.`],
  [
    /\bcutting[\s-]edge\b|\bgame[\s-]chang(?:ing|ers?)\b|\bworld[\s-]class\b|\bbest[\s-]in[\s-]class\b|\brevolutionary\b|\bunparalleled\b|\bstate[\s-]of[\s-]the[\s-]art\b|\bindustry[\s-]leading\b/giu,
    (w) => `“${cap(w)}” is hype: say the fact that makes it good.`,
  ],
  [
    /\bpremium\s+(?:products?|quality|looks?|finish|aesthetics?|appearance|feel|experience|positioning|solutions?|choice|results?|curb appeal)\b/giu,
    () => `“Premium” as praise is filler: say what makes it better.`,
  ],
  [/\bsolutions\b/giu, () => `“Solutions” is filler: name the thing (the coating, the markings, the crosswalk).`],
  [/\bjourneys?\b/giu, (w) => `“${cap(w)}” is filler: say what actually happens.`],
  [
    /\b(?:changing|evolving|shifting|competitive|regulatory|digital|business|market|industry|today['’]s|current)\s+(?:[a-z]+\s+)?landscapes?\b|\blandscape\s+of\b/giu,
    () => `“Landscape” as a figure of speech is filler: say the market or the rules, whichever you mean.`,
  ],
  [/\bensur(?:e|es|ed|ing)\b/giu, (w) => `“${cap(w)}” is on the list of words we don't use: say make sure, or say what happens.`],
  [/\bdelv(?:e|es|ed|ing)\b/giu, (w) => `“${cap(w)}” is filler: say look at.`],
  [/\bstunning(?:ly)?\b|\bbreathtaking\b|\bvibrant\b|\beye[\s-]catching\b/giu, (w) => `“${cap(w)}” is praise without a fact: say what it looks like.`],
]

const CHECKS: Check[] = [
  // ── dashes ────────────────────────────────────────────────────────────────
  { rule: "em-dash", re: new RegExp(`[${EM}${BAR}]|&mdash;|&#8212;|&#x2014;`, "gi"), hit: `Em dash: ${DASH_ADVICE}.` },
  {
    rule: "double-hyphen",
    re: new RegExp(`(${BEFORE}[ \\t\\u00A0]?)(-{2,3})(?=[ \\t\\u00A0]?${AFTER})`, "gu"),
    hit: (m, text) => {
      const end = m.index + m[0].length
      const range = /\d$/.test(m[1].trim()) && /^\s?\d/.test(text.slice(end, end + 2))
      return {
        at: m[1].length,
        length: m[2].length,
        message: range ? `Two hyphens in a range: ${RANGE_ADVICE}.` : `Two hyphens used as a dash: ${DASH_ADVICE}.`,
      }
    },
  },
  {
    // An en dash with a space on either side is being used as a dash; closed
    // up between numbers (10–20, 2025–26) it is a range, and fine.
    rule: "spaced-dash",
    re: new RegExp(`[ \\t\\u00A0]${EN}|${EN}[ \\t\\u00A0]`, "g"),
    hit: (m, text) => {
      const at = m[0].indexOf(EN)
      const pos = m.index + at
      const range = /\d\s*$/.test(text.slice(Math.max(0, pos - 3), pos)) && /^\s*\d/.test(text.slice(pos + 1, pos + 4))
      return { at, length: 1, message: range ? `En dash with spaces in a range: close it up, like 10–20.` : `En dash used as a dash: ${DASH_ADVICE}.` }
    },
  },
  {
    // " - " between words: a hyphen standing in for a dash (not a list bullet, not a minus sign).
    rule: "spaced-dash",
    re: new RegExp(`(${BEFORE}[ \\t\\u00A0])-(?=[ \\t\\u00A0]${AFTER})`, "gu"),
    hit: (m, text) => {
      const pos = m.index + m[1].length
      const range = /\d\s$/.test(m[1]) && /^\s\d/.test(text.slice(pos + 1, pos + 3))
      return { at: m[1].length, length: 1, message: range ? `Hyphen with spaces in a range: ${RANGE_ADVICE}.` : `Hyphen used as a dash: ${DASH_ADVICE}.` }
    },
  },

  // ── the reversal ──────────────────────────────────────────────────────────
  { rule: "reversal", re: /(?:\bnot|n['’]t)\s+(?:just|merely|simply)\b/giu, hit: `“Not just …” sets up what it isn't: say what it is, plainly.` },
  { rule: "reversal", re: /\bnot\s+only\b[^.!?\n]{1,150}?\b(?:but|also)\b/giu, hit: `“Not only … but …”: make it two plain statements, or keep the stronger one.` },
  {
    rule: "reversal",
    re: /(?:\b(?:is|are|was|were)\s+not\b|\b(?:isn|aren|wasn|weren)['’]t\b|['’](?:s|re)\s+not\b)[^.!?;:\n]{1,120}?[.;:,!?]\s+(?:it|this|that|they|these|those)(?:['’](?:s|re)|\s+(?:is|are|was|were))(?!\s+not\b)\s/giu,
    hit: `“It isn't X, it's Y”: say what it is, without first saying what it isn't.`,
  },
  { rule: "reversal", re: /\bnot\s+an?\s+[^.!?;\n]{1,60}?[.;]\s+an?\s+\p{L}/giu, hit: `“Not a … A …”: say what it is, without first saying what it isn't.` },
  {
    rule: "reversal",
    re: new RegExp(
      `\\bmore\\s+than\\s+just\\b|(?:^|[.!?]\\s+|\\n)more\\s+than\\s+an?\\s+\\p{L}|` +
        `(?:\\b(?:is|are|was|were|be|been|becomes?|became|gets?|got)|['’](?:s|re))(?:\\s+\\p{L}+){0,2}?\\s+more\\s+than\\s+an?\\s+(?!(?:${QUANTITY})s?\\b)\\p{L}`,
      "giu",
    ),
    hit: `“More than a …” sets up what it isn't: say what it is, plainly.`,
  },

  // ── stacked fragments: "Fast. Durable. Proven." ────────────────────────────
  {
    rule: "fragments",
    re: /(^|[.!?]\s+|\n)((?:\p{Lu}[\p{L}'’-]*(?:[ \t]+[\p{L}'’-]+){0,2}[.!?][ \t]+){2,}\p{Lu}[\p{L}'’-]*(?:[ \t]+[\p{L}'’-]+){0,2}[.!?])(?=\s|$)/gu,
    hit: (m) => ({ at: m[1].length, length: m[2].length, message: `Short fragments in a row (“Fast. Durable. Proven.”) read as machine-written: write one plain sentence.` }),
  },

  // ── stock phrases, buttons, punctuation, emoji ────────────────────────────
  {
    rule: "stock-phrase",
    re: /\bwhether\s+you['’]re\b|\bin\s+today['’]s\b|\bin\s+a\s+world\s+where\b|\bhere['’]s\s+the\s+thing\b|\blet['’]s\s+dive\b|\bdive\s+in(?:to)?\b|\bthink\s+of\s+it\s+as\b|\b(?:it['’]s|it\s+is)\s+worth\s+noting\b|\bworth\s+noting\s+that\b|\bwhen\s+it\s+comes\s+to\b|\bat\s+the\s+end\s+of\s+the\s+day\b/giu,
    hit: (m) => `Stock phrase (“${cap(m[0].toLowerCase())}”): cut it and say the point directly.`,
  },
  { rule: "button", re: /^\s*(?:discover|explore|learn\s+more)\b(?:\s+\S+){0,3}\s*$/iu, hit: `Button words: say what happens, like “Get a quote” or “Read the story”.` },
  { rule: "exclamation", re: /!(?!\[)/g, hit: `Exclamation mark: end the sentence with a full stop.` },
  { rule: "emoji", re: /\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F/gu, hit: `Emoji: take it out.` },

  // ── Square One's canon ────────────────────────────────────────────────────
  {
    // The site never names the company that makes the systems.
    rule: "maker",
    re: /\bHUB\b|\bHub\s+Surface\b|\bEnnis[\s-]Flint\b|\bIntegrated\s+Paving\s+Concepts\b|\bPPG\b/gu,
    hit: `The manufacturer is never named on the site: say “the manufacturer”.`,
  },
  {
    rule: "installer",
    re: new RegExp(`\\bour\\s+(?:own\\s+)?(?:${PRODUCT_NAMES.join("|")})\\b|\\bwe\\s+(?:developed|invented|manufactured?|patented|formulated)\\b|\\bour\\s+(?:proprietary|patented)\\b`, "giu"),
    hit: `Square One installs the systems; it doesn't make them: never “our StreetPrint” or “we developed”.`,
  },
  {
    // "Installed at", never "for": a site, not a customer relationship.
    rule: "installed-for",
    re: /\binstall(?:ed|ing|s)?\s+for\s+(?:the\s+)?\p{Lu}|\bfor\s+(?:the\s+)?(?:City|District|Town|Township|Village|Municipality|Regional\s+District|School\s+District|Province)\s+of\b|\bfor\s+our\s+clients?\b/gu,
    hit: (m, text) => {
      // "installed for National Indigenous Peoples Day": an occasion, not a customer.
      const next = text.slice(m.index + m[0].length - 1, m.index + m[0].length + 60).split(/\s+/).slice(0, 6).join(" ")
      if (/\b(?:Day|Week|Month|Festival|Games|Pride|Reconciliation|Remembrance)\b/.test(next)) return null
      return `Say “installed at” (the place), never “for” (the customer).`
    },
  },
  {
    rule: "promise",
    re: /\bguarantee(?:s|d)?\b|\bwarrant(?:y|ies|s|ed)\b|\bcertifi(?:ed|cation|cations)\b|\bauthori[sz]ed\s+(?:installers?|applicators?|dealers?|contractors?)\b|\baward[\s-]winning\b|\bpreferred\s+(?:installer|applicator|contractor)\b/giu,
    hit: (m, text) => {
      // The one warranty line the record carries is fine, however it is worded:
      // "the manufacturer warrants the material; Square One warrants the
      // workmanship", "Material warranted by the manufacturer; workmanship by Square One".
      const around = sentenceAround(text, m.index)
      if (/^warrant/i.test(m[0]) && /warrants?\s+the\s+(?:material|workmanship)|(?:material|workmanship)\s+(?:is\s+)?warranted\s+by/i.test(around)) return null
      return `A guarantee, warranty, certification or award the record doesn't carry: cut it. (The record says only that the manufacturer warrants the material and Square One the workmanship.)`
    },
  },
  {
    rule: "price",
    re: /\$\s?\d|\bper\s+square\s+(?:foot|feet|metre|meter)\b|\b(?:cheap|cheaper|cheapest|affordable|low[\s-]cost|budget[\s-]friendly|free\s+of\s+charge)\b/giu,
    hit: `No prices or price talk: the quote does that.`,
  },
  {
    rule: "timing",
    re: /\bwithin\s+\d+\s+(?:business\s+)?(?:hours?|days?|weeks?)\b|\bsame[\s-]day\b|\bnext[\s-]day\b|\b(?:fast|quick|rapid)\s+turnaround\b|\bturnaround\s+times?\b/giu,
    hit: `A response or lead time Square One hasn't published: cut it (the office will be in touch).`,
  },
  {
    rule: "standard",
    re: /\bVision\s+Zero\b|\bAO[D]A\b|\bMUT[C]D\b|\bASTM\b|\bAASHTO\b|\bLEED\b|\bADA\b/gu,
    hit: `A standard or programme the record doesn't cite: cut it, or say what the site needed in plain words.`,
  },
  {
    rule: "not-offered",
    re: /\bAir\s?Mark\b|\bChip\s?Fill\b|\bAggre\s?Fill\b|\bFast\s?Patch\b|\bMMAX\b|\bMMA\b|\bmethyl\s+methacrylate\b|\basphalt\s+repairs?\b|\bpothole\s+repairs?\b|\bair\s?ports?\b|\brunways?\b/giu,
    hit: `Square One doesn't install this: take it out.`,
  },
  {
    rule: "region",
    re: /\b(?:Vancouver\s+Island|Ladysmith|Victoria|Nanaimo)\s+(?:office|base|shop|yard|branch|location|headquarters)\b|\b(?:office|base|shop|yard|branch|headquarters)\s+(?:on|in)\s+(?:Vancouver\s+Island|Ladysmith|Victoria|Nanaimo)\b/giu,
    hit: `The office is in Maple Ridge; Vancouver Island is a service region with its own line, never an office or a base.`,
  },
  {
    rule: "house-words",
    re: /\bjournal\b|\bcase\s+stud(?:y|ies)\b|\bfrom\s+the\s+blog\b/giu,
    hit: (m) =>
      /^journal/i.test(m[0])
        ? `Say “Blog”, never “journal”.`
        : /^case/i.test(m[0])
          ? `Say “project story”, never “case study”.`
          : `Say “project stories and guides”, never “from the blog”.`,
  },
  {
    rule: "count",
    re: /\b(?:hundreds|thousands|dozens)\s+of\s+(?:\p{L}+\s+)?(?:projects|installations|installs|crosswalks|driveways|jobs|clients|customers|municipalities|surfaces)\b|\b\d{2,}\+?\s+(?:projects|installations|installs|crosswalks|driveways|jobs|clients|customers|municipalities)\b|\b(?:over|more\s+than|nearly|almost)\s+\d+\s+years\b/giu,
    hit: `No counts as a selling point: say “since 2000”, or show the one project.`,
  },
]

// Filler words, with their exceptions.
for (const [re, say] of FILLER) {
  CHECKS.push({
    rule: "filler",
    re,
    hit: (m, text) => {
      const word = m[0].split(/\s+/)[0]
      const after = text.slice(m.index + m[0].length, m.index + m[0].length + 40)
      // Stamped asphalt IS seamless (no joints to lift): that's the literal sense.
      if (/^seamless$/i.test(m[0]) && /^(?:[\s,]+[\p{L}-]+){0,3}?[\s,]+(?:surface|asphalt|pavement|finish|joints?|slab|layer|coating|sheet)\b/iu.test(after)) return null
      if (/^elevat/i.test(m[0]) && /^\s+(?:ambient\s+)?temperatures?\b/i.test(after)) return null
      return { length: m[0].length, message: say(word) }
    },
  })
}

/**
 * Everything in `text` that breaks the house style or the canon, in reading
 * order. Plain text or markdown; link addresses and emails are ignored.
 */
export function lintCopy(text: string): StyleIssue[] {
  if (!text || !text.trim()) return []
  const prose = mask(text)
  const issues: StyleIssue[] = []
  const seen = new Set<string>()
  for (const check of CHECKS) {
    check.re.lastIndex = 0
    const re = check.re.global ? check.re : new RegExp(check.re.source, check.re.flags + "g")
    let m: RegExpExecArray | null
    while ((m = re.exec(prose))) {
      if (m[0] === "") {
        re.lastIndex++
        continue
      }
      const res = typeof check.hit === "string" ? check.hit : check.hit(m, prose)
      if (res === null) continue
      const hit: Hit = typeof res === "string" ? { message: res } : res
      const index = m.index + (hit.at ?? 0)
      const length = hit.length ?? m[0].length - (hit.at ?? 0)
      const key = `${check.rule}:${index}`
      if (seen.has(key)) continue
      seen.add(key)
      issues.push({ rule: check.rule, message: hit.message, excerpt: excerptAt(text, index, length), index, length })
    }
  }
  // One warning per problem: "isn't just a task. It's ..." is one reversal, not two.
  const out: StyleIssue[] = []
  for (const i of issues.sort((a, b) => a.index - b.index || b.length - a.length)) {
    if (out.some((o) => o.rule === i.rule && i.index < o.index + o.length && o.index < i.index + i.length)) continue
    out.push(i)
  }
  return out
}

// ── headings ────────────────────────────────────────────────────────────────

// Words that are never part of a name: if one is capitalised, the heading is
// in Title Case whatever else it contains.
const COMMON = new Set(
  (
    "a an the and or but nor of for to in on at by with from into onto over under about after before between through " +
    "without within vs versus your our their its it is are was were be been being am do does did done has have had " +
    "how why what when where who whom which that this these those not no yes you we us they them he she my me more " +
    "most less least best better good great new right all every each any some one two three first last next get gets " +
    "make makes go goes work works matter matters need needs know choose pick use uses can will should must may might " +
    "could would here there now then just only also so than too very really up down out off if as like"
  ).split(" "),
)

const PLACE_WORDS = new Set(
  (
    "Street St Avenue Ave Road Rd Drive Dr Boulevard Blvd Way Lane Crescent Court Place Square Park Parkway Highway Hwy " +
    "Trail Bridge Station Village Island Hospital University College School Centre Center Mall Plaza Market Region " +
    "County Nation Terminal Stadium Arena Hall Library District Commons Pier Harbour Beach Bay Lake River Creek " +
    "Mountain Valley Hill Hills Heights Point Ridge Quay Wharf Promenade Esplanade Circle Row Elementary Secondary"
  ).split(" "),
)

const PROPER_SINGLE = new Set(PROPER_NAMES.filter((n) => !/\s/.test(n)))
const PROPER_MULTI = PROPER_NAMES.filter((n) => /\s/.test(n))
  .map((n) => n.split(/\s+/))
  .sort((a, b) => b.length - a.length)

type Kind = "cap" | "proper" | "lower" | "join" | "start"

function plainHeading(text: string): string {
  return text
    .replace(/^\s*#{1,6}\s+/, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]+/g, "")
}

/**
 * Title Case in a heading or a title: three or more capitalised words that
 * aren't names ("Where The Colour Goes"). Sentence case is the house style:
 * capitals on the first word and on names only. A heading that ends in a name
 * it can't know is let through when every later capital sits in one run
 * after a lowercase word.
 */
export function lintHeading(text: string): StyleIssue[] {
  if (!text || !text.trim()) return []
  const plain = plainHeading(text)
  const raw = plain.split(/\s+/).filter(Boolean)
  const kinds: Kind[] = []
  const cores: string[] = []
  const proper = new Array<boolean>(raw.length).fill(false)

  const coreOf = (w: string) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").replace(/['’]s$/u, "")
  raw.forEach((w) => cores.push(coreOf(w)))

  for (const words of PROPER_MULTI) {
    for (let i = 0; i + words.length <= raw.length; i++) {
      let ok = true
      for (let j = 0; j < words.length && ok; j++) ok = cores[i + j] === coreOf(words[j]) || raw[i + j] === words[j]
      if (ok) for (let j = 0; j < words.length; j++) proper[i + j] = true
    }
  }
  for (let i = 1; i < raw.length; i++) {
    if (PLACE_WORDS.has(cores[i]) && /^\p{Lu}/u.test(cores[i - 1]) && !COMMON.has(cores[i - 1].toLowerCase())) {
      proper[i] = true
      proper[i - 1] = true
    }
  }

  let sentenceStart = false
  raw.forEach((w, i) => {
    const core = cores[i]
    let kind: Kind
    if (!/[\p{L}\p{N}]/u.test(w)) kind = "join"
    else if (
      proper[i] ||
      PROPER_SINGLE.has(core) ||
      /^\p{Lu}{2,}[\p{Lu}\p{N}]*s?$/u.test(core) ||
      /\p{Ll}\p{Lu}/u.test(core) ||
      /\p{N}/u.test(core) ||
      core === "I" ||
      PROPER_SINGLE.has(core.split("-")[0])
    )
      kind = "proper"
    else if (i > 0 && sentenceStart) kind = "start"
    else if (/^\p{Lu}/u.test(core)) kind = "cap"
    else kind = "lower"
    kinds.push(kind)
    sentenceStart = /[.!?]["'’”)]*$/.test(w) && !/^(?:St|No|vs|e\.g|i\.e)\.$/i.test(w)
  })

  const counted = kinds.map((k, i) => (k === "cap" ? i : -1)).filter((i) => i >= 0)
  if (counted.length < 3) return []

  const rest = counted.filter((i) => i > 0)
  if (rest.length) {
    let start = rest[0]
    while (start > 0 && (kinds[start - 1] === "cap" || kinds[start - 1] === "proper" || kinds[start - 1] === "join")) start--
    const end = rest[rest.length - 1]
    let contiguous = true
    for (let i = rest[0]; i <= end; i++) if (kinds[i] === "lower" || kinds[i] === "start") contiguous = false
    const afterLower = start > 0 && kinds[start - 1] === "lower"
    const noCommon = rest.every((i) => !COMMON.has(cores[i].toLowerCase()))
    if (contiguous && afterLower && noCommon) return []
  }

  const words = counted.map((i) => `“${cores[i]}”`).slice(0, 4).join(", ")
  return [
    {
      rule: "title-case",
      message: `Title Case (${words}): headings are sentence case, with capitals only on the first word and on names, like “Where the colour goes”.`,
      excerpt: excerptAt(text, 0, text.length),
      index: 0,
      length: text.length,
    },
  ]
}

// ── for the drafters: which sentences to rewrite ────────────────────────────

export interface FlaggedSentence {
  /** The sentence (or two, for a problem that spans them) exactly as written, markdown included. */
  text: string
  index: number
  issues: StyleIssue[]
}

export interface FlagOptions {
  /** "whole": the text is a title; "markdown": lines starting with # are headings; "none": no heading checks. */
  headings?: "whole" | "markdown" | "none"
  /** Rules this copy may break (a Facebook post may carry one emoji). */
  ignore?: StyleRule[]
}

const ABBREVIATION = /(?:\b(?:e\.g|i\.e|etc|vs|approx|St|Mr|Mrs|Ms|Dr|No|Inc|Ltd|Co|a\.m|p\.m)\.)["'’”)\]]*$/i

function sentenceSpans(text: string, from: number, to: number): [number, number][] {
  const out: [number, number][] = []
  const end = /[.!?]+["'’”)\]]*(?=\s|$)/g
  const part = text.slice(from, to)
  let start = 0
  let m: RegExpExecArray | null
  while ((m = end.exec(part))) {
    const stop = m.index + m[0].length
    if (ABBREVIATION.test(part.slice(start, stop))) continue
    out.push([from + start, from + stop])
    start = stop
  }
  if (part.slice(start).trim()) out.push([from + start, to])
  return out
    .map(([s, e]): [number, number] => {
      while (s < e && /\s/.test(text[s])) s++
      while (e > s && /\s/.test(text[e - 1])) e--
      return [s, e]
    })
    .filter(([s, e]) => e > s)
}

/**
 * The sentences in `text` that break the house style or the canon, each with
 * what's wrong, ready to hand to a rewrite. Table cells, list items and
 * headings are sentences of their own; markdown marks at the start of a line
 * stay out.
 */
export function flagSentences(text: string, options: FlagOptions = {}): FlaggedSentence[] {
  const headings = options.headings ?? "none"
  const ignore = new Set(options.ignore ?? [])
  const keep = (i: StyleIssue) => !ignore.has(i.rule)
  const issues = lintCopy(text).filter(keep)

  const segments: [number, number, boolean][] = []
  let lineStart = 0
  for (const line of text.split("\n")) {
    const lineEnd = lineStart + line.length
    const heading = headings === "whole" || (headings === "markdown" && /^\s*#{1,6}\s/.test(line))
    if (/^\s*\|/.test(line)) {
      let cell = lineStart
      for (let i = lineStart; i <= lineEnd; i++) {
        if (i === lineEnd || text[i] === "|") {
          if (i > cell) segments.push([cell, i, false])
          cell = i + 1
        }
      }
    } else {
      const marks = /^\s*(?:#{1,6}\s+|[-*+]\s+|\d+[.)]\s+|>\s+)?/.exec(line)?.[0].length ?? 0
      segments.push([lineStart + marks, lineEnd, heading])
    }
    lineStart = lineEnd + 1
  }
  if (headings === "whole") {
    for (const i of lintHeading(text).filter(keep)) issues.push(i)
  } else if (headings === "markdown") {
    for (const [s, e, isHeading] of segments) {
      if (!isHeading) continue
      for (const i of lintHeading(text.slice(s, e)).filter(keep)) issues.push({ ...i, index: s, length: e - s })
    }
  }

  const units: { start: number; end: number; issues: StyleIssue[] }[] = []
  for (const issue of issues.sort((a, b) => a.index - b.index)) {
    const seg = segments.find(([s, e]) => issue.index >= s && issue.index < Math.max(e, s + 1)) ?? [0, text.length, false]
    const spans = sentenceSpans(text, seg[0], seg[1])
    const last = issue.index + Math.max(1, issue.length) - 1
    const touching = spans.filter(([s, e]) => e > issue.index && s <= last)
    const start = touching.length ? touching[0][0] : seg[0]
    const end = touching.length ? touching[touching.length - 1][1] : seg[1]
    const open = units.find((u) => start < u.end && end > u.start)
    if (open) {
      open.start = Math.min(open.start, start)
      open.end = Math.max(open.end, end)
      open.issues.push(issue)
    } else units.push({ start, end, issues: [issue] })
  }
  return units
    .sort((a, b) => a.start - b.start)
    .map((u) => ({ text: text.slice(u.start, u.end), index: u.start, issues: u.issues }))
}

/**
 * Whether a rewritten sentence kept its facts: the same numbers, links and
 * system names. A rewrite that loses one is thrown away and the original
 * stays, flagged, for a person to fix.
 */
export function keepsFacts(before: string, after: string): boolean {
  if (!after.trim()) return false
  const numbers = (s: string) => (s.match(/\d+(?:[.,]\d+)*/g) ?? []).map((n) => n.replace(/,/g, "")).sort().join("|")
  const links = (s: string) => (s.match(/\]\([^)\s]+\)|https?:\/\/[^\s)\]>"]+/g) ?? []).map((l) => l.replace(/^\]\(|\)$/g, "")).sort().join("|")
  const names = (s: string) => PRODUCT_NAMES.filter((n) => s.includes(n)).join("|")
  return numbers(before) === numbers(after) && links(before) === links(after) && names(before) === names(after)
}
