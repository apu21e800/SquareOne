"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Mobile-only sticky bottom CTA bar.
 * Appears after scrolling past hero, hides on contact page (no double-CTA).
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
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A] border-t border-white/10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-0">
        <a
          href="tel:+16043098212"
          className="flex items-center justify-center gap-2 py-4 text-white text-[12px] font-semibold tracking-[0.06em] uppercase border-r border-white/10 active:bg-white/5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Call Us
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 py-4 bg-[#F26430] text-white text-[12px] font-semibold tracking-[0.06em] uppercase active:bg-[#D85016]"
        >
          Get a Quote
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
