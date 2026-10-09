import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { checkBotId } from "botid/server"
import { screenSubmission, redact } from "@/lib/form-screen"
import {
  FALLBACK,
  FROM_EMAIL,
  MAX_BODY_BYTES,
  SCREENED_TO_EMAIL,
  TO_EMAIL,
  alreadySent,
  buildEmailHtml,
  buildEmailText,
  gateWithoutProof,
  holdBeforeScreen,
  logOutcome,
  readPayload,
  replyToFor,
  subjectLine,
  type Hold,
} from "@/lib/contact"

/**
 * POST /api/contact, the quote form (components/contact/QuoteForm.tsx).
 *
 * 9 Oct 2026: the forms' spam fix (lib/form-screen.ts has the story, and
 * lib/contact.ts the rules). A real visitor's message is never refused or
 * dropped: doubtful mail goes to the screened inbox marked "[Screened]", and
 * the visitor sees "sent" either way. Only a request with no BotID proof that
 * wasn't posted from this site's own pages is turned away (a script).
 *
 * What stays from 21 Sept 2026: the route never fails silently. No mail key
 * in production answers 503, and a rejected send 502, both with the office's
 * lines; the form then shows them and a mailto carrying what was typed.
 */

/** BotID's answer normally takes milliseconds; past this, carry on without it. */
const BOTID_TIMEOUT_MS = 2500

/* Best-effort flood guard. Serverless keeps this per warm instance, so it is
   a speed bump, never a security control. Five sends per ten minutes is far
   above what a real enquirer needs; past it, mail is held, not refused. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function flooded(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // never let the map grow without bound
  return recent.length > MAX_PER_WINDOW
}

/**
 * BotID's view of the request. "human": checked and fine. "bot": checked and
 * doubted. "unchecked": the check failed or took too long, or the browser
 * could not run it and the form sent without it (lib/post-form.ts). "script":
 * no check and not sent from this site's pages at all.
 */
async function botGate(req: NextRequest): Promise<"human" | "bot" | "unchecked" | "script"> {
  if (!req.headers.has("x-is-human")) return gateWithoutProof(req.headers.get("origin"), req.headers.get("host"))
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    const verification = await Promise.race([
      checkBotId(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`no answer in ${BOTID_TIMEOUT_MS} ms`)), BOTID_TIMEOUT_MS)
      }),
    ])
    return verification.isBot ? "bot" : "human"
  } catch (err) {
    console.error("[contact] BotID check failed; screening instead:", err instanceof Error ? err.message : "unknown")
    return "unchecked"
  } finally {
    clearTimeout(timer)
  }
}

export async function POST(req: NextRequest) {
  try {
    if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
      logOutcome("unknown", "rejected", "-", "size", "body too large")
      return NextResponse.json({ error: `Sorry, we couldn't send that. ${FALLBACK}` }, { status: 413 })
    }

    // 1. Was it sent from this site in a browser? (instrumentation-client.ts
    //    adds BotID's proof to the form's request.) Only a request with no
    //    proof that didn't come from the site's own pages is refused.
    const gate = await botGate(req)
    if (gate === "script") {
      logOutcome("unknown", "blocked", gate)
      return NextResponse.json({ error: `Sorry, we couldn't send that. ${FALLBACK}` }, { status: 403 })
    }

    const text = await req.text().catch(() => "")
    if (text.length > MAX_BODY_BYTES) {
      logOutcome("unknown", "rejected", gate, "size", "body too large")
      return NextResponse.json({ error: `Sorry, we couldn't send that. ${FALLBACK}` }, { status: 413 })
    }
    let raw: unknown = null
    try {
      raw = JSON.parse(text)
    } catch {
      /* not JSON: readPayload says so */
    }
    const parsed = readPayload(raw)
    if ("error" in parsed) {
      logOutcome("unknown", "rejected", gate, "validation", parsed.code)
      return NextResponse.json({ error: parsed.error }, { status: 400 })
    }
    const body = parsed

    // 2. Who should read it? The office, unless something says otherwise;
    //    then the screened inbox, with the reason on top. Never nobody.
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    let hold: Hold | undefined = holdBeforeScreen(body, gate, flooded(ip))
    let decidedBy = hold?.by ?? ""
    if (!hold) {
      const verdict = await screenSubmission({
        name: body.name,
        company: body.company,
        email: body.email,
        projectType: body.projectType,
        hasPhone: Boolean(body.phone),
        hasLocation: Boolean(body.location),
        message: body.message,
      })
      decidedBy = verdict.by
      if (verdict.verdict === "spam") {
        hold = { by: verdict.by === "model" ? "Claude" : "the backup rules", reason: verdict.reason }
      }
    }
    const logBy = hold?.by ?? decidedBy
    const logReason = hold?.reason ?? ""

    if (!process.env.RESEND_API_KEY) {
      // Development: there is no key and none is expected. The log line
      // still shows the decision.
      if (process.env.NODE_ENV !== "production") {
        logOutcome(body.formType, hold ? "held-not-sent" : "delivered-not-sent", gate, logBy, logReason)
        return NextResponse.json({ success: true })
      }
      // Production: a missing key means the enquiry goes nowhere. Saying
      // "thank you" here loses the job silently, the one outcome worth
      // avoiding, so the visitor gets the phone lines and the mailto.
      logOutcome(body.formType, hold ? "held-undelivered" : "undelivered", gate, "config", "RESEND_API_KEY is not set in production")
      return NextResponse.json({ error: `Our contact form is offline for a moment. ${FALLBACK}` }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const replyTo = replyToFor(body.email)
    // One key per press of the send button: if the form sends again (its
    // first try was slow, or its answer was lost), Resend mails it once.
    const send = (to: string, key: string | undefined) =>
      resend.emails.send(
        {
          from: FROM_EMAIL,
          to: [to],
          ...(replyTo ? { replyTo } : {}),
          subject: subjectLine(body, hold),
          html: buildEmailHtml(body, hold),
          text: buildEmailText(body, hold),
        },
        key ? { idempotencyKey: key } : undefined,
      )
    const key = body.submissionId ? `quote-form/${body.submissionId}` : undefined

    let { error } = await send(hold ? SCREENED_TO_EMAIL : TO_EMAIL, key)
    if (error && !alreadySent(error) && hold && SCREENED_TO_EMAIL !== TO_EMAIL) {
      // The screened inbox refused it (a mistyped FORM_SCREENED_EMAIL, say):
      // the office gets it, still marked, rather than nobody. Its own key:
      // the first one is spent on the refused send.
      ;({ error } = await send(TO_EMAIL, key && `${key}/office`))
    }

    if (error && alreadySent(error)) {
      logOutcome(body.formType, "duplicate", gate, logBy, "already sent for this press of the button")
      return NextResponse.json({ success: true })
    }

    if (error) {
      // Never the enquiry itself in the log: the visitor has the phone lines
      // and a mailto carrying everything they typed.
      logOutcome(body.formType, "undelivered", gate, "resend", redact(`${error.name}: ${error.message}`))
      return NextResponse.json({ error: `We couldn't send that just now. ${FALLBACK}` }, { status: 502 })
    }

    // The visitor sees the same "sent" either way, so a spammer learns nothing.
    logOutcome(body.formType, hold ? "held" : "delivered", gate, logBy, logReason)
    return NextResponse.json({ success: true })
  } catch (err) {
    logOutcome("unknown", "error", "-", "exception", err instanceof Error ? redact(`${err.name}: ${err.message}`) : "unknown")
    return NextResponse.json({ error: `Something went wrong at our end. ${FALLBACK}` }, { status: 500 })
  }
}
