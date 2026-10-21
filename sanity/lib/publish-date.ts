/**
 * A blog post's date on its first Publish (14 Oct 2026, as hubss.com).
 *
 * The drafter dates a draft the day it writes it, and a draft that waited a
 * week for the editor used to go live a week old unless someone remembered to
 * change the date. Now a post that has never been published, and whose date
 * is blank or today or earlier, takes today's date as it goes out. A date in
 * the future is the editor's choice and is left alone, and so is every later
 * Publish: once a post is out, its date only changes by hand.
 *
 * "Today" is Square One's day, in Vancouver: a post published at 6 p.m. on a
 * Tuesday is Tuesday's, not Wednesday's (UTC).
 */

export const OFFICE_TIME_ZONE = "America/Vancouver"

/** The office's calendar date for an instant, as YYYY-MM-DD. */
export function officeDate(at: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: OFFICE_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(at)
}

/**
 * The date to set as this Publish goes out, or null to leave the date alone.
 * `everPublished` is whether the post is already live (Sanity's published
 * copy exists); `date` is the date the post carries now.
 */
export function firstPublishDate(everPublished: boolean, date: unknown, today: string = officeDate()): string | null {
  if (everPublished) return null
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && date > today) return null
  return date === today ? null : today
}
