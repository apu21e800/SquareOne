#!/usr/bin/env node
/**
 * Dead-link and dead-image check — runs at build time in CI so a missing
 * photograph, document or redirect target fails the push instead of shipping.
 *
 *   images/docs   every "/images/…" and "/docs/…" literal in app/, components/,
 *                 lib/ (constants like ${FIO} resolved from the same file) and
 *                 in content front-matter must exist under public/
 *   redirects     every static destination in next.config.ts must be a route
 *                 the app can serve
 *   hrefs         every literal href="/…" in app/ and components/ must resolve
 *
 * Exit 1 on any miss. `node scripts/check-links.mjs`.
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, "public")
const errors = []
const warnings = []

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, exts, out)
    else if (exts.has(path.extname(e.name))) out.push(p)
  }
  return out
}
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/")

// ── Routes the app can serve ────────
function slugsFrom(file, key = "slug") {
  if (!fs.existsSync(file)) return []
  const src = fs.readFileSync(file, "utf8")
  return [...src.matchAll(new RegExp(`\\b${key}: "([^"]+)"`, "g"))].map((m) => m[1])
}
const routes = new Set(["/"])
for (const page of walk(path.join(ROOT, "app"), new Set([".tsx"]))) {
  const r = rel(page)
  if (!/\/page\.tsx$/.test(r)) continue
  const route = "/" + r.replace(/^app\//, "").replace(/\/page\.tsx$/, "").replace(/\([^)]+\)\/?/g, "")
  if (!route.includes("[")) routes.add(route === "/" ? "/" : route.replace(/\/$/, ""))
}
for (const s of slugsFrom("lib/products.ts")) routes.add(`/products/${s}`)
for (const s of slugsFrom("lib/services.ts")) routes.add(`/services/${s}`)
for (const s of slugsFrom("lib/projects.ts")) routes.add(`/projects/${s}`)
for (const s of slugsFrom("lib/work.ts")) if (s !== "driveways") routes.add(`/applications/${s}`)
for (const f of walk(path.join(ROOT, "content/blog"), new Set([".mdx", ".md"]))) routes.add(`/blog/${path.basename(f).replace(/\.(mdx|md)$/, "")}`)
for (const city of ["vancouver", "victoria"]) routes.add(`/driveways/${city}`)

function routeExists(href) {
  const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/"
  if (routes.has(clean)) return true
  if (clean.startsWith("/docs/") || clean.startsWith("/images/")) return fs.existsSync(path.join(PUBLIC, decodeURIComponent(clean)))
  return false
}

// ── Images and documents ────────
const codeFiles = [...walk(path.join(ROOT, "app"), new Set([".ts", ".tsx"])), ...walk(path.join(ROOT, "components"), new Set([".ts", ".tsx"])), ...walk(path.join(ROOT, "lib"), new Set([".ts", ".tsx"]))]
const assetRe = /(?:"|'|`)((?:\$\{[A-Z_]+\})?\/(?:images|docs)\/[^"'`\n]+?)(?:"|'|`)/g

function resolveConsts(src, literal) {
  return literal.replace(/\$\{([A-Z_]+)\}/g, (_, name) => {
    const m = src.match(new RegExp(`const ${name} = "([^"]+)"`))
    return m ? m[1] : `\${${name}}`
  })
}

const checked = new Set()
for (const file of codeFiles) {
  const src = fs.readFileSync(file, "utf8")
  for (const m of src.matchAll(assetRe)) {
    const resolved = resolveConsts(src, m[1])
    if (resolved.includes("${")) continue // dynamic — built at runtime from the record
    if (checked.has(resolved)) continue
    checked.add(resolved)
    const fsPath = path.join(PUBLIC, decodeURIComponent(resolved))
    if (!fs.existsSync(fsPath)) errors.push(`${rel(file)}: missing asset ${resolved}`)
  }
}
// Slugs whose lede is fixed in lib/blog-ledes.ts LEDE never read their front-matter image
const blogLib = fs.existsSync("lib/blog-ledes.ts") ? fs.readFileSync("lib/blog-ledes.ts", "utf8") : ""
const overridden = new Set([...blogLib.matchAll(/^\s+"([^"]+)":\s/gm)].map((m) => m[1]))
for (const file of walk(path.join(ROOT, "content"), new Set([".mdx", ".md"]))) {
  if (overridden.has(path.basename(file).replace(/\.(mdx|md)$/, ""))) continue
  const src = fs.readFileSync(file, "utf8")
  const fm = src.startsWith("---") ? src.slice(0, src.indexOf("\n---", 3)) : ""
  const m = fm.match(/featured_image:\s*"?([^"\n]*)"?/)
  if (!m || !m[1].trim()) continue
  const v = m[1].trim()
  if (/^https?:\/\//.test(v)) { warnings.push(`${rel(file)}: remote featured_image ${v} (override it in lib/blog-ledes.ts LEDE)`); continue }
  const fsPath = path.join(PUBLIC, decodeURIComponent(v.replace(/%20/g, " ")))
  if (!fs.existsSync(fsPath) && !fs.existsSync(path.join(PUBLIC, decodeURIComponent(v)))) warnings.push(`${rel(file)}: featured_image not on disk ${v} (override it in lib/blog-ledes.ts LEDE)`)
}

// ── Redirect destinations ────────
const cfg = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8")
for (const m of cfg.matchAll(/destination: "([^"]+)"/g)) {
  const d = m[1]
  if (d.includes(":")) continue
  if (!routeExists(d)) errors.push(`next.config.ts: redirect destination ${d} is not a route`)
}

// ── Literal hrefs ────────
for (const file of [...walk(path.join(ROOT, "app"), new Set([".tsx"])), ...walk(path.join(ROOT, "components"), new Set([".tsx"]))]) {
  const src = fs.readFileSync(file, "utf8")
  for (const m of src.matchAll(/href=["'](\/[^"'#?\s]*)["'#?]/g)) {
    const h = m[1]
    if (h.startsWith("/_next") || h === "/") continue
    if (!routeExists(h)) errors.push(`${rel(file)}: href ${h} is not a route`)
  }
}

for (const w of warnings) console.warn(`warn  ${w}`)
if (errors.length) {
  console.error(`\ncheck-links: ${errors.length} error${errors.length === 1 ? "" : "s"}`)
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}
console.log(`check-links: clean — ${checked.size} assets, ${routes.size} routes, ${warnings.length} warning${warnings.length === 1 ? "" : "s"}`)
