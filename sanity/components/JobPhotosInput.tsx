import { useEffect, useState, type MouseEventHandler } from "react"
import { Button, Card, Flex, Stack, Text } from "@sanity/ui"
import { DocumentTextIcon } from "@sanity/icons/DocumentText"
import { LaunchIcon } from "@sanity/icons/Launch"
import { getPublishedId, useClient, useEditState, type ObjectInputProps } from "sanity"
import { useIntentLink } from "sanity/router"
import QuietBoundary from "./QuietBoundary"
import { JOB_CARD_TITLE, OPEN_THE_ARTICLE, SEE_IT_ON_THE_SITE, jobPhotosLine, type ArticleState } from "../job-photos-line"
import { vancouverZone } from "../../lib/bc-time"

/**
 * What happens to a Job photos post, above its form (12 Nov 2026, as
 * hubss.com's; Vern: "eliminate pain points from the sanity experience ...
 * so everything is made clear"). One card that says, for this post, what
 * Publish does with it and where it has got to:
 *  - no story: its photos go into social posts that wait in Buffer for
 *    approval (lib/automation/social.ts);
 *  - a story: the job is written up as a project article
 *    (lib/automation/project-posts.ts) that waits in Blog posts for a
 *    person's Publish, its social posts once it is live; the photos make no
 *    posts of their own (`hasStory`);
 *  - written up: the article's title and where it stands (waiting, going
 *    live by itself at a time, live), with a way to open it.
 * Its words are sanity/job-photos-line.ts. If the card fails, it gives way
 * and the form below carries on.
 */

type JobValue = { _id?: string; writeUp?: string; article?: { _ref?: string } }

/** "on Thursday 13 November at 9:00 a.m.", on Vancouver's clock (lib/bc-time.ts). */
function goesLiveWhen(iso: unknown): string | undefined {
  if (typeof iso !== "string" || Number.isNaN(Date.parse(iso))) return undefined
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: vancouverZone(Date.parse(iso)),
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(iso))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `on ${get("weekday")} ${get("day")} ${get("month")} at ${get("hour")}:${get("minute")} ${get("dayPeriod")}`
}

type Read = { draft: { title?: string; scheduled?: boolean; scheduledFor?: string } | null; live: { title?: string; slug?: string } | null; gaveUp: string | null }

function JobPhotosCard({ value }: { value: JobValue | undefined }) {
  const id = getPublishedId(value?._id ?? "")
  const editState = useEditState(id, "fieldPost")
  const articleId = value?.article?._ref
  const client = useClient({ apiVersion: "2024-01-01" })
  // A hook, so it runs on every render; its link is used only once there's an article.
  const open = useIntentLink({ intent: "edit", params: { id: articleId ?? "", type: "post" } })
  // undefined while it is read; null: it couldn't be read.
  const [read, setRead] = useState<Read | null | undefined>(undefined)

  useEffect(() => {
    let alive = true
    client
      .fetch<Read>(
        `{
          "draft": *[_id == $draft][0]{ title, scheduled, scheduledFor },
          "live": *[_id == $article][0]{ title, "slug": slug.current },
          "gaveUp": *[_id == $retry][0].gaveUpAt
        }`,
        { article: articleId ?? "", draft: articleId ? `drafts.${articleId}` : "", retry: `projectRetry-${id.replace(/[^a-zA-Z0-9._-]/g, "-")}` },
      )
      .then((r) => alive && setRead(r))
      .catch(() => alive && setRead(null))
    return () => {
      alive = false
    }
  }, [client, articleId, id])

  if (!editState.ready || read === undefined) return null
  const article: ArticleState =
    read === null ? null : { title: read.live?.title ?? read.draft?.title, live: Boolean(read.live), draft: Boolean(read.draft), when: read.draft?.scheduled ? goesLiveWhen(read.draft.scheduledFor) : undefined }
  const line = jobPhotosLine({
    published: Boolean(editState.published),
    story: Boolean(value?.writeUp?.trim()),
    hasArticle: Boolean(articleId),
    article,
    gaveUp: Boolean(read?.gaveUp),
  })
  const there = Boolean(articleId && article && (article.live || article.draft))
  const slug = read?.live?.slug
  return <JobPhotosCardView line={line} open={there ? open : undefined} site={there && slug ? `/blog/${slug}` : undefined} />
}

/**
 * The card, from plain values: its line, the article to open and its page on
 * the site, when there is one (scripts/studio-panels.tsx shows each state
 * without a signed-in Studio).
 */
export function JobPhotosCardView({ line, open, site }: { line: string; open?: { href: string; onClick?: MouseEventHandler<HTMLElement> }; site?: string }) {
  return (
    <Card padding={3} radius={2} border tone="primary" marginBottom={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          {JOB_CARD_TITLE}
        </Text>
        <Text size={1}>{line}</Text>
        {open || site ? (
          <Flex wrap="wrap" gap={2}>
            {open ? <Button as="a" href={open.href} onClick={open.onClick} icon={DocumentTextIcon} text={OPEN_THE_ARTICLE} mode="ghost" /> : null}
            {site ? <Button as="a" href={site} target="_blank" rel="noopener" icon={LaunchIcon} text={SEE_IT_ON_THE_SITE} mode="ghost" /> : null}
          </Flex>
        ) : null}
      </Stack>
    </Card>
  )
}

/** The Job photos form, with the card above it (sanity/schemaTypes/fieldPost.ts). */
export default function JobPhotosInput(props: ObjectInputProps) {
  return (
    <div>
      <QuietBoundary name="The job photos card">
        <JobPhotosCard value={props.value as JobValue | undefined} />
      </QuietBoundary>
      {props.renderDefault(props)}
    </div>
  )
}
