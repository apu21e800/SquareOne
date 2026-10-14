/**
 * The few Buffer API calls the social pipeline needs (developers.buffer.com:
 * GraphQL at https://api.buffer.com, `Authorization: Bearer <BUFFER_API_KEY>`),
 * ported from hubss.com's lib/buffer.ts with its hardening (14 Oct 2026).
 *
 * Drafts only: every post is created with saveToDraft, so it waits in Buffer
 * until a person approves and schedules it. Nothing here posts.
 *
 * Every field below was checked against Buffer's live API reference on
 * 14 Oct 2026: `account { organizations { id } }`; `channels(input:
 * { organizationId })` with id, name, displayName, service, isQueuePaused,
 * isDisconnected and isLocked; `createPost(input: CreatePostInput!)` with
 * channelId, text, schedulingType "automatic", mode "addToQueue", saveToDraft
 * (a draft: posting limits are not checked), aiAssisted, source, assets
 * (`image { url, metadata { altText } }`, altText required when metadata is
 * sent) and metadata (`facebook { type: post }`, `instagram { type: post,
 * shouldShareToFeed }`, `google { type: whats_new, detailsWhatsNew { button,
 * link } }`, the last marked deprecated "pending per-type inputs" but the
 * documented way today); the result is PostActionSuccess { post { id } } or
 * MutationError { message }.
 *
 * The key (Buffer's help, checked 9 Oct 2026 for hubss.com): every plan has
 * the API, Free included; only the organization's owner can make a key; a key
 * lasts a year at most; a missing, expired or deleted key gets HTTP 401, and
 * the job then emails the editor (lib/automation/outcome.ts failureHint).
 */

const ENDPOINT = "https://api.buffer.com"

/**
 * Longest wait for one Buffer call. fetch alone would wait until Vercel stops
 * the function (300 s), and the job could no longer settle or report the item
 * it was on (lib/automation/social.ts).
 */
export const BUFFER_TIMEOUT_MS = 20_000

export interface BufferChannel {
  id: string
  name: string
  displayName?: string | null
  /** Buffer's Service enum: facebook, instagram, linkedin, googlebusiness, ... */
  service: string
  isQueuePaused?: boolean | null
  /** Buffer lost its connection to the network: reconnect it in Buffer. */
  isDisconnected?: boolean | null
  /** More channels than the plan allows: Buffer won't post to it. */
  isLocked?: boolean | null
}

/** A refusal from Buffer's API, with the HTTP status (401: the key; 0: no answer). */
export class BufferApiError extends Error {
  readonly status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = "BufferApiError"
    this.status = status
  }
}

export interface DraftPostInput {
  channelId: string
  text: string
  imageUrl?: string
  /** Sent with the photo when given; Google Business Profile takes none. */
  imageAlt?: string
  metadata?: Record<string, unknown>
}

/** What the social pipeline needs from Buffer; the real one is `bufferApi`, the tests use a stand-in. */
export interface Buffer {
  channels(): Promise<BufferChannel[]>
  createDraft(input: DraftPostInput): Promise<string>
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const key = process.env.BUFFER_API_KEY
  if (!key) throw new Error("BUFFER_API_KEY is not set")
  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(BUFFER_TIMEOUT_MS),
    })
  } catch (err) {
    // No answer (a timeout, the network): status 0.
    throw new BufferApiError(`Buffer API unreachable: ${err instanceof Error ? err.message : String(err)}`, 0)
  }
  if (res.status === 429) throw new BufferApiError(`Buffer rate limit; retry after ${res.headers.get("retry-after") ?? "?"} s`, 429)
  const json = (await res.json().catch(() => null)) as {
    data?: T
    errors?: { message: string; extensions?: { code?: string } }[]
  } | null
  if (!res.ok || !json || json.errors?.length) {
    const why = json?.errors?.map((e) => (e.extensions?.code ? `${e.message} (${e.extensions.code})` : e.message)).join("; ")
    throw new BufferApiError(`Buffer API ${res.status}: ${why || "no response body"}`, res.status)
  }
  return json.data as T
}

/** The createPost input for one draft. Pure, so the tests check the exact shape sent. */
export function draftInput(input: DraftPostInput): Record<string, unknown> {
  return {
    channelId: input.channelId,
    text: input.text,
    schedulingType: "automatic",
    mode: "addToQueue",
    saveToDraft: true,
    aiAssisted: true,
    source: "squareonepaving.com",
    assets: input.imageUrl ? [{ image: { url: input.imageUrl, ...(input.imageAlt ? { metadata: { altText: input.imageAlt } } : {}) } }] : [],
    ...(input.metadata ? { metadata: input.metadata } : {}),
  }
}

export const MANY_ORGS = "The Buffer key reaches more than one organization"

/** The one organization the job drafts into. Pure, for the tests. */
export function pickOrganization(orgs: readonly { id: string }[], wanted?: string): { id: string }[] {
  if (wanted?.trim()) {
    const org = orgs.find((o) => o.id === wanted.trim())
    if (!org) throw new Error(`BUFFER_ORG_ID names an organization the Buffer key can't reach (it reaches ${orgs.length})`)
    return [org]
  }
  if (orgs.length !== 1) throw new Error(`${MANY_ORGS} (${orgs.length}): the job drafts into one only`)
  return [orgs[0]]
}

export const CREATE_DRAFT = `mutation CreateDraft($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess { post { id } }
    ... on MutationError { message }
  }
}`

export const bufferApi: Buffer = {
  /**
   * Every channel in Square One's organization. A key reaches every
   * organization its login belongs to, so the job refuses to guess: one
   * organization, or the one BUFFER_ORG_ID names; anything else stops the run
   * and emails the editor, before a single draft (Square One's posts must
   * never land in another client's Buffer).
   */
  async channels() {
    const { account } = await gql<{ account: { organizations: { id: string }[] } }>(`query { account { organizations { id } } }`)
    const out: BufferChannel[] = []
    for (const org of pickOrganization(account.organizations, process.env.BUFFER_ORG_ID)) {
      // Organization ids are opaque tokens; JSON.stringify makes a safe GraphQL string.
      const { channels } = await gql<{ channels: BufferChannel[] }>(
        `query { channels(input: { organizationId: ${JSON.stringify(org.id)} }) { id name displayName service isQueuePaused isDisconnected isLocked } }`,
      )
      out.push(...channels)
    }
    return out
  },

  /** One draft in one channel's Buffer queue. Resolves to Buffer's post id. */
  async createDraft(input) {
    const data = await gql<{ createPost: { post?: { id: string }; message?: string } }>(CREATE_DRAFT, { input: draftInput(input) })
    if (!data.createPost?.post?.id) throw new Error(`Buffer refused the draft: ${data.createPost?.message ?? "no reason given"}`)
    return data.createPost.post.id
  },
}
