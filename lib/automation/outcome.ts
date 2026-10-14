/**
 * When a run can't do its job: what to tell the editor, and what to do about
 * it (14 Oct 2026, ported from hubss.com's lib/social-outcome.ts). Pure, so
 * `npm run test:automation` checks every hint without a network.
 *
 * A run that can't draft says so by email (lib/automation/blog.ts runDrafter),
 * naming the key to fix: each outside service refuses in its own words, and
 * failureHint reads them. Checked on 9 Oct 2026 against the real services
 * on hubss.com: Anthropic says "authentication_error" / "invalid x-api-key";
 * Sanity says "Unauthorized - Session not found" (statusCode 401), or
 * "Insufficient permissions" for a token that can't write; Buffer's client
 * (lib/automation/buffer.ts) writes "Buffer API 401".
 */

import { BufferApiError, type BufferChannel } from "@/lib/automation/buffer"

export type Job = "blog" | "social"

const LOGS: Record<Job, string> = {
  blog: "Vercel → square-one → Logs, filtered on [blog]",
  social: "Vercel → square-one → Logs, filtered on [social]",
}

export const NO_CHANNELS = "Buffer has no channel this job can draft for"

const statusOf = (err: unknown): number | undefined => {
  if (typeof err !== "object" || err === null) return undefined
  const e = err as { statusCode?: unknown; status?: unknown }
  const n = typeof e.statusCode === "number" ? e.statusCode : typeof e.status === "number" ? e.status : undefined
  return n
}

// ── the social job (ported from hubss.com's lib/social-outcome.ts) ─────────

/** "lasting": this item will never draft there. "retry": it can clear. */
export type SkipKind = "lasting" | "retry"

export interface ChannelSkip {
  service: string
  channel: string
  why: string
  kind: SkipKind
}

/**
 * How one item (an article, a field post, a library post) ends a run:
 *  - "drafted": at least one draft reached Buffer. Done.
 *  - "nothing-possible": no channel could ever take it (only networks the job
 *    doesn't write for, or Instagram and no photo). Done, nothing drafted.
 *  - "retry": every channel failed for a reason that can clear (Buffer
 *    refused the draft, a channel is disconnected). Not done: the next daily
 *    run writes it again, and the email says why.
 *  - "gave-up": as "retry", but its first failed try was more than
 *    GIVE_UP_DAYS ago. Done, so a stuck item can't send an email every day
 *    for ever. Counted from the first failure, not the item's date, so an
 *    item first tried late still gets its full stretch of retries.
 * A done item keeps its socialLog and is never drafted again.
 */
export type Outcome = "drafted" | "nothing-possible" | "retry" | "gave-up"

/** Days after an item's first failed try during which the job keeps retrying it. */
export const GIVE_UP_DAYS = 14

/** Why a connected channel can't take a draft today, or null when it can. */
export function unusableReason(ch: Pick<BufferChannel, "isDisconnected" | "isLocked">): string | null {
  if (ch.isDisconnected) return "disconnected in Buffer: reconnect it there"
  if (ch.isLocked) return "locked by Buffer: the account has more channels than its plan allows"
  return null
}

/**
 * See Outcome. `failingDays`: days since the item's first failed try, or null
 * when it has never failed before (so a first failure is always a retry).
 * `skipped` is never empty with nothing drafted: the pipeline stops first
 * when Buffer has no usable channel.
 */
export function decideOutcome(drafted: number, skipped: readonly Pick<ChannelSkip, "kind">[], failingDays: number | null): Outcome {
  if (drafted > 0) return "drafted"
  if (skipped.every((s) => s.kind === "lasting")) return "nothing-possible"
  return failingDays !== null && failingDays > GIVE_UP_DAYS ? "gave-up" : "retry"
}

/** Days since a date ("2026-10-07" or a full timestamp); 0 when it can't be read or is in the future. */
export function daysSince(date: string, now: Date): number {
  const t = Date.parse(date)
  return Number.isNaN(t) ? 0 : Math.max(0, (now.getTime() - t) / 86_400_000)
}

/** Sanity refused a create because the id is taken: another run, or the same plan item twice. */
export function isConflict(err: unknown): boolean {
  return statusOf(err) === 409 || /already exists/i.test(err instanceof Error ? err.message : String(err))
}

