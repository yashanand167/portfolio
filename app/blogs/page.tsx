import BlogIcon from "@/components/custom-svgs/blog-icon";
import BlogsSection from "@/components/blogs-section";
import { getAllBlogs } from "@/lib/blogs";

export const metadata = {
  title: "Writings",
  description: "Essays on design, engineering, and personal notes.",
};

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-x-4 sm:gap-y-3">
          <div className="flex items-center gap-2 sm:col-start-1 sm:row-start-1">
            <BlogIcon />
            <h1 className="font-serif text-2xl font-medium sm:text-3xl">
              My Writings
            </h1>
          </div>

          <p className="text-muted-foreground sm:col-start-1 sm:row-start-2">
            Explore my thoughts and tech talks on various topics.
          </p>

          <BlogsSection posts={posts} />
        </div>
        
      </main>
    </div>
  );
}
