import { stegaClean } from "next-sanity"

/**
 * The words of the home, about, contact and driveways pages, below their
 * openers (14 Oct 2026, as hubss.com's homepage sections since 7 Oct). The
 * office edits them in the Studio (Website Pages); the site reads them
 * through lib/page-content.ts.
 *
 * These are the words the site printed on 14 Oct 2026, word for word. They
 * are the fallback on the site-wide rule: a blank Studio field shows the
 * code's words. `npm run sync:pages` (scripts/sync-pages-to-sanity.ts) puts
 * them into Studio's blank fields, so the office starts from what is live,
 * and never overwrites a field Studio already has.
 *
 * A heading is two parts, `head` and `tail` (the lighter ending, set in
 * Futura Book). They travel together: when the Studio has either, the
 * Studio's pair is used as it is, so a new heading never gets the old ending
 * glued to it. A card's photograph and link stay in the code; only its words
 * are the office's.
 *
 * Pure data and string functions.
 */

/** A section's words: the small label in the margin, the heading and its lighter ending, a line under it. */
export interface SectionWords {
  label: string
  head: string
  tail?: string
  line?: string
}

/** A card's or a step's words. */
export interface CardWords {
  title: string
  text: string
}

export interface Faq {
  q: string
  a: string
}

type ServiceKey = "stampedAsphalt" | "decorativeCoatings" | "preformedThermoplastic" | "vapourBlasting"

export interface HomeCopy {
  services: SectionWords
  serviceCards: Record<ServiceKey, CardWords>
  projects: SectionWords
  process: SectionWords
  audiences: SectionWords
  audienceCards: Record<"municipal" | "commercial" | "homeowners", CardWords>
  driveways: SectionWords
  drivewaysOffer: SectionWords
  materials: SectionWords
  vapour: SectionWords
  social: SectionWords
}

export interface AboutCopy {
  story: SectionWords
  storyText: string[]
  mission: CardWords
  trades: SectionWords
  tradeCards: Record<ServiceKey, CardWords>
  principles: SectionWords
  principleCards: Record<"weather" | "care" | "site", CardWords>
  work: SectionWords
  regions: SectionWords
}

export interface ContactCopy {
  intro: SectionWords
  nextLabel: string
  steps: Record<"first" | "second" | "third", CardWords>
  sendLabel: string
  send: string[]
  regions: SectionWords
}

export interface DrivewaysCopy {
  patterns: SectionWords
  process: SectionWords
  steps: Record<"visit" | "quote" | "install" | "winters", CardWords>
  gallery: SectionWords
  area: SectionWords
  questions: SectionWords
  faqs: Faq[]
}

export const HOME_COPY: HomeCopy = {
  services: { label: "What we do", head: "Three ways we change a surface,", tail: "and one way we clean it" },
  serviceCards: {
    stampedAsphalt: { title: "Stamped asphalt", text: "Brick, cobble or slate, pressed into the asphalt already there." },
    decorativeCoatings: { title: "Decorative coatings", text: "Colour for bike lanes, plazas, spray parks and courts." },
    preformedThermoplastic: { title: "Preformed thermoplastic", text: "Crosswalks, symbols and street art, fused into the road." },
    vapourBlasting: { title: "Vapour blasting", text: "Graffiti, old markings and grime, lifted wet." },
  },
  projects: { label: "Projects", head: "Selected", tail: "work" },
  process: { label: "How a job goes", head: "Four steps,", tail: "every job" },
  audiences: { label: "Who we work with", head: "Municipal, commercial,", tail: "residential" },
  audienceCards: {
    municipal: { title: "Municipalities", text: "Crosswalks, intersections, parks and school zones, installed by our own crews." },
    commercial: { title: "Commercial and strata", text: "Entries, parking, plazas and laneways, quoted in writing before anything starts." },
    homeowners: { title: "Homeowners", text: "Brick, cobble or slate, pressed into the driveway you already have." },
  },
  driveways: {
    label: "Driveways · Vancouver and Victoria",
    head: "The driveway you already have,",
    tail: "made to look like stone",
    line: "StreetPrint pressed into the asphalt you have, sealed in StreetBond colour. No joints to heave, no new base.",
  },
  drivewaysOffer: { label: "Free site visit", head: "We walk it before we quote it", line: "The samples come to your driveway; the quote comes in writing." },
  materials: {
    label: "Patterns and colours",
    head: "Drawn to scale,",
    tail: "matched from a card",
    line: "Every pattern is a dimensioned sheet and every colour a named chip, so what you choose is what gets installed.",
  },
  vapour: {
    label: "Vapour blasting",
    head: "Graffiti and old markings,",
    tail: "lifted wet",
    line: "The abrasive travels in water: the paint comes off, the dust stays down, and the surface underneath is left as it was.",
  },
  social: { label: "From the crews", head: "The work,", tail: "as it goes in" },
}

