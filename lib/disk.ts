/**
 * Reading the photo folders and the blog's files, with a snapshot behind
 * the disk (7 Oct 2026).
 *
 * lib/gallery.ts, lib/work.ts, lib/search-index.ts and lib/blog.ts read
 * public/images and content/blog when a page is built. With Sanity
 * connected, pages also rebuild on Vercel's servers every 60 seconds, and
 * there public/ is not in the function bundle (next.config.ts excludes it:
 * 364MB against a 250MB limit) and content/blog sits only beside the blog
 * routes, so a rebuilt page lost its photographs and its project story.
 *
 * Every read here tries the disk first and falls back to
 * lib/generated/disk.json, which scripts/disk-manifest.mjs writes before
 * every build and dev server from the same files. Folder listings are
 * sorted either way, so a page comes out the same from both. Server-only.
 */

import fs from "node:fs"
import path from "node:path"
import snapshot from "./generated/disk.json"

interface Snapshot {
  version: number
  dirs: Record<string, { files: string[]; dirs: string[] }>
  dims: Record<string, [number, number]>
  blog: Record<string, string>
}

const SNAP = snapshot as unknown as Snapshot
const PUBLIC_DIR = path.join(process.cwd(), "public")
const BLOG_DIR = path.join(process.cwd(), "content", "blog")

const byCodePoint = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

/** The path's key in the snapshot, relative to base with forward slashes, or null if outside it. */
function keyIn(base: string, abs: string): string | null {
  const r = path.relative(base, path.resolve(abs))
  if (r.startsWith("..") || path.isAbsolute(r)) return null
  return r.split(path.sep).join("/")
}

export interface Listing {
  files: string[]
  dirs: string[]
}

/** A folder's files and subfolders, sorted; null when the folder is not there. */
export function listDir(abs: string): Listing | null {
  try {
    const entries = fs.readdirSync(abs, { withFileTypes: true })
    return {
      files: entries.filter((e) => e.isFile()).map((e) => e.name).sort(byCodePoint),
      dirs: entries.filter((e) => e.isDirectory()).map((e) => e.name).sort(byCodePoint),
    }
  } catch {
    // not on this disk: the snapshot
  }
  const pub = keyIn(PUBLIC_DIR, abs)
  if (pub !== null && SNAP.dirs[pub]) return SNAP.dirs[pub]
  if (keyIn(BLOG_DIR, abs) === "") return { files: Object.keys(SNAP.blog), dirs: [] }
  return null
}

/** Pixel size from the file header: PNG IHDR or the first JPEG SOF marker. */
function headerDims(buf: Buffer): [number, number] {
  if (buf.length > 24 && buf.toString("latin1", 1, 4) === "PNG") {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  }
  let i = 2
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1
      continue
    }
    const marker = buf[i + 1]
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  return [0, 0]
}

/** An image's pixel size, [0, 0] when it cannot be read. */
export function imageSize(abs: string): [number, number] {
  try {
    return headerDims(fs.readFileSync(abs))
  } catch {
    // not on this disk: the snapshot
  }
  const pub = keyIn(PUBLIC_DIR, abs)
  return (pub !== null && SNAP.dims[pub]) || [0, 0]
}

/** A text file's contents (the blog's MDX), null when it is not there. */
export function readText(abs: string): string | null {
  try {
    return fs.readFileSync(abs, "utf8")
  } catch {
    // not on this disk: the snapshot
  }
  const name = keyIn(BLOG_DIR, abs)
  if (name !== null && Object.prototype.hasOwnProperty.call(SNAP.blog, name)) return SNAP.blog[name]
  return null
}
