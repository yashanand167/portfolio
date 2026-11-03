import Header from "@/components/header";
import GitHubContributionsSection from "@/components/github-contributions-section";
// import TechStack from "@/components/tech-stack";
import Separator from "@/components/separator";
import ExperienceSection from "@/components/experience-section";
import ProfileAvatar from "@/components/profile-avatar";
import Footer from "@/components/footer";
import PageMain from "@/components/page-main";
import PageReveal from "@/components/page-reveal";
import ConditionalImage from "@/components/conditional-image";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <PageReveal>
          <Header />

          <section className="mt-8 w-full sm:mt-10">
            <h1 className="text-xl font-medium sm:text-2xl lg:text-3xl">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-serif font-bold">Hey, I am</span>
                <ProfileAvatar />
                <span className="font-serif font-bold">Yash Anand</span>
              </span>
            </h1>
            <div className="page-lead mt-3 max-w-2xl space-y-4 sm:text-lg">
              <p>
                I started out as a{" "}
                <span className="font-medium text-foreground">
                  Visual Designer and Digital Illustrator
                </span>
                , who eventually got curious about how <span className="font-medium text-foreground">software</span> works, and fell in love with
                building products.
              </p>

              <p>
                Now, I work at the intersection of{" "}
                <span className="font-medium text-foreground">
                  Product Design, Frontend Engineering, and AI
                </span>
                , building products end to end from raw prototype in <span className="font-medium text-foreground">Figma</span> to <span className="font-medium text-foreground">Production Code</span>
              </p>
            </div>
            {/* <TechStack /> */}
            <div className="mt-8">
              <ConditionalImage />
              <div className="flex items-center gap-3 mt-5">
                <span className="h-px flex-1 bg-border" />
                <h1 className="text-sm">Behind the Screens, Where Ideas Take Shape</h1>
                <span className="h-px flex-1 bg-border" />
              </div>
            </div>
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
          <section className="mt-8 sm:mt-10">
            <Footer />
          </section>
        </PageReveal>
      </PageMain>
    </div>
  );
}
