"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  searchEntries,
  tokenize,
  type GroupedResults,
  type SearchEntry,
} from "@/lib/search-score"
import { previewFor } from "@/lib/doc-previews"

/**
 * Sitewide quick search: one input over pages, services, products,
 * applications, projects, the specifications library, the blog and gallery
 * imagery. Opens from the nav icon or Cmd/Ctrl+K. The index is built at
 * compile time and fetched once per session from /api/search-index
 * (force-static JSON).
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): restyled only — square
 * corners, the serif in the input and the rows, the quick links and the
 * "try" words as underlined links instead of chips, the four systems as
 * frames with their names UNDER them instead of over a gradient, no hover
 * zoom, no arrow glyphs, nothing sticky. Behaviour is unchanged.
 */

let INDEX_CACHE: SearchEntry[] | null = null
let INDEX_PROMISE: Promise<SearchEntry[]> | null = null

async function loadIndex(): Promise<SearchEntry[]> {
  if (INDEX_CACHE) return INDEX_CACHE
  if (!INDEX_PROMISE) {
    INDEX_PROMISE = fetch("/api/search-index")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchEntry[]) => {
        INDEX_CACHE = data
        return data
      })
      .catch(() => [])
  }
  return INDEX_PROMISE
}

const QUICK_LINKS = [
  { label: "Systems we install", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Driveways", href: "/driveways" },
  { label: "Specifications & documents", href: "/resources" },
  { label: "Projects", href: "/projects" },
  { label: "Image galleries", href: "/galleries" },
  { label: "Get a quote", href: "/contact" },
]

/** Searches people actually run — a system, a place, a document, a use. */
const TRY_QUERIES = ["StreetBond", "crosswalks", "Victoria", "colour guide", "TrafficPatternsXD", "driveway", "SDS", "bike lane"]

/** The systems, straight from the overlay — photographed. */
const FEATURED = [
  { name: "StreetPrint", note: "Stamped asphalt", href: "/products/streetprint", src: "/images/products/streetprint/streetprint-new-westminster-city-hall-01.jpg" },
  { name: "StreetBond", note: "Decorative coatings", href: "/products/streetbond", src: "/images/products/streetbond/streetbond-multicolour-plaza-transit-dusk-01.jpg" },
  { name: "TrafficPatternsXD", note: "Heavy-duty crosswalks", href: "/products/trafficpatterns-xd", src: "/images/hero/white-rock-marine-drive-wave-crosswalk.jpg" },
  { name: "DecoMark", note: "Shapes and symbols", href: "/products/decomark", src: "/images/products/decomark/decomark-victoria-harbour-01.jpg" },
]

function isDocument(entry: SearchEntry) {
  return entry.type === "document"
}

/** The matched words, emphasised in place — the eye lands on why this row is here. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig")
  const isHit = new RegExp(`^(?:${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})$`, "i")
  const parts = text.split(re)
  return (
    <>
      {parts.map((part, i) =>
        isHit.test(part) ? (
          <mark key={i} className="bg-surface-stone text-inherit">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

/** The thumbnail: a photograph for visual rows, page one for a document. */
function Thumb({ entry }: { entry: SearchEntry }) {
  if (isDocument(entry)) {
    const p = previewFor(entry.href)
    return (
      <span className="relative block h-[58px] w-[44px] shrink-0 overflow-hidden border border-hairline bg-white">
        {p ? (
          <Image src={p.thumb} alt="" width={320} height={Math.round((320 * p.h) / p.w)} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[12px] italic text-ink-muted">
            PDF
          </span>
        )}
      </span>
    )
  }
  if (!entry.image) {
    return <span aria-hidden="true" className="block h-[54px] w-[72px] shrink-0 bg-surface-stone" />
  }
  return (
    <span className="relative block h-[54px] w-[72px] shrink-0 overflow-hidden bg-surface-stone">
      <Image src={entry.image} alt="" fill sizes="72px" className="object-cover" />
    </span>
  )
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState<SearchEntry[] | null>(INDEX_CACHE)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Load the index the first time the overlay opens
  useEffect(() => {
    if (open && !index) loadIndex().then(setIndex)
  }, [open, index])

  // Focus + scroll lock while open
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    document.body.style.overflow = "hidden"
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ""
    }
  }, [open])

  // Reset per open
  useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
    }
  }, [open])

  const { groups, total } = useMemo(
    () => (index ? searchEntries(index, query, 5) : { groups: [] as GroupedResults[], total: 0 }),
    [index, query],
  )

  const flat = useMemo(() => groups.flatMap((g) => g.entries), [groups])
  const terms = useMemo(() => tokenize(query), [query])

  useEffect(() => setActive(0), [query])

  const openEntry = useCallback(
    (entry: SearchEntry) => {
      if (isDocument(entry)) {
        window.open(entry.href, "_blank", "noopener,noreferrer")
        return
      }
      onClose()
      router.push(entry.href)
    },
    [onClose, router],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
      if (flat.length === 0) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((a) => (a + 1) % flat.length)
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((a) => (a - 1 + flat.length) % flat.length)
      }
      if (e.key === "Enter" && flat[active]) {
        e.preventDefault()
        openEntry(flat[active])
      }
    },
    [flat, active, onClose, openEntry],
  )

  // Keep the active row in view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: "nearest" })
  }, [active])

  if (!open) return null

  let idx = -1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
      className="fixed inset-0 z-[400] flex flex-col bg-surface"
      onKeyDown={onKeyDown}
    >
      {/* ── Input bar ── */}
      <div className="shrink-0 border-b border-hairline">
        <div className="container-1280 flex h-[72px] items-center gap-4">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" className="shrink-0 text-ink-muted">
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, projects, documents, places…"
            aria-label="Search the site"
            className="search-input min-w-0 flex-1 border-0 bg-transparent text-[19px] text-ink outline-none placeholder:text-ink-muted max-[700px]:text-[17px]"
            style={{ fontFamily: "var(--font-text)" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              className="link"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="ml-2 flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-surface-stone"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <div ref={listRef} className="flex-1 overflow-y-auto">
        <div className="container-1280 py-8">
          {query.trim() === "" ? (
            <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-[900px]:grid-cols-1">
              <div className="col-span-5 max-[900px]:col-span-1">
                <span className="label">Go straight to</span>
                <ul className="mt-3 flex flex-col items-start gap-y-2">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose()
                          router.push(link.href)
                        }}
                        className="link"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>

                <span className="label mt-10">Try</span>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {TRY_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        setQuery(q)
                        inputRef.current?.focus()
                      }}
                      className="link"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-7 max-[900px]:col-span-1">
                <span className="label">The systems</span>
                <ul className="mt-3 grid grid-cols-4 gap-x-5 gap-y-6 max-[700px]:grid-cols-2">
                  {FEATURED.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href} onClick={onClose} className="block">
                        <figure className="m-0">
                          <span className="relative block aspect-[4/5] w-full overflow-hidden bg-surface-stone">
                            <Image src={f.src} alt="" fill sizes="(max-width: 700px) 45vw, 200px" className="object-cover" />
                          </span>
                          <figcaption className="cap">
                            <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                              {f.name}
                            </span>
                            <span className="block">{f.note}</span>
                          </figcaption>
                        </figure>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : !index ? (
            <p className="text-[15px] italic text-ink-muted">Loading the index…</p>
          ) : total === 0 ? (
            <p className="text-[15px] italic text-ink-muted">
              Nothing for &ldquo;{query}&rdquo;, try a product, city or system name.
            </p>
          ) : (
            <div className="flex flex-col gap-9">
              {groups.map((group) => (
                <div key={group.type}>
                  <div className="flex items-baseline justify-between border-b border-hairline pt-1 pb-2">
                    <span className="label">{group.label}</span>
                    <span className="text-[14px] italic text-ink-muted tabular-nums">{group.total}</span>
                  </div>
                  <div className="mt-1">
                    {group.entries.map((entry) => {
                      idx += 1
                      const i = idx
                      return (
                        <div
                          key={`${entry.type}-${entry.href}-${entry.title}`}
                          data-idx={i}
                          className={`flex items-center gap-4 px-2 py-[8px] ${i === active ? "bg-surface-warm" : ""}`}
                          onMouseEnter={() => setActive(i)}
                        >
                          {/* A real link (middle-click, copy address, screen readers);
                              a plain click still routes through openEntry so the
                              overlay closes and documents open in a new tab. */}
                          <Link
                            href={entry.href}
                            onClick={(e) => {
                              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                              e.preventDefault()
                              openEntry(entry)
                            }}
                            className="flex min-w-0 flex-1 items-center gap-4 text-left"
                          >
                            <Thumb entry={entry} />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[16px] text-ink">
                                <Highlight text={entry.title} terms={terms} />
                              </span>
                              {entry.subtitle && (
                                <span className="mt-[2px] block truncate text-[14px] italic text-ink-muted">
                                  {entry.subtitle}
                                </span>
                              )}
                            </span>
                          </Link>
                          {isDocument(entry) && (
                            <span className="flex shrink-0 items-center gap-5 max-[700px]:hidden">
                              <a href={entry.href} target="_blank" rel="noopener noreferrer" className="link">
                                Preview
                              </a>
                              <a href={entry.href} download className="link">
                                Download
                              </a>
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                  }}
                  className="link"
                >
                  View all {total} results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Hint bar ── */}
      <div className="shrink-0 border-t border-hairline max-[700px]:hidden">
        <div className="container-1280 flex h-11 items-center gap-6 text-[13px] italic text-ink-muted">
          <span>Up and down to move</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
          <span className="ml-auto">Ctrl / &#8984; K opens this anywhere</span>
        </div>
      </div>
    </div>
  )
}