/** What to do about a failed run, for the email. */
export function failureHint(err: unknown, job: Job = "blog"): string {
  const message = err instanceof Error ? err.message : String(err)
  const status = statusOf(err)
  const bufferStatus = err instanceof BufferApiError ? err.status : undefined
  // Buffer first: its client puts "Buffer" in every message it throws.
  if (bufferStatus === 401 || bufferStatus === 403 || /Buffer API 40[13]\b|\((UNAUTHENTICATED|UNAUTHORIZED|FORBIDDEN)\)/.test(message)) {
    return "Buffer refused the API key: it has expired (a key lasts a year at most) or was deleted. Make a new one in Square One's Buffer at publish.buffer.com/settings/api (choose 1 year), replace BUFFER_API_KEY in Vercel (Production) and redeploy."
  }
  if (message.startsWith(NO_CHANNELS)) return "Connect Square One's channels in its Buffer account: the Facebook page and Instagram (and Google Business Profile on Essentials)."
  if (/disconnected in Buffer/.test(message)) return "Reconnect the channel in Square One's Buffer; the next daily run drafts into it."
  if (/locked by Buffer/.test(message)) return "Buffer has more channels connected than the plan allows: remove one in Buffer or move to the plan that covers them."
  if (bufferStatus === 429 || /Buffer.*rate limit|Buffer API 429/i.test(message)) return "Buffer's request limit was reached. Nothing to do: the next daily run tries again."
  if (/Buffer API unreachable/.test(message)) return "Buffer didn't answer in time. Nothing to do: the next daily run tries again."

  // Anthropic.
  if (/authentication_error|x-api-key/i.test(message)) {
    return "Anthropic refused ANTHROPIC_API_KEY (expired or deleted). Make a new key in Square One's Anthropic account at console.anthropic.com, replace it in Vercel (Production) and redeploy. The blog drafter, the social drafts and the quote form's spam screen use the same key."
  }
  if (/credit balance|usage limits?|spend(ing)? limit/i.test(message)) {
    return "Anthropic stopped the run: the key's monthly spend limit (or the account's credit) has run out. Raise the limit or add credit at console.anthropic.com (Settings, Limits and Billing); nothing else needs changing."
  }
  if (/not_found_error/i.test(message) && /model/i.test(message)) {
    return "Anthropic no longer offers the model the drafters ask for (claude-opus-4-5 retires on or after 24 Nov 2026). Set BLOG_DRAFT_MODEL (and SOCIAL_DRAFT_MODEL) in Vercel (Production) to a current model and redeploy."
  }
  if (/permission_error/i.test(message)) {
    return "Anthropic refused ANTHROPIC_API_KEY for this request: the key's workspace can't use it. Check the key's workspace at console.anthropic.com, or make a new key, replace it in Vercel (Production) and redeploy."
  }
  if (/overloaded_error|rate_limit_error|\b529\b/i.test(message)) {
    return "Anthropic was busy. Nothing to change: the next run tries again, or run it now from Vercel → square-one → Settings → Cron Jobs."
  }

  // Sanity (a Buffer error carries its own status, so it never lands here).
  if ((status === 401 && bufferStatus === undefined) || /Session not found|Unauthorized/i.test(message)) {
    return "Sanity refused SANITY_API_WRITE_TOKEN (expired or deleted). Make a new Editor token at sanity.io/manage (project g4yp3p0k, API, Tokens), replace it in Vercel (Production) and redeploy."
  }
  if ((status === 403 && bufferStatus === undefined) || /Insufficient permissions|permission "(create|update)"/i.test(message)) {
    return "Sanity let SANITY_API_WRITE_TOKEN read but not write: it needs the Editor role. Make an Editor token at sanity.io/manage (project g4yp3p0k, API, Tokens), replace it in Vercel (Production) and redeploy."
  }

  if (/Not configured|is not set/.test(message)) {
    const names = [...new Set(message.match(/\b[A-Z][A-Z0-9_]*_(?:KEY|TOKEN|SECRET|NOTIFY)\b/g) ?? [])]
    const which = names.length ? `${names.join(" and ")} ${names.length > 1 ? "are" : "is"}` : "A key is"
    return `${which} missing in Vercel (Production). Add it and redeploy.`
  }
  // The Anthropic SDK's own words; Sanity's client says "timed out on request to".
  if (/Request timed out/.test(message)) {
    return "Claude took too long this time. Nothing to change: the next run tries again, or run it now from Vercel → square-one → Settings → Cron Jobs."
  }
  if (/ran out of room|returned no \w+ call|came back empty/i.test(message)) {
    return "Claude didn't finish the draft. Nothing to change: the next run tries again, or run it now from Vercel → square-one → Settings → Cron Jobs."
  }
  return `The error is above; the full record is in ${LOGS[job]}.`
}

/** The email when the blog run made no draft and someone has to act. */
export function blogFailureEmail(what: string, hint: string): { subject: string; text: string } {
  return {
    subject: "Blog drafter: no draft this time",
    text: [
      "This run of the blog drafter didn't make a draft. Nothing on squareonepaving.com has changed.",
      "",
      `What happened: ${what}`,
      "",
      `What to do: ${hint}`,
      "",
      "The Blog plan is as it was, so the next run (Tuesday or Thursday morning) tries the same item again.",
    ].join("\n"),
  }
}
