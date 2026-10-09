/**
 * What the quote form's route (app/api/contact/route.ts) does with a
 * submission once it has one: read it, decide who should see it, and write
 * the email. Kept out of route.ts because a route file may only export its
 * handlers, and `npm run test:forms` tests all of this.
 *
 * The rule since 9 Oct 2026 (the forms' spam fix, lib/form-screen.ts): a real
 * visitor's message is never refused or dropped. Anything doubtful (a filled
 * honeypot, a browser Vercel BotID doubts, a flood from one connection, or
 * what the screen calls spam) goes to FORM_SCREENED_EMAIL instead of the
 * office, marked "[Screened]" with a banner saying why and its links
 * disabled, and the visitor sees "sent" either way. Until FORM_SCREENED_EMAIL
 * is set, held mail still goes to the office, marked "[Screened]", so the
 * worst case is a labelled message in the usual inbox, never a lost one.
 */

export const TO_EMAIL = process.env.CONTACT_EMAIL || "office@squareonepaving.com"

/** Where held-back mail goes. Unset, the office: marked, never lost. */
export const SCREENED_TO_EMAIL = process.env.FORM_SCREENED_EMAIL || TO_EMAIL

/* Who the enquiry is sent as. Resend will only send from a domain verified
   in the account; never edit the root's Google MX or SPF to get there
   (CLAUDE.md, Environment Variables). Configurable so a change of sender is
   an env change, not a deploy. */
export const FROM_EMAIL = process.env.CONTACT_FROM || "Square One <noreply@squareonepaving.com>"

/** What the office can be reached on when the send itself fails. */
export const FALLBACK =
  "Call 604-612-6209 (Lower Mainland) or 250-391-0270 (Vancouver Island), or email office@squareonepaving.com."

export interface ContactPayload {
  formType: "contact"
  name?: string
  email: string
  company?: string
  phone?: string
  projectType?: string
  location?: string
  message?: string
  /** The honeypot: an off-screen field no person sees, so no person fills it. */
  website?: string
  /** One per press of the send button (QuoteForm), so a retried send is mailed once. */
  submissionId?: string
}

/** Field ceilings, as the form sets them. Longer is trimmed, never refused: a long phone line is still a lead. */
export const MAX_LEN = {
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  projectType: 80,
  location: 200,
  message: 4000,
  website: 400,
} as const
type Field = keyof typeof MAX_LEN

/** A real enquiry is a few kilobytes; this only stops a script posting megabytes. */
export const MAX_BODY_BYTES = 64_000

/**
 * Only known fields, only strings, trimmed to their real lengths. The form
 * sends strings only and requires an email; anything else is a script.
 * The email check is what the browser's own check lets through
 * ("jane@gmail" included): the form already refused anything less, and a
 * near-miss address with the message attached is still a lead.
 */
export function readPayload(raw: unknown): ContactPayload | { error: string; code: string } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { error: "We couldn't read that request. Please try again.", code: "not-json" }
  }
  const src = raw as Record<string, unknown>
  if (src.formType !== "contact") return { error: "We couldn't read that request. Please try again.", code: "form-type" }
  const out: Partial<Record<Field, string>> = {}
  for (const key of Object.keys(MAX_LEN) as Field[]) {
    const v = src[key]
    if (v === undefined || v === null || v === "") continue
    if (typeof v !== "string") return { error: "We couldn't read that request. Please try again.", code: `not-a-string:${key}` }
    const t = v.trim()
    if (t) out[key] = t.slice(0, MAX_LEN[key])
  }
  if (!out.email || !/^[^\s@]+@[^\s@]+$/.test(out.email)) {
    return { error: "Please add an email address so we can reply.", code: "email" }
  }
  // "jane@shaw" passes the browser's check but can't be answered. With a
  // phone number the office can still call, so it goes through; without
  // one, the visitor is asked to look again (the route did this before 9 Oct
  // 2026 too) rather than told "sent" for an enquiry nobody can answer.
  if (!replyToFor(out.email) && !out.phone) {
    return { error: "That email address doesn't look right. Please check it, or add a phone number.", code: "email-unreachable" }
  }
  const id = src.submissionId
  const submissionId = typeof id === "string" && /^[A-Za-z0-9-]{8,64}$/.test(id) ? id : undefined
  return { ...out, email: out.email, formType: "contact", ...(submissionId ? { submissionId } : {}) }
}

