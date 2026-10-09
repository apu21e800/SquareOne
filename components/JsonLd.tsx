/**
 * JSON for inside a <script> tag. Every "<", ">" and "&" is written as its
 * \u escape, which JSON reads as the same character, so no title, caption or
 * blog post typed into the Studio can close the tag or open a new one
 * ("</script><script>…" in a blog headline could have run on the page). The
 * security sweep of 9 Oct 2026; until then only "</" was broken up here, and
 * the blog's Article block and the site-wide graph weren't escaped at all.
 */
export function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")
}

/**
 * One JSON-LD block. Every graph on the site goes through here so the
 * serialisation is the same everywhere: schema.org context, escaped with
 * scriptJson.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = scriptJson(Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data })
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
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
