import fs from "fs"
import path from "path"

import { services } from "@/lib/services"
import { products } from "@/lib/products"
import { projects } from "@/lib/projects"
import { resourceGroups } from "@/lib/resources"
import { getAllPosts } from "@/lib/blog"
import type { SearchEntry } from "@/lib/search-score"

/**
 * Build-time search index — everything the sitewide search can reach:
 * pages, services, products, applications, projects, journal posts, the
 * 90-document specifications library, and gallery imagery (by humanized
 * filename). Served frozen by app/api/search-index (force-static), so the
 * fs walking below runs at build, where public/ exists.
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
  const projectTitle = new Map(projects.map((p) => [p.slug, p.title]))
  const productName = new Map(products.map((p) => [p.slug, p.name]))

  // Projects — each slug dir belongs to a project page
  const projectsRoot = path.join(IMAGE_ROOT, "projects")
  if (fs.existsSync(projectsRoot)) {
    for (const slug of fs.readdirSync(projectsRoot)) {
      const dir = path.join(projectsRoot, slug)
      if (!fs.statSync(dir).isDirectory() || slug === "generated") continue
      const owner = projectTitle.get(slug)
      for (const file of listImages(dir)) {
        entries.push({
          type: "image",
          title: humanize(file),
          subtitle: owner ? `Project — ${owner}` : "Projects",
          href: owner ? `/projects/${slug}` : "/projects",
          image: `/images/projects/${slug}/${file}`,
          keywords: slug.replace(/-/g, " "),
        })
      }
    }
  }

  // Applications — category dirs roll up to /applications (driveways → /driveways)
  const appsRoot = path.join(IMAGE_ROOT, "applications")
  if (fs.existsSync(appsRoot)) {
    for (const cat of fs.readdirSync(appsRoot)) {
      const dir = path.join(appsRoot, cat)
      if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory() || cat === "generated") continue
      const isDriveway = cat === "driveways" || cat === "private-driveways"
      for (const file of listImages(dir)) {
        entries.push({
          type: "image",
          title: humanize(file),
          subtitle: `Applications — ${humanize(cat)}`,
          href: isDriveway ? "/driveways" : "/applications",
          image: `/images/applications/${cat}/${file}`,
          keywords: cat.replace(/-/g, " "),
        })
      }
    }
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
  { type: "page", title: "Blog", subtitle: "Field notes from BC ground", href: "/blog", keywords: "blog articles field notes news journal" },
  { type: "page", title: "Resources", subtitle: "90 specifications, colour cards, SDS and guides", href: "/resources", keywords: "documents specs specifications library downloads sds colour cards" },
  { type: "page", title: "About", subtitle: "The crew behind 25 years of BC surfaces", href: "/about", keywords: "company about team gord jan history" },
  { type: "page", title: "Contact", subtitle: "Free site visit and written quote", href: "/contact", keywords: "quote request phone email contact maple ridge" },
]

/** Mirrors the /applications card set — keep in step with app/applications/page.tsx. */
const APPLICATION_CARDS: SearchEntry[] = [
  { type: "application", title: "Commercial spaces", subtitle: "Plazas, retail thresholds and strata surfaces", href: "/applications", keywords: "commercial strata retail plaza" },
  { type: "application", title: "Crosswalks", subtitle: "Decorative and high-visibility crossings", href: "/applications", keywords: "municipal crosswalk pedestrian crossing" },
  { type: "application", title: "Bus & bike lanes", subtitle: "Red and green priority-lane surfacing", href: "/applications", keywords: "transit bus bike lane red green municipal" },
  { type: "application", title: "Parking areas", subtitle: "Thresholds, stall markings, accessible-space graphics", href: "/applications", keywords: "parking lot commercial stall" },
  { type: "application", title: "Parks, paths & walkways", subtitle: "Greenways and park paths with pattern underfoot", href: "/applications", keywords: "park path greenway walkway municipal" },
  { type: "application", title: "Public art", subtitle: "Artist-designed pavement, rendered durably", href: "/applications", keywords: "civic first nations artwork mural" },
  { type: "application", title: "Traffic calming & roundabouts", subtitle: "Raised crossings, speed tables, roundabout aprons", href: "/applications", keywords: "municipal roundabout speed table raised crossing" },
  { type: "application", title: "Driveways", subtitle: "Brick, cobble and slate for Victoria & Vancouver homes", href: "/driveways", keywords: "residential homeowner driveway" },
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
    subtitle: [p.city.split(",")[0].trim(), p.service, p.year].filter(Boolean).join(" · "),
    href: `/projects/${p.slug}`,
    image: p.imageUrl,
    keywords: `${p.excerpt} ${p.application}`,
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
