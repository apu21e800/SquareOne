/**
 * The gate every automation route passes first. Vercel Cron calls the routes
 * with `Authorization: Bearer $CRON_SECRET` (vercel.json, production only).
 *
 * Fails closed. With no CRON_SECRET nobody gets in (401, and the reason goes
 * to the log only, not to whoever asked: security sweep, 9 Oct 2026); a call
 * without the secret gets 401. Past the gate, with Sanity not connected or a
 * key missing, a run answers with what is missing and does nothing.
 * AUTOMATION_PAUSED=1 stops both jobs without removing a key.
 *
 * Two halves since 14 Oct 2026, so the blog route can tell the editor which
 * key is missing (lib/automation/blog.ts notifyNotConfigured) once the caller
 * is known to be Vercel, and never on a stranger's call.
 */
import { timingSafeEqual } from "node:crypto"
import { NextResponse, type NextRequest } from "next/server"
import { cmsEnabled } from "@/sanity/env"

/** The header compared in constant time, so its length is all a wrong guess learns. */
function authorized(header: string | null, secret: string): boolean {
  const got = Buffer.from(header ?? "")
  const want = Buffer.from(`Bearer ${secret}`)
  return got.length === want.length && timingSafeEqual(got, want)
}

/** The first half: 401 unless the call carries CRON_SECRET; null when it does. */
export function cronAuth(req: NextRequest, tag: string): NextResponse | null {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    console.log(`[${tag}] not switched on: CRON_SECRET is not set`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!authorized(req.headers.get("authorization"), secret)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return null
}

/** Why an authorised run can't go ahead (paused, no Sanity, keys missing), or null when it can. */
export function cronReady(tag: string, needs: string[]): { reason: string; missing: string[] } | null {
  let off: { reason: string; missing: string[] } | null = null
  if (/^(1|true|yes)$/i.test(process.env.AUTOMATION_PAUSED ?? "")) off = { reason: "paused: AUTOMATION_PAUSED is set", missing: [] }
  else if (!cmsEnabled) off = { reason: "not switched on: Sanity is not connected (NEXT_PUBLIC_SANITY_PROJECT_ID)", missing: [] }
  else {
    const missing = needs.filter((k) => !process.env[k])
    if (missing.length) off = { reason: `not switched on: ${missing.join(", ")} not set`, missing }
  }
  if (off) console.log(`[${tag}] ${off.reason}`)
  return off
}

/** Both halves at once, for a route that has nobody to tell (the social drafts). */
export function cronGate(req: NextRequest, tag: string, needs: string[]): NextResponse | null {
  const denied = cronAuth(req, tag)
  if (denied) return denied
  const off = cronReady(tag, needs)
  return off ? NextResponse.json({ skipped: off.reason }) : null
}
