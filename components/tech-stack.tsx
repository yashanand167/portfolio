import type { IconType } from "react-icons";
import {
  SiFigma,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
  SiGit,
  SiGithub,
  SiFramer,
} from "react-icons/si";
import { TbPalette } from "react-icons/tb";

import { cn } from "@/lib/utils";

type TechItem = {
  name: string;
  icon: IconType;
  color?: string;
  useForeground?: boolean;
};

const techStack: TechItem[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs, useForeground: true },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Git", icon: SiGit, color: "#F05032" },
{ name: "GitHub", icon: SiGithub, useForeground: true },

{ name: "Framer", icon: SiFramer, useForeground: true },
{ name: "Product Design", icon: TbPalette, color: "#8B5CF6" },
];

function TechBadge({ name, icon: Icon, color, useForeground }: TechItem) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground">
      <Icon
        className={cn("size-4 shrink-0", useForeground && "text-foreground")}
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
      <p className="text-muted-foreground">I build modern applications using</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <TechBadge key={tech.name} {...tech} />
        ))}
      </div>
    </div>
  );
}
