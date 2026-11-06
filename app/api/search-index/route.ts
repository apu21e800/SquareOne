import { NextResponse } from "next/server"
import { buildSiteSearchIndex } from "@/lib/search-index"

/**
 * The sitewide search index. Rebuilt every hour (3 Nov 2026), so a post or
 * a project written in the Studio is found within the hour; it was frozen
 * at build until then, and the office's own posts were never in it. Its
 * folder walks go through lib/disk.ts, which falls back to the build's
 * snapshot where public/ is not on the server, so an hourly rebuild comes
 * out the same as the build's. Never force-dynamic: it would run on every
 * search.
 */
export const revalidate = 3600

export async function GET() {
  return NextResponse.json(await buildSiteSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  })
}
