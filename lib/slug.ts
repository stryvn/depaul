/**
 * Generate a URL-safe slug from a title.
 * Lowercases, replaces non-alphanumeric chars with hyphens,
 * trims leading/trailing hyphens, collapses runs, and limits to 80 chars.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
