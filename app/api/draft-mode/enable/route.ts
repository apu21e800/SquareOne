import { defineEnableDraftMode } from "next-sanity/draft-mode"
import { client, previewToken } from "@/sanity/lib/client"

/**
 * The Studio's "Edit on the page" calls this with a one-time secret it has
 * just written to Sanity. defineEnableDraftMode checks that secret against
 * Sanity with the Viewer token, turns on Next's draft mode for this browser
 * only (a cookie), and sends the editor to the page they opened. A wrong or
 * stale secret is refused (401) and nothing is switched on.
 *
 * Without SANITY_API_READ_TOKEN in Vercel the preview can't read drafts, so
 * it says so instead (503); the published site is unaffected either way.
 */
export async function GET(request: Request) {
  const token = previewToken()
  if (!client || !token) {
    return new Response("Edit on the page isn't set up on this server yet: it needs SANITY_API_READ_TOKEN (docs/CMS.md).", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    })
  }
  const { GET: enable } = defineEnableDraftMode({ client: client.withConfig({ token }) })
  return enable(request)
}
