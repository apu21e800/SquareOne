/**
 * GET /api/cron/social-drafts: the daily social drafts, 14:00 UTC.
 *
 * Vercel Cron calls it (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * Run it now: Vercel → square-one → Settings → Cron Jobs → Run. Drafts into
 * Square One's own Buffer from three streams (new blog posts, field posts,
 * the weekly library post); nothing is ever posted from here. See
 * lib/automation/social.ts and docs/AUTOMATION.md.
 *
 * Needs, in Vercel (Production): CRON_SECRET, BUFFER_API_KEY,
 * ANTHROPIC_API_KEY, SANITY_API_WRITE_TOKEN; BLOG_DRAFT_NOTIFY and the quote
 * form's RESEND_API_KEY for the email. Until BUFFER_API_KEY is first set it
 * does nothing. After that, a run that fails (an expired key, a missing
 * setting, the key itself gone) emails the editor what to do
 * (notifyRunFailure), every day until it's fixed.
 */
import { NextResponse, type NextRequest } from "next/server"
import { bufferApi } from "@/lib/automation/buffer"
import { cronAuth, cronReady } from "@/lib/automation/cron"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"
import { draftSocialForNewPosts, notifyRunFailure, SANITY_TIMEOUT_MS, socialJobHasRun } from "@/lib/automation/social"

export const maxDuration = 300
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const denied = cronAuth(req, "social")
  if (denied) return denied
  // Paused, or Sanity not connected: nothing to tell anyone.
  const off = cronReady("social", [])
  if (off) return NextResponse.json({ skipped: off.reason })

  if (!process.env.BUFFER_API_KEY) {
    // Normal before Buffer is set up. Once the job has drafted anything, a
    // missing key means it was lost: say so.
    if (process.env.SANITY_API_WRITE_TOKEN && (await socialJobHasRun(sanityStore({ timeoutMs: SANITY_TIMEOUT_MS })))) {
      const message = "BUFFER_API_KEY is not set"
      console.error(`[social] run failed: ${message}`)
      await notifyRunFailure(resendMailer, new Error(message))
      return NextResponse.json({ error: message }, { status: 500 })
    }
    return NextResponse.json({ skipped: "BUFFER_API_KEY is not set yet" })
  }
  const missing = ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"].filter((k) => !process.env[k])
  if (missing.length) {
    const message = `Not configured: ${missing.join(", ")}`
    console.error(`[social] run failed: ${message}`)
    await notifyRunFailure(resendMailer, new Error(message))
    return NextResponse.json({ error: message }, { status: 500 })
  }

  try {
    const result = await draftSocialForNewPosts({
      claude: anthropicClaude,
      store: sanityStore({ timeoutMs: SANITY_TIMEOUT_MS }),
      buffer: bufferApi,
      mail: resendMailer,
      now: () => new Date(),
    })
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[social] run failed: ${message}`)
    await notifyRunFailure(resendMailer, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