/** The home page's service cards, by the service's web address. */
export const SERVICE_CARD_KEY: Record<string, ServiceKey> = {
  "stamped-asphalt": "stampedAsphalt",
  "decorative-coatings": "decorativeCoatings",
  "preformed-thermoplastic": "preformedThermoplastic",
  "vapor-blasting": "vapourBlasting",
}

export const ABOUT_COPY: AboutCopy = {
  story: { label: "Our story", head: "One kind of work,", tail: "done properly" },
  storyText: [
    "Square One Paving started in 2000 doing one kind of work: decorative pavement, in BC, through BC weather. More than twenty-five years on, we still do that one kind of work, with our own crews.",
  ],
  mission: { title: "Our mission", text: "Build surfaces that perform as well as they look, and last." },
  trades: { label: "What we install", head: "Four trades,", tail: "one standard" },
  tradeCards: {
    stampedAsphalt: { title: "Stamped asphalt", text: "Brick, cobble and slate, pressed into the asphalt itself." },
    decorativeCoatings: { title: "Decorative coatings", text: "StreetBond colour on asphalt and concrete." },
    preformedThermoplastic: { title: "Preformed thermoplastic", text: "Crosswalks, symbols and public art, fused into the road." },
    vapourBlasting: { title: "Vapour blasting", text: "Cleaning, priming, graffiti and marking removal." },
  },
  principles: { label: "How we work", head: "Why", tail: "Square One" },
  principleCards: {
    weather: { title: "Built for BC weather", text: "Slip-resistant, snowplow-safe, UV-stable: the manufacturer publishes how every system we install performs." },
    care: { title: "Municipal discipline, residential care", text: "Civic work goes in to the owner's marking standard. A driveway gets the same crews." },
    site: {
      title: "Chosen against the real site",
      text: "Patterns are drawn to scale and colours come off the published chart, held up on sample boards where the work will go.",
    },
  },
  work: {
    label: "The work",
    head: "Won in the open,",
    tail: "kept through winters",
    line: "Municipal work is won in open tenders and kept by holding up. Ten kinds of it, each with a gallery of Square One’s own installations.",
  },
  regions: {
    label: "Regions",
    head: "Where",
    tail: "we work",
    line: "One office in Maple Ridge, crews on both sides of the Strait, and the vapour blasting rig goes wherever the surface is.",
  },
}

/** The About page's trade cards, by the service's web address. */
export const TRADE_CARD_KEY = SERVICE_CARD_KEY

export const CONTACT_COPY: ContactCopy = {
  intro: {
    label: "Request a quote · free site visit",
    head: "Tell us the job.",
    tail: "We’ll walk the site.",
    line: "A description and a location are enough to start. The site visit is free; the quote comes in writing.",
  },
  nextLabel: "What happens next",
  steps: {
    first: { title: "Tell us the job", text: "A description and a location." },
    second: { title: "We walk the site", text: "Free, with the sample boards." },
    third: { title: "You get a written quote", text: "Before anything starts." },
  },
  sendLabel: "What to send",
  send: ["Photos of the surface as it is", "The address or postal code", "Drawings or a sketch, if you have them", "A rough area in square metres", "When you need it done"],
  regions: {
    label: "Where we work",
    head: "Lower Mainland",
    tail: "and Vancouver Island",
    line: "The office is in Maple Ridge and the Island has its own line. The record also runs to Squamish, Sechelt and the Okanagan when the job calls for it.",
  },
}

