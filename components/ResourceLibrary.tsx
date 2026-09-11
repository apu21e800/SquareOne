"use client"

import { useMemo, useState } from "react"
import type { ResourceGroup, ResourceType } from "@/lib/resources"
import { tokenize } from "@/lib/search-score"
import FilterBar from "@/components/ui/FilterBar"
import { DocRow, TYPE_ORDER } from "@/components/documents/DocumentRail"
import DocPreviewModal, { type PreviewTarget } from "@/components/documents/DocPreviewModal"

/**
 * Specification library — rebuilt 5 Sept 2026 (Vern: "the Resources page
 * aesthetic and filter organization needs work").
 *
 *   Desktop   a sticky rail on the left (System, then Type, with counts) and
 *             the documents on the right under one search field
 *   Phone     the same two filters as selects — the FilterBar /projects and
 *             /blog use — so the three indexes read as one system
 *   Rows      page one of the document as a thumbnail (pre-rendered, see
 *             lib/doc-previews), the document, its system · type · size,
 *             and two actions: Preview (opens the page in place, with
 *             Download / Open / HUB's current edition) and Download
 *             (same-origin /docs/, so `download` is honoured)
 *
 * Browsing is grouped by system with a sticky heading per group; a type
 * filter or a search cuts across systems, so those views flatten into one
 * list with the system named on every row.
 */

const ALL = "all" as const

function RailItem({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={`flex w-full items-baseline justify-between gap-3 border-l-2 py-[7px] pl-4 text-left text-[14px] transition-colors ${
          active
            ? "border-[color:var(--accent)] font-semibold text-[color:var(--ink)]"
            : "border-transparent font-medium text-[color:var(--ink-muted)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--ink)]"
        }`}
      >
        <span>{label}</span>
        <span className="text-[12px] tabular-nums text-[color:var(--hairline-strong)]">{count}</span>
      </button>
    </li>
  )
}

export default function ResourceLibrary({ groups }: { groups: ResourceGroup[] }) {
  const [product, setProduct] = useState<string>(ALL)
  const [docType, setDocType] = useState<ResourceType | typeof ALL>(ALL)
  const [query, setQuery] = useState("")
  const [target, setTarget] = useState<PreviewTarget | null>(null)

  const total = groups.reduce((n, g) => n + g.docs.length, 0)

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
  const active = product !== ALL || docType !== ALL || tokenize(query).length > 0
  const flat = docType !== ALL || tokenize(query).length > 0
  const flatRows = useMemo(
    () => filtered.flatMap((g) => g.docs.map((doc) => ({ doc, product: g.product }))),
    [filtered],
  )

  const clear = () => {
    setProduct(ALL)
    setDocType(ALL)
    setQuery("")
  }

  const summary = shown === total ? `${total} documents` : `${shown} of ${total} documents`

  return (
    <div className="grid grid-cols-12 gap-x-12 max-[1000px]:grid-cols-1 max-[1000px]:gap-x-0">
      {target && <DocPreviewModal target={target} onClose={() => setTarget(null)} />}

      {/* ── Rail ──────── */}
      <aside className="col-span-3 max-[1000px]:hidden">
        <div className="sticky top-[calc(var(--bar-h)+32px)]">
          <div className="label">System</div>
          <ul className="mt-3 border-l border-[color:var(--hairline)]">
            <RailItem active={product === ALL} onClick={() => setProduct(ALL)} label="All systems" count={total} />
            {groups.map((g) => (
              <RailItem
                key={g.slug}
                active={product === g.slug}
                onClick={() => setProduct(product === g.slug ? ALL : g.slug)}
                label={g.product}
                count={g.docs.length}
              />
            ))}
          </ul>

          <div className="label mt-9">Type</div>
          <ul className="mt-3 border-l border-[color:var(--hairline)]">
            <RailItem active={docType === ALL} onClick={() => setDocType(ALL)} label="All types" count={total} />
            {TYPE_ORDER.map((t) => (
              <RailItem
                key={t}
                active={docType === t}
                onClick={() => setDocType(docType === t ? ALL : t)}
                label={t}
                count={typeCounts.get(t) ?? 0}
              />
            ))}
          </ul>

          <p className="mt-9 max-w-[26ch] text-[13px] leading-[1.6] text-[color:var(--ink-muted)]">
            Preview opens page one of the document. Where HUB Surface Systems keeps a current edition online, the preview links to it.
          </p>
        </div>
      </aside>

      {/* ── Documents ──────── */}
      <div className="col-span-9 min-w-0 max-[1000px]:col-span-1">
        {/* Search */}
        <label className="flex h-14 items-center gap-3 rounded-[2px] border border-[color:var(--hairline)] bg-white px-4 transition-colors focus-within:border-[color:var(--ink)]">
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 18 18" className="shrink-0 text-[color:var(--ink-muted)]">
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${total} documents`}
            aria-label="Search documents"
            className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[color:var(--ink)] outline-none placeholder:text-[#A9A297]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-[13px] font-semibold text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
            >
              Clear
            </button>
          )}
        </label>

        {/* Phone filters — the same control as /projects and /blog */}
        <div className="mt-4 hidden max-[1000px]:block">
          <FilterBar
            active={active}
            onClear={clear}
            summary={summary}
            filters={[
              {
                key: "system",
                label: "System",
                value: product,
                onChange: (v) => setProduct(v),
                options: [
                  { value: ALL, label: "All systems", count: total },
                  ...groups.map((g) => ({ value: g.slug, label: g.product, count: g.docs.length })),
                ],
              },
              {
                key: "type",
                label: "Type",
                value: docType,
                onChange: (v) => setDocType(v as ResourceType | typeof ALL),
                options: [
                  { value: ALL, label: "All types", count: total },
                  ...TYPE_ORDER.map((t) => ({ value: t, label: t, count: typeCounts.get(t) ?? 0 })),
                ],
              },
            ]}
          />
        </div>

        {/* Count row (desktop) */}
        <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-[color:var(--hairline)] pb-3 max-[1000px]:hidden">
          <span className="label" aria-live="polite">
            {summary}
          </span>
          {active && (
            <button
              type="button"
              onClick={clear}
              className="text-[13px] font-semibold text-[color:var(--ink-muted)] underline-offset-4 hover:text-[color:var(--ink)] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {shown === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[17px] text-[color:var(--ink-body)]">No documents match that combination.</p>
            <button type="button" onClick={clear} className="arrow-link mt-5">
              Clear filters <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ) : flat ? (
          <ul className="mt-2 divide-y divide-[color:var(--hairline)]">
            {flatRows.map(({ doc, product: p }) => (
              <DocRow key={doc.href} doc={doc} product={p} showProduct onPreview={setTarget} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-12 pt-6">
            {filtered.map((group) => (
              <section key={group.slug} id={group.slug} aria-labelledby={`lib-${group.slug}`}>
                <div className="sticky top-[var(--bar-h)] z-10 flex items-baseline justify-between gap-4 border-b border-[color:var(--hairline)] bg-white pt-3 pb-[10px]">
                  <h2 id={`lib-${group.slug}`} className="label">
                    {group.product}
                  </h2>
                  <span className="text-[12px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]">
                    {group.docs.length === 1 ? "1 document" : `${group.docs.length} documents`}
                  </span>
                </div>
                <ul className="mt-1 divide-y divide-[color:var(--hairline)]">
                  {group.docs.map((doc) => (
                    <DocRow key={doc.href} doc={doc} product={group.product} onPreview={setTarget} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
