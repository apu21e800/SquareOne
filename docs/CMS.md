# Square One CMS — Sanity

The marketing team edits the site at **squareonepaving.com/studio** (on the
preview: `/studio` on the branch link). No code, no deploys: publish in the
Studio and the page updates within a minute.

## What they can edit

The Studio's list, in this order since 14 Oct 2026 (the automation brief),
in plain words since 20 Oct, with the office's guide first since 21 Oct:
Start here, Website Pages, Services, Projects, Blog ideas, Blog posts, Job
photos, Sent to Buffer, Site Settings, then Advanced (docs/AUTOMATION.md for
the blog and social automation).

**Included, and the add-ons** (Vern, 21 Oct 2026): Square One has the editor
free, every row below but three; the automation is offered separately, "not
aggressively, they will see the value". Until it's sold the Studio hides
**Blog ideas**, **Job photos**, **Sent to Buffer** and a post's **Goes live
by itself**, "new document" doesn't offer them, and the guide shows only
what's included. `NEXT_PUBLIC_STUDIO_ADDONS=on` in Vercel, and a redeploy,
shows them (lib/addons.ts); nothing in them is deleted while they're hidden,
and the automation does nothing while they're off.

| In the Studio            | What it changes on the site                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Start here: how to update the site** | The office's one-page guide, first in the list: change words and photos on a page (Edit on the page), add photos to a gallery, write a blog post; with the add-ons, also job photos from a phone, the Tuesday and Thursday drafts and Buffer. The same page to bookmark: squareonepaving.com/studio/guide (never indexed). Its words are `lib/office-guide.ts`. |
| **Website Pages → Home page** | The hero (its photographs: add, remove, reorder, caption, focal point; the headline and the line under it) and, under "The sections below", the words of every band on the home page: each label, heading and line, the four service cards and the three "who we work with" cards. |
| **Website Pages → About, Contact, Driveways page** | The words below each page's opener: About's story, mission, trades, three points, statement and regions; the quote page's headline, steps and "what to send"; the driveways page's sections, four steps and questions. |
| **Website Pages → Page openers** | The photograph and words each page opens on: About, Services, Vapour blasting, Products, Applications, Projects, Galleries, Driveways, Resources, For specifiers, Blog, and each service and application page (and each product page's photograph). |
| **Website Pages → Gallery photos** | Add a photograph to any gallery (crosswalks, driveways…), with what it shows, where and the systems; make one lead its gallery; take one off. |
| **Website Pages → Galleries: photos taken off** | Take off a photograph that came with the site (paste its address). |
| **Website Pages → Social grid** | The Instagram strip on the home page: photo + caption + link to the post. |
| **Services**             | The four services' words: the tagline, the intro, who we work with, what you get, the questions. The four are fixed: they can't be added to or deleted. |
| **Projects**             | /projects, each project's page, the home page's six, and the application and service pages. Add one, edit its words and photographs (drag to reorder; Add item, then Upload or Select one already in the media library), or "Take off the site". |
| **Blog ideas** (add-on)  | What the drafter writes next, on Tuesdays and Thursdays: project stories, project roundups and guides. Set one to Ready to have it next; it marks them Drafted and adds new Ideas when the list runs low (docs/AUTOMATION.md). Nothing here is on the site. |
| **Blog posts**           | Create, edit, publish. A new post needs its title, a lead photograph (with what it shows), the body and its section; everything else is optional. The first Publish dates a post that day (Vancouver). With the add-ons, **Goes live by itself** (with **Goes live at**) publishes a draft at the morning run on its day, if it has what Publish asks for (an edit made at that moment wins). The drafter's posts arrive here unpublished, with Notes for the editor; so does a project article written from Job photos, after an email ("Ready to read", or "Needs a read" when a check found something, a customer's phone number or address among them), and it goes live when someone presses Publish (Vern, 21 Oct 2026; with `PROJECT_ARTICLES_AUTO_PUBLISH=on` in Vercel a clean one would go live by itself two weekdays later). |
| **Job photos** (add-on)  | A finished job from a phone: 3 to 10 photos, where, the service, a line of facts. Publish, and the next morning's run drafts posts from it in Square One's Buffer, for approval. Fill in **The story** too and it becomes a project article on the Blog instead (the 15:00 UTC run, one a day). Not shown on the site by itself. A phone number, email or street address that isn't Square One's gets a yellow warning: it stays off the site. |
| **Sent to Buffer** (add-on) | Read only: what the daily run left in Buffer for each blog post, Job photos post or library post, and the style check on its copy. |
| **Site Settings**        | Phones, email, address, the footer line, Instagram / TikTok / Facebook / LinkedIn / YouTube links: read everywhere they print (the footer, the menu, the phone bar, the quote form, the contact and about pages, every "or call" line, the legal pages, llms.txt and the search engines' data). |
| **Advanced → Text and Photo slots** | The first way in (30 Sept): a key per spot (`home.hero.title`, `home.hero.1`…). The Home page above does the same more simply and wins over them. |

Every field left empty keeps what the site shows today, so nothing can go
blank. `npm run sync:pages` fills the empty fields with the site's own words
(fill-only, with a dry run), so the office starts from what is live.

Every photograph needs its alt text ("What the photo shows"; a gallery
photo's "What it shows"), and its focal point frames it everywhere it
shows: heroes, openers, gallery tiles, project and blog frames, measured
inside any crop (lib/focal.ts).

The site never depends on the CMS to build. With no project id every reader
falls back to the built-in content (lib/cms.ts), which is why the preview
kept working while the CMS was being added.

## One-time setup (Vern)

Rewritten 30 Sept 2026 and checked against the tree: the old steps named
the s1-v2-prep-2 preview and the bare domain, and their import command
stopped at "No CLI config found". Do this **after PR #11 is merged**, so
what the seed carries is what the live site already says. About 20 minutes.
Seed first, variables second: the site starts reading Sanity the moment the
variables are in, and by then the record is already there.

**Before you start** (checked 7 Oct 2026): the machine that runs step 2's
commands needs **Node 22.12 or newer**: `node -v` must print v22.12 or
higher. The Sanity tools in this repo (sanity 6, @sanity/cli 8) refuse
anything older, and `npm run cms:seed` runs on Node's own TypeScript
support. If it prints less, install Node 22 LTS from nodejs.org first.
PR #11 went live on 7 Oct, so the condition above is met.

1. **Create the project** at sanity.io → Create project → name "Square One
   Paving", dataset `production`, Free plan. Copy the project id (8
   characters) from sanity.io/manage.
2. **Seed the record**, from the repo on your machine (Claude Code can run
   it; `npx sanity login` opens the browser once):
   ```
   npm install
   npx sanity login
   npx sanity datasets list -p <project id>   # "production" must be listed; if not:
   npx sanity datasets create production --visibility public -p <project id>
   npm run cms:seed                      # writes sanity/seed/seed.ndjson from the repo
   npm run cms:import -- -p <project id> # uploads it, photographs included
   ```
   The `-p` is required: the repo has no `sanity.cli.ts`. The dataset must
   exist and be **public** before the import (the import does not create
   it, and the site reads it over the CDN without a token). The import's
   warning that a positional dataset argument is deprecated is harmless.
   The seed carries the 48 listed posts, the 31 projects, and the contact
   lines and social links; the photographs are fetched from
   www.squareonepaving.com (all 88 answered 200 on 30 Sept, and again on 7
   Oct). Ids are stable, so running it again updates rather than
   duplicates. **Run the import once.** It uses `--replace`, so once the
   office has edited anything in the Studio, running it again overwrites
   their changes with the repo's copy. Left out on purpose: posts marked `unlisted: true`, and the
   footer line and social heading, which stay the site's own until an
   editor writes one in Site settings. Spot-check three long posts in the
   Studio afterwards (the markdown → Portable Text conversion covers
   headings, lists, bold, italic, links).
3. **CORS**: sanity.io/manage → project → API → CORS origins → add each of
   these with **Allow credentials** ticked. Without them the Studio cannot
   log in from the site.
   - `https://www.squareonepaving.com`
   - `https://square-one-git-s1-own-company-based-agency.vercel.app`
   - `http://localhost:3000`
4. **Vercel → square-one → Settings → Environments → Production** (then the
   same under **Preview**) → add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = the project id
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_REVALIDATE_SECRET` = any long random string (used in step 5;
     paste it into Vercel and into Sanity, never into a chat or a ticket)
   Redeploy production (variables only reach new builds). `/studio` now
   loads the editing desk instead of "Not connected yet".
5. **Webhook** so publishing is instant: sanity.io/manage → API → Webhooks
   → URL `https://www.squareonepaving.com/api/revalidate` (www, the address
   the site answers on; the bare domain only redirects), method POST,
   trigger on create/update/delete, dataset `production`, and the same
   secret as `SANITY_REVALIDATE_SECRET` in the webhook's **Secret** field.
   Sanity signs every call with it and the route refuses anything unsigned
   (since 9 Oct 2026; the secret no longer goes in the URL, where request
   logs would keep it). Without the webhook, pages refresh on their own
   within 60 seconds. Fill the Secret in when you create the webhook:
   on hubss.com, changing it later on that page didn't take. Since 14 Oct
   2026 a signed call makes the next page load wait for the fresh page
   (`{ expire: 0 }`), so an editor who publishes and reloads sees the change.
   Leave "Trigger on drafts" off: every save while someone types would
   expire the pages.
   New posts also appear in search and the sitemap after the next deploy (a
   Vercel Deploy Hook can be added to the same webhook for that).
