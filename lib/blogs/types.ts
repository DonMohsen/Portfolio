export type BlogCategory = "tech" | "personal";

export type LocalizedText = { en: string; fa: string };

export type BlogFaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type BlogHeading = {
  id: string;
  text: LocalizedText;
  children?: BlogHeading[];
};

export type BlogPost = {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: BlogCategory;
  heroImage?: string;
  contentHtml?: LocalizedText;
  conclusionHtml?: LocalizedText;
  readTimeMinutes?: number;
  views?: number;
  likes?: number;
  faq?: BlogFaqItem[];
  headings?: BlogHeading[];
};

export type BlogCardItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  publishedAt: string;
  readTimeLabel: string;
  dateLabel: string;
  views: number;
  likes: number;
};

export type BlogSidebarItem = {
  slug: string;
  title: string;
  image: string;
  href: string;
  dateLabel: string;
};

export type BlogRelatedItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  dateLabel: string;
};

export type BlogListingResult = {
  posts: BlogCardItem[];
  featured: BlogCardItem | null;
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type BlogListingOptions = {
  category?: BlogCategory | "all";
  page?: number;
  sort?: "latest" | "popular";
  perPage?: number;
};
