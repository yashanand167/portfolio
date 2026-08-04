import Inspirations from "@/components/inspirations";
import Footer from "@/components/footer";
import Separator from "@/components/separator";

export default function InspirationsPage() {
  return (
    <>
      <section className="mt-6 sm:mt-8">
        <p className="page-lead">
          The designers, engineers, and builders whose work has shaped the way
          I think, create, and build.
        </p>
        <p className="mt-2 text-sm text-foreground sm:text-base">
          The list shall go on forever
        </p>
      </section>

      <Inspirations />
      <section className="mt-8 sm:mt-10">
        <Separator />
        <Footer />
      </section>
    </>
  );
}
