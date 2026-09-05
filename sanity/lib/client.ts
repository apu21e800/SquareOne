import { createClient } from "next-sanity"
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

export type { SanityImageSource }
import { apiVersion, cmsEnabled, dataset, projectId } from "../env"

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

/** Every CMS read goes through here: cached 60s by Next, tagged for the webhook. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = ["sanity"]): Promise<T | null> {
  if (!client) return null
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60, tags } })
  } catch (err) {
    console.error("[sanity] fetch failed, using fallback:", err instanceof Error ? err.message : err)
    return null
  }
}
