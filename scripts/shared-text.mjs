#!/usr/bin/env node
/**
 * scripts/shared-text.mjs — how much of this site's copy also appears on hubss.com.
 *
 * Two companies, one manufacturer, and Square One's site began as HUB's template:
 * the same sentence on two domains competes in search and weakens both, and the
 * plan of 25 Sept 2026 is to make the two sites read as two companies. This
 * script measures that, page by page, so the number can be checked after every
 * pass instead of guessed.
 *
 *   node scripts/shared-text.mjs                       # this site = http://localhost:3000 (run `next start` first)
 *   node scripts/shared-text.mjs --site https://square-one-git-<branch>-based-agency.vercel.app
 *   node scripts/shared-text.mjs --other https://hubss.com --max-share 1.5
 *
 * Method: every page in each site's sitemap is fetched; visible text is taken from
 * the HTML (script, style, svg, noscript and the head dropped); text is split
 * into sentences of five words or more; sentences that appear on half or more of a
 * site's own pages (nav, footer, the CTA band) are set aside as boilerplate;
 * every remaining sentence is compared against every sentence on the other site —
 * exact after normalisation, or near when the two share enough six-word
 * shingles and a word-level similarity of 0.80 or better.
 *
 * Exit code: 1 when the whole-site share exceeds --max-share (percent, default
 * 100 = never fail). Product names (StreetBond, TrafficPatterns…) are expected to
 * be in common and are not themselves sentences, so they never count.
 *
 * No dependencies. Node 20+ (global fetch).
 */

const args = process.argv.slice(2)
const opt = (name, fallback) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : fallback }
const SITE = opt("--site", "http://localhost:3000").replace(/\/$/, "")
const OTHER = opt("--other", "https://hubss.com").replace(/\/$/, "")
const MAX_SHARE = Number(opt("--max-share", "100"))
const CANON_HOST = opt("--canonical", "https://www.squareonepaving.com") // sitemap entries carry the canonical host; rewrite to SITE
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36 shared-text-check"

async function get(url) {
  const r = await fetch(url, { headers: { "user-agent": UA, accept: "text/html,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return await r.text()
}

async function sitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) return []
  seen.add(url)
  const xml = await get(url)
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
  if (/<sitemapindex/.test(xml)) {
    const out = []
    for (const l of locs) out.push(...(await sitemapUrls(l, seen)))
    return out
  }
  return locs.filter((u) => !/\.(jpe?g|png|webp|avif|gif|svg|pdf|xml)$/i.test(u))
}

function visibleText(html) {
  let h = html.replace(/<!--[\s\S]*?-->/g, "")
  h = h.replace(/<head[\s\S]*?<\/head>/gi, "")
  h = h.replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, " ")
  // block boundaries become newlines so sentences do not run across elements
  h = h.replace(/<\/(p|div|section|article|header|footer|nav|main|li|ul|ol|h[1-6]|tr|td|th|table|figure|figcaption|blockquote|dd|dt|dl|aside|summary|details|button|label)>/gi, "\n")
  h = h.replace(/<br\s*\/?>/gi, "\n")
  h = h.replace(/<[^>]+>/g, " ")
  h = h.replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, "'").replace(/&#8212;|&mdash;/g, "—").replace(/&#\d+;|&[a-z]+;/g, " ")
  return h.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean)
}

