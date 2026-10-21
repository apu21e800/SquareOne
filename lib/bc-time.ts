/**
 * Vancouver's clock on any runtime's timezone data (21 Oct 2026).
 *
 * BC kept UTC-7 from 1 November 2026: the clocks didn't go back (IANA tzdata
 * 2026b). A server or a browser with older data still turns them back that
 * day, and from then on reads every time an hour early (and the date wrong in
 * the hour after midnight). Such data is caught once, here: 2 November 2026
 * at 14:00 UTC must read 7 a.m. in Vancouver. On older data, instants from 1
 * November 2026 at 09:00 UTC (2 a.m. in Vancouver) are read in UTC-7 itself;
 * with current data it is Vancouver's own zone throughout.
 *
 * Read by the editors' emails (lib/automation/project-posts.ts), the quote
 * form's timestamp (lib/contact.ts), the drafter's dates
 * (lib/automation/blog.ts) and the Studio's first-Publish date
 * (sanity/lib/publish-date.ts). No imports: the Studio's bundle reads it too.
 */

export const VANCOUVER = "America/Vancouver"

const BC_FIXED_FROM = Date.parse("2026-11-01T09:00:00Z")

/** True on timezone data from before BC kept UTC-7 (it turns the clocks back on 1 November 2026). */
export const OLD_ZONE_DATA =
  new Intl.DateTimeFormat("en-CA", { timeZone: VANCOUVER, hour: "numeric", hourCycle: "h23" })
    .formatToParts(new Date("2026-11-02T14:00:00Z"))
    .find((p) => p.type === "hour")
    ?.value.replace(/^0/, "") !== "7"

/** The zone to read an instant in so that it shows Vancouver's clock. */
export function vancouverZone(at: Date | number = Date.now()): string {
  const t = typeof at === "number" ? at : at.getTime()
  return OLD_ZONE_DATA && t >= BC_FIXED_FROM ? "Etc/GMT+7" : VANCOUVER
}
