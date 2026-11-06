import { getPosts, type BlogPostMeta } from "@/lib/blog"
import { postSlugOf, projects as RECORD, recordJobFor, type Project } from "@/lib/projects"

/**
 * The jobs on record, as the site shows them (6 Nov 2026). Server-only.
 *
 * Until 6 Nov 2026 a project was a document of its own in the Studio with a
 * page under /projects, and most jobs were on the site twice: as that page
 * and as the blog post that told them (Vern: "Projects and blog should be
 * combined into the same thing, not two separate sections"). Now a job is a
 * blog post that carries its facts (lib/blog.ts, Job): the Studio's post
 * wins field by field, the record (lib/projects.ts) fills its gaps and
 * stands in when Sanity can't be reached, and a record project with no post
 * of its own is a post made from its record.
 *
 * getProjects() still answers everything that lists the work: Selected work
 * on the home page, the application and service pages, search. Each Project
 * here is a post's view of a job: `slug` is the post's web address, under
 * /blog/, and `imageUrl` its lead photograph.
 */

/** A post that tells a job, as the lists that show the work read it. */
export function projectOf(post: BlogPostMeta): Project | null {
  const job = post.job
  // No photograph, no place in the lists that show the work (as a project
  // without one never was); the post itself still has its page.
  if (!job || !post.featured_image) return null
  const record = recordJobFor(post.slug)
  return {
    // The job's short name in lists ("Rainbow intersection, Nanaimo"); the post's headline is its page's.
    title: job.name ?? post.title,
    slug: post.slug,
    service: job.service,
    application: job.application,
    city: job.city,
    region: job.region,
    systems: job.systems,
    ...(job.client ? { client: job.client } : {}),
    ...(job.artist ? { artist: job.artist } : {}),
    ...(job.year ? { year: job.year } : {}),
    excerpt: post.description,
    ...(record?.story ? { story: record.story } : {}),
    post: post.slug,
    images: [post.featured_image, ...job.photos].filter(Boolean),
    imageUrl: post.featured_image,
    heroWide: job.heroWide ?? false,
    ...(job.featured ? { featured: true } : {}),
    ...(post.pinned ? { pinned: true, ...(post.pinnedAt ? { pinnedAt: post.pinnedAt } : {}) } : {}),
    ...(job.flag ? { flag: true } : {}),
    ...(job.photoMeta || post.featured_position || post.featured_alt
      ? {
          photoMeta: {
            ...(job.photoMeta ?? {}),
            ...(post.featured_image && (post.featured_position || post.featured_alt)
              ? { [post.featured_image]: { ...(post.featured_alt ? { alt: post.featured_alt } : {}), ...(post.featured_position ? { position: post.featured_position } : {}), ...(post.featured_edit ? { edit: post.featured_edit } : {}) } }
              : {}),
          },
        }
      : {}),
  }
}

/**
 * The jobs among a list of posts: the ones the Studio added (not on record)
 * first, newest post first, then the record's in its own order (the business
 * hierarchy, municipal and civic work first), as the project lists always
 * ran. Pure, so `npm run test:projects` can test it.
 */
export function projectsFrom(posts: readonly BlogPostMeta[]): Project[] {
  const jobs = posts.map(projectOf).filter((p): p is Project => p !== null)
  const rank = new Map(RECORD.map((r, i) => [postSlugOf(r), i]))
  const added = jobs.filter((j) => !rank.has(j.slug))
  const kept = jobs.filter((j) => rank.has(j.slug)).sort((a, b) => (rank.get(a.slug) ?? 0) - (rank.get(b.slug) ?? 0))
  return [...added, ...kept]
}

/**
 * Every job on the site: the Studio's version of each, the record behind it.
 * The record alone when there is no CMS or it can't be reached (getPosts
 * falls back to the files and the record).
 */
export async function getProjects(): Promise<Project[]> {
  return projectsFrom(await getPosts())
}

/** One job by its post's web address, as getProjects() has it. */
export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug)
}
