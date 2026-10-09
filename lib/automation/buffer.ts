/**
 * The few Buffer API calls the social pipeline needs (developers.buffer.com:
 * GraphQL at https://api.buffer.com, `Authorization: Bearer <BUFFER_API_KEY>`),
 * ported from hubss.com's lib/buffer.ts.
 *
 * Drafts only: every post is created with saveToDraft, so it waits in Buffer
 * until a person approves and schedules it. Nothing here posts.
 */

const ENDPOINT = "https://api.buffer.com"

export interface BufferChannel {
  id: string
  name: string
  displayName?: string | null
  service: string
  isQueuePaused?: boolean | null
}

export interface DraftPostInput {
  channelId: string
  text: string
  imageUrl?: string
  imageAlt?: string
  metadata?: Record<string, unknown>
}

/** What the social pipeline needs from Buffer; the real one is `bufferApi`. */
export interface Buffer {
  channels(): Promise<BufferChannel[]>
  createDraft(input: DraftPostInput): Promise<string>
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const key = process.env.BUFFER_API_KEY
  if (!key) throw new Error("BUFFER_API_KEY is not set")
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ query, variables }),
  })
  if (res.status === 429) throw new Error(`Buffer rate limit; retry after ${res.headers.get("retry-after") ?? "?"} s`)
  const json = (await res.json().catch(() => null)) as { data?: T; errors?: { message: string }[] } | null
  if (!res.ok || !json || json.errors?.length) {
    throw new Error(`Buffer API ${res.status}: ${json?.errors?.map((e) => e.message).join("; ") ?? "no response body"}`)
  }
  return json.data as T
}

export const bufferApi: Buffer = {
  /** Every channel in every organization on the account. */
  async channels() {
    const { account } = await gql<{ account: { organizations: { id: string }[] } }>(`query { account { organizations { id } } }`)
    const out: BufferChannel[] = []
    for (const org of account.organizations) {
      // Organization ids are opaque tokens; JSON.stringify makes a safe GraphQL string.
      const { channels } = await gql<{ channels: BufferChannel[] }>(
        `query { channels(input: { organizationId: ${JSON.stringify(org.id)} }) { id name displayName service isQueuePaused } }`,
      )
      out.push(...channels)
    }
    return out
  },

  /** One draft in one channel's Buffer queue. Resolves to Buffer's post id. */
  async createDraft(input) {
    const variables = {
      input: {
        channelId: input.channelId,
        text: input.text,
        schedulingType: "automatic",
        mode: "addToQueue",
        saveToDraft: true,
        aiAssisted: true,
        source: "squareonepaving.com Blog",
        assets: input.imageUrl
          ? [{ image: { url: input.imageUrl, ...(input.imageAlt ? { metadata: { altText: input.imageAlt } } : {}) } }]
          : [],
        ...(input.metadata ? { metadata: input.metadata } : {}),
      },
    }
    const data = await gql<{ createPost: { post?: { id: string }; message?: string } }>(
      `mutation CreateDraft($input: CreatePostInput!) {
        createPost(input: $input) {
          ... on PostActionSuccess { post { id } }
          ... on MutationError { message }
        }
      }`,
      variables,
    )
    if (!data.createPost?.post?.id) throw new Error(`Buffer refused the draft: ${data.createPost?.message ?? "no reason given"}`)
    return data.createPost.post.id
  },
}
