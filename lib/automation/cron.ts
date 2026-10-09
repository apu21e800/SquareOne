/**
 * The gate every automation route passes first. Vercel Cron calls the routes
 * with `Authorization: Bearer $CRON_SECRET` (vercel.json, production only).
 *
 * Fails closed. With no CRON_SECRET nobody gets in (401, and the reason goes
 * to the log only, not to whoever asked: security sweep, 9 Oct 2026); a call
 * without the secret gets 401. Past the gate, with Sanity not connected or a
 * key missing, a run answers with what is missing and does nothing.
 * AUTOMATION_PAUSED=1 stops both jobs without removing a key.
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

export function cronGate(req: NextRequest, tag: string, needs: string[]): NextResponse | null {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    console.log(`[${tag}] not switched on: CRON_SECRET is not set`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!authorized(req.headers.get("authorization"), secret)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let off: string | null = null
  if (/^(1|true|yes)$/i.test(process.env.AUTOMATION_PAUSED ?? "")) off = "paused: AUTOMATION_PAUSED is set"
  else if (!cmsEnabled) off = "not switched on: Sanity is not connected (NEXT_PUBLIC_SANITY_PROJECT_ID)"
  else {
    const missing = needs.filter((k) => !process.env[k])
    if (missing.length) off = `not switched on: ${missing.join(", ")} not set`
  }
  if (off) {
    console.log(`[${tag}] ${off}`)
    return NextResponse.json({ skipped: off })
  }
  return null
}
