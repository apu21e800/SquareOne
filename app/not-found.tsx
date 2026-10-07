import Image from "next/image"
import Link from "next/link"

/* The 404 (28 Sept 2026, the finish pass). Until today a missing page was
   Next's default: a black "404" and one line, centred, in the system face.
   Now it is the site's own: the label in the margin, a plain sentence, and
   the way on, the four services with their samples (the same squares as
   the menu), then projects, driveways, search and the quote. Old links
   from the WordPress site mostly land on redirects (next.config.ts); this
   is for the rest. */

const WAYS = [
  { href: "/services/stamped-asphalt", name: "Stamped asphalt", swatch: "stamped-asphalt" },
  { href: "/services/decorative-coatings", name: "Decorative coatings", swatch: "decorative-coatings" },
  { href: "/services/preformed-thermoplastic", name: "Preformed thermoplastic", swatch: "preformed-thermoplastic" },
  // The sunlit Granville Island frame, as the menu shows it (7 Oct 2026 QA:
  // the 404 still carried the old pre-cut square).
  { href: "/services/vapor-blasting", name: "Vapour blasting", swatch: "vapor-blasting", src: "/images/services/vapor-blasting/generated/gen-granville-island-vapour-blasting-01-enhanced.jpg", position: "30% 58%" },
  { href: "/driveways", name: "Driveways", swatch: "driveways" },
  { href: "/products", name: "The systems we install", swatch: "systems" },
]

export default function NotFound() {
  return (
    <main className="bg-surface">
      <section className="container-1280 pt-[calc(var(--bar-h)+72px)] pb-24 max-[700px]:pt-[calc(var(--bar-h)+40px)] max-[700px]:pb-16">
        <div className="grid grid-cols-12 gap-x-12 gap-y-4 max-[900px]:grid-cols-1">
          <div className="col-span-3 max-[900px]:col-span-1">
            <span className="label label-sq label-page pt-3">Not found &middot; 404</span>
          </div>
          <div className="col-span-9 max-[900px]:col-span-1">
            <h1 className="max-w-[16ch]">This page isn&rsquo;t <em>on the record</em></h1>
            <p className="lede mt-6 max-w-[52ch]">
              The address may be from the old site, or it may have a typo in it. Everything we do is
              one of these, and the office is a phone call away.
            </p>

            <ul className="nf-ways mt-10">
              {WAYS.map((w) => (
                <li key={w.href}>
                  <Link href={w.href} className="drawer-row nf-row">
                    <span className="mega-swatch relative" style={{ width: 48, height: 48 }} aria-hidden="true">
                      {"src" in w && w.src ? (
                        <Image src={w.src} alt="" fill sizes="96px" className="object-cover" style={{ objectPosition: w.position }} />
                      ) : (
                        <Image src={`/images/menu/swatch-${w.swatch}.webp`} alt="" width={48} height={48} unoptimized />
                      )}
                    </span>
                    <span className="drawer-name">{w.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/projects" className="link">
                Projects
              </Link>
              <Link href="/search" className="link">
                Search the site
              </Link>
              <a href="tel:+16046126209" className="link">
                604-612-6209
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
