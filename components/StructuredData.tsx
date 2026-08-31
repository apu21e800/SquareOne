// JSON-LD structured data for SEO — PavingContractor + WebSite.
// Honesty rules (S1-BUILD-PROMPT constitution): no invented ratings, no
// phantom endpoints, no unverified profiles. AggregateRating returns only
// when real, verifiable reviews exist.

const ORG_BASE = {
  "@type": "PavingContractor",
  "@id": "https://squareonepaving.ca/#organization",
  name: "Square One Paving",
  alternateName: "Square One Paving Ltd.",
  url: "https://squareonepaving.ca",
  logo: "https://squareonepaving.ca/images/logo/SquareOne-wordmark-dark.svg",
  image: "https://squareonepaving.ca/images/og-image.png",
  description: "BC's decorative pavement studio since 2000. Stamped asphalt, decorative coatings, preformed thermoplastic, and vapour blasting for municipalities, developers, and residential clients across British Columbia.",
  telephone: "+1-604-466-9902",
  email: "office@squareonepaving.com",
  foundingDate: "2000",
  founder: { "@type": "Person", name: "Jan Stewart" },
  priceRange: "$$$",
  areaServed: [
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "City", name: "Vancouver" },
    { "@type": "City", name: "Victoria" },
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Coquitlam" },
    { "@type": "City", name: "Maple Ridge" },
    { "@type": "City", name: "Nanaimo" },
    { "@type": "City", name: "Ladysmith" },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "505 - 20800 Lougheed Hwy",
      addressLocality: "Maple Ridge",
      addressRegion: "BC",
      postalCode: "V2X 3P2",
      addressCountry: "CA",
    },
  ],
  // sameAs: add the real social profile URLs when the owners confirm them.
  // (The placeholder facebook/instagram/linkedin links were unverified and
  // schema must never point at profiles we cannot confirm exist.)
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Decorative Pavement Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stamped Asphalt", description: "StreetPrint stamped asphalt installations across BC." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Decorative Coatings", description: "StreetBond and MMAX decorative coatings for transit, public realm, and residential surfaces." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Preformed Thermoplastic", description: "TrafficPatterns, DecoMark, and PreMark thermoplastic markings." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vapour Blasting", description: "Mobile vapour blasting for surface preparation and graffiti removal." } },
    ],
  },
}

const WEBSITE = {
  "@type": "WebSite",
  "@id": "https://squareonepaving.ca/#website",
  url: "https://squareonepaving.ca",
  name: "Square One Paving",
  description: "BC's decorative pavement specialists since 2000.",
  publisher: { "@id": "https://squareonepaving.ca/#organization" },
  // No SearchAction: the site has no search endpoint, and schema must not
  // advertise one that does not exist.
}

export default function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [ORG_BASE, WEBSITE],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
