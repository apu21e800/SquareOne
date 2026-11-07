/**
 * Tests for the document library from the Studio (lib/resources-cms.ts):
 * `npm run test:resources`.
 *
 * 7 Nov 2026 (Vern: "put the PDF documents / resources in sanity too … same
 * as hubss"): the Studio's Documents list over the record (lib/resources.ts),
 * document by document. The cases are what the office will do: nothing yet
 * (the record, exactly); the seed's copy of every document (the same
 * library); a renamed document; a PDF uploaded over the site's copy; a new
 * document for a system; Square One's own papers under a system of their
 * own; a document taken off; and the half-filled ones that must never take
 * the page down. No network.
 */
import "./test-env"
import assert from "node:assert/strict"
import { RESOURCE_PRODUCTS, RESOURCE_TYPES, resourceCount, resourceGroups, resourceId, type ResourceGroup } from "../lib/resources"
import { countResources, humanSize, mergeResources, uploadHrefs, type ResourceDocument } from "../lib/resources-cms"

let failures = 0
function check(name: string, fn: () => void) {
  try {
    fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

/** The Studio's copy of every document, as scripts/seed-resources.ts makes it. */
const seeded = (): ResourceDocument[] =>
  resourceGroups.flatMap((g) =>
    g.docs.map((d) => ({ _id: resourceId(d.href), _type: "resource", title: d.name, product: g.slug, type: d.type, path: d.href, hidden: false, ...(d.hub ? { hub: d.hub } : {}) })),
  )
const upload = { url: "https://cdn.sanity.io/files/g4yp3p0k/production/abc123def.pdf", originalFilename: "Square One COI 2026.pdf", size: 734003, extension: "pdf" }
const flat = (groups: ResourceGroup[]) => groups.flatMap((g) => g.docs.map((d) => `${g.slug}|${d.href}`))

console.log("the record")
check("106 documents in eight groups, every one a file under /docs with a size", () => {
  assert.equal(resourceCount, 106)
  assert.equal(resourceGroups.length, 8)
  for (const g of resourceGroups) for (const d of g.docs) {
    assert.ok(d.href.startsWith("/docs/"), d.href)
    assert.match(d.size, /^\d+(\.\d)? (KB|MB)$/, d.name)
    assert.ok(RESOURCE_TYPES.includes(d.type), d.name)
  }
})
check("the Studio's systems are the record's groups, then Square One's own papers", () => {
  assert.deepEqual(
    RESOURCE_PRODUCTS.map((p) => p.slug),
    [...resourceGroups.map((g) => g.slug), "square-one"],
  )
})
check("ids: one per file, never two the same, the previews' key", () => {
  const ids = seeded().map((d) => d._id)
  assert.equal(new Set(ids).size, ids.length)
  assert.equal(resourceId("/docs/StreetBond/Streetbond-Colour-Guide-.pdf"), "resource-streetbond-streetbond-colour-guide")
  assert.equal(resourceId("/docs/StreetBond%20120/A%20B.pdf"), "resource-streetbond-120-a-b")
})

console.log("nothing changes until someone edits")
check("no CMS (or Sanity unreachable): the record, exactly", () => assert.strictEqual(mergeResources(resourceGroups, null), resourceGroups))
check("an empty Studio: the same", () => assert.strictEqual(mergeResources(resourceGroups, []), resourceGroups))
check("the seed's copy of every document: the same library, in the same order, the sizes and the manufacturer's copies kept", () => {
  const out = mergeResources(resourceGroups, seeded())
  assert.deepEqual(out, resourceGroups)
})

console.log("what the office does")
check("a renamed document keeps its place, its file and its size", () => {
  const docs = seeded()
  const d = docs.find((x) => x.path === "/docs/StreetBond/Streetbond-Colour-Guide-.pdf")!
  d.title = "StreetBond colour guide (2026)"
  const out = mergeResources(resourceGroups, docs)
  assert.deepEqual(flat(out), flat(resourceGroups), "the same documents in the same order")
  const row = out[0].docs[0]
  assert.equal(row.name, "StreetBond colour guide (2026)")
  assert.equal(row.href, "/docs/StreetBond/Streetbond-Colour-Guide-.pdf")
  assert.equal(row.size, "691 KB")
  assert.equal(row.open, undefined, "the site's own copy opens at its own address")
})
check("a PDF uploaded over the site's copy: served from the CDN with its download name, its size from the upload", () => {
  const docs = seeded()
  const d = docs.find((x) => x.path === "/docs/StreetBond/Streetbond-Colour-Guide-.pdf")!
  d.file = { ...upload, originalFilename: "Streetbond-Colour-Guide-2026.pdf", size: 812345 }
  const row = mergeResources(resourceGroups, docs)[0].docs[0]
  assert.equal(row.href, "https://cdn.sanity.io/files/g4yp3p0k/production/abc123def.pdf?dl=Streetbond-Colour-Guide-2026.pdf")
  assert.equal(row.open, "https://cdn.sanity.io/files/g4yp3p0k/production/abc123def.pdf")
  assert.equal(row.size, "793 KB")
  assert.equal(row.type, "Colour card")
})
check("a new document for a system joins that group at the end", () => {
  const docs = [...seeded(), { _id: "r1", _type: "resource", title: "DecoMark Colour Guide (2026)", product: "decomark", type: "Colour card", file: upload }]
  const out = mergeResources(resourceGroups, docs)
  const group = out.find((g) => g.slug === "decomark")!
  const record = resourceGroups.find((g) => g.slug === "decomark")!
  assert.equal(group.docs.length, record.docs.length + 1)
  assert.equal(group.docs[group.docs.length - 1].name, "DecoMark Colour Guide (2026)")
  assert.equal(countResources(out), resourceCount + 1)
})
check("Square One's own papers: a group of their own, after the record's", () => {
  const docs = [...seeded(), { _id: "r2", _type: "resource", title: "Certificate of insurance", product: "square-one", type: "Technical info", file: upload }]
  const out = mergeResources(resourceGroups, docs)
  assert.equal(out.length, resourceGroups.length + 1)
  const last = out[out.length - 1]
  assert.equal(last.product, "Square One")
  assert.equal(last.slug, "square-one")
  assert.equal(last.docs[0].size, "717 KB")
  assert.equal(last.docs[0].href, `${upload.url}?dl=Square%20One%20COI%202026.pdf`)
})
check("Take off the site: the document is gone from the library, and an empty group with it", () => {
  const docs = seeded()
  for (const d of docs) if (d.product === "durashield") d.hidden = true
  const first = docs.find((x) => x.product === "streetbond")!
  first.hidden = true
  const out = mergeResources(resourceGroups, docs)
  assert.ok(!out.some((g) => g.slug === "durashield"), "no empty group")
  assert.ok(!out.some((g) => g.docs.some((d) => d.href === first.path)), "the hidden one is out")
  const durashield = resourceGroups.find((g) => g.slug === "durashield")!.docs.length
  assert.equal(countResources(out), resourceCount - durashield - 1)
})
check("moved to another system in the Studio: it leaves its group and joins the other's end, whichever way it moves", () => {
  const docs = seeded()
  const d = docs.find((x) => x.path === "/docs/StreetBond/Streetbond-Colour-Guide-.pdf")!
  d.product = "streetprint"
  const out = mergeResources(resourceGroups, docs)
  assert.ok(!out[0].docs.some((x) => x.href === d.path))
  const sp = out.find((g) => g.slug === "streetprint")!
  assert.equal(sp.docs[sp.docs.length - 1].href, d.path)
  assert.equal(countResources(out), resourceCount)
  // And back the other way (the review of 7 Nov 2026 found a document moved to an earlier group vanished).
  const back = seeded()
  const last = resourceGroups[resourceGroups.length - 1]
  const b = back.find((x) => x.path === last.docs[0].href)!
  b.product = resourceGroups[0].slug
  const out2 = mergeResources(resourceGroups, back)
  assert.equal(countResources(out2), resourceCount, "nothing lost")
  assert.equal(out2[0].docs[out2[0].docs.length - 1].href, b.path, "at the end of the earlier group")
  assert.ok(!out2.find((g) => g.slug === last.slug)!.docs.some((x) => x.href === b.path))
})
check("two Studio documents for one file (a Duplicate): the first made is the one the site reads", () => {
  const docs = seeded()
  const d = docs.find((x) => x.path === "/docs/StreetBond/Streetbond-Colour-Guide-.pdf")!
  d.title = "The first"
  docs.push({ ...d, _id: "a-duplicate", title: "The duplicate", hidden: true })
  const out = mergeResources(resourceGroups, docs)
  assert.equal(out[0].docs[0].name, "The first")
  assert.equal(countResources(out), resourceCount)
})

console.log("what must never take the page down")
check("a document with no title, no system, an unknown system or kind, or neither a file nor a copy is left out, the rest untouched", () => {
  const docs: ResourceDocument[] = [
    { _id: "a", title: "", product: "streetbond", type: "SDS", file: upload },
    { _id: "b", title: "No system", product: null, type: "SDS", file: upload },
    { _id: "c", title: "Unknown system", product: "mmax", type: "SDS", file: upload },
    { _id: "d", title: "Unknown kind", product: "streetbond", type: "Flyer", file: upload },
    { _id: "e", title: "Nothing to serve", product: "streetbond", type: "SDS" },
    { _id: "f", title: "A path the site no longer has", product: "streetbond", type: "SDS", path: "/docs/StreetBond/gone.pdf" },
    { _id: "g", title: "Half an upload", product: "streetbond", type: "SDS", file: { url: null } },
  ]
  assert.deepEqual(mergeResources(resourceGroups, docs), resourceGroups)
})
check("sizes read as the record writes them", () => {
  assert.equal(humanSize(707584), "691 KB")
  assert.equal(humanSize(4823449), "4.6 MB")
  assert.equal(humanSize(0), "PDF")
  assert.equal(uploadHrefs({ url: null }), null)
  assert.deepEqual(uploadHrefs({ url: "https://cdn.sanity.io/files/x/y/z.pdf", extension: "pdf" }), { href: "https://cdn.sanity.io/files/x/y/z.pdf?dl=document.pdf", open: "https://cdn.sanity.io/files/x/y/z.pdf" })
})

console.log(failures ? `\n${failures} failed` : "\nall passed")
process.exit(failures ? 1 : 0)
