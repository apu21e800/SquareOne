/**
 * The typeface switch — the registry.
 *
 * A client cannot choose a face from a name, and they cannot choose one from
 * a specimen sheet either: they choose it from their own site, with their own
 * words in it. So the switch runs the real pages in each candidate and lets
 * them flip. Adding a fourth face is one entry here, one loader in
 * app/layout.tsx and one block in app/refine.css — nothing else knows how
 * many faces there are.
 *
 * ONE VARIABLE AT A TIME. The switch changes the DISPLAY face only. Inter
 * carries running text in every option, so what the client is comparing is
 * the thing actually in question — the voice of the headlines — and not a
 * second change smuggled in underneath it. Say so in the UI; a comparison
 * that moves two things at once teaches nothing.
 *
 * The face marked `live` is what the site ships and needs no attribute on
 * <html>. Every other face sets html[data-type="<id>"], which app/refine.css
 * turns into a --font-display swap plus its own tracking.
 *
 * THREE ARE OPEN, ONE IS LICENSED, and that is deliberate: the client can see
 * what their money buys rather than take it on trust. To add a second
 * licensed cut — Futura PT, Futura ND, Futura Now, or anything else — drop
 * the .woff2 files in app/fonts/, add a localFont() loader in app/layout.tsx,
 * add an entry here, and add a tracking block in app/refine.css. Four steps,
 * no other file changes. Licensed faces cannot be fetched by an agent; the
 * files have to come from whoever holds the licence.
 *
 * THE FOURTH SLOT ASKS A DIFFERENT QUESTION. Futura, Jost and Poppins are all
 * geometric sans with a shared lineage — choosing between them is choosing a
 * shade. Space Grotesk is a grotesque, not a geometric: squarer bowls,
 * sheared terminals, drawn for screens. If every option is a Futura the
 * comparison only ever confirms Futura, so one option is not.
 */

export type TypefaceId = "futura" | "jost" | "space-grotesk" | "poppins"

export interface Typeface {
  id: TypefaceId
  /** What the switch calls it. */
  label: string
  /** One line under the label — the reason this face is in the running. */
  note: string
  /** The stack the switch's own button is set in, so each label wears its face. */
  preview: string
  /** Licensing, because it is half the decision and the client should see it. */
  licence: "Licensed" | "Open"
  /** The face the site ships. Exactly one entry has this. */
  live?: boolean
}

export const TYPEFACES: Typeface[] = [
  {
    id: "futura",
    label: "Futura",
    note: "Futura LT — the wordmark's own face. Sharp apexes, small x-height.",
    preview: "var(--font-futura), var(--font-poppins), sans-serif",
    licence: "Licensed",
    live: true,
  },
  {
    id: "jost",
    label: "Jost",
    note: "Open Futura-alike. Geometric and sharp, a little more x-height.",
    preview: "var(--font-jost), sans-serif",
    licence: "Open",
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    note: "Not a geometric at all — a contemporary grotesque, squarer and more civic.",
    preview: "var(--font-space-grotesk), sans-serif",
    licence: "Open",
  },
  {
    id: "poppins",
    label: "Poppins",
    note: "The face the site ran until 17 Sept. Round, tall x-height, soft.",
    preview: "var(--font-poppins), sans-serif",
    licence: "Open",
  },
]

export const LIVE_TYPEFACE: TypefaceId =
  TYPEFACES.find((t) => t.live)?.id ?? TYPEFACES[0].id

export const TYPEFACE_IDS: TypefaceId[] = TYPEFACES.map((t) => t.id)

export function isTypefaceId(value: unknown): value is TypefaceId {
  return typeof value === "string" && (TYPEFACE_IDS as string[]).includes(value)
}
