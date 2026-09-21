import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "office@squareonepaving.com"

/** What the office can be reached on when the send itself fails. */
const FALLBACK = "Call 604-612-6209 (Lower Mainland) or 250-391-0270 (Vancouver Island), or email office@squareonepaving.com."

interface ContactPayload {
  formType: "contact"
  name?: string
  email?: string
  company?: string
  phone?: string
  projectType?: string
  location?: string
  message?: string
  website?: string // honeypot
}

/** Field ceilings — a quote request is not a file upload. */
const LIMITS: Record<string, number> = {
  name: 120, email: 200, company: 160, phone: 40, projectType: 80, location: 200, message: 4000,
}

/* Deliberately permissive: this rejects "nonsense", not unusual-but-valid
   addresses. A lead lost to an over-strict regex costs more than a bounce. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

/* Best-effort throttle. Serverless keeps this per warm instance, so it is a
   speed bump for the obvious flood, never a security control. Five requests
   per ten minutes is far above what a real enquirer needs. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // never let the map grow without bound
  return recent.length > MAX_PER_WINDOW
}

/** Everything a visitor typed is shown in the office's inbox as text, never as markup. */
function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c)
}

function buildEmailHtml(data: ContactPayload): string {
  const cell = (label: string, value: string, top = false) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#888;font-size:12px;white-space:nowrap${top ? ";vertical-align:top" : ""}"><strong>${label}</strong></td><td style="font-size:14px${top ? ";white-space:pre-wrap" : ""}">${esc(value)}</td></tr>`
  const rows = [
    data.name && cell("Name", data.name),
    data.email && cell("Email", data.email),
    data.company && cell("Company", data.company),
    data.phone && cell("Phone", data.phone),
    data.projectType && cell("Project", data.projectType),
    data.location && cell("Location", data.location),
    data.message && cell("Message", data.message, true),
  ].filter(Boolean).join("\n")

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
      <div style="height:3px;background:#C8601A;margin-bottom:28px"></div>
      <h2 style="margin:0 0 20px;color:#111;font-size:18px;font-weight:800;letter-spacing:-0.02em">
        New enquiry from squareonepaving.com
      </h2>
      <table style="width:100%;border-collapse:collapse;line-height:1.9">
        <tbody>${rows}</tbody>
      </table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
      <p style="font-size:11px;color:#aaa;margin:0">
        Submitted via squareonepaving.com &middot; ${new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" })} PT
      </p>
    </div>
  `
}

/** The same enquiry as plain text, for clients that will not render HTML. */
function buildEmailText(data: ContactPayload): string {
  return [
    "New enquiry from squareonepaving.com",
    "",
    data.name && `Name: ${data.name}`,
    data.email && `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    data.phone && `Phone: ${data.phone}`,
    data.projectType && `Project: ${data.projectType}`,
    data.location && `Location: ${data.location}`,
    data.message && `\n${data.message}`,
    "",
    `Submitted ${new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" })} PT`,
  ].filter(Boolean).join("\n")
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as ContactPayload | null
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "We couldn't read that request. Please try again." }, { status: 400 })
    }

    // Honeypot: a filled hidden field is a bot. Answer as though it worked.
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const email = (body.email ?? "").trim()
    if (!body.formType || !email) {
      return NextResponse.json({ error: "Please add an email address so we can reply." }, { status: 400 })
    }
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
      return NextResponse.json({ error: "That email address doesn't look right — please check it." }, { status: 400 })
    }

    // Trim and cap every field before it reaches the inbox.
    const clean: ContactPayload = { formType: "contact", email }
    for (const key of ["name", "company", "phone", "projectType", "location", "message"] as const) {
      const raw = body[key]
      if (typeof raw === "string" && raw.trim()) clean[key] = raw.trim().slice(0, LIMITS[key])
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: `That's a few requests in a short time. ${FALLBACK}` },
        { status: 429 },
      )
    }

    if (!process.env.RESEND_API_KEY) {
      // Development: there is no key and none is expected — log and move on.
      if (process.env.NODE_ENV !== "production") {
        console.log("[contact API] No RESEND_API_KEY (dev) — would send:", clean)
        return NextResponse.json({ success: true })
      }
      // Production: a missing key means the enquiry goes nowhere. Saying
      // "thank you" here loses the job silently, which is the one outcome
      // worth avoiding — so the visitor gets the phone and the mailto.
      console.error("[contact API] UNDELIVERED — RESEND_API_KEY is not set in production. The enquiry follows so it can be recovered from these logs:", JSON.stringify(clean))
      return NextResponse.json(
        { error: `Our contact form is offline for a moment. ${FALLBACK}` },
        { status: 503 },
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: "Square One <noreply@squareonepaving.com>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New enquiry — ${clean.name ?? "Unknown"}${clean.company ? ` @ ${clean.company}` : ""}${clean.projectType ? ` · ${clean.projectType}` : ""}`,
      html: buildEmailHtml(clean),
      text: buildEmailText(clean),
    })

    if (error) {
      // Log the enquiry itself, not just the reason it failed — a lead that
      // only exists in a rejected API call is a lead nobody can recover.
      console.error("[contact API] UNDELIVERED — Resend rejected the send:", error)
      console.error("[contact API] undelivered enquiry:", JSON.stringify(clean))
      return NextResponse.json({ error: `We couldn't send that just now. ${FALLBACK}` }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact API] UNDELIVERED — unexpected error:", err)
    return NextResponse.json({ error: `Something went wrong at our end. ${FALLBACK}` }, { status: 500 })
  }
}