function sentences(lines) {
  const out = []
  for (const line of lines) {
    for (const s of line.split(/(?<=[.!?])\s+(?=[A-Z0-9"'(])/)) {
      const t = s.trim()
      if (t.split(/\s+/).length >= 5) out.push(t)
    }
  }
  return out
}
const norm = (s) => s.toLowerCase().replace(/[®™©]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim()
function shingles(n, k = 6) { const w = n.split(" "); const out = new Set(); for (let i = 0; i + k <= w.length; i++) out.add(w.slice(i, i + k).join(" ")); return out }
function wordSimilarity(a, b) {
  // Dice coefficient over word bigrams — cheap, order-aware enough for "same sentence, one word swapped"
  const bg = (n) => { const w = n.split(" "); const s = new Map(); for (let i = 0; i + 1 < w.length; i++) { const k = w[i] + " " + w[i + 1]; s.set(k, (s.get(k) || 0) + 1) } return s }
  const A = bg(a), B = bg(b); let inter = 0, total = 0
  for (const [k, v] of A) { total += v; if (B.has(k)) inter += Math.min(v, B.get(k)) }
  for (const v of B.values()) total += v
  return total ? (2 * inter) / total : 0
}

async function crawl(base, label, rewriteFrom) {
  let urls = await sitemapUrls(base + "/sitemap.xml")
  if (rewriteFrom) urls = urls.map((u) => u.replace(rewriteFrom, base))
  urls = [...new Set(urls)]
  const pages = new Map()
  let i = 0
  const workers = Array.from({ length: 6 }, async () => {
    while (i < urls.length) {
      const u = urls[i++]
      try { pages.set(new URL(u).pathname || "/", sentences(visibleText(await get(u)))) } catch (e) { console.error(`  skip ${u}: ${e.message}`) }
    }
  })
  await Promise.all(workers)
  console.error(`${label}: ${pages.size}/${urls.length} pages`)
  return pages
}

function boilerplate(pages) {
  const count = new Map()
  for (const ss of pages.values()) for (const n of new Set(ss.map(norm))) count.set(n, (count.get(n) || 0) + 1)
  const half = pages.size / 2
  return new Set([...count].filter(([, c]) => c >= half).map(([n]) => n))
}

const site = await crawl(SITE, "this site", CANON_HOST)
const other = await crawl(OTHER, "other site")
const siteBoiler = boilerplate(site)
const otherIndex = new Map() // norm -> [path, sentence]
const shingleIndex = new Map()
for (const [p, ss] of other) for (const s of ss) { const n = norm(s); if (!otherIndex.has(n)) otherIndex.set(n, [p, s]); for (const sh of shingles(n)) { if (!shingleIndex.has(sh)) shingleIndex.set(sh, new Set()); shingleIndex.get(sh).add(n) } }

const perPage = []
let totals = { sentences: 0, exact: 0, near: 0 }
for (const [p, ss] of site) {
  const exact = [], near = []
  const seen = new Set()
  for (const s of ss) {
    const n = norm(s)
    if (siteBoiler.has(n) || seen.has(n)) continue
    seen.add(n)
    if (otherIndex.has(n)) { exact.push([s, otherIndex.get(n)[0]]); continue }
    const cands = new Set()
    for (const sh of shingles(n)) for (const c of shingleIndex.get(sh) || []) cands.add(c)
    let best = 0, bestN = null
    for (const c of cands) { const r = wordSimilarity(n, c); if (r > best) { best = r; bestN = c } }
    if (best >= 0.8) near.push([s, otherIndex.get(bestN)[1], otherIndex.get(bestN)[0], best])
  }
  const total = seen.size
  perPage.push({ path: p, total, exact, near })
  totals.sentences += total; totals.exact += exact.length; totals.near += near.length
}

const section = (p) => (p.replace(/^\//, "").split("/")[0] || "home")
const bySection = new Map()
for (const r of perPage) { const s = section(r.path); const b = bySection.get(s) || { pages: 0, sentences: 0, exact: 0, near: 0 }; b.pages++; b.sentences += r.total; b.exact += r.exact.length; b.near += r.near.length; bySection.set(s, b) }
const pct = (a, b) => (b ? ((100 * a) / b).toFixed(1) : "0.0")
console.log(`\nShared copy — ${SITE} against ${OTHER}\n`)
console.log("section          pages  sentences  exact   near  share")
for (const [s, b] of [...bySection].sort((x, y) => y[1].exact + y[1].near - (x[1].exact + x[1].near) || x[0].localeCompare(y[0])))
  console.log(`${s.padEnd(16)} ${String(b.pages).padStart(5)} ${String(b.sentences).padStart(10)} ${String(b.exact).padStart(6)} ${String(b.near).padStart(6)}  ${pct(b.exact + b.near, b.sentences).padStart(5)}%`)
const share = Number(pct(totals.exact + totals.near, totals.sentences))
console.log(`${"ALL".padEnd(16)} ${String(perPage.length).padStart(5)} ${String(totals.sentences).padStart(10)} ${String(totals.exact).padStart(6)} ${String(totals.near).padStart(6)}  ${String(share).padStart(5)}%`)

console.log("\nPages with shared copy:")
for (const r of perPage.sort((a, b) => b.exact.length + b.near.length - (a.exact.length + a.near.length))) {
  if (!r.exact.length && !r.near.length) break
  console.log(`  ${String(r.exact.length).padStart(3)} exact ${String(r.near.length).padStart(3)} near / ${String(r.total).padStart(3)}  ${r.path}`)
}
console.log("\nExamples (up to 30):")
let k = 0
for (const r of perPage) {
  for (const [s, op] of r.exact) { if (k++ >= 30) break; console.log(`  = [${r.path} · other:${op}] ${s.slice(0, 150)}`) }
  for (const [s, os, op, ratio] of r.near) { if (k++ >= 30) break; console.log(`  ~ ${ratio.toFixed(2)} [${r.path}] ${s.slice(0, 120)}\n        other:${op}: ${os.slice(0, 120)}`) }
  if (k >= 30) break
}
if (share > MAX_SHARE) { console.error(`\nFAIL: ${share}% shared, limit ${MAX_SHARE}%`); process.exit(1) }
console.log(`\nOK: ${share}% shared (limit ${MAX_SHARE}%)`)
