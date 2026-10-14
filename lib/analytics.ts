/**
 * Google Analytics 4 (14 Oct 2026): Square One's own property,
 * "www.squareonepaving.com - GA4" in the Square One account, the one the old
 * site fed. The new site went live on 19 Sept 2026 without the tag, so it
 * recorded nothing from then until this change (Vern, 14 Oct: "make sure
 * google analytics is up to date"). The id is public by design: every page
 * that loads the tag shows it.
 *
 * Only production counts. Branch previews, local builds and an editor's
 * preview (draft mode, app/layout.tsx) never load it: none of them is a visit.
 */
export const GA_MEASUREMENT_ID = "G-00DJDXYG7N"

export const analyticsOn = process.env.VERCEL_ENV === "production"
