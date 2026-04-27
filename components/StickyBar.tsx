"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <div
        className="flex items-center gap-3 px-4 lg:px-8 py-3"
        style={{
          background: "#111111",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        }}
      >
        {/* Brand caption — desktop only */}
        <p className="hidden lg:block flex-1 text-[10px] uppercase tracking-[0.22em] font-semibold text-white/30">
          BC’s Decorative Pavement Specialists · Since 2000
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto">
          {/* Ghost — Spec Sheet */}
          <Link
            href="/contact"
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 border border-white/20 text-white px-5 py-2.5 text-[12px] font-bold tracking-[0.04em] hover:border-white/50 hover:bg-white/[0.06] transition-all whitespace-nowrap rounded-lg"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
              <path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Request Spec Sheet
          </Link>

          {/* Orange filled — Book a Site Visit */}
          <Link
            href="/contact"
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-[#C8601A] text-white px-5 py-2.5 text-[12px] font-bold tracking-[0.04em] hover:bg-[#A84F15] transition-colors whitespace-nowrap rounded-lg"
            style={{ boxShadow: "0 2px 14px rgba(200,96,26,0.35)" }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Book a Site Visit
          </Link>
        </div>
      </div>
    </div>
  )
}
