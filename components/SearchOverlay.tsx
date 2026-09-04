"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  searchEntries,
  type GroupedResults,
  type SearchEntry,
} from "@/lib/search-score"

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
  { label: "Request a quote", href: "/contact" },
]

function isDocument(entry: SearchEntry) {
  return entry.type === "document"
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
            className="min-w-0 flex-1 border-0 bg-transparent text-[19px] text-[#14161A] outline-none placeholder:text-[#A9A297] max-[700px]:text-[17px]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="px-2 py-2 text-[26px] leading-none text-[#14161A]"
          >
            &times;
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <div ref={listRef} className="flex-1 overflow-y-auto">
        <div className="container-1280 py-8">
          {query.trim() === "" ? (
            <div>
              <div className="label">Quick links</div>
              <div className="mt-4 flex flex-col items-start gap-1">
                {QUICK_LINKS.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => {
                      onClose()
                      router.push(link.href)
                    }}
                    className="rounded-[2px] px-2 py-[7px] text-left text-[16px] font-medium text-[#3D4147] transition-colors hover:bg-[#FAF8F5] hover:text-[#14161A]"
                  >
                    {link.label}
                  </button>
                ))}
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
                  <div className="flex items-baseline justify-between border-b border-[#E7E3DC] pb-2">
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
                          className={`flex items-center gap-4 rounded-[2px] px-2 py-[9px] ${
                            i === active ? "bg-[#FAF8F5]" : ""
                          }`}
                          onMouseEnter={() => setActive(i)}
                        >
                          {entry.image && (
                            <span className="relative block h-[42px] w-[56px] shrink-0 overflow-hidden rounded-[2px] bg-[#F1EEE9]">
                              <Image
                                src={entry.image}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </span>
                          )}
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
                            className="min-w-0 flex-1 text-left"
                          >
                            <span className="block truncate text-[15px] font-medium text-[#14161A]">
                              {entry.title}
                            </span>
                            {entry.subtitle && (
                              <span className="mt-[2px] block truncate text-[13px] text-[#767B82]">
                                {entry.subtitle}
                              </span>
                            )}
                          </Link>
                          {isDocument(entry) && (
                            <span className="flex shrink-0 items-center gap-4">
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
