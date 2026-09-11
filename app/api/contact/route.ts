import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "office@squareonepaving.com"

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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload

    // Honeypot
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    if (!body.email || !body.formType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("[contact API] No RESEND_API_KEY — would send:", body)
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: "Square One <noreply@squareonepaving.com>",
      to: [TO_EMAIL],
      replyTo: body.email,
      subject: `New enquiry — ${body.name ?? "Unknown"}${body.company ? ` @ ${body.company}` : ""}${body.projectType ? ` · ${body.projectType}` : ""}`,
      html: buildEmailHtml(body),
    })

    if (error) {
      console.error("[contact API] Resend error:", error)
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact API] Unexpected error:", err)
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
  }
}
