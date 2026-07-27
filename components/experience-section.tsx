"use client";

import { useState } from "react";
import Image from "next/image";

import ExperienceIcon from "./custom-svgs/experience-icon";
import { cn } from "@/lib/utils";

type ExperiencePart = {
  title: string;
  description: string;
  focus: string[];
  stack: string[];
};

const COMPANY_1_PARTS: ExperiencePart[] = [
  {
    title: "Product design systems",
    description:
      "Led product design for core product surfaces, defining flows, visual hierarchy, and interaction patterns that scaled across web and mobile.",
    focus: ["Product Design", "UI/UX", "Design Systems"],
    stack: ["Figma", "Framer"],
  },
  {
    title: "Frontend architecture",
    description:
      "Built and maintained frontend architecture for customer-facing apps, focusing on reusable components, performance, and clean state management.",
    focus: ["Frontend Development", "Architecture"],
    stack: ["React", "TypeScript", "Next.js"],
  },
  {
    title: "Cross-platform product delivery",
    description:
      "Shipped shared product experiences across web and mobile, aligning design intent with native-feeling interactions on both platforms.",
    focus: ["Product Design", "Frontend Development"],
    stack: ["React Native", "React", "Figma"],
  },
  {
    title: "Interaction and motion design",
    description:
      "Designed and implemented micro-interactions and motion patterns that made dense product flows feel clearer and more intentional.",
    focus: ["Product Design", "Frontend Development"],
    stack: ["Framer", "React", "Figma"],
  },
  {
    title: "Quality and reliability",
    description:
      "Improved confidence in releases with component-level tests, regression coverage, and tighter feedback loops between design and engineering.",
    focus: ["Frontend Development", "Testing"],
    stack: ["Jest", "React Testing Library", "TypeScript"],
  },
  {
    title: "Design-to-engineering handoff",
    description:
      "Tightened collaboration between design and engineering by translating Figma specs into production-ready components with clear ownership.",
    focus: ["Product Design", "Frontend Development"],
    stack: ["Figma", "React", "Git"],
  },
];

function StackPills({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExperiencePartCard({ part }: { part: ExperiencePart }) {
  return (
    <li className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <h4 className="text-sm font-medium text-foreground">{part.title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {part.description}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        {part.focus.join(" · ")}
      </p>
      <StackPills items={part.stack} />
    </li>
  );
}

function Company1() {
  const [expanded, setExpanded] = useState(false);
  const visibleParts = COMPANY_1_PARTS.slice(0, 2);
  const hiddenParts = COMPANY_1_PARTS.slice(2);

  return (
    <article className="w-full">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-gradient-to-b from-white via-neutral-300 to-neutral-600 p-[2px] shadow-md">
          <div className="rounded-[15px] bg-black p-2">
            <Image
              src="/Dseide.png"
              alt="Dseide"
              width={40}
              height={40}
              loading="lazy"
              className="rounded-md object-contain"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium text-foreground">Dseide</h3>
          <p className="text-sm text-muted-foreground">
            Product Design & Frontend Development
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-4">
        {visibleParts.map((part) => (
          <ExperiencePartCard key={part.title} part={part} />
        ))}

        {expanded
          ? hiddenParts.map((part) => (
              <ExperiencePartCard key={part.title} part={part} />
            ))
          : null}
      </ul>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className={cn(
          "mt-4 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground",
        )}
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </article>
  );
}

export default function Experience() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex items-center gap-2">
        {/* <ExperienceIcon /> */}
        <h2 className="font-serif text-2xl font-medium sm:text-xl lg:text-xl">
          Experience
        </h2>
      </div>

      <Company1 />
    </div>
  );
}
