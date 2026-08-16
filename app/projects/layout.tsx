import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Stamped Asphalt & Decorative Pavement Portfolio | Square One Paving",
  description:
    "Explore completed decorative pavement projects across BC — stamped asphalt driveways, StreetPrint crosswalks, StreetBond coatings, and vapour blasting. Metro Vancouver, Vancouver Island, and beyond.",
  keywords: [
    "pavement projects Vancouver",
    "stamped asphalt projects BC",
    "decorative paving portfolio BC",
    "StreetPrint project Vancouver",
    "StreetBond project BC",
    "driveway project Lower Mainland",
    "crosswalk installation project BC",
    "decorative pavement gallery BC",
  ],
  alternates: {
    canonical: "https://squareonepaving.ca/projects",
  },
  openGraph: {
    title: "Projects | Stamped Asphalt & Decorative Pavement Portfolio | Square One Paving",
    description:
      "Completed decorative pavement projects across BC — stamped asphalt driveways, StreetPrint crosswalks, StreetBond coatings, and vapour blasting.",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
