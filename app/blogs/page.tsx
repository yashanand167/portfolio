import Link from "next/link";

import BlogIcon from "@/components/custom-svgs/blog-icon";
import BlogsSection from "@/components/blogs-section";
import PageMain from "@/components/page-main";
import { getAllBlogs } from "@/lib/blogs";

export const metadata = {
  title: "Writings",
  description: "Essays on design, engineering, and personal notes.",
};

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain size="lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
        >
          ← Back to home
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-y-4 sm:mt-8 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-x-4 sm:gap-y-3">
          <div className="flex items-center gap-2 sm:col-start-1 sm:row-start-1">
            <BlogIcon />
            <h1 className="page-heading">My Writings</h1>
          </div>

          <p className="page-lead sm:col-start-1 sm:row-start-2">
            Explore my thoughts and tech talks on various topics.
          </p>

          <BlogsSection posts={posts} />
        </div>
      </PageMain>
    </div>
  );
}
