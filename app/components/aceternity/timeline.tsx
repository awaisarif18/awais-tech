"use client";

// Adapted from https://ui.aceternity.com/registry/timeline.json.
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Timeline({ children, className = "" }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 72%", "end 72%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 175, damping: 32, mass: .35, skipInitialAnimation: true });
  const heightTransform = useTransform(progress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(progress, [0, 0.14], [0, 1]);

  return (
    <ol className={`timeline ${className}`} ref={containerRef}>
      <li className="timeline-rail" role="presentation" aria-hidden="true">
        <motion.span className="timeline-progress" style={{ height: reduced ? "100%" : heightTransform, opacity: reduced ? 1 : opacityTransform }} />
      </li>
      {children}
    </ol>
  );
}
