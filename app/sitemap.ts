import type { MetadataRoute } from "next"
import { services } from "@/lib/services"
import { getProjects } from "@/lib/projects-cms"
import { products } from "@/lib/products"
import { getPosts } from "@/lib/blog"
import { WORK_APPS } from "@/lib/work"
import { SITE_URL } from "@/lib/site"

const BASE_URL = SITE_URL

/*
 * 14 Oct 2026: no lastmod where the site doesn't know one. Every page whose
 * words live in code used to say "changed at the last deploy" (69 of 117 on
 * 14 Oct), which says nothing, and Google stops trusting a sitemap whose
 * dates are always "now". Blog posts keep their own dates. IndexNow
 * (scripts/indexnow-submit.mjs) tells Bing about every deploy instead.
 */
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
      url: `${BASE_URL}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
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
  }))

  const projectRoutes: MetadataRoute.Sitemap = (await getProjects()).map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = (await getPosts()).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  const applicationRoutes: MetadataRoute.Sitemap = WORK_APPS.filter((a) => a.slug !== "driveways").map((a) => ({
    url: `${BASE_URL}/applications/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...applicationRoutes, ...projectRoutes, ...blogRoutes]
}
