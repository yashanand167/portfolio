"use client";

import { AnimatePresence, motion } from "motion/react";
import { Palette, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useSound } from "@/hooks/use-sound";
import { useColorTheme } from "@/context/theme-provider";
import { metalClickSound } from "@/lib/metal-click";
import { themes } from "@/lib/theme";

const spring = { type: "spring", stiffness: 400, damping: 32 } as const;

export default function ThemeButton() {
  const [expanded, setExpanded] = useState(false);
  const { theme, setTheme } = useColorTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [playMetalClick] = useSound(metalClickSound, {
    volume: 0.45,
    interrupt: true,
  });

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="Open color palette"
        aria-expanded={expanded}
        onClick={() => {
          playMetalClick();
          setExpanded((value) => !value);
        }}
        className="flex h-8 items-center justify-center rounded-md border border-white bg-gradient-to-b from-neutral-700 to-black px-2.5 text-white shadow-sm transition-opacity hover:opacity-90 sm:h-10 sm:px-3"
      >
        <Palette className="size-3.5 sm:size-4" aria-hidden />
      </button>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            key="palette-panel"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={spring}
            className="absolute right-0 top-full z-50 mt-2.5 w-[9.5rem] rounded-2xl border border-white bg-gradient-to-b from-neutral-700 to-black p-3.5 shadow-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-white/80">Theme</span>
              <button
                type="button"
                aria-label="Close color palette"
                onClick={() => setExpanded(false)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
              >
                <X size={12} />
              </button>
            </div>

            <div
              role="group"
              aria-label="Color palette"
              className="grid grid-cols-3 place-items-center gap-x-3 gap-y-2.5 px-0.5 pb-0.5"
            >
              {themes.map((t, index) => {
                const isActive = theme === t.id;

                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    aria-label={`${t.label} theme`}
                    aria-pressed={isActive}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...spring, delay: 0.03 + index * 0.025 }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTheme(t.id)}
                    className="relative h-[1.125rem] w-[1.125rem] rounded-full ring-1 ring-white/25"
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: t.color }}
                    />
                    {isActive ? (
                      <span className="absolute inset-[-2px] rounded-full border-2 border-white" />
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
