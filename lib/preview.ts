/**
 * Edit on the page (14 Oct 2026): helpers the preview routes share.
 */

/**
 * Where "Exit preview" sends the editor back to (?to=/about). Only a plain
 * path on this site: anything else ("//evil.example", "/\\evil.example", a
 * full URL, nothing at all) goes to the home page, so the address can never
 * be used to send someone elsewhere.
 */
export function safeReturnPath(to: string | null | undefined): string {
  if (!to || !to.startsWith("/") || to.startsWith("//") || to.includes("\\")) return "/"
  try {
    const url = new URL(to, "https://placeholder.invalid")
    if (url.origin !== "https://placeholder.invalid") return "/"
    // Checked again after the URL is normalised: "/.//evil.example" comes
    // out as "//evil.example", which a browser reads as another site
    // (hubss.com had exactly this hole until 9 Oct 2026).
    const path = `${url.pathname}${url.search}${url.hash}`
    return path.startsWith("//") || path.includes("\\") ? "/" : path
  } catch {
    return "/"
  }
}
