// Mirror the technical-document PDFs from squareonepaving.com into
// /public/docs/<product>/ so the site stops depending on the WP host.
// Run on a machine with network access:  node scripts/mirror-docs.mjs
// Then flip USE_LOCAL_DOCS below / swap hrefs in lib/resources.ts.
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const src = await readFile("lib/resources.ts", "utf8");
const groups = [...src.matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);
const blocks = src.split(/slug: "[a-z-]+"/).slice(1);

let ok = 0, fail = 0;
for (let i = 0; i < groups.length; i++) {
  const dir = path.join("public", "docs", groups[i]);
  await mkdir(dir, { recursive: true });
  const hrefs = [...blocks[i].matchAll(/\$\{U\}(\/[^\s`]+\.pdf)/g)].map((m) => m[1]);
  for (const rel of hrefs) {
    const url = "https://www.squareonepaving.com/wp-content/uploads" + rel;
    const file = path.join(dir, path.basename(rel));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      await writeFile(file, Buffer.from(await res.arrayBuffer()));
      ok++; console.log("ok ", file);
    } catch (e) {
      fail++; console.warn("FAIL", url, String(e));
    }
  }
}
console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
console.log("Next: update lib/resources.ts hrefs to /docs/<slug>/<file>.pdf");
