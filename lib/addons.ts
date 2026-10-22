/**
 * The add-ons: Blog ideas, Job photos, Sent to Buffer and a post's "Goes live
 * by itself", with the automation behind them (docs/AUTOMATION.md).
 *
 * Shown (Vern, 22 Oct 2026, onboarding Sydney: "add back in the Blog ideas,
 * Job photos, Sent to Buffer and 'Goes live by itself'"). The switch stays
 * for the day an add-on isn't in Square One's package (Vern, 21 Oct 2026: the
 * editor is included, the automation offered separately):
 * NEXT_PUBLIC_STUDIO_ADDONS=off in Vercel, and a redeploy (a NEXT_PUBLIC_
 * value is built into the Studio), hides them from the Studio, "new
 * document" and the guide (lib/office-guide.ts), and the automation's runs
 * stop with them (lib/automation/cron.ts), so nothing goes out that the
 * office can't see. Nothing is deleted while they're hidden.
 *
 * No imports: the Studio's bundle reads it too.
 */

/** Whether a value leaves the add-ons on: anything but "off". */
export function addonsOn(value: string | undefined): boolean {
  return value?.trim().toLowerCase() !== "off"
}

/** This build's setting. The literal process.env read is what Next builds into the Studio. */
export const ADDONS = addonsOn(process.env.NEXT_PUBLIC_STUDIO_ADDONS)

/** The add-ons' own document types: their lists and "new document" go with the add-ons. */
export const ADDON_TYPES: ReadonlySet<string> = new Set(["storyIdea", "fieldPost", "socialLog"])
