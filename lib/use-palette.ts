"use client"

import { useSyncExternalStore } from "react"
import { DEFAULT_PALETTE, PALETTE_IDS, PALETTE_KEY, type PaletteId } from "@/lib/palettes"

/**
 * The palette a visitor is looking at, as React state (8 Oct 2026).
 *
 * The truth is the data-palette attribute on <html>, which PALETTE_BOOT sets
 * in <head> before the first paint, so the colours themselves never wait for
 * React. Components only need the palette for words — the band's hover
 * titles, the hero switch's label — and read it here. On the server and
 * during hydration it is the default, then the client's own; a change made
 * anywhere is announced with one window event so every reader follows.
 */
const EVENT = "s1:palette"

function read(): PaletteId {
  const p = document.documentElement.getAttribute("data-palette")
  return p && (PALETTE_IDS as string[]).includes(p) ? (p as PaletteId) : DEFAULT_PALETTE
}

function subscribe(onChange: () => void): () => void {
  // Another tab switching palette changes storage, not this page's <html>,
  // so follow it there too and the two tabs agree.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== PALETTE_KEY) return
    apply(e.newValue && (PALETTE_IDS as string[]).includes(e.newValue) ? (e.newValue as PaletteId) : DEFAULT_PALETTE)
    onChange()
  }
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onStorage)
  }
}

function apply(id: PaletteId) {
  const html = document.documentElement
  if (id === DEFAULT_PALETTE) html.removeAttribute("data-palette")
  else html.setAttribute("data-palette", id)
}

export function usePalette(): PaletteId {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_PALETTE)
}

/** Switch the whole site, remember it, and tell every reader. Storage may be
    refused (a private window); the switch still holds for this page. */
export function setPalette(id: PaletteId) {
  apply(id)
  try {
    localStorage.setItem(PALETTE_KEY, id)
  } catch {
    /* the page still switches; it just won't be remembered */
  }
  window.dispatchEvent(new Event(EVENT))
}

/** The next palette in the cycle, wrapping back to the first. */
export function nextPalette(id: PaletteId): PaletteId {
  return PALETTE_IDS[(PALETTE_IDS.indexOf(id) + 1) % PALETTE_IDS.length]
}
