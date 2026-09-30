/**
 * The outside services the automation talks to, each behind a small interface
 * so the pipelines can be run end to end against fakes (no key, no network)
 * and against the real thing in production:
 *
 *   Claude    one forced tool call per request (@anthropic-ai/sdk)
 *   Store     the Sanity dataset, with a write token (drafts and logs only)
 *   Mailer    one plain-text email through Resend, from CONTACT_FROM
 *
 * Server-only. SANITY_API_WRITE_TOKEN and ANTHROPIC_API_KEY never reach a
 * browser bundle: only the cron routes import this.
 */
import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "next-sanity"
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"
import { Resend } from "resend"
import { apiVersion, dataset, projectId } from "@/sanity/env"

// ── Claude ──────────────────────────────────────────────────────────────────

/** Override with BLOG_DRAFT_MODEL / SOCIAL_DRAFT_MODEL; the default is the model hubss.com's drafters run on. */
export const BLOG_MODEL = process.env.BLOG_DRAFT_MODEL || "claude-opus-4-5"
export const SOCIAL_MODEL = process.env.SOCIAL_DRAFT_MODEL || BLOG_MODEL

export interface ToolRequest {
  model: string
  system: string
  user: string
  tool: Anthropic.Tool
  maxTokens: number
}

/** One call that must answer through `tool`; resolves to the tool's input. */
export type Claude = <T>(req: ToolRequest) => Promise<T>

export const anthropicClaude: Claude = async <T,>(req: ToolRequest): Promise<T> => {
  const res = await new Anthropic().messages.create({
    model: req.model,
    max_tokens: req.maxTokens,
    system: req.system,
    tools: [req.tool],
    tool_choice: { type: "tool", name: req.tool.name },
    messages: [{ role: "user", content: req.user }],
  })
  const block = res.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === req.tool.name)
  if (!block) throw new Error(`Claude returned no ${req.tool.name} call (stop reason: ${res.stop_reason})`)
  if (res.stop_reason === "max_tokens") throw new Error(`Claude ran out of room writing ${req.tool.name}`)
  return block.input as T
}

// ── Sanity ──────────────────────────────────────────────────────────────────

export type SanityDoc = { _id: string; _type: string } & Record<string, unknown>

export interface Store {
  fetch<T>(query: string, params?: Record<string, unknown>): Promise<T>
  create(doc: SanityDoc): Promise<void>
  createOrReplace(doc: SanityDoc): Promise<void>
  /** Uploads a photograph from a public URL; resolves to the asset id, or null if it could not be fetched. */
  uploadImage(url: string, filename: string): Promise<string | null>
}

/**
 * The dataset with SANITY_API_WRITE_TOKEN (an Editor token), no CDN, "raw"
 * perspective so it sees drafts too: a draft must never take a slug another
 * draft already uses.
 */
export function sanityStore(): Store {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) throw new Error("SANITY_API_WRITE_TOKEN is not set on this server")
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "raw", token })
  return {
    fetch: <T,>(query: string, params: Record<string, unknown> = {}) => client.fetch<T>(query, params),
    create: async (doc) => {
      await client.create(doc)
    },
    createOrReplace: async (doc) => {
      await client.createOrReplace(doc)
    },
    uploadImage: async (url, filename) => {
      const res = await fetch(url)
      if (!res.ok) return null
      const asset = await client.assets.upload("image", Buffer.from(await res.arrayBuffer()), { filename })
      return asset._id
    },
  }
}

/** A Sanity image cropped to w × h around its hotspot, as a JPEG (what Buffer and the networks take). */
export function croppedImageUrl(source: SanityImageSource, w: number, h: number): string {
  return createImageUrlBuilder({ projectId, dataset }).image(source).width(w).height(h).fit("crop").format("jpg").quality(85).url()
}

// ── email ───────────────────────────────────────────────────────────────────

export interface Mail {
  to: string[]
  subject: string
  text: string
}

/** Sends one email; resolves to whether it went. */
export type Mailer = (mail: Mail) => Promise<boolean>

/** BLOG_DRAFT_NOTIFY: who hears about drafts, comma-separated (the same name hubss.com uses). */
export function notifyList(): string[] {
  return (process.env.BLOG_DRAFT_NOTIFY ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Through Resend, from the site's verified sending identity (CONTACT_FROM, as the quote form). */
export const resendMailer: Mailer = async ({ to, subject, text }) => {
  const key = process.env.RESEND_API_KEY
  if (!to.length || !key) {
    console.warn("[automation] no email sent: BLOG_DRAFT_NOTIFY or RESEND_API_KEY is not set")
    return false
  }
  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM ?? "Square One <noreply@squareonepaving.com>",
    to,
    subject,
    text,
  })
  if (error) {
    console.error("[automation] email failed:", error)
    return false
  }
  return true
}
