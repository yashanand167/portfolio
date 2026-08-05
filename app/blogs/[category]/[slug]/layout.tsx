import Header from "@/components/header";
import PageMain from "@/components/page-main";

type BlogPostLayoutProps = {
  children: React.ReactNode;
};

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageMain>
        <Header />
        {children}
      </PageMain>
    </div>
  );
}
