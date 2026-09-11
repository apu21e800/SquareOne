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
 * three things a specifier does next — download the PDF, open it in the
 * browser, or fetch HUB's current edition. No PDF is rendered client-side,
 * so this is instant on a phone and never depends on a plugin.
 *
 * Accessibility: role=dialog, labelled by the title, Escape and the scrim
 * close it, focus lands on Close and returns to the opener on close, and
 * the page behind stops scrolling while it is open.
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
        className="doc-modal-panel grid h-[calc(100dvh-2rem)] w-full max-w-[1060px] grid-cols-[minmax(0,1fr)_340px] overflow-hidden rounded-[2px] bg-white shadow-[var(--shadow-lift)] max-[900px]:h-auto max-[900px]:max-h-[92dvh] max-[900px]:grid-cols-1 max-[900px]:overflow-y-auto"
      >
        {/* ── The page ──────── */}
        <div className="relative flex min-h-0 items-start justify-center overflow-y-auto bg-[color:var(--surface-stone)] p-6 max-[900px]:max-h-[52dvh] max-[900px]:p-4">
          {p && !failed ? (
            <Image
              src={p.preview}
              alt={`Page one of ${doc.name}`}
              width={p.w}
              height={p.h}
              unoptimized
              priority
              onError={() => setFailed(true)}
              className="h-auto w-full max-w-[720px] border border-[color:var(--hairline)] bg-white shadow-[var(--shadow-rest)]"
            />
          ) : (
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-4 text-center">
              <p className="max-w-[36ch] text-[15px] leading-[1.6] text-[color:var(--ink-body)]">
                No preview for this document yet — open the PDF itself.
              </p>
              <a href={doc.href} target="_blank" rel="noopener noreferrer" className="arrow-link">
                Open the PDF <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </div>

        {/* ── The rail ──────── */}
        <div className="flex min-h-0 flex-col overflow-y-auto border-l border-[color:var(--hairline)] max-[900px]:border-l-0 max-[900px]:border-t">
          <div className="flex items-start justify-between gap-4 px-7 pt-6 max-[900px]:px-5 max-[900px]:pt-5">
            <div className="min-w-0">
              <div className="label">{product}</div>
              <h2 id="doc-modal-title" className="mt-3 text-[20px] normal-case leading-[1.3] font-semibold tracking-normal text-[color:var(--ink)] [text-wrap:pretty]">
                {doc.name}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.5] text-[color:var(--ink-muted)]">
                {doc.type} &middot; PDF &middot; {doc.size}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] text-[color:var(--ink-muted)] transition-colors hover:bg-[color:var(--surface-stone)] hover:text-[color:var(--ink)]"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-7 flex flex-col gap-2 px-7 max-[900px]:px-5">
            <a
              href={doc.href}
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-[color:var(--ink)] px-5 text-[13px] font-semibold tracking-[0.06em] text-white no-underline transition-colors hover:bg-[color:var(--accent-deep)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Download PDF
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
                <path d="M6 1v8M2.5 5.5L6 9l3.5-3.5M1.5 11h9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] border border-[color:var(--hairline-strong)] px-5 text-[13px] font-semibold tracking-[0.06em] text-[color:var(--ink)] no-underline transition-colors hover:border-[color:var(--ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Open in the browser
              <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12">
                <path d="M2 10L10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="mt-auto px-7 pb-7 pt-8 max-[900px]:px-5 max-[900px]:pb-5">
            {/* Only where the same file is verified on hubss.com — no
                attribution is written for the rest, because not every
                document here is HUB's own (some carry the thermoplastic
                maker's name), and we do not guess. */}
            {doc.hub ? (
              <p className="text-[13px] leading-[1.6] text-[color:var(--ink-muted)]">
                HUB Surface Systems keeps the current edition of this document on their site.{" "}
                <a
                  href={doc.hub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
                >
                  Current edition at HUB&nbsp;&#8599;
                </a>
              </p>
            ) : (
              <p className="text-[13px] leading-[1.6] text-[color:var(--ink-muted)]">
                Page one shown. The PDF carries the full document.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
