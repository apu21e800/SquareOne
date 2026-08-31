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
      <label className="flex items-center gap-4 border-b-2 border-[#14161A] pb-4">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 18 18" className="shrink-0 text-[#767B82]">
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
          className="min-w-0 flex-1 border-0 bg-transparent text-[22px] text-[#14161A] outline-none placeholder:text-[#A9A297] max-[700px]:text-[18px]"
        />
      </label>

      <p aria-live="polite" className="mt-4 text-[13px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]">
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
              <div className="flex items-baseline justify-between border-b border-[color:var(--hairline)] pb-[14px]">
                <h2 className="label">{group.label}</h2>
                <span className="shrink-0 text-[12px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]">
                  {group.total}
                </span>
              </div>

              {group.type === "image" ? (
                <div className="mt-6 grid grid-cols-6 gap-3 max-[900px]:grid-cols-4 max-[560px]:grid-cols-3">
                  {entries.map((entry) => (
                    <Link
                      key={entry.image}
                      href={entry.href}
                      title={`${entry.title} — ${entry.subtitle ?? ""}`}
                      className="group block"
                    >
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-[#F1EEE9]">
                        <Image
                          src={entry.image!}
                          alt={entry.title}
                          fill
                          sizes="(max-width: 560px) 33vw, (max-width: 900px) 25vw, 200px"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </span>
                      <span className="mt-1 block truncate text-[11px] leading-[1.4] text-[color:var(--ink-muted)]">
                        {entry.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <ul className="mt-2">
                  {entries.map((entry) => (
                    <li
                      key={`${entry.href}-${entry.title}`}
                      className="flex items-center gap-4 border-b border-[color:var(--hairline)] py-[12px] last:border-b-0"
                    >
                      {entry.image && (
                        <span className="relative block h-[46px] w-[62px] shrink-0 overflow-hidden rounded-[2px] bg-[#F1EEE9]">
                          <Image src={entry.image} alt="" fill sizes="62px" className="object-cover" />
                        </span>
                      )}
                      {entry.download ? (
                        <>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-medium text-[color:var(--ink)]">
                              {entry.title}
                            </span>
                            {entry.subtitle && (
                              <span className="mt-[2px] block truncate text-[13px] text-[color:var(--ink-muted)]">
                                {entry.subtitle}
                              </span>
                            )}
                          </span>
                          <span className="flex shrink-0 items-center gap-4">
                            <a
                              href={entry.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[13px] font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
                            >
                              Preview
                            </a>
                            <a
                              href={entry.href}
                              download
                              className="text-[13px] font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
                            >
                              Download <span aria-hidden="true">&darr;</span>
                            </a>
                          </span>
                        </>
                      ) : (
                        <Link href={entry.href} className="group min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-medium text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent-deep)]">
                            {entry.title}
                          </span>
                          {entry.subtitle && (
                            <span className="mt-[2px] block truncate text-[13px] text-[color:var(--ink-muted)]">
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
                <p className="mt-3 text-[12px] text-[color:var(--ink-muted)]">
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
