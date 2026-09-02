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
    title: "kylp",
    subtitle: "Keyboard practice playground",
    description:
      "A keyboard practice playground where I crafted the UI keyboard from scratch using a context provider.",
    image: "/kylp.png",
    links: ["https://kylp-mu.vercel.app/"],
  },
  {
    title: "Personal Lab",
    subtitle: "Experimental",
    description: "A collection of my personal crafted UI components",
    image: "/Logo.png",
    links: ["https://lab.yashanand.com"],
  },
  {
    title: "Apple UI Exploration",
    subtitle: "Yet to deploy · Design principles in web interfaces",
    description:
      "An exploration of Apple's design principles, translated into responsive web interfaces.",
    image: "/Apple.png",
    links: ["https://github.com/yashanand167/apple-ui-study"],
  },
  {
    title: "AskNow",
    subtitle: "AI-powered survey platform",
    description:
      "An AI powered survey platform for collecting user feedback and creating a survey with AI features.",
    image: "/AskNow.png",
    links: ["https://asknow.vercel.app/"],
  },
  {
    title: "Systems Before Screen",
    subtitle: "Yet to deploy · Personal design handbook",
    description:
      "Crafting my own personal handbook on web on using AI in product design with importance of user research and design systems.",
    image: "/Handbook.png",
    links: ["https://github.com/yashanand167/System-before-screens"],
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
