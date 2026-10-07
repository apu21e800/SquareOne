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
 *
 * 7 Oct 2026 (the client: "search function is very bland, needs better
 * layout and colour profile"): the colour card's edge across the top, the
 * query set large in Futura beside a square ink mark, the empty state as
 * three columns (go straight to, popular searches, the systems), every
 * result group led by its own square from the band, the rows on a white
 * sheet over the grey with the active one marked in Square One orange, and
 * the keys as square caps. Scoring, the index and the keys are unchanged
 * (lib/search-score.ts).
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
  { label: "Systems we install", note: "StreetPrint to PreMark", href: "/products" },
  { label: "Driveways", note: "Vancouver and Victoria", href: "/driveways" },
  { label: "Pattern sheets", note: "Every template, to scale", href: "/patterns" },
  { label: "Documents", note: "Specifications, colour cards, SDS", href: "/resources" },
  { label: "Projects", note: "Selected work across BC", href: "/projects" },
  { label: "Get a quote", note: "Free site visit", href: "/contact" },
]

/** Each group's square, a chip of the colour card's edge (--edge-n on <body>). */
const GROUP_CHIP: Record<string, string> = {
  page: "var(--edge-9)",
  service: "var(--edge-7)",
  product: "var(--edge-2)",
  application: "var(--edge-3)",
  project: "var(--edge-8)",
  document: "var(--edge-5)",
  post: "var(--edge-10)",
  image: "var(--edge-4)",
}

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
          <mark key={i} className="search-hit">
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
      <span className="search-thumb search-thumb-doc relative block h-[58px] w-[44px] shrink-0 overflow-hidden border border-hairline bg-white">
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
  // Every page carries its opener's photograph since 2 Oct 2026 (the mark
  // that stood in for one read as a strange result, Vern); a row with no
  // picture at all simply has none.
  if (!entry.image) return null
  return (
    <span className="search-thumb relative block h-[54px] w-[72px] shrink-0 overflow-hidden bg-surface-stone">
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
      className="search-sheet fixed inset-0 z-[400] flex flex-col"
      onKeyDown={onKeyDown}
    >
      <div aria-hidden="true" className="search-edge" />

      {/* ── The query ── */}
      <div className="search-bar shrink-0">
        <div className="container-1280 flex h-[88px] items-center gap-4 max-[700px]:h-[68px] max-[700px]:gap-3">
          <span aria-hidden="true" className="search-mark">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, places, projects, documents"
            aria-label="Search the site"
            spellCheck={false}
            autoComplete="off"
            className="search-input min-w-0 flex-1"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              className="search-clear"
            >
              Clear
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Close search" className="search-close">
            <kbd className="search-key max-[700px]:hidden">Esc</kbd>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <div ref={listRef} className="search-body flex-1 overflow-y-auto">
        <div className="container-1280 py-10 max-[700px]:py-7">
          {query.trim() === "" ? (
            <div className="search-empty">
              <div className="search-col">
                <span className="search-head">Go straight to</span>
                <ul className="search-go">
                  {QUICK_LINKS.map((link, n) => (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose()
                          router.push(link.href)
                        }}
                        className="search-go-row"
                      >
                        <span aria-hidden="true" className="search-sq" style={{ background: `var(--edge-${(n * 3) % 10 + 1})` }} />
                        <span className="min-w-0">
                          <span className="search-go-name">{link.label}</span>
                          <span className="search-go-note">{link.note}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="search-col">
                <span className="search-head">Popular searches</span>
                <div className="search-tries">
                  {TRY_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        setQuery(q)
                        inputRef.current?.focus()
                      }}
                      className="search-try"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="search-col search-col-wide">
                <span className="search-head">The systems</span>
                <ul className="search-systems">
                  {FEATURED.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href} onClick={onClose} className="frame-link block">
                        <figure className="m-0">
                          <span className="frame-img relative block aspect-[4/3] w-full overflow-hidden bg-surface-stone">
                            <Image src={f.src} alt="" fill sizes="(max-width: 700px) 45vw, 240px" className="object-cover" />
                          </span>
                          <figcaption className="cap">
                            <span className="block font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
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
            <p className="search-note">Loading the index…</p>
          ) : total === 0 ? (
            <div className="search-none">
              <p className="search-none-line">
                Nothing for &ldquo;{query}&rdquo; yet. Try a system, a city or a kind of work:
              </p>
              <div className="search-tries mt-5">
                {TRY_QUERIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setQuery(q)
                      inputRef.current?.focus()
                    }}
                    className="search-try"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {groups.map((group) => (
                <section key={group.type} className="search-group" aria-label={group.label}>
                  <div className="search-group-head">
                    <span aria-hidden="true" className="search-sq" style={{ background: GROUP_CHIP[group.type] ?? "var(--edge-4)" }} />
                    <span className="search-group-name">{group.label}</span>
                    <span className="search-count">{group.total}</span>
                  </div>
                  <div className="search-rows">
                    {group.entries.map((entry) => {
                      idx += 1
                      const i = idx
                      return (
                        <div
                          key={`${entry.type}-${entry.href}-${entry.title}`}
                          data-idx={i}
                          data-active={i === active ? "" : undefined}
                          className="search-row"
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
                              <span className="search-title block truncate">
                                <Highlight text={entry.title} terms={terms} />
                              </span>
                              {entry.subtitle && <span className="search-sub mt-[2px] block truncate">{entry.subtitle}</span>}
                            </span>
                          </Link>
                          {isDocument(entry) ? (
                            <span className="flex shrink-0 items-center gap-5 max-[700px]:hidden">
                              <a href={entry.href} target="_blank" rel="noopener noreferrer" className="link">
                                Preview
                              </a>
                              <a href={entry.href} download className="link">
                                Download
                              </a>
                            </span>
                          ) : (
                            <kbd aria-hidden="true" className="search-key search-row-key max-[700px]:hidden">
                              Enter
                            </kbd>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                  }}
                  className="search-all"
                >
                  All {total} results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── The keys ── */}
      <div className="search-foot shrink-0 max-[700px]:hidden">
        <div className="container-1280 flex h-12 items-center gap-7">
          <span>
            <kbd className="search-key">&uarr;</kbd>
            <kbd className="search-key">&darr;</kbd> to move
          </span>
          <span>
            <kbd className="search-key">Enter</kbd> to open
          </span>
          <span>
            <kbd className="search-key">Esc</kbd> to close
          </span>
          <span className="ml-auto">
            <kbd className="search-key">Ctrl</kbd> or <kbd className="search-key">&#8984;</kbd> <kbd className="search-key">K</kbd> opens search anywhere
          </span>
        </div>
      </div>
    </div>
  )
}
