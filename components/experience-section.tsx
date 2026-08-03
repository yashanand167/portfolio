"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Briefcase } from "lucide-react";

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
    stack: ["React", "TypeScript"],
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

const FREELANCE_PARTS: ExperiencePart[] = [
  {
    title: "Discovery & research",
    description:
      "Kicked off the AI-powered nutrition app with user research and competitor analysis to map audience needs, market gaps, and product opportunities.",
    focus: ["Product Design", "User Research"],
    stack: ["Figma", "Notion", "Miro"],
  },
  {
    title: "User flows & design system",
    description:
      "Mapped core journeys across onboarding, meal tracking, and recommendations, then built a scalable design system to keep the product consistent.",
    focus: ["Product Design", "Design Systems"],
    stack: ["Figma"],
  },
  {
    title: "UI design & feedback loops",
    description:
      "Designed polished product screens and ran tight feedback loops with stakeholders to refine layouts, hierarchy, and interaction details.",
    focus: ["Product Design", "UI/UX"],
    stack: ["Figma", "Framer"],
  },
  {
    title: "Design delivery",
    description:
      "Packaged final flows, components, and specs for handoff so the product team could move confidently into build.",
    focus: ["Product Design"],
    stack: ["Figma"],
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
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {part.description}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        {part.focus.join(" · ")}
      </p>
      <StackPills items={part.stack} />
    </li>
  );
}

function ExperienceLogo({ children }: { children: ReactNode }) {
  return (
    <div className="shrink-0 rounded-xl bg-gradient-to-b from-white via-neutral-300 to-neutral-600 p-[2px] shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-black p-2 sm:h-14 sm:w-14 sm:rounded-[15px]">
        {children}
      </div>
    </div>
  );
}

function ExperienceEntry({
  logo,
  name,
  role,
  period,
  parts,
}: {
  logo: ReactNode;
  name: string;
  role: string;
  period: string;
  parts: ExperiencePart[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleParts = parts.slice(0, 2);
  const hiddenParts = parts.slice(2);

  return (
    <article className="w-full">
      <div className="flex items-start gap-3">
        <ExperienceLogo>{logo}</ExperienceLogo>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground sm:text-base">{name}</h3>
          <p className="text-xs text-muted-foreground sm:text-sm">{role}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{period}</p>
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

      {hiddenParts.length > 0 ? (
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
      ) : null}
    </article>
  );
}

function Company1() {
  return (
    <ExperienceEntry
      name="Dseide"
      role="Product Design & Frontend Development"
      period="Aug 2025 – May 2026"
      parts={COMPANY_1_PARTS}
      logo={
        <Image
          src="/Dseide.png"
          alt="Dseide"
          width={40}
          height={40}
          loading="lazy"
          className="rounded-md object-contain"
        />
      }
    />
  );
}

function Freelance() {
  return (
    <ExperienceEntry
      name="Freelance"
      role="Product Designer"
      period="Feb 2025 – May 2025"
      parts={FREELANCE_PARTS}
      logo={
        <Briefcase className="size-5 text-white sm:size-6" aria-hidden />
      }
    />
  );
}

export default function Experience() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex items-center gap-2">
        <h2 className="page-subheading">
          Work Experience so far
        </h2>
      </div>

      <div className="flex w-full flex-col gap-10">
        <Company1 />
        <Freelance />
      </div>
    </div>
  );
}
