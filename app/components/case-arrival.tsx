"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function CaseArrival({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="case-content"
      initial={reduceMotion ? false : { opacity: 0.86 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
}
