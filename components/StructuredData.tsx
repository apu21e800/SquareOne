// JSON-LD structured data for SEO — LocalBusiness, Organization, WebSite

const ORG_BASE = {
  "@type": "PavingContractor",
  "@id": "https://squareonepaving.ca/#organization",
  name: "Square One Paving",
  alternateName: "Square One Paving Ltd.",
  url: "https://squareonepaving.ca",
  logo: "https://squareonepaving.ca/images/logo/SquareOne-wordmark-dark.svg",
  image: "https://squareonepaving.ca/images/og-image.jpg",
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
  sameAs: [
    "https://facebook.com/squareonepaving",
    "https://instagram.com/squareonepaving",
    "https://linkedin.com/company/squareonepaving",
  ],
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
}

const WEBSITE = {
  "@type": "WebSite",
  "@id": "https://squareonepaving.ca/#website",
  url: "https://squareonepaving.ca",
  name: "Square One Paving",
  description: "BC's decorative pavement specialists since 2000.",
  publisher: { "@id": "https://squareonepaving.ca/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://squareonepaving.ca/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
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
