"use client";

import { useState } from "react";

import BlogCategoryTabs, {
  type BlogCategoryTab,
} from "@/components/blog-category-tabs";
import BlogTitleList from "@/components/blog-title-list";
import type { BlogPostMeta } from "@/lib/blogs/types";

type BlogsSectionProps = {
  posts: BlogPostMeta[];
};

export default function BlogsSection({ posts }: BlogsSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategoryTab>("design-engineering");

  return (
    <>
      <div className="flex justify-center sm:col-start-2 sm:row-start-1 sm:row-span-2 sm:justify-end sm:self-start">
        <BlogCategoryTabs onChange={setActiveCategory} />
      </div>

      <div className="mt-6 sm:col-span-2">
        <BlogTitleList posts={posts} category={activeCategory} />
      </div>
    </>
  );
}
