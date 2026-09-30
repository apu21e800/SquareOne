/**
 * The gate every automation route passes first. Vercel Cron calls the routes
 * with `Authorization: Bearer $CRON_SECRET` (vercel.json, production only).
 *
 * Switched off until it is set up: with no CRON_SECRET, with Sanity not
 * connected, or with a key missing, a run answers 200 with what is missing
 * and does nothing, so the daily cron stays quiet in the logs until Vern
 * turns it on. AUTOMATION_PAUSED=1 stops both jobs without removing a key.
 */
import { NextResponse, type NextRequest } from "next/server"
import { cmsEnabled } from "@/sanity/env"

export function cronGate(req: NextRequest, tag: string, needs: string[]): NextResponse | null {
  const secret = process.env.CRON_SECRET
  if (!secret) return NextResponse.json({ skipped: "not switched on: CRON_SECRET is not set" })
  if (req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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
