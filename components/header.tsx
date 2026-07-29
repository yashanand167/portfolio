"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Download } from "lucide-react";

export default function Header() {
  const [hovered, setHovered] = useState(false);
  return (
    <header className=" z-50 flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="aspect-square rounded-lg border border-border bg-card">
          <Image
            src="/Logo.png"
            alt="logo"
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
        <ul className="flex flex-row gap-4 text-base font-medium text-foreground">
          <li className="cursor-pointer transition-colors hover:text-muted-foreground">
            Work
          </li>
          <li>
            <Link
              href="/blogs"
              className="transition-colors hover:text-muted-foreground"
            >
              Blogs
            </Link>
          </li>
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

      className="flex h-10 items-center rounded-md bg-black px-3 text-sm font-medium text-white"

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