export const DRIVEWAYS_COPY: DrivewaysCopy = {
  patterns: { label: "Patterns", head: "Driveway patterns,", tail: "drawn to scale", line: "Every pattern starts as a dimensioned drawing. The samples come to your driveway." },
  process: { label: "How it works", head: "How a driveway", tail: "goes in" },
  steps: {
    visit: { title: "Free site visit", text: "We assess the asphalt and hold the samples against your house." },
    quote: { title: "Written quote", text: "The pattern and the colour, in writing. If the asphalt isn't sound, we say so." },
    install: { title: "Installation", text: "Prep, stamping, colour and finish, by our own crews. No demolition." },
    winters: { title: "Built for BC winters", text: "Snowplow and de-icing salt safe, as the manufacturer rates it." },
  },
  gallery: { label: "Photographed on site", head: "Driveways from Victoria", tail: "to Vancouver", line: "Square One driveways from the record, on the Island and the mainland." },
  area: { label: "Service area", head: "Where we", tail: "install driveways", line: "In one of the areas below, we come to you. Elsewhere in BC, ask: we travel for the right job." },
  questions: { label: "Questions", head: "Questions", tail: "about driveways" },
  faqs: [
    {
      q: "Can you install stamped asphalt over my existing driveway?",
      a: "Yes, when the asphalt is sound. StreetPrint is stamped into asphalt in good condition, reheated in place, and StreetBond is coated straight over asphalt or concrete, so there is no demolition and no new base. We assess the surface at the site visit first: the asphalt has to be sound before it takes a pattern, and if it is not, we say so.",
    },
    {
      q: "How long does a stamped asphalt driveway last?",
      a: "The manufacturer publishes a 10–20 year service life for StreetPrint under municipal traffic, and an 8+ year life cycle for StreetBond, which is refreshed with a recoat rather than replaced. A driveway carries a fraction of the traffic a road does.",
    },
    {
      q: "Which patterns and colours can I choose?",
      a: "The StreetPrint templates on Square One's own sheet: ashlar slate, offset brick, standard herringbone, random stone, standard tile and offset tile, with soldier-course, stacked-brick and Texas cobble borders. The manufacturer draws the templates as dimensioned sheets. Three are shown above; more are in the pattern library. StreetBond colour comes from the published chart of more than fifty; for a house that usually means the greys, black and the earth tones: bedrock, brick, granite, pewter, sierra, black, concrete gray, burnt sienna, brown suede, taupe and graphite. Sample boards come to the site visit.",
    },
    {
      q: "Is stamped asphalt safe in BC winters?",
      a: "Yes. The imprinted surface is textured, so tyres and shoes have more to hold than on smooth asphalt, and the manufacturer rates StreetPrint snowplow and de-icing salt safe. Square One has installed it across BC since 2000, through wet coastal winters and the freeze-thaw cycles inland.",
    },
    {
      q: "How do I get a quote?",
      a: "Contact us with your address and a description of the work, or a photo of the driveway. We schedule a free site visit, assess the surface, and follow up with a written quote.",
    },
    {
      q: "Do you install driveways on Vancouver Island?",
      a: "Yes. Vancouver Island is a Square One service region with its own line, 250-391-0270. The Island driveways on this page (Saanich, North and West Saanich, Sooke, Duncan, Mill Bay and Victoria) were all installed by Square One.",
    },
    {
      q: "Do you work outside the Lower Mainland and Vancouver Island?",
      a: "For the right project, yes. Okanagan and Interior installations are in the project record. Send the address and a description and we will tell you straight away whether it makes sense for both of us.",
    },
  ],
}

/* ------------------------------------------------------------------
   The merge: the Studio's words over the code's, field by field
   ------------------------------------------------------------------ */

/** Real words: not missing, not blank, and not blank once the preview's invisible marks are taken off. */
export function has(v: unknown): v is string {
  return typeof v === "string" && stegaClean(v).trim() !== ""
}

type Loose<T> = { [K in keyof T]?: unknown } | null | undefined

/** A section: each field the Studio has, else the code's; the heading and its ending as a pair. */
export function mergeSection(code: SectionWords, doc: Loose<SectionWords>): SectionWords {
  if (!doc || typeof doc !== "object") return code
  const custom = has(doc.head) || has(doc.tail)
  const out: SectionWords = {
    label: has(doc.label) ? doc.label.trim() : code.label,
    head: custom ? (has(doc.head) ? doc.head.trim() : "") : code.head,
  }
  const tail = custom ? (has(doc.tail) ? doc.tail.trim() : undefined) : code.tail
  if (tail !== undefined) out.tail = tail
  // A line only where the section has one in the code: the page has nowhere else to print it.
  if (code.line !== undefined) out.line = has(doc.line) ? doc.line.trim() : code.line
  return out
}

/** A card: its title and its line, each the Studio's when it has one. */
export function mergeCard(code: CardWords, doc: Loose<CardWords>): CardWords {
  if (!doc || typeof doc !== "object") return code
  return { title: has(doc.title) ? doc.title.trim() : code.title, text: has(doc.text) ? doc.text.trim() : code.text }
}

