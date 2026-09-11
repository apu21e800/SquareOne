import { buildMetadata, clampDescription } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a Quote | Free Site Visit, Metro Vancouver & Vancouver Island",
  description:
    clampDescription("Request a free site visit and a written quote from Square One Paving — decorative pavement installers serving Metro Vancouver, the Fraser Valley and Vancouver Island since 2000."),
  slug: "contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
