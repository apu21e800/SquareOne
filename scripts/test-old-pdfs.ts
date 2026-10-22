/**
 * Tests for the old site's documents (22 Oct 2026): `npm run test:redirects`.
 *
 * What must hold: each of the 40 old PDF addresses Search Console lists
 * lands on the document lib/old-pdfs.ts names for it, and that document is a
 * real file the library lists; any other old document lands on /resources;
 * old images and WordPress's own addresses get no rule at all; and
 * next.config.ts serves these rules. Matching is Next's own
 * (getPathMatch, the matcher behind every redirect). No network.
 */
import "./test-env"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match"
import { LIBRARY, RENAMED, SAME_FILE, literal, oldPdfRedirects, type Redirect } from "../lib/old-pdfs"
import { resourceGroups } from "../lib/resources"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

const ROOT = process.cwd()

/** Where Next sends a path: the first rule whose source matches, as Next matches it. */
function landsOn(rules: Redirect[], pathname: string): string | null {
  for (const rule of rules) {
    if (getPathMatch(rule.source)(pathname)) return rule.destination
  }
  return null
}

/** The 40 addresses in Search Console's Page indexing report, 22 Oct 2026, and where each should go. */
const SEARCH_CONSOLE: Record<string, string> = {
  ...SAME_FILE,
  ...RENAMED,
  "/wp-content/uploads/2021/09/Thermoplastic-Colors.pdf": LIBRARY,
}

async function main() {
  console.log("The old site's documents: Search Console's 40 addresses, the rest, and what stays out")
  const rules = oldPdfRedirects()

  await check("Search Console's 40 addresses are all here, once each", () => {
    assert.equal(Object.keys(SEARCH_CONSOLE).length, 40)
    const sources = rules.map((r) => r.source)
    assert.equal(new Set(sources).size, sources.length, "a source is listed twice")
  })

  await check("every one lands on its document", () => {
    for (const [from, to] of Object.entries(SEARCH_CONSOLE)) {
      assert.equal(landsOn(rules, from), to, from)
    }
  })

  await check("every document is a real file the library lists", () => {
    const listed = new Set(resourceGroups.flatMap((g) => g.docs.map((d) => d.href)))
    for (const to of new Set([...Object.values(SAME_FILE), ...Object.values(RENAMED)])) {
      assert.ok(fs.existsSync(path.join(ROOT, "public", to)), `${to} is not in public/`)
      assert.ok(listed.has(to), `${to} is not in the library (lib/resources.ts)`)
    }
    assert.ok(fs.existsSync(path.join(ROOT, "app", LIBRARY.slice(1), "page.tsx")), `${LIBRARY} is not a page`)
  })

  await check("any other old document goes to the library", () => {
    for (const p of [
      "/wp-content/uploads/2019/02/Some-Other-Specification.pdf",
      "/wp-content/uploads/2020/11/Estimating-Guide.xlsx",
      "/wp-content/uploads/2018/03/Brochure.docx",
      "/wp-content/uploads/2017/05/Detail.dwg",
      "/wp-content/uploads/Spec-at-the-top.pdf",
    ]) {
      assert.equal(landsOn(rules, p), LIBRARY, p)
    }
  })

  await check("old images and WordPress's own addresses get no rule (Vercel keeps turning them away)", () => {
    for (const p of [
      "/wp-content/uploads/2020/05/Granville-Island-Crosswalk-scaled.jpg",
      "/wp-content/uploads/2021/04/",
      "/wp-content/themes/astra/style.css",
      "/wp-login.php",
      "/wp-admin/",
      "/xmlrpc.php",
      "/docs/StreetBond/Sealer-Concentrate-rev-4-2019.pdf",
    ]) {
      assert.equal(landsOn(rules, p), null, p)
    }
  })

  await check("a name with path syntax in it is matched as written", () => {
    const source = literal("/wp-content/uploads/2021/04/Spec(1)+v2.pdf")
    assert.ok(getPathMatch(source)("/wp-content/uploads/2021/04/Spec(1)+v2.pdf"))
    assert.equal(getPathMatch(source)("/wp-content/uploads/2021/04/Spec1v2.pdf"), false)
  })

  await check("next.config.ts serves every rule, permanently", async () => {
    const config = (await import("../next.config")).default
    const served = await config.redirects!()
    const key = (r: { source: string; destination: string }) => `${r.source} -> ${r.destination}`
    const all = new Set(served.map(key))
    for (const r of rules) {
      assert.ok(all.has(key(r)), `missing: ${key(r)}`)
      assert.equal(r.permanent, true)
    }
    // Nothing earlier in the list catches an old document first.
    for (const [from, to] of Object.entries(SEARCH_CONSOLE)) {
      assert.equal(landsOn(served as Redirect[], from), to, from)
    }
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
