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
    <section className="section border-t border-[color:var(--hairline)] bg-surface-warm">
      <div className="container-1280">
        <div className="eyebrow">Products we apply</div>

        <div className="mt-5 grid grid-cols-1 items-end gap-6 min-[901px]:grid-cols-[auto_1fr] min-[901px]:gap-16">
          <h2 className="stop">Our systems</h2>
          <p className="max-w-[56ch] text-[19px] leading-[1.65] text-ink-body">
            Industry-leading surface systems &mdash; specified by 500+ Canadian municipalities and
            installed by our certified crews.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 min-[701px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card flex flex-col overflow-hidden rounded-[2px] border border-[color:var(--hairline)] bg-surface"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-stone">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3>{product.name}</h3>

                <p className="mt-[10px] text-[15px] leading-[1.55] text-ink-body">
                  {product.description}
                </p>

                <span className="arrow-link mt-auto pt-7">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-[color:var(--hairline)] pt-10">
          <div>
            <div className="text-[15px] font-semibold text-ink">Manufacturer-certified installer</div>
            <div className="mt-1 text-[15px] leading-[1.55] text-ink-muted">
              Authorized applicator &mdash; Western Canada
            </div>
          </div>

          <Link href="/contact" className="arrow-link whitespace-nowrap">
            Request a spec sheet <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
