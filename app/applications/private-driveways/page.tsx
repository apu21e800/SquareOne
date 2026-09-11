import { redirect } from "next/navigation"

/**
 * Legacy route. next.config.ts already 301s /applications/private-driveways to
 * /driveways; this keeps the segment from ever rendering the retired page if
 * the redirect map is edited.
 */
export default function PrivateDrivewaysLegacy() {
  redirect("/driveways")
}
