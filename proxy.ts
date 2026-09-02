import { NextResponse, type NextRequest } from "next/server"

/**
 * Archived AirMark / airport assets are still in the repo (binaries can only
 * be removed with a local `git rm`) but are not a Square One offering —
 * S1-BUILD-PROMPT §2.4a, "no airports, remove AirMark". Until the folders are
 * deleted, this guard keeps every one of those files unreachable.
 *
 * Nothing else on the site passes through here; the matcher is exact.
 */
export function proxy(_request: NextRequest) {
  return new NextResponse("Not found", { status: 404 })
}

export default proxy

export const config = {
  matcher: [
    "/docs/AirMark/:path*",
    "/images/applications/airports/:path*",
    "/images/products/airmark/:path*",
  ],
}
