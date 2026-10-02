"use client"

/**
 * One-line filter bar — the same control on /projects and /blog so the two
 * indexes read as one system (Vern, 4 Sept 2026: "project filter should just
 * take up one line"; "projects and blog are basically the same thing").
 * Native selects — keyboard and screen-reader ready for free — one row on
 * desktop; on a phone each filter takes a full row (label left, select
 * filling the rest) so the controls line up instead of wrapping ragged.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the bordered pills go.
 * Each select is the serif on a hairline underline — no border, no
 * background, square — its label in the small voice, the summary in the
 * small voice, "Clear" an underlined word. The behaviour is unchanged.
 */

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterDef {
  key: string
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

export default function FilterBar({
  filters,
  summary,
  onClear,
  active,
}: {
  filters: FilterDef[]
  /** e.g. "31 projects" — read out on change. */
  summary: string
  onClear?: () => void
  active: boolean
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-9 gap-y-3 border-y border-hairline py-4 max-[600px]:gap-y-2">
      {filters.map((f) => (
        <label key={f.key} className="flex items-baseline gap-[10px] max-[600px]:w-full">
          <span className="label whitespace-nowrap max-[600px]:w-[92px] max-[600px]:shrink-0">{f.label}</span>
          <span className="relative inline-flex items-baseline max-[600px]:flex-1">
            <select
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              aria-label={f.label}
              className="appearance-none border-0 border-b border-[color:var(--hairline-strong)] bg-transparent py-[4px] pr-6 pl-0 text-[16px] italic text-ink transition-colors hover:border-ink focus-visible:border-ink focus-visible:outline-none max-[600px]:w-full max-[600px]:py-[9px]"
              style={{ fontFamily: "var(--font-text)" }}
            >
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                  {typeof o.count === "number" ? ` (${o.count})` : ""}
                </option>
              ))}
            </select>
            {/* The select's own disclosure mark — a chevron, not an arrow link. */}
            <svg
              aria-hidden="true"
              width="8"
              height="5"
              viewBox="0 0 8 5"
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink-muted"
            >
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </span>
        </label>
      ))}

      <span className="ml-auto flex items-baseline gap-6 whitespace-nowrap max-[600px]:mt-1 max-[600px]:w-full max-[600px]:justify-between">
        {active && onClear && (
          <button type="button" onClick={onClear} className="link max-[600px]:py-2">
            Clear
          </button>
        )}
        <span className="label max-[600px]:ml-auto" aria-live="polite">
          {summary}
        </span>
      </span>
    </div>
  )
}
