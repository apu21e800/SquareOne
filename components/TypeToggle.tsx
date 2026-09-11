"use client"

import { useEffect, useState } from "react"

type TypeChoice = "poppins" | "futura"

/**
 * The type switch — Poppins (the live face) against the Futura option
 * (Jost display, Inter text), on the real pages, for Vern and the client to
 * compare. It shows on preview deployments and in development, and on any
 * deployment reached with ?type= in the URL; production visitors never see
 * it unless they were sent a ?type= link. Choice persists per browser in
 * localStorage; the root layout's boot script applies it before paint.
 * Retire this file, the two font loaders in app/layout.tsx and the
 * html[data-type] block in app/refine.css once the choice is made.
 */
export default function TypeToggle() {
  const [choice, setChoice] = useState<TypeChoice>("poppins")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("type")
      const saved = window.localStorage.getItem("s1-type")
      const current: TypeChoice = (fromUrl ?? saved) === "futura" ? "futura" : "poppins"
      setChoice(current)
      const previewHost =
        process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
        process.env.NODE_ENV === "development" ||
        window.location.hostname === "localhost"
      const dismissed = window.localStorage.getItem("s1-type-ui") === "off"
      setVisible((previewHost || fromUrl !== null) && !dismissed)
    } catch {
      /* storage unavailable — the toggle simply stays hidden */
    }
  }, [])

  const apply = (next: TypeChoice) => {
    setChoice(next)
    try {
      window.localStorage.setItem("s1-type", next)
    } catch {
      /* ignore */
    }
    if (next === "futura") document.documentElement.setAttribute("data-type", "futura")
    else document.documentElement.removeAttribute("data-type")
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

  const btn = (value: TypeChoice, label: string) => (
    <button
      type="button"
      onClick={() => apply(value)}
      aria-pressed={choice === value}
      className={`h-8 rounded-[2px] px-3 text-[12px] font-semibold tracking-[0.06em] transition-colors ${
        choice === value ? "bg-white text-[#1E1B18]" : "text-[#D6D0C7] hover:text-white"
      }`}
      style={{ fontFamily: value === "futura" ? "var(--font-jost), Futura, sans-serif" : "var(--font-poppins), sans-serif" }}
    >
      {label}
    </button>
  )

  return (
    <div
      role="group"
      aria-label="Typeface preview"
      className="fixed bottom-4 left-4 z-[150] flex items-center gap-1 rounded-[3px] bg-[#1E1B18]/95 p-1 shadow-[0_8px_24px_rgba(24,21,18,0.35)] backdrop-blur max-[700px]:bottom-[76px]"
    >
      <span className="pl-2 pr-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#968F86]">Type</span>
      {btn("poppins", "Poppins")}
      {btn("futura", "Futura")}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide the typeface switch"
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-[2px] text-[#968F86] hover:text-white"
      >
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
