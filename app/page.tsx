import Header from "@/components/header";
import TechStack from "@/components/tech-stack";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen text-black">
      <main className="mx-auto flex w-full max-w-4xl flex-col px-4 py-16 sm:px-6 lg:px-8">
        <Header />

        <section className="mt-10 w-full">
        <h1 className="text-2xl font-medium sm:text-3xl lg:text-4xl">

<span className="inline-flex items-center gap-2">

  <span>Hi, I am</span>
  <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow shadow-neutral-300">
    <Image
      src="/Profile.png"
      alt="Profile"
      width={56}
      height={56}
      className="h-full w-full object-cover"
    />
  </span>
  <span>Yash Anand</span>
</span>
</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            A design-focused software engineer building rich and sleek web
            applications with modern technologies and minimalistic design.
          </p>
          <TechStack />
        </section>
      </main>
    </div>
  );
}
