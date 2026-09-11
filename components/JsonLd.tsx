/**
 * One JSON-LD block. Every graph on the site goes through here so the
 * serialisation is the same everywhere: schema.org context, no HTML
 * escaping surprises (the closing-tag sequence is broken so a title
 * containing "</script>" can never end the block early).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data })
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json.replace(/<\//g, "<\\/") }} />
}

/** FAQPage from a list of question/answer pairs — only for FAQs that are visible on the page. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

/** BreadcrumbList — absolute URLs, home first. */
export function breadcrumbSchema(base: string, trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${base}${t.path === "/" ? "" : t.path}`,
    })),
  }
}
