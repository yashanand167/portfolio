import type { Metadata } from "next";

import Header from "@/components/header";
import PageMain from "@/components/page-main";

export const metadata: Metadata = {
  title: "Inspirations",
  description:
    "Designers, engineers, and builders whose work has shaped how I think, create, and build.",
};

type InspirationsLayoutProps = {
  children: React.ReactNode;
};

export default function InspirationsLayout({ children }: InspirationsLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Header />
        {children}
      </PageMain>
    </div>
  );
}
