import type { BlogHeading } from "@/lib/blogs/types";
import { slugifyText } from "@/lib/cms/core/slug";

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function headingIdFromText(text: string, index: number): string {
  const slug = slugifyText(text);
  return slug || `section-${index + 1}`;
}

export function extractHeadingsFromHtml(
  htmlEn: string,
  htmlFa: string
): BlogHeading[] {
  const regex = /<h2([^>]*)>([\s\S]*?)<\/h2>/gi;
  const enMatches = [...htmlEn.matchAll(regex)];
  const faMatches = [...htmlFa.matchAll(regex)];

  const headings: BlogHeading[] = [];

  enMatches.forEach((match, index) => {
    const attrs = match[1] ?? "";
    const idMatch = attrs.match(/\sid=["']([^"']+)["']/i);
    const enText = stripTags(match[2]);
    const faMatch = faMatches[index];
    const faText = faMatch ? stripTags(faMatch[2]) : enText;
    const id = idMatch?.[1] ?? headingIdFromText(enText || faText, index);

    headings.push({
      id,
      text: { en: enText, fa: faText },
    });
  });

  return headings;
}
