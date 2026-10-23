import { Component, type ReactNode } from "react"
import { Box, Button, Card, Flex, Text } from "@sanity/ui"
import { EyeOpenIcon } from "@sanity/icons/EyeOpen"
import { isDocumentSchemaType, type InputProps } from "sanity"
import { useIntentLink } from "sanity/router"
import { usePresentationParams } from "sanity/presentation"
import { EDIT_ON_THE_PAGE } from "../structure"
import { TYPES_WITH_A_PAGE, documentPage, editOnThePageIntent } from "../studio-pages"

/**
 * The Edit on the page button above the fields of every document with a page
 * of its own (23 Oct 2026; sanity/studio-pages.ts says which, and which
 * page). It opens Edit on the page at that document's page with the document
 * beside it; the tool in the top bar always starts on the home page (Vern,
 * 23 Oct: "it opens the homepage preview, not the blog in question"). Ported
 * from hubss.com's Studio, where the same button has run since 21 Oct.
 *
 * Inside Edit on the page itself the button stays out of the way: the
 * document is already beside its page there.
 */
function EditOnThePageCard({ type, value }: { type: string; value: Record<string, unknown> | undefined }) {
  // Set only inside Edit on the page (the one Presentation tool here).
  const inPresentation = !!usePresentationParams(false)
  const id = typeof value?._id === "string" ? value._id : ""
  const page = documentPage(type, value)
  // A hook, so it runs on every render; its link is used only once there's a page.
  const link = useIntentLink(editOnThePageIntent(id, type, page?.href ?? "/"))

  if (inPresentation) return null

  const ready = !!(id && page)
  const words = !ready
    ? type === "pageHero"
      ? "Pick its Page below, then you can see it there from here."
      : "Press Generate under Web address, then you can see it on its page from here."
    : type === "post"
      ? "See this post as it looks on the site, and click any words to change them. Only you can see it before it's published."
      : "See this page as it looks on the site, and click any words or photo to change them."

  return (
    <Card padding={3} radius={2} border tone="primary" marginBottom={4}>
      <Flex align="center" gap={3} wrap="wrap">
        <Box flex={1} style={{ minWidth: 200 }}>
          <Text size={1}>{words}</Text>
        </Box>
        {ready ? (
          <Button as="a" href={link.href} onClick={link.onClick} icon={EyeOpenIcon} text={EDIT_ON_THE_PAGE} tone="primary" />
        ) : (
          <Button disabled icon={EyeOpenIcon} text={EDIT_ON_THE_PAGE} tone="primary" />
        )}
      </Flex>
    </Card>
  )
}

/**
 * If the button ever fails (a Studio upgrade, an odd document), it disappears
 * and the fields below it carry on: the office must always be able to edit.
 */
class QuietBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.error("[studio] the Edit on the page button failed; the fields are unaffected", err)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * The Studio's form input (sanity.config.ts, `form.components.input`): the
 * button above the fields of a document with a page; every other input
 * renders as before.
 */
export function EditOnThePageInput(props: InputProps): ReactNode {
  const type = props.schemaType
  if (!isDocumentSchemaType(type) || !TYPES_WITH_A_PAGE.has(type.name)) return props.renderDefault(props)
  return (
    <div>
      <QuietBoundary>
        <EditOnThePageCard type={type.name} value={props.value as Record<string, unknown> | undefined} />
      </QuietBoundary>
      {props.renderDefault(props)}
    </div>
  )
}
