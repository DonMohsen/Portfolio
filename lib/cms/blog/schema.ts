import { z } from "zod";

const localizedFaqSchema = z.object({
  question: z.object({ en: z.string().min(1), fa: z.string().min(1) }),
  answer: z.object({ en: z.string().min(1), fa: z.string().min(1) }),
});

export const blogPostInputSchema = z.object({
  slug: z.string().min(1).max(200),
  status: z.enum(["draft", "published"]),
  category: z.enum(["tech", "personal"]),
  publishedAt: z.string().datetime().nullable().optional(),
  titleEn: z.string().min(1),
  titleFa: z.string().min(1),
  excerptEn: z.string().min(1),
  excerptFa: z.string().min(1),
  contentHtmlEn: z.string().min(1),
  contentHtmlFa: z.string().min(1),
  conclusionHtmlEn: z.string().nullable().optional(),
  conclusionHtmlFa: z.string().nullable().optional(),
  heroImage: z.union([z.string().url(), z.literal("")]).nullable().optional(),
  readTimeMinutes: z.number().int().positive().nullable().optional(),
  views: z.number().int().nonnegative().optional(),
  likes: z.number().int().nonnegative().optional(),
  faq: z.array(localizedFaqSchema).optional(),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;
