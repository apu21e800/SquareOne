# Square One CMS — Sanity

The marketing team edits the site at **squareonepaving.com/studio** (on the
preview: `/studio` on the branch link). No code, no deploys: publish in the
Studio and the page updates within a minute.

## What they can edit

| In the Studio            | What it changes on the site                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Blog posts**           | Create, edit, publish. Lead photograph, category, body with photos and links.    |
| **Projects**             | The case studies — title, story, city, systems, photographs, "feature on home".  |
| **Social grid**          | The "Follow the work" strip on the home page: photo + caption + link to the post. |
| **Site settings**        | Phones, email, address, Instagram / TikTok / Facebook / LinkedIn / YouTube links, the social heading. |
| **Text slots**           | Headings and lines anywhere the site exposes a key (list below).                 |
| **Photo slots**          | Photographs anywhere the site exposes a key — the home reel first.               |

Slot keys wired today: `home.hero.eyebrow`, `home.hero.title`, `home.hero.1`
… `home.hero.5` (photo + caption), `home.statement`. Every page picks up
Site settings in the footer. More keys are added as pages are wired; a key
with no slot document shows the built-in value, so nothing can go blank.

The site never depends on the CMS to build. With no project id every reader
falls back to the built-in content (lib/cms.ts), which is why the preview
kept working while the CMS was being added.

## One-time setup (Vern)

1. **Create the project** at sanity.io → Create project → name "Square One
   Paving", dataset `production`, free plan. Copy the project id (8
   characters) from sanity.io/manage.
2. **Vercel → square-one → Settings → Environment Variables** (all
   environments):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = the project id
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_REVALIDATE_SECRET` = any long random string (used in step 5)
   Redeploy. `/studio` now loads the editing desk.
3. **CORS** — sanity.io/manage → project → API → CORS origins → add
   `https://square-one-git-s1-v2-prep-2-based-agency.vercel.app` and, at
   launch, `https://squareonepaving.com` (allow credentials). Without this
   the Studio cannot log in from the site.
4. **Seed the record** (once, from the repo on your machine, logged in with
   `npx sanity login`):
   ```
   npm install
   npm run cms:seed      # writes sanity/seed/seed.ndjson from the repo
   npm run cms:import    # uploads 51 posts, 31 projects, settings + photos
   ```
   Ids are stable, so running it again updates rather than duplicates.
   Spot-check three long posts in the Studio afterwards (the markdown →
   Portable Text conversion covers headings, lists, bold, italic, links).
5. **Webhook** so publishing is instant — sanity.io/manage → API → Webhooks
   → URL `https://squareonepaving.com/api/revalidate?secret=<the secret>`,
   trigger on create/update/delete, dataset `production`. Without it, pages
   refresh on their own within 60 seconds. New posts also appear in search
   and the sitemap after the next deploy (a Vercel Deploy Hook can be added
   to the same webhook for that).
6. **Invite editors** — sanity.io/manage → Members → invite Gord, Jan and
   the marketing team (Editor role). They sign in at /studio with Google.

## Editing guide for the team (short)

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
  purged by `POST /api/revalidate?secret=…`.
- Add an editable spot: read `getSlots()` in the page, pass
  `slotText(slots, "page.key", fallback)` / `slotImage(...)` into the
  section, and list the key in this file.
- Projects: the schema and seed exist; the site still renders case studies
  from `lib/projects.ts`. Wiring `/projects` to the CMS is the next pass.
