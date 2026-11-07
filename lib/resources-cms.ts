import { groq } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/client"
import { RESOURCE_PRODUCTS, RESOURCE_TYPES, resourceGroups, type ResourceDoc, type ResourceGroup, type ResourceType } from "@/lib/resources"

/**
 * The document library with the Studio's documents in it (7 Nov 2026; Vern:
 * "put the PDF documents / resources in sanity too … same as hubss").
 * Server-only.
 *
 * lib/resources.ts is the library as the site ships it: the manufacturer's
 * specifications, data sheets, colour cards and SDS in /public/docs, one
 * group per system. The Studio's Documents list (sanity/schemaTypes/
 * resource.ts) holds one document for each of them, seeded by
 * scripts/seed-resources.ts with the site's own copy as its file (`path`),
 * and the office adds to it: a new document is a title, its system, its
 * kind and an uploaded PDF; a replacement is a PDF uploaded into the
 * document that came with the site; "Take off the site" hides one.
 *
 * The Studio wins by document: its title, system and kind over the record's
 * for the same file; an uploaded PDF over the site's copy (served from
 * Sanity's CDN, with its download name, as hubss.com serves its uploads);
 * one with no upload keeps the site's copy, its size and its page-one
 * preview. A Studio document the record doesn't know joins its system's
 * group at the end, and a system only the Studio has (Square One's own
 * papers) is a group of its own after the record's. With nothing in the
 * Studio, or no CMS, this is exactly resourceGroups.
 */

export interface ResourceFileDoc {
  url?: string | null
  originalFilename?: string | null
  size?: number | null
  extension?: string | null
}

export interface ResourceDocument {
  _id?: string
  _type?: string
  title?: string | null
  /** The system's slug, as lib/resources.ts RESOURCE_PRODUCTS names it ("streetbond"). */
  product?: string | null
  type?: string | null
  /** The site's own copy, the record's href (a path under the site's docs folder); the seed sets it, the office never types it. */
  path?: string | null
  hub?: string | null
  hidden?: boolean | null
  file?: ResourceFileDoc | null
}

const QUERY = groq`*[_type == "resource"] | order(_createdAt asc) {
  _id, _type, title, product, type, path, hub, hidden,
  "file": file.asset->{ url, originalFilename, size, extension }
}`

const TYPES = new Set<string>(RESOURCE_TYPES)
const PRODUCT_BY_SLUG = new Map(RESOURCE_PRODUCTS.map((p) => [p.slug, p.product]))

const text = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : undefined)

/** A file's size the way the record writes it: "691 KB", "4.6 MB". */
export function humanSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "PDF"
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * A Studio upload's two addresses: Sanity's CDN sends the file as a download
 * when asked for it by name (`?dl=`), and shows it in the browser without.
 */
export function uploadHrefs(file: ResourceFileDoc): { href: string; open: string } | null {
  const url = text(file.url)
  if (!url) return null
  const ext = text(file.extension) ?? "pdf"
  const name = text(file.originalFilename) ?? `document.${ext}`
  return { href: `${url}?dl=${encodeURIComponent(name)}`, open: url }
}

/** The Studio's document as the library lists it, or null when it can't be listed (no title, system, kind or file). */
function fromDoc(d: ResourceDocument, record: Map<string, ResourceDoc>): { product: string; doc: ResourceDoc } | null {
  const name = text(d.title)
  const product = text(d.product)
  const type = text(d.type)
  if (!name || !product || !PRODUCT_BY_SLUG.has(product) || !type || !TYPES.has(type)) return null
  const path = text(d.path)
  const own = path ? record.get(path) : undefined
  const upload = d.file ? uploadHrefs(d.file) : null
  const hub = text(d.hub) ?? own?.hub
  if (upload) {
    return {
      product,
      doc: { name, href: upload.href, open: upload.open, type: type as ResourceType, size: humanSize(d.file?.size ?? 0), ...(hub ? { hub } : {}) },
    }
  }
  // No upload: the site's own copy, which has to be one the site has.
  if (!own) return null
  return { product, doc: { name, href: own.href, type: type as ResourceType, size: own.size, ...(hub ? { hub } : {}) } }
}

/** The record with the Studio's documents placed in it and its removals taken out. Pure, for the tests. */
export function mergeResources(record: ResourceGroup[], docs: ResourceDocument[] | null): ResourceGroup[] {
  if (!docs?.length) return record
  const byPath = new Map<string, ResourceDoc>()
  for (const g of record) for (const d of g.docs) byPath.set(d.href, d)

  // The Studio's say on each file the site ships: hidden, or its document.
  // Two Studio documents for one file (a Duplicate in the Studio): the
  // first made is the one the site reads.
  const studioByPath = new Map<string, ResourceDocument>()
  const added = new Map<string, ResourceDoc[]>()
  const place = (product: string, doc: ResourceDoc) => added.set(product, [...(added.get(product) ?? []), doc])
  for (const d of docs) {
    const path = text(d.path)
    if (path && byPath.has(path)) {
      if (!studioByPath.has(path)) studioByPath.set(path, d)
      continue
    }
    if (d.hidden) continue
    const out = fromDoc(d, byPath)
    if (out) place(out.product, out.doc)
  }

  // First every group's own documents (a document moved to another system
  // joins that system's additions, whichever way it moves), then the groups.
  const kept = new Map<string, ResourceDoc[]>()
  for (const g of record) {
    const own: ResourceDoc[] = []
    for (const d of g.docs) {
      const studio = studioByPath.get(d.href)
      if (!studio) {
        own.push(d)
        continue
      }
      if (studio.hidden) continue
      const out = fromDoc(studio, byPath)
      if (!out) {
        own.push(d)
        continue
      }
      if (out.product === g.slug) own.push(out.doc)
      else place(out.product, out.doc)
    }
    kept.set(g.slug, own)
  }
  const groups: ResourceGroup[] = record.map((g) => ({ ...g, docs: [...(kept.get(g.slug) ?? []), ...(added.get(g.slug) ?? [])] }))
  const known = new Set(record.map((g) => g.slug))
  for (const { product, slug } of RESOURCE_PRODUCTS) {
    const docs = added.get(slug)
    if (!known.has(slug) && docs?.length) groups.push({ product, slug, docs })
  }
  return groups.filter((g) => g.docs.length > 0)
}

/** The library as the site stands: the record with the Studio's documents in it. */
export async function getResourceGroups(): Promise<ResourceGroup[]> {
  const docs = await sanityFetch<ResourceDocument[]>(QUERY, {}, ["sanity", "resources"])
  return mergeResources(resourceGroups, docs)
}

/** How many documents the library lists. */
export const countResources = (groups: ResourceGroup[]): number => groups.reduce((n, g) => n + g.docs.length, 0)
