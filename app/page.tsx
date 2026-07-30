import Header from "@/components/header";
import GitHubContributionsSection from "@/components/github-contributions-section";
import TechStack from "@/components/tech-stack";
import Image from "next/image";
import Separator from "@/components/separator";
import ExperienceSection from "@/components/experience-section";
import ProfileAvatar from "@/components/profile-avatar";
import SocialLinks from "@/components/social-links";
import TestimonialSection from "@/components/testimonal-section";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-16 sm:px-6 lg:px-8">
        <Header />

        <section className="mt-10 w-full">
          <h1 className="text-2xl font-medium sm:text-2xl lg:text-3xl">
            <span className="inline-flex items-center gap-2">
              <span className="font-serif font-bold">Hey, I am</span>
              <ProfileAvatar />
              <span className="font-serif font-bold">Yash Anand</span>
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A design-focused software engineer building rich and sleek web
            applications with modern technologies and minimalistic design.
          </p>
          <TechStack />
          <Separator />
          <SocialLinks />
          <Separator />
          <div className="mt-8 w-full overflow-x-auto">
            <GitHubContributionsSection />
          </div>
          <Separator />
        </section>
        <section>
          <ExperienceSection />
          <Separator />
        </section>
        <section>
          <TestimonialSection />
        </section>
      </main>
    </div>
  );
}
