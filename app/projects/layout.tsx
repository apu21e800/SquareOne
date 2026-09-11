import type { Metadata } from "next"

// Titles, descriptions and canonicals live on the pages themselves. A plain
// `title` string in this layout would drop the root title template for every
// page beneath it (Next stashes templates from ancestor layouts only), which
// is how the project pages lost their brand suffix.
export const metadata: Metadata = {
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
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
