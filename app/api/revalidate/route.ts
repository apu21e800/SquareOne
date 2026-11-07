import { revalidateTag } from "next/cache"
import { after, NextResponse, type NextRequest } from "next/server"
import { parseBody } from "next-sanity/webhook"
import { draftSocialNow, socialFromWebhook } from "@/lib/automation/social-now"

// The social job can run after the answer (6 Nov 2026): Claude writes the
// posts, then Buffer takes the drafts. Its own limits keep it well inside this.
export const maxDuration = 300

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
 *
 * Since 6 Nov 2026 a published blog post or Job photos post also starts the
 * social job once the answer has gone (lib/automation/social-now.ts; Vern:
 * "make it go to buffer right away"), so its drafts are in Buffer a minute
 * or two after Publish instead of at the next 15-minute run. Only a signed
 * call gets that far.
 */
export async function POST(req: NextRequest) {
  // The social job's time limits count from here, not from after the answer.
  const startedAt = Date.now()
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ ok: false, reason: "no secret configured" }, { status: 500 })
  let signed = false
  let body: unknown = null
  try {
    const parsed = await parseBody(req, secret)
    signed = parsed.isValidSignature === true
    body = parsed.body
  } catch {
    signed = false
  }
  if (!signed) return NextResponse.json({ ok: false, reason: "bad signature" }, { status: 401 })
  // { expire: 0 }: the first request after a Publish waits for the fresh
  // page instead of being served the old one (Next 16's "max" would show
  // the old copy once more). An editor who publishes and reloads sees the
  // change (14 Oct 2026; hubss.com found the same).
  revalidateTag("sanity", { expire: 0 })
  const social = socialFromWebhook(body)
  if (social) {
    const type = (body as { _type: string })._type
    after(async () => {
      await draftSocialNow(`published ${type}`, undefined, startedAt)
    })
  }
  return NextResponse.json({ ok: true, revalidated: "sanity", ...(social ? { social: "drafting" } : {}), at: new Date().toISOString() })
}
