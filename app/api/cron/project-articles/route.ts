/**
 * GET /api/cron/project-articles: the project article run, daily at 15:00 UTC
 * (8 a.m. in Vancouver in summer, 7 a.m. in winter), an hour after the daily
 * run (app/api/cron/social-drafts) and on its own, so a morning when social
 * has a lot to draft can't crowd it out (review, 20 Oct 2026).
 *
 * Vercel Cron calls it (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * Run it now: Vercel → square-one → Settings → Cron Jobs → Run.
 *
 * draftProjectArticles (lib/automation/project-posts.ts): the oldest published
 * Job photos post with a story and no article yet becomes a project article,
 * saved as an unpublished draft, and the editors are emailed; a clean one is
 * set to go live by itself at the daily run two weekdays later, unless they
 * hold it. One a day. Nothing here publishes, and nothing posts to social.
 *
 * Needs, in Vercel (Production): CRON_SECRET, ANTHROPIC_API_KEY,
 * SANITY_API_WRITE_TOKEN; BLOG_DRAFT_NOTIFY and the quote form's
 * RESEND_API_KEY for the emails. Until they are set it does nothing (the
 * daily run's email already names a missing key).
 */
import { NextResponse, type NextRequest } from "next/server"
import { cronGate } from "@/lib/automation/cron"
import { emailEditors } from "@/lib/automation/editor-mail"
import { failureHint } from "@/lib/automation/outcome"
import { draftProjectArticles } from "@/lib/automation/project-posts"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"
import { SANITY_TIMEOUT_MS } from "@/lib/automation/social"

export const maxDuration = 300
export const dynamic = "force-dynamic"

/** The route's budget: maxDuration less a margin for the response. */
const BUDGET_MS = 290_000

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

export async function GET(req: NextRequest): Promise<NextResponse> {
  const closed = cronGate(req, "projects", ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"])
  if (closed) return closed

  const startedAt = Date.now()
  const now = new Date(startedAt)
  const deps = { claude: anthropicClaude, store: sanityStore({ timeoutMs: SANITY_TIMEOUT_MS }), mail: resendMailer, now: () => new Date() }
  try {
    const out = await draftProjectArticles(deps, now, { deadline: startedAt + BUDGET_MS })
    return NextResponse.json(out, { status: out.failed.length ? 500 : 200 })
  } catch (err) {
    console.error(`[projects] drafting failed: ${errorText(err)}`)
    await emailEditors(
      resendMailer,
      "Project article didn't run",
      `This morning's run couldn't look for Job photos with a story to write up. Nothing is lost: the next run tries again.\n\nWhat happened: ${errorText(err)}\n\n${failureHint(err, "projects")}`,
      "projects",
    )
    return NextResponse.json({ error: errorText(err) }, { status: 500 })
  }
}
