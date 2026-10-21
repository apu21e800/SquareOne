/**
 * One way to send a Google Analytics event from the browser (14 Oct 2026).
 * Does nothing where the tag isn't loaded (previews, local builds, a visitor
 * who blocks it), and never throws: analytics must never break a page or the
 * quote form.
 */
type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: Gtag
  }
}

export function gaEvent(name: string, params: Record<string, string | number | undefined> = {}): void {
  if (typeof window === "undefined") return
  try {
    window.gtag?.("event", name, params)
  } catch {
    /* never in the way of the page */
  }
}
