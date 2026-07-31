"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
    subtitle: "A collection of my personal crafted UI components",
    description: "Description 1",
    image: "/Profile.png",
    links: ["https://www.google.com"],
  },
  {
    title: "Apple UI Exploration",
    subtitle: "Design principles in web interfaces",
    description:
      "An exploration of Apple's design principles, translated into responsive web interfaces.",
    image: "/Me.png",
    links: ["https://www.google.com"],
  },
  {
    title: "AskNow",
    subtitle: "AI-powered survey platform",
    description:
      "An AI powered survey platform for collecting user feedback and creating a survey with AI features.",
    image: "/Dseide.png",
    links: ["https://www.google.com"],
  },
  {
    title: "Systems Before Screen",
    subtitle: "Personal design handbook",
    description:
      "Crafting my own personal handbook on web on using AI in product design with importance of user research and design systems.",
    image: "/Profile.png",
    links: ["https://www.google.com"],
  },
];

function PersonalWorkCard({
  title,
  subtitle,
  description,
  image,
  links,
}: PersonalWork) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex shrink-0 flex-col pt-3 sm:pt-4">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                View project
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function PersonalWorks() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {personalWorks.map((work) => (
        <PersonalWorkCard key={work.title} {...work} />
      ))}
    </div>
  );
}
