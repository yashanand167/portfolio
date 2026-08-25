"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandX,
  TbMail,
} from "react-icons/tb";

type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  { name: "X", href: "https://x.com/yashanand167", icon: TbBrandX },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-anand-b7264b308/",
    icon: TbBrandLinkedin,
  },
  { name: "Email", href: "mailto:yash.anand167@gmail.com", icon: TbMail },
  {
    name: "GitHub",
    href: "https://github.com/yashanand167",
    icon: TbBrandGithub,
  },
];

function SocialLinkBadge({ name, href, icon: Icon }: SocialLink) {
  const [isHovered, setIsHovered] = useState(false);
  const isExternal = href.startsWith("http");

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={name}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-muted p-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
      >
        <Icon className="size-4 shrink-0" aria-hidden />
      </a>

      <AnimatePresence>
        {isHovered ? (
          <motion.div
            key={`social-tooltip-${name}`}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white shadow-xl">
              <Icon className="size-4 shrink-0" aria-hidden />
              <span>{name}</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function SocialLinks() {
  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground sm:text-base">Reach me out on</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <SocialLinkBadge key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
}
