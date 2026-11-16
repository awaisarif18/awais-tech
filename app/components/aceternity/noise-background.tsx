"use client";

// Adapted from https://ui.aceternity.com/registry/noise-background.json.
import { motion, useAnimationFrame, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const warm = ["#ffc892", "#ed865d", "#ffab95"];
const cool = ["#73998e", "#627bae", "#466e7e"];

export function NoiseBackground({ primary = false }: { primary?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const colors = primary ? warm : cool;

  useAnimationFrame((time) => {
    if (!visible || reduced) return;
    x.set(Math.sin(time / 2100) * 30);
    y.set(Math.cos(time / 1600) * 24);
  });

  return (
    <span className="action-noise" aria-hidden="true" ref={ref}>
      <GradientLayer x={springX} y={springY} color={colors[0]} center={22} multiplier={1} />
      <GradientLayer x={springX} y={springY} color={colors[1]} center={55} multiplier={.7} />
      <GradientLayer x={springX} y={springY} color={colors[2]} center={78} multiplier={1.2} />
      <span className="action-noise-edge" style={{ background: `linear-gradient(90deg, ${colors.join(", ")})` }} />
      <span className="action-noise-grain" />
    </span>
  );
}

function GradientLayer({ x, y, color, center, multiplier }: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  color: string;
  center: number;
  multiplier: number;
}) {
  const gradientX = useTransform(x, (value) => center + value * multiplier);
  const gradientY = useTransform(y, (value) => 48 + value * multiplier);
  const background = useMotionTemplate`radial-gradient(ellipse at ${gradientX}% ${gradientY}%, ${color}, transparent 64%)`;

  return <motion.span className="action-noise-layer" style={{ background }} />;
}
