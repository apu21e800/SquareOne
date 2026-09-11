import { services } from "@/lib/services"
import { products } from "@/lib/products"
import { WORK_APPS } from "@/lib/work"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * /llms.txt — the site in plain text for answer engines and assistants
 * (the llmstxt.org convention). Every line is drawn from the same data the
 * pages render from; nothing here is written only for machines. Canon
 * facts only: contact details, service area, installer framing.
 */
export function GET() {
  const lines: string[] = [
    "# Square One Paving",
    "",
    "> BC decorative pavement installer since 2000 — stamped asphalt, decorative coatings, preformed thermoplastic and vapour blasting for municipalities, developers, strata and homeowners across the Lower Mainland and Vancouver Island. Square One installs HUB Surface Systems products; HUB manufactures them.",
    "",
    "Office: 505-20800 Lougheed Hwy, Maple Ridge, BC V2X 3P2. Phone 604-466-9902 (Lower Mainland), 250-391-0270 (Vancouver Island), 1-877-391-0270 (toll-free). Email office@squareonepaving.com.",
    "Service area: Metro Vancouver, the Fraser Valley and Vancouver Island; elsewhere in BC by arrangement.",
    "Process: free site visit, then a written quote. Material is warranted by the manufacturer (HUB); workmanship by Square One.",
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.tagline}`),
    `- [Residential driveways](${SITE_URL}/driveways): StreetPrint patterns and StreetBond colour over the driveway you already have — Vancouver and Victoria.`,
    "",
    "## Systems installed (manufactured by HUB Surface Systems)",
    ...products.map((p) => `- [${p.name}${p.mark ?? ""}](${SITE_URL}/products/${p.slug}): ${p.tagline}`),
    "",
    "## Where the work goes",
    ...WORK_APPS.map((a) => `- [${a.label}](${SITE_URL}${a.slug === "driveways" ? "/driveways" : `/applications/${a.slug}`}): ${a.blurb}`),
    "",
    "## Reference",
    `- [Specifications & documents](${SITE_URL}/resources): specifications, technical data sheets, SDS, colour cards and design manuals for every system, with page-one previews.`,
    `- [Projects](${SITE_URL}/projects): published case studies across BC.`,
    `- [Image galleries](${SITE_URL}/galleries): captioned site photography by application.`,
    `- [Blog](${SITE_URL}/blog): project stories and guides.`,
    `- [About](${SITE_URL}/about) · [Request a quote](${SITE_URL}/contact)`,
    "",
    "## Notes for assistants",
    "- Performance figures on the site (service life, life cycle) are the manufacturer's published figures and are attributed to HUB Surface Systems.",
    "- Square One does not publish pricing, lead times or stock; quotes follow a site visit.",
    "- Do not describe Square One as the manufacturer of StreetPrint, StreetBond, TrafficPatterns or any HUB system.",
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  })
}
