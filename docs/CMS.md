# Square One CMS — Sanity

The marketing team edits the site at **squareonepaving.com/studio** (on the
preview: `/studio` on the branch link). No code, no deploys: publish in the
Studio and the page updates within a minute.

## What they can edit

| In the Studio            | What it changes on the site                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Home page**            | The hero: its photographs (add, remove, reorder, caption, set each one's focal point), the headline and the line under it. |
| **Page openers**         | The photograph and words each page opens on: About, Services, Vapour blasting, Products, Applications, Projects, Galleries, Driveways, Resources, For specifiers, Blog, and each service and application page (and each product page's photograph). |
| **Gallery photos**       | Add a photograph to any gallery (crosswalks, driveways…), with what it shows, where and the systems; make one lead its gallery; take one off. |
| **Galleries: photos taken off** | Take off a photograph that came with the site (paste its address). |
| **Blog posts**           | Create, edit, publish. Lead photograph, category, body with photos and links.    |
| **Projects**             | The case studies: /projects, each project's page, the home page's six, and the application and service pages. Add one, edit its words and photographs, or "Take off the site". |
| **Social grid**          | The Instagram strip on the home page ("Recent, on Instagram"): photo + caption + link to the post. |
| **Site settings**        | Phones, email, address, Instagram / TikTok / Facebook / LinkedIn / YouTube links, the social heading. |
| **Advanced → Text and Photo slots** | The first way in (30 Sept): a key per spot (`home.hero.title`, `home.hero.1`…). The Home page above does the same more simply and wins over them. |

Every field left empty keeps what the site shows today, so nothing can go
blank. Every page picks up Site settings in the footer.

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
   within 60 seconds.
   New posts also appear in search and the sitemap after the next deploy (a
   Vercel Deploy Hook can be added to the same webhook for that).
6. **Bring in the pages** (9 Oct 2026, once): so the Studio opens on what
   the site shows today (the hero's seven photographs, every page's opener),
   run `npm run cms:seed` then `npm run cms:import -- -p g4yp3p0k`. The
   import now only adds what the Studio doesn't have (`--missing`); it never
   overwrites anything already there, so it is safe to run again. The site
   recognises its own photographs by name and keeps serving them itself, so
   nothing changes on the site until someone edits.
7. **Invite editors**: sanity.io/manage → Members → invite Gord, Jan and
   the marketing team (Editor role). They sign in at /studio with Google.

## Editing guide for the team (short)

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

- **Blog post**: Blog posts → + → title, date, category, lead photo (drag the
  focal point onto the pavement), a one-paragraph summary, then the body.
  Publish. The web address is set from the title once — leave it alone
  after publishing.
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
  (`getHomeHero`, `getPageOpener`, `getOpenerDoc` + `mergeOpener` for
  service, application and product pages) and `lib/work-cms.ts`
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
- Posts drafted by the automation (docs/AUTOMATION.md) carry `editorNotes`,
  a field shown in Studio only when it has something in it; the site never
  queries it.
