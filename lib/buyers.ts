import type { WorkApp } from "@/lib/work"

/**
 * The four buyers (26 Sept 2026, docs/OWN-COMPANY-BRIEF.md §3.1, §9.5). An
 * installer's site is organised by who it works for; the eleven links — the
 * nine application galleries, driveways and vapour blasting — are grouped
 * here once, and the home page (ApplicationsSection) and the menu (Nav)
 * both read it. The galleries themselves are lib/work.ts, untouched.
 *
 * Order inside a group is the business hierarchy from lib/work.ts. Do not
 * resort alphabetically or "by interest" — the order is intentional.
 */
export interface Buyer {
  label: string
  note: string
  slugs: (WorkApp | "vapour")[]
}

export const BUYERS: Buyer[] = [
  {
    label: "Municipal & transit",
    note: "Cities, transit authorities and the engineers who draw for them.",
    slugs: ["crosswalks", "streetscapes", "roundabouts", "bike-lanes", "public-art", "branding-wayfinding"],
  },
  {
    label: "Commercial, strata & property managers",
    note: "Retail centres, strata corporations and the people who look after them.",
    slugs: ["parking-lots", "vapour"],
  },
  {
    label: "Parks, schools & recreation",
    note: "Parks boards, school districts and recreation departments.",
    slugs: ["parks-paths", "schools-sports-courts"],
  },
  {
    label: "Homeowners",
    note: "Vancouver and Victoria homes, on the asphalt they already have.",
    slugs: ["driveways"],
  },
]
