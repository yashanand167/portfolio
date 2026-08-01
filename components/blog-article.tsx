import { format } from "date-fns";

import BlogPostContent from "@/components/blog-post-content";
import Signature from "@/components/custom-svgs/signature";
import type { BlogPost } from "@/lib/blogs/types";

type BlogArticleProps = {
  post: BlogPost;
};

export default function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
        <time dateTime={post.date}>
          {format(new Date(post.date), "MMMM d, yyyy")}
        </time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 font-serif text-2xl font-medium sm:text-3xl lg:text-4xl">
        {post.title}
      </h1>
      <p className="page-lead mt-3 sm:text-lg">
        {post.description}
      </p>

      <div className="mt-8 border-t border-border pt-8 sm:mt-10 sm:pt-10">
        <BlogPostContent content={post.content} />
      </div>

      {post.category === "personal" ? (
        <footer className="mt-12 flex flex-col items-start gap-2 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">Written by Yash Anand</p>
          <Signature />
        </footer>
      ) : null}
    </article>
  );
}
