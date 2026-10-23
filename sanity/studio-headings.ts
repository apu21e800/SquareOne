/**
 * The Studio's headings, handed back to the Studio (23 Oct 2026).
 *
 * The Studio renders inside the site's root layout, so the site's heading
 * rules reach its headings too. app/globals.css gives every h1 to h6 the
 * site's ink colour (in `@layer base`), and Sanity's headings declare no
 * colour of their own (they take their pane's), so in the Studio's dark
 * theme a document's title and a post's Heading came out near-black on a
 * near-black pane (Vern, 23 Oct: "dark text on a dark background"). The
 * site's h2 rules (app/own.css, app/refine.css, app/mobile.css: up to one
 * element and four classes) also outrank Sanity's own (one class), so an h2
 * took Futura at the site's section size, 47px.
 *
 * The colour rule has no specificity at all (`:where`). It still beats the
 * site's colour, which sits in a layer, and it still loses to Sanity's own
 * muted and accent colours (an untitled document's grey title). The h2
 * rules need the id to outrank the site's. The sizes are Sanity UI's own
 * (@sanity/ui 4.0.7, its default theme): a document's title is a size 2
 * Heading (21/29px), a post's Heading is size 4 (33/41px), and the few
 * dialog titles Sanity prints as an h2 in Text are size 1 (13/19px). Any
 * other h2 Heading gets size 2 too (the only others are the titles in
 * Sanity's own diagnostics report, size 1). An h2 keeps the site's weight,
 * 700, which is a Heading's own.
 *
 * app/studio/[[...tool]]/Studio.tsx puts the id on the Studio's frame and
 * these rules beside it. `npm run test:studio` checks the frame carries the
 * id, that no site stylesheet styles a heading by an id (it could outrank
 * these), and that no site colour for a heading leaves its layer (it would
 * outrank the colour rule). Checked in the live Studio in dark mode on
 * 23 Oct 2026: titles and headings rgb(228, 229, 233) on rgb(19, 20, 27).
 */
export const STUDIO_ROOT_ID = "studio"

const SANITY_FONT = `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`

export const STUDIO_HEADINGS = `
:where(#${STUDIO_ROOT_ID} [data-ui="Heading"]) { color: inherit; }
#${STUDIO_ROOT_ID} h2:is([data-ui="Heading"], [data-ui="Text"]) {
  font-family: ${SANITY_FONT};
  letter-spacing: 0;
  text-transform: none;
  text-wrap: wrap;
}
#${STUDIO_ROOT_ID} h2[data-ui="Heading"] { font-size: 1.3125rem; line-height: 1.38095; }
#${STUDIO_ROOT_ID} h2[data-ui="Heading"][data-testid="text-style--h2"] { font-size: 2.0625rem; line-height: 1.24242; }
#${STUDIO_ROOT_ID} h2[data-ui="Text"] { font-size: 0.8125rem; line-height: 1.46154; }
`
