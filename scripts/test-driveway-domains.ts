/**
 * Tests for the eight driveway domains (6 Nov 2026), part of
 * `npm run test:redirects`.
 *
 * What must hold: every address on each domain, with or without www, lands on
 * the city page GoDaddy's forwarding sent it to (checked live on 6 Nov 2026:
 * the four Vancouver names to /driveways/vancouver, the four Victoria names to
 * /driveways/victoria); the site's own hosts and look-alike hosts get no host
 * rule; and next.config.ts serves the rules before every other redirect.
 * Matching is Next's own (getPathMatch and matchHas). No network.
 */
import "./test-env"
import assert from "node:assert/strict"
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match"
import { matchHas } from "next/dist/shared/lib/router/utils/prepare-destination"
import { DRIVEWAY_DOMAINS, drivewayDomainRedirects, type HostRedirect } from "../lib/driveway-domains"

let failures = 0
async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

const SITE = "https://www.squareonepaving.com"

interface Rule {
  source: string
  destination: string
  has?: HostRedirect["has"]
  missing?: HostRedirect["has"]
}

/** Where Next sends a request: the first rule whose path and conditions match, as Next matches them. */
function landsOn(rules: Rule[], host: string, pathname: string): string | null {
  const req = { headers: { host } } as unknown as Parameters<typeof matchHas>[0]
  for (const rule of rules) {
    if (!getPathMatch(rule.source)(pathname)) continue
    if ((rule.has || rule.missing) && !matchHas(req, {}, rule.has ?? [], rule.missing ?? [])) continue
    return rule.destination
  }
  return null
}

/** Where GoDaddy's forwarding sent each domain, read from the live 301s on 6 Nov 2026. */
const GODADDY: Record<string, string> = {
  "drivewaysvancouver.ca": "/driveways/vancouver",
  "drivewaysvancouver.com": "/driveways/vancouver",
  "vancouverdriveways.ca": "/driveways/vancouver",
  "vancouverdriveways.com": "/driveways/vancouver",
  "drivewaysvictoria.ca": "/driveways/victoria",
  "drivewaysvictoria.com": "/driveways/victoria",
  "victoriadriveways.ca": "/driveways/victoria",
  "victoriadriveways.com": "/driveways/victoria",
}

const PATHS = ["/", "/stamped-asphalt/", "/blog/an-old-post", "/wp-content/uploads/2019/02/photo.jpg", "/driveways"]

async function main() {
  console.log("The eight driveway domains (lib/driveway-domains.ts)")
  const rules = drivewayDomainRedirects(SITE)

  await check("all eight, once each, as GoDaddy had them", () => {
    const listed = [...DRIVEWAY_DOMAINS.vancouver, ...DRIVEWAY_DOMAINS.victoria]
    assert.equal(listed.length, 8)
    assert.equal(new Set(listed).size, 8)
    assert.deepEqual([...listed].sort(), Object.keys(GODADDY).sort())
    assert.equal(rules.length, 8)
    assert.ok(rules.every((r) => r.permanent === true))
  })

  await check("every address on each, with or without www, lands on its city's page", () => {
    for (const [domain, page] of Object.entries(GODADDY)) {
      for (const host of [domain, `www.${domain}`, domain.toUpperCase(), `${domain}:443`]) {
        for (const p of PATHS) assert.equal(landsOn(rules, host, p), `${SITE}${page}`, `${host}${p}`)
      }
    }
  })

  await check("the site's own hosts get no host rule", () => {
    for (const host of ["www.squareonepaving.com", "squareonepaving.com", "square-one-coral.vercel.app", "localhost"]) {
      for (const p of PATHS) assert.equal(landsOn(rules, host, p), null, `${host}${p}`)
    }
  })

  await check("look-alike hosts get no host rule (the whole host must match, dots are dots)", () => {
    for (const host of [
      "vancouverdriveways.com.example.net",
      "evilvancouverdriveways.com",
      "vancouverdrivewaysXcom",
      "www.www.vancouverdriveways.com",
      "shop.drivewaysvictoria.ca",
    ]) {
      assert.equal(landsOn(rules, host, "/"), null, host)
    }
  })

  await check("next.config.ts serves them first, so no other rule sends a driveway domain elsewhere", async () => {
    const config = (await import("../next.config")).default
    const served = (await config.redirects!()) as Rule[]
    assert.deepEqual(
      served.slice(0, rules.length).map((r) => [r.source, r.destination, JSON.stringify(r.has)]),
      rules.map((r) => [r.source, r.destination, JSON.stringify(r.has)]),
    )
    // /laneways has a rule of its own on the site (to /driveways); on a driveway domain it goes to the city page.
    for (const [domain, page] of Object.entries(GODADDY)) {
      assert.equal(landsOn(served, domain, "/laneways"), `${SITE}${page}`, domain)
    }
    assert.equal(landsOn(served, "www.squareonepaving.com", "/laneways"), "/driveways")
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

main()
