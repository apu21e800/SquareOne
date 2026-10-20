/**
 * One email to the editors (BLOG_DRAFT_NOTIFY, comma-separated), shared by the
 * daily run's three steps (20 Oct 2026, as hubss.com's lib/editor-mail.ts):
 * the scheduled posts (lib/automation/project-posts.ts), the social drafts
 * (lib/automation/social.ts) and the project articles written from job
 * photos. Since 20 Oct 2026 the list is Square One's office and 21e8, so the
 * emails are written for the person who publishes.
 *
 * Never throws: a lost email must not stop a run. It gives up after 15 s, so
 * a slow mail service can't push a run past Vercel's 300 s, and resolves to
 * the addresses it went to (none when it couldn't): the project step switches
 * an article on to go live by itself only once the editors have been told.
 */
import { notifyList, type Mailer } from "@/lib/automation/services"

export const MAIL_TIMEOUT_MS = 15_000

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

export async function emailEditors(mail: Mailer, subject: string, text: string, tag = "automation"): Promise<string[]> {
  const to = notifyList()
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    const sent = await Promise.race([
      mail({ to, subject, text }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("the email took longer than 15 s")), MAIL_TIMEOUT_MS)
      }),
    ])
    if (!sent) console.error(`[${tag}] no email sent: ${subject}`)
    return sent ? to : []
  } catch (err) {
    console.error(`[${tag}] email failed: ${errorText(err)}`)
    return []
  } finally {
    if (timer) clearTimeout(timer)
  }
}
