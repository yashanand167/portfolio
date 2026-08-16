import { cn } from "@/lib/utils";

type ChartNodeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent" | "muted" | "warn" | "ok";
};

export function ChartNode({
  children,
  className,
  tone = "default",
}: ChartNodeProps) {
  return (
    <div
      className={cn(
        "border border-dotted px-2.5 py-1.5 text-center font-mono text-[11px] leading-tight sm:text-xs",
        tone === "default" && "border-foreground/50 text-foreground",
        tone === "accent" && "border-primary text-primary",
        tone === "muted" && "border-muted-foreground/50 text-muted-foreground",
        tone === "warn" && "border-primary/70 text-foreground",
        tone === "ok" && "border-foreground/40 text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ChartShellProps = {
  title: string;
  children: React.ReactNode;
  caption?: string;
};

export function ChartShell({ title, children, caption }: ChartShellProps) {
  return (
    <figure className="not-prose my-6 border border-dotted border-border bg-muted/20 p-4 sm:p-5">
      <figcaption className="mb-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase sm:text-xs">
        {title}
      </figcaption>
      <div className="flex flex-col items-center gap-3">{children}</div>
      {caption ? (
        <p className="mt-4 text-center text-xs text-muted-foreground sm:text-sm">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

export function ChartArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-muted-foreground">
      <span aria-hidden className="font-mono text-xs">
        ↓
      </span>
      {label ? (
        <span className="text-[10px] tracking-wide sm:text-[11px]">{label}</span>
      ) : null}
    </div>
  );
}
