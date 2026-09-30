/**
 * GET /api/cron/draft-post: the weekly blog drafter.
 *
 * Vercel Cron calls it (vercel.json) with `Authorization: Bearer $CRON_SECRET`.
 * To run it now: Vercel → square-one → Settings → Cron Jobs → Run. To draft
 * one particular project: add ?project=<its slug>.
 *
 * Takes the next project on record (or added in Studio) with no post, has
 * Claude write a project story from the record alone, rewrites any sentence
 * that breaks the house style, fact-checks it, saves it as an UNPUBLISHED
 * blog post with both checks in its notes, and emails BLOG_DRAFT_NOTIFY.
 * See lib/automation/blog.ts and docs/AUTOMATION.md.
 *
 * Needs, in Vercel (Production): CRON_SECRET, ANTHROPIC_API_KEY,
 * SANITY_API_WRITE_TOKEN (an Editor token), BLOG_DRAFT_NOTIFY, and the
 * RESEND_API_KEY and CONTACT_FROM the quote form already uses. Until they're
 * set it does nothing.
 */
import { NextResponse, type NextRequest } from "next/server"
import { draftNextPost } from "@/lib/automation/blog"
import { cronGate } from "@/lib/automation/cron"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"

// Three Claude calls: writing (about a minute), a short style rewrite, and checking.
export const maxDuration = 300
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const gate = cronGate(req, "blog", ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN"])
  if (gate) return gate
  try {
    const result = await draftNextPost(
      { project: req.nextUrl.searchParams.get("project") ?? undefined },
      { claude: anthropicClaude, store: sanityStore(), mail: resendMailer, now: () => new Date() },
    )
    return NextResponse.json(result)
  } catch (err) {
    // Nothing was logged, so the next run tries the same project again.
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[blog] draft failed: ${message}`)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
