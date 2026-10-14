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

/** Sanity refused a create because the id is taken: another run, or the same plan item twice. */
export function isConflict(err: unknown): boolean {
  return statusOf(err) === 409 || /already exists/i.test(err instanceof Error ? err.message : String(err))
}

/** What to do about a failed run, for the email. */
export function failureHint(err: unknown, job: Job = "blog"): string {
  const message = err instanceof Error ? err.message : String(err)
  const status = statusOf(err)
  // Buffer first: its client puts "Buffer" in every message it throws.
  if (/Buffer API 40[13]\b|\((UNAUTHENTICATED|UNAUTHORIZED|FORBIDDEN)\)/.test(message)) {
    return "Buffer refused the API key: it has expired (a key lasts a year at most) or was deleted. Make a new one in Square One's Buffer at publish.buffer.com/settings/api (choose 1 year), replace BUFFER_API_KEY in Vercel (Production) and redeploy."
  }
  if (message.startsWith(NO_CHANNELS)) return "Connect Square One's channels in its Buffer account: the Facebook page and Instagram (and Google Business Profile on Essentials)."
  if (/disconnected in Buffer/.test(message)) return "Reconnect the channel in Square One's Buffer; the next daily run drafts into it."
  if (/locked by Buffer/.test(message)) return "Buffer has more channels connected than the plan allows: remove one in Buffer or move to the plan that covers them."
  if (/Buffer.*rate limit|Buffer API 429/i.test(message)) return "Buffer's request limit was reached. Nothing to do: the next daily run tries again."
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

  // Sanity.
  if (status === 401 || /Session not found|Unauthorized/i.test(message)) {
    return "Sanity refused SANITY_API_WRITE_TOKEN (expired or deleted). Make a new Editor token at sanity.io/manage (project g4yp3p0k, API, Tokens), replace it in Vercel (Production) and redeploy."
  }
  if (status === 403 || /Insufficient permissions|permission "(create|update)"/i.test(message)) {
    return "Sanity let SANITY_API_WRITE_TOKEN read but not write: it needs the Editor role. Make an Editor token at sanity.io/manage (project g4yp3p0k, API, Tokens), replace it in Vercel (Production) and redeploy."
  }

  if (/Not configured|is not set/.test(message)) {
    const names = [...new Set(message.match(/\b[A-Z][A-Z0-9_]*_(?:KEY|TOKEN|SECRET|NOTIFY)\b/g) ?? [])]
    const which = names.length ? `${names.join(" and ")} ${names.length > 1 ? "are" : "is"}` : "A key is"
    return `${which} missing in Vercel (Production). Add it and redeploy.`
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
