/**
 * Square One's eight driveway domains, each sent to its city's page.
 *
 * GoDaddy's forwarding did this from 23 Oct 2026, for each domain's home page
 * only. 6 Nov 2026 (Vern: "S1 needs to be 100% off of all GoDaddy
 * dependancies except for their owned domain names"): the domains' DNS moved
 * to Vercel and they point at this project, so the site sends them on itself
 * (next.config.ts), every address on them, with or without www. The names
 * stay registered in Square One's own GoDaddy account. Pure, so
 * `npm run test:redirects` can test it.
 */
export const DRIVEWAY_DOMAINS: Readonly<Record<"vancouver" | "victoria", readonly string[]>> = {
  vancouver: ["drivewaysvancouver.ca", "drivewaysvancouver.com", "vancouverdriveways.ca", "vancouverdriveways.com"],
  victoria: ["drivewaysvictoria.ca", "drivewaysvictoria.com", "victoriadriveways.ca", "victoriadriveways.com"],
}

export interface HostRedirect {
  source: string
  has: { type: "host"; value: string }[]
  destination: string
  permanent: true
}

/** The host as Next matches it (the whole host, lower case): the name, with or without www. */
export const hostPattern = (domain: string): string => `(?:www\\.)?${domain.replace(/\./g, "\\.")}`

/** One rule per domain: every address on it goes to its city's driveway page on the site. */
export function drivewayDomainRedirects(site: string): HostRedirect[] {
  return (Object.keys(DRIVEWAY_DOMAINS) as (keyof typeof DRIVEWAY_DOMAINS)[]).flatMap((city) =>
    DRIVEWAY_DOMAINS[city].map((domain) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: hostPattern(domain) }],
      destination: `${site}/driveways/${city}`,
      permanent: true as const,
    })),
  )
}
