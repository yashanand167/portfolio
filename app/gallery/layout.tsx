import type { Metadata } from "next";

import Header from "@/components/header";
import PageMain from "@/components/page-main";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A collection of visual snapshots outside engineering work",
};

type GalleryLayoutProps = {
  children: React.ReactNode;
};

export default function GalleryLayout({ children }: GalleryLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Header />
        {children}
      </PageMain>
    </div>
  );
}
