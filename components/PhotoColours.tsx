"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { edgeVars } from "@/lib/palettes"
import { photoChips } from "@/lib/photo-colours"
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
 * Does nothing at all in any other palette, and takes its variables off
 * again when the visitor moves on from Photo. A page with no photograph
 * keeps the colours it has; a photograph that can't be read (another site's,
 * without permission) leaves them too. Each photograph is read once.
 */

const VARS = Object.keys(edgeVars(new Array<string>(10).fill("#000000")))
const read = new Map<string, string[] | null>()

/** The photograph the page opens on: the reel's on-screen frame, an opener's, else the first big one in the page. */
function leadPhoto(): HTMLImageElement | null {
  return (
    document.querySelector<HTMLImageElement>("img.reel-frame-active") ??
    document.querySelector<HTMLImageElement>("#main [data-nav-on-image] img") ??
    [...document.querySelectorAll<HTMLImageElement>("#main img")].find((img) => img.getBoundingClientRect().width >= 320) ??
    null
  )
}

async function pixels(img: HTMLImageElement): Promise<Uint8ClampedArray | null> {
  if (!img.complete || !img.naturalWidth) {
    await new Promise<void>((done) => {
      img.addEventListener("load", () => done(), { once: true })
      img.addEventListener("error", () => done(), { once: true })
    })
  }
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
      const turn = ++latest
      const img = leadPhoto()
      if (!img) return false
      const key = img.currentSrc || img.src
      if (key === shown) return true
      if (!read.has(key)) {
        const px = await pixels(img)
        let chips: string[] | null = null
        try {
          chips = px ? photoChips(px) : null
        } catch {
          chips = null
        }
        read.set(key, chips)
      }
      const chips = read.get(key)
      // Only the newest photograph wins: the reel may have moved on while this one was read.
      if (!live || turn !== latest || !chips) return true
      shown = key
      for (const [name, value] of Object.entries(edgeVars(chips))) document.documentElement.style.setProperty(name, value)
      return true
    }
    // Once the page's photograph is in the document: a page still arriving
    // gets two more looks before it keeps the colours it has.
    const timers = [0, 300, 1200].map((ms, i) =>
      window.setTimeout(() => {
        if (i === 0 || !shown) void follow()
      }, ms),
    )
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
