"use client";

import WorkRowCard from "@/components/works/work-row-card";

type PersonalWork = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  links: string[];
};

const personalWorks: PersonalWork[] = [
  {
    title: "Personal Lab",
    subtitle: "Experimental",
    description: "A collection of my personal crafted UI components",
    image: "/Logo.png",
    links: ["https://www.google.com"],
  },
  {
    title: "Apple UI Exploration",
    subtitle: "Design principles in web interfaces",
    description:
      "An exploration of Apple's design principles, translated into responsive web interfaces.",
    image: "/Apple.png",
    links: ["https://www.google.com"],
  },
  {
    title: "AskNow",
    subtitle: "AI-powered survey platform",
    description:
      "An AI powered survey platform for collecting user feedback and creating a survey with AI features.",
    image: "/AskNow.png",
    links: ["https://www.google.com"],
  },
  {
    title: "Systems Before Screen",
    subtitle: "Personal design handbook",
    description:
      "Crafting my own personal handbook on web on using AI in product design with importance of user research and design systems.",
    image: "/Handbook.png",
    links: ["https://www.google.com"],
  },
];

export default function PersonalWorks() {
  return (
    <div className="mt-6 flex flex-col gap-5 sm:gap-8">
      {personalWorks.map((work) => (
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
