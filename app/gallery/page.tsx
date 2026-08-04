import Artworks from "@/components/artworks";

export default function GalleryPage() {
  return (
    <>
      <section className="mt-6 sm:mt-8">
        <h1 className="page-heading">Gallery</h1>
        <p className="page-lead mt-2">
          Beyond Design and Engineering, I enjoy creating arts sometimes!
        </p>
      </section>
      <Artworks />
    </>
  );
}
