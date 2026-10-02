"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * The whole motion system — SOUL-PASS MOVE 8, built against the failure
 * class MOVE 9 diagnosed on the old deployed homepage (SSR-serialized
 * opacity:0 + high whileInView thresholds + once:true left above-fold
 * content stuck washed-out).
 *
 * Design rules that make that impossible here:
 *  - Nothing is hidden in server HTML. No JS, no observer, no problem:
 *    the page is fully visible by default.
 *  - Only elements BELOW the first viewport get armed (hidden) on mount,
 *    so above-fold content is never touched.
 *  - threshold 0 — a single pixel entering the viewport resolves the
 *    element to opacity 1. No amount:0.2 traps.
 *  - No IntersectionObserver support -> nothing is ever armed.
 *  - prefers-reduced-motion: nothing is armed, numerals render final.
 *
 * Vocabulary (exactly the MOVE 8 set, nothing more):
 *  - [data-reveal]        fade up 14px / 500ms, once
 *  - [data-reveal-group]  children stagger 60ms between siblings
 *  - [data-count]         stat numeral counts up once (zero-padding kept)
 */
export default function MotionBreath() {
  // 30 Sept 2026: armed again on every navigation. The component lives in
  // the root layout, so the effect ran once per visit and every page after
  // the first arrived without its motion. It waits a frame for the new page
  // to paint before measuring what is below the fold.
  const pathname = usePathname()
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !("IntersectionObserver" in window)) return

    let io: IntersectionObserver | undefined
    let cio: IntersectionObserver | undefined
    const raf = requestAnimationFrame(() => {
      const foldLine = window.innerHeight * 0.94

      // ── Fade-up reveals ────────────────────────────────────────────
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
      const armed: HTMLElement[] = []
      for (const el of els) {
        if (el.classList.contains("reveal-done")) continue
        if (el.getBoundingClientRect().top < foldLine) {
          el.classList.add("reveal-done") // above the fold — never hidden
          continue
        }
        // sibling stagger inside a group, from the first one still below the fold
        const group = el.closest<HTMLElement>("[data-reveal-group]")
        if (group) {
          const siblings = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
            (s) => !s.classList.contains("reveal-done")
          )
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 8) * 70}ms`
        }
        el.classList.add("reveal-armed")
        armed.push(el)
      }

      const reveal = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target as HTMLElement
            el.classList.add("reveal-in", "reveal-done")
            reveal.unobserve(el)
          }
        },
        { threshold: 0, rootMargin: "0px 0px -4% 0px" }
      )
      armed.forEach((el) => reveal.observe(el))
      io = reveal

      // ── Count-up numerals, once ────────────────────────────────────
      const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"))
      const count = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target as HTMLElement
            count.unobserve(el)
            if (el.dataset.counted) continue
            el.dataset.counted = "1"
            const finalText = el.textContent ?? ""
            const target = parseInt(finalText, 10)
            if (!Number.isFinite(target)) continue
            const width = finalText.length
            const t0 = performance.now()
            const dur = 900
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / dur)
              const eased = 1 - Math.pow(1 - p, 3)
              el.textContent = String(Math.round(target * eased)).padStart(width, "0")
              if (p < 1) requestAnimationFrame(tick)
              else el.textContent = finalText
            }
            requestAnimationFrame(tick)
          }
        },
        { threshold: 0 }
      )
      counters.forEach((el) => count.observe(el))
      cio = count
    })

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
      cio?.disconnect()
      // Anything still hidden when the page changes is shown, never stranded.
      for (const el of document.querySelectorAll<HTMLElement>(".reveal-armed:not(.reveal-in)")) {
        el.classList.add("reveal-in", "reveal-done")
      }
    }
  }, [pathname])

  return null
}
