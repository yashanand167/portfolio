import { ChartArrow, ChartNode, ChartShell } from "./chart-ui";

export default function StateUpdateChart() {
  return (
    <ChartShell
      title="State Update"
      caption="When a parent re-renders, its children also re-render. (Render is just JS functions running)"
    >
      <p className="text-xs text-muted-foreground">
        Something changes in App (Parent)
      </p>
      <ChartArrow />
      <ChartNode tone="accent">App re-renders</ChartNode>
      <ChartArrow />
      <div className="flex flex-wrap justify-center gap-3">
        <ChartNode>Child A re-renders</ChartNode>
        <ChartNode>Child B re-renders</ChartNode>
      </div>
    </ChartShell>
  );
}
