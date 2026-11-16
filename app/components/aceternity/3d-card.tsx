"use client";

// Adapted from https://ui.aceternity.com/registry/3d-card.json.
import { useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

export function CardContainer({ children, className }: { children: ReactNode; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  return (
    <div
      className={`tilt-frame ${className}`}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !containerRef.current) return;
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - left - width / 2) / width;
        const y = (event.clientY - top - height / 2) / height;
        containerRef.current.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
        containerRef.current.dataset.tilted = "true";
      }}
      onPointerLeave={() => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = "";
        delete containerRef.current.dataset.tilted;
      }}
    >
      <div className="tilt-body" ref={containerRef}>
        <div className="tilt-item">{children}</div>
      </div>
    </div>
  );
}
