import { defineCliConfig } from "sanity/cli"

/**
 * The Sanity command line's project (14 Oct 2026): what `npx sanity exec`,
 * `npx sanity dataset import` and `npx sanity schema validate` act on, so
 * none of them needs the project id typed in. The project id is public (it
 * is in every page that shows a Studio photograph); tokens never go here.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "g4yp3p0k",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
})
