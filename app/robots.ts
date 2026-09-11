import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Studio is the CMS; the two harnesses are internal. /search stays
      // crawlable (noindex on the page) so the WebSite SearchAction resolves.
      disallow: ["/admin/", "/api/", "/studio/", "/type-test", "/mobile-preview"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
