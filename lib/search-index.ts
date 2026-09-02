import fs from "fs"
import path from "path"

import { services } from "@/lib/services"
import { products } from "@/lib/products"
import { projects } from "@/lib/projects"
import { resourceGroups } from "@/lib/resources"
import { getAllPosts } from "@/lib/blog"
import { getWork, WORK_APPS } from "@/lib/work"
import type { SearchEntry } from "@/lib/search-score"

/**
 * Build-time search index — everything the sitewide search can reach:
 * pages, services, products, applications, projects, blog posts, the
 * 90-document specifications library, and imagery. Served frozen by
 * app/api/search-index (force-static), so the fs walking below runs at
 * build, where public/ exists.
 *
 * Imagery comes from two honest sources: lib/work.ts (Square One's own
 * captioned site photography — every project and application photo) and
 * the products/ folders (system reference imagery, labelled as product
 * photography, never as Square One work). The applications/ folders are
 * NOT walked: they mix Square One shots with national reference material.
 *
 * Honesty rules carry through: AI imagery (generated/ dirs, gen- prefix)
 * and AirMark (not an S1 product) never enter the index.
 */

const IMAGE_ROOT = path.join(process.cwd(), "public", "images")
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"])

/** Display casing for brand and place tokens inside humanized filenames. */
const TOKEN_CASE: Record<string, string> = {
  streetprint: "StreetPrint",
  streetbond: "StreetBond",
  streetbondsr: "StreetBondSR",
  trafficpatterns: "TrafficPatterns",
  trafficpatternsxd: "TrafficPatternsXD",
  decomark: "DecoMark",
  duratherm: "DuraTherm",
  durashield: "DuraShield",
  premark: "PreMark",
  mmax: "MMAX",
  ubc: "UBC",
  bc: "BC",
  rbc: "RBC",
  hoa: "HOA",
  translink: "TransLink",
  skytrain: "SkyTrain",
}

function humanize(fileBase: string): string {
  return fileBase
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .split(/[-_]+/)
    .filter((t) => t.length > 0 && !/^\d+$/.test(t))
    .map((t) => TOKEN_CASE[t.toLowerCase()] ?? t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ")
}

/** products/ image dir → product slug (both dash styles exist on disk). */
const PRODUCT_DIR_TO_SLUG: Record<string, string> = {
  streetprint: "streetprint",
  streetbond: "streetbond",
  mmax: "mmax",
  decomark: "decomark",
  durashield: "durashield",
  duratherm: "duratherm",
  premark: "premark",
  "traffic-patterns": "trafficpatterns",
  trafficpatterns: "trafficpatterns",
  "traffic-patterns-xd": "trafficpatterns-xd",
  "trafficpatterns-xd": "trafficpatterns-xd",
}

function listImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter(
      (name) =>
        IMAGE_EXT.has(path.extname(name).toLowerCase()) &&
        !name.toLowerCase().startsWith("gen-"),
    )
}

function imageEntries(): SearchEntry[] {
  const entries: SearchEntry[] = []
  const productName = new Map(products.map((p) => [p.slug, p.name]))

  // Projects — every curated case-study photograph, labelled by its project
  for (const project of projects) {
    project.images.forEach((image, i) => {
      entries.push({
        type: "image",
        title: i === 0 ? project.title : `${project.title} — photo ${i + 1}`,
        subtitle: `Project — ${project.city.split(",")[0].trim()}`,
        href: `/projects/${project.slug}`,
        image,
        keywords: `${project.systems.join(" ")} ${project.application} ${project.city} ${project.client ?? ""}`,
      })
    })
  }

  // The work on record — captioned site photography by application
  const appLabel = new Map(WORK_APPS.map((a) => [a.slug, a.label]))
  for (const photo of getWork()) {
    const label = appLabel.get(photo.app) ?? photo.app
    entries.push({
      type: "image",
      title: photo.place ? `${photo.subject} — ${photo.place}` : photo.subject,
      subtitle: `${photo.systems.join(" + ")} · ${label}`,
      href: photo.app === "driveways" ? "/driveways" : `/applications/${photo.app}`,
      image: photo.src,
      keywords: `${photo.place} ${photo.region ?? ""} ${label} ${photo.systems.join(" ")}`,
    })
  }

  // Products — dir names map to product slugs; airmark is not sold and stays out
  const productsRoot = path.join(IMAGE_ROOT, "products")
  if (fs.existsSync(productsRoot)) {
    for (const dir of fs.readdirSync(productsRoot)) {
      const slug = PRODUCT_DIR_TO_SLUG[dir]
      if (!slug) continue
      const abs = path.join(productsRoot, dir)
      if (!fs.statSync(abs).isDirectory()) continue
      const owner = productName.get(slug)
      for (const file of listImages(abs)) {
        entries.push({
          type: "image",
          title: humanize(file),
          subtitle: owner ? `Product — ${owner}` : "Products",
          href: `/products/${slug}`,
          image: `/images/products/${dir}/${file}`,
          keywords: owner ?? "",
        })
      }
    }
  }

  // Vapour blasting field records
  const vapourDir = path.join(IMAGE_ROOT, "services", "vapor-blasting")
  for (const file of listImages(vapourDir)) {
    entries.push({
      type: "image",
      title: humanize(file),
      subtitle: "Service — Vapour blasting",
      href: "/services/vapor-blasting",
      image: `/images/services/vapor-blasting/${file}`,
      keywords: "vapour blasting restoration cleaning",
    })
  }

  return entries
}

