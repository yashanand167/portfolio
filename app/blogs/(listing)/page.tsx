import BlogsSection from "@/components/blogs-section";
import { getAllBlogs } from "@/lib/blogs";

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <section className="mt-6 sm:mt-8">
      <h1 className="page-heading">My Writings</h1>
      <p className="page-lead mt-2">
        Explore my thoughts and tech talks on various topics.
      </p>

      <BlogsSection posts={posts} />
    </section>
  );
}
