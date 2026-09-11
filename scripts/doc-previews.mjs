#!/usr/bin/env node
/**
 * Pre-render page 1 of every document in lib/resources.ts to WebP.
 *
 *   public/docs-previews/<key>.webp        1000px wide — the in-page preview
 *   public/docs-previews/<key>-thumb.webp   320px wide — the row thumbnail
 *   lib/doc-previews.json                   manifest: href → { preview, thumb, w, h }
 *
 * Run once locally after adding or replacing a PDF (needs poppler's
 * `pdftoppm` and Python 3 with Pillow, both standard on a dev box; nothing
 * runs at build time). The site reads only the manifest, so a document with
 * no rendered preview simply falls back to the type-code tile — a missing
 * image never breaks a page.
 *
 *   node scripts/doc-previews.mjs            render what is missing
 *   node scripts/doc-previews.mjs --force    re-render everything
 */
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..")
const OUT = path.join(ROOT, "public", "docs-previews")
const MANIFEST = path.join(ROOT, "lib", "doc-previews.json")
const force = process.argv.includes("--force")

const src = fs.readFileSync(path.join(ROOT, "lib", "resources.ts"), "utf8")
const hrefs = [...src.matchAll(/href: "([^"]+\.pdf)"/g)].map((m) => m[1])
fs.mkdirSync(OUT, { recursive: true })

const prior = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {}
const manifest = {}
let rendered = 0
let failed = 0

for (const href of hrefs) {
  const file = path.join(ROOT, "public", decodeURIComponent(href))
  const key = decodeURIComponent(href)
    .replace(/^\/docs\//, "")
    .replace(/\.pdf$/i, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
  const preview = path.join(OUT, `${key}.webp`)
  const thumb = path.join(OUT, `${key}-thumb.webp`)

  if (!force && prior[href] && fs.existsSync(preview) && fs.existsSync(thumb)) {
    manifest[href] = prior[href]
    continue
  }
  if (!fs.existsSync(file)) {
    console.warn(`missing on disk: ${href}`)
    failed++
    continue
  }
  try {
    const tmp = path.join(OUT, `.${key}`)
    // First page only, 1000px wide, PNG (lossless) then encoded to WebP by Pillow.
    execFileSync("pdftoppm", ["-f", "1", "-l", "1", "-scale-to-x", "1000", "-scale-to-y", "-1", "-png", "-singlefile", file, tmp], { stdio: "pipe" })
    const png = `${tmp}.png`
    const dims = execFileSync("python3", ["-c", [
      "import sys; from PIL import Image",
      `im = Image.open(${JSON.stringify(png)}).convert('RGB')`,
      `im.save(${JSON.stringify(preview)}, 'WEBP', quality=78, method=6)`,
      "w, h = im.size",
      "t = im.resize((320, max(1, round(h * 320 / w))), Image.LANCZOS)",
      `t.save(${JSON.stringify(thumb)}, 'WEBP', quality=80, method=6)`,
      "print(w, h)",
    ].join("\n")], { stdio: "pipe" }).toString().trim()
    fs.unlinkSync(png)
    const [w, h] = dims.split(" ").map(Number)
    manifest[href] = {
      preview: `/docs-previews/${key}.webp`,
      thumb: `/docs-previews/${key}-thumb.webp`,
      w,
      h,
    }
    rendered++
  } catch (err) {
    failed++
    console.warn(`could not render ${href}: ${err instanceof Error ? err.message.split("\n")[0] : err}`)
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n")
console.log(`${Object.keys(manifest).length} previews in manifest — ${rendered} rendered, ${failed} failed, ${hrefs.length} documents`)
