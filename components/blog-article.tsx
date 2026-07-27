import { format } from "date-fns";

import BlogPostContent from "@/components/blog-post-content";
import type { BlogPost } from "@/lib/blogs/types";

type BlogArticleProps = {
  post: BlogPost;
};

export default function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={post.date}>
          {format(new Date(post.date), "MMMM d, yyyy")}
        </time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      <div className="mt-10 border-t border-border pt-10">
        <BlogPostContent content={post.content} />
      </div>
    </article>
  );
}
