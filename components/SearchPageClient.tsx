"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { searchEntries, type SearchEntry } from "@/lib/search-score"

/**
 * Full search page — same index and scorer as the nav overlay, rendered as
 * a permanent, linkable page (/search?q=…). Image results cap at 24 per
 * query to keep the page honest to scroll; every other group lists in full.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): restyled only — the serif
 * in the field and the rows, square thumbnails, captions under the image
 * results in the small voice, the document actions as underlined words, no
 * hover zoom, no arrow glyphs, no orange on hover. Behaviour is unchanged.
 */

const IMAGE_CAP = 24

export default function SearchPageClient() {
  const params = useSearchParams()
  const initial = params.get("q") ?? ""
  const [query, setQuery] = useState(initial)
  const [index, setIndex] = useState<SearchEntry[] | null>(null)

  useEffect(() => {
    fetch("/api/search-index")
      .then((r) => (r.ok ? r.json() : []))
      .then(setIndex)
      .catch(() => setIndex([]))
  }, [])

  // Keep the URL shareable as the query changes
  useEffect(() => {
    const url = query.trim()
      ? `/search?q=${encodeURIComponent(query)}`
      : "/search"
    window.history.replaceState(null, "", url)
  }, [query])

  const { groups, total } = useMemo(
    () => (index ? searchEntries(index, query, 0) : { groups: [], total: 0 }),
    [index, query],
  )

  return (
    <div>
      <label className="flex items-center gap-4 border-b border-ink pb-4">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 18 18" className="shrink-0 text-ink-muted">
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, projects, documents, pages…"
          aria-label="Search the site"
          autoFocus
          className="search-input min-w-0 flex-1 border-0 bg-transparent text-[22px] text-ink outline-none placeholder:text-ink-muted max-[700px]:text-[18px]"
          style={{ fontFamily: "var(--font-text)" }}
        />
      </label>

      <p aria-live="polite" className="label mt-4">
        {query.trim() === ""
          ? "Type to search the whole site — pages, systems, projects, documents, the blog and imagery."
          : !index
            ? "Loading the index…"
            : total === 0
              ? `Nothing for "${query}" — try a product, city or system name.`
              : `${total} result${total === 1 ? "" : "s"} for "${query}"`}
      </p>

      <div className="mt-10 flex flex-col gap-14">
        {groups.map((group) => {
          const entries =
            group.type === "image" ? group.entries.slice(0, IMAGE_CAP) : group.entries
          return (
            <div key={group.type}>
              <div className="flex items-baseline justify-between border-b border-hairline pb-[14px]">
                <h2 className="label">{group.label}</h2>
                <span className="shrink-0 text-[14px] italic text-ink-muted tabular-nums">{group.total}</span>
              </div>

              {group.type === "image" ? (
                <ul className="mt-6 grid grid-cols-6 gap-x-3 gap-y-5 max-[900px]:grid-cols-4 max-[560px]:grid-cols-3">
                  {entries.map((entry) => (
                    <li key={entry.image}>
                      <Link href={entry.href} title={`${entry.title} — ${entry.subtitle ?? ""}`} className="block">
                        <figure className="m-0">
                          <span className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-stone">
                            <Image
                              src={entry.image!}
                              alt={entry.title}
                              fill
                              sizes="(max-width: 560px) 33vw, (max-width: 900px) 25vw, 200px"
                              className="object-cover"
                            />
                          </span>
                          <figcaption className="cap mt-[6px] truncate text-[13px]">{entry.title}</figcaption>
                        </figure>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-2">
                  {entries.map((entry) => (
                    <li
                      key={`${entry.href}-${entry.title}`}
                      className="flex items-center gap-4 border-b border-hairline py-[12px] last:border-b-0"
                    >
                      {entry.image && (
                        <span className="relative block h-[46px] w-[62px] shrink-0 overflow-hidden bg-surface-stone">
                          <Image src={entry.image} alt="" fill sizes="62px" className="object-cover" />
                        </span>
                      )}
                      {entry.download ? (
                        <>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[16px] text-ink">{entry.title}</span>
                            {entry.subtitle && (
                              <span className="mt-[2px] block truncate text-[14px] italic text-ink-muted">
                                {entry.subtitle}
                              </span>
                            )}
                          </span>
                          <span className="flex shrink-0 items-center gap-5">
                            <a href={entry.href} target="_blank" rel="noopener noreferrer" className="link">
                              Preview
                            </a>
                            <a href={entry.href} download className="link">
                              Download
                            </a>
                          </span>
                        </>
                      ) : (
                        <Link href={entry.href} className="min-w-0 flex-1">
                          <span className="block truncate text-[16px] text-ink underline decoration-1 underline-offset-[5px] decoration-transparent transition-colors hover:decoration-[color:var(--ink)]">
                            {entry.title}
                          </span>
                          {entry.subtitle && (
                            <span className="mt-[2px] block truncate text-[14px] italic text-ink-muted">
                              {entry.subtitle}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {group.type === "image" && group.total > IMAGE_CAP && (
                <p className="mt-3 text-[14px] italic text-ink-muted">
                  Showing {IMAGE_CAP} of {group.total} images — narrow the search to see the rest.
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
