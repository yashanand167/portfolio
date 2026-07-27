"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const TABS = [
  { id: "design-engineering", label: "Design/Engineering" },
  { id: "personal", label: "Personal" },
] as const;

export type BlogCategoryTab = (typeof TABS)[number]["id"];

type BlogCategoryTabsProps = {
  defaultTab?: BlogCategoryTab;
  onChange?: (tab: BlogCategoryTab) => void;
  className?: string;
};

export default function BlogCategoryTabs({
  defaultTab = "design-engineering",
  onChange,
  className,
}: BlogCategoryTabsProps) {
  const [activeTab, setActiveTab] = useState<BlogCategoryTab>(defaultTab);

  function handleTabClick(tab: BlogCategoryTab) {
    setActiveTab(tab);
    onChange?.(tab);
  }

  return (
    <div
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-xl border border-border bg-muted/40 p-1",
        className,
      )}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
              isActive
                ? "bg-gradient-to-r from-neutral-900 to-neutral-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
