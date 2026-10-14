import { SITE_URL } from "@/lib/site"
import { scriptJson } from "@/components/JsonLd"
import { DEFAULT_SETTINGS, addressParts, schemaPhone, type SiteSettings } from "@/lib/site-settings"
// JSON-LD structured data for SEO — PavingContractor + WebSite.
// Honesty rules (S1-BUILD-PROMPT constitution): no invented ratings, no
// phantom endpoints, no unverified profiles. AggregateRating returns only
// when real, verifiable reviews exist.

/** Who Square One is: everything here but the lines, email, address and accounts. */
const ORG_HEAD = {
  "@type": "PavingContractor",
  "@id": `${SITE_URL}/#organization`,
  name: "Square One Paving",
  alternateName: "Square One Paving Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/SquareOne-wordmark-dark.svg`,
  image: `${SITE_URL}/images/og-image.png`,
  description: "BC's decorative pavement studio since 2000. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapour blasting for municipalities, developers, and residential clients across British Columbia.",
}

// No priceRange (would be invented), no founder (not stated anywhere on
// record), no geo / openingHours until Vern supplies them — a wrong
// coordinate or opening hour is worse than none.
const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "British Columbia" },
  { "@type": "AdministrativeArea", name: "Lower Mainland" },
  { "@type": "AdministrativeArea", name: "Vancouver Island" },
  { "@type": "City", name: "Vancouver" },
  { "@type": "City", name: "Victoria" },
  { "@type": "City", name: "Surrey" },
  { "@type": "City", name: "Burnaby" },
  { "@type": "City", name: "Richmond" },
  { "@type": "City", name: "Coquitlam" },
  { "@type": "City", name: "Maple Ridge" },
  { "@type": "City", name: "Nanaimo" },
  { "@type": "City", name: "Ladysmith" },
]

const OFFER_CATALOG = {
  "@type": "OfferCatalog",
  name: "Decorative Pavement Services",
  itemListElement: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stamped Asphalt", url: `${SITE_URL}/services/stamped-asphalt`, description: "StreetPrint and TrafficPatternsXD stamped asphalt installations across BC." } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Decorative Coatings", url: `${SITE_URL}/services/decorative-coatings`, description: "StreetBond and DuraShield coatings for transit, public realm, commercial and residential surfaces." } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Preformed Thermoplastic", url: `${SITE_URL}/services/preformed-thermoplastic`, description: "TrafficPatterns, DecoMark, DuraTherm and PreMark thermoplastic markings." } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vapour Blasting", url: `${SITE_URL}/services/vapor-blasting`, description: "Mobile vapour blasting for surface preparation, and graffiti and marking removal." } },
  ],
}

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Square One Paving",
  description: "BC's decorative pavement specialists since 2000.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  // SearchAction is real: /search?q= renders full grouped results over the
  // build-time index (pages, systems, projects, documents, blog, imagery).
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

/**
 * The organisation's lines, email, address and accounts, from Site Settings
 * (lib/site-settings.ts, 14 Oct 2026): the schema says exactly what the
 * footer says, and no more. The office is the primary `telephone`; the
 * Island and toll-free lines ride as contact points.
 */
export function organization(s: SiteSettings) {
  const address = addressParts(s)
  return {
    ...ORG_HEAD,
    telephone: schemaPhone(s.phoneOffice),
    email: s.email,
    foundingDate: "2000",
    contactPoint: [
      { "@type": "ContactPoint", telephone: schemaPhone(s.phoneOffice), contactType: "customer service", areaServed: "Lower Mainland, BC", availableLanguage: "en" },
      { "@type": "ContactPoint", telephone: schemaPhone(s.phoneIsland), contactType: "customer service", areaServed: "Vancouver Island, BC", availableLanguage: "en" },
      { "@type": "ContactPoint", telephone: schemaPhone(s.phoneTollFree), contactType: "customer service", areaServed: "CA", availableLanguage: "en" },
    ],
    areaServed: AREA_SERVED,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: "CA",
      },
    ],
    // sameAs mirrors the footer's published social links exactly: schema
    // may only point where the site itself points.
    sameAs: [s.facebook, s.instagram, s.linkedin, s.youtube, ...(s.tiktok ? [s.tiktok] : [])],
    hasOfferCatalog: OFFER_CATALOG,
  }
}

export default function StructuredData({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) {
  const json = {
    "@context": "https://schema.org",
    "@graph": [organization(settings), WEBSITE],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: scriptJson(json) }}
    />
  )
}
