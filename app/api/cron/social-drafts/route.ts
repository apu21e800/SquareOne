/**
 * GET /api/cron/social-drafts: the daily run, 14:00 UTC (7 a.m. in Vancouver
 * in summer, 6 a.m. in winter): the blog's scheduled posts, then social, then
 * the next project article (20 Oct 2026, as hubss.com's daily run).
 *
 * Vercel Cron calls it (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * Run it now: Vercel → square-one → Settings → Cron Jobs → Run.
 *
 * Three steps, each on its own (a failure in one is emailed and the next
 * still runs; the response carries all three):
 *  1. publishDueDrafts (lib/automation/project-posts.ts): every blog draft set
 *     to go live by itself whose time has come is published.
 *  2. draftSocialForNewPosts (lib/automation/social.ts): drafts in Square
 *     One's own Buffer for new blog posts, Job photos and the weekly library
 *     post, waiting there for approval (SOCIAL_AUTO_QUEUE=on would queue
 *     them instead, lib/automation/buffer.ts). A post step 1 just published
 *     waits for tomorrow's run.
 *  3. draftProjectArticles (lib/automation/project-posts.ts): one Job photos
 *     post with its story becomes a scheduled project article, with the time
 *     the route has left (it needs NEEDS_MS; otherwise the next run does it).
 *
 * Needs, in Vercel (Production): CRON_SECRET, ANTHROPIC_API_KEY,
 * SANITY_API_WRITE_TOKEN; BUFFER_API_KEY for step 2; BLOG_DRAFT_NOTIFY and the
 * quote form's RESEND_API_KEY for the emails. Until BUFFER_API_KEY is first
 * set, step 2 does nothing; after that, a social run that fails (an expired
 * key, a missing setting, the key itself gone) emails the editors what to do
 * (notifyRunFailure), every day until it's fixed.
 */
import { NextResponse, type NextRequest } from "next/server"
import { bufferApi } from "@/lib/automation/buffer"
import { cronAuth, cronReady } from "@/lib/automation/cron"
import { emailEditors } from "@/lib/automation/editor-mail"
import { draftProjectArticles, publishDueDrafts } from "@/lib/automation/project-posts"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"
import { draftSocialForNewPosts, notifyRunFailure, SANITY_TIMEOUT_MS, socialJobHasRun } from "@/lib/automation/social"

export const maxDuration = 300
export const dynamic = "force-dynamic"

/** The route's budget: maxDuration less a margin for the response. */
const BUDGET_MS = 290_000

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

export async function GET(req: NextRequest): Promise<NextResponse> {
  const denied = cronAuth(req, "social")
  if (denied) return denied
  // Paused, or Sanity not connected: nothing to tell anyone.
  const off = cronReady("social", [])
  if (off) return NextResponse.json({ skipped: off.reason })

  const missing = ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"].filter((k) => !process.env[k])
  if (missing.length) {
    const message = `Not configured: ${missing.join(", ")}`
    console.error(`[social] run failed: ${message}`)
    await notifyRunFailure(resendMailer, new Error(message))
    return NextResponse.json({ error: message }, { status: 500 })
  }

  const startedAt = Date.now()
  const deadline = startedAt + BUDGET_MS
  const now = new Date(startedAt)
  const store = sanityStore({ timeoutMs: SANITY_TIMEOUT_MS })
  const deps = { claude: anthropicClaude, store, mail: resendMailer, now: () => new Date() }
  const out: Record<string, unknown> = {}
  let failed = false

  // 1. The blog: scheduled drafts whose time has come.
  let holdBack = new Set<string>()
  try {
    const published = await publishDueDrafts(deps, now, { social: Boolean(process.env.BUFFER_API_KEY) })
    holdBack = new Set(published.published.map((p) => p.slug))
    out.published = published
  } catch (err) {
    failed = true
    out.published = { error: errorText(err) }
    console.error(`[projects] publishing failed: ${errorText(err)}`)
    await emailEditors(
      resendMailer,
      "Scheduled posts didn't run",
      `This morning's run couldn't check the blog's scheduled drafts. Nothing was published and nothing is lost: a draft whose time has come goes at the next run.\n\nWhat happened: ${errorText(err)}`,
      "projects",
    )
  }

  // 2. Social.
  if (!process.env.BUFFER_API_KEY) {
    // Normal before Buffer is set up. Once the job has drafted anything, a
    // missing key means it was lost: say so.
    if (await socialJobHasRun(store)) {
      const message = "BUFFER_API_KEY is not set"
      failed = true
      console.error(`[social] run failed: ${message}`)
      await notifyRunFailure(resendMailer, new Error(message))
      out.social = { error: message }
    } else {
      out.social = { skipped: "BUFFER_API_KEY is not set yet" }
    }
  } else {
    try {
      out.social = await draftSocialForNewPosts({ ...deps, buffer: bufferApi }, { holdBack, startedAt })
    } catch (err) {
      failed = true
      out.social = { error: errorText(err) }
      console.error(`[social] run failed: ${errorText(err)}`)
      await notifyRunFailure(resendMailer, err)
    }
  }

  // 3. The next project article, with the time that's left.
  try {
    out.projectArticles = await draftProjectArticles(deps, now, { deadline })
  } catch (err) {
    failed = true
    out.projectArticles = { error: errorText(err) }
    console.error(`[projects] drafting failed: ${errorText(err)}`)
    await emailEditors(
      resendMailer,
      "Project article didn't run",
      `This morning's run couldn't look for Job photos with a story to write up. Nothing is lost: the next run tries again.\n\nWhat happened: ${errorText(err)}`,
      "projects",
    )
  }

  return NextResponse.json(out, { status: failed ? 500 : 200 })
}
