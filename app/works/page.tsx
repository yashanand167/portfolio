import FeaturedWorks from "@/components/works/featured-works";

export default function WorksPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <h1 className="font-serif text-2xl font-medium sm:text-3xl">
            Featured Works
          </h1>
          <p className="mt-2 text-muted-foreground">
            Projects I have collaborated on so far
          </p>
          <FeaturedWorks />
        </section>

        <section>
          <h2 className="text-xl font-medium font-serif">Some of my Side Projects</h2>
          <p>Projects I have worked and been working on in my free time</p>
        </section>

        <section>
          <h2 className="text-xl font-medium font-serif">Backend Explorations</h2>
          <p>Experiments with backend technologies and APIs</p>
        </section>
      </main>
      
    </div>
  );
}