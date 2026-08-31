"use client"

import { useMemo, useState } from "react"
import type { ResourceGroup, ResourceType } from "@/lib/resources"
import { tokenize } from "@/lib/search-score"

/**
 * Resource library — filterable document index (hubss.com/resources is the
 * benchmark: product + type filters, live count, and a Preview and Download
 * action on every document).
 *
 * Preview opens the PDF in a new tab (the browser's native viewer); Download
 * forces a save via the download attribute — same-origin /docs/ files, so the
 * attribute is honoured. Sizes are baked into lib/resources.ts from the real
 * files. Type pills stay stone/ink — the page's accent budget is spent by the
 * header, and 71 orange pills would blow it per viewport.
 */

const ALL = "all" as const

const TYPE_ORDER: ResourceType[] = [
  "Specification",
  "Technical info",
  "SDS",
  "Guide",
  "Colour card",
  "Brochure",
]

const typeStyles: Record<string, string> = {
  Specification: "text-[color:var(--ink)]",
  "Colour card": "text-[#5B6167]",
  SDS: "text-[color:var(--ink-muted)]",
  Guide: "text-[#5B6167]",
  Brochure: "text-[#5B6167]",
  "Technical info": "text-[color:var(--ink-muted)]",
}

function DocRow({
  doc,
  productLabel,
}: {
  doc: { name: string; href: string; type: ResourceType; size: string }
  productLabel?: string
}) {
  return (
    <li className="-mx-2 flex items-center gap-4 rounded-[2px] border-b border-[color:var(--hairline)] px-2 py-[13px] transition-colors last:border-b-0 hover:bg-[#FAF8F5] max-[700px]:flex-wrap max-[700px]:gap-x-3 max-[700px]:gap-y-[6px]">
      <a
        href={doc.href}
        target="_blank"
        rel="noopener noreferrer"
        title={`Preview ${doc.name} (PDF, ${doc.size})`}
        className="group min-w-0 flex-1 max-[700px]:w-full max-[700px]:flex-auto"
      >
        <span className="block truncate text-[15px] leading-[1.55] text-[color:var(--ink-body)] transition-colors group-hover:text-[color:var(--ink)]">
          {doc.name}
        </span>
        {productLabel && (
          <span className="mt-[2px] block text-[12px] font-medium text-[color:var(--ink-muted)]">
            {productLabel}
          </span>
        )}
      </a>

      <span className={`tag hidden shrink-0 min-[701px]:inline-block ${typeStyles[doc.type] ?? ""}`}>
        {doc.type}
      </span>

      <span className="w-[64px] shrink-0 text-right text-[12px] font-semibold tracking-[0.04em] whitespace-nowrap text-[color:var(--ink-muted)] max-[700px]:w-auto max-[700px]:text-left">
        {doc.size}
      </span>

      <span className="flex shrink-0 items-center gap-5">
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Preview ${doc.name}`}
          className="text-[13px] font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
        >
          Preview
        </a>
        <a
          href={doc.href}
          download
          aria-label={`Download ${doc.name} (${doc.size})`}
          className="text-[13px] font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
        >
          Download{" "}
          <span aria-hidden="true" className="inline-block">
            &darr;
          </span>
        </a>
      </span>
    </li>
  )
}

function FilterPill({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  count?: number
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex items-baseline gap-2 rounded-[2px] px-3 py-2 text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors duration-150 ${
        active ? "bg-[#F1EEE9] text-[#14161A]" : "text-[#767B82] hover:text-[#14161A]"
      }`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span className="text-[11px] tracking-[0.08em] text-[#A9A297]">
          {String(count).padStart(2, "0")}
        </span>
      )}
    </button>
  )
}

