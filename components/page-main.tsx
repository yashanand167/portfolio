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
        "relative z-10 mx-auto flex min-h-screen w-full flex-col bg-card px-4 py-10 pb-20 transition-colors duration-300 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-20 before:w-[3px] before:-translate-x-1/2 before:bg-[radial-gradient(circle,var(--border)_1.25px,transparent_1.35px)] before:bg-size-[3px_12px] before:bg-repeat-y before:bg-position-[center_top] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-20 after:w-[3px] after:translate-x-1/2 after:bg-[radial-gradient(circle,var(--border)_1.25px,transparent_1.35px)] after:bg-size-[3px_12px] after:bg-repeat-y after:bg-position-[center_top] sm:px-6 sm:py-16 sm:pb-24 lg:px-8",
        size === "lg"
          ? "max-w-[min(56rem,calc(100%-2rem))]"
          : "max-w-[min(48rem,calc(100%-2rem))]",
        className,
      )}
    >
      {children}
    </main>
  );
}
