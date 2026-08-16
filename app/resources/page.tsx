import type { Metadata } from "next";
import Link from "next/link";
import { resourceGroups, resourceCount } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Specifications & Technical Documents",
  description:
    "Spec sheets, colour cards, SDS and design guides for StreetPrint, StreetBond, TrafficPatterns, DecoMark, DuraTherm and PreMark.",
};

/**
 * Type pills ride on .tag (stone, 12px/600, 2px radius) and vary only in ink
 * weight. Nothing here is orange: the page already spends its accent budget on
 * the eyebrow square and the headline full stop, and a repeated orange pill
 * across 71 rows would blow it several times over per viewport.
 */
const typeStyles: Record<string, string> = {
  Specification: "text-[color:var(--ink)]",
  "Colour card": "text-[#5B6167]",
  SDS: "text-[color:var(--ink-muted)]",
  Guide: "text-[#5B6167]",
  Brochure: "text-[#5B6167]",
  "Technical info": "text-[color:var(--ink-muted)]",
};

export default function ResourcesPage() {
  return (
    <main className="bg-[color:var(--surface)]">
      {/* ---- Page header ---- */}
      <section className="section pt-24 max-[700px]:pt-[84px]">
        <div className="container-1280">
          <div className="eyebrow">Resources</div>

          <h1 className="stop mt-6 max-w-[20ch]">
            Specifications and technical documents
          </h1>

          <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            {resourceCount} documents for engineers and specifiers &mdash; spec
            language, colour palettes, safety data sheets and design guides for
            every system we install.
          </p>

          <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.55] text-[color:var(--ink-muted)]">
            Looking for product overviews instead? See{" "}
            <Link
              href="/products"
              className="font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
            >
              Products
            </Link>
            .
          </p>

          {/* Jump index — six products, one screen of scrolling apiece */}
          <nav
            aria-label="Jump to a product"
            className="mt-11 border-t border-[color:var(--hairline)] pt-6"
          >
            <div className="label">Browse by system</div>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {resourceGroups.map((group) => (
                <a key={group.slug} href={`#${group.slug}`} className="arrow-link">
                  {group.product}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* ---- Document index ---- */}
      <section className="section border-t border-[color:var(--hairline)]">
        <div className="container-1280 flex flex-col gap-16">
          {resourceGroups.map((group) => (
            <div key={group.slug} id={group.slug}>
              <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--hairline)] pb-[14px]">
                <h2 className="label">{group.product}</h2>
                <span className="shrink-0 text-[12px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]">
                  {group.docs.length} documents
                </span>
              </div>

              <ul className="mt-2">
                {group.docs.map((doc) => (
                  <li
                    key={doc.href}
                    className="border-b border-[color:var(--hairline)] last:border-b-0"
                  >
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-[14px]"
                    >
                      <span className="min-w-0 flex-1 truncate text-[15px] leading-[1.55] text-[color:var(--ink-body)] transition-colors group-hover:text-[color:var(--ink)]">
                        {doc.name}
                      </span>

                      <span
                        className={`tag hidden shrink-0 sm:inline-block ${typeStyles[doc.type] ?? ""}`}
                      >
                        {doc.type}
                      </span>

                      <span className="shrink-0 text-[12px] font-semibold tracking-[0.04em] text-[color:var(--ink-muted)]">
                        PDF
                      </span>

                      <span
                        aria-hidden="true"
                        className="inline-block shrink-0 text-[14px] font-semibold text-[color:var(--ink)] transition-transform group-hover:translate-y-[3px]"
                      >
                        &darr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Spec help. Kept to a single line: the closing CTA for every
             page is the slate footer, and this must not rehearse it. ---- */}
      <section className="section border-t border-[color:var(--hairline)] bg-[color:var(--surface-warm)]">
        <div className="container-1280">
          <p className="max-w-[56ch] text-[17px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty]">
            Writing a specification and need help matching a system to your
            traffic loading and substrate? Call{" "}
            <a
              href="tel:+16046126209"
              className="font-semibold text-[color:var(--ink)]"
            >
              604-612-6209
            </a>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-semibold text-[color:var(--ink)] underline-offset-4 hover:underline"
            >
              request a consultation
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
