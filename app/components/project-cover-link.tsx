"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState, type PointerEvent, type ReactNode } from "react";

// Adapted from Aceternity Direction Aware Hover. Only the cover label moves.
// https://ui.aceternity.com/components/direction-aware-hover
export function ProjectCoverLink({ href, title, children }: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function enter(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edges = [y, rect.width - x, rect.height - y, x];
    const side = edges.indexOf(Math.min(...edges));
    setOffset([{ x: 0, y: -8 }, { x: 8, y: 0 }, { x: 0, y: 8 }, { x: -8, y: 0 }][side]);
    setHovered(true);
  }

  return (
    <Link
      href={href}
      aria-label={`Read the ${title} Case Study`}
      className="cover-link"
      onPointerEnter={enter}
      onPointerLeave={() => setHovered(false)}
    >
      {children}
      <span className="cover-affordance" aria-hidden="true">
        <motion.span
          className="cover-link-label"
          initial={false}
          animate={hovered ? { x: 0, y: 0, opacity: 1 } : { ...offset, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
        >
          Read Case Study
        </motion.span>
        <span className="cover-arrow"><ArrowRight size={24} strokeWidth={1.6} /></span>
      </span>
    </Link>
  );
}