6. **Bring in the pages** (9 Oct 2026, once): so the Studio opens on what
   the site shows today (the hero's seven photographs, every page's opener),
   run `npm run cms:seed` then `npm run cms:import -- -p g4yp3p0k`. The
   import now only adds what the Studio doesn't have (`--missing`); it never
   overwrites anything already there, so it is safe to run again. The site
   recognises its own photographs by name and keeps serving them itself, so
   nothing changes on the site until someone edits.
7. **Invite editors**: sanity.io/manage → Members → Invite, role
   **Administrator**. The Growth trial ends about 6 Nov 2026 and the project
   falls to Free, which has only Administrator and Viewer: an Editor would
   become a Viewer and lose editing (Growth, $15 a seat a month, keeps
   Editor). They sign in at /studio with Google.
8. **Edit on the page** (14 Oct 2026): sanity.io/manage → API → Tokens →
   Add API token, name "edit on the page", permission **Viewer**. Paste it
   into Vercel → Production as `SANITY_API_READ_TOKEN` (Secret), never
   into a chat, then redeploy. Without it the Studio's "Edit on the page"
   says the site isn't set up yet, and nothing else changes.

## Editing guide for the team (short)

- **Edit on the page** (the easiest way in): Studio → **Edit on the page**
  (top bar). The site opens beside its document. Hover anything outlined
  and click it: its field opens. Type, and the page beside it changes as
  you go; nothing reaches the site until **Publish**. Photographs on the
  home page's hero and the page openers open their field the same way.
  The preview always shows your latest typing (its Drafts / Published
  switch doesn't change it). Don't use "Share preview access": anyone
  with that link could read unpublished work.
- **Yellow warnings** are suggestions in Square One's house style (no
  dashes used as dashes, no "not just X, it's Y", the systems never "ours",
  "installed at", no prices or promises, headings in sentence case). They
  never stop Publish. Posts from before 1 Oct 2026 are left alone.
