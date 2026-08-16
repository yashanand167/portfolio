import { ChartNode, ChartShell } from "./chart-ui";

export default function ReconcileChart() {
  return (
    <ChartShell
      title="React Reconciles (Diffing)"
      caption="React figures out the minimal set of changes needed."
    >
      <p className="text-xs text-muted-foreground">
        React compares the new React elements with the previous ones.
      </p>
      <div className="mt-1 flex w-full max-w-md flex-col gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ChartNode>Child A (before)</ChartNode>
          <span className="font-mono text-xs text-muted-foreground">→</span>
          <ChartNode>Child A (after)</ChartNode>
          <span className="text-[11px] text-muted-foreground">
            ✓ No meaningful changes
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ChartNode tone="muted">Child B (before)</ChartNode>
          <span className="font-mono text-xs text-muted-foreground">→</span>
          <ChartNode tone="accent">Child B (after)</ChartNode>
          <span className="text-[11px] text-foreground">
            ! Some props changed
          </span>
        </div>
      </div>
    </ChartShell>
  );
}
