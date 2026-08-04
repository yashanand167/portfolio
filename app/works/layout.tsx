import type { Metadata } from "next";

import Header from "@/components/header";
import PageMain from "@/components/page-main";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Featured collaborations and side projects across product design, frontend development, and cross-platform apps.",
};

type WorksLayoutProps = {
  children: React.ReactNode;
};

export default function WorksLayout({ children }: WorksLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Header />
        {children}
      </PageMain>
    </div>
  );
}
