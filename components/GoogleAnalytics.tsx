import Script from "next/script"

/**
 * Google's tag, loaded after the page is interactive so it never holds up
 * the first paint (14 Oct 2026). Page views on client-side navigation come
 * from GA4's own enhanced measurement ("page changes based on browser
 * history events"), on by default for the web stream. Mounted from
 * app/layout.tsx in production only, never in an editor's preview.
 */
export default function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  )
}
