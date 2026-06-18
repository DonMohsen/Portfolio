import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "a",
  "img",
  "blockquote",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "span",
  "div",
  "figure",
  "figcaption",
];

export function sanitizeBlogHtml(html: string): string {
  if (!html?.trim()) return "";

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "id",
      "class",
      "target",
      "rel",
      "width",
      "height",
      "colspan",
      "rowspan",
    ],
    ALLOW_DATA_ATTR: false,
  });
}
