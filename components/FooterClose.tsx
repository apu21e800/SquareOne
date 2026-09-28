"use client"

import { usePathname } from "next/navigation"

/* The footer's closing band ("Get a quote" → /contact) makes no sense on
   /contact itself: the page is the destination. The footer is a server
   component, so this small client wrapper is what knows the path.

   28 Sept 2026: three more pages end on a close of their own, written for
   their reader (the specifier's drawings, the vapour photo, the city's
   driveway), and two closes in a row read as a template. On those pages the
   footer's band steps aside. */
const OWN_CLOSE = ["/contact", "/specifiers", "/services/vapor-blasting"]

export default function FooterClose({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (OWN_CLOSE.includes(pathname) || pathname.startsWith("/driveways/")) return null
  return <>{children}</>
}
