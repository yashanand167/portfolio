"use client";

import { useColorTheme } from "@/context/theme-provider";
import { themes } from "@/lib/theme";

export default function ThemeButton() {
  return <Palette />;
}

function Palette() {
  const { theme, setTheme } = useColorTheme();

  return (
    <div
      role="toolbar"
      aria-label="Color palette"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full border border-border bg-background p-2 shadow-sm"
    >
      {themes.map((t) => {
        const isActive = theme === t.id;

        return (
          <button
            key={t.id}
            type="button"
            aria-label={`${t.label} theme`}
            aria-pressed={isActive}
            onClick={() => setTheme(t.id)}
            className="relative h-5 w-5 rounded-full transition-transform hover:scale-110"
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: t.color }}
            />
            {isActive && (
              <span className="absolute inset-[-3px] rounded-full border-2 border-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
