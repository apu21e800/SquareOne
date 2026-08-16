"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Mobile-only sticky bottom CTA bar.
 * Appears after scrolling past hero, hides on contact page (no double-CTA).
 *
 * v2: flat slate bar, hairline top rule, 2px geometry, one accent action.
 * Deliberately compact — the single dark *close* on every page is the footer,
 * so this bar must never read as a section of its own.
 */
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname
      if (path === "/contact") setHidden(true)
    }

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (hidden) return null

  return (
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
          className="flex items-center justify-center bg-[color:var(--accent)] py-[15px] text-[14px] font-semibold text-white active:bg-[color:var(--accent-deep)]"
        >
          Request a quote
        </Link>
      </div>
    </div>
  )
}
