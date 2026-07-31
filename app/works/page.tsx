import Link from "next/link";

import Header from "@/components/header";
import FeaturedWorks from "@/components/works/featured-works";
import PersonalWorks from "@/components/works/personal-works";

export default function WorksPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-16 sm:px-6 lg:px-8">
        <Header />

        <section className="mt-8">
          <h1 className="font-serif text-2xl font-medium sm:text-3xl">
            Featured Works
          </h1>
          <p className="mt-2 text-muted-foreground">
            Projects I have collaborated on so far
          </p>
          <FeaturedWorks />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-medium font-serif">
            Some of my Side Projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            Projects I have worked and been working on in my free time
          </p>
          <PersonalWorks />
        </section>
      </main>
    </div>
  );
}