export default function ResourceLibrary({ groups }: { groups: ResourceGroup[] }) {
  const [product, setProduct] = useState<string>(ALL)
  const [docType, setDocType] = useState<ResourceType | typeof ALL>(ALL)
  const [query, setQuery] = useState("")

  const typeCounts = useMemo(() => {
    const counts = new Map<ResourceType, number>()
    for (const g of groups)
      for (const d of g.docs) counts.set(d.type, (counts.get(d.type) ?? 0) + 1)
    return counts
  }, [groups])

  const filtered = useMemo(() => {
    const terms = tokenize(query)
    const matches = (haystack: string) => {
      if (terms.length === 0) return true
      const h = haystack.toLowerCase()
      return terms.every((t) => h.includes(t))
    }
    return groups
      .filter((g) => product === ALL || g.slug === product)
      .map((g) => ({
        ...g,
        docs: g.docs.filter(
          (d) =>
            (docType === ALL || d.type === docType) &&
            matches(`${d.name} ${g.product} ${d.type}`),
        ),
      }))
      .filter((g) => g.docs.length > 0)
  }, [groups, product, docType, query])

  const shown = filtered.reduce((n, g) => n + g.docs.length, 0)
  const total = groups.reduce((n, g) => n + g.docs.length, 0)

  /* A type filter or a search cuts across systems — grouped headers over one
     or two rows each read as noise, so those views flatten into ONE list with
     the system shown inline per row. Browsing (no filter) stays grouped. */
  const flat = docType !== ALL || tokenize(query).length > 0
  const flatRows = useMemo(
    () =>
      filtered.flatMap((g) =>
        g.docs.map((doc) => ({ ...doc, product: g.product })),
      ),
    [filtered],
  )

  return (
    <div>
      {/* ---- Search ---- */}
      <div className="border-t border-[color:var(--hairline)] pt-6">
        <label className="flex max-w-[560px] items-center gap-3 border-b border-[color:var(--hairline)] pb-3 focus-within:border-[#14161A]">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" className="shrink-0 text-[#767B82]">
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${total} documents — try "colour card" or "SDS"`}
            aria-label="Search documents"
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#14161A] outline-none placeholder:text-[#A9A297]"
          />
        </label>
      </div>

      {/* ---- Filters ---- */}
      <div className="mt-6">
        <div className="label">Browse by system</div>
        <div className="mt-3 flex flex-wrap gap-x-1 gap-y-1">
          <FilterPill active={product === ALL} onClick={() => setProduct(ALL)} count={total}>
            All systems
          </FilterPill>
          {groups.map((g) => (
            <FilterPill
              key={g.slug}
              active={product === g.slug}
              onClick={() => setProduct(product === g.slug ? ALL : g.slug)}
              count={g.docs.length}
            >
              {g.product}
            </FilterPill>
          ))}
        </div>

        <div className="label mt-6">Filter by type</div>
        <div className="mt-3 flex flex-wrap gap-x-1 gap-y-1">
          <FilterPill active={docType === ALL} onClick={() => setDocType(ALL)}>
            All types
          </FilterPill>
          {TYPE_ORDER.map((t) => (
            <FilterPill
              key={t}
              active={docType === t}
              onClick={() => setDocType(docType === t ? ALL : t)}
              count={typeCounts.get(t) ?? 0}
            >
              {t}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* ---- Count ---- */}
      <p
        aria-live="polite"
        className="mt-8 border-b border-[color:var(--hairline)] pb-3 text-[13px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]"
      >
        {shown === total ? `${total} documents` : `${shown} of ${total} documents`}
      </p>

      {/* ---- Document index ---- */}
      {shown === 0 ? (
        <div className="py-16 text-center">
          <p className="text-[15px] text-[color:var(--ink-muted)]">
            No documents match that combination.
          </p>
          <button
            type="button"
            onClick={() => {
              setProduct(ALL)
              setDocType(ALL)
              setQuery("")
            }}
            className="arrow-link mt-4"
          >
            Clear filters <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      ) : (
        flat ? (
        <ul className="pt-2">
          {flatRows.map((doc) => (
            <DocRow key={doc.href} doc={doc} productLabel={doc.product} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-14 pt-10">
          {filtered.map((group) => (
            <div key={group.slug} id={group.slug}>
              <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--hairline)] pb-[14px]">
                <h2 className="label">{group.product}</h2>
                <span className="shrink-0 text-[12px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]">
                  {group.docs.length === 1 ? "1 document" : `${group.docs.length} documents`}
                </span>
              </div>

              <ul className="mt-2">
                {group.docs.map((doc) => (
                  <DocRow key={doc.href} doc={doc} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        )
      )}
    </div>
  )
}
