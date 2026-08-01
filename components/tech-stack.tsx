import type { IconType } from "react-icons";
import {
  SiExpo,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRive,
  SiShadcnui,
  SiStorybook,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  TbAccessible,
  TbBrandFramerMotion,
  TbBrandReactNative,
  TbComponents,
  TbPalette,
  TbVectorBezier,
  TbWaveSine,
} from "react-icons/tb";

import { cn } from "@/lib/utils";

type TechItem = {
  name: string;
  icon: IconType;
  color?: string;
  useForeground?: boolean;
};

const SKILL_ACCENT = "#8B5CF6";

const techStack: TechItem[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, useForeground: true },
  { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
  { name: "Expo", icon: SiExpo, useForeground: true },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "shadcn/ui", icon: SiShadcnui, useForeground: true },
  { name: "Motion", icon: TbBrandFramerMotion, useForeground: true },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, useForeground: true },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Framer", icon: SiFramer, useForeground: true },
  { name: "Rive", icon: SiRive, useForeground: true },
  { name: "Product Design", icon: TbPalette, color: SKILL_ACCENT },
  { name: "Design Systems", icon: TbComponents, color: SKILL_ACCENT },
  { name: "Interaction Design", icon: TbWaveSine, color: SKILL_ACCENT },
  { name: "Prototyping", icon: TbVectorBezier, color: SKILL_ACCENT },
  { name: "Accessibility", icon: TbAccessible, color: SKILL_ACCENT },
  { name: "Storybook", icon: SiStorybook, color: "#FF4785" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, useForeground: true },
  { name: "Vercel", icon: SiVercel, useForeground: true },
];

function TechBadge({ name, icon: Icon, color, useForeground }: TechItem) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 text-xs font-medium text-foreground sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm">
      <Icon
        className={cn(
          "size-3 shrink-0 sm:size-4",
          useForeground && "text-foreground",
        )}
        style={color ? { color } : undefined}
        aria-hidden
      />
      {name}
    </span>
  );
}

export default function TechStack() {
  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground sm:text-base">
        Stacks & skills I make use of to craft beautiful web and mobile products
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {techStack.map((tech) => (
          <TechBadge key={tech.name} {...tech} />
        ))}
      </div>
    </div>
  );
}
