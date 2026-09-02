#!/usr/bin/env node
/**
 * Honesty lint — the constitution as code.
 *
 * Scans everything the site renders from (app/, components/, lib/, and the
 * front-matter of content/) for strings that must never reach a visitor:
 * the wrong company's contacts, invented guarantees, borrowed standards,
 * products Square One does not sell. Blog bodies are grandfathered and are
 * not scanned; their front-matter is.
 *
 * Exit 1 on any hit. Run locally with `node scripts/lint-claims.mjs`; CI runs
 * it on every push.
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const SCAN_DIRS = ["app", "components", "lib"]
const EXT = new Set([".ts", ".tsx", ".mdx", ".md"])

/** [pattern, reason]. Case-insensitive unless the pattern is a RegExp with its own flags. */
const BANNED = [
  // Not this company's contacts
  ["604-612-6209", "retired number — not on the site"],
  ["604-309-8212", "HUB West number"],
  ["416-540-9287", "HUB East number"],
  ["info@hubss.com", "HUB email"],
  ["cleve.stordy", "personal email"],
  ["250-216-2190", "Jan's mobile — never on the website"],
  ["jan@squareone", "Jan's email — never on the website"],
  ["America/Toronto", "wrong timezone"],
  // Invented promises and standards
  ["within 48 hours", "quote turnaround Square One has not published"],
  ["20-year", "warranty Square One has not published"],
  ["travel surcharge", "pricing promise Square One has not published"],
  ["8–12 year", "invented service life (HUB publishes 10–20)"],
  ["5+ year colour", "invented colour-retention figure"],
  ["Vision Zero", "borrowed policy claim"],
  ["AODA", "Ontario standard — not BC"],
  ["MUTCD", "US standard — BC uses TAC/MoTI"],
  ["ASTM D3939", "fabricated citation"],
  ["Authorized applicator", "relationship wording not approved (§9 Q6)"],
  ["certified crew", "certification not on record"],
  ["Manufacturer-certified", "certification not on record"],
  ["main western Canada applicator", "eyes-only fact"],
  // Products and lines Square One does not offer
  ["AirMark", "not an S1 product"],
  ["ChipFill", "repair product — not offered"],
  ["AggreFill", "repair product — not offered"],
  ["FastPatch", "repair product — not offered"],
  ["asphalt repair", "not offered"],
  ["airport", "not an S1 market"],
  // Ladysmith is a service-area city, never an office or base
  [/Ladysmith (office|base|shop|yard)/i, "Ladysmith is not a location"],
  [/(office|base|shop|yard) in Ladysmith/i, "Ladysmith is not a location"],
]

/** Files where a banned token is structural, not a claim (redirect sources, the 404 guard). */
const ALLOW = new Map([
  ["next.config.ts", ["airmark", "airport", "air-ports"]],
  ["proxy.ts", ["airmark", "airport"]],
  ["lib/search-index.ts", ["airmark"]],
  ["lib/work.ts", ["airmark", "airport"]],
  ["scripts/lint-claims.mjs", ["*"]],
])
/** Grandfathered front-matter may carry a policy term as a tag; the body is never scanned. */
const ALLOW_DIRS = new Map([["content/", ["vision zero"]]])

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (EXT.has(path.extname(e.name))) out.push(p)
  }
  return out
}

function frontMatterOnly(src) {
  if (!src.startsWith("---")) return ""
  const end = src.indexOf("\n---", 3)
  return end === -1 ? "" : src.slice(0, end + 4)
}

const files = SCAN_DIRS.flatMap((d) => (fs.existsSync(d) ? walk(d) : []))
files.push(...["next.config.ts", "proxy.ts"].filter((f) => fs.existsSync(f)))
const contentDir = path.join(ROOT, "content")
if (fs.existsSync(contentDir)) files.push(...walk(contentDir))

const hits = []
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/")
  const raw = fs.readFileSync(file, "utf8")
  const text = rel.startsWith("content/") ? frontMatterOnly(raw) : raw
  const allowed = [...(ALLOW.get(rel) ?? []), ...[...ALLOW_DIRS].filter(([d]) => rel.startsWith(d)).flatMap(([, v]) => v)]
  const lines = text.split("\n")
  for (const [pattern, reason] of BANNED) {
    const re = pattern instanceof RegExp ? pattern : new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
    if (allowed.includes("*")) continue
    const token = pattern instanceof RegExp ? pattern.source.toLowerCase() : pattern.toLowerCase()
    if (allowed.some((a) => token.includes(a))) continue
    lines.forEach((line, i) => {
      if (re.test(line)) hits.push({ rel, line: i + 1, reason, text: line.trim().slice(0, 110) })
    })
  }
}

if (hits.length) {
  console.error(`\nlint-claims: ${hits.length} hit${hits.length === 1 ? "" : "s"}\n`)
  for (const h of hits) console.error(`  ${h.rel}:${h.line}  [${h.reason}]\n    ${h.text}`)
  console.error("")
  process.exit(1)
}
console.log(`lint-claims: clean (${files.length} files)`)
