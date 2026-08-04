import FeaturedWorks from "@/components/works/featured-works";
import PersonalWorks from "@/components/works/personal-works";
import Separator from "@/components/separator";

export default function WorksPage() {
  return (
    <>
      <section className="mt-6 sm:mt-8">
        <h1 className="page-heading">Featured Works</h1>
        <p className="page-lead mt-2">
          Projects I have collaborated on so far
        </p>
        <FeaturedWorks />
        <Separator />
      </section>

      <section>
        <h2 className="page-subheading">Some of my Side Projects</h2>
        <p className="page-lead mt-2">
          Projects I have worked and been working on in my free time
        </p>
        <PersonalWorks />
        <Separator />
      </section>
    </>
  );
}
