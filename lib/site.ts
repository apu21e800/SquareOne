/**
 * The one public origin of the site. Every canonical, sitemap entry, JSON-LD
 * @id and OG URL derives from here — nothing else may hard-code the host.
 *
 * Until 11 Sept 2026 the codebase carried both: 34 references to
 * squareonepaving.ca (canonicals, schema, OG) and 2 to squareonepaving.com
 * (sitemap, robots). A sitemap on one host listing pages whose canonicals
 * point at another is the kind of SEO mistake that is expensive to undo.
 *
 * The default is www.squareonepaving.com — with the www. Two reasons, both
 * checked on 19 Sept 2026, the day after the domain moved to Vercel:
 * Vercel serves production on www and 308s the bare domain to it, and every
 * URL the old WordPress site held in Google's index (Semrush, CA database)
 * was a www URL. A canonical that names the bare host on a page served from
 * www is a self-inflicted canonical mismatch, and one that throws away the
 * old index. If production is ever moved to the bare domain, set
 * NEXT_PUBLIC_SITE_URL in Vercel and redeploy; do not hand-edit hosts
 * anywhere else.
 */
export const SITE_URL: string = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.squareonepaving.com").replace(/\/+$/, "")

/** Absolute URL for a site path. `abs("/products")` → "https://www.squareonepaving.com/products". */
export function abs(path = ""): string {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}
