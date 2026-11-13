/**
 * The words for a Job photos post (12 Nov 2026, as hubss.com's; Vern:
 * "eliminate pain points from the sanity experience ... so everything is
 * made clear"): the card above its form (sanity/components/JobPhotosInput.tsx)
 * says what Publish does with this post and how far its article has got, and
 * its line in the Job photos list (sanity/schemaTypes/fieldPost.ts) says the
 * same in three words.
 *
 * No imports, so `npm run test:studio` reads every state without the Studio,
 * and plain words only: who does what, never how (the test checks).
 *
 * The words follow how Square One's add-ons run (CLAUDE.md, "Blog and social
 * automation"): a job's social posts wait in Buffer for approval
 * (SOCIAL_AUTO_QUEUE unset), an article written from a job waits for a
 * person's Publish (PROJECT_ARTICLES_AUTO_PUBLISH unset), and jobs with a
 * story are written up one a morning, oldest first. Change them with any of
 * those.
 */

/** The card's heading and its two buttons (the guide names them too). */
export const JOB_CARD_TITLE = "What happens to this job"
export const OPEN_THE_ARTICLE = "Open the article"
export const SEE_IT_ON_THE_SITE = "See it on the site"

/**
 * The article written from a job, as the card read it. `null`: it couldn't be
 * read (a dropped connection), so the card doesn't guess.
 */
export type ArticleState = {
  title?: string
  /** On the site. */
  live: boolean
  /** A draft waits in Blog posts (new, or changes to a live one). */
  draft: boolean
  /** The draft goes live by itself: when, in words ("on Thursday 13 November at 9:00 a.m."). */
  when?: string
} | null

export type JobState = {
  /** The Job photos post is published. */
  published: boolean
  /** The story is filled in. */
  story: boolean
  /** An article was written from it (its "The article written from this"). */
  hasArticle: boolean
  article: ArticleState
  /** No article could be written from it, and the tries have stopped. */
  gaveUp?: boolean
}

/** The card's words for where the job stands. */
export function jobPhotosLine(job: JobState): string {
  const { published, story, hasArticle, article, gaveUp } = job
  if (hasArticle) {
    if (article === null) return 'An article was written from this job. Open it from "The article written from this" below.'
    const title = article.title?.trim() ? `"${article.title.trim()}"` : "an article"
    if (!article.live && !article.draft) return "An article was written from this job, but it is no longer in Blog posts."
    if (article.live) return `Written up as ${title}, which is on the site.`
    if (article.when) return `Written up as ${title}, which goes live by itself ${article.when.replace(/\.$/, "")}. Read it before then.`
    return `Written up as ${title}. It waits in Blog posts for you to read it and press Publish.`
  }
  if (story && published && gaveUp) {
    return "No article could be written from this job. Change the story and publish again to try once more, or write the article yourself in Blog posts."
  }
  if (story) {
    return published
      ? "This job is being written up as a project article for the Blog. You'll get an email when it's ready to read, usually the next morning. It waits in Blog posts until you press Publish, and its social posts follow once it is live."
      : "With the story filled in, publishing has the job written up as a project article for the Blog: you'll get an email when it's ready to read, and it waits in Blog posts until you press Publish. Its social posts follow once it is live; the photos make no posts of their own."
  }
  return published
    ? "Its photos go into posts for Square One's social channels, which wait in Buffer for your approval. To have the job written up as a project article for the Blog as well, fill in the story below and publish again."
    : "Publish it and its photos go into posts for Square One's social channels, which wait in Buffer for your approval. To have the job written up as a project article for the Blog instead, fill in the story below first."
}

/** The same, in three words, for the post's line in the Job photos list. */
export function jobPhotosListLine(job: { story: boolean; hasArticle: boolean }): string {
  if (job.hasArticle) return "Written up as an article"
  return job.story ? "Story in: to be written up" : "Photos for social"
}