- **The words on a page**: Website Pages → Home, About, Contact or
  Driveways page. Each band is a box: its label, its heading, the heading's
  lighter ending, and the line under it. A heading and its ending go
  together: change one and check the other. Empty a field to go back to the
  site's own words.
- **A service's words**: Services → the service. The tagline also sits
  under the service page's headline (unless its Page opener has its own
  line). Questions go to Google too: answer only what the page says.
- **Phone numbers, the email, the address**: Site Settings. Change one there
  and it changes everywhere on the site, the FAQ answers and the legal pages
  included (lib/site-settings.ts). Write phones as 604-612-6209.
- **The home page's hero**: Home page → Hero photographs. Drag to reorder,
  ⋯ → Remove to take one out, + Add item for a new one (a photograph of our
  own work at least 1600px wide, what it shows, the caption: place · system
  · year). Click a photograph and drag the focal point onto the pavement:
  that part stays in frame. Keep three or more. Publish.
- **A page's opening photograph or words**: Page openers → the page. Change
  the photograph (with what it shows and its caption), the headline, its
  lighter ending, or the line under it. A page with no entry yet: + → pick
  the page; only what you fill in changes.
- **A photograph in a gallery**: Gallery photos → + → the photograph, the
  gallery, what it shows, where (only if we say so publicly) and the region.
  It shows near the top of its gallery, newest first; tick "Lead the
  gallery" to put it first. "Take off the site" hides it.
- **Take off a photograph that came with the site**: on the site, right-click
  it → Copy image address; Galleries: photos taken off → + → paste. Delete
  the line to bring it back.

