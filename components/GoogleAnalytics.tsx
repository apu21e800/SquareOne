"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import AnalyticsEvents from "@/components/AnalyticsEvents"

/**
 * Google's tag (14 Oct 2026). Mounted from app/layout.tsx in production
 * only, never in an editor's preview, and never on /studio: the Studio
 * shares the root layout, an editor's session isn't a visit, and nothing
 * from Google belongs on the page that receives Sanity's login.
 *
 * The small inline part defines gtag() and the property at once, so a tap
 * in the first second still counts; Google's 90 KB script itself loads only
 * once the page has finished loading (lazyOnload), so it never competes
 * with the hero photograph on a slow phone. Page views on client-side
 * navigation come from GA4's enhanced measurement ("page changes based on
 * browser history events"), on by default for the web stream.
 */
export default function GoogleAnalytics({ id }: { id: string }) {
  const pathname = usePathname() ?? "/"
  if (pathname.startsWith("/studio")) return null
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <AnalyticsEvents />
    </>
  )
}
