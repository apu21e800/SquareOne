"use client"

import { useState } from "react"
import type { ResourceDoc, ResourceType } from "@/lib/resources"
import DocThumb from "./DocThumb"
import DocPreviewModal, { type PreviewTarget } from "./DocPreviewModal"

export const TYPE_ORDER: ResourceType[] = [
  "Specification",
  "Technical info",
  "SDS",
  "Guide",
  "Colour card",
  "Brochure",
]

/** What the type means to a specifier — one line under each rail heading. */
const TYPE_NOTE: Record<ResourceType, string> = {
  Specification: "Write these into the spec package — the system, its substrate and its tolerances.",
  "Technical info": "Technical data sheets and test findings for the material.",
  SDS: "Safety data sheets for every component on site.",
  Guide: "Design manuals, application instructions and template guidelines.",
  "Colour card": "The published colour ranges.",
  Brochure: "The overview, for owners and councils.",
}

/**
 * One document row — the page-one thumbnail, the name, the meta line and
 * the actions. Preview opens the document in place (DocPreviewModal);
 * Download is same-origin, so the `download` attribute is honoured. The
 * whole name is the preview trigger, so the target is generous.
 */
export function DocRow({
  doc,
  product,
  showProduct = false,
  onPreview,
}: {
  doc: ResourceDoc
  product: string
  showProduct?: boolean
  onPreview: (t: PreviewTarget) => void
}) {
  const open = () => onPreview({ doc, product })
  return (
    <li className="group -mx-2 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[2px] px-2 py-[10px] transition-colors hover:bg-[color:var(--surface-stone)]">
      <button type="button" onClick={open} aria-label={`Preview ${doc.name}`} className="shrink-0 cursor-pointer">
        <DocThumb href={doc.href} type={doc.type} />
      </button>

      <button type="button" onClick={open} className="min-w-0 flex-1 cursor-pointer text-left">
        <span className="block truncate text-[15px] leading-[1.5] font-medium text-[color:var(--ink)] group-hover:text-[color:var(--accent-deep)] max-[700px]:whitespace-normal">
          {doc.name}
        </span>
        <span className="mt-[2px] block text-[12.5px] leading-[1.5] text-[color:var(--ink-muted)]">
          {showProduct ? <>{product} &middot; </> : null}
          {doc.type} &middot; {doc.size}
          {doc.hub ? <> &middot; current at HUB</> : null}
        </span>
      </button>

      {/* Phones: the two actions drop under the title as one full-width row,
          indented past the thumbnail, so each is a proper 40px thumb target. */}
      <span className="flex shrink-0 items-center gap-2 max-[700px]:basis-full max-[700px]:pl-[60px]">
        <button
          type="button"
          onClick={open}
          aria-label={`Preview ${doc.name}`}
          className="inline-flex h-9 cursor-pointer items-center gap-[6px] rounded-[2px] border border-[color:var(--hairline)] px-3 text-[12px] font-semibold tracking-[0.06em] text-[color:var(--ink)] transition-colors hover:border-[color:var(--hairline-strong)] hover:bg-white max-[700px]:h-10 max-[700px]:flex-1 max-[700px]:justify-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Preview
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
            <path d="M1 6s2-3.5 5-3.5S11 6 11 6s-2 3.5-5 3.5S1 6 1 6z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </button>
        <a
          href={doc.href}
          download
          aria-label={`Download ${doc.name} (${doc.size})`}
          className="inline-flex h-9 items-center gap-[6px] rounded-[2px] border border-[color:var(--hairline)] px-3 text-[12px] font-semibold tracking-[0.06em] text-[color:var(--ink)] no-underline transition-colors hover:border-[color:var(--hairline-strong)] hover:bg-white max-[700px]:h-10 max-[700px]:flex-1 max-[700px]:justify-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Download
          <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12">
            <path d="M6 1v8M2.5 5.5L6 9l3.5-3.5M1.5 11h9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </span>
    </li>
  )
}

/**
 * The typed document rail on a product page: the system's documents grouped
 * by what they are for, specifications first, each group with one line of
 * plain-language guidance. hubss.com's per-product downloads are the
 * benchmark; this adds the page-one previews and the type notes.
 */
export default function DocumentRail({ docs, product }: { docs: ResourceDoc[]; product: string }) {
  const [target, setTarget] = useState<PreviewTarget | null>(null)
  const groups = TYPE_ORDER.map((type) => ({ type, docs: docs.filter((d) => d.type === type) })).filter((g) => g.docs.length > 0)

  return (
    <>
      {target && <DocPreviewModal target={target} onClose={() => setTarget(null)} />}
      <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
        {groups.map((g) => (
          <section key={g.type} className="col-span-12 grid grid-cols-subgrid max-[900px]:col-span-1 max-[900px]:block" aria-label={`${product} — ${g.type}`}>
            <div className="col-span-3 max-[900px]:mb-3">
              <h3 className="label">{g.type}</h3>
              <p className="mt-2 max-w-[28ch] text-[13px] leading-[1.6] text-[color:var(--ink-muted)]">{TYPE_NOTE[g.type]}</p>
            </div>
            <ul className="col-span-9 divide-y divide-[color:var(--hairline)] border-t border-[color:var(--hairline)] max-[900px]:col-span-1">
              {g.docs.map((doc) => (
                <DocRow key={doc.href} doc={doc} product={product} onPreview={setTarget} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
