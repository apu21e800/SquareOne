"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Persistent conversion bar, revealed once the reader is past the fold.
 *
 * v2: flat slate, hairline top rule, 2px radius, no glow and no drop shadow.
 * Height is deliberately bar-sized rather than section-sized — the one dark
 * close on every page is the footer, and this must not compete with it.
 */
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
        className="flex items-center gap-4 border-t bg-[color:var(--surface-slate)] px-6 py-[14px] min-[701px]:px-10"
        style={{ borderColor: "var(--hairline-slate)" }}
      >
        {/* Brand caption — desktop only. .label, not .eyebrow: the orange
            square belongs to the page, not to persistent chrome. */}
        <p className="label label-on-slate hidden flex-1 lg:block">
          BC&rsquo;s Decorative Pavement Specialists &middot; Since 2000
        </p>

        <div className="flex w-full items-center gap-3 lg:w-auto">
          <Link
            href="/contact"
            tabIndex={visible ? undefined : -1}
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-[2px] border border-white/20 px-5 py-[10px] text-[14px] font-semibold text-white transition-colors hover:border-white/50 hover:text-white lg:flex-none"
          >
            Request a spec sheet
          </Link>

          <Link
            href="/contact"
            tabIndex={visible ? undefined : -1}
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-[2px] bg-[color:var(--accent)] px-5 py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-[color:var(--accent-deep)] hover:text-white lg:flex-none"
          >
            Book a site visit
          </Link>
        </div>
      </div>
    </div>
  )
}
