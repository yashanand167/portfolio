export const themes = [
  {
    id: "default",
    label: "Default",
    color: "#171717",
  },
  {
    id: "purple",
    label: "Purple",
    color: "#8b5cf6",
  },
  {
    id: "green",
    label: "Green",
    color: "#22c55e",
  },
  {
    id: "orange",
    label: "Orange",
    color: "#f97316",
  },
  {
    id: "blue",
    label: "Blue",
    color: "#3b82f6",
  },
  {
    id: "rose",
    label: "Rose",
    color: "#f43f5e",
  },
] as const;

export type Theme = (typeof themes)[number]["id"];
