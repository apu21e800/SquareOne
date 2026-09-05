/**
 * Sanity connection — read once, everywhere.
 *
 * The site never requires the CMS to build: with no project id every reader
 * in lib/cms.ts returns its file-based fallback and the pages render exactly
 * as they did before Sanity existed. Set these in Vercel (never in git):
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   the project id from sanity.io/manage
 *   NEXT_PUBLIC_SANITY_DATASET      "production" unless told otherwise
 *   SANITY_API_READ_TOKEN           optional — only for reading drafts
 *   SANITY_REVALIDATE_SECRET        shared with the Sanity webhook
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ""
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
export const apiVersion = "2025-06-01"

/** True once Vercel carries a project id — the switch for every CMS reader. */
export const cmsEnabled = /^[a-z0-9-]{4,}$/.test(projectId)
