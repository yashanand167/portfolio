"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ExperiencePart = {
  title: string;
  period: string;
  description: string;
  stack: string[];
};

const DSEIDE_PARTS: ExperiencePart[] = [
  {
    title: "0-to-1 Product Design for Mobile App",
    period: "Aug 2025 - Oct 2025",
    description:
      "Designed the entire core mobile application from a blank canvas in Figma. Structured a rigid 8px design system to handle high-density medical clinical records and workflows for healthcare professionals.",
    stack: ["Figma", "UI/UX", "Mobile Design", "User Research", "Design System"],
  },
  {
    title: "Mobile App Development",
    period: "Oct 2025 - Nov 2025",
    description:
      "Learned React Native and Expo on the fly to build and launch the production mobile app in 4 weeks. Developed clean local data caching via TanStack Query and state management with Zustand.",
    stack: ["React Native", "Expo", "Zustand", "TanStack Query", "Mobile Dev"],
  },
  {
    title: "Web Dashboard & Landing Page",
    period: "Nov 2025 - Dec 2025",
    description:
      "Built the web dashboard from scratch using React, integrating REST APIs with Axios. Designed and shipped the corporate landing page on Framer.",
    stack: ["React", "Framer", "Axios", "REST API", "Figma"],
  },
  {
    title: "Performance Refinement & API Testing",
    period: "Jan 2026 - Feb 2026",
    description:
      "Optimized React Native rendering performance to eliminate frame drops. Wrote unit tests and mock API integrations using Jest to secure core flows.",
    stack: ["Jest", "UI Performance", "React Native", "API Testing"],
  },
  {
    title: "Event & Webinar Module Architecture",
    period: "Mar 2026 - May 2026",
    description:
      "Spearheaded the technical architecture and interface design of the upcoming live event and medical webinar module, mapping state schemas and event routing.",
    stack: ["System Architecture", "Figma", "Feature Ownership", "API Design"],
  },
];

const FREELANCE_PARTS: ExperiencePart[] = [
  {
    title: "AI Nutrition App",
    period: "Phase 1",
    description:
      "Conducted comprehensive UX research and competitor analysis to establish the foundation and architecture of the application's design system.",
    stack: ["UX Research", "Competitor Analysis", "Design System"],
  },
  {
    title: "UI Design & Dev Handoff",
    period: "Phase 2",
    description:
      "Created high-fidelity UI designs in Figma and ensured a seamless development handoff with detailed specifications.",
    stack: ["UI Design", "Figma", "Dev Handoff"],
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
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="text-sm font-medium text-foreground">{part.title}</h4>
        <p className="text-xs text-muted-foreground">{part.period}</p>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {part.description}
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
  parts,
  caseStudyHref,
  initialVisibleCount = parts.length,
}: {
  logo: ReactNode;
  name: string;
  role: string;
  parts: ExperiencePart[];
  caseStudyHref?: string;
  initialVisibleCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleParts = parts.slice(0, initialVisibleCount);
  const hiddenParts = parts.slice(initialVisibleCount);

  return (
    <article className="w-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <ExperienceLogo>{logo}</ExperienceLogo>

          <div className="min-w-0">
            <h3 className="text-sm font-medium text-foreground sm:text-base">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">{role}</p>
          </div>
        </div>

        {caseStudyHref ? (
          <Link
            href={caseStudyHref}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-muted-foreground sm:text-sm"
          >
            Case Study
            <ArrowUpRight className="size-3.5 sm:size-4" aria-hidden />
          </Link>
        ) : null}
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
      name="Dseide Healthcare Network"
      role="Full-stack & Product Design • Bangalore"
      parts={DSEIDE_PARTS}
      initialVisibleCount={2}
      caseStudyHref="/blogs/design-engineering/shipping-dseide-healthcare-network"
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
      role="Product Design • Global"
      parts={FREELANCE_PARTS}
      caseStudyHref="/blogs/design-engineering/ai-nutrition-app-startup-playbook"
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
        <h2 className="page-subheading">Work Experience so far</h2>
      </div>

      <div className="flex w-full flex-col gap-10">
        <Company1 />
        <Freelance />
      </div>
    </div>
  );
}
