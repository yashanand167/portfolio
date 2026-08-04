"use client";

import { AnimatePresence, motion, useDragControls } from "motion/react";
import { Palette, X } from "lucide-react";
import { useRef, useState } from "react";

import { useColorTheme } from "@/context/theme-provider";
import { themes } from "@/lib/theme";

const spring = { type: "spring", stiffness: 400, damping: 32 } as const;

export default function ThemeButton() {
  const [expanded, setExpanded] = useState(false);
  const { theme, setTheme } = useColorTheme();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AnimatePresence>
        {expanded ? (
          <motion.button
            type="button"
            aria-label="Close color palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setExpanded(false)}
          />
        ) : null}
      </AnimatePresence>

      <div
        ref={constraintsRef}
        className="pointer-events-none fixed inset-0 z-50"
      >
        <motion.div
          drag
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={constraintsRef}
          dragElastic={0.08}
          dragMomentum={false}
          whileDrag={{ scale: 1.02 }}
          transition={spring}
          className="pointer-events-auto absolute bottom-6 left-1/2 touch-none"
          style={{ x: "-50%" }}
        >
          <motion.div
            layout
            transition={spring}
            style={{ borderRadius: expanded ? 24 : 999 }}
            className="overflow-hidden border border-white bg-gradient-to-b from-neutral-700 to-black shadow-lg"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {expanded ? (
                <motion.div
                  key="panel"
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={spring}
                  className="flex aspect-square w-40 flex-col p-3"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      aria-label="Drag palette"
                      onPointerDown={(event) => dragControls.start(event)}
                      className="flex h-6 w-6 cursor-grab items-center justify-center text-white active:cursor-grabbing"
                    >
                      <Palette size={14} />
                    </button>

                    <button
                      type="button"
                      aria-label="Close color palette"
                      onClick={() => setExpanded(false)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div
                    role="group"
                    aria-label="Color palette"
                    className="grid flex-1 grid-cols-3 place-items-center gap-1"
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
                          transition={{ ...spring, delay: 0.04 + index * 0.03 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setTheme(t.id)}
                          className="relative h-6 w-6 rounded-full ring-1 ring-white/25"
                        >
                          <span
                            className="absolute inset-0 rounded-full"
                            style={{ background: t.color }}
                          />
                          {isActive ? (
                            <span className="absolute inset-[-3px] rounded-full border-2 border-white" />
                          ) : null}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="trigger"
                  layout
                  type="button"
                  aria-label="Open color palette"
                  aria-expanded={expanded}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={spring}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onPointerDown={(event) => dragControls.start(event)}
                  onClick={() => setExpanded(true)}
                  className="flex h-11 w-11 cursor-grab items-center justify-center text-white active:cursor-grabbing"
                >
                  <Palette size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
