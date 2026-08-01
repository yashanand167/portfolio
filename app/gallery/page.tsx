import Artworks from "@/components/artworks";
import Header from "@/components/header";
import PageMain from "@/components/page-main";

export const metadata = {
  title: "Gallery",
  description: "A collection of visual snapshots and design explorations.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Header />

        <section className="mt-6 sm:mt-8">
          <h1 className="page-heading">Gallery</h1>
          <p className="page-lead mt-2">
            Beyond Design and Engineering, I enjoy creating arts
          </p>
        </section>
        <Artworks />
      </PageMain>
    </div>
  );
}


