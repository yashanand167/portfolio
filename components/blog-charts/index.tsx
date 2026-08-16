import ComponentTreeChart from "./component-tree-chart";
import DomUpdateChart from "./dom-update-chart";
import ReconcileChart from "./reconcile-chart";
import StateUpdateChart from "./state-update-chart";

const CHARTS = {
  "component-tree": ComponentTreeChart,
  "state-update": StateUpdateChart,
  reconcile: ReconcileChart,
  "dom-update": DomUpdateChart,
} as const;

export type BlogChartId = keyof typeof CHARTS;

export function isBlogChartId(value: string): value is BlogChartId {
  return value in CHARTS;
}

export default function BlogChart({ id }: { id: BlogChartId }) {
  const Chart = CHARTS[id];
  return <Chart />;
}
