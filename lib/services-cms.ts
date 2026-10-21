import { groq } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/client"
import { has } from "@/lib/page-copy"
import { services as RECORD, type Service } from "@/lib/services"

/**
 * The four services, with the Studio's words on top (14 Oct 2026, as
 * hubss.com's products and applications). Server-only.
 *
 * lib/services.ts stays the record: the names and web addresses, the
 * systems and applications a service links to, the photographs. The office
 * edits the words a visitor reads: the one-line tagline, the intro, who we
 * work with, what you get, and the questions. Each field the Studio has
 * wins; a blank one, an empty list, or no Sanity at all shows the record's,
 * so a service nobody has touched is the page it was. The Studio can't add
 * or remove a service: there are four, and their addresses are fixed.
 */

export interface ServiceDoc {
  slug?: string
  tagline?: string
  shortDescription?: string
  idealClients?: string[]
  benefits?: string[]
  faqs?: { q?: string; a?: string }[]
}

const QUERY = groq`*[_type == "service" && defined(slug)]{ slug, tagline, shortDescription, idealClients, benefits, faqs[]{ q, a } }`

const text = (v: unknown, code: string): string => (has(v) ? v.trim() : code)
const lines = (v: unknown, code: string[]): string[] => {
  const out = Array.isArray(v) ? v.filter(has).map((l) => l.trim()) : []
  return out.length ? out : code
}

/** One service: the record with the Studio's words on top, field by field. Pure, for the tests. */
export function mergeService(code: Service, doc: ServiceDoc | null | undefined): Service {
  if (!doc) return code
  const faqs = (doc.faqs ?? []).filter((f) => has(f?.q) && has(f?.a)).map((f) => ({ q: (f.q as string).trim(), a: (f.a as string).trim() }))
  return {
    ...code,
    tagline: text(doc.tagline, code.tagline),
    shortDescription: text(doc.shortDescription, code.shortDescription),
    idealClients: lines(doc.idealClients, code.idealClients),
    benefits: lines(doc.benefits, code.benefits),
    faqs: faqs.length ? faqs : code.faqs,
  }
}

/** Every service, in the record's order, with the Studio's words on top. */
export async function getStudioServices(): Promise<Service[]> {
  const docs = await sanityFetch<ServiceDoc[]>(QUERY, {}, ["sanity", "services"])
  const bySlug = new Map((docs ?? []).filter((d) => d?.slug).map((d) => [d.slug as string, d]))
  return RECORD.map((s) => mergeService(s, bySlug.get(s.slug)))
}

/** One service by its web address, as getStudioServices() has it. */
export async function getStudioService(slug: string): Promise<Service | undefined> {
  return (await getStudioServices()).find((s) => s.slug === slug)
}
