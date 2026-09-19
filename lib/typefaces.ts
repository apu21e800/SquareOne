/**
 * The type switch — the registry.
 *
 * A client cannot choose type from a name, and they cannot choose it from a
 * specimen sheet either: they choose it from their own site, with their own
 * words and photographs in it. So the switch runs the real pages in each
 * candidate and lets them flip.
 *
 * 19 Sept 2026 — SECOND ROUND. The first round compared four FACES (Futura,
 * Jost, Space Grotesk, Poppins) and settled on Futura on the 17th. The day
 * after launch Vern's note was "it feels too blocky" — and the blockiness
 * was never the face, it was the SETTING: every headline in Futura Bold
 * spaced capitals. So this round compares four SETTINGS of the face that
 * was chosen: case, weight, tracking and the body text beside it. The three
 * open faces are retired from the switch (one entry each in git if they are
 * ever wanted back).
 *
 * Each option is a complete system — display face and weight, case,
 * tracking, running text — because that is what a reader experiences. The
 * switch says so in its footer.
 *
 * The entry marked `live` is what the site ships and needs no attribute on
 * <html>. Every other id sets html[data-type="<id>"], which app/refine.css
 * turns into the overrides for that system. Adding a system is one entry
 * here, one block in app/refine.css and — only if it brings a new font —
 * one loader in app/layout.tsx.
 *
 * Where the switch shows is decided in components/TypeToggle.tsx and the
 * boot script in app/layout.tsx: preview deployments, development and
 * localhost. Production never renders it and never honours ?type=, so a
 * shared link can never leave a visitor's browser stuck on an alternate.
 */

export type TypefaceId = "futura" | "futura-caps" | "futura-serif" | "futura-light"

export interface Typeface {
  id: TypefaceId
  /** What the switch calls it. */
  label: string
  /** One line under the label — what this setting is and why it is here. */
  note: string
  /** The stack the switch's own button is set in, so each label wears its face. */
  preview: string
  /** Extra inline style for the button, so the label also wears its setting. */
  previewStyle?: { fontWeight?: number; textTransform?: "uppercase" | "none"; letterSpacing?: string }
  /** Licensing, because it is half the decision and the client should see it. */
  licence: "Licensed" | "Open"
  /** The setting the site ships. Exactly one entry has this. */
  live?: boolean
}

export const TYPEFACES: Typeface[] = [
  {
    id: "futura",
    label: "Futura, quiet",
    note: "Futura Bold in sentence case, closed up. Inter for reading. The wordmark's face, set the way the classic specimens set it.",
    preview: "var(--font-futura), var(--font-poppins), sans-serif",
    previewStyle: { fontWeight: 700, letterSpacing: "-0.01em" },
    licence: "Licensed",
    live: true,
  },
  {
    id: "futura-caps",
    label: "Futura, capitals",
    note: "The launch setting — Futura Bold in spaced capitals. Poster voice: strong at a glance, loud over a long page.",
    preview: "var(--font-futura), var(--font-poppins), sans-serif",
    previewStyle: { fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" },
    licence: "Licensed",
  },
  {
    id: "futura-serif",
    label: "Futura + serif",
    note: "The quiet setting with Source Serif for the reading text. Warmer and more editorial; the headlines stay geometric.",
    preview: "var(--font-futura), var(--font-poppins), sans-serif",
    previewStyle: { fontWeight: 700, letterSpacing: "-0.01em" },
    licence: "Licensed",
  },
  {
    id: "futura-light",
    label: "Futura, light",
    note: "Futura Book at display size, sentence case, a step larger. The architectural setting — elegant, and it leans on the photographs.",
    preview: "var(--font-futura), var(--font-poppins), sans-serif",
    previewStyle: { fontWeight: 400, letterSpacing: "0" },
    licence: "Licensed",
  },
]

export const LIVE_TYPEFACE: TypefaceId =
  TYPEFACES.find((t) => t.live)?.id ?? TYPEFACES[0].id

export const TYPEFACE_IDS: TypefaceId[] = TYPEFACES.map((t) => t.id)

export function isTypefaceId(value: unknown): value is TypefaceId {
  return typeof value === "string" && (TYPEFACE_IDS as string[]).includes(value)
}
