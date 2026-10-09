import { initBotId } from "botid/client/core"

// Vercel BotID: an invisible check that the quote form was sent from a real
// browser on this site (9 Oct 2026, the forms' spam fix; lib/form-screen.ts
// has the whole story). The form posts to /api/contact through
// lib/post-form.ts, and the route asks BotID about each request before
// reading it.
//
// initBotId wraps window.fetch and XMLHttpRequest on every page (the Studio
// included) but only acts on POSTs to /api/contact. The unwrapped fetch is
// kept first, so the form can still send if BotID's script can't load
// (lib/post-form.ts).
;(window as unknown as { __s1Fetch?: typeof fetch }).__s1Fetch = window.fetch.bind(window)

initBotId({
  protect: [{ path: "/api/contact", method: "POST" }],
})
