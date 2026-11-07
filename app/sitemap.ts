import type { MetadataRoute } from "next"
import { services } from "@/lib/services"
import { products } from "@/lib/products"
import { getPosts } from "@/lib/blog"
import { WORK_APPS } from "@/lib/work"
import { APP_HEROES } from "@/lib/app-heroes"
import { SITE_URL, abs } from "@/lib/site"

const BASE_URL = SITE_URL

/*
 * 14 Oct 2026: no lastmod where the site doesn't know one. Every page whose
 * words live in code used to say "changed at the last deploy" (69 of 117 on
 * 14 Oct), which says nothing, and Google stops trusting a sitemap whose
 * dates are always "now". Blog posts keep their own dates. IndexNow
 * (scripts/indexnow-submit.mjs) tells Bing about every deploy instead.
 *
 * 3 Nov 2026: rebuilt every hour. A post Sydney published in the Studio
 * was live within a minute and absent from the sitemap for days, because
 * this route was made once at deploy; now a new post or project is listed
 * within the hour.
 *
 * 7 Nov 2026: the photographs ride with their pages (`images`, which Next
 * writes as an image sitemap): a post's lead and, for a job, every
 * photograph of it; a system's opener; an application's opener. Image
 * search is where "stamped asphalt crosswalk" is often typed (Vern: "get
 * meta data on all the images even").
 */

/**
 * An image URL the sitemap can carry: absolute, and escaped for XML. Next
 * writes `images` into <image:loc> as given, and the Studio's CDN URLs carry
 * a query string (`?w=1600&q=82&auto=format`): a raw ampersand there made
 * the whole sitemap unreadable to Google and Bing (review, 7 Nov 2026).
 */
const imageUrl = (src: string) =>
  (src.startsWith("http") ? src : abs(src)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/patterns`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/applications`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/driveways`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/driveways/vancouver`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/driveways/victoria`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/specifiers`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/galleries`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [imageUrl(p.image)],
  }))

  const blogRoutes: MetadataRoute.Sitemap = (await getPosts()).map((post) => {
    const photos = [post.featured_image, ...(post.job?.photos ?? [])].filter((src): src is string => Boolean(src))
    const images = [...new Set(photos.map(imageUrl))]
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "yearly",
      priority: 0.6,
      ...(images.length ? { images } : {}),
    }
  })

  const applicationRoutes: MetadataRoute.Sitemap = WORK_APPS.filter((a) => a.slug !== "driveways").map((a) => {
    const hero = APP_HEROES[a.slug as keyof typeof APP_HEROES]?.src
    return {
      url: `${BASE_URL}/applications/${a.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
      ...(hero ? { images: [imageUrl(hero)] } : {}),
    }
  })

  // 6 Nov 2026: the jobs are blog posts; /projects/<slug> redirects to them (next.config.ts).
  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...applicationRoutes, ...blogRoutes]
}
