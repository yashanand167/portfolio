"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";

import { getBlogHref } from "@/lib/blogs/types";
import type { BlogCategory } from "@/lib/blogs/types";
import type { BlogPostMeta } from "@/lib/blogs/types";

type BlogTitleListProps = {
  posts: BlogPostMeta[];
  category: BlogCategory;
};

export default function BlogTitleList({ posts, category }: BlogTitleListProps) {
  const filteredPosts = posts.filter((post) => post.category === category);

  if (filteredPosts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No writings in this category yet.</p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {filteredPosts.map((post) => (
        <li key={post.slug}>
          <Link
            href={getBlogHref(post.category, post.slug)}
            className="group flex items-center justify-between gap-3 py-3 transition-colors sm:gap-4 sm:py-4"
          >
            <span className="min-w-0 font-serif text-base font-medium text-foreground transition-colors group-hover:text-foreground/80 sm:text-lg">
              {post.title}
            </span>
            <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date} className="hidden sm:inline">
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
