import Frame from "@/components/ui/Frame"
import { Section } from "@/components/ui/Container"
import { getPosts, type BlogPostMeta } from "@/lib/blog"
import { jobLine } from "@/lib/projects"
import Heading from "@/components/ui/Heading"
import PinnedLabel from "@/components/ui/PinnedLabel"
import { pinnedFirst } from "@/lib/pin"
import { HOME_COPY, type SectionWords } from "@/lib/page-copy"

/* Curated order — adjacent frames alternate warm/cool dominance
   (SOUL-PASS MOVE 5); slugs missing from the data fall through to
   the default featured order. */
const FEATURED_ORDER = [
  // 28 Sept 2026, second image pass (Vern: "more recent images… feature the
  // best looking"): newest first. The two large frames are the two
  // strongest 2025 projects; the four under them run 2025, 2024, 2023, 2023,
  // Island and Mainland. UBC (2019) and the Langley Events Centre moved off
  // the home page; both lead their own pages.
  "nanaimo-rainbow-intersection", // warm — full spectrum, 2025
  "white-rock-custom-crosswalk", // cool — sea blues, 2025
  "south-langford-elementary", // warm — alphabet path, 2025
  "victoria-high-school-whorl-canoes", // cool — turquoise, Victoria, 2024
  "boundary-road-pump-station", // warm — the quilt, 2023
  "every-child-matters-new-westminster", // warm — orange, 2023
]

/** Under a frame: a job's place, systems and year; any other post's section and year. */
function metaFor(post: BlogPostMeta): string {
  if (post.job) return jobLine(post.job)
  const year = post.date ? new Date(post.date).getFullYear() : Number.NaN
  return [post.category, Number.isFinite(year) ? String(year) : ""].filter(Boolean).join(" · ")
}

/** The name under the frame: a job's short name ("Rainbow intersection, Nanaimo"), else the post's title. */
const nameOf = (post: BlogPostMeta) => post.job?.name ?? post.title

/** What the photograph shows: the office's line when it wrote one, else the job, the system and the place. */
function altFor(post: BlogPostMeta): string {
  if (post.featured_alt) return post.featured_alt
  if (post.job) return `${nameOf(post)}, ${post.job.systems.join(" and ")} installed by Square One in ${post.job.city}`
  return post.title
}

/**
 * Selected work — 26 Sept 2026 (docs/OWN-COMPANY-BRIEF.md §9.8): six
 * square-cornered frames with the title and the record's place · system ·
 * year UNDER each, in the serif. No scrim, no overlay, no chips, no hover
 * zoom. No project count anywhere: a published count reads as a ceiling on
 * the work (the client, 10 Sept 2026).
 *
 * 6 Nov 2026: the jobs are blog posts (lib/blog.ts, Job), so the six are
 * posts, each linking to /blog/<slug>, and the pinned post leads them.
 */
export default async function ProjectsPreview({ words = HOME_COPY.projects }: { words?: SectionWords } = {}) {
  // The six read the Studio's version of each job; which six, and their
  // order, stay FEATURED_ORDER (by the post's web address), else the posts
  // the Studio marks "Featured".
  const posts = (await getPosts()).filter((p) => p.featured_image)
  const featured = posts.filter((p) => p.job?.featured)
  const curated = FEATURED_ORDER.map((slug) => posts.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p))
  const six = (curated.length === 6 ? curated : featured).slice(0, 6)
  // Pin to top (lib/pin.ts): the newest pinned post, from the whole list,
  // leads the six with its label; the five behind it keep their order, and
  // a pinned post among them is not shown twice.
  const ordered = pinnedFirst(posts)
  const lead = ordered[0]?.pinned ? ordered[0] : undefined
  const shown = lead ? [lead, ...six.filter((p) => p.slug !== lead.slug).map((p) => ({ ...p, pinned: false }))].slice(0, 6) : six.map((p) => ({ ...p, pinned: false }))

  // 28 Sept 2026 (Vern: "they are just thumbnails on a page"): an
  // editorial grid, two large frames and then four. 2 Oct 2026 (Vern:
  // "image sections still look too chunky"): six equal frames, three
  // across, 3:2, as the live site set them; the same six, the same
  // captions under them.
  const item = (post: (typeof shown)[number]) => (
    <li key={post.slug} data-reveal>
      <Frame
        src={post.featured_image}
        alt={altFor(post)}
        position={post.featured_position}
        aspect="aspect-[3/2]"
        sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 400px"
        href={`/blog/${post.slug}`}
        caption={
          <>
            {post.pinned && <PinnedLabel className="mb-1" />}
            <span className="block not-italic font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
              {nameOf(post)}
            </span>
            <span className="block">{metaFor(post)}</span>
          </>
        }
      />
    </li>
  )

  return (
    <Section id="work" label={words.label} title={<Heading words={words} />} link={{ href: "/blog", label: "All projects" }} tone="warm" wide>
      <ul data-reveal-group className="grid grid-cols-3 gap-x-7 gap-y-11 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1" role="list">
        {shown.map((p) => item(p))}
      </ul>
    </Section>
  )
}
