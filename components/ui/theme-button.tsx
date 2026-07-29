"use client";

import {
  AnimatePresence,
  motion,
  useDragControls,
} from "motion/react";
import { Palette } from "lucide-react";
import { useRef, useState } from "react";

import { useColorTheme } from "@/context/theme-provider";
import { themes } from "@/lib/theme";

const spring = { type: "spring", stiffness: 400, damping: 30 } as const;

const panelClassName =
  "flex items-center gap-2 overflow-hidden rounded-full border border-white bg-gradient-to-b from-neutral-700 to-black p-2 shadow-sm";

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
          <motion.div layout transition={spring} className={panelClassName}>
            <motion.button
              layout
              type="button"
              aria-label="Color palette"
              aria-expanded={expanded}
              onPointerDown={(event) => dragControls.start(event)}
              onClick={() => setExpanded((value) => !value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className="flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-full text-white active:cursor-grabbing"
            >
              <motion.span
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={spring}
              >
                <Palette size={16} />
              </motion.span>
            </motion.button>

            <AnimatePresence mode="popLayout">
              {expanded
                ? themes.map((t, index) => {
                    const isActive = theme === t.id;

                    return (
                      <motion.button
                        key={t.id}
                        layout
                        initial={{ opacity: 0, scale: 0.5, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: 20 }}
                        exit={{
                          opacity: 0,
                          scale: 0.5,
                          width: 0,
                          transition: {
                            ...spring,
                            delay: (themes.length - 1 - index) * 0.03,
                          },
                        }}
                        transition={{
                          ...spring,
                          delay: index * 0.04,
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        aria-label={`${t.label} theme`}
                        aria-pressed={isActive}
                        onClick={() => {
                          setTheme(t.id);
                          setExpanded(false);
                        }}
                        className="relative h-5 shrink-0 overflow-hidden rounded-full ring-1 ring-white/25"
                      >
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ background: t.color }}
                        />
                        {isActive ? (
                          <motion.span
                            layoutId="active-theme-ring"
                            className="absolute inset-[-3px] rounded-full border-2 border-white"
                            transition={spring}
                          />
                        ) : null}
                      </motion.button>
                    );
                  })
                : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
