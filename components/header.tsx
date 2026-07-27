"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-4">
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
      

    </header>
  );
}
