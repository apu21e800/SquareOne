import { vancouverZone } from "../lib/bc-time"

/**
 * A blog post's line in the Blog posts list (12 Nov 2026): its date, then
 * what the list didn't say until now. A draft set to go live by itself says
 * when, the pinned post says so, and an article written from Job photos says
 * where it came from, so the office can tell them apart without opening each.
 * `npm run test:studio`.
 */

/** "Thu 13 Nov, 9:00 a.m.", on Vancouver's clock (lib/bc-time.ts). */
export function shortWhen(iso: string): string | undefined {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return undefined
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: vancouverZone(t),
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(t))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("weekday")} ${get("day")} ${get("month")}, ${get("hour")}:${get("minute")} ${get("dayPeriod")}`
}

export function postListLine(p: { date?: unknown; scheduled?: unknown; scheduledFor?: unknown; pinned?: unknown; fromJob?: unknown }): string {
  const when = p.scheduled === true && typeof p.scheduledFor === "string" ? shortWhen(p.scheduledFor) : undefined
  return [
    typeof p.date === "string" && p.date ? p.date : undefined,
    when ? `goes live by itself ${when}` : undefined,
    p.pinned === true ? "pinned" : undefined,
    p.fromJob ? "from Job photos" : undefined,
  ]
    .filter(Boolean)
    .join(" · ")
}
