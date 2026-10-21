import { useDocumentOperation, type DocumentActionComponent, type DocumentActionProps } from "sanity"
import { firstPublishDate } from "./lib/publish-date"

/**
 * Publish, for blog posts: the first Publish dates the post today (Vancouver),
 * unless it carries a date in the future (sanity/lib/publish-date.ts). The
 * date is set on the draft, then Sanity's own Publish runs exactly as before,
 * the pattern Sanity documents for "set a value, then publish".
 */
export function datedPublish(original: DocumentActionComponent): DocumentActionComponent {
  const Action: DocumentActionComponent = (props: DocumentActionProps) => {
    const result = original(props)
    const { patch } = useDocumentOperation(props.id, props.type)
    if (!result) return result
    return {
      ...result,
      onHandle: () => {
        const current = (props.draft ?? props.published) as { date?: unknown } | null
        const date = firstPublishDate(Boolean(props.published), current?.date)
        if (date) patch.execute([{ set: { date } }])
        result.onHandle?.()
      },
    }
  }
  Action.action = original.action
  return Action
}
