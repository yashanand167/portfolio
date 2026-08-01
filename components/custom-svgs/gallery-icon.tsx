"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type GalleryIconProps = {
  className?: string;
};

const frameTransition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.75,
} as const;

const frames = [
  { x: 1, y: 1, delay: 0.04, fill: "#97A0F8" },
  { x: 15, y: 1, delay: 0.1, fill: "#FFDA76" },
  { x: 1, y: 15, delay: 0.16, fill: "#FFAF76" },
  { x: 15, y: 15, delay: 0.22, fill: "#4A5DFF" },
] as const;

export default function GalleryIcon({ className }: GalleryIconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("h-5 w-5 shrink-0", className)}
    >
      {frames.map((frame) => (
        <motion.rect
          key={`${frame.x}-${frame.y}`}
          x={frame.x}
          y={frame.y}
          width={12}
          height={12}
          rx={2.5}
          fill={frame.fill}
          stroke="white"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...frameTransition, delay: frame.delay }}
          style={{
            transformOrigin: `${frame.x + 6}px ${frame.y + 6}px`,
            transformBox: "fill-box",
          }}
        />
      ))}
    </svg>
  );
}
