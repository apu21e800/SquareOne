"use client"

/** The footer's last word: back to the top of the page, smoothly unless the
    visitor asked for less motion. */
export default function BackToTop({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }}
    >
      Back to top
    </button>
  )
}
