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
    <li>
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
    <header className="z-50 flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="aspect-square rounded-lg border border-border bg-card transition-opacity hover:opacity-80"
        >
          <Image
            src="/Logo.png"
            alt="Home"
            width={40}
            height={40}
            loading="lazy"
          />
        </Link>
        <ul className="flex flex-row gap-4 text-base font-medium">
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
        className="flex h-10 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors duration-300"
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
