# /public/images/projects

Project photography. **One folder per project, named after its `slug` in
`lib/projects.ts`.** All 21 folders already exist — just drop files in.

```
public/images/projects/ubc-musqueam-crosswalk/01-hero.jpg
public/images/projects/ubc-musqueam-crosswalk/02-detail.jpg
```

`lib/gallery.ts` reads these at build time, so adding a photo is a file drop —
no code change, no rebuild of any data file.

## Rules that actually matter

- **Folder name must match the slug exactly.** It is the lookup key.
- **Order is natural filename sort.** Prefix `01-`, `02-`, `03-` when sequence
  matters, otherwise `detail.jpg` sorts before `hero.jpg`.
- **The first file is the hero** — it becomes the card image on `/projects` and
  the lead image on the project page.
- **Accepted:** `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`. Everything else,
  including `.gitkeep`, `README.md` and dotfiles, is ignored.
- **Avoid spaces in filenames.** They work but need URL-encoding; hyphens are
  safer.
- **Empty folders are fine.** With no images the page falls back to
  `project.imageUrl` from `lib/projects.ts` — exactly the current behaviour. Fill
  them at whatever pace suits.

## Dimensions

| Slot         | Width  | Height | Notes             |
|--------------|--------|--------|-------------------|
| Project hero | 1200px | 800px  | 3:2               |
| Gallery tile | 800px  | 533px  | 3:2, centred crop |

Cards render 4:3 and journal cards 16:10; Next.js Image crops from the centre,
so a 3:2 master works for both.

## Shot guidance

- Finished surface from the best angle, aerial preferred
- Enough context to read the location type (intersection, plaza, greenway)
- Before/after pairs are excellent — `01-before.jpg` / `02-after.jpg`
- Avoid construction-in-progress as the first file, since it becomes the hero

## Sibling folders

`public/images/products/<slug>/` and `public/images/applications/<slug>/` follow
the identical convention and are already populated. Product slugs come from
`lib/products.ts`.
