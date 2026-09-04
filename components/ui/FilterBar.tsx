"use client"

/**
 * One-line filter bar — the same control on /projects and /blog so the two
 * indexes read as one system (Vern, 4 Sept 2026: "project filter should just
 * take up one line"; "projects and blog are basically the same thing").
 * Native selects styled as labelled pills: one row on desktop, wrapping only
 * on narrow phones, keyboard and screen-reader ready for free.
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
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-[color:var(--hairline)] py-3">
      {filters.map((f) => (
        <label key={f.key} className="flex items-center gap-[10px]">
          <span className="label whitespace-nowrap">{f.label}</span>
          <span className="relative inline-flex items-center">
            <select
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              aria-label={f.label}
              className="appearance-none rounded-[2px] border border-[color:var(--hairline)] bg-white py-[7px] pr-8 pl-3 text-[14px] font-semibold text-[color:var(--ink)] transition-colors hover:border-[color:var(--hairline-strong)] focus-visible:border-[color:var(--ink)] focus-visible:outline-none"
            >
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                  {typeof o.count === "number" ? ` (${o.count})` : ""}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              width="8"
              height="5"
              viewBox="0 0 8 5"
              className="pointer-events-none absolute right-3 text-[color:var(--ink-muted)]"
            >
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </span>
        </label>
      ))}

      <span className="ml-auto flex items-center gap-5 whitespace-nowrap">
        {active && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-[13px] font-semibold text-[color:var(--ink-muted)] underline-offset-4 transition-colors hover:text-[color:var(--ink)] hover:underline"
          >
            Clear
          </button>
        )}
        <span className="label" aria-live="polite">
          {summary}
        </span>
      </span>
    </div>
  )
}
