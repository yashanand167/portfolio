import type { Metadata } from "next";

import Header from "@/components/header";
import PageMain from "@/components/page-main";

export const metadata: Metadata = {
  title: "Writings",
  description: "Essays on design, engineering, and personal notes.",
};

type BlogsListingLayoutProps = {
  children: React.ReactNode;
};

export default function BlogsListingLayout({
  children,
}: BlogsListingLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain size="lg">
        <Header />
        {children}
      </PageMain>
    </div>
  );
}
