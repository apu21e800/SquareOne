import { NextResponse } from "next/server"
import { buildSearchIndex } from "@/lib/search-index"

/**
 * The sitewide search index, frozen at build time (public/ exists there;
 * it is excluded from function bundles by outputFileTracingExcludes, so
 * this route must never become dynamic).
 */
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(buildSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  })
}
