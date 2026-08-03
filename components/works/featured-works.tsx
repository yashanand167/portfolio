"use client";

import WorkRowCard from "@/components/works/work-row-card";

type FeaturedWork = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  links: string[];
};

const featuredWorks: FeaturedWork[] = [
  {
    title: "Dseide",
    subtitle: "Cross platform development and product design",
    description: "Contributed Heavily in the app design part and cross platform development in React Native.",
    image: "/Dseide.png",
    links: ["/blogs/design-engineering/shipping-dseide-healthcare-network"],
  },
  {
    title: "MailGauge",
    subtitle: "Landing page design & development",
    description:
      "Landing page design and development with high fidelity motion animations.",
    image: "/MailGauge.png",
    links: ["https://get.mailgauge.app/"],
  },
  {
    title: "AI Nutrition App",
    subtitle: "Product design",
    description: "Product design of a cross-platform mobile application.",
    image: "/Nutrition.png",
    links: ["/blogs/design-engineering/ai-nutrition-app-startup-playbook"],
  },
];

export default function FeaturedWorks() {
  return (
    <div className="mt-6 flex flex-col gap-5 sm:gap-8">
      {featuredWorks.map((work) => (
        <WorkRowCard
          key={work.title}
          title={work.title}
          subtitle={work.subtitle}
          description={work.description}
          image={work.image}
          link={work.links[0]}
        />
      ))}
    </div>
  );
}
