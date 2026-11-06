import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Studio is the CMS. /search stays crawlable (noindex on the page) so
      // the WebSite SearchAction resolves. The two internal harnesses
      // (/type-test, /mobile-preview) came off the site on 3 Nov 2026.
      disallow: ["/admin/", "/api/", "/studio/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
