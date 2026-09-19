import type { CSSProperties } from "react"

/**
 * Optical display sizing.
 *
 * Two different things make a caps headline go wrong, and they need
 * different answers.
 *
 * The first is LENGTH. A long title wants a smaller size, or it takes four
 * lines and stops being a headline. That is a judgement about the whole
 * line and it is made here, in `--fit-pref`.
 *
 * The second is the LONGEST WORD, and it is the one that actually broke.
 * The display voice is spaced caps, and spaced caps have no mercy on a word
 * with nowhere to wrap: "TRAFFICPATTERNSXD" is a seventeen-character token
 * that at the top of the ramp either spilled its column or got snapped
 * mid-word by the `overflow-wrap` guard, and both read as a mistake rather
 * than a decision (Vern, 17 Sept: "seeing text outliers"). No clamp fixes
 * that, because the width at which it happens depends on the column, not on
 * the viewport — the same word is fine in a hero and impossible in a card.
 *
 * So the ceiling is not a number. `--fit-em` is the width of the longest
 * word in em; `.display-fit` sizes the headline as the SMALLER of the fluid
 * preference and `100cqi / --fit-em`, the size at which that word exactly
 * fills the column it is standing in. The browser resolves it continuously,
 * at every width, not only at the three somebody thought to test. A
 * compositor sizing a masthead to the widest piece of metal in the case, in
 * one line of CSS.
 *
 * CAP_EM is the advance of one uppercase character in Futura LT Bold at
 * display tracking. Measured in the browser rather than guessed: the whole
 * alphabet averages 0.768 em, but that carries M and W at a frequency no
 * real title has. The site's actual headlines measure 0.64 ("STREETPRINT")
 * to 0.69 ("TRAFFICPATTERNSXD", "THE DRIVEWAY YOU ALREADY HAVE"). 0.72 sits
 * just above the worst real line and well under the alphabet, so the fit is
 * honest without leaving the type a size smaller than it needs to be.
 * Re-measure if the display face changes.
 */
const CAP_EM = 0.72

/**
 * The same measure for a headline set in sentence case. Futura's lowercase
 * is much narrower than its caps — a small x-height on a wide body — and a
 * mixed-case line has no tracking to carry, so it runs about 0.52 em per
 * character against the caps' 0.72.
 */
const MIXED_EM = 0.52

type FitOptions = {
  /** Never smaller than this. Default 1.625rem. */
  min?: string
  /** Never larger than this. Default 4rem — the top of the display ramp. */
  max?: string
  /** Override the length-derived fluid preference. */
  pref?: string
  /** The headline is set in sentence case, not the display caps. */
  sentence?: boolean
}

/** The fluid preference a line of this many characters wants. */
function prefForLength(n: number): string {
  if (n <= 20) return "5vw"
  if (n <= 32) return "4.2vw"
  if (n <= 48) return "3.6vw"
  if (n <= 80) return "3vw"
  if (n <= 130) return "2.5vw"
  return "2.1vw"
}

export function fitVars(text: string, opts: FitOptions = {}): CSSProperties {
  const clean = text.replace(/[®™]/g, "").trim()
  const longest = clean.split(/\s+/).reduce((n, word) => Math.max(n, word.length), 1)

  return {
    "--fit-em": (longest * (opts.sentence ? MIXED_EM : CAP_EM)).toFixed(2),
    "--fit-min": opts.min ?? "1.5rem",
    "--fit-max": opts.max ?? "4rem",
    "--fit-pref": opts.pref ?? prefForLength(clean.length),
  } as CSSProperties
}
