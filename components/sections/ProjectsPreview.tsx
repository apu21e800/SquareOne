import { Section } from "@/components/ui/Container"
import RecordCard from "@/components/ui/RecordCard"
import Heading from "@/components/ui/Heading"
import { getPosts, type BlogPostMeta } from "@/lib/blog"
import { jobLine } from "@/lib/projects"
import { postDate } from "@/lib/dates"
import { selectedWork } from "@/lib/selected-work"
import { HOME_COPY, type SectionWords } from "@/lib/page-copy"

/** Under a job's photograph: its place, systems and year, as on /blog. A guide's carries none. */
const captionOf = (post: BlogPostMeta) => (post.job ? jobLine(post.job) : undefined)

/** What the photograph shows: the office's line when it wrote one, else the job, the system and the place. */
function altFor(post: BlogPostMeta): string {
  if (post.featured_alt) return post.featured_alt
  if (post.job) return `${post.job.name ?? post.title}, ${post.job.systems.join(" and ")} installed by Square One in ${post.job.city}`
  return post.title
}

/** One record, as /blog sets it (components/blog/BlogFilterClient.tsx): kicker, title, a line or two, the date. */
function record(post: BlogPostMeta) {
  return {
    href: `/blog/${post.slug}`,
    src: post.featured_image || undefined,
    alt: altFor(post),
    position: post.featured_position,
    caption: captionOf(post),
    kicker: post.category || undefined,
    title: post.title,
    description: post.description,
    meta: post.date ? postDate(post.date) : undefined,
    pinned: post.pinned,
  }
}

/**
 * Selected work. 6 Nov 2026 (Vern, with a screenshot of /blog: "let's get
 * the projects section on the homepage looking like the Projects parent
 * page, with the most recent or pinned post stand-alone at the top"): set
 * as /blog sets its records. The pinned post, else the newest, leads on a
 * hairline row of its own, the photograph left with its caption under it
 * and the words beside it; under it one row of three of the strongest jobs
 * (lib/selected-work.ts), each with its caption, kicker, title, a line or
 * two and the date. No project count anywhere: a published count reads as
 * a ceiling on the work (the client, 10 Sept 2026).
 *
 * Before this it was six equal 3:2 frames with only a name and a line
 * under each (2 Oct 2026). The section sits far below the fold, so the
 * lead's photograph loads lazily, unlike /blog's.
 */
export default async function ProjectsPreview({ words = HOME_COPY.projects }: { words?: SectionWords } = {}) {
  const { lead, rest } = selectedWork(await getPosts())

  return (
    <Section id="work" label={words.label} title={<Heading words={words} />} link={{ href: "/blog", label: "All projects" }} tone="warm" wide>
      {lead && (
        // Its own wrapper, so the row takes its hairline under it as well as over it.
        <div>
          <RecordCard lead titleAs="h3" {...record(lead)} />
        </div>
      )}
      {rest.length > 0 && (
        // Three across down to a phone, where each folds into a list row.
        <ul data-reveal-group className="mt-12 grid grid-cols-3 gap-x-7 gap-y-12 max-[700px]:grid-cols-1 max-[700px]:gap-y-8" role="list">
          {rest.map((post) => (
            <li key={post.slug} data-reveal>
              <RecordCard {...record(post)} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