/**
 * Resend's answer when a send with this submission's key was already made
 * (or is being made): the office has it, so the visitor is told "sent". The
 * form can send twice when its first try is slow or its answer is lost (a
 * phone switching apps): lib/post-form.ts sends again, with the same key.
 */
export function alreadySent(error: { name?: string } | null | undefined): boolean {
  return error?.name === "invalid_idempotent_request" || error?.name === "concurrent_idempotent_requests"
}

/** Why a message went to the screened inbox instead of the office. */
export type Hold = { by: string; reason: string }

/** Everything a visitor typed is shown in the office's inbox as text, never as markup. */
export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c)
}

/**
 * In screened mail, links can't be clicked by accident: any word that looks
 * like a web or email address gets "hxxp" for "http" and "[.]" for its dots.
 * One word at a time, so a hostile message can't make it slow.
 */
export function defang(v: string): string {
  return v.replace(/\S+/g, (word) =>
    /^(?:https?:\/\/|www\.)|\/|@|\.[a-z]{2,24}$/i.test(word) && /[a-z0-9-]\.[a-z]/i.test(word)
      ? word.replace(/^http/i, "hxxp").replace(/\./g, "[.]")
      : word,
  )
}

const stamp = () => new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" })

/** The subject the office's inbox has always shown, "[Screened] " first when held. One line, always. */
export function subjectLine(data: ContactPayload, hold?: Hold): string {
  const show = (v: string) => (hold ? defang(v) : v).replace(/[\r\n]+/g, " ")
  const who = `${show(data.name ?? "Unknown")}${data.company ? ` @ ${show(data.company)}` : ""}`
  return `${hold ? "[Screened] " : ""}New enquiry — ${who}${data.projectType ? ` · ${show(data.projectType)}` : ""}`
}

/**
 * The banner's first and last lines. Until FORM_SCREENED_EMAIL is set, held
 * mail lands in the office's own inbox, where "forward it to the office"
 * would make no sense, so the words follow where the mail actually goes.
 */
function holdNotice(hold?: Hold): [string, string] {
  if (!hold) return ["", ""]
  return SCREENED_TO_EMAIL === TO_EMAIL
    ? ["Possible spam, marked by the website.", "If this is a real enquiry, answer it as usual. Links in it are disabled; don't retype them."]
    : [`Held back from ${TO_EMAIL}.`, `If this is a real enquiry, forward it to ${TO_EMAIL}. Links in it are disabled; don't retype them.`]
}

