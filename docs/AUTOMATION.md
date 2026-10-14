# Blog and social automation

Built 30 Sept 2026 on the pipeline hubss.com already runs (its Field Notes
drafter and Buffer social drafts), rewritten for Square One's voice and canon;
since 14 Oct 2026 the blog runs from a plan that keeps itself stocked, as
hubss.com's does.
**It drafts; people publish.** Nothing reaches squareonepaving.com or a social
network until a person presses Publish in Studio or approves a post in Buffer.

It needs Sanity connected first (docs/CMS.md). Until the keys below are set,
every run is refused or answers what is missing, and does nothing. Without
`CRON_SECRET` the routes refuse everyone (401); the reason is in the log only.
With it, a blog run missing another key emails `BLOG_DRAFT_NOTIFY` which one.

## What happens

**The blog, Tuesdays and Thursdays at 13:00 UTC** (6 am Pacific in summer,
5 am in winter), since 14 Oct 2026, as hubss.com's Insights drafter:
`/api/cron/draft-post` (lib/automation/blog.ts)

1. Takes the top item in **Studio → Blog plan** (sanity/schemaTypes/storyIdea.ts)
   marked **Ready**; when none is, the top **Idea** (priority, then age). An
   item that can't be written (a project story whose job already has a post,
   a roundup with fewer than three jobs on the site, a guide with nothing
   ticked) is passed over and named in the email.
2. Three kinds of article (lib/automation/plan.ts), each written only from
   Square One's own pages and documented jobs (lib/automation/facts.ts):
   - **Project story**: one job from Projects, as its record tells it, with
     the service and system pages it used. Files under the job's kind of work
     (Crosswalks, Parks & Paths...) and is tagged "Project stories", which the
     blog's Project stories topic finds.
   - **Project roundup**: three to six jobs, each told only from its record.
     Filed the same way. Never a "case study" (the canon).
   - **Guide**: a question customers search for (driveways, parking lots,
     strata, municipal work in BC), answered from the ticked service, system
     and application pages (and the driveways page with its questions). Files
     under Guides.
   The plan item's brief is added: an editor's brief is treated as true; the
   planner's questions (under "Questions to answer (not facts)") are filed
   apart and support no statement.
3. Claude writes it, the style pass (lib/automation/style.ts) rewrites any
   sentence with an em dash, a machine tell or a break with the canon, and a
   separate fact check lists every statement the FACTS don't support.
4. It is saved as an **unpublished** blog post (`drafts.post-<slug>`), dated
   today, with a lead photograph (the job's own; for a roundup the first
   job's, for a guide the first service page's, each named as a stand-in) and
   **Notes for the editor**: the fact check, anything the style pass couldn't
   fix, the photo and the facts it used. The plan item is set to **Drafted**.
5. An email to `BLOG_DRAFT_NOTIFY`: the draft and its Studio link, where it
   came from, how many items are left and the **next idea**.
6. Then, when fewer than six Ideas and Ready items are left and the run has
   time to spare, **the plan restocks itself** (lib/automation/planner.ts):
   Claude proposes guides and project roundups, and those that pass the
   checks go in at the bottom as Ideas (priority 3), back up to ten. A guide's
   brief is neutral questions only (no place, client, standard, figure or
   claim); a roundup's brief is its jobs' own records, built in code, and each
   job is told in one plan item at most. Nothing repeats an article or a plan
   item. A run that finds the plan **empty** only fills it and emails, so a
   person can look before the next run drafts.
7. **Fail loud:** a run that can't draft (a key refused or missing, Claude
   didn't finish, nothing in the plan can be written) emails the editor what
   happened and the fix, naming the key (lib/automation/outcome.ts). The plan
   item stays as it was, so the next run tries again.

The plan starts with `npm run plan:seed` (scripts/seed-blog-plan.ts): one
project story for each real job Vern names, from Projects (with
`--dry-run` first). Without names it offers every documented job with no
article of its own (nine on 14 Oct 2026). Nothing is invented: a job has to
be in Projects, with its photographs, before it can be planned.

