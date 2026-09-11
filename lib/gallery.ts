// Build-time gallery reader.
//
// Galleries are derived from the filesystem rather than hardcoded arrays, so
// adding a photo means dropping a file into the right folder — no code change.
//
//   public/images/projects/<slug>/*      → galleryFor("projects", slug)
//   public/images/products/<slug>/*      → galleryFor("products", slug)
//   public/images/applications/<slug>/*  → galleryFor("applications", slug)
//
// Titles, locations, products and dates still come from lib/projects.ts and
// lib/products.ts — this only supplies imagery.
//
// Server-only: reads disk at build time. Safe in Server Components and in
// generateStaticParams-backed pages; never import from a "use client" module.

import fs from "node:fs"
import path from "node:path"

export type GalleryKind = "projects" | "products" | "applications" | "services" | "blog"

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i
const PUBLIC_DIR = path.join(process.cwd(), "public")

/** Natural sort so "shot-2.jpg" precedes "shot-10.jpg". */
function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, "en", { numeric: true, sensitivity: "base" })
}

/**
 * Every image in public/images/<kind>/<slug>/, as web paths, naturally sorted.
 * Returns [] when the folder is absent — callers fall back to their own data.
 */
export function galleryFor(kind: GalleryKind, slug: string): string[] {
  if (!slug) return []

  const dir = path.join(PUBLIC_DIR, "images", kind, slug)

  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }

  return entries
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name) && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort(naturalCompare)
    .map((name) => `/images/${kind}/${slug}/${encodeURIComponent(name)}`)
}

/**
 * Preferred hero for a slug: first file on disk, else the supplied fallback
 * (typically imageUrl from lib/projects.ts).
 */
export function heroFor(kind: GalleryKind, slug: string, fallback?: string): string | undefined {
  return galleryFor(kind, slug)[0] ?? fallback
}

/**
 * Filesystem images first, then any curated paths not already present.
 * Lets a folder override while keeping hand-picked shots that live elsewhere.
 */
export function galleryWithFallback(
  kind: GalleryKind,
  slug: string,
  fallback: readonly string[] = [],
): string[] {
  const found = galleryFor(kind, slug)
  if (found.length === 0) return [...fallback]

  const seen = new Set(found.map((p) => path.basename(p).toLowerCase()))
  const extra = fallback.filter((p) => !seen.has(path.basename(p).toLowerCase()))
  return [...found, ...extra]
}
