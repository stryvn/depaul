import { marked } from "marked";

export async function renderMarkdown(markdown: string): Promise<string> {
  if (!markdown) return "";
  const html = await marked.parse(markdown, {
    gfm: true,
    breaks: true,
  });
  return html;
}
