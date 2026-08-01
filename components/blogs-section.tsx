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
      <div className="mt-4 flex justify-center sm:mt-6">
        <BlogCategoryTabs onChange={setActiveCategory} />
      </div>

      <div className="mt-6">
        <BlogTitleList posts={posts} category={activeCategory} />
      </div>
    </>
  );
}
