"use client"

import { useEffect } from "react"
import { gaEvent } from "@/lib/gtag"

/**
 * The taps that are an enquiry in all but name (14 Oct 2026, after
 * hubss.com's): a phone number, the email address, and a link into the
 * quote page from anywhere else on the site, with the page it came from and
 * the link's words. The quote form reports its own "generate_lead" once a
 * request is sent (components/contact/QuoteForm.tsx). Nothing a visitor
 * typed is ever sent; the numbers and the address are Square One's own.
 */
const LEAD_PATHS = ["/contact"]

function sameSitePath(href: string): string | null {
  try {
    const url = new URL(href, window.location.href)
    return url.origin === window.location.origin ? url.pathname : null
  } catch {
    return null
  }
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href") ?? ""
      const from = window.location.pathname
      if (href.startsWith("tel:")) {
        gaEvent("phone_click", { phone_number: href.slice(4), from })
      } else if (href.startsWith("mailto:")) {
        gaEvent("email_click", { email_address: href.slice(7).split("?")[0], from })
      } else {
        const to = sameSitePath(href)
        if (!to || to === from || !LEAD_PATHS.some((p) => to === p || to.startsWith(`${p}/`))) return
        gaEvent("cta_click", { cta_from: from, cta_to: to, cta_text: (anchor.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80) })
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}
