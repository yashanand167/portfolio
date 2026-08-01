import Header from "@/components/header";
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
        <Header />

        <section className="mt-6 sm:mt-8">
          <h1 className="page-heading">My Writings</h1>
          <p className="page-lead mt-2">
            Explore my thoughts and tech talks on various topics.
          </p>

          <BlogsSection posts={posts} />
        </section>
      </PageMain>
    </div>
  );
}
