/**
 * GET /api/cron/draft-post: the blog drafter, Tuesdays and Thursdays.
 *
 * Vercel Cron calls it (vercel.json, 13:00 UTC) with `Authorization: Bearer
 * $CRON_SECRET`. To run it now: Vercel → square-one → Settings → Cron Jobs →
 * Run. To draft one particular plan item: add ?idea=<its document id>; one
 * particular project, outside the plan: ?project=<its web address>.
 *
 * It takes the top Ready item in Studio's Blog plan (the top Idea when none
 * is Ready), has Claude write a draft from Square One's own pages and
 * documented jobs, rewrite any sentence that breaks the house style and
 * fact-check it, saves it as an UNPUBLISHED blog post with both checks in its
 * notes, marks the plan item Drafted, and emails BLOG_DRAFT_NOTIFY with the
 * next idea. When the plan is low it adds new Ideas. A run that can't draft
 * emails what to fix. See lib/automation/blog.ts and docs/AUTOMATION.md.
 *
 * Needs, in Vercel (Production): CRON_SECRET, ANTHROPIC_API_KEY,
 * SANITY_API_WRITE_TOKEN (an Editor token), BLOG_DRAFT_NOTIFY, and the
 * RESEND_API_KEY and CONTACT_FROM the quote form already uses. Until they're
 * set it does nothing.
 */
import { NextResponse, type NextRequest } from "next/server"
import { notifyNotConfigured, runDrafter } from "@/lib/automation/blog"
import { cronAuth, cronReady } from "@/lib/automation/cron"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"

// Three Claude calls: writing (about a minute), a short style rewrite, and
// checking; then, when the plan is low and there's time, the planner's
// (lib/automation/planner.ts, which gives up after 80 s).
export const maxDuration = 300
export const dynamic = "force-dynamic"

const NEEDS = ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"]

export async function GET(req: NextRequest): Promise<NextResponse> {
  const denied = cronAuth(req, "blog")
  if (denied) return denied
  const off = cronReady("blog", NEEDS)
  if (off) {
    // Vercel's own call with a key missing: the editor hears which one.
    if (off.missing.length) await notifyNotConfigured(resendMailer, off.missing)
    return NextResponse.json({ skipped: off.reason })
  }
  const params = req.nextUrl.searchParams
  const result = await runDrafter(
    { idea: params.get("idea") ?? undefined, project: params.get("project") ?? undefined },
    { claude: anthropicClaude, store: sanityStore(), mail: resendMailer, now: () => new Date() },
  )
  return NextResponse.json(result, { status: !result.drafted && result.error ? 500 : 200 })
}
