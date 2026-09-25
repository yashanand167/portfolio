"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
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
        className="flex size-9 items-center justify-center rounded-full text-neutral-300 transition-all duration-200 hover:bg-white/15 hover:text-white hover:scale-110 active:scale-95 sm:size-10"
      >
        <Icon className="size-4 shrink-0 sm:size-5" aria-hidden />
      </a>

      <AnimatePresence>
        {isHovered ? (
          <motion.div
            key={`social-tooltip-${name}`}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3.5 -translate-x-1/2"
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-[#626262] bg-gradient-to-b from-[#3B3B3B] to-[#000000] px-3 py-1.5 text-xs font-medium text-white shadow-xl">
              <Icon className="size-3.5 shrink-0" aria-hidden />
              <span>{name}</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[#626262] bg-[#000000]" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function SocialLinks() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 60) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.aside
      variants={{
        visible: { y: 0, opacity: 1, pointerEvents: "auto" },
        hidden: { y: 80, opacity: 0, pointerEvents: "none" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="rounded-full border border-[#626262] bg-black p-1 shadow-[6px_14px_24px_rgba(0,0,0,0.3)]">
        <nav
          aria-label="Social Links Navbar"
          className="flex items-center gap-1 rounded-full border border-[#626262] bg-gradient-to-b from-[#3B3B3B] to-[#000000] p-1.5 shadow-[4px_8px_16px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:gap-1.5 sm:p-2"
        >
          {socialLinks.map((link) => (
            <SocialLinkBadge key={link.name} {...link} />
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
