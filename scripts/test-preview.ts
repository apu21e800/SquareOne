/**
 * Tests for Edit on the page (14 Oct 2026): `npm run test:preview`.
 *
 * What must hold: the marks that make words clickable go only on words a
 * visitor reads, and never reach a size calculation, a <title> or the
 * structured data; "Exit preview" only ever returns to a page on this
 * site; a photograph is clickable only in the preview; the Studio's style
 * warnings speak up on new writing and stay quiet on the imported library.
 * No network.
 */
import "./test-env"
import assert from "node:assert/strict"
import { vercelStegaCombine } from "@vercel/stega"
import { safeReturnPath } from "../lib/preview"
import { STEGA_FIELDS, fieldOf, stegaFilter } from "../sanity/lib/stega"
import { editAttr } from "../sanity/lib/client"
import { fitVars } from "../lib/type"
import { pageTitle, clampDescription } from "../lib/seo"
import { scriptJson } from "../components/JsonLd"
import { bodyCheck, copyCheck, headingCheck, paragraphsCheck } from "../sanity/schemaTypes/style"

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

const marked = (text: string) => vercelStegaCombine(text, { origin: "sanity.io", href: "/studio/intent/edit/id=x;type=pageHero;path=headline" })

/** What the client hands the filter: only the parts it reads. */
const filterSays = (type: string, sourcePath: (string | number | { _key: string })[]) =>
  stegaFilter({
    sourcePath,
    sourceDocument: { _id: "x", _type: type },
    resultPath: [],
    value: "words",
    filterDefault: () => true,
  } as unknown as Parameters<typeof stegaFilter>[0])

