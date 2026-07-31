"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type FeaturedWork = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  links: string[];
};

const featuredWorks: FeaturedWork[] = [
  {
    title: "Dseide",
    subtitle: "Cross platform development and product design",
    description: "Description 1",
    image: "/Dseide.png",
    links: ["https://dseide.com"],
  },
  {
    title: "MailGauge",
    subtitle: "Landing page design & development",
    description:
      "Landing page design and development with high fidelity motion animations.",
    image: "/Profile.png",
    links: ["https://www.google.com"],
  },
  {
    title: "AI Nutrition App",
    subtitle: "Product design",
    description: "Product design of a cross-platform mobile application.",
    image: "/Me.png",
    links: ["https://www.google.com"],
  },
];

function FeaturedWorkCard({
  title,
  subtitle,
  description,
  image,
  links,
}: FeaturedWork) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                View project
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function FeaturedWorks() {
  return (
    <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredWorks.map((work) => (
          <FeaturedWorkCard key={work.title} {...work} />
        ))}
      </div>
    </div>
  );
}
