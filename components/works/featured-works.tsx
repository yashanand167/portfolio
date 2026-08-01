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
    description: "Description 1",
    image: "/Dseide.png",
    links: ["https://dseide.com"],
  },
  {
    title: "MailGauge",
    subtitle: "Landing page design & development",
    description:
      "Landing page design and development with high fidelity motion animations.",
    image: "/Profile.png",
    links: ["https://www.google.com"],
  },
  {
    title: "AI Nutrition App",
    subtitle: "Product design",
    description: "Product design of a cross-platform mobile application.",
    image: "/Me.png",
    links: ["https://www.google.com"],
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