const STATIC_PAGES: SearchEntry[] = [
  { type: "page", title: "Home", subtitle: "Decorative pavement for BC since 2000", href: "/", keywords: "square one paving homepage decorative pavement bc" },
  { type: "page", title: "Services", subtitle: "Stamped asphalt, coatings, thermoplastic, vapour blasting", href: "/services", keywords: "what we do services index" },
  { type: "page", title: "Products", subtitle: "The nine systems we install", href: "/products", keywords: "systems catalogue products index" },
  { type: "page", title: "Applications", subtitle: "Where the work lives — crosswalks to driveways", href: "/applications", keywords: "applications index where we work" },
  { type: "page", title: "Driveways", subtitle: "Stamped asphalt for Victoria & Vancouver homes", href: "/driveways", keywords: "residential homeowner driveway victoria vancouver" },
  { type: "page", title: "Vapour blasting", subtitle: "Cleaning, priming, graffiti and mould removal", href: "/services/vapor-blasting", keywords: "vapor blasting dustless restoration surface prep graffiti mould" },
  { type: "page", title: "Projects", subtitle: "Selected work across BC", href: "/projects", keywords: "case studies portfolio work" },
  { type: "page", title: "Blog", subtitle: "Guides and project stories from BC ground", href: "/blog", keywords: "blog articles guides news stories journal" },
  { type: "page", title: "Resources", subtitle: "90 specifications, colour cards, SDS and guides", href: "/resources", keywords: "documents specs specifications library downloads sds colour cards" },
  { type: "page", title: "About", subtitle: "The crew behind 25 years of BC surfaces", href: "/about", keywords: "company about team gord jan history" },
  { type: "page", title: "Contact", subtitle: "Free site visit and written quote", href: "/contact", keywords: "quote request phone email contact maple ridge" },
]

/** Mirrors the /applications card set — one entry per application page, plus the pillar and the extra service. */
const APPLICATION_CARDS: SearchEntry[] = [
  ...WORK_APPS.map((a) => ({
    type: "application" as const,
    title: a.label,
    subtitle: a.blurb,
    href: a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`,
    keywords: `${a.slug.replace(/-/g, " ")} municipal commercial ${a.label.toLowerCase()}`,
  })),
  { type: "application", title: "Vapour blasting", subtitle: "Cleaning, priming, graffiti and mould removal", href: "/services/vapor-blasting", keywords: "extra service restoration cleaning" },
]

const SERVICE_LABEL: Record<string, string> = {
  "stamped-asphalt": "Stamped asphalt",
  "decorative-coatings": "Decorative coatings",
  "preformed-thermoplastic": "Preformed thermoplastic",
  "vapor-blasting": "Vapour blasting",
}

export function buildSearchIndex(): SearchEntry[] {
  const serviceEntries: SearchEntry[] = services.map((s) => ({
    type: "service",
    title: SERVICE_LABEL[s.slug] ?? s.name,
    subtitle: s.tagline,
    href: `/services/${s.slug}`,
    image: s.imageUrl,
    keywords: `${s.shortDescription} ${s.applications.join(" ")}`,
  }))

  const productEntries: SearchEntry[] = products.map((p) => ({
    type: "product",
    title: p.name,
    subtitle: p.tagline,
    href: `/products/${p.slug}`,
    image: p.image,
    keywords: `${p.category} ${p.shortDescription} ${p.applications.join(" ")}`,
  }))

  const projectEntries: SearchEntry[] = projects.map((p) => ({
    type: "project",
    title: p.title,
    subtitle: [p.city.split(",")[0].trim(), p.systems.join(" + "), p.year].filter(Boolean).join(" · "),
    href: `/projects/${p.slug}`,
    image: p.imageUrl,
    keywords: `${p.excerpt} ${p.application} ${p.region} ${p.client ?? ""} ${p.artist ?? ""}`,
  }))

  const postEntries: SearchEntry[] = getAllPosts().map((post) => ({
    type: "post",
    title: post.title,
    subtitle: [post.category, post.date ? new Date(post.date).getFullYear() : ""]
      .filter(Boolean)
      .join(" · "),
    href: `/blog/${post.slug}`,
    image: post.featured_image || undefined,
    keywords: `${post.description} ${post.tags.join(" ")}`,
  }))

  const documentEntries: SearchEntry[] = resourceGroups.flatMap((group) =>
    group.docs.map((doc) => ({
      type: "document" as const,
      title: doc.name,
      subtitle: `${group.product} · ${doc.type} · ${doc.size}`,
      href: doc.href,
      download: true,
      keywords: `${group.product} ${doc.type} pdf specification document`,
    })),
  )

  return [
    ...STATIC_PAGES,
    ...serviceEntries,
    ...productEntries,
    ...APPLICATION_CARDS,
    ...projectEntries,
    ...documentEntries,
    ...postEntries,
    ...imageEntries(),
  ]
}
