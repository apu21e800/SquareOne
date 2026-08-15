import type { Metadata } from "next";
import { resourceGroups, resourceCount } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Specifications & Technical Documents",
  description:
    "Spec sheets, colour cards, SDS and design guides for StreetPrint, StreetBond, TrafficPatterns, DecoMark, DuraTherm and PreMark.",
};

const typeStyles: Record<string, string> = {
  Specification: "bg-[#FDEEE7] text-[#D8511F]",
  "Colour card": "bg-[#F1EEE9] text-[#3D4147]",
  SDS: "bg-[#F1EEE9] text-[#767B82]",
  Guide: "bg-[#F1EEE9] text-[#3D4147]",
  Brochure: "bg-[#F1EEE9] text-[#3D4147]",
  "Technical info": "bg-[#F1EEE9] text-[#767B82]",
};

export default function ResourcesPage() {
  return (
    <main className="bg-white">
      <section className="pt-24 pb-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#767B82]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-[#F26430]" />
            Resources
          </div>
          <h1 className="mt-6 max-w-[20ch] text-[clamp(2.5rem,4.5vw,4rem)] font-light leading-[1.02] tracking-[-0.03em] text-[#14161A]">
            Specifications and technical documents
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[#3D4147]">
            {resourceCount} documents for engineers and specifiers — spec
            language, colour palettes, safety data sheets and design guides
            for every system we install.
          </p>
          <p className="mt-3 text-sm text-[#767B82]">
            Looking for product overviews instead? See{" "}
            <a href="/products" className="font-semibold text-[#14161A] underline-offset-4 hover:underline">
              Products
            </a>
            .
          </p>
        </div>
      </section>

      {resourceGroups.map((group) => (
        <section key={group.slug} className="border-t border-[#E7E3DC] py-14">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-semibold tracking-[-0.015em] text-[#14161A]">
                {group.product}
              </h2>
              <span className="text-sm text-[#767B82]">{group.docs.length} documents</span>
            </div>
            <ul className="mt-6">
              {group.docs.map((doc) => (
                <li key={doc.href} className="border-t border-[#EDEBE7] first:border-t-0">
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-3.5"
                  >
                    <span className="min-w-0 flex-1 truncate text-[15px] text-[#3D4147] group-hover:text-[#14161A]">
                      {doc.name}
                    </span>
                    <span
                      className={`hidden shrink-0 rounded-[2px] px-2 py-0.5 text-[11px] font-semibold sm:inline-block ${typeStyles[doc.type]}`}
                    >
                      {doc.type}
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-[#767B82]">PDF</span>
                    <span className="shrink-0 text-sm font-semibold text-[#14161A] transition-transform group-hover:translate-x-1">
                      &darr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="border-t border-[#E7E3DC] bg-[#FAF8F5] py-14">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <p className="max-w-[56ch] text-[15px] leading-relaxed text-[#3D4147]">
            Writing a specification and need help matching a system to your
            traffic loading and substrate? Call{" "}
            <a href="tel:604-466-9902" className="font-semibold text-[#14161A]">
              604-466-9902
            </a>{" "}
            or{" "}
            <a href="/contact" className="font-semibold text-[#14161A] underline-offset-4 hover:underline">
              request a consultation
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