async function main() {
  console.log("Edit on the page: preview marks, exit, photographs, style warnings")

  await check("the marks go on the words a visitor reads", () => {
    assert.equal(filterSays("pageHero", ["headline"]), true)
    assert.equal(filterSays("homePage", ["reel", { _key: "a" }, "caption"]), true)
    assert.equal(filterSays("post", ["body", { _key: "b" }, "children", { _key: "c" }, "text"]), true)
    assert.equal(filterSays("project", ["story", 2]), true)
    assert.equal(filterSays("siteSettings", ["positioning"]), true)
  })

  await check("never on links, phones, emails, addresses, alt text, slugs or categories", () => {
    assert.equal(filterSays("siteSettings", ["phoneOffice"]), false)
    assert.equal(filterSays("siteSettings", ["email"]), false)
    assert.equal(filterSays("siteSettings", ["addressLine1"]), false)
    assert.equal(filterSays("siteSettings", ["instagram"]), false)
    assert.equal(filterSays("pageHero", ["alt"]), false)
    assert.equal(filterSays("pageHero", ["page"]), false)
    assert.equal(filterSays("post", ["slug", "current"]), false)
    assert.equal(filterSays("post", ["category"]), false)
    assert.equal(filterSays("post", ["seoTitle"]), false)
    assert.equal(filterSays("project", ["city"]), false)
    assert.equal(filterSays("galleryPhoto", ["gallery"]), false)
    assert.equal(filterSays("sanity.imageAsset", ["originalFilename"]), false)
    assert.equal(filterSays("copySlot", ["value"]), false)
  })

  await check("the filter reads the last named field on the path", () => {
    assert.equal(fieldOf(["story", 3]), "story")
    assert.equal(fieldOf(["body", { _key: "k" }, "children", { _key: "j" }, "text"]), "text")
    assert.equal(fieldOf([]), undefined)
    assert.ok(Object.keys(STEGA_FIELDS).length >= 7)
  })

  await check("a marked headline sizes exactly as the plain one", () => {
    const plain = "Stamped asphalt, coloured coatings and crosswalks"
    assert.notEqual(marked(plain), plain)
    assert.deepEqual(fitVars(marked(plain)), fitVars(plain))
  })

  await check("no mark reaches a <title>, a description or the structured data", () => {
    assert.equal(pageTitle(marked("Nanaimo rainbow intersection")), pageTitle("Nanaimo rainbow intersection"))
    assert.equal(clampDescription(marked("A short summary.")), "A short summary.")
    const json = scriptJson({ name: marked("Square One Paving"), nested: [{ text: marked("Crosswalks") }] })
    assert.equal(json, scriptJson({ name: "Square One Paving", nested: [{ text: "Crosswalks" }] }))
  })

  await check("structured data is still escaped", () => {
    assert.ok(!scriptJson({ title: "</script><script>alert(1)</script>" }).includes("<"))
  })

  await check("Exit preview only returns to a page on this site", () => {
    assert.equal(safeReturnPath("/about"), "/about")
    assert.equal(safeReturnPath("/blog/a-post?x=1#top"), "/blog/a-post?x=1#top")
    for (const bad of [null, undefined, "", "about", "//evil.example", "//evil.example/x", "/\\evil.example", "\\\\evil.example", "https://evil.example/", "javascript:alert(1)", "/.//evil.example", "/..//evil.example", "/%2e//evil.example", "/./\\evil.example", "/\t/evil.example"]) {
      const out = safeReturnPath(bad)
      assert.ok(out.startsWith("/") && !out.startsWith("//") && !out.includes("\\"), `${String(bad)} gave ${out}`)
      assert.equal(new URL(out, "https://www.squareonepaving.com").origin, "https://www.squareonepaving.com", `${String(bad)} left the site`)
    }
  })

  await check("a photograph is clickable only in the preview", () => {
    assert.equal(editAttr(false, { _id: "pageHero-about", _type: "pageHero" }, "image"), undefined)
    assert.equal(editAttr(true, null, "image"), undefined)
    const attr = editAttr(true, { _id: "drafts.pageHero-about", _type: "pageHero" }, "image") ?? ""
    assert.ok(attr.includes("pageHero-about") && !attr.includes("drafts."), attr)
    assert.ok(attr.includes("pageHero") && attr.includes("image"), attr)
  })

  const ctx = (doc: Record<string, unknown>) => ({ document: doc }) as unknown as Parameters<typeof copyCheck>[1]
  const fresh = ctx({ _type: "post", date: "2026-10-20" })

  await check("the style warnings speak up on new writing", () => {
    assert.notEqual(copyCheck("Fast — and built to last.", fresh), true)
    assert.notEqual(copyCheck("It isn't just a crosswalk. It's a landmark.", fresh), true)
    assert.notEqual(headingCheck("Where The Colour Goes", fresh), true)
    assert.equal(copyCheck("Installed at Beban Park, Nanaimo, in 2025.", fresh), true)
    assert.equal(headingCheck("Where the colour goes", fresh), true)
  })

  await check("and stay quiet on the library imported from the old site", () => {
    const imported = ctx({ _type: "post", date: "2024-05-01" })
    assert.equal(copyCheck("It isn't just a crosswalk. It's a landmark.", imported), true)
    const body = [{ _type: "block", _key: "p1", children: [{ _type: "span", text: "It isn't just a crosswalk. It's a landmark." }] }]
    assert.equal(bodyCheck(body as never, imported), true)
  })

  await check("a body warning sits beside its own paragraph", () => {
    const body = [
      { _type: "block", _key: "ok1", children: [{ _type: "span", text: "Installed at Beban Park in 2025." }] },
      { _type: "block", _key: "bad", children: [{ _type: "span", text: "Durable — and bright." }] },
    ]
    const r = bodyCheck(body as never, fresh)
    assert.ok(Array.isArray(r) && r.length === 1, JSON.stringify(r))
    assert.deepEqual((r as { path?: unknown }[])[0].path, [{ _key: "bad" }])
    const story = paragraphsCheck(["Installed at Beban Park.", "Bright — and safe."], fresh)
    assert.ok(Array.isArray(story) && (story as { path?: unknown }[])[0].path?.toString() === "1", JSON.stringify(story))
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
