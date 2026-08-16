import { ChartShell } from "./chart-ui";
import { cn } from "@/lib/utils";

function DomLine({
  children,
  active = false,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "border border-dotted px-3 py-1.5 font-mono text-[11px] sm:text-xs",
        active
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground",
      )}
    >
      {children}
    </div>
  );
}

export default function DomUpdateChart() {
  return (
    <ChartShell
      title="DOM Update (Commit)"
      caption="The browser updates only what's needed and repaints."
    >
      <p className="text-xs text-muted-foreground">
        Only the parts that actually changed are updated in the real DOM.
      </p>
      <div className="relative w-full max-w-sm border border-dotted border-border bg-background/60 p-3">
        <DomLine>{"<header>...</header>"}</DomLine>
        <DomLine>{"<div class=\"post\">...</div>"}</DomLine>
        <div className="relative">
          <DomLine active>{"<div class=\"post\">...</div>"}</DomLine>
          <span className="absolute top-1/2 left-full ml-2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] text-primary sm:inline">
            ← Only this changes
          </span>
        </div>
        <DomLine>{"<div class=\"post\">...</div>"}</DomLine>
        <DomLine>{"<aside>...</aside>"}</DomLine>
      </div>
    </ChartShell>
  );
}
