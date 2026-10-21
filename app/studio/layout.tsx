import type { Metadata } from "next"

/**
 * The Studio is never a page for search engines. The page itself renders in
 * the browser only and can't export metadata, so this layout carries it;
 * vercel.json sends the matching X-Robots-Tag header for /studio and
 * everything under it. The layout renders its children as they are.
 */
export const metadata: Metadata = {
  title: { absolute: "Studio | Square One Paving" },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
