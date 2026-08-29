#!/usr/bin/env node
/**
 * scripts/warm.mjs — post-deploy cache warmer (Rockstar Pass Part 4).
 *
 * The "broken images" outsiders reported were cold next/image transforms:
 * the first request per rendition renders slowly at the edge, every
 * request after is cached. This script pays that cost right after a
 * deploy so no visitor ever does.
 *
 *   npm run warm -- --base=https://square-one-git-s1-v2-prep-2-based-agency.vercel.app
 *
 * What it does:
 *   1. Fetches /sitemap.xml and GETs every route in it (HTML cache + the
 *      priority hero image each page preloads).
 *   2. Extracts every /images/... src from each page's HTML and requests
 *      the /_next/image rendition at the widths the layouts actually use
 *      (640 / 1080 / 1920), q75 — Next's default quality.
 *
 * Read-only against the site; safe to run repeatedly.
 */

const args = process.argv.slice(2);
const val = (k) => (args.find((a) => a.startsWith(`--${k}=`)) || "").split("=").slice(1).join("=");
const BASE = (val("base") || "").replace(/\/$/, "");
const WIDTHS = (val("widths") || "640,1080,1920").split(",").map(Number);
const CONCURRENCY = Number(val("concurrency") || 8);

if (!BASE) {
  console.error("\n  usage: npm run warm -- --base=https://<deployment-url>\n");
  process.exit(1);
}

const get = async (url) => {
  const t0 = Date.now();
  try {
    const res = await fetch(url, { redirect: "follow" });
    await res.arrayBuffer();
    return { url, status: res.status, ms: Date.now() - t0 };
  } catch (e) {
    return { url, status: "ERR", ms: Date.now() - t0, err: e.message };
  }
};

const pool = async (items, worker) => {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) {
        const item = items[i++];
        results.push(await worker(item));
      }
    }),
  );
  return results;
};

// 1 ── routes from the sitemap
const sm = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
const routes = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((p, idx, arr) => arr.indexOf(p) === idx);
console.log(`\n  base   : ${BASE}`);
console.log(`  routes : ${routes.length} from sitemap.xml\n`);

const imageSrcs = new Set();
const pageResults = await pool(routes, async (route) => {
  const r = await get(`${BASE}${route}`);
  if (r.status === 200) {
    try {
      const html = await fetch(`${BASE}${route}`).then((x) => x.text());
      for (const m of html.matchAll(/\/images\/[^"'\\ ?]+\.(?:jpe?g|png|webp|avif)/g)) {
        imageSrcs.add(m[0]);
      }
    } catch {}
  }
  const slow = r.ms > 1500 ? "  SLOW" : "";
  console.log(`  ${String(r.status).padEnd(4)} ${String(r.ms).padStart(5)}ms  ${route}${slow}`);
  return r;
});

// 2 ── image renditions
const renditions = [];
for (const src of imageSrcs) {
  for (const w of WIDTHS) {
    renditions.push(`${BASE}/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`);
  }
}
console.log(`\n  images : ${imageSrcs.size} sources -> ${renditions.length} renditions @ ${WIDTHS.join("/")}\n`);

let warmed = 0, failed = 0;
await pool(renditions, async (url) => {
  const r = await get(url);
  if (r.status === 200) warmed++;
  else failed++;
  return r;
});

const bad = pageResults.filter((r) => r.status !== 200);
console.log(`\n  pages ${routes.length - bad.length}/${routes.length} ok   renditions ${warmed} warmed, ${failed} failed\n`);
if (bad.length) {
  for (const b of bad) console.log(`  NOT-200  ${b.status}  ${b.url}`);
  process.exitCode = 1;
}
