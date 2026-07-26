"use client"

import Image from "next/image";

export default function Header() {
  return (
    <div className="flex w-full flex-row items-center gap-3">
        <div className="aspect-square bg-white border border-zinc-300 rounded-2xl">
            <Image src="/Logo.png" alt="logo" width={50} height={50}/>
        </div>
      <ul className="flex flex-row gap-4 text-base font-medium">
        <li>Home</li>
        <li>Work</li>
        <li>Blogs</li>
      </ul>
    </div>
  );
}