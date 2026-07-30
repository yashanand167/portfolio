"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ProfileAvatar() {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        className="relative inline-flex"
      >
  
        <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <Image
            src="/Profile.png"
            alt="Profile"
            width={56}
            height={56}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </span>
        <motion.div
          variants={{
            rest: {
              opacity: 0,
              y: 8,
              scale: 0.95,
              pointerEvents: "none",
            },
  
            hover: {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: "auto",
            },
  
          }}
          transition={{ duration: 0.18 }}
          className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white shadow-xl"
        >
          Hello There 👋
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />
        </motion.div>
      </motion.div>
    );
  }