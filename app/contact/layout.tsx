import { buildMetadata, clampDescription } from "@/lib/seo";

// buildMetadata appends " | Square One Paving" and clamps at 60 characters,
// so the page part stays short enough never to be cut mid-word (59 all in).
export const metadata = buildMetadata({
  title: "Request a Quote — Free Site Visit in BC",
  description:
    clampDescription("Request a free site visit and a written quote for stamped asphalt, coatings or thermoplastic markings — Lower Mainland and Vancouver Island, since 2000."),
  slug: "contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