- **Project**: Projects → + → title, application, service line, systems,
  city and region, the summary, then the photographs (the first one leads;
  drag the focal point onto the pavement). Year, client and designer only
  when Square One has said so publicly. "The project, told" adds paragraphs
  under the summary; "Blog post" links the post that tells it in full.
  Publish. To take one off the site, tick "Take off the site" (deleting a
  project that came with the site doesn't remove it).

- **Blog post**: Blog posts → + → title, then Generate for the web address,
  the section, the lead photo (drag the focal point onto the pavement, say
  what it shows), a one-paragraph summary, then the body. Publish. The first
  Publish dates the post that day (a date in the future is kept), so a draft
  that waited a week goes out dated the day it went live. Leave the web
  address alone after publishing.
- **Going live later**: turn on **Goes live by itself** and set **Goes live
  at**: the morning run (7 a.m. Vancouver time, all year) publishes
  it on that day. Turn it off to hold it; Publish puts it live at once.
- **Job photos**: Job photos → + → 3 to 10 photos (best first; for each,
  what it shows and the focal point), where (town, BC), the service, and a
  line or two of facts. Publish: its posts are drafted in Buffer the next
  morning. Add **The story** (a few sentences in your own words: the site,
  what was needed, what went in, how it has held up) and it becomes a
  project article instead; you'll get an email to read it before it goes.
- **Photos**: JPG, at least 1600px wide for lead photographs; 1200px for
  body photos. Always fill in "What the photo shows".
- **Social grid**: post to Instagram/TikTok first, then Social grid → + →
  the same photo, a short caption, the post's link, the date. The home page
  shows the newest six. Tick "Video / reel" for reels.
- **TikTok**: Site settings → TikTok → paste the account link. The TikTok
  button appears on the home page and in the footer.
- **Undo**: every document keeps its history (⋯ → History) — restore any
  earlier version.

## For developers

- Schemas: `sanity/schemaTypes/*`. Studio config: `sanity.config.ts`.
  Client + image URLs: `sanity/lib/client.ts`. Readers with fallbacks:
  `lib/cms.ts`, `lib/blog.ts` (`getPosts`, `getPost`).
- Reads are cached 60 s (`next: { revalidate: 60, tags: ["sanity"] }`) and
  purged by `POST /api/revalidate`, signed by Sanity's webhook secret
  (`parseBody` from `next-sanity/webhook`; unsigned calls get 401).
- Add an editable spot: read `getSlots()` in the page, pass
  `slotText(slots, "page.key", fallback)` / `slotImage(...)` into the
  section, and list the key in this file.
- Hero, openers and galleries (9 Oct 2026): `lib/page-content.ts`
  (`getHomeHero`, `getPageOpener`, and `openerFor` for service,
  application and product pages) and `lib/work-cms.ts`
  (`getStudioWork`, `studioWorkFor`, `studioWorkForRegion`). The pages'
  own openers live in `lib/openers.ts` and the reel in `lib/hero-slides.ts`,
  which the seed copies into the Studio. A Studio photograph that is the
  page's own file (same original name, uncropped) is served from the site.
  With the Studio empty or as seeded, all 117 pages match www
  (`npm run test:pages`; compared page by page on 9 Oct). Gallery photos
  from the Studio go straight after a gallery's first photograph (or first,
  with "Lead the gallery"), so a gallery's face only changes when the office
  says so. Search (lib/search-index.ts) and the contact page's cities still
  read the record.
- Projects (9 Oct 2026): every page that shows a project reads
  `getProjects()` / `getProject()` in `lib/projects-cms.ts`. The Studio's
  version wins field by field; `lib/projects.ts` fills the gaps (the seed
  left out a page's paragraphs and blog link, so those stay the record's
  until typed into "The project, told" and "Blog post"), and is the whole
  answer when Sanity can't be reached. A photograph the Studio holds that
  is the same file the site serves (by original file name) is served from
  the site; new or cropped ones from Sanity's CDN. With the Studio as seeded,
  all 31 projects come out exactly as the record (`npm run test:projects`,
  and checked against the live dataset on 9 Oct). Deleting a seeded project
  in the Studio doesn't remove it ("Take off the site" does). /projects/[slug]
  builds the known ones ahead and a new one on its first request. The site
  search reads the record, so a new project shows there after the next
  deploy (as new posts do).
