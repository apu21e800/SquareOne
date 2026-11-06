"use client"

import { useMemo, useState } from "react"
import type { BlogPostMeta } from "@/lib/blog"
import { jobLine } from "@/lib/projects"
import FilterBar, { type FilterDef } from "@/components/ui/FilterBar"
import RecordCard from "@/components/ui/RecordCard"

/**
 * Filter bar + the records for /blog, the one section (6 Nov 2026): the jobs
 * and the guides together. `label` is display copy (Canadian English,
 * sentence case); `match` is the filter token, what post categories and tags
 * are tested against, so it changes only with them.
 *
 * 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §3.7): the lead is a hairline
 * row, the rest a grid of frames with their captions under them. A job's
 * frame carries its place, systems and year under it, as the project index
 * did; the posts come pinned first (app/blog/page.tsx, lib/pin.ts), so a
 * pinned post is the lead under any filter it matches, with its label.
 */
const TOPICS: ReadonlyArray<{ label: string; match: string }> = [
  { label: "Crosswalks", match: "Crosswalks" },
  { label: "Municipal", match: "Municipal" },
  { label: "Parks & paths", match: "Parks & Paths" },
  { label: "Driveways", match: "Driveways" },
  { label: "Vapour blasting", match: "Vapour Blasting" },
  { label: "Public art", match: "Public Art" },
  // Was "Case Studies" until 14 Oct 2026: no post carries it and the canon
  // bans the word. The drafter tags every project story and roundup
  // "Project stories" (lib/automation/plan.ts PROJECT_STORIES_TAG), and so
  // does a post made from the record (lib/blog.ts).
  { label: "Project stories", match: "Project stories" },
  { label: "Guides", match: "Guides" },
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

/** Under a job's frame: the place, the systems and the year. A guide's frame carries no caption. */
const captionOf = (post: BlogPostMeta) => (post.job ? jobLine(post.job) : undefined)

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

  // No counts on the options or the summary (the client, 10 Sept 2026, on
  // the projects: "it comes across this is all of our jobs but we have
  // 1000s"); since the jobs joined this list, the same rule holds here.
  const years = useMemo(() => [...new Set(posts.map(yearOf).filter(Boolean))].sort((a, b) => b.localeCompare(a)), [posts])

  const filters: FilterDef[] = [
    {
      key: "topic",
      label: "Topic",
      value: topic,
      onChange: setTopic,
      options: [
        { value: ALL, label: "All topics" },
        ...TOPICS.filter((t) => posts.some((p) => matchesTopic(p, t.match))).map((t) => ({ value: t.match, label: t.label })),
      ],
    },
    {
      key: "year",
      label: "Year",
      value: year,
      onChange: setYear,
      options: [{ value: ALL, label: "All years" }, ...years.map((y) => ({ value: y, label: y }))],
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
        summary={active ? [TOPICS.find((t) => t.match === topic)?.label ?? "", year !== ALL ? year : ""].filter(Boolean).join(" · ") : "Projects and guides"}
        onClear={clear}
        active={active}
      />

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink-body">
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
                position={lead.featured_position}
                caption={captionOf(lead)}
                kicker={lead.category || undefined}
                title={lead.title}
                description={lead.description}
                meta={lead.date ? formatDate(lead.date) : undefined}
                pinned={lead.pinned}
              />
            </div>
          )}

          {rest.length > 0 && (
            <ul data-reveal-group className="mt-12 grid grid-cols-3 gap-x-7 gap-y-12 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-y-8">
              {rest.map((post) => (
                <li key={post.slug} data-reveal>
                  <RecordCard
                    href={`/blog/${post.slug}`}
                    src={post.featured_image || undefined}
                    alt={post.title}
                    position={post.featured_position}
                    caption={captionOf(post)}
                    kicker={post.category || undefined}
                    title={post.title}
                    description={post.description}
                    meta={post.date ? formatDate(post.date) : undefined}
                    pinned={post.pinned}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
