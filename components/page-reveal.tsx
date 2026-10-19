"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, useEffect, useState, type ReactNode } from "react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(14px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
    transitionEnd: {
      filter: "none",
    },
  },
};

let hasRevealedOnLoad = false;

export default function PageReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [shouldAnimate] = useState(() => !hasRevealedOnLoad);

  useEffect(() => {
    if (!shouldAnimate) return;

    const id = window.setTimeout(() => {
      hasRevealedOnLoad = true;
    }, 0);

    return () => window.clearTimeout(id);
  }, [shouldAnimate]);

  if (reduceMotion || !shouldAnimate) {
    return <div className="flex w-full flex-col">{children}</div>;
  }

  return (
    <motion.div
      className="flex w-full flex-col"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} className="w-full" variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
