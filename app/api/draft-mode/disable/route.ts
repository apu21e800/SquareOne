import { draftMode } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { safeReturnPath } from "@/lib/preview"

/**
 * "Exit preview": turns draft mode off in this browser and goes back to the
 * page the editor was on (?to=/about); only ever a path on this site
 * (lib/preview.ts).
 */
export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()
  const res = NextResponse.redirect(new URL(safeReturnPath(request.nextUrl.searchParams.get("to")), request.nextUrl.origin))
  res.headers.set("cache-control", "no-store")
  return res
}