/** A fixed set of cards, by key: each card merged on its own. */
export function mergeCards<T extends Record<string, CardWords>>(code: T, doc: unknown): T {
  const d = doc && typeof doc === "object" ? (doc as Record<string, Loose<CardWords>>) : {}
  const out = {} as Record<string, CardWords>
  for (const key of Object.keys(code)) out[key] = mergeCard(code[key], d[key])
  return out as T
}

/** Plain text: the Studio's when it has some. */
export function mergeText(code: string, doc: unknown): string {
  return has(doc) ? doc.trim() : code
}

/** A list of lines: the Studio's when it has at least one real line, else the code's. */
export function mergeLines(code: string[], doc: unknown): string[] {
  const lines = Array.isArray(doc) ? doc.filter(has).map((l) => l.trim()) : []
  return lines.length ? lines : code
}

/** Questions and answers: the Studio's when it has at least one whole pair, else the code's. */
export function mergeFaqs(code: Faq[], doc: unknown): Faq[] {
  const faqs = Array.isArray(doc)
    ? doc.filter((f): f is { q: string; a: string } => Boolean(f) && has((f as Faq).q) && has((f as Faq).a)).map((f) => ({ q: f.q.trim(), a: f.a.trim() }))
    : []
  return faqs.length ? faqs : code
}

const doc = (d: unknown) => (d && typeof d === "object" ? (d as Record<string, unknown>) : {})

export function mergeHomeCopy(d: unknown): HomeCopy {
  const s = doc(d)
  const c = HOME_COPY
  return {
    services: mergeSection(c.services, s.services as Loose<SectionWords>),
    serviceCards: mergeCards(c.serviceCards, s.serviceCards),
    projects: mergeSection(c.projects, s.projects as Loose<SectionWords>),
    process: mergeSection(c.process, s.process as Loose<SectionWords>),
    audiences: mergeSection(c.audiences, s.audiences as Loose<SectionWords>),
    audienceCards: mergeCards(c.audienceCards, s.audienceCards),
    driveways: mergeSection(c.driveways, s.driveways as Loose<SectionWords>),
    drivewaysOffer: mergeSection(c.drivewaysOffer, s.drivewaysOffer as Loose<SectionWords>),
    materials: mergeSection(c.materials, s.materials as Loose<SectionWords>),
    vapour: mergeSection(c.vapour, s.vapour as Loose<SectionWords>),
    social: mergeSection(c.social, s.social as Loose<SectionWords>),
  }
}

export function mergeAboutCopy(d: unknown): AboutCopy {
  const s = doc(d)
  const c = ABOUT_COPY
  return {
    story: mergeSection(c.story, s.story as Loose<SectionWords>),
    storyText: mergeLines(c.storyText, s.storyText),
    mission: mergeCard(c.mission, s.mission as Loose<CardWords>),
    trades: mergeSection(c.trades, s.trades as Loose<SectionWords>),
    tradeCards: mergeCards(c.tradeCards, s.tradeCards),
    principles: mergeSection(c.principles, s.principles as Loose<SectionWords>),
    principleCards: mergeCards(c.principleCards, s.principleCards),
    work: mergeSection(c.work, s.work as Loose<SectionWords>),
    regions: mergeSection(c.regions, s.regions as Loose<SectionWords>),
  }
}

export function mergeContactCopy(d: unknown): ContactCopy {
  const s = doc(d)
  const c = CONTACT_COPY
  return {
    intro: mergeSection(c.intro, s.intro as Loose<SectionWords>),
    nextLabel: mergeText(c.nextLabel, s.nextLabel),
    steps: mergeCards(c.steps, s.steps),
    sendLabel: mergeText(c.sendLabel, s.sendLabel),
    send: mergeLines(c.send, s.send),
    regions: mergeSection(c.regions, s.regions as Loose<SectionWords>),
  }
}

export function mergeDrivewaysCopy(d: unknown): DrivewaysCopy {
  const s = doc(d)
  const c = DRIVEWAYS_COPY
  return {
    patterns: mergeSection(c.patterns, s.patterns as Loose<SectionWords>),
    process: mergeSection(c.process, s.process as Loose<SectionWords>),
    steps: mergeCards(c.steps, s.steps),
    gallery: mergeSection(c.gallery, s.gallery as Loose<SectionWords>),
    area: mergeSection(c.area, s.area as Loose<SectionWords>),
    questions: mergeSection(c.questions, s.questions as Loose<SectionWords>),
    faqs: mergeFaqs(c.faqs, s.faqs),
  }
}
