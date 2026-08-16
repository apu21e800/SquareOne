// Downsize oversized web images in place. Originals stay recoverable in git
// history. Run with --apply to write; default is a dry run.
//
//   node optimize-images.mjs <repoRoot> [--apply]

import sharp from "sharp"
import fs from "node:fs/promises"
import { existsSync, statSync } from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"

const root = process.argv[2]
const APPLY = process.argv.includes("--apply")

const MAX_EDGE = 2400          // longest side for photography
const JPEG_Q = 82
const WEBP_Q = 82
const MIN_BYTES = 512 * 1024   // only touch files over 500KB
const MIN_GAIN = 0.10          // keep the new file only if >=10% smaller

process.chdir(root)

const tracked = execSync('git ls-files -z public/images', { encoding: "buffer" })
  .toString("utf8").split("\0").filter(Boolean)

const targets = tracked.filter((f) => {
  if (!/\.(jpe?g|png|webp)$/i.test(f)) return false
  try { return statSync(f).size >= MIN_BYTES } catch { return false }
})

let before = 0, after = 0, changed = 0, skipped = 0
const rows = []

for (const f of targets) {
  const origSize = statSync(f).size
  before += origSize

  let buf
  try {
    const input = await fs.readFile(f)
    const img = sharp(input, { failOn: "none" })
    const meta = await img.metadata()
    const longest = Math.max(meta.width || 0, meta.height || 0)
    const needsResize = longest > MAX_EDGE

    let pipeline = sharp(input, { failOn: "none" }).rotate()
    if (needsResize) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? MAX_EDGE : undefined,
        height: meta.height > meta.width ? MAX_EDGE : undefined,
        fit: "inside",
        withoutEnlargement: true,
      })
    }

    const ext = path.extname(f).toLowerCase()
    if (ext === ".png") {
      pipeline = pipeline.png({ compressionLevel: 9, palette: true })
    } else if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: WEBP_Q })
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true, progressive: true })
    }

    buf = await pipeline.toBuffer()
  } catch (e) {
    rows.push({ f, origSize, newSize: origSize, note: "FAILED: " + String(e).slice(0, 60) })
    after += origSize
    skipped++
    continue
  }

  const gain = (origSize - buf.length) / origSize
  if (gain < MIN_GAIN) {
    rows.push({ f, origSize, newSize: origSize, note: "kept (no meaningful gain)" })
    after += origSize
    skipped++
    continue
  }

  if (APPLY) await fs.writeFile(f, buf)
  rows.push({ f, origSize, newSize: buf.length, note: APPLY ? "rewritten" : "would rewrite" })
  after += buf.length
  changed++
}

const mb = (n) => (n / 1048576).toFixed(2)
rows.sort((a, b) => (b.origSize - b.newSize) - (a.origSize - a.newSize))
console.log(`${APPLY ? "APPLIED" : "DRY RUN"} — ${targets.length} candidates over 500KB\n`)
for (const r of rows.slice(0, 20)) {
  const pct = r.origSize === r.newSize ? "  —  " : `-${Math.round((1 - r.newSize / r.origSize) * 100)}%`
  console.log(`  ${mb(r.origSize).padStart(7)} -> ${mb(r.newSize).padStart(7)} MB  ${pct.padStart(5)}  ${r.f}`)
}
if (rows.length > 20) console.log(`  … and ${rows.length - 20} more`)
console.log(`\n  files rewritten : ${changed}`)
console.log(`  files skipped   : ${skipped}`)
console.log(`  before          : ${mb(before)} MB`)
console.log(`  after           : ${mb(after)} MB`)
console.log(`  saved           : ${mb(before - after)} MB (${Math.round((1 - after / before) * 100)}%)`)
