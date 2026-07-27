export const BLOG_CATEGORIES = ["design-engineering", "personal"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  published: boolean;
  readingTime: number;
  cover?: string;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

export function getBlogHref(category: BlogCategory, slug: string) {
  return `/blogs/${category}/${slug}`;
}
