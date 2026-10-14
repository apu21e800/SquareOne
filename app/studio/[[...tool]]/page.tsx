"use client"

/**
 * /studio: the editing desk. Covers the page (fixed, above the site chrome)
 * so the Studio owns the viewport. Until Vercel carries a Sanity project id
 * it shows the setup note instead of a broken Studio.
 *
 * Rendered in the browser only (14 Oct 2026, as hubss.com has since 7 Oct).
 * The Studio can't render on a server: every visit used to try there first,
 * fail, and start again in the browser. Skipping the server pass changes
 * nothing an editor sees. A client page can't export metadata, so the
 * noindex lives in app/studio/layout.tsx, with the matching X-Robots-Tag
 * header in vercel.json.
 */
import nextDynamic from "next/dynamic"
import Link from "next/link"
import { cmsEnabled } from "@/sanity/env"

export const dynamic = "force-dynamic"

const Studio = nextDynamic(() => import("./Studio"), { ssr: false })

export default function StudioPage() {
  if (!cmsEnabled) {
    return (
      <main className="fixed inset-0 z-[1000] flex items-center justify-center bg-[color:var(--surface-warm)] px-6">
        <div className="max-w-[52ch]">
          <div className="eyebrow">Studio</div>
          <h1 className="mt-5 text-[1.75rem]">Not connected yet</h1>
          <p className="mt-5 text-[16px] leading-[1.7] text-[color:var(--ink-body)]">
            The editing desk switches on once the site knows its Sanity project. Set
            <code className="mx-1 rounded-[2px] bg-[color:var(--surface-stone)] px-[6px] py-[2px] text-[14px]">NEXT_PUBLIC_SANITY_PROJECT_ID</code>
            and
            <code className="mx-1 rounded-[2px] bg-[color:var(--surface-stone)] px-[6px] py-[2px] text-[14px]">NEXT_PUBLIC_SANITY_DATASET</code>
            in Vercel, redeploy, and come back to this address. Steps are in docs/CMS.md.
          </p>
          <Link href="/" className="arrow-link mt-8 inline-block">
            Back to the site <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </main>
    )
  }
  return <Studio />
}
