"use client"

import { useEffect, useState } from "react"
import { TYPEFACES, LIVE_TYPEFACE, isTypefaceId, type TypefaceId } from "@/lib/typefaces"

/**
 * The typeface switch.
 *
 * A client cannot choose a display face from a name or a specimen sheet —
 * they choose it from their own site, with their own words and their own
 * photographs in it. So this runs the real pages in each candidate and lets
 * them flip between them, and it is the pattern to reuse on the next brand
 * that needs the same decision made.
 *
 * Second round, 19 Sept 2026: the options are SETTINGS of Futura — case,
 * weight, tracking and the reading text beside it — not faces (see
 * lib/typefaces.ts). Each is a complete system, and the footer says so.
 *
 * Where it shows: preview deployments, development and localhost. The root
 * layout does not render it on production at all, and the boot script that
 * honours ?type= is not emitted there either, so the live site ships one
 * setting and a shared link cannot leave a visitor stuck on an alternate.
 * The choice persists per browser in localStorage and the boot script
 * applies it before paint, so a page never flashes from one setting to
 * another.
 *
 * Adding a setting: one entry in lib/typefaces.ts, one block in
 * app/refine.css, a loader in app/layout.tsx only if it brings a new font.
 * This file never changes.
 *
 * Retire the whole mechanism — this file, the html[data-type] blocks and
 * the serif loader — once the client has signed off on a setting.
 */
export default function TypeToggle() {
  const [choice, setChoice] = useState<TypefaceId>(LIVE_TYPEFACE)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("type")
      const saved = window.localStorage.getItem("s1-type")
      const candidate = fromUrl ?? saved
      setChoice(isTypefaceId(candidate) ? candidate : LIVE_TYPEFACE)

      const previewHost =
        process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
        process.env.NODE_ENV === "development" ||
        window.location.hostname === "localhost"
      const production = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      const dismissed = window.localStorage.getItem("s1-type-ui") === "off"
      setVisible(!production && (previewHost || fromUrl !== null) && !dismissed)
    } catch {
      /* storage unavailable — the switch simply stays hidden */
    }
  }, [])

  const apply = (next: TypefaceId) => {
    setChoice(next)
    try {
      window.localStorage.setItem("s1-type", next)
    } catch {
      /* ignore */
    }
    if (next === LIVE_TYPEFACE) document.documentElement.removeAttribute("data-type")
    else document.documentElement.setAttribute("data-type", next)
  }

  const dismiss = () => {
    setVisible(false)
    try {
      window.localStorage.setItem("s1-type-ui", "off")
    } catch {
      /* ignore */
    }
  }

  if (!visible) return null

  const current = TYPEFACES.find((t) => t.id === choice) ?? TYPEFACES[0]

  return (
    <div
      role="group"
      aria-label="Type setting"
      className="fixed bottom-4 left-4 z-[150] w-[min(420px,calc(100vw-2rem))] rounded-[6px] bg-[#1E1B18]/95 p-3 shadow-[0_10px_34px_rgba(24,21,18,0.42)] backdrop-blur max-[700px]:bottom-[76px]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#968F86]">
          Type setting
        </span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hide the type switch"
          className="-mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3px] text-[#968F86] transition-colors hover:text-white"
        >
          <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {TYPEFACES.map((face) => {
          const on = face.id === choice
          return (
            <button
              key={face.id}
              type="button"
              onClick={() => apply(face.id)}
              aria-pressed={on}
              title={face.note}
              style={{ fontFamily: face.preview, ...face.previewStyle }}
              className={`h-8 cursor-pointer rounded-[3px] px-[11px] text-[13px] transition-colors ${
                on ? "bg-white text-[#1E1B18]" : "text-[#D6D0C7] hover:bg-white/10 hover:text-white"
              }`}
            >
              {face.label}
            </button>
          )
        })}
      </div>

      <p className="mt-[10px] flex items-baseline gap-2 text-[11.5px] leading-[1.45] text-[#A8A198]">
        <span
          className={`shrink-0 rounded-[2px] px-[5px] py-[1px] text-[9.5px] font-semibold uppercase tracking-[0.1em] ${
            current.licence === "Licensed"
              ? "bg-[color:var(--accent)] text-white"
              : "bg-white/12 text-[#D6D0C7]"
          }`}
        >
          {current.licence}
        </span>
        <span>{current.note}</span>
      </p>

      <p className="mt-2 border-t border-white/10 pt-2 text-[10.5px] leading-[1.45] text-[#8F877E]">
        Four settings of Futura &mdash; case, weight, spacing and the reading text beside
        it &mdash; on the real pages. Your choice follows you around the site.
      </p>
    </div>
  )
}
