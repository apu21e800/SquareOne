"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { ResourceDoc } from "@/lib/resources"
import { previewFor } from "@/lib/doc-previews"

export interface PreviewTarget {
  doc: ResourceDoc
  product: string
}

/**
 * The document, opened in place: page one pre-rendered at 1000px, with the
 * two things a specifier does next — download the PDF, or open it in the
 * browser. No PDF is rendered client-side,
 * so this is instant on a phone and never depends on a plugin.
 *
 * Accessibility: role=dialog, labelled by the title, Escape and the scrim
 * close it, focus lands on Close and returns to the opener on close, and
 * the page behind stops scrolling while it is open.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): restyled only — square
 * corners, the product in the small serif voice, the title in the display
 * face at card scale, one ink button and one underlined word, no arrows.
 * The behaviour above is untouched.
 */
export default function DocPreviewModal({ target, onClose }: { target: PreviewTarget; onClose: () => void }) {
  const { doc, product } = target
  const p = previewFor(doc.href)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="doc-modal fixed inset-0 z-[200] flex items-center justify-center p-4 max-[700px]:items-end max-[700px]:p-0"
      style={{ background: "rgba(24, 21, 18, 0.86)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-modal-title"
        className="doc-modal-panel grid h-[calc(100dvh-2rem)] w-full max-w-[1060px] grid-cols-[minmax(0,1fr)_340px] overflow-hidden bg-white shadow-[var(--shadow-lift)] max-[900px]:h-auto max-[900px]:max-h-[92dvh] max-[900px]:grid-cols-1 max-[900px]:overflow-y-auto"
      >
        {/* ── The page ──────── */}
        <div className="relative flex min-h-0 items-start justify-center overflow-y-auto bg-surface-stone p-6 max-[900px]:max-h-[52dvh] max-[900px]:p-4">
          {p && !failed ? (
            <Image
              src={p.preview}
              alt={`Page one of ${doc.name}`}
              width={p.w}
              height={p.h}
              unoptimized
              priority
              onError={() => setFailed(true)}
              className="h-auto w-full max-w-[720px] border border-hairline bg-white shadow-[var(--shadow-rest)]"
            />
          ) : (
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4 text-center">
              <p className="max-w-[36ch] text-[16px] leading-[1.6] text-ink-body">
                No preview for this document yet: open the PDF itself.
              </p>
              <a href={doc.href} target="_blank" rel="noopener noreferrer" className="link">
                Open the PDF
              </a>
            </div>
          )}
        </div>

        {/* ── The rail ──────── */}
        <div className="flex min-h-0 flex-col overflow-y-auto border-l border-hairline max-[900px]:border-l-0 max-[900px]:border-t">
          <div className="flex items-start justify-between gap-4 px-7 pt-6 max-[900px]:px-5 max-[900px]:pt-5">
            <div className="min-w-0">
              <span className="label">{product}</span>
              <h2 id="doc-modal-title" className="card-title mt-2 text-ink [text-wrap:pretty]">
                {doc.name}
              </h2>
              <p className="mt-2 text-[14.5px] italic leading-[1.5] text-ink-muted">
                {doc.type} &middot; PDF &middot; {doc.size}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-ink-muted transition-colors hover:bg-surface-stone hover:text-ink"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-7 flex flex-col items-start gap-5 px-7 max-[900px]:px-5">
            <a href={doc.href} download className="btn-ink text-center no-underline">
              Download PDF
            </a>
            <a href={doc.href} target="_blank" rel="noopener noreferrer" className="link">
              Open in the browser
            </a>
          </div>

          <div className="mt-auto px-7 pb-7 pt-8 max-[900px]:px-5 max-[900px]:pb-5">
            {/* The "current edition" link to the manufacturer's site came off
                on 19 Sept 2026: the manufacturer is not named or linked
                anywhere on the site. `doc.hub` stays in the data, unrendered. */}
            <p className="text-[14.5px] italic leading-[1.6] text-ink-muted">
              Page one shown. The PDF carries the full document.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
