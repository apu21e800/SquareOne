/**
 * The document library into the Studio (7 Nov 2026; Vern: "put the PDF
 * documents / resources in sanity too … same as hubss").
 *
 * One Studio document (sanity/schemaTypes/resource.ts) for each of the
 * documents the site ships with (lib/resources.ts): its name, its system,
 * what it is, the manufacturer's copy where the record has one, and "The
 * site's own copy", the file in /public/docs the site keeps serving until
 * the office uploads a replacement. Nothing is uploaded here: the files stay
 * on the site, as hubss.com's did when its library went into the Studio.
 *
 * Ids are fixed (`resource-` and the file's name, as the page-one previews
 * are keyed), so a second run makes nothing new: a document that exists is
 * left exactly as it is, whatever the office has changed in it, and one the
 * office has unpublished (a draft alone) is left unpublished.
 *
 * Run from the site's folder, signed in to Sanity (`npx sanity login`). The
 * script's own flag goes after "--":
 *   npx sanity exec scripts/seed-resources.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed-resources.ts --with-user-token
 */
import { createClient, type SanityClient } from "next-sanity"
import { resourceGroups, resourceId } from "../lib/resources"

const DRY_RUN = process.argv.includes("--dry-run")
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN

async function main() {
  if (!token && !DRY_RUN) {
    console.error("No Sanity login: run it as `npx sanity exec scripts/seed-resources.ts --with-user-token` from the site's folder (after `npx sanity login`).")
    process.exit(1)
  }
  const docs = resourceGroups.flatMap((g) =>
    g.docs.map((d) => ({
      _id: resourceId(d.href),
      _type: "resource",
      title: d.name,
      product: g.slug,
      type: d.type,
      path: d.href,
      hidden: false,
      ...(d.hub ? { hub: d.hub } : {}),
    })),
  )
  const ids = new Set(docs.map((d) => d._id))
  if (ids.size !== docs.length) {
    console.error("Two documents would share an id; nothing written.")
    process.exit(1)
  }
  const client: SanityClient = createClient({ projectId: "g4yp3p0k", dataset: "production", apiVersion: "2025-06-01", useCdn: false, perspective: "raw", token })
  // A document the office has unpublished is a draft alone ("drafts." and
  // the id): it counts as there, so a second run never puts it back on the site.
  const found = await client.fetch<string[]>(`*[_type == "resource" && (_id in $ids || _id in $draftIds)]._id`, { ids: [...ids], draftIds: [...ids].map((id) => `drafts.${id}`) })
  const existing = new Set(found.map((id) => id.replace(/^drafts\./, "")))
  const unpublished = new Set(found.filter((id) => id.startsWith("drafts.")).map((id) => id.replace(/^drafts\./, "")).filter((id) => !found.includes(id)))
  const fresh = docs.filter((d) => !existing.has(d._id))
  for (const d of docs) console.log(`${unpublished.has(d._id) ? "unpublished in the Studio, left alone" : existing.has(d._id) ? "kept " : "new  "} ${d._id}  ${d.title}  (${d.product} · ${d.type})`)
  console.log(`\n${docs.length} documents in the record: ${existing.size} already in the Studio, ${fresh.length} to make.`)
  if (!fresh.length) return
  if (DRY_RUN) {
    console.log("Dry run: nothing made. Run again without --dry-run to make them.")
    return
  }
  const tx = client.transaction()
  for (const d of fresh) tx.createIfNotExists(d)
  const result = await tx.commit()
  console.log(`${fresh.length} made (transaction ${result.transactionId}). The Studio's Documents list has them; the site reads them within a minute.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
