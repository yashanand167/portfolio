import { ChartArrow, ChartNode, ChartShell } from "./chart-ui";

export default function ComponentTreeChart() {
  return (
    <ChartShell
      title="Component Tree"
      caption="A typical parent → child relationship. Data flows down, events flow up."
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <ChartNode tone="accent">App (Parent)</ChartNode>
          <span className="absolute top-1/2 left-full ml-2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] text-muted-foreground sm:inline">
            ← State lives here
          </span>
        </div>
        <ChartArrow />
        <div className="flex flex-wrap items-start justify-center gap-3">
          <ChartNode tone="muted">Header</ChartNode>
          <div className="flex flex-col items-center gap-2">
            <ChartNode tone="muted">Main</ChartNode>
            <ChartArrow />
            <div className="flex flex-wrap justify-center gap-2">
              <ChartNode>PostList (Child A)</ChartNode>
              <ChartNode>Sidebar (Child B)</ChartNode>
            </div>
          </div>
        </div>
      </div>
    </ChartShell>
  );
}
