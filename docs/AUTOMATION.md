# Blog and social automation

Built 30 Sept 2026 on the pipeline hubss.com already runs (its Field Notes
drafter and Buffer social drafts), rewritten for Square One's voice and canon.
**It drafts; people publish.** Nothing reaches squareonepaving.com or a social
network until a person presses Publish in Studio or approves a post in Buffer.

It needs Sanity connected first (docs/CMS.md). Until the keys below are set,
every run is refused or answers what is missing, and does nothing. Without
`CRON_SECRET` the routes refuse everyone (401); the reason is in the log only.

## What happens

**Weekly, Wednesday 15:00 UTC** (8 am Pacific in summer, 7 am in winter):
`/api/cron/draft-post` (lib/automation/blog.ts)

1. Takes the next project with no post: a project the office added in Studio
   first, then the record in `lib/projects.ts`, newest work first. A project
   with a post, a draft already, no photograph, or a location awaiting Square
   One's yes is never taken. Today nine projects on the record qualify
   (Nanaimo, Langley, White Rock and Maple Ridge from 2025, Victoria High
   School 2024, Osoyoos 2023, Beban Park, Ten Mile Point, Ellis Point).
2. Claude writes a project story of 450 to 750 words from the FACTS
   (lib/automation/facts.ts): the project as the record tells it, and the
   service and system copy the site already publishes, where every
   performance figure is the manufacturer's and the manufacturer is never
   named. Nothing else.
3. The style pass (lib/automation/style.ts) finds every sentence with an em
   dash, a machine tell or a break with the canon (the manufacturer named,
   "our StreetPrint", "installed for", a guarantee, a price, a lead time, a
   borrowed standard, a count as a selling point, Vancouver Island as an
   office) and has Claude rewrite just those, once, keeping every number,
   name and link.
4. A separate fact check compares the draft with the same FACTS and lists
   every statement they don't support.
5. The draft is saved as an **unpublished** blog post (`drafts.post-<slug>`),
   dated today, with the project's lead photograph and a **Notes for the
   editor** field: the fact check, anything the style pass couldn't fix, the
   photo, and the facts it used. An email goes to `BLOG_DRAFT_NOTIFY` with
   the Studio link.

**Daily, 15:30 UTC:** `/api/cron/social-drafts` (lib/automation/social.ts)

1. Finds posts published in Studio, dated 1 Oct 2026 or later, with no
   social drafts yet (the imported library is older, so it never floods
   Buffer). At most two a day, oldest first.
2. Claude writes an Instagram, a Facebook and a LinkedIn version from the
   post alone, one ask each (read the story; "Link in bio" on Instagram),
   through the same style pass.
3. Each becomes a **draft** in that channel's Buffer queue, with the post's
   photograph cropped for the network (4:5 for Instagram, 1200 × 630 for the
   others) and a tracked link (`utm_source` = network, `utm_medium=social`,
   `utm_campaign=blog`). An email says what was drafted and what was
   skipped. Other channels (TikTok, YouTube) are skipped and named.

## Setup (Vern, once, after Sanity is connected)

All of these go in **Vercel → square-one → Settings → Environments →
Production**. Paste each key into Vercel yourself; never into a chat.

1. `SANITY_API_WRITE_TOKEN`: sanity.io/manage → the project → API → Tokens
   → Add API token, name "automation", permission **Editor**.
2. `ANTHROPIC_API_KEY`: console.anthropic.com → API keys. The same key the
   quote form's spam screen uses (lib/form-screen.ts), so one monthly spend
   limit on it covers both.
3. `CRON_SECRET`: any long random string. Vercel sends it with every cron
   call, and the routes refuse anything without it.
4. `BLOG_DRAFT_NOTIFY`: who gets the emails, comma-separated. The emails go
   out through Resend with the quote form's `RESEND_API_KEY` and
   `CONTACT_FROM`, which are already set.
5. For the social drafts, `BUFFER_API_KEY`: a Buffer account in Square One's
   name; connect the Facebook page, the Instagram professional account
   (linked to that page) and the LinkedIn company page; then
   publish.buffer.com/settings/api → create a key. (The same setup as
   hubss.com's, in its docs/buffer-setup.md.)
6. Redeploy production (variables only reach new builds). To try it at
   once: Vercel → square-one → Settings → Cron Jobs → draft-post → Run.

Optional: `BLOG_DRAFT_MODEL` and `SOCIAL_DRAFT_MODEL` choose the Claude model
(the default, `claude-opus-4-5`, is the one hubss.com's drafters use; checked
9 Oct 2026, Anthropic retires it no sooner than 24 Nov 2026, so set one of
these to a current model when it is deprecated). `AUTOMATION_PAUSED=1` stops
both jobs without removing a key.

## Steering it

- **Add a job to write up:** Studio → Projects (case studies) → + → title,
  web address, kind of work, service, systems, city, region, the story (two
  to four sentences: what was installed, where, and why it matters, only
  what's on record) and the photographs. It is on /projects at once, and the
  next weekly run takes it first. A project marked "Take off the site" is
  never drafted; the drafter writes from the Studio's version of a project,
  as the site shows it (lib/automation/facts.ts, since 9 Oct 2026).
- **Draft one particular project now:** call
  `/api/cron/draft-post?project=<its slug>` with the `CRON_SECRET` header
  (ask Claude Code on your machine to do it, without pasting the secret
  anywhere).
- **Draft a project again:** delete its log, `automation.draftlog.<project
  slug>`, in Studio's Vision tool, or use `?project=` as above.
- **Social drafts again for a post:** delete `automation.sociallog.<post
  slug>`.
- **Rejecting a draft:** delete it in Studio. Its project stays logged, so it
  isn't drafted again unless asked.

## Checking what happened

- The emails: one per blog draft, one per post drafted to Buffer.
- Studio → Blog posts: drafts show as drafts, with Notes for the editor.
- Vercel → square-one → Logs, filter `[blog]` or `[social]`.
- Vision: `*[_id in path("automation.**")]` lists every log. Sanity keeps
  any document with a dot in its id away from unauthenticated reads, so the
  logs (like drafts) are not readable through the public API.

## For developers

- `lib/automation/services.ts` holds the three outside services (Claude,
  the Sanity write client, Resend) behind small interfaces, and
  `lib/automation/buffer.ts` the Buffer API; the pipelines take them as
  arguments, so they run end to end against fakes. The routes wire the real
  ones.
- No filesystem reads in the pipelines: a cron function does not carry
  `content/` or `public/`. Published posts, projects and photographs are
  read from Sanity; a record photograph not yet in Sanity is uploaded from
  www.
- `scripts/lint-claims.mjs` reads `lib/`, so the style rules match its
  banned tokens with patterns that never spell them out.
- `vercel.json` gained `crons` only; its headers are unchanged. The post
  schema gained `editorNotes`, shown only when set and never read by the
  site.
