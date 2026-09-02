import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Free Quote | Maple Ridge BC",
  description:
    "Get a free site visit and a written quote. Reach Jan Stewart directly — decorative pavement specialists serving Metro Vancouver, Fraser Valley, and Vancouver Island.",
  slug: "contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
