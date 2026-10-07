#!/usr/bin/env node
/**
 * The disk snapshot (7 Oct 2026). Some pages read files when they are built:
 * the photo folders under public/images (lib/gallery.ts, lib/work.ts,
 * lib/search-index.ts) and the blog's MDX under content/blog (lib/blog.ts).
 * With Sanity connected, every page also rebuilds itself on Vercel's servers
 * every 60 seconds, and there public/ is not in the function bundle (it is
 * excluded in next.config.ts: 364MB against Vercel's 250MB limit) and
 * content/blog sits only beside the blog routes. A page rebuilt there found
 * no photographs ("No photos match this filter") and no project stories.
 *
 * This script writes what those readers need into lib/generated/disk.json:
 * every folder under public/images (its files and subfolders, sorted), the
 * pixel size of every JPEG and PNG (read from the file header exactly as
 * lib/work.ts reads it), and every post's MDX. lib/disk.ts reads the disk
 * first and falls back to this snapshot, so a page rebuilt on a server
 * comes out the same as the one built with the files.
 *
 * Runs before every build and dev server (package.json prebuild, predev).
 * The output is deterministic (sorted, LF, one entry per line), so a fresh
 * run over an unchanged tree leaves the committed file unchanged.
 *
 *   node scripts/disk-manifest.mjs           write lib/generated/disk.json
 *   node scripts/disk-manifest.mjs --check   exit 1 if it is out of date
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, "public")
const IMAGES = path.join(PUBLIC, "images")
const BLOG = path.join(ROOT, "content", "blog")
const OUT = path.join(ROOT, "lib", "generated", "disk.json")
const DIM_EXT = /\.(jpe?g|png)$/i

const byCodePoint = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

/** Pixel size from the file header: PNG IHDR or the first JPEG SOF marker (lib/work.ts). */
function dims(buf) {
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

function rel(abs) {
  return path.relative(PUBLIC, abs).split(path.sep).join("/")
}

function walk(abs, snap) {
  const entries = fs.readdirSync(abs, { withFileTypes: true })
  const files = entries.filter((e) => e.isFile()).map((e) => e.name).sort(byCodePoint)
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort(byCodePoint)
  snap.dirs[rel(abs)] = { files, dirs }
  for (const f of files) {
    if (!DIM_EXT.test(f)) continue
    let size = [0, 0]
    try {
      size = dims(fs.readFileSync(path.join(abs, f)))
    } catch {
      // unreadable: [0, 0], as lib/work.ts treats it
    }
    snap.dims[rel(path.join(abs, f))] = size
  }
  for (const d of dirs) walk(path.join(abs, d), snap)
}

function build() {
  const snap = { version: 1, dirs: {}, dims: {}, blog: {} }
  if (fs.existsSync(IMAGES)) walk(IMAGES, snap)
  if (fs.existsSync(BLOG)) {
    const posts = fs
      .readdirSync(BLOG, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .sort(byCodePoint)
    for (const name of posts) snap.blog[name] = fs.readFileSync(path.join(BLOG, name), "utf8").replace(/\r\n/g, "\n")
  }
  // One entry per line, so a new photo or post shows as a line or two in a diff.
  return JSON.stringify(snap, null, 1) + "\n"
}

const next = build()
if (process.argv.includes("--check")) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : ""
  if (current !== next) {
    console.error("disk-manifest: lib/generated/disk.json is out of date; run node scripts/disk-manifest.mjs")
    process.exit(1)
  }
  console.log("disk-manifest: up to date")
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : ""
  if (current !== next) fs.writeFileSync(OUT, next)
  const s = JSON.parse(next)
  console.log(
    `disk-manifest: ${Object.keys(s.dirs).length} folders, ${Object.keys(s.dims).length} image sizes, ${Object.keys(s.blog).length} posts${current === next ? " (unchanged)" : ""}`,
  )
}
