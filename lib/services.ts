export interface Service {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  fullDescription: string
  productsIncluded: string[]
  applications: string[]
  idealClients: string[]
  benefits: string[]
  imageUrl: string
  /** Questions answered on the service page, in the site's own words — nothing here that the page does not already say. */
  faqs: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    slug: "stamped-asphalt",
    name: "Stamped Asphalt",
    tagline: "Brick, cobble and slate — pressed into the asphalt you already have.",
    shortDescription:
      "Pattern and colour worked into the asphalt you already have. The stamped asphalt Square One installs is slip-resistant, snowplow safe and built for the 10–20 years of service HUB publishes for StreetPrint®.",
    fullDescription:
      "Stamped asphalt is more than aesthetics — it's functional design that performs. Whether it's a vibrant crosswalk in downtown Vancouver or a subtle traffic pattern on Vancouver Island, HUB's StreetPrint® Imprinting System, installed by Square One crews, delivers precision, colour, and durability. Custom patterns, reflective options, and snowplow-safe surfaces make this the choice for municipalities and developers who demand both form and function.",
    productsIncluded: [
      "StreetPrint Asphalt Imprinting System",
      "StreetBond colour and seal",
      "Custom colour mixing",
    ],
    applications: [
      "Crosswalks",
      "Roundabouts",
      "Traffic calming treatments",
      "Driveways",
      "Commercial entries",
      "Parking lot design elements",
    ],
    idealClients: [
      "BC municipalities",
      "Developers",
      "Landscape architects",
      "Property managers",
      "School districts",
    ],
    benefits: [
      "Slip-resistant textured surface",
      "10–20 year published service life",
      "Snowplow safe",
      "Custom patterns available",
      "Retroreflective options",
      "Fast installation",
    ],
    faqs: [
      { q: "Is stamped asphalt slip-resistant?", a: "Yes. The imprinted surface is textured, so it gives tyres and shoes more to hold than smooth asphalt, and the impression depth is designed to be snowplow safe." },
      { q: "How long does StreetPrint last?", a: "HUB publishes a 10–20 year service life for StreetPrint under municipal traffic, and puts it more simply in its own FAQ: printed asphalt is as durable as the asphalt it is printed on." },
      { q: "Can it be installed over existing asphalt?", a: "Yes, when the asphalt is sound. The surface is reheated and stamped in place, then sealed in colour — no demolition and no new base. The site visit decides whether the existing surface will take a pattern." },
    ],
    imageUrl: "/images/applications/driveways/saanich-ten-mile-point-driveway-streetprint-01.jpg",
  },
  {
    slug: "preformed-thermoplastic",
    name: "Preformed Thermoplastic",
    tagline: "Crosswalks, symbols and street art, fused into the road.",
    shortDescription:
      "Custom thermoplastic markings and inset graphics for roads, parking lots, and commercial spaces. Preformed sheets, cut to the design and heat-fused in place — no spray overspray, no inconsistency.",
    fullDescription:
      "Thermoplastic markings are the gold standard for precision. The preformed systems Square One installs — TrafficPatterns and DecoMark — deliver custom logos, arrows, crosswalks, and graphics that integrate seamlessly with surrounding surfaces. In BC's wet climate, thermoplastic's durability and retroreflective properties make it the choice for municipalities demanding long service life and minimal maintenance.",
    productsIncluded: [
      "TrafficPatterns thermoplastic",
      "DecoMark custom graphics",
      "PreMark preformed markings",
      "DuraTherm inset system",
    ],
    applications: [
      "Crosswalk markings",
      "School zone graphics",
      "Custom logos and branding",
      "Stop bars and arrows",
      "Parking lot layout markings",
      "Transit stop graphics",
    ],
    idealClients: [
      "BC municipalities",
      "School districts",
      "Commercial properties",
      "Transit authorities",
      "Parking operators",
    ],
    benefits: [
      "Retroreflective for night visibility",
      "Quick installation (minimal road closure)",
      "Colours and symbols to the owner's marking standard",
      "Custom shapes and logos",
      "Long service life, minimal maintenance",
      "No spray drift or overspray",
    ],
    faqs: [
      { q: "Can you do custom logos and artwork?", a: "Yes. TrafficPatterns and DecoMark are cut to the design — logos, crosswalk art, wayfinding graphics, community branding — and installed in the owner's marking colours." },
      { q: "How much road closure does a thermoplastic crosswalk need?", a: "Little. The preformed sheets are heat-fused to the pavement in place, so installation is quick and closures are short." },
      { q: "Does preformed thermoplastic hold up in BC's wet climate?", a: "It is specified for it. Durability and retroreflective options are why BC municipalities choose thermoplastic over paint for markings that have to last with minimal maintenance." },
    ],
    imageUrl: "/images/S1_update_v2/photos/Featured%20image%20options/UBC-crosswalk-3-300dpi.jpg",
  },
  {
    slug: "decorative-coatings",
    name: "Decorative Coatings",
    tagline: "Colour that holds under buses, bikes and BC winters.",
    shortDescription:
      "High-performance coatings that add colour and safety to any asphalt or concrete surface. From spray parks to parking lots, the StreetBond system — 150 and the solar-reflective SR — delivers both aesthetics and function.",
    fullDescription:
      "Decorative coatings are the workhorse of modern urban infrastructure. The StreetBond system provides colour, contrast and critical safety features to high-traffic surfaces. Whether it's a spray park in Burnaby, a public art plaza at Langley Events Centre or a decorative fire lane in North Vancouver, StreetBond coatings are designed to perform in harsh climates, resist UV fading and integrate seamlessly with surrounding pavement.",
    productsIncluded: [
      "StreetBond 150 and StreetBond SR coatings",
      "Retroreflective aggregate",
      "Anti-skid formulations",
      "Custom colour matching",
    ],
    applications: [
      "Bike lanes",
      "Bus rapid transit corridors",
      "Parking lots and stalls",
      "Community spaces",
      "School zones",
      "Accessible parking areas",
    ],
    idealClients: [
      "BC municipalities",
      "TransLink and transit agencies",
      "Developers",
      "Strata councils",
      "Landscape architects",
    ],
    benefits: [
      "Retroreflective for night visibility",
      "UV-stable — 8+ year life cycle, easily refreshed",
      "Anti-skid aggregate for wet conditions",
      "High-visibility colour for safety applications",
      "Eco-friendly water-based options",
      "Cost-effective for large areas",
    ],
    faqs: [
      { q: "How long does a StreetBond coating last?", a: "HUB publishes an 8+ year life cycle for StreetBond, and a worn surface is recoated rather than rebuilt." },
      { q: "Is a coloured coating slippery when wet?", a: "No — StreetBond carries an anti-skid aggregate for wet conditions, which is why it is specified for bike lanes, transit lanes and spray parks." },
      { q: "Does it work on concrete as well as asphalt?", a: "Yes. StreetBond bonds to asphalt and to concrete, with the appropriate primer for each." },
    ],
    imageUrl: "/images/S1_update_v2/photos/Featured%20image%20options/Langley-event-3-2048x1536.jpg",
  },
  {
    slug: "vapor-blasting",
    name: "Vapour Blasting",
    tagline: "Clean it, prime it, bring it back — with up to 92% less dust.",
    shortDescription:
      "Mobile vapour blasting for surface cleaning and priming — graffiti, gum and mould off brick and concrete, markings off roads, paint and coatings off steel, decks and hulls. Up to 92% less dust than dry blasting, less water, little to no heat.",
    fullDescription:
      "A powerful, portable blasting solution for surface prep. Vapour blasting uses less water, generates up to 92% less dust, produces little to no heat and creates less environmental impact than the alternatives — while getting the job done faster. It is how Square One primes surfaces for its own coating and thermoplastic installs, and it is offered on its own for road-marking removal, graffiti and mould, paint and stain stripping, fire and smoke damage, and marine coating removal. Mobile across the Lower Mainland and Vancouver Island.",
    productsIncluded: [
      "Portable vapour blasting rig",
      "Water and abrasive media",
      "Runoff management",
      "Masking and surface protection",
    ],
    applications: [
      "Road marking removal",
      "Steel and concrete surface preparation",
      "Graffiti, gum, mould and soot removal",
      "Paint and stain removal",
      "Wood, concrete and steel cleaning",
      "Fire and smoke damage cleaning",
      "Brick and patio cleaning",
      "Iron fence and railing preparation",
      "Limestone, marble and stucco stain removal",
      "Polyurethane deck coating removal for yachting",
      "Marine on-board coating removal and surface preparation",
    ],
    idealClients: [
      "Property managers",
      "Strata councils",
      "BC municipalities",
      "Homeowners",
      "Marine operators",
      "Restoration contractors",
    ],
    benefits: [
      "Up to 92% less dust than dry blasting",
      "Less water than pressure washing",
      "Little to no heat at the surface",
      "Less environmental impact than the alternatives",
      "Faster than the alternatives",
      "Mobile — the rig comes to the site",
    ],
    faqs: [
      { q: "How is vapour blasting different from pressure washing or dry blasting?", a: "It uses less water than pressure washing, produces up to 92% less dust than dry blasting, and puts little to no heat into the surface — so it cleans or strips without the mess or the damage of either." },
      { q: "What can it remove?", a: "Road markings, graffiti, gum, mould and soot, paint and stain, fire and smoke damage, and marine coatings — from concrete, steel and wood." },
      { q: "Do you come to the site?", a: "Yes. The rig is mobile across the Lower Mainland and Vancouver Island, and it is how Square One prepares surfaces for its own coating and thermoplastic work." },
    ],
    imageUrl: "/images/services/vapor-blasting/hero.jpg",
  },
]

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug)
}