export function buildEmailHtml(data: ContactPayload, hold?: Hold): string {
  // Held-back mail has its links defanged; the office's mail is exactly as typed.
  const show = (v: string) => esc(hold ? defang(v) : v)
  const cell = (label: string, value: string, top = false) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#888;font-size:12px;white-space:nowrap${top ? ";vertical-align:top" : ""}"><strong>${label}</strong></td><td style="font-size:14px${top ? ";white-space:pre-wrap" : ""}">${show(value)}</td></tr>`
  const rows = [
    data.name && cell("Name", data.name),
    data.email && cell("Email", data.email),
    data.company && cell("Company", data.company),
    data.phone && cell("Phone", data.phone),
    data.projectType && cell("Project", data.projectType),
    data.location && cell("Location", data.location),
    data.message && cell("Message", data.message, true),
    hold && data.website && cell("Hidden field", data.website, true),
  ].filter(Boolean).join("\n")

  // Held-back mail says so first, and why, so a wrong call is easy to spot
  // and forward.
  const [first, last] = holdNotice(hold)
  const banner = hold
    ? `<div style="background:#fff7ed;border:1px solid #fdba74;padding:12px 14px;margin:0 0 20px;font-size:13px;line-height:1.6;color:#7c2d12">
        <strong>${esc(first)}</strong><br>
        Why (${esc(hold.by)}): ${esc(hold.reason || "no reason given")}.<br>
        ${esc(last)}
      </div>`
    : ""

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
      <div style="height:3px;background:#C8601A;margin-bottom:28px"></div>
      ${banner}
      <h2 style="margin:0 0 20px;color:#111;font-size:18px;font-weight:800;letter-spacing:-0.02em">
        New enquiry from squareonepaving.com
      </h2>
      <table style="width:100%;border-collapse:collapse;line-height:1.9">
        <tbody>${rows}</tbody>
      </table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
      <p style="font-size:11px;color:#aaa;margin:0">
        Submitted via squareonepaving.com &middot; ${stamp()} PT
      </p>
    </div>
  `
}

/** The same enquiry as plain text, for clients that will not render HTML.
    Line for line what the office has had since 21 Sept 2026 when delivered. */
export function buildEmailText(data: ContactPayload, hold?: Hold): string {
  const show = (v: string) => (hold ? defang(v) : v)
  return [
    hold && `${holdNotice(hold)[0]} Why (${hold.by}): ${hold.reason || "no reason given"}.\n${holdNotice(hold)[1]}\n`,
    "New enquiry from squareonepaving.com",
    data.name && `Name: ${show(data.name)}`,
    data.email && `Email: ${show(data.email)}`,
    data.company && `Company: ${show(data.company)}`,
    data.phone && `Phone: ${show(data.phone)}`,
    data.projectType && `Project: ${show(data.projectType)}`,
    data.location && `Location: ${show(data.location)}`,
    data.message && `\n${show(data.message)}`,
    hold && data.website && `\nHidden field: ${show(data.website)}`,
    `Submitted ${stamp()} PT`,
  ].filter(Boolean).join("\n")
}

/** A reply-to the mail service would refuse ("jane@gmail") would cost the whole message; the address is in the body either way. */
export function replyToFor(email: string): string | undefined {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email) ? email : undefined
}

/**
 * BotID's view of a request that carries no proof (no x-is-human header):
 * "unchecked" when it was posted from this site's own pages (the browser
 * couldn't run the check: a content blocker, a strict office network; see
 * lib/post-form.ts), "script" when it wasn't. A browser always sends Origin
 * on a POST; scripts usually don't bother.
 */
export function gateWithoutProof(origin: string | null, host: string | null): "unchecked" | "script" {
  if (!origin || !host) return "script"
  try {
    return new URL(origin).host === host ? "unchecked" : "script"
  } catch {
    return "script"
  }
}

/**
 * Who should read it. The office, unless something says otherwise; then the
 * screened inbox, with the reason on top. Never nobody. The order matters:
 * the cheap, certain signs first, and the screen (a model call) only for what
 * is left.
 */
export function holdBeforeScreen(
  data: ContactPayload,
  gate: "human" | "bot" | "unchecked",
  flooded: boolean,
): Hold | undefined {
  if (data.website) return { by: "honeypot", reason: "the hidden field only bots fill was filled in" }
  if (gate === "bot") return { by: "Vercel BotID", reason: "the bot check doubted this browser" }
  if (flooded) return { by: "rate", reason: "more than five sends from one connection in ten minutes" }
  return undefined
}

/** One line per request, no names, addresses or messages: what happened and why. */
export function logOutcome(form: string, outcome: string, gate: string, by = "", reason = "") {
  console.info(`[contact] ${JSON.stringify({ form, outcome, gate, by, reason: reason.slice(0, 160) })}`)
}
