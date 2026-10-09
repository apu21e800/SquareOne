/**
 * GET /api/cron/social-drafts: daily Buffer drafts for new blog posts.
 *
 * Vercel Cron calls it (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * Run it now: Vercel → square-one → Settings → Cron Jobs → Run.
 * Drafts only; nothing is ever posted from here. See lib/automation/social.ts
 * and docs/AUTOMATION.md.
 *
 * Needs, in Vercel (Production): CRON_SECRET, BUFFER_API_KEY,
 * ANTHROPIC_API_KEY, SANITY_API_WRITE_TOKEN; BLOG_DRAFT_NOTIFY and the
 * quote form's RESEND_API_KEY for the email. Until they're set it does nothing.
 */
import { NextResponse, type NextRequest } from "next/server"
import { bufferApi } from "@/lib/automation/buffer"
import { cronGate } from "@/lib/automation/cron"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"
import { draftSocialForNewPosts } from "@/lib/automation/social"

export const maxDuration = 300
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const gate = cronGate(req, "social", ["BUFFER_API_KEY", "ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"])
  if (gate) return gate
  try {
    const result = await draftSocialForNewPosts({
      claude: anthropicClaude,
      store: sanityStore(),
      buffer: bufferApi,
      mail: resendMailer,
      now: () => new Date(),
    })
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[social] run failed: ${message}`)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
