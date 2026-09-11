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
 * Sitewide quick search — hubss-grade: one input over pages, services,
 * products, applications, projects, the 90-document specifications library,
 * the blog and gallery imagery. Opens from the nav icon or Cmd/Ctrl+K.
 * The index is built at compile time and fetched once per session from
 * /api/search-index (force-static JSON).
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
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Driveways", href: "/driveways" },
  { label: "Specifications & documents", href: "/resources" },
  { label: "Projects", href: "/projects" },
  { label: "Image galleries", href: "/galleries" },
  { label: "Request a quote", href: "/contact" },
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
          <mark key={i} className="rounded-[1px] bg-[#FDEEE7] text-inherit">
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
      <span className="relative block h-[58px] w-[44px] shrink-0 overflow-hidden rounded-[2px] border border-[#E7E3DC] bg-white">
        {p ? (
          <Image src={p.thumb} alt="" width={320} height={Math.round((320 * p.h) / p.w)} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-[0.08em] text-[#767B82]" style={{ fontFamily: "var(--font-display)" }}>
            PDF
          </span>
        )}
      </span>
    )
  }
  if (!entry.image) {
    return <span aria-hidden="true" className="block h-[54px] w-[72px] shrink-0 rounded-[2px] bg-[#F1EEE9]" />
  }
  return (
    <span className="relative block h-[54px] w-[72px] shrink-0 overflow-hidden rounded-[2px] bg-[#F1EEE9]">
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
      className="fixed inset-0 z-[400] flex flex-col bg-white"
      onKeyDown={onKeyDown}
    >
      {/* ── Input bar ── */}
      <div className="shrink-0 border-b border-[#E7E3DC]">
        <div className="container-1280 flex h-[72px] items-center gap-4">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" className="shrink-0 text-[#767B82]">
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
            className="search-input min-w-0 flex-1 border-0 bg-transparent text-[19px] text-[#14161A] outline-none placeholder:text-[#A9A297] max-[700px]:text-[17px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              className="text-[13px] font-semibold text-[#767B82] hover:text-[#14161A]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-[2px] text-[#14161A] transition-colors hover:bg-[#F1EEE9]"
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
                <div className="label">Go straight to</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {QUICK_LINKS.map((link) => (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => {
                        onClose()
                        router.push(link.href)
                      }}
                      className="h-10 rounded-[2px] border border-[#E7E3DC] px-4 text-[13.5px] font-medium text-[#3D4147] transition-colors hover:border-[#A9A297] hover:bg-[#FAF8F5] hover:text-[#14161A]"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                <div className="label mt-10">Try</div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {TRY_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        setQuery(q)
                        inputRef.current?.focus()
                      }}
                      className="text-[15px] font-medium text-[#767B82] underline-offset-4 transition-colors hover:text-[#14161A] hover:underline"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-7 max-[900px]:col-span-1">
                <div className="label">The systems</div>
                <div className="mt-4 grid grid-cols-4 gap-4 max-[700px]:grid-cols-2">
                  {FEATURED.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      onClick={onClose}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-[#F1EEE9]"
                    >
                      <Image src={f.src} alt="" fill sizes="(max-width: 700px) 45vw, 200px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      <span aria-hidden="true" className="scrim" />
                      <span className="absolute inset-x-0 bottom-0 p-3">
                        <span className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white" style={{ fontFamily: "var(--font-display)" }}>
                          {f.name}
                        </span>
                        <span className="mt-[2px] block text-[11.5px] text-white/75">{f.note}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : !index ? (
            <p className="text-[15px] text-[#767B82]">Loading the index…</p>
          ) : total === 0 ? (
            <p className="text-[15px] text-[#767B82]">
              Nothing for &ldquo;{query}&rdquo; — try a product, city or system name.
            </p>
          ) : (
            <div className="flex flex-col gap-9">
              {groups.map((group) => (
                <div key={group.type}>
                  <div className="sticky top-0 z-10 flex items-baseline justify-between border-b border-[#E7E3DC] bg-white pt-1 pb-2">
                    <span className="label">{group.label}</span>
                    <span className="text-[12px] font-semibold tracking-[0.04em] text-[#A9A297]">
                      {group.total}
                    </span>
                  </div>
                  <div className="mt-1">
                    {group.entries.map((entry) => {
                      idx += 1
                      const i = idx
                      return (
                        <div
                          key={`${entry.type}-${entry.href}-${entry.title}`}
                          data-idx={i}
                          className={`flex items-center gap-4 rounded-[2px] px-2 py-[8px] ${
                            i === active ? "bg-[#FAF8F5]" : ""
                          }`}
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
                              <span className="block truncate text-[15px] font-medium text-[#14161A]">
                                <Highlight text={entry.title} terms={terms} />
                              </span>
                              {entry.subtitle && (
                                <span className="mt-[2px] block truncate text-[13px] text-[#767B82]">
                                  {entry.subtitle}
                                </span>
                              )}
                            </span>
                          </Link>
                          {isDocument(entry) && (
                            <span className="flex shrink-0 items-center gap-4 max-[700px]:hidden">
                              <a
                                href={entry.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[13px] font-semibold text-[#14161A] underline-offset-4 hover:underline"
                              >
                                Preview
                              </a>
                              <a
                                href={entry.href}
                                download
                                className="text-[13px] font-semibold text-[#14161A] underline-offset-4 hover:underline"
                              >
                                Download <span aria-hidden="true">&darr;</span>
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
                  className="arrow-link"
                >
                  View all {total} results <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Hint bar ── */}
      <div className="shrink-0 border-t border-[#E7E3DC] max-[700px]:hidden">
        <div className="container-1280 flex h-11 items-center gap-6 text-[12px] text-[#A9A297]">
          <span>&uarr;&darr; navigate</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
          <span className="ml-auto">Ctrl / &#8984; K opens this anywhere</span>
        </div>
      </div>
    </div>
  )
}
