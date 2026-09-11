import { revalidateTag } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Sanity → site: the moment an editor publishes, Sanity calls this address and
 * every CMS-backed page rebuilds on its next request. Configure the webhook at
 * sanity.io/manage → API → Webhooks with URL /api/revalidate?secret=… and the
 * same value in Vercel as SANITY_REVALIDATE_SECRET. Without the webhook the
 * pages still refresh on their own within 60 seconds.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ ok: false, reason: "no secret configured" }, { status: 500 })
  if (req.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, reason: "bad secret" }, { status: 401 })
  }
  revalidateTag("sanity", "max")
  return NextResponse.json({ ok: true, revalidated: "sanity", at: new Date().toISOString() })
}
