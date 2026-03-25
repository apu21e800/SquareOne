import type { Metadata } from "next"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://squareonepaving.ca"),
  title: {
    default: "Square One Paving | BC Decorative Pavement Applicator",
    template: "%s | Square One Paving",
  },
  description:
    "Stamped asphalt, decorative coatings, thermoplastic markings, and vapor blasting installed by BC's most trusted crew since 2000.",
  keywords: [
    "decorative pavement BC",
    "stamped asphalt Vancouver",
    "decorative coatings Victoria",
    "thermoplastic markings BC",
    "vapor blasting Lower Mainland",
    "pavement applicator BC",
    "HUB Surface Systems applicator",
    "crosswalk installation BC",
    "bike lane coatings Vancouver",
    "surface preparation BC",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://squareonepaving.ca",
    siteName: "Square One Paving",
    title: "Square One Paving | BC Decorative Pavement Applicator",
    description:
      "Stamped asphalt, decorative coatings, thermoplastic markings, and vapor blasting since 2000.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Square One Paving",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Square One Paving | BC Decorative Pavement Applicator",
    description:
      "Stamped asphalt, decorative coatings, thermoplastic markings, and vapor blasting since 2000.",
  },
  alternates: {
    canonical: "https://squareonepaving.ca",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
