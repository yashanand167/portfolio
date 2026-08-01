"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Download } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/works", label: "Works" },
  { href: "/blogs", label: "Blogs" },
  { href: "/inspirations", label: "Inspirations" },
] as const;

const activeUnderlineClassName =
  "bg-[radial-gradient(circle,var(--primary)_2px,transparent_2px)] bg-size-[12px_100%] bg-repeat-x bg-position-[center]";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <li className="shrink-0">
      <Link
        href={href}
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
      <motion.button
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className="flex h-8 shrink-0 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors duration-300 sm:h-10 sm:px-3 sm:text-sm"
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
      </motion.button>
    </header>
  );
}
