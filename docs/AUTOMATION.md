# Blog and social automation

Built 30 Sept 2026 on the pipeline hubss.com already runs (its Field Notes
drafter and Buffer social drafts), rewritten for Square One's voice and canon;
since 14 Oct 2026 the blog runs from a list of ideas that keeps itself
stocked, and social media drafts into Square One's own Buffer, as hubss.com's
do. Since 20 Oct 2026 (Vern's brief that day): the drafter writes to
hubss.com's standard of that day, Job photos with a story become a project
article by themselves (written, then waiting for a person's Publish), any
draft can be set to go live by itself, and one of Square One's people can run
all of it from a phone.

**An add-on** (Vern, 21 Oct 2026): Square One has the editor free (docs/CMS.md);
this is offered separately, "not aggressively, they will see the value". Its
lists and "Goes live by itself" show in the Studio (22 Oct 2026: "add back
in"), and it sleeps until the keys below go in. `NEXT_PUBLIC_STUDIO_ADDONS=off`
hides them and the guide's steps for them, and stops every run (lib/addons.ts,
step 7).

**It drafts; people approve.** Nothing reaches a social network until a
person approves it in Buffer (Vern, 20 Oct 2026: Square One's posts wait for
the office's final edits). A blog draft goes on squareonepaving.com when a
person presses Publish, or, if a person set it to go live by itself, at the
morning run on its day. A project article written from Job photos waits for
a person's Publish too (Vern, 21 Oct 2026: "wait for Sydney"); the editors
are emailed "Ready to read", or "Needs a read" with what a check found (a
statement the job's record doesn't back, the house style, a phone number,
email or address that isn't Square One's). With `PROJECT_ARTICLES_AUTO_PUBLISH=on`
in Vercel, a clean one would instead be set to go live by itself two
weekdays later, after the email, and anything a check isn't happy with
saved held.

It needs Sanity connected first (docs/CMS.md). Until the keys below are set,
every run is refused or answers what is missing, and does nothing. Without
`CRON_SECRET` the routes refuse everyone (401); the reason is in the log only.
With it, a run missing another key emails `BLOG_DRAFT_NOTIFY` which one.

## What happens

**The blog, Tuesdays and Thursdays at 13:00 UTC** (6 am in Vancouver all
year: BC keeps UTC-7 from 1 November 2026), since 14 Oct 2026, as hubss.com's
Insights drafter:
`/api/cron/draft-post` (lib/automation/blog.ts)

1. Takes the top item in **Studio → Blog ideas** (sanity/schemaTypes/storyIdea.ts)
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
     and application pages (and the driveways page with its questions), with
     up to eight of Square One's documented jobs that share them
     (documentedJobs). Files under Guides.
   The idea's brief is added: an editor's brief is treated as true; the
   planner's questions (under "Questions to answer (not facts)") are filed
   apart and support no statement.
3. **The standard** (20 Oct 2026, hubss.com's, lib/automation/drafter.ts
   SHAPE): 550 to 850 words for a guide or a roundup, 350 to 600 for a project
   story or a thin record, never padded; the first paragraph puts the reader
   at a documented job, named with its town and province, or at the decision
   on their desk; proof before explanation in every section; one thing to
   keep; no product, material or contractor cast as the villain; no "vs" in a
   title or heading (the style check and the planner refuse it too); a title
   a person would say. When the article leads with a job (`leadJob`), that
   job's photograph is the article's, framed on the focal point set in
   Studio; otherwise a stand-in (a roundup's first job, a guide's first
   service page), named as such in the notes.
4. Claude writes it, the style pass (lib/automation/style.ts) rewrites any
   sentence with an em dash, a machine tell or a break with the canon, and a
   separate fact check lists every statement the FACTS don't support.
5. It is saved as an **unpublished** blog post (`drafts.post-<slug>`), dated
   today, with its lead photograph and **Notes for the editor**: the fact
   check, anything the style pass couldn't fix, the photo and the facts it
   used. The idea is set to **Drafted**.
6. An email to `BLOG_DRAFT_NOTIFY`: the draft and its Studio link, where it
   came from, how many ideas are left and the **next idea**.
7. Then, when fewer than six Ideas and Ready items are left and the run has
   time to spare, **the ideas restock themselves** (lib/automation/planner.ts):
   Claude proposes guides and project roundups, and those that pass the
   checks go in at the bottom as Ideas (priority 3), back up to ten. A guide's
   brief is neutral questions only (no place, client, standard, figure,
   claim or "vs"); a roundup's brief is its jobs' own records, built in code,
   and each job is told in one idea at most. Nothing repeats an article or an
   idea. A run that finds the list **empty** only fills it and emails, so a
   person can look before the next run drafts.
8. **Fail loud:** a run that can't draft (a key refused or missing, Claude
   didn't finish, nothing on the list can be written) emails the editor what
   happened and the fix, naming the key (lib/automation/outcome.ts). The idea
   stays as it was, so the next run tries again.

The list starts with `npm run plan:seed` (scripts/seed-blog-plan.ts): one
project story for each real job Vern names, from Projects (with
`--dry-run` first). Without names it offers every documented job with no
article of its own (nine on 14 Oct 2026). Nothing is invented: a job has to
be in Projects, with its photographs, before it can be planned.

**The daily run, 14:00 UTC** (7 am in Vancouver, all year):
`/api/cron/social-drafts`, two steps since 20 Oct 2026, each on its own (a
failure in one is emailed and the next still runs):

1. **Scheduled posts go live** (lib/automation/project-posts.ts
   publishDueDrafts): every blog draft with **Goes live by itself** on whose
   **Goes live at** has come (ten minutes' grace) becomes the live post in
   one transaction, dated that day in Vancouver (a scheduled edit to a live
   post keeps the post's date), and the editors get its address. One that
   can't go is left as it is, still set to go, and the email says why: it is
   missing something Publish asks for (a title, a web address, a lead photo,
   words in the body, a Section; for a post from the imported library, only
   the title, address and words), or another live post has its address. The
   commit checks the draft is still the one the run read: an editor who
   edits it at that moment gets the edited version published, and one who
   holds it, or publishes it by hand, is left alone.
2. **Social** (lib/automation/social.ts), below. A post step 1 just
   published waits for tomorrow's run, so its posts follow the day after it
   is live.

**The project article, daily at 15:00 UTC** (8 am in Vancouver, all year): `/api/cron/project-articles` (lib/automation/project-posts.ts
draftProjectArticles), a run of its own since the review of 20 Oct 2026, so
a morning when social has a lot to draft can't crowd it out. The oldest
published **Job photos** post with **The story** filled in and no article yet
is written up as a project story from that post's record (where, when, the
service, systems, kind of work, the crew's note, the story and what the
photographs show) and the pages of its service, systems and kind of work,
nothing else. Style pass and fact check as for every draft; a fact check
answer that can't be read counts as a problem, never as clean. Saved as an
unpublished draft: the post's first photo leads, the others close the
article under "The job in photographs", tags that break the canon are
dropped, and no time is set: it waits in Blog posts until someone presses
Publish (Vern, 21 Oct 2026). The editors are emailed "Ready to read" with
the Studio link, or "Needs a read before it goes" when either check isn't
happy, the article shows a phone number, email or street address that isn't
Square One's, or it has no photograph; the notes in the draft list what to
fix. Only with `PROJECT_ARTICLES_AUTO_PUBLISH=on` is a clean one set to go
live by itself at the morning run two weekdays after the day it was written
(Monday's on Wednesday; Thursday's on Monday; Friday's, Saturday's and
Sunday's on Tuesday; never a day another article has), switched on only
after the email has gone (if it can't be confirmed, the article stays held
and a second email says so); anything a check isn't happy with is then saved
**held**. One article a day. The Job
photos post shows **The article written from this**; a claim stops two runs
writing two articles; a copy made with Studio's Duplicate gets its own, held
(it may be the same job twice); an article an editor deletes isn't written
again. A post whose article can't be
written is tried again each morning, behind the others, for 14 days, with an
email on the first failure and one when it gives up (editing the post starts
it over; Claude taking too long counts against the post); a refused key or
no credit is emailed every time. A Job photos post
with a story gets no social posts of its own: the job goes out once, as its
article.

**Social** drafts into **Square One's own Buffer**; a person approves every
draft there (`SOCIAL_AUTO_QUEUE=on` in Vercel would queue them instead, posted
at the next slot unless deleted: hubss.com's choice since 19 Oct 2026, never
Square One's without Vern's word; copy the style pass couldn't mend waits as a
draft either way).

| Stream | What it drafts from | How often | Links to | `utm_campaign` |
|---|---|---|---|---|
| Articles | a blog post published in Studio, dated 1 Oct 2026 or later | up to 2 a day, the day after it goes live | the post | `blog` |
| From the field | a published **Job photos** post with no story (Studio → Job photos): 3 to 10 phone photos of a finished job, where, the service, a line of facts | 1 a day, the morning after it is published | the service's page | `field` |
| From the library | a documented project (Studio → Projects, the featured ones first) or a service page, taking turns (lib/automation/social-library.ts) | once a week, Mondays (the very first at once); a new Job photos post takes the week's turn | the project's or the service's page | `library` |

With two articles a week (Tuesdays and Thursdays) and one job post, that is
three posts a week on each channel. With one article a week, set
`JOB_POSTS_PER_WEEK` to 2 (lib/automation/social-library.ts) and the
library goes Mondays and Thursdays.

1. Claude writes a version per channel from the source alone (a field or
   library post never says "read the story" unless the link is one, and a
   library post is never called new), through the same style pass as the
   blog drafts.
2. Each becomes a **draft** in that channel's Buffer with the photo cropped
   for it on Sanity's CDN, centred on the focal point the office set: 1200 ×
   630 for feeds, 4:5 (1080 × 1350) for Instagram and for any portrait phone
   photo. A photo that lives only on the site (a service page's) is uploaded
   to Sanity first so it can be cropped the same way.
3. Channels: **Facebook** and **Instagram** (Buffer Free), **LinkedIn**
   (Square One has a company page; Free allows three channels), and
   **Google Business Profile** (a fourth channel, so Buffer Essentials): the
   post on Square One's listing in Search and Maps, with a "Learn more"
   button to the page (`metadata.google`), no link, phone number or hashtag
   in its text. Anything else connected (TikTok, YouTube, X) is skipped and
   named. Every Buffer field the job uses was checked against Buffer's live
   API reference on 14 Oct 2026 (lib/automation/buffer.ts).
4. An email to `BLOG_DRAFT_NOTIFY` per item: what was drafted, what was
   skipped and why, the style check, and the link to Buffer's drafts.
   Studio → Sent to Buffer keeps the same record (read only).

**Nothing fails silently, nothing is drafted twice** (lib/automation/outcome.ts,
ported from hubss.com's social-outcome): each item is claimed
(`socialLog-<key>`) before anything goes to Buffer; an item no channel took
for a reason that can clear (a refusal, a disconnected channel) has its claim
dropped and is retried daily for 14 days from its first failure
(`socialRetry-<key>`), then given up with an email; disconnected and locked
channels are skipped with the reason; every Buffer and Sanity call gives up
after 20 seconds and no item starts after two minutes of the run, so a run
always finishes and reports inside Vercel's five minutes (a draft call Buffer
never answered is not retried, since it may have saved it: the email says to
look in Buffer first); an item Claude can't write up is retried behind the
others for 14 days rather than holding the queue; a run that stops (Buffer
refused the key, the key reaches more than one Buffer organization, no
channel it can write for, a key missing in Vercel) emails what to do, naming
the key, every day until it's fixed. A retouched or generated photo is never
posted as a job (vapour blasting posts its real Granville Island photo).

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
4. `BLOG_DRAFT_NOTIFY`: who gets the emails, comma-separated. Vern, 20 Oct
   2026: Square One's office (the person who publishes) and Vern, both. The
   emails go out through Resend with the quote form's `RESEND_API_KEY` and
   `CONTACT_FROM`, which are already set. (With
   `PROJECT_ARTICLES_AUTO_PUBLISH=on`, a project article is switched on to go
   live by itself only once this email has gone.)
5. For the social drafts, `BUFFER_API_KEY`, last (it switches the job on):
   - **Square One's own Buffer account** (buffer.com), signed up with a
     Square One address, on the Free plan to start. Square One owns it and
     pays for any upgrade; 21e8 runs it. Keep it Square One only: the key
     reaches every channel on the login and the job drafts into all of them,
     so another client's channel must never be connected there.
   - Connect the Facebook page, the Instagram professional account (linked to
     that page) and the LinkedIn company page. Google Business Profile is a
     fourth channel: Buffer Essentials (billed per channel), when Square One
     wants its posts on Search and Maps.
   - **The posting schedule** (Buffer → each channel → Posting schedule):
     three times a week, Vancouver time. "Add to Queue" puts an approved
     draft in the next free time; a channel with no times can't queue.
   - publish.buffer.com/settings/api → New key, named "squareonepaving.com
     social drafts", expiry **1 year** (the longest; the default is 30 days).
     Buffer shows it once: it goes straight into Vercel. A calendar reminder
     two weeks before it expires saves the missed day; when it does expire,
     the job emails which key to replace.
   - The job drafts into one Buffer organization only. If the login ever
     belongs to more than one, it stops before drafting anything and emails;
     then either keep the login in Square One's organization alone, or put
     Square One's organization id in Vercel as `BUFFER_ORG_ID`.
6. Seed the ideas: `npm run plan:seed -- --dry-run`, then (after `npx sanity
   login`) `SEED_JOBS=<the jobs' web addresses, comma-separated> npx sanity
   exec scripts/seed-blog-plan.ts --with-user-token`.
7. Leave `NEXT_PUBLIC_STUDIO_ADDONS` unset: the office sees Blog ideas, Job
   photos, Sent to Buffer and a post's Goes live by itself in the Studio, and
   the guide has its job photos, drafts and Buffer steps. Set to `off`, they
   hide and the jobs stop with them: a run does nothing, emails nobody and
   says why in the log, so nothing goes out that the office can't see.
8. Redeploy production (variables only reach new builds). The first live
   run of each job only on Vern's yes, with him: Vercel → square-one →
   Settings → Cron Jobs → draft-post (or social-drafts, or project-articles)
   → Run, then read the drafts together. Without `BUFFER_API_KEY` the daily
   run still publishes scheduled posts, and the project articles are written;
   social is skipped.

Optional: `BLOG_DRAFT_MODEL` and `SOCIAL_DRAFT_MODEL` choose the Claude model
(the default, `claude-opus-4-5`, is the one hubss.com's drafters use; checked
9 Oct 2026, Anthropic retires it no sooner than 24 Nov 2026, so set one of
these to a current model when it is deprecated). `SOCIAL_AUTO_QUEUE=on`
queues social posts instead of drafting them (only on Vern's word).
`PROJECT_ARTICLES_AUTO_PUBLISH=on` sets a clean project article to go live by
itself two weekdays after its email instead of waiting for Publish (off since
21 Oct 2026, Vern: "wait for Sydney"; only on his word).
`AUTOMATION_PAUSED=1` stops every job without removing a key.

## Steering it

- **What gets written next:** Studio → Blog ideas. Set an item to **Ready**
  and it is next (Tuesday or Thursday); reorder with **Priority**; set one to
  **Not doing** to skip it. An idea has no Publish button: a change counts
  the moment it's made.
- **Add an idea:** Blog ideas → + → a working title, the kind of article,
  and for a project story or roundup the jobs from Projects; for a guide, the
  services, systems or kinds of work it is written from. A brief is optional:
  what you write there is treated as true, so only real facts.
- **Add a job to write up:** Studio → Projects → + (title, web address, kind
  of work, service, systems, city, region, the story in two to four
  sentences, only what's on record, and the photographs). It is on /projects
  at once; then plan a project story about it, or let the planner put it in a
  roundup. A project marked "Take off the site" is never written up.
- **Job photos from a phone:** Studio → Job photos → + : 3 to 10 photos
  (best first, each with a line saying what it shows, and its focal point),
  where, the service, and a sentence or two of facts. Publish, and the next
  morning's run drafts its posts in Buffer. Fill in **The story** too, and it
  becomes a project article instead (above).
- **A draft set to go live by itself:** read it in Studio → Blog posts and
  change anything; it still goes on time. To move it, change **Goes live
  at**; to hold it, turn **Goes live by itself** off (it then waits for
  Publish). Pressing Publish yourself puts it live at once and switches the
  schedule off. Any other draft can be scheduled the same way.
- **Draft one idea now:** call `/api/cron/draft-post?idea=<its document id>`
  with the `CRON_SECRET` header (ask Claude Code on your machine to do it,
  without pasting the secret anywhere). One project outside the list:
  `?project=<its web address>`.
- **Rejecting a draft:** delete it in Studio, and set its idea to Not doing
  (or back to Idea to have it written again).
- **A social draft nobody wants:** delete it in Buffer. Its record stays, so
  it isn't drafted again. To have an item drafted again, delete its record
  `socialLog-<key>` from Vern's machine (the Studio can't delete it).

## Checking what happened

- The emails: one per blog draft (and one when a run makes none, saying
  why), one per scheduled post that went live (or couldn't), one per project
  article written, one per item drafted to Buffer.
- Studio → Blog ideas: what was drafted (Drafted, with the draft's web
  address), what's next, and the Ideas the planner added (priority 3).
- Studio → Blog posts: drafts show as drafts, with Notes for the editor; a
  scheduled one shows **Goes live by itself** and its time.
- Studio → Job photos: a post written up shows **The article written from
  this**.
- Studio → Sent to Buffer: one record per item that went to Buffer, with the
  channels, the Buffer post ids, anything skipped and the style check.
- Vercel → square-one → Logs, filter `[blog]`, `[planner]`, `[projects]` or
  `[social]`.
- From your machine: `npx sanity documents query '*[_id in
  path("automation.**")]{_id}' -p g4yp3p0k` lists the blog's draft logs
  (private ids). The ideas and the social records are ordinary documents in
  the public dataset: nothing private goes in them.

## For developers

- `lib/automation/services.ts` holds the three outside services (Claude,
  the Sanity write client, Resend) behind small interfaces, and
  `lib/automation/buffer.ts` the Buffer API; the pipelines take them as
  arguments, so they run end to end against fakes. The routes wire the real
  ones. `Store.publish` writes the live post and removes the draft in one
  transaction. `lib/automation/editor-mail.ts` sends the daily run's emails
  (15 s at most, never throws, returns who it reached).
- No filesystem reads in the pipelines: a cron function does not carry
  `content/` or `public/`. Published posts, projects and photographs are
  read from Sanity; a record photograph not yet in Sanity is uploaded from
  www.
- `scripts/lint-claims.mjs` reads `lib/`, so the style rules match its
  banned tokens with patterns that never spell them out.
- `vercel.json` gained `crons` only; its headers are unchanged. The post
  schema gained `editorNotes` (shown only when set, never read by the site),
  and since 20 Oct 2026 `scheduled`, `scheduledFor` and `fieldPost`; the Job
  photos schema gained `writeUp` and `article`. A new post can't be published
  without a title, a photograph with its alt text, a body and a section; the
  imported library (dated before 1 Oct 2026) is only warned.
- `npm run test:social` runs the social job end to end against stand-ins
  (Buffer, Sanity through groq-js, Claude, the mail): the three streams, the
  claim, retries and give-ups, the skips, the time limits, the crops, the
  approval switch and the exact shape sent to Buffer.
- `npm run test:project-posts` runs both new steps end to end against
  stand-ins: the slot, the Vancouver times, the record, the held and the
  scheduled drafts, the email before the switch, publishing on time, the
  claims. `npm run test:drafter` checks the standard: the documented jobs,
  the lead photograph, SHAPE, and "vs" refused in titles, headings and ideas.
- `npm run test:automation` runs the drafter end to end against stand-ins,
  with its real GROQ queries over an in-memory dataset (groq-js); `npm run
  test:planner` checks the planner's vetting and top-up. All run in CI
  (.github/workflows/test.yml), with no network.
- The application pages' words moved to lib/application-copy.ts (verbatim)
  on 14 Oct 2026, so guides can be written from them.
