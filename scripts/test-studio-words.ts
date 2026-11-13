/**
 * `npm run test:studio` (with test-studio.ts): the Studio says what happens in
 * plain words, and its panels never stand in the office's way (12 Nov 2026,
 * as hubss.com's scripts/test-studio-words.ts). No network.
 *
 * - The Job photos card: every state's words, and the list's line.
 * - A blog post's line in the Blog posts list.
 * - No machinery in anything the Studio shows: every string and piece of
 *   text in its own code (sanity/, sanity.config.ts) and the guide.
 * - The panels draw from plain values (each state renders without a
 *   signed-in Studio), and a panel that fails gives way to the form.
 */
import "./test-env"
import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { createElement, type ReactElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { ThemeProvider, studioTheme } from "@sanity/ui"
import ts from "typescript"
import { JOB_CARD_TITLE, OPEN_THE_ARTICLE, jobPhotosLine, jobPhotosListLine, type JobState } from "../sanity/job-photos-line"
import { postListLine, shortWhen } from "../sanity/post-line"
import { JobPhotosCardView } from "../sanity/components/JobPhotosInput"
import { fieldPost } from "../sanity/schemaTypes/fieldPost"
import { EditOnThePageCardView, editOnThePageWords } from "../sanity/components/EditOnThePage"
import QuietBoundary from "../sanity/components/QuietBoundary"
import { GUIDE_SOURCE, guideText, guideFor } from "../lib/office-guide"
import { lintCopy } from "../lib/automation/style"

let failures = 0
function check(name: string, fn: () => void) {
  try {
    fn()
    console.log(`  ok    ${name}`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name}\n        ${err instanceof Error ? err.message : err}`)
  }
}

/**
 * Words that tell the office how the work is done (hubss.com's list). "By
 * itself" stays allowed here: "Goes live by itself" is Square One's own name
 * for its schedule (Vern, 22 Oct 2026).
 */
const MACHINERY: [RegExp, string][] = [
  [/\bAI\b/, "AI"],
  [/\bClaude\b/i, "Claude"],
  [/\bAnthropic\b/i, "Anthropic"],
  [/\bdrafters?\b/i, "the drafter"],
  [/\bplanner\b/i, "the planner"],
  [/\bautomat(ed|ion|ic)\b/i, "automation"],
  [/\b(LLM|GPT|chatbot|robot)s?\b/i, "a machine"],
  [/\b(cron|webhook|pipeline)s?\b/i, "the plumbing"],
]
const named = (text: string) => MACHINERY.filter(([re]) => re.test(text)).map(([, what]) => what)

const job = (over: Partial<JobState>): JobState => ({ published: false, story: false, hasArticle: false, article: null, ...over })
const WHEN = "on Monday 16 November at 9:00 a.m."
const STATES: [string, JobState][] = [
  ["new, no story", job({})],
  ["published, no story", job({ published: true })],
  ["new, with the story", job({ story: true })],
  ["published, being written up", job({ published: true, story: true })],
  ["no article could be written", job({ published: true, story: true, gaveUp: true })],
  ["written up, waiting for Publish", job({ published: true, story: true, hasArticle: true, article: { title: "A crosswalk in Langley", live: false, draft: true } })],
  ["written up, going live by itself", job({ published: true, story: true, hasArticle: true, article: { title: "A crosswalk in Langley", live: false, draft: true, when: WHEN } })],
  ["written up, live", job({ published: true, story: true, hasArticle: true, article: { title: "A crosswalk in Langley", live: true, draft: false } })],
  ["written up, the article deleted", job({ published: true, story: true, hasArticle: true, article: { live: false, draft: false } })],
  ["written up, the article couldn't be read", job({ published: true, story: true, hasArticle: true, article: null })],
]

function main() {
  console.log("The Job photos card")

  check("every state has its own words, in the house style, with no machinery and nothing in square brackets", () => {
    const lines = STATES.map(([, s]) => jobPhotosLine(s))
    assert.equal(new Set(lines).size, lines.length, "two states read the same")
    for (const [name, s] of STATES) {
      const line = jobPhotosLine(s)
      assert.deepEqual(named(line), [], `${name}: ${line}`)
      assert.deepEqual(lintCopy(line).map((i) => i.message), [], `${name}: ${line}`)
      assert.ok(!/[[\]{}]|undefined|null/.test(line), `${name}: ${line}`)
      assert.ok(!/\.\./.test(line), `${name}: two full stops: ${line}`)
    }
  })

  check("no story: its photos go to social and wait in Buffer for approval; the story is the way to an article", () => {
    for (const s of [job({}), job({ published: true })]) {
      const line = jobPhotosLine(s)
      assert.match(line, /social/)
      assert.match(line, /wait in Buffer for your approval/)
      assert.match(line, /fill in the story below/)
    }
    assert.match(jobPhotosLine(job({})), /^Publish it/)
    assert.match(jobPhotosLine(job({ published: true })), /as well/, "published: its posts already went, so an article comes as well, not instead")
  })

  check("a story: written up as an article that waits for Publish, social once it is live, the photos make no posts of their own", () => {
    const before = jobPhotosLine(job({ story: true }))
    assert.match(before, /project article/)
    assert.match(before, /waits in Blog posts until you press Publish/)
    assert.match(before, /make no posts of their own/)
    const after = jobPhotosLine(job({ published: true, story: true }))
    assert.match(after, /is being written up/)
    assert.match(after, /email/)
  })

  check("written up: the article's title, and where it stands (waiting, a time, live, gone), never a guess when it couldn't be read", () => {
    const at = (i: number) => jobPhotosLine(STATES[i][1])
    assert.match(at(5), /"A crosswalk in Langley"\. It waits in Blog posts for you to read it and press Publish/)
    assert.match(at(6), new RegExp(`goes live by itself ${WHEN}`))
    assert.match(at(7), /which is on the site/)
    assert.match(at(8), /no longer in Blog posts/)
    assert.match(at(9), /Open it from "The article written from this" below/)
    assert.doesNotMatch(at(9), /no longer/, "a dropped connection is not a deleted article")
  })

  check("the list's line says the same in three words", () => {
    assert.equal(jobPhotosListLine({ story: false, hasArticle: false }), "Photos for social")
    assert.equal(jobPhotosListLine({ story: true, hasArticle: false }), "Story in: to be written up")
    assert.equal(jobPhotosListLine({ story: true, hasArticle: true }), "Written up as an article")
    assert.equal(jobPhotosListLine({ story: false, hasArticle: true }), "Written up as an article")
  })

  check("the Job photos list's line: its date, then the three words", () => {
    const { prepare } = (fieldPost as unknown as { preview: { prepare: (v: Record<string, unknown>) => { subtitle?: string } } }).preview
    const line = (v: Record<string, unknown>) => prepare(v).subtitle
    assert.equal(line({ date: "2026-11-12" }), "2026-11-12 · Photos for social")
    assert.equal(line({ date: "2026-11-12", writeUp: "  " }), "2026-11-12 · Photos for social", "a blank story is no story")
    assert.equal(line({ date: "2026-11-12", writeUp: "The crossing at 200 St." }), "2026-11-12 · Story in: to be written up")
    assert.equal(line({ writeUp: "The crossing.", article: "post-1" }), "Written up as an article")
  })

  console.log("\nThe Blog posts list")

  check("a post's line: its date, then when a draft goes live by itself, the pin and an article from Job photos", () => {
    assert.equal(postListLine({ date: "2026-11-12" }), "2026-11-12")
    assert.equal(postListLine({ date: "2026-11-12", pinned: true, fromJob: "fieldPost-1" }), "2026-11-12 · pinned · from Job photos")
    const scheduled = postListLine({ date: "2026-11-12", scheduled: true, scheduledFor: "2026-11-13T17:00:00Z" })
    assert.match(scheduled, /^2026-11-12 · goes live by itself Fri 13 Nov, 10:00 a\.?m\.?$/i, scheduled)
    assert.equal(postListLine({ date: "2026-11-12", scheduled: false, scheduledFor: "2026-11-13T17:00:00Z" }), "2026-11-12", "switched off: no time")
    assert.equal(postListLine({ date: "2026-11-12", scheduled: true, scheduledFor: "soon" }), "2026-11-12", "no time it can read: none shown")
    assert.equal(postListLine({}), "")
  })

  check("its time is Vancouver's, which keeps UTC-7 from 1 November 2026", () => {
    assert.match(shortWhen("2026-11-20T16:30:00Z") ?? "", /^Fri 20 Nov, 9:30 a\.?m\.?$/i)
    assert.equal(shortWhen("not a date"), undefined)
  })

  console.log("\nNo machinery in what the Studio shows")

  check("every string and piece of text in the Studio's own code names no machinery", () => {
    const root = process.cwd()
    const files = [...walk(path.join(root, "sanity")), path.join(root, "sanity.config.ts")]
    const found: string[] = []
    for (const file of files) {
      for (const text of shownText(file)) {
        const words = named(text)
        if (words.length) found.push(`${path.relative(root, file)}: ${words.join(", ")}: ${text.slice(0, 90)}`)
      }
    }
    assert.deepEqual(found, [], `\n${found.join("\n")}`)
  })

  check("the guide, with the add-ons off and on, names no machinery", () => {
    for (const addons of [false, true]) {
      const g = guideFor(addons)
      for (const line of [g.lead, g.foot, ...guideText(g)]) assert.deepEqual(named(line), [], line)
    }
  })

  check("the guide tells where the card is and what it says, by the card's own words", () => {
    const step = GUIDE_SOURCE.steps.find((s) => s.id === "job-photos")
    const lines = (step?.next ?? []).map((l) => (typeof l === "string" ? l : l.text)).join(" ")
    assert.ok(lines.includes(`**${JOB_CARD_TITLE}**`), "names the card")
    assert.ok(lines.includes(`**${OPEN_THE_ARTICLE}**`), "names its button")
  })

  console.log("\nThe panels never stand in the way")

  check("each state of the Job photos card draws from plain values, light and dark", () => {
    for (const scheme of ["light", "dark"] as const) {
      for (const [name, s] of STATES) {
        const html = render(createElement(JobPhotosCardView, { line: jobPhotosLine(s) }), scheme)
        assert.ok(html.includes(JOB_CARD_TITLE), `${scheme} ${name}`)
        assert.ok(html.includes(escapeHtml(jobPhotosLine(s))), `${scheme} ${name}: the line`)
      }
    }
  })

  check("written up, the card opens the article, and a live one's page on the site; nothing to open before then", () => {
    const both = render(createElement(JobPhotosCardView, { line: "x", open: { href: "/studio/intent/edit/id=post-1;type=post/" }, site: "/blog/a-crosswalk" }), "light")
    assert.match(both, /href="\/studio\/intent\/edit\/id=post-1;type=post\/"[\s\S]*Open the article/)
    assert.match(both, /href="\/blog\/a-crosswalk"[^>]*target="_blank"[\s\S]*See it on the site/)
    const none = render(createElement(JobPhotosCardView, { line: "x" }), "dark")
    assert.doesNotMatch(none, /Open the article|See it on the site/)
  })

  check("the Edit on the page card draws from plain values: a link to open, or the button switched off until there's a page", () => {
    const ready = render(createElement(EditOnThePageCardView, { words: editOnThePageWords("post", true), link: { href: "/studio/presentation?preview=%2Fblog%2Fa" } }), "light")
    assert.match(ready, /<a [^>]*href="\/studio\/presentation\?preview=%2Fblog%2Fa"/)
    const waiting = render(createElement(EditOnThePageCardView, { words: editOnThePageWords("post", false) }), "dark")
    assert.match(waiting, /<button[^>]*disabled/)
    assert.match(waiting, /Press Generate under Web address/)
  })

  check("a panel that fails gives way to its fallback (nothing, or a plain line) and the form carries on", () => {
    const quiet = new QuietBoundary({ name: "test", children: null, fallback: "the fallback" })
    assert.deepEqual(QuietBoundary.getDerivedStateFromError(), { failed: true })
    quiet.state = { failed: true }
    assert.equal(quiet.render(), "the fallback")
    const silent = new QuietBoundary({ name: "test", children: "the panel" })
    assert.equal(silent.render(), "the panel")
    silent.state = { failed: true }
    assert.equal(silent.render(), null)
  })

  check("every panel of ours sits inside a QuietBoundary, with Sanity's own fields outside it", () => {
    const read = (f: string) => readFileSync(path.join(process.cwd(), f), "utf8")
    for (const f of ["sanity/components/JobPhotosInput.tsx", "sanity/components/EditOnThePage.tsx"]) {
      const src = read(f)
      assert.match(src, /<QuietBoundary name="[^"]+">[\s\S]*?<\/QuietBoundary>\s*\{props\.renderDefault\(props\)\}/, f)
    }
    assert.match(read("sanity/components/GuidePane.tsx"), /<QuietBoundary[\s\S]*fallback=[\s\S]*<OfficeGuide compact \/>[\s\S]*<\/QuietBoundary>/)
  })

  console.log(failures ? `\n${failures} failed` : "\nall passed")
  process.exit(failures ? 1 : 0)
}

/** As React writes text into HTML. */
const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")

function render(el: ReactElement, scheme: "light" | "dark"): string {
  return renderToStaticMarkup(createElement(ThemeProvider, { theme: studioTheme, scheme }, el))
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name)
    if (statSync(p).isDirectory()) return walk(p)
    return /\.(ts|tsx)$/.test(name) ? [p] : []
  })
}

/** The strings and JSX text in a file, never its imports or comments. */
function shownText(file: string): string[] {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const out: string[] = []
  const visit = (node: ts.Node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) out.push(node.text)
    else if (ts.isTemplateExpression(node)) out.push([node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join(" "))
    else if (ts.isJsxText(node) && node.text.trim()) out.push(node.text.trim())
    // A GROQ query or a console line isn't shown; nor is an import path or an id.
    if (ts.isCallExpression(node) && /^(console\.\w+|client\.fetch|require)$/.test(node.expression.getText(source).replace(/\s+/g, ""))) return
    if (ts.isTaggedTemplateExpression(node)) return
    ts.forEachChild(node, visit)
  }
  visit(source)
  // Paths and ids (lib/automation/plan, sanity/..., an_id) aren't words anyone reads.
  return out.filter((t) => !/^[./@]|^[\w-]+(\/[\w.-]+)+$/.test(t))
}

main()
