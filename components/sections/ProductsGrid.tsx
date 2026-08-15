import Image from "next/image"
import Link from "next/link"

const products = [
  {
    name: "StreetPrint",
    slug: "streetprint",
    description: "Stamped asphalt that mimics brick, cobblestone, and custom patterns. Durable, beautiful, and functional.",
    image: "/images/products/streetprint/streetprint-1.jpg",
  },
  {
    name: "StreetBond",
    slug: "streetbond",
    description: "High-performance coloured pavement coating for bike lanes, crosswalks, plazas, and driveways.",
    image: "/images/products/streetbond/streetbond-1.jpg",
  },
  {
    name: "TrafficPatterns",
    slug: "trafficpatterns",
    description: "Preformed thermoplastic with decorative patterns for crosswalks, transit stops, and pedestrian zones.",
    image: "/images/products/traffic-patterns/trafficpatterns-1.jpg",
  },
  {
    name: "TrafficPatternsXD",
    slug: "trafficpatterns-xd",
    description: "Heavy-duty thermoplastic engineered for high-traffic intersections and transit corridors.",
    image: "/images/products/traffic-patterns-xd/trafficpatterns-xd-1.jpg",
  },
  {
    name: "DecoMark",
    slug: "decomark",
    description: "Decorative pavement marking system combining aesthetics with high-visibility safety performance.",
    image: "/images/products/decomark/decomark-1.jpg",
  },
  {
    name: "DuraShield",
    slug: "durashield",
    description: "Protective pavement coating that seals and beautifies asphalt surfaces while extending their lifespan.",
    image: "/images/products/durashield/durashield-parking-lot-sealcoat-01.jpg",
  },
  {
    name: "DuraTherm",
    slug: "duratherm",
    description: "Thermoplastic pavement marking with exceptional durability for road markings and zone delineation.",
    image: "/images/products/duratherm/duratherm-1.jpg",
  },
  {
    name: "MMAX",
    slug: "mmax",
    description: "MMA-based coloured pavement system for bus rapid transit lanes and high-wear urban corridors.",
    image: "/images/products/mmax/mmax-red-bus-lane-downtown-highrise-01.jpg",
  },
  {
    name: "PreMark",
    slug: "premark",
    description: "Preformed thermoplastic road markings — arrows, legends, crosswalks — built for longevity.",
    image: "/images/products/premark/premark-arrows-installation-intersection-01.jpg",
  },
]

export default function ProductsGrid() {
  return (
    <section className="w-full py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-[#D66620] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Products We Apply
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-[#333333] leading-tight">
              Our Systems
            </h2>
            <p className="text-[#626262] max-w-sm text-sm leading-relaxed">
              Industry-leading surface systems — specified by 500+ Canadian municipalities and installed by our certified crews.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-[#D66620]/40 to-transparent" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block bg-white rounded-xl overflow-hidden border border-[#E8E4DE] hover:border-[#D66620]/40 hover:shadow-lg transition-all duration-200"
            >
              {/* Product image */}
              <div className="relative aspect-video bg-[#F2EFE9] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Card content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#333333] mb-1.5">
                  {product.name}
                </h3>
                <p className="text-[#626262] text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>
                <span className="text-[#D66620] text-xs font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-200">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Credential trust signal */}
        <div className="mt-14 pt-10 border-t border-[#E8E4DE] flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[#333333] text-sm font-bold">Manufacturer-Certified Installer</span>
              <span className="text-[#626262] text-xs mt-0.5">Authorized Applicator — Western Canada</span>
            </div>
          </div>
          <Link
            href="/contact"
            className="text-sm text-[#D66620] hover:text-[#C05A18] font-semibold transition-colors"
          >
            Request a Spec Sheet →
          </Link>
        </div>
      </div>
    </section>
  )
}
