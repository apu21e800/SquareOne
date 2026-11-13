import type { MouseEventHandler, ReactNode } from "react"
import { Box, Button, Card, Flex, Text } from "@sanity/ui"
import { EyeOpenIcon } from "@sanity/icons/EyeOpen"
import { isDocumentSchemaType, type InputProps } from "sanity"
import { useIntentLink } from "sanity/router"
import { usePresentationParams } from "sanity/presentation"
import { EDIT_ON_THE_PAGE } from "../structure"
import { TYPES_WITH_A_PAGE, documentPage, editOnThePageIntent } from "../studio-pages"
import QuietBoundary from "./QuietBoundary"

/** The card's words: what the button does for this document, or what to do first. */
export function editOnThePageWords(type: string, ready: boolean): string {
  if (!ready) return type === "pageHero" ? "Pick its Page below, then you can see it there from here." : "Press Generate under Web address, then you can see it on its page from here."
  return type === "post"
    ? "See this post as it looks on the site, and click any words to change them. Only you can see it before it's published."
    : "See this page as it looks on the site, and click any words or photo to change them."
}

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
  return <EditOnThePageCardView words={editOnThePageWords(type, ready)} link={ready ? link : undefined} />
}

/**
 * The card, from plain values (12 Nov 2026): a link to open, or none while
 * the document has no page yet (the button shows, switched off).
 * scripts/studio-panels.tsx shows each state without a signed-in Studio.
 */
export function EditOnThePageCardView({ words, link }: { words: string; link?: { href: string; onClick?: MouseEventHandler<HTMLElement> } }) {
  return (
    <Card padding={3} radius={2} border tone="primary" marginBottom={4}>
      <Flex align="center" gap={3} wrap="wrap">
        <Box flex={1} style={{ minWidth: 200 }}>
          <Text size={1}>{words}</Text>
        </Box>
        {link ? (
          <Button as="a" href={link.href} onClick={link.onClick} icon={EyeOpenIcon} text={EDIT_ON_THE_PAGE} tone="primary" />
        ) : (
          <Button disabled icon={EyeOpenIcon} text={EDIT_ON_THE_PAGE} tone="primary" />
        )}
      </Flex>
    </Card>
  )
}

/**
 * The Studio's form input (sanity.config.ts, `form.components.input`): the
 * button above the fields of a document with a page; every other input
 * renders as before. If the button ever fails (a Studio upgrade, an odd
 * document), it disappears and the fields below it carry on
 * (sanity/components/QuietBoundary.tsx): the office must always be able to edit.
 */
export function EditOnThePageInput(props: InputProps): ReactNode {
  const type = props.schemaType
  if (!isDocumentSchemaType(type) || !TYPES_WITH_A_PAGE.has(type.name)) return props.renderDefault(props)
  return (
    <div>
      <QuietBoundary name="The Edit on the page button">
        <EditOnThePageCard type={type.name} value={props.value as Record<string, unknown> | undefined} />
      </QuietBoundary>
      {props.renderDefault(props)}
    </div>
  )
}