- Edit on the page (14 Oct 2026): `presentationTool` in `sanity.config.ts`,
  its page map in `sanity/presentation.ts` (which document each page opens,
  and which pages show a document). The Studio turns on Next's draft mode
  through `app/api/draft-mode/enable` (next-sanity's
  `defineEnableDraftMode`, checking the Studio's one-time secret with the
  Viewer token, `SANITY_API_READ_TOKEN`); `app/api/draft-mode/disable`
  turns it off and returns only to a path on this site (`lib/preview.ts`).
  In draft mode `sanityFetch` reads drafts, uncached, with invisible marks
  on the words a visitor reads (`sanity/lib/stega.ts` lists the fields per
  document type: never slugs, links, phones, emails, addresses, alt text,
  categories), and `app/layout.tsx` mounts `components/PreviewTools.tsx`
  (VisualEditing, plus an "Exit preview" bar outside the Studio's frame).
  `editAttr()` adds the `data-sanity` that makes the hero's and the
  openers' photographs clickable, in the preview only. Visitors never get
  any of it: draft mode is one editor's cookie, and `next build` keeps
  every page static (compared page by page with www, 14 Oct 2026). Where
  Studio words are measured or reused, clean them: `fitVars`,
  `pageTitle`, `clampDescription` and `scriptJson` call `stegaClean`.
  `npm run test:preview`.
- The Studio at hubss.com's level (14 Oct 2026, the automation brief's
  Phase A):
  - `/studio` renders in the browser only (`app/studio/[[...tool]]/page.tsx`,
    `next/dynamic` with `ssr: false`); the noindex is in
    `app/studio/layout.tsx` and an `X-Robots-Tag` in `vercel.json`.
  - The list: `sanity/structure.ts` (`SINGLETONS`, `FIXED_TYPES`), tested by
    `npm run test:studio`.
  - The first Publish dates a post: `sanity/actions.ts` wraps Publish for
    `post` (Sanity's documented "set a value, then publish"),
    `sanity/lib/publish-date.ts` decides (never published, date blank or past:
    today in Vancouver; a future date or a later Publish: left alone).
  - Every page's words: `lib/page-copy.ts` (the code's words, verbatim, and
    the merge: the Studio's field when it has one, a heading and its ending
    as a pair, a list only when it has a real line), read by
    `lib/page-content.ts` (`getHomeCopy`, `getAboutCopy`, `getContactCopy`,
    `getDrivewaysCopy`), schemas in `sanity/schemaTypes/words.ts`.
    `components/ui/Heading.tsx` sets a heading and its lighter ending.
  - Services: `lib/services-cms.ts` (`getStudioServices`,
    `getStudioService`, `mergeService`) over `lib/services.ts`; schema
    `sanity/schemaTypes/service.ts`. The /services index keeps its own line
    for a service until the Studio's tagline differs from the record's.
  - Site Settings: `lib/site-settings.ts` (defaults, `mergeSettings`,
    `telHref`, `schemaPhone`, `addressParts`, `withSettings` for prose),
    `getSiteSettings()` in `lib/cms.ts`, and
    `components/SiteSettingsProvider.tsx` for client components (the layout
    reads them once). Kept on the code's copy on purpose: the quote form's
    server failure message (`lib/contact.ts` FALLBACK) and blog posts' text.
  - Photos: `lib/focal.ts` turns the hotspot into `object-position` inside
    the crop; `Project.photoMeta` (alt, focal point, preview mark) by
    address; `WorkPhoto.position`/`edit`; `BlogPost.featured_alt`,
    `featured_position`, `featured_edit`.
  - Seeding: `npm run sync:pages -- --dry-run` (no token), then
    `npx sanity exec scripts/sync-pages-to-sanity.ts --with-user-token`
    after `npx sanity login` (`sanity.cli.ts` names the project). Fill-only;
    a document with a draft open is left alone and named.
  - CI: `.github/workflows/test.yml` runs `npm run check` and every
    no-network test on each push and pull request.
- Style warnings (14 Oct 2026): `sanity/schemaTypes/style.ts` runs
  `lib/automation/style.ts` (the drafter's house style, browser-safe: no
  lookbehind) as `.warning()` validations on the words a visitor reads.
- Posts drafted by the automation (docs/AUTOMATION.md) carry `editorNotes`,
  a field shown in Studio only when it has something in it; the site never
  queries it.
