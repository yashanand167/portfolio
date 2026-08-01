import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type WorkRowCardProps = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link?: string;
};

export default function WorkRowCard({
  title,
  subtitle,
  description,
  image,
  link,
}: WorkRowCardProps) {
  return (
    <article className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-border/50 shadow-[0_1px_3px_oklch(0_0_0/0.08),0_1px_2px_oklch(0_0_0/0.04)] sm:size-12">
          <Image
            src={image}
            alt={title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 40px, 48px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {subtitle ? (
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-border px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-accent hover:text-primary sm:px-2.5 sm:py-1.5 sm:text-xs"
        >
          View project
          <ArrowUpRight className="size-3 sm:size-3.5" aria-hidden />
        </a>
      ) : null}
    </article>
  );
}
