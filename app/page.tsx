import Header from "@/components/header";
import GitHubContributionsSection from "@/components/github-contributions-section";
import TechStack from "@/components/tech-stack";
import Separator from "@/components/separator";
import ExperienceSection from "@/components/experience-section";
import ProfileAvatar from "@/components/profile-avatar";
import SocialLinks from "@/components/social-links";
import TestimonialSection from "@/components/testimonal-section";
import Footer from "@/components/footer";
import PageMain from "@/components/page-main";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Header />

        <section className="mt-8 w-full sm:mt-10">
          <h1 className="text-xl font-medium sm:text-2xl lg:text-3xl">
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-serif font-bold">Hey, I am</span>
              <ProfileAvatar />
              <span className="font-serif font-bold">Yash Anand</span>
            </span>
          </h1>
          <p className="page-lead mt-3 max-w-2xl sm:text-lg">
            Design engineer building rich and sleek web
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
        <section className="mt-8 sm:mt-10">
          <Footer />
        </section>
      </PageMain>
    </div>
  );
}
