/**
 * A post's date as the site prints it: "November 5, 2026".
 *
 * A post's date is a plain day ("2026-11-05": the Studio's Date field, a
 * file's front matter), which JavaScript reads as midnight UTC. Printed in
 * the reader's own time zone it comes out a day early anywhere west of
 * Greenwich, BC included, so it is printed in UTC: the day the office wrote.
 * 6 Nov 2026: /blog printed its dates in the visitor's browser and showed the
 * veterans crosswalk of 5 Nov as November 4. Pure, so the server and the
 * browser print the same day.
 */
export function postDate(day: string): string {
  const d = new Date(day)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
}

/** A post's year, read the same way: "2026-01-01" is 2026 in BC too. Empty when there is no date. */
export function postYear(day: string | undefined): string {
  const y = day ? new Date(day).getUTCFullYear() : Number.NaN
  return Number.isFinite(y) ? String(y) : ""
}
