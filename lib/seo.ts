import type { Metadata }from "next"
import { SITE_URL } from "@/lib/site"

const BASE_URL = SITE_URL
const SITE_NAME = "Square One Paving"
const DEFAULT_OG_IMAGE = "/images/og-image.png"
const TITLE_SUFFIX = "Square One Paving"

const clampTitle = (str: string, max = 60) =>
  str.length > max ? str.slice(0, str.lastIndexOf(" ", max - 3)) + "…" : str
const clampDesc = (str: string, max = 155) => clampDescription(str, max)

/**
 * A <title> that fits the 60 characters search results show, keeping as
 * much of the brand as fits: "Title | Square One Paving", then "Title |
 * Square One", then the title alone, then the title cut at a word. A
 * "Place: what happened" title falls back to its first clause first.
 * (19 Sept 2026 — thirty project and post titles ran to 61–72 characters.)
 */
export function pageTitle(title: string, section?: string, max = 60): string {
  const base = title.replace(/\s+/g, " ").trim()
  const candidates = [base]
  if (base.includes(":")) candidates.push(base.split(":")[0].trim())
  if (base.includes(" — ")) candidates.push(base.split(" — ")[0].trim())
  for (const t of candidates) {
    const withSection = section ? `${t} | ${section}` : t
    for (const suffix of [" | Square One Paving", " | Square One", ""]) {
      const full = `${withSection}${suffix}`
      if (full.length <= max) return full
    }
  }
  const cut = base.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(" ")) + "…"
}

/**
 * Meta descriptions are cut by search engines at roughly 155–160 characters.
 * Prefer the last full sentence that fits; otherwise the last whole word
 * plus an ellipsis. Everything on the site funnels through this so no page
 * ships a description that will be truncated mid-thought.
 */
export function clampDescription(str: string, max = 158): string {
  const text = str.replace(/\s+/g, " ").trim()
  if (text.length <= max) return text
  const head = text.slice(0, max)
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("! "), head.lastIndexOf("? "))
  if (sentenceEnd >= max * 0.55) return head.slice(0, sentenceEnd + 1)
  const lastDot = head.endsWith(".") ? head.length : -1
  if (lastDot > 0) return head
  return head.slice(0, head.lastIndexOf(" ")).replace(/[,;:—–-]$/, "") + "…"
}

interface SeoOptions {
  title: string
  description: string
  slug?: string
  type?: "website" | "article"
  image?: string
  publishedTime?: string
}

export function buildMetadata({
  title,
  description,
  slug = "",
  type = "website",
  image = DEFAULT_OG_IMAGE,
  publishedTime,
}: SeoOptions): Metadata {
  const url = slug ? `${BASE_URL}/${slug}` : BASE_URL
  const imageUrl = `${BASE_URL}${image}`
  const fullTitle = `${title} | ${TITLE_SUFFIX}`
  const clampedTitle = clampTitle(fullTitle)
  const clampedDesc = clampDesc(description)

  return {
    // Absolute: the root layout's title template would append the brand a second time.
    title: { absolute: clampedTitle },
    description: clampedDesc,
    openGraph: {
      title: clampedTitle,
      description: clampedDesc,
      url,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 600, alt: title }],
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: clampedTitle,
      description: clampedDesc,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
