"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { edgeVars } from "@/lib/palettes"
import { usePalette } from "@/lib/use-palette"

/**
 * The Photo palette's reader (21 Oct 2026; lib/photo-colours.ts picks the
 * colours, lib/palettes.ts has the rest). With Photo chosen in the home
 * hero's colour switch, it reads the photograph the page opens on, small
 * (64 pixels across), and sets the colour card's variables on <html>, where
 * they win over the stylesheet's; every band, square and edge on the page
 * follows. On the home page it follows the reel: each photograph brings its
 * own colours as it comes on screen.
 *
 * Does nothing in any other palette (the picker isn't even downloaded), and
 * takes its variables off again when the visitor moves on from Photo. A
 * page with no photograph keeps the colours it has; a photograph that can't
 * be read leaves them too. Each photograph is read once, after the page has
 * painted, while the browser is otherwise idle.
 */

const VARS = Object.keys(edgeVars(new Array<string>(10).fill("#000000")))
const reads = new Map<string, Promise<string[] | null>>()

/** The photograph the page opens on: the reel's on-screen frame, an opener's, else the first big one in the page. */
function leadPhoto(): HTMLImageElement | null {
  return (
    document.querySelector<HTMLImageElement>("img.reel-frame-active") ??
    document.querySelector<HTMLImageElement>("#main [data-nav-on-image] img") ??
    [...document.querySelectorAll<HTMLImageElement>("#main img")].find((img) => img.getBoundingClientRect().width >= 320) ??
    null
  )
}

/** Until the browser has a quiet moment (or half a second), so a new frame paints before it is read. */
const idle = () =>
  new Promise<void>((done) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => done(), { timeout: 500 })
    else setTimeout(done, 50)
  })

async function pixels(img: HTMLImageElement): Promise<Uint8ClampedArray | null> {
  if (!img.complete) {
    await new Promise<void>((done) => {
      img.addEventListener("load", () => done(), { once: true })
      img.addEventListener("error", () => done(), { once: true })
    })
  }
  // Loaded and empty, or failed: nothing to read.
  if (!img.naturalWidth) return null
  const sample = (source: HTMLImageElement) => {
    const canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = Math.max(1, Math.min(96, Math.round((64 * source.naturalHeight) / source.naturalWidth)))
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return null
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height)
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data
  }
  try {
    return sample(img)
  } catch {
    // Another origin's photograph taints the canvas: a copy that asks for
    // permission (Sanity's CDN gives it) can be read; one that can't isn't.
    try {
      const copy = new Image()
      copy.crossOrigin = "anonymous"
      copy.src = img.currentSrc || img.src
      await copy.decode()
      return sample(copy)
    } catch {
      return null
    }
  }
}

/** One read per photograph, shared by everyone who asks while it runs. */
function coloursOf(img: HTMLImageElement, key: string): Promise<string[] | null> {
  let read = reads.get(key)
  if (!read) {
    read = (async () => {
      try {
        await idle()
        const px = await pixels(img)
        if (!px) return null
        const { photoChips } = await import("@/lib/photo-colours")
        return photoChips(px)
      } catch {
        return null
      }
    })()
    reads.set(key, read)
  }
  return read
}

function clear() {
  for (const name of VARS) document.documentElement.style.removeProperty(name)
}

export default function PhotoColours() {
  const palette = usePalette()
  const path = usePathname()

  useEffect(() => {
    if (palette !== "photo") {
      clear()
      return
    }
    let live = true
    let latest = 0
    let shown = ""
    const follow = async () => {
      const img = leadPhoto()
      if (!img) return
      const key = img.currentSrc || img.src
      // Every look counts as the newest, so a read still running for a frame
      // already gone (back to the one shown) never lands.
      const turn = ++latest
      if (key === shown) return
      const chips = await coloursOf(img, key)
      // Only the newest photograph wins: the reel may have moved on while this one was read.
      if (!live || turn !== latest || !chips) return
      shown = key
      for (const [name, value] of Object.entries(edgeVars(chips))) document.documentElement.style.setProperty(name, value)
    }
    // Once the page's photograph is in the document: a page still arriving
    // gets two more looks before it keeps the colours it has.
    const timers = [0, 300, 1200].map((ms) => window.setTimeout(() => void follow(), ms))
    // The home page's reel: a new frame on screen is a class change on its <img>.
    const reel = document.querySelector("#main .reel")
    const watch = reel ? new MutationObserver(() => void follow()) : null
    if (reel && watch) watch.observe(reel, { subtree: true, attributes: true, attributeFilter: ["class"] })
    return () => {
      live = false
      timers.forEach((t) => window.clearTimeout(t))
      watch?.disconnect()
    }
  }, [palette, path])

  return null
}
