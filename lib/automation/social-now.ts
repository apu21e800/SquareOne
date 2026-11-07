/**
 * Social drafts the moment something is published (6 Nov 2026).
 *
 * Vern, the evening social went live, after Sydney published a post and saw
 * nothing in Buffer: "make it go to buffer right away if possible, not sure
 * why we need the 15min post window???". The Sanity webhook that already
 * refreshes the site on every Publish (app/api/revalidate, "Publish to the
 * site": create, update and delete, published documents only, the whole
 * document as its body) now also starts the social job when what changed is
 * a blog post or a Job photos post. The job is the same one the 15-minute
 * run calls (lib/automation/social.ts draftSocialForNewPosts): it drafts
 * whatever is new and not yet in Buffer, so a post published at 9:02 has its
 * drafts in Buffer a minute or two later. The 15-minute run stays as the
 * safety net (a webhook Sanity didn't deliver, a run that failed) and for
 * posts set to go live at a time, retries and the weekly library post.
 *
 * Two runs at once (the webhook and the 15-minute run, or two Publishes in a
 * row) can't draft an item twice: each item is claimed (its socialLog
 * created) before anything goes to Buffer, and only one claim succeeds.
 *
 * Never throws: it runs after the webhook has answered (next/server after()),
 * so an error has no caller but the logs and, at most once a day, the
 * editors' inbox (lib/automation/mail-cap.ts).
 */
import { bufferApi } from "@/lib/automation/buffer"
import { cronReady } from "@/lib/automation/cron"
import { mayEmailFailure } from "@/lib/automation/mail-cap"
import { anthropicClaude, resendMailer, sanityStore } from "@/lib/automation/services"
import { draftSocialForNewPosts, notifyRunFailure, SANITY_TIMEOUT_MS, type SocialDeps } from "@/lib/automation/social"

/** The document types whose Publish can bring new social drafts. */
export const SOCIAL_SOURCES: ReadonlySet<string> = new Set(["post", "fieldPost"])

/**
 * Whether a webhook body is worth a social run: a published (not a draft or
 * a version) blog post or Job photos post. Anything else the dataset changes,
 * the job's own records included, is not, so the job never wakes itself.
 */
export function socialFromWebhook(body: unknown): boolean {
  const doc = body as { _type?: unknown; _id?: unknown } | null
  if (!doc || typeof doc._type !== "string" || !SOCIAL_SOURCES.has(doc._type)) return false
  const id = typeof doc._id === "string" ? doc._id : ""
  return !id.startsWith("drafts.") && !id.startsWith("versions.")
}

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

/**
 * One social run now. With the switches off (paused, the add-ons off, no
 * Sanity) or a key missing it does nothing: the 15-minute run is the one
 * that tells the editors what's missing. `deps` is for the tests.
 * `startedAt`: when the webhook arrived, so the job's time limits count the
 * seconds before it too (reading a signed body waits 3 s), inside the
 * route's 300 (review, 6 Nov 2026).
 */
export async function draftSocialNow(why: string, deps?: Omit<SocialDeps, "now"> & { now?: () => Date }, startedAt: number = Date.now()): Promise<unknown> {
  if (cronReady("social", [])) return { skipped: "switched off" }
  const missing = ["ANTHROPIC_API_KEY", "SANITY_API_WRITE_TOKEN", "BUFFER_API_KEY"].filter((k) => !process.env[k])
  if (!deps && missing.length) {
    console.log(`[social] ${why}: not configured (${missing.join(", ")}); the 15-minute run reports it`)
    return { skipped: `not configured: ${missing.join(", ")}` }
  }
  const d: SocialDeps = deps
    ? { ...deps, now: deps.now ?? (() => new Date()) }
    : { claude: anthropicClaude, store: sanityStore({ timeoutMs: SANITY_TIMEOUT_MS }), buffer: bufferApi, mail: resendMailer, now: () => new Date() }
  try {
    const out = await draftSocialForNewPosts(d, { startedAt })
    console.log(`[social] ${why}: ${out.posts.length} item(s) drafted or settled, ${out.waiting} waiting`)
    return out
  } catch (err) {
    console.error(`[social] ${why}: run failed: ${errorText(err)}`)
    try {
      if (await mayEmailFailure(d.store, "social-run", d.now(), errorText(err))) await notifyRunFailure(d.mail, err)
    } catch (mailErr) {
      console.error(`[social] ${why}: couldn't tell the editors: ${errorText(mailErr)}`)
    }
    return { error: errorText(err) }
  }
}
