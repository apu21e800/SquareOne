/**
 * The add-ons (Vern, 21 Oct 2026): Square One gets the editor free, every
 * page's words and photos, gallery photos, projects and blog posts written by
 * hand; the automation is offered separately, "not aggressively, they will
 * see the value". Until an add-on is sold the office doesn't see it: the
 * Studio hides Blog ideas, Job photos and Sent to Buffer, "new document"
 * doesn't offer them, a post's "Goes live by itself" is hidden, and the
 * guide shows only what's included (lib/office-guide.ts).
 *
 * NEXT_PUBLIC_STUDIO_ADDONS=on in Vercel shows them, with the automation's own
 * keys (docs/AUTOMATION.md) and a redeploy: a NEXT_PUBLIC_ value is built into
 * the Studio. Nothing is deleted while they're hidden.
 *
 * No imports: the Studio's bundle reads it too.
 */

/** Whether a value switches the add-ons on: "on" only, so a typo leaves them off. */
export function addonsOn(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "on"
}

/** This build's setting. The literal process.env read is what Next builds into the Studio. */
export const ADDONS = addonsOn(process.env.NEXT_PUBLIC_STUDIO_ADDONS)

/** The add-ons' own document types: their lists and "new document" show only with the add-ons on. */
export const ADDON_TYPES: ReadonlySet<string> = new Set(["storyIdea", "fieldPost", "socialLog"])
