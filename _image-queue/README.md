# _image-queue

Staging area for photography that is **not yet approved to go live**.

Deliberately **outside `public/`**. Anything under `public/` is served at a URL
the moment it deploys, and is crawlable — so unreleased client work, unapproved
shots and raw exports must not sit there. Nothing in this folder is served by
the site.

Contents are **gitignored**, so dropping 400MB of raw exports here will not
bloat the repo or trip the Git LFS rule. Only this README and the `.gitkeep`
files are tracked, so the structure survives a clone.

```
_image-queue/
  projects/       → destined for public/images/projects/<slug>/
  products/       → destined for public/images/products/<slug>/
  applications/   → destined for public/images/applications/<slug>/
  unsorted/       → not yet triaged
```

## How it works

1. Drop anything in here — any size, any name, any format.
2. When a shot is approved, **move** it to the matching slug folder under
   `public/images/…` and rename it to the final convention.
3. It appears on the site at the next build. No code change.

Nothing in this folder ever reaches the site by itself. The move in step 2 is
the publish action.

## Naming, once it moves to public/

- Folder name must match the `slug` exactly — it is the lookup key
- Natural filename sort; prefix `01-`, `02-` when order matters
- **First file becomes the hero** — the card image and the page's lead image
- Accepted: `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`
- Hyphens, not spaces

## Sizing

| Slot         | Width  | Height | Notes             |
|--------------|--------|--------|-------------------|
| Project hero | 1200px | 800px  | 3:2               |
| Gallery tile | 800px  | 533px  | 3:2, centred crop |

Cards render 4:3, journal cards 16:10; Next.js Image crops from centre, so a
3:2 master serves both. Full-resolution originals are fine to park here — shrink
them on the way out, not on the way in.

## Slug references

- Projects — 21 slugs, see `lib/projects.ts` (folders already scaffolded)
- Products — 9 slugs, see `lib/products.ts`
- Applications — folders already exist under `public/images/applications/`
