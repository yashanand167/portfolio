"use client";

import { useId } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type WorkIconProps = {
  className?: string;
};

const stackTransition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.75,
} as const;

export default function WorkIcon({ className }: WorkIconProps) {
  const id = useId();
  const bottomGradientId = `${id}-work-stack-bottom`;
  const middleGradientId = `${id}-work-stack-middle`;
  const topGradientId = `${id}-work-stack-top`;

  return (
    <svg
      width="71"
      height="55"
      viewBox="0 0 71 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("h-8 w-auto shrink-0", className)}
    >
      <motion.g
        initial={{ y: 18, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...stackTransition, delay: 0.04 }}
        style={{ transformOrigin: "35px 50px", transformBox: "fill-box" }}
      >
        <rect
          x="0.433022"
          width="39.5075"
          height="41.1404"
          rx="7.75"
          transform="matrix(0.866044 -0.499967 0.866044 0.499967 0.0580058 34.2189)"
          fill={`url(#${bottomGradientId})`}
          stroke="white"
          strokeWidth="0.5"
        />
      </motion.g>

      <motion.g
        initial={{ y: 22, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...stackTransition, delay: 0.12 }}
        style={{ transformOrigin: "35px 42px", transformBox: "fill-box" }}
      >
        <rect
          x="0.433022"
          width="39.5075"
          height="41.1404"
          rx="7.75"
          transform="matrix(0.866044 -0.499967 0.866044 0.499967 0.0580058 27.2189)"
          fill={`url(#${middleGradientId})`}
          stroke="white"
          strokeWidth="0.5"
        />
      </motion.g>

      <motion.g
        initial={{ y: 26, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...stackTransition, delay: 0.2 }}
        style={{ transformOrigin: "35px 34px", transformBox: "fill-box" }}
      >
        <rect
          x="0.433022"
          width="39.5075"
          height="41.1404"
          rx="7.75"
          transform="matrix(0.866044 -0.499967 0.866044 0.499967 0.0580058 20.2189)"
          fill={`url(#${topGradientId})`}
          stroke="white"
          strokeWidth="0.5"
        />
      </motion.g>

      <motion.g
        initial={{ y: 14, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...stackTransition, delay: 0.3 }}
        style={{ transformOrigin: "33px 24px", transformBox: "fill-box" }}
      >
        <rect
          width="17.1461"
          height="8.98127"
          rx="2"
          transform="matrix(0.866044 -0.499967 0.866044 0.499967 25.1865 20.5312)"
          fill="black"
        />
        <rect
          width="10.6142"
          height="4.08239"
          rx="1"
          transform="matrix(0.866044 -0.499967 0.866044 0.499967 30.1362 20.123)"
          fill="white"
        />
      </motion.g>

      <defs>
        <linearGradient
          id={bottomGradientId}
          x1="20.0037"
          y1="0"
          x2="20.0037"
          y2="41.6404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#97A0F8" />
          <stop offset="1" stopColor="#4A5DFF" />
        </linearGradient>
        <linearGradient
          id={middleGradientId}
          x1="20.0037"
          y1="0"
          x2="20.0037"
          y2="41.6404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDA76" />
          <stop offset="1" stopColor="#FFC800" />
        </linearGradient>
        <linearGradient
          id={topGradientId}
          x1="20.0037"
          y1="0"
          x2="20.0037"
          y2="41.6404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFAF76" />
          <stop offset="1" stopColor="#FF6F00" />
        </linearGradient>
      </defs>
    </svg>
  );
}
