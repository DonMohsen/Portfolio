export type BlogPost = {
  slug: string;
  publishedAt: string;
  title: { en: string; fa: string };
  excerpt: { en: string; fa: string };
  category: "tech" | "personal";
};
