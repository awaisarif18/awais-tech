"use client";

// Adapted from https://ui.aceternity.com/registry/cover.json.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

export function Cover({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  return (
    <span className="word-cover" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <AnimatePresence>
        {hovered && !reduced && (
          <motion.span
            className="word-cover-beam"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [.35, 1, 0] }}
            exit={{ opacity: 0, transition: { duration: .12 } }}
            transition={{ duration: .6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      {children}
    </span>
  );
}
