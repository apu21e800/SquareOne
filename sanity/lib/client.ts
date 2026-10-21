import { createClient, createDataAttribute, type SanityClient } from "next-sanity"
import { draftMode } from "next/headers"
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

export type { SanityImageSource }
import { apiVersion, cmsEnabled, dataset, projectId } from "../env"
import { stegaFilter } from "./stega"

/** Read client — public dataset over the CDN; drafts never leak to the site. */
export const client = cmsEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null

const builder = cmsEnabled ? createImageUrlBuilder({ projectId, dataset }) : null

/** Sanity image → CDN URL (auto format, quality 82). Width/height are hints for the crop. */
export function urlFor(source: SanityImageSource, width?: number, height?: number): string {
  if (!builder) return ""
  let b = builder.image(source).auto("format").quality(82)
  if (width) b = b.width(width)
  if (height) b = b.height(height).fit("crop")
  return b.url()
}

/* ------------------------------------------------------------------
   Edit on the page (14 Oct 2026)

   The Studio's "Edit on the page" opens the site inside the Studio with
   Next's draft mode on, in that editor's browser only. While it is on,
   every reader below gets the drafts (what the editor has typed, not yet
   published) with invisible marks on the words a visitor reads
   (./stega.ts), so a click on them opens their field. Everyone else gets
   the published, cached pages exactly as before: draft mode never changes
   what a visitor is served.

   SANITY_API_READ_TOKEN (a Viewer token, Vercel Production, never
   NEXT_PUBLIC) is what lets the preview read drafts. Without it the
   Studio's preview can't switch on (app/api/draft-mode/enable says why)
   and nothing else changes.
   ------------------------------------------------------------------ */

export function previewToken(): string | undefined {
  const token = process.env.SANITY_API_READ_TOKEN?.trim()
  return token ? token : undefined
}

let previewReader: SanityClient | null = null

function previewClient(): SanityClient | null {
  if (!client) return null
  const token = previewToken()
  if (!token) return null
  previewReader ??= client.withConfig({
    token,
    useCdn: false,
    perspective: "drafts",
    stega: { enabled: true, studioUrl: "/studio", filter: stegaFilter },
  })
  return previewReader
}

/** True only for an editor's preview. Outside a request (build, scripts) it is false. */
export async function inDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/** Every CMS read goes through here: cached 60s by Next, tagged for the webhook. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = ["sanity"]): Promise<T | null> {
  if (!client) return null
  if (await inDraftMode()) {
    const reader = previewClient()
    if (reader) {
      try {
        return await reader.fetch<T>(query, params, { cache: "no-store" })
      } catch (err) {
        console.error("[sanity] preview read failed, showing published:", err instanceof Error ? err.message : err)
      }
    }
  }
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60, tags } })
  } catch (err) {
    console.error("[sanity] fetch failed, using fallback:", err instanceof Error ? err.message : err)
    return null
  }
}

/**
 * The attribute that makes a photograph clickable in the editor's preview:
 * a click opens that document's field in the Studio. Undefined outside the
 * preview, so the published pages carry nothing extra.
 */
export function editAttr(preview: boolean, doc: { _id?: string; _type?: string } | null | undefined, path: string): string | undefined {
  if (!preview || !cmsEnabled || !doc?._id || !doc._type) return undefined
  return createDataAttribute({ projectId, dataset, baseUrl: "/studio", id: doc._id.replace(/^drafts\./, ""), type: doc._type, path }).toString()
}
