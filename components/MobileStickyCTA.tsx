"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Mobile-only sticky bottom CTA bar.
 * Appears after scrolling past the hero; never on /contact (the page is the
 * destination, and a second CTA there is noise).
 *
 * v2: flat slate bar, hairline top rule, 2px geometry, one accent action.
 * Deliberately compact — the single dark *close* on every page is the footer,
 * so this bar must never read as a section of its own.
 *
 * 21 Sept 2026 (Vern: "some of the request a quote buttons are not working
 * on mobile"). Two bugs, one cause. The path was read once from
 * `window.location` inside a mount effect, and this component lives in the
 * root layout — so a client-side navigation to /contact never re-ran it. The
 * bar stayed mounted on the contact page, slid up as soon as the visitor
 * scrolled toward the form, and then sat on top of the form's submit button:
 * on a phone, "Send the request" was a dead tap and "Request a quote" in the
 * bar went to the page you were already on. `usePathname` makes the route
 * reactive, and the bar now reserves its own height at the foot of the
 * document so it can never cover the last band of any page.
 */
export default function MobileStickyCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  const hidden = pathname === "/contact"

  useEffect(() => {
    if (hidden) {
      setVisible(false)
      return
    }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [hidden, pathname])

  if (hidden) return null

  return (
    <>
      {/* Spacer, phone only — the bar floats over the document, so the foot of
          every page gets its height back or the last 54px (the footer's legal
          row, a form's submit button) sits under it and cannot be tapped. It
          carries the footer's slate so it reads as the footer, not a seam. */}
      <div
        aria-hidden="true"
        className="h-[54px] bg-[color:var(--surface-slate)] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      />

      <div
        aria-hidden={!visible}
        className={`fixed inset-x-0 bottom-0 z-40 border-t bg-[color:var(--surface-slate)] transition-transform duration-300 lg:hidden ${
          visible ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
        style={{
          borderColor: "var(--hairline-slate)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="grid grid-cols-2">
          <a
            href="tel:+16046126209"
            tabIndex={visible ? undefined : -1}
            className="flex items-center justify-center gap-2 border-r py-[15px] text-[14px] font-semibold text-white active:bg-white/[0.06]"
            style={{ borderColor: "var(--hairline-slate)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="flex-shrink-0"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Call us
          </a>

          <Link
            href="/contact"
            tabIndex={visible ? undefined : -1}
            className="flex items-center justify-center bg-[color:var(--accent-deep)] py-[16px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white active:bg-[#B03D15]"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </>
  )
}
