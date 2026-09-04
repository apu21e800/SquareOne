"use client"

import { useMemo, useState } from "react"
import type { BlogPostMeta } from "@/lib/blog"
import FilterBar, { type FilterDef } from "@/components/ui/FilterBar"
import RecordCard from "@/components/ui/RecordCard"

/**
 * Filter bar + card grid for /blog — the same FilterBar and RecordCard as
 * /projects, so the two indexes are one system. `label` is display copy
 * (Canadian English, sentence case); `match` is the original filter token
 * and must not change — it is what post categories and tags are tested
 * against.
 */
const TOPICS: ReadonlyArray<{ label: string; match: string }> = [
  { label: "Municipal", match: "Municipal" },
  { label: "Driveways", match: "Driveways" },
  { label: "Vapour blasting", match: "Vapour Blasting" },
  { label: "Public art", match: "Public Art" },
  { label: "Case studies", match: "Case Studies" },
]

const ALL = "all"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function yearOf(post: BlogPostMeta): string {
  const y = post.date ? new Date(post.date).getFullYear() : Number.NaN
  return Number.isFinite(y) ? String(y) : ""
}

/** Photo caption — category and year, the only location data frontmatter carries. */
function captionFor(post: BlogPostMeta): string {
  return [post.category, yearOf(post)].filter(Boolean).join(" · ")
}

function matchesTopic(post: BlogPostMeta, match: string) {
  const haystack = [post.category, ...(post.tags ?? [])].join(" ").toLowerCase()
  return haystack.includes(match.toLowerCase())
}

interface Props {
  posts: BlogPostMeta[]
}

export default function BlogFilterClient({ posts }: Props) {
  const [topic, setTopic] = useState(ALL)
  const [year, setYear] = useState(ALL)

  const years = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of posts) {
      const y = yearOf(p)
      if (y) counts.set(y, (counts.get(y) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[0].localeCompare(a[0]))
  }, [posts])

  const filters: FilterDef[] = [
    {
      key: "topic",
      label: "Topic",
      value: topic,
      onChange: setTopic,
      options: [
        { value: ALL, label: "All topics" },
        ...TOPICS.map((t) => ({ value: t.match, label: t.label, count: posts.filter((p) => matchesTopic(p, t.match)).length })),
      ],
    },
    {
      key: "year",
      label: "Year",
      value: year,
      onChange: setYear,
      options: [{ value: ALL, label: "All years" }, ...years.map(([y, n]) => ({ value: y, label: y, count: n }))],
    },
  ]

  const active = topic !== ALL || year !== ALL

  const filtered = useMemo(
    () => posts.filter((p) => (topic === ALL || matchesTopic(p, topic)) && (year === ALL || yearOf(p) === year)),
    [posts, topic, year],
  )

  const clear = () => {
    setTopic(ALL)
    setYear(ALL)
  }

  const [lead, ...rest] = filtered

  return (
    // Section shell, background and container come from app/blog/page.tsx —
    // this is a child, not a section of its own.
    <div>
      <FilterBar
        filters={filters}
        summary={`${filtered.length} post${filtered.length !== 1 ? "s" : ""}`}
        onClear={clear}
        active={active}
      />

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[16px] text-[color:var(--ink-body)]">
          Nothing filed under that yet.
        </p>
      ) : (
        <>
          {lead && (
            <div className="mt-10">
              <RecordCard
                lead
                priority
                href={`/blog/${lead.slug}`}
                src={lead.featured_image || undefined}
                alt={lead.title}
                caption={captionFor(lead)}
                kicker={lead.category || undefined}
                title={lead.title}
                description={lead.description}
                meta={lead.date ? formatDate(lead.date) : undefined}
              />
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-10">
              {rest.map((post) => (
                <RecordCard
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  src={post.featured_image || undefined}
                  alt={post.title}
                  caption={captionFor(post)}
                  kicker={post.category || undefined}
                  title={post.title}
                  description={post.description}
                  meta={post.date ? formatDate(post.date) : undefined}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
