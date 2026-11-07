/**
 * At most one email a day about the same failure (6 Nov 2026).
 *
 * Until 6 Nov the daily run ran once a day, so a failure that kept happening
 * (an expired key, a channel Buffer refuses, a scheduled post it can't
 * publish) emailed the editors once a day. Since then it runs every 15
 * minutes (vercel.json; Vern: "let's get the social drafts to arrive right
 * away after a published blog post"), so the same failure would email them
 * up to 96 times a day. Each failure email now asks here first, by a key
 * naming what failed ("social-run", "social-item:<key>", "publish:<id>"):
 * the first goes at once, then at most one a day while the same thing keeps
 * failing. The last send is kept in a `mailCap-<key>` document (the
 * automation's own record, like socialRetry; the Studio doesn't list it).
 *
 * When that record can't be read or written (the failure may be Sanity
 * itself, or a missing write token), only the run in the first quarter hour
 * of 14:00 UTC (7 a.m. Vancouver) sends: worst case, one a day, never 96.
 * A success never asks: those emails are one per thing done.
 */
import type { Store } from "@/lib/automation/services"

/** Hours before the same failure is emailed again: a day, less slack for a run that starts a little early. */
export const MAIL_AGAIN_AFTER_HOURS = 23

/** The morning run's hour, UTC (7 a.m. in Vancouver all year since 1 November 2026). */
export const MORNING_HOUR_UTC = 14

/** Sanity ids allow letters, digits, dots, dashes and underscores. */
export const mailCapId = (key: string) => `mailCap-${key.replace(/[^a-zA-Z0-9._-]/g, "-")}`

/** The first run of the morning hour: what decides when the record can't be used. */
export function morningSlot(now: Date): boolean {
  return now.getUTCHours() === MORNING_HOUR_UTC && now.getUTCMinutes() < 15
}

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

/**
 * A failure's words without what changes on every try of the same failure:
 * Anthropic's request id, Sanity's trace id, ids and a wait in seconds. Seen
 * in review, 6 Nov 2026: `401 {"type":"error",...,"request_id":"req_..."}`
 * differs on every call, so compared as it is, every run looked like news.
 */
export function failureText(text: string): string {
  return text
    .replace(/,?\s*"request_id"\s*:\s*"[^"]*"/gi, "")
    .replace(/\s*\(traceId:[^)]*\)/gi, "")
    .replace(/\breq_[A-Za-z0-9]+/g, "")
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "")
    .replace(/\b(?=[0-9a-f]*\d)[0-9a-f]{16,}\b/gi, "")
    .replace(/\b\d+(?:\.\d+)?\s*(?:ms|s|secs?|seconds?|minutes?)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120)
}

/** However its failures vary, no more than this many emails about one key in a day. */
export const MAX_EMAILS_PER_DAY = 3

/**
 * Whether this run may send the failure email named by `key`, and if so the
 * send is recorded now (before the email goes, so two overlapping runs can't
 * both decide to send). `about` is what failed: a failure not emailed in the
 * last day is news and goes at once (the key fixed, then another one
 * missing); the same failure waits a day; and whatever happens, a key sends
 * at most MAX_EMAILS_PER_DAY a day (two failures taking turns can't flood
 * the inbox). Never throws.
 */
export async function mayEmailFailure(store: Pick<Store, "fetch" | "createOrReplace">, key: string, now: Date, about = ""): Promise<boolean> {
  const id = mailCapId(key)
  const what = failureText(about)
  const dayAgo = now.getTime() - MAIL_AGAIN_AFTER_HOURS * 3_600_000
  try {
    const last = await store.fetch<{ sends?: { about?: string; at?: string }[] } | null>(`*[_id == $id][0]{ sends }`, { id })
    const recent = (last?.sends ?? []).filter((x) => {
      const t = x.at ? Date.parse(x.at) : Number.NaN
      return Number.isFinite(t) && t > dayAgo
    })
    if (recent.some((x) => (x.about ?? "") === what) || recent.length >= MAX_EMAILS_PER_DAY) return false
    const sends = [...recent.map((x, i) => ({ _key: `s${i}`, about: x.about ?? "", at: x.at })), { _key: `s${recent.length}`, about: what, at: now.toISOString() }]
    await store.createOrReplace({ _id: id, _type: "mailCap", key, sends })
    return true
  } catch (err) {
    const send = morningSlot(now)
    console.error(`[automation] couldn't use ${id} (${errorText(err)}); ${send ? "sending with the morning run" : "holding until the morning run"}`)
    return send
  }
}
