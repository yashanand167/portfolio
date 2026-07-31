import Link from "next/link";
import Inspirations from "@/components/inspirations";
import Header from "@/components/header";

export default function InspirationsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-16 sm:px-6 lg:px-8">
        <Header />

        <section className="mt-8">
          <p className="mt-2 text-muted-foreground">
            The designers, engineers, and builders whose work has shaped the way
            I think, create, and build.
          </p>
          <p>The list shall go on forever</p>
        </section>

        <Inspirations />
      </main>
    </div>
  );
}
