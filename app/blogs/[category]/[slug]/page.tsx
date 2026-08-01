import Link from "next/link";
import { notFound } from "next/navigation";

import BlogArticle from "@/components/blog-article";
import PageMain from "@/components/page-main";
import { getAllBlogParams, getBlogBySlug } from "@/lib/blogs";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blogs/types";

type BlogPostPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

function isBlogCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory);
}

export async function generateStaticParams() {
  return getAllBlogParams();
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  if (!isBlogCategory(category)) {
    return { title: "Post not found" };
  }

  const post = getBlogBySlug(category, slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  if (!isBlogCategory(category)) {
    notFound();
  }

  const post = getBlogBySlug(category, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
        >
          ← Back to writings
        </Link>

        <div className="mt-6 sm:mt-8">
          <BlogArticle post={post} />
        </div>
      </PageMain>
    </div>
  );
}
