"use client"

import { usePathname } from "next/navigation"

/* The footer's closing CTA ("Request a quote" → /contact) makes no sense on
   /contact itself — the page is the destination. The footer is a server
   component, so this small client wrapper is what knows the path. */
export default function FooterClose({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === "/contact") return null
  return <>{children}</>
}
