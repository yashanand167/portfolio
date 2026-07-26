"use client";

import Image from "next/image";

import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="aspect-square rounded-xl border border-border bg-card">
          <Image src="/Logo.png" alt="logo" width={50} height={50} />
        </div>
        <ul className="flex flex-row gap-4 text-base font-medium text-foreground">
          <li className="cursor-pointer transition-colors hover:text-muted-foreground">
            Home
          </li>
          <li className="cursor-pointer transition-colors hover:text-muted-foreground">
            Work
          </li>
          <li className="cursor-pointer transition-colors hover:text-muted-foreground">
            Blogs
          </li>
        </ul>
      </div>

      <ThemeToggle />
    </header>
  );
}