**Social drafts: off for Square One (14 Oct 2026).** Social media is out of
scope for now (Vern will offer it later), so the daily cron is not in
vercel.json and nothing calls `/api/cron/social-drafts`; the route still
refuses anything without `CRON_SECRET`. The code stays, as it worked on
9 Oct. To switch it on: a Buffer account in Square One's name (never HUB's)
with Instagram, Facebook and LinkedIn connected, `BUFFER_API_KEY` in
Vercel, and this line back in vercel.json's `crons`:
`{ "path": "/api/cron/social-drafts", "schedule": "30 15 * * *" }`.
What it does then, daily at 15:30 UTC (lib/automation/social.ts):

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
4. `BLOG_DRAFT_NOTIFY`: who gets the emails, comma-separated (Vern alone
   for the first runs, until the first drafts are read together). The emails
   go out through Resend with the quote form's `RESEND_API_KEY` and
   `CONTACT_FROM`, which are already set.
5. For the social drafts, `BUFFER_API_KEY`: a Buffer account in Square One's
   name; connect the Facebook page, the Instagram professional account
   (linked to that page) and the LinkedIn company page; then
   publish.buffer.com/settings/api → create a key. (The same setup as
   hubss.com's, in its docs/buffer-setup.md.)
6. Seed the plan: `npm run plan:seed -- --dry-run`, then (after `npx sanity
   login`) `SEED_JOBS=<the jobs' web addresses, comma-separated> npx sanity
   exec scripts/seed-blog-plan.ts --with-user-token`.
7. Redeploy production (variables only reach new builds). The first live
   run only on Vern's yes, with him: Vercel → square-one → Settings → Cron
   Jobs → draft-post → Run, then read the draft together.

Optional: `BLOG_DRAFT_MODEL` and `SOCIAL_DRAFT_MODEL` choose the Claude model
(the default, `claude-opus-4-5`, is the one hubss.com's drafters use; checked
9 Oct 2026, Anthropic retires it no sooner than 24 Nov 2026, so set one of
these to a current model when it is deprecated). `AUTOMATION_PAUSED=1` stops
both jobs without removing a key.

## Steering it

- **What gets written next:** Studio → Blog plan. Set an item to **Ready**
  and it is next (Tuesday or Thursday); reorder with **Priority**; set one to
  **Not doing** to skip it. A plan item has no Publish button: a change
  counts the moment it's made.
- **Add an idea:** Blog plan → + → a working title, the kind of article, and
  for a project story or roundup the jobs from Projects; for a guide, the
  services, systems or kinds of work it is written from. A brief is optional:
  what you write there is treated as true, so only real facts.
- **Add a job to write up:** Studio → Projects → + (title, web address, kind
  of work, service, systems, city, region, the story in two to four
  sentences, only what's on record, and the photographs). It is on /projects
  at once; then plan a project story about it, or let the planner put it in a
  roundup. A project marked "Take off the site" is never written up.
- **Draft one plan item now:** call `/api/cron/draft-post?idea=<its
  document id>` with the `CRON_SECRET` header (ask Claude Code on your
  machine to do it, without pasting the secret anywhere). One project outside
  the plan: `?project=<its web address>`.
- **Rejecting a draft:** delete it in Studio, and set its plan item to Not
  doing (or back to Idea to have it written again).

## Checking what happened

- The emails: one per blog draft (and one when a run makes none, saying
  why), one per post drafted to Buffer.
- Studio → Blog plan: what was drafted (Drafted, with the draft's web
  address), what's next, and the Ideas the planner added (priority 3).
- Studio → Blog posts: drafts show as drafts, with Notes for the editor.
- Vercel → square-one → Logs, filter `[blog]` or `[social]`.
- From your machine: `npx sanity documents query '*[_id in
  path("automation.**")]{_id}' -p g4yp3p0k` lists every log. Sanity keeps
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
- `npm run test:automation` runs the drafter end to end against stand-ins,
  with its real GROQ queries over an in-memory dataset (groq-js); `npm run
  test:planner` checks the planner's vetting and top-up. Both run in CI
  (.github/workflows/test.yml), with no network.
- The application pages' words moved to lib/application-copy.ts (verbatim)
  on 14 Oct 2026, so guides can be written from them.
