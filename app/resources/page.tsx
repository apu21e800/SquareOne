import type { Metadata } from "next";
import Link from "next/link";
import ResourceLibrary from "@/components/ResourceLibrary";
import { resourceGroups, resourceCount } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Specifications & Technical Documents",
  description:
    "Preview and download spec sheets, colour cards, SDS and design guides for StreetPrint, StreetBond, MMAX, TrafficPatterns, TrafficPatternsXD, DecoMark, DuraTherm, PreMark and DuraShield.",
  alternates: { canonical: "https://squareonepaving.ca/resources" },
};

/**
 * Resources — the document library. hubss.com/resources is the benchmark:
 * product + type filters, live count, and every document carries a Preview
 * (native browser PDF view, new tab) and a Download action. All files are
 * real, live in /public/docs and are served by the CDN; sizes are baked into
 * lib/resources.ts from the actual bytes.
 */
export default function ResourcesPage() {
  return (
    <main className="bg-[color:var(--surface)]">
      {/* ---- Page header ---- */}
      <section className="section pt-24 pb-12 max-[700px]:pt-[84px]">
        <div className="container-1280">
          <div className="eyebrow">Resources</div>

          <h1 className="stop mt-6 max-w-[20ch]">Specification library</h1>

          <p className="mt-7 max-w-[56ch] text-[19px] leading-[1.65] text-[color:var(--ink-body)] [text-wrap:pretty] max-[700px]:text-[17px]">
            {resourceCount} documents for engineers and specifiers &mdash;
            specifications, technical data sheets, safety data sheets, colour
            cards, design manuals and brochures for every system we install.
            Preview any document in the browser, or download it straight into
            your spec package.
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
        </div>
      </section>

      {/* ---- Filterable library ---- */}
      <section className="section pt-0">
        <div className="container-1280">
          <ResourceLibrary groups={resourceGroups} />
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
              href="tel:+16044669902"
              className="font-semibold text-[color:var(--ink)]"
            >
              604-466-9902
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
