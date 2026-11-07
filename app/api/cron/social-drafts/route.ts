/**
 * GET /api/cron/social-drafts: every 15 minutes since 6 Nov 2026 (vercel.json;
 * Vern: "let's get the social drafts to arrive right away after a published
 * blog post"). It was once a day, 14:00 UTC (7 a.m. in Vancouver all year;
 * BC keeps UTC-7 from 1 November 2026), and the weekly library post still
 * waits for that hour (lib/automation/social.ts). The blog's scheduled posts,
 * then social (20 Oct 2026, as hubss.com's run). The project articles have
 * their own run, once a day an hour later (app/api/cron/project-articles), so
 * a busy run can't crowd them out.
 *
 * Vercel Cron calls it (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * Run it now: Vercel → square-one → Settings → Cron Jobs → Run.
 *
 * Two steps, each on its own (a failure in one is emailed and the next still
 * runs; the response carries both):
 *  1. publishDueDrafts (lib/automation/project-posts.ts): every blog draft set
 *     to go live by itself whose time has come is published.
 *  2. draftSocialForNewPosts (lib/automation/social.ts): drafts in Square
 *     One's own Buffer for new blog posts, Job photos and the weekly library
 *     post, waiting there for approval (SOCIAL_AUTO_QUEUE=on would queue
 *     them instead, lib/automation/buffer.ts). A post step 1 just published
 *     waits for the next run, 15 minutes on, so its page is live first.
 *
 * Needs, in Vercel (Production): CRON_SECRET, ANTHROPIC_API_KEY,
 * SANITY_API_WRITE_TOKEN; BUFFER_API_KEY for step 2; BLOG_DRAFT_NOTIFY and the
 * quote form's RESEND_API_KEY for the emails. Until BUFFER_API_KEY is first
 * set, step 2 does nothing; after that, a social run that fails (an expired
 * key, a missing setting, the key itself gone) emails the editors what to do
 * (notifyRunFailure): at once, then at most once a day while it keeps
 * failing (lib/automation/mail-cap.ts), not every 15 minutes.
 */
import { NextResponse, type NextRequest } from "next/server"
import { bufferApi } from "@/lib/automation/buffer"
import { cronAuth, cronReady } from "@/lib/automation/cron"
import { emailEditors } from "@/lib/automation/editor-mail"
import { mayEmailFailure, morningSlot } from "@/lib/automation/mail-cap"
import { publishDueDrafts } from "@/lib/automation/project-posts"
import { anthropicClaude, resendMailer, sanityStore, type Store } from "@/lib/automation/services"
import { draftSocialForNewPosts, notifyRunFailure, SANITY_TIMEOUT_MS, socialJobHasRun } from "@/lib/automation/social"

export const maxDuration = 300
export const dynamic = "force-dynamic"

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

/**
 * A failure email at most once a day (lib/automation/mail-cap.ts): the run
 * goes every 15 minutes. With no store (the write token itself missing), only
 * the morning run's email goes.
 */
async function mayMail(store: Store | null, key: string, now: Date, about: string): Promise<boolean> {
  return store ? mayEmailFailure(store, key, now, about) : morningSlot(now)
}

/** The store, or null when it can't be made (no write token): a failure email must not throw. */
function storeOrNull(): Store | null {
  try {
    return sanityStore({ timeoutMs: SANITY_TIMEOUT_MS })
  } catch {
    return null
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const denied = cronAuth(req, "social")
  if (denied) return denied
  // Paused, or Sanity not connected: nothing to tell anyone.
  const off = cronReady("social", [])
  if (off) return NextResponse.json({ skipped: off.reason })

  const startedAt = Date.now()
  const now = new Date(startedAt)

  const missing = ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"].filter((k) => !process.env[k])
  if (missing.length) {
    const message = `Not configured: ${missing.join(", ")}`
    console.error(`[social] run failed: ${message}`)
    if (await mayMail(storeOrNull(), "social-run", now, message)) await notifyRunFailure(resendMailer, new Error(message))
    return NextResponse.json({ error: message }, { status: 500 })
  }

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
    if (await mayMail(store, "publish-run", now, errorText(err))) {
      await emailEditors(
        resendMailer,
        "Scheduled posts didn't run",
        `The run couldn't check the blog's scheduled drafts. Nothing was published and nothing is lost: a draft whose time has come goes at the next run that works (they run every 15 minutes; this email comes at most once a day while it keeps failing).\n\nWhat happened: ${errorText(err)}`,
        "projects",
      )
    }
  }

  // 2. Social.
  if (!process.env.BUFFER_API_KEY) {
    // Normal before Buffer is set up. Once the job has drafted anything, a
    // missing key means it was lost: say so.
    if (await socialJobHasRun(store)) {
      const message = "BUFFER_API_KEY is not set"
      failed = true
      console.error(`[social] run failed: ${message}`)
      if (await mayMail(store, "social-run", now, message)) await notifyRunFailure(resendMailer, new Error(message))
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
      if (await mayMail(store, "social-run", now, errorText(err))) await notifyRunFailure(resendMailer, err)
    }
  }

  return NextResponse.json(out, { status: failed ? 500 : 200 })
}
