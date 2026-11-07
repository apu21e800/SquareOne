/**
 * No photograph twice on the Projects page (7 Nov 2026, Vern: "eliminate the
 * duplicate projects and images on the 'Projects' page").
 *
 * Four posts wear a photograph that is another post's, or another site's,
 * and the Studio's lead photograph wins over the code's (lib/blog.ts
 * fromDoc), so the fix is in the Studio. This script makes the same change
 * lib/blog-ledes.ts now records, for each post that still carries the old
 * photograph (a post the office has since given another is left alone):
 *
 *  - "Commercial parking lots: why a coating lasts where paint fails" wore
 *    the Mission parking bays, the lead of Sydney's "Parking lot marking
 *    prep" (6 Nov 2026). It takes the StreetBond parking lot on Kingsway,
 *    Vancouver, from Square One's own gallery.
 *  - "What a well-marked school zone actually does" wore South Langford
 *    Elementary's one photograph, the lead of the South Langford post. It
 *    takes the school crest in DecoMark at Katzie Elementary School.
 *  - "Tsain-Ko Centre crosswalk upgrade" wore the Cowrie Street and Trail
 *    Avenue crossing, the lead of the Sechelt pictograph post. It takes the
 *    old site's own photograph of the Tsain-Ko crossing, the one its words
 *    describe.
 *  - "McKenzie Park, Comox" wore a photograph of Rutland Centennial Park in
 *    Kelowna (the Rutland post's own job photograph). No photograph of the
 *    Comox path is on file, so it runs without one, as seven posts already do,
 *    until Square One sends one.
 *
 * A draft of one of these posts (an editor's unpublished changes) gets the
 * same change, so a later Publish can't bring the old photograph back. Each
 * new photograph is uploaded once; the alt text is written here.
 *
 * Run from the site's folder, signed in to Sanity (`npx sanity login`). The
 * script's own flag goes after "--":
 *   npx sanity exec scripts/fix-lead-photos.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/fix-lead-photos.ts --with-user-token
 *
 * It never deletes a document. "Windsor Gate, phase two" (the same crossing
 * as the Windsor Gate post, told twice) is not here: Unpublish it in the
 * Studio (Blog, the post, the menu beside Publish); its address redirects to
 * the Windsor Gate post (next.config.ts). The one change to a post's words:
 * the Windsor Gate post's paragraph that links to phase two (and to the old
 * project page, which has redirected to the post itself since 6 Nov 2026)
 * keeps its words as the file has them and loses the two links.
 */
import fs from "fs"
import path from "path"
import { createClient, type SanityClient } from "next-sanity"

const DRY_RUN = process.argv.includes("--dry-run")
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN

const OLD = "public/images/S1_update_v2/Old Square One Web Assets"

/** The change each post takes: a photograph of its own (uploaded under `name`, else its own file name), or none. */
const CHANGES: Record<string, { file: string; alt: string; name?: string } | { file: null; why: string }> = {
  "commercial-parking-lot-coatings-bc": {
    file: `${OLD}/Galleries/Parking Lots/Gallery/StreetBond Parking Lot, Kingsway, Vancouver BC.jpg`,
    alt: "Red StreetBond coated parking stalls at a commercial lot on Kingsway, Vancouver, the stall lines and a small-car legend in white",
  },
  "school-zone-thermoplastic-bc": {
    file: `${OLD}/Galleries/Branding & Wayfinding/Gallery/DecoMark Katzie Elementary School.jpg`,
    alt: "The school crest in DecoMark on the asphalt at Katzie Elementary School, a bird in a circle of colour, seen from above",
  },
  "traffic-pattern-crosswalk-upgrade-for-tsain-ko-centre": {
    file: "public/images/blog/tsain-ko-crosswalk-sechelt/featured.jpg",
    name: "tsain-ko-centre-crossing-sechelt.jpg",
    alt: "The Tsain-Ko Centre crossing in Sechelt, an orange design of curved shapes in TrafficPatterns running from the parking lot to the storefronts, artwork panels on the facade above",
  },
  "decorative-asphalt-for-mckenzie-park-in-comox-bc": {
    file: null,
    why: "the only photograph on file is Rutland Centennial Park, Kelowna; none of the Comox path",
  },
}

interface Span {
  _key?: string
  _type?: string
  text?: string
  marks?: string[]
}
interface Block {
  _key?: string
  _type?: string
  children?: Span[]
  markDefs?: { _key?: string; _type?: string; href?: string }[]
}
interface PostDoc {
  _id: string
  title?: string
  slug?: string
  mainFile?: string | null
  mainRef?: string | null
  body?: Block[] | null
}

const POSTS = `*[_type == "post" && slug.current in $slugs]{ _id, title, "slug": slug.current, "mainFile": mainImage.asset->originalFilename, "mainRef": mainImage.asset._ref, body }`

