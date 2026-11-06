import { postSlugOf, projects } from "./projects"

/**
 * The project pages' addresses, redirected to the posts that tell the jobs
 * (6 Nov 2026, Vern: "Projects and blog should be combined into the same
 * thing, not two separate sections"). Until then every job on record had a
 * page under /projects, and most had a post as well.
 *
 *  - /projects goes to /blog, the one section (the site calls it Projects).
 *  - A record project with a post of its own goes to that post; the rest,
 *    and any project the office had added in the Studio, go to the post of
 *    the same slug (the migration, scripts/merge-projects-into-posts.ts,
 *    makes one for each).
 *
 * Read by next.config.ts, so they resolve at the edge, before any page.
 * Permanent: the old addresses are in Google's index and in links.
 */
export function projectRedirects(): { source: string; destination: string; permanent: true }[] {
  const named = projects
    .filter((p) => p.post && p.post !== p.slug)
    .map((p) => ({ source: `/projects/${p.slug}`, destination: `/blog/${postSlugOf(p)}`, permanent: true as const }))
  return [
    { source: "/projects", destination: "/blog", permanent: true },
    ...named,
    { source: "/projects/:slug", destination: "/blog/:slug", permanent: true },
  ]
}
