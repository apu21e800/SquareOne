import { useDocumentOperation, type DocumentActionComponent, type DocumentActionProps } from "sanity"
import { firstPublishDate } from "./lib/publish-date"

/**
 * Publish, for blog posts: the first Publish dates the post today (Vancouver),
 * unless it carries a date in the future (sanity/lib/publish-date.ts). The
 * date is set on the draft, then Sanity's own Publish runs exactly as before,
 * the pattern Sanity documents for "set a value, then publish".
 *
 * A draft set to go live by itself (20 Oct 2026, lib/automation/project-posts.ts)
 * that someone publishes by hand stops being scheduled as it goes out:
 * otherwise its next edit would sit in a draft still marked to go by itself,
 * at a time already past, and the daily run would publish a half-made edit.
 */
export function datedPublish(original: DocumentActionComponent): DocumentActionComponent {
  const Action: DocumentActionComponent = (props: DocumentActionProps) => {
    const result = original(props)
    const { patch } = useDocumentOperation(props.id, props.type)
    if (!result) return result
    return {
      ...result,
      onHandle: () => {
        const current = (props.draft ?? props.published) as { date?: unknown; scheduled?: unknown } | null
        const date = firstPublishDate(Boolean(props.published), current?.date)
        if (date) patch.execute([{ set: { date } }])
        if (current?.scheduled === true) patch.execute([{ set: { scheduled: false } }, { unset: ["scheduledFor"] }])
        result.onHandle?.()
      },
    }
  }
  Action.action = original.action
  return Action
}
