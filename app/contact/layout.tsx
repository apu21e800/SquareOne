import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Start a Project",
  description: "Tell us about your BC surface project. Serving the Lower Mainland and Vancouver Island. Response within one business day.",
  slug: "contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
