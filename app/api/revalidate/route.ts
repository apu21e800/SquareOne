import { revalidateTag } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { parseBody } from "next-sanity/webhook"

/**
 * Sanity → site: the moment an editor publishes, Sanity calls this address and
 * every CMS-backed page rebuilds on its next request. Configure the webhook at
 * sanity.io/manage → API → Webhooks with URL /api/revalidate and the same
 * value in its Secret field as SANITY_REVALIDATE_SECRET in Vercel (docs/CMS.md,
 * step 5). Without the webhook the pages still refresh on their own within 60
 * seconds.
 *
 * Signed since the security sweep of 9 Oct 2026. The secret used to ride in
 * the address (?secret=…), where every request log keeps a copy of it; now
 * Sanity signs each call with it and this route checks the signature. Fails
 * closed: no secret configured, or a missing or wrong signature, and nothing
 * is purged.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ ok: false, reason: "no secret configured" }, { status: 500 })
  let signed = false
  try {
    const { isValidSignature } = await parseBody(req, secret)
    signed = isValidSignature === true
  } catch {
    signed = false
  }
  if (!signed) return NextResponse.json({ ok: false, reason: "bad signature" }, { status: 401 })
  revalidateTag("sanity", "max")
  return NextResponse.json({ ok: true, revalidated: "sanity", at: new Date().toISOString() })
}
