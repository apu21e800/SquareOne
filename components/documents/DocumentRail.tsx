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
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): a hairline row, not a
 * tinted one — the name in the reading face, the meta line in the small
 * voice, the two actions as underlined words. No pills, no icons, no orange.
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
    <li className="group flex flex-wrap items-center gap-x-5 gap-y-3 py-[14px]">
      <button type="button" onClick={open} aria-label={`Preview ${doc.name}`} className="shrink-0 cursor-pointer">
        <DocThumb href={doc.href} type={doc.type} />
      </button>

      <button type="button" onClick={open} className="min-w-0 flex-1 cursor-pointer text-left">
        <span className="block truncate text-[16px] leading-[1.5] text-ink decoration-1 decoration-[color:var(--hairline-strong)] underline-offset-[5px] group-hover:underline max-[700px]:whitespace-normal">
          {doc.name}
        </span>
        <span className="mt-[2px] block text-[14.5px] italic leading-[1.5] text-ink-muted">
          {showProduct ? <>{product} &middot; </> : null}
          {doc.type} &middot; {doc.size}
        </span>
      </button>

      {/* Phones: the two actions drop under the title as one row, indented
          past the thumbnail. */}
      <span className="flex shrink-0 items-center gap-x-6 max-[700px]:basis-full max-[700px]:pl-[64px]">
        <button type="button" onClick={open} aria-label={`Preview ${doc.name}`} className="link cursor-pointer">
          Preview
        </button>
        <a href={doc.href} download aria-label={`Download ${doc.name} (${doc.size})`} className="link">
          Download
        </a>
      </span>
    </li>
  )
}

/**
 * The typed document rail on a product page: the system's documents grouped
 * by what they are for, specifications first, each group with one line of
 * plain-language guidance in the small voice. The product pages have not
 * rendered it since 16 Sept 2026 (the client: documents on /resources only);
 * it stays here, restyled, for the day a page wants it back.
 */
export default function DocumentRail({ docs, product }: { docs: ResourceDoc[]; product: string }) {
  const [target, setTarget] = useState<PreviewTarget | null>(null)
  const groups = TYPE_ORDER.map((type) => ({ type, docs: docs.filter((d) => d.type === type) })).filter((g) => g.docs.length > 0)

  return (
    <>
      {target && <DocPreviewModal target={target} onClose={() => setTarget(null)} />}
      <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-[900px]:grid-cols-1">
        {groups.map((g) => (
          <section key={g.type} className="col-span-12 grid grid-cols-subgrid max-[900px]:col-span-1 max-[900px]:block" aria-label={`${product} — ${g.type}`}>
            <div className="col-span-3 max-[900px]:mb-3">
              <h3 className="label">{g.type}</h3>
              <p className="mt-2 max-w-[28ch] text-[14.5px] italic leading-[1.6] text-ink-muted">{TYPE_NOTE[g.type]}</p>
            </div>
            <ul className="col-span-9 divide-y divide-hairline border-t border-hairline max-[900px]:col-span-1" role="list">
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
