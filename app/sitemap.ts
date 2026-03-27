import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"
import { products } from "@/lib/products"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://squareonepaving.ca"
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/stamped-asphalt`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/decorative-coatings`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/preformed-thermoplastic`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/vapor-blasting`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/applications/private-driveways`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...staticPages, ...projectPages, ...productPages]
}
