import { cn } from "@/lib/utils";

type PageMainProps = {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
};

export default function PageMain({
  children,
  className,
  size = "md",
}: PageMainProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-col px-4 py-10 sm:px-6 sm:py-16 lg:px-8",
        size === "lg" ? "max-w-4xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </main>
  );
}
