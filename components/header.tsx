"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

import BlogIcon from "@/components/custom-svgs/blog-icon";
import GalleryIcon from "@/components/custom-svgs/gallery-icon";
import InspirationIcon from "@/components/custom-svgs/inspiration-icon";
import WorkIcon from "@/components/custom-svgs/work-icon";
import ThemeButton from "@/components/ui/theme-button";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type NavIconProps = {
  className?: string;
};

const navItems: {
  href: string;
  label: string;
  hoverLabel: string;
  Icon: ComponentType<NavIconProps>;
}[] = [
  {
    href: "/works",
    label: "Works",
    hoverLabel: "Things I have built",
    Icon: WorkIcon,
  },
  {
    href: "/blogs",
    label: "Blogs",
    hoverLabel: "Observatory",
    Icon: BlogIcon,
  },
  {
    href: "/inspirations",
    label: "Inspirations",
    hoverLabel: "People & Ideas",
    Icon: InspirationIcon,
  },
  {
    href: "/gallery",
    label: "Gallery",
    hoverLabel: "Snapshots & frames",
    Icon: GalleryIcon,
  },
];

const activeUnderlineClassName =
  "bg-[radial-gradient(circle,var(--primary)_2px,transparent_2px)] bg-size-[12px_100%] bg-repeat-x bg-position-[center]";

const resumeUrl =
  "https://drive.google.com/file/d/1wBVjU-DM4jgqppJYS9PkESxO1yWmW4u1/view";

function NavLink({
  href,
  label,
  hoverLabel,
  Icon,
}: {
  href: string;
  label: string;
  hoverLabel: string;
  Icon: ComponentType<NavIconProps>;
}) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    setIsHovered(false);
  }, [pathname]);

  return (
    <li className="shrink-0">
      <div
        className="relative inline-flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={href}
          onClick={() => setIsHovered(false)}
          className={cn(
            "relative inline-block pb-1.5 transition-colors duration-300",
            isActive
              ? "text-primary"
              : "text-foreground hover:text-muted-foreground",
          )}
        >
          {label}
          {isActive ? (
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 -bottom-0.5 h-1",
                activeUnderlineClassName,
              )}
            />
          ) : null}
        </Link>

        <AnimatePresence>
          {isHovered ? (
            <motion.div
              key="nav-tooltip"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white shadow-xl">
                <Icon className="h-5 w-auto" />
                <span>{hoverLabel}</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="z-50 flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="aspect-square shrink-0 rounded-lg border border-border bg-card transition-opacity hover:opacity-80"
        >
          <Image
            src="/Logo.png"
            alt="Home"
            width={32}
            height={32}
            loading="lazy"
            className="size-8 sm:size-10"
          />
        </Link>
        <ul className="flex min-w-0 gap-2 text-xs font-medium sm:gap-4 sm:text-sm lg:text-base">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </ul>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <ThemeButton />
        <motion.a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          layout
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="flex h-8 shrink-0 items-center rounded-md border border-white bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors duration-300 sm:h-10 sm:px-3 sm:text-sm"
        >
          <span>Resume</span>
          <AnimatePresence mode="wait">
            {hovered && (
              <motion.div
                key="icon"
                initial={{
                  width: 0,
                  opacity: 0,
                  x: -6,
                  marginLeft: 0,
                }}
                animate={{
                  width: "auto",
                  opacity: 1,
                  x: 0,
                  marginLeft: 8,
                }}
                exit={{
                  width: 0,
                  opacity: 0,
                  x: -6,
                  marginLeft: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="overflow-hidden"
              >
                <Download size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </header>
  );
}
