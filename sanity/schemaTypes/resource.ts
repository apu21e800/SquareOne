import { defineField, defineType, type ValidationContext } from "sanity"
import { ICONS } from "../icons"
import { copyCheck } from "./style"
import { RESOURCE_PRODUCTS, RESOURCE_TYPES } from "../../lib/resources"

/**
 * A document in the specification library (7 Nov 2026; Vern: "put the PDF
 * documents / resources in sanity too … same as hubss"): a spec sheet, data
 * sheet, colour card, SDS, guide or brochure on /resources. The site reads
 * these through lib/resources-cms.ts, the Studio's over the record's
 * (lib/resources.ts) document by document.
 *
 * The 106 documents the site shipped with are here already, each with "The
 * site's own copy" filled in by scripts/seed-resources.ts: their words can
 * be changed, a PDF uploaded replaces the file, and "Take off the site"
 * hides one. A new document is its name, its system, what it is and the
 * uploaded PDF. Nothing here deletes a file: the site's copies stay in
 * /public/docs, and Sanity keeps every upload.
 */

const PRODUCTS = RESOURCE_PRODUCTS.map((p) => ({ title: p.product, value: p.slug }))
const TYPES = RESOURCE_TYPES.map((t) => ({ title: t, value: t }))
const PRODUCT_NAME = new Map(RESOURCE_PRODUCTS.map((p) => [p.slug, p.product]))

/** The PDF: an upload, or the site's own copy that came with the document. */
function fileOrOwnCopy(value: unknown, context: ValidationContext): true | string {
  const upload = (value as { asset?: unknown } | undefined)?.asset
  const path = (context.document as { path?: unknown } | undefined)?.path
  return upload || (typeof path === "string" && path.trim()) ? true : "Upload the PDF"
}

export const resource = defineType({
  name: "resource",
  title: "Document",
  type: "document",
  icon: ICONS.resource,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Name",
      description: "As the library lists it, e.g. “StreetBond Colour Guide” or “TDS: DuraShield Solar Gray (Part A + B)”.",
      validation: (r) => [r.required().error("Give the document a name"), r.max(110), r.custom(copyCheck).warning()],
    }),
    defineField({
      name: "product",
      type: "string",
      title: "System",
      description: "Which system the document belongs to. Square One's own papers (insurance, WCB, capabilities) go under Square One.",
      options: { list: PRODUCTS },
      validation: (r) => r.required().error("Pick the system"),
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Kind of document",
      options: { list: TYPES, layout: "radio", direction: "horizontal" },
      validation: (r) => r.required().error("Pick what the document is"),
    }),
    defineField({
      name: "file",
      type: "file",
      title: "The PDF",
      description: "Upload the PDF. On a document that came with the site, an upload replaces the site's own copy; leave it empty and the site keeps serving that copy.",
      options: { accept: ".pdf,application/pdf" },
      validation: (r) => r.custom(fileOrOwnCopy),
    }),
    defineField({
      name: "path",
      type: "string",
      title: "The site's own copy",
      description: "The file this document came with, served from the site. Upload a PDF above to replace it.",
      readOnly: true,
      hidden: ({ document }) => !(document as { path?: unknown } | undefined)?.path,
    }),
    defineField({
      name: "hub",
      type: "url",
      title: "The manufacturer's copy (optional)",
      description: "The same document on the manufacturer's own site, where it keeps it current. For the record only: never shown to visitors.",
      validation: (r) => r.uri({ scheme: ["https"] }),
    }),
    defineField({ name: "hidden", type: "boolean", title: "Take off the site", initialValue: false, description: "Hides the document everywhere on the site. Nothing is deleted." }),
  ],
  preview: {
    select: { title: "title", product: "product", type: "type", hidden: "hidden" },
    prepare: ({ title, product, type, hidden }: { title?: string; product?: string; type?: string; hidden?: boolean }) => ({
      title: `${hidden ? "(Off the site) " : ""}${title ?? "Document"}`,
      subtitle: [product ? PRODUCT_NAME.get(product) ?? product : undefined, type].filter(Boolean).join(" · "),
    }),
  },
})
