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
 * every folder under public/images that git tracks files in (its files and
 * subfolders, sorted), the pixel size of every JPEG and PNG (read from the
 * file header exactly as lib/work.ts reads it), and every post's MDX. lib/disk.ts reads the disk
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
import { execFileSync } from "node:child_process"
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

/**
 * The files git tracks under public/images and content/blog, as paths from
 * the repo root: exactly what a Vercel build checks out, so the snapshot is
 * the same on every machine, whatever else sits in a working copy (an
 * ignored public/images/_pre-photo-pass, say). Without git (no .git in the
 * build), the folders on disk, which in a fresh checkout are the same files.
 */
function trackedFiles() {
  try {
    const out = execFileSync("git", ["ls-files", "-z", "--", "public/images", "content/blog"], {
      cwd: ROOT,
      encoding: "utf8",
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024,
    })
    const files = out.split("\0").filter(Boolean)
    return files.length > 0 ? files : null
  } catch {
    return null
  }
}

function diskFiles() {
  const found = []
  const walk = (abs) => {
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      const p = path.join(abs, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.isFile()) found.push(path.relative(ROOT, p).split(path.sep).join("/"))
    }
  }
  if (fs.existsSync(IMAGES)) walk(IMAGES)
  if (fs.existsSync(BLOG)) walk(BLOG)
  return found
}

function build() {
  const snap = { version: 1, dirs: {}, dims: {}, blog: {} }
  const files = (trackedFiles() ?? diskFiles()).filter((f) => fs.existsSync(path.join(ROOT, f)))
  const dirs = new Map()
  const entry = (key) => {
    if (!dirs.has(key)) dirs.set(key, { files: new Set(), dirs: new Set() })
    return dirs.get(key)
  }
  for (const f of files) {
    if (f.startsWith("content/blog/")) {
      const name = f.slice("content/blog/".length)
      if (!name.includes("/")) snap.blog[name] = null
      continue
    }
    // public/images/a/b/c.jpg → images/a/b, file c.jpg; and every ancestor
    const parts = f.slice("public/".length).split("/")
    const file = parts.pop()
    entry(parts.join("/")).files.add(file)
    for (let i = parts.length - 1; i > 0; i--) entry(parts.slice(0, i).join("/")).dirs.add(parts[i])
  }
  for (const key of [...dirs.keys()].sort(byCodePoint)) {
    const d = dirs.get(key)
    snap.dirs[key] = { files: [...d.files].sort(byCodePoint), dirs: [...d.dirs].sort(byCodePoint) }
    for (const name of snap.dirs[key].files) {
      if (!DIM_EXT.test(name)) continue
      let size = [0, 0]
      try {
        size = dims(fs.readFileSync(path.join(PUBLIC, key, name)))
      } catch {
        // unreadable: [0, 0], as lib/work.ts treats it
      }
      snap.dims[`${key}/${name}`] = size
    }
  }
  const dimKeys = Object.keys(snap.dims).sort(byCodePoint)
  snap.dims = Object.fromEntries(dimKeys.map((k) => [k, snap.dims[k]]))
  for (const name of Object.keys(snap.blog).sort(byCodePoint)) {
    delete snap.blog[name]
    snap.blog[name] = fs.readFileSync(path.join(BLOG, name), "utf8").replace(/\r\n/g, "\n")
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