/** The Windsor Gate post: the paragraph that links to phase two keeps its words and loses its links. */
const WINDSOR = "windsor-gate-townhouse-driveway"
const PHASE_TWO = "/blog/windsor-gate-townhouse-driveway-2"
const OLD_SENTENCE = "The project record holds the frame at full size, and we returned for a second phase of laneways matched to this one."
const NEW_SENTENCE = "The other frames are in the photographs below, and we returned for a second phase of laneways matched to this one."

/** The same paragraph as plain words: the sentence the file carries, no links. */
function unlinked(block: Block): Block {
  const words = (block.children ?? []).map((c) => c.text ?? "").join("")
  const text = words.includes(OLD_SENTENCE) ? words.replace(OLD_SENTENCE, NEW_SENTENCE) : words
  const first = block.children?.[0]
  return { ...block, children: [{ _type: "span", _key: first?._key ?? "s1", text, marks: [] }], markDefs: [] }
}

function decoded(name: string): string {
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

async function main() {
  if (!token && !DRY_RUN) {
    console.error("No Sanity login: run it as `npx sanity exec scripts/fix-lead-photos.ts --with-user-token` from the site's folder (after `npx sanity login`).")
    process.exit(1)
  }
  if (!token) console.warn("No Sanity login, so only published posts are read: the real run (--with-user-token) also changes a draft of one of these posts.\n")
  for (const change of Object.values(CHANGES)) {
    if (change.file && !fs.existsSync(change.file)) {
      console.error(`Missing photograph: ${change.file} (run from the site's folder)`)
      process.exit(1)
    }
  }
  const client: SanityClient = createClient({ projectId: "g4yp3p0k", dataset: "production", apiVersion: "2025-06-01", useCdn: false, perspective: "raw", token })
  const posts = await client.fetch<PostDoc[]>(POSTS, { slugs: [...Object.keys(CHANGES), WINDSOR] })
  const uploaded = new Map<string, string>()
  const tx = client.transaction()
  let n = 0
  for (const doc of posts.filter((p) => p.slug === WINDSOR)) {
    const what = doc._id.startsWith("drafts.") ? "the draft" : "the post"
    const i = (doc.body ?? []).findIndex((b) => (b.markDefs ?? []).some((m) => m.href === PHASE_TWO))
    if (i < 0) {
      console.log(`${WINDSOR} (${what}): no link to phase two left`)
      continue
    }
    const block = unlinked((doc.body as Block[])[i])
    console.log(`${WINDSOR} (${what}): the paragraph linking to phase two becomes plain words:\n  ${block.children?.[0]?.text}`)
    const at = block._key ? `body[_key=="${block._key}"]` : `body[${i}]`
    tx.patch(doc._id, (p) => p.set({ [at]: block }))
    n++
  }
  for (const [slug, change] of Object.entries(CHANGES)) {
    const docs = posts.filter((p) => p.slug === slug)
    if (!docs.length) {
      console.log(`${slug}: not in the Studio, nothing to do`)
      continue
    }
    for (const doc of docs) {
      const what = doc._id.startsWith("drafts.") ? "the draft" : "the post"
      if (change.file === null) {
        if (!doc.mainFile) {
          console.log(`${slug} (${what}): already without a photograph`)
          continue
        }
        console.log(`${slug} (${what}): lead photograph removed (${change.why}); was ${decoded(doc.mainFile)}`)
        tx.patch(doc._id, (p) => p.unset(["mainImage"]))
        n++
        continue
      }
      const name = change.name ?? path.basename(change.file)
      if (doc.mainFile && decoded(doc.mainFile) === name) {
        console.log(`${slug} (${what}): already ${name}`)
        continue
      }
      let ref = uploaded.get(change.file)
      if (!ref) {
        if (DRY_RUN) {
          ref = `(image uploaded from ${change.file})`
        } else {
          const asset = await client.assets.upload("image", fs.readFileSync(change.file), { filename: name })
          ref = asset._id
        }
        uploaded.set(change.file, ref)
      }
      // The same bytes upload once (Sanity keeps one asset per file), so a second run finds the ref already set.
      if (doc.mainRef && doc.mainRef === ref) {
        console.log(`${slug} (${what}): already ${name}`)
        continue
      }
      console.log(`${slug} (${what}): lead photograph → ${name}; was ${doc.mainFile ? decoded(doc.mainFile) : "none"}`)
      console.log(`  alt: ${change.alt}`)
      tx.patch(doc._id, (p) => p.set({ mainImage: { _type: "image", asset: { _type: "reference", _ref: ref }, alt: change.alt } }))
      n++
    }
  }
  if (!n) {
    console.log("Nothing to change.")
    return
  }
  if (DRY_RUN) {
    console.log(`\nDry run: ${n} change(s) not made. Run again without --dry-run to make them.`)
    return
  }
  const result = await tx.commit()
  console.log(`\n${n} change(s) made (transaction ${result.transactionId}). The site refreshes itself within a minute.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
