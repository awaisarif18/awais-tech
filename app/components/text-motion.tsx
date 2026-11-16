"use client";

import { AnimatePresence, motion, stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stages = ["Prototype", "Pilot", "Release"];

// Adapted from https://ui.aceternity.com/registry/flip-words.json.
export function FlippingStage() {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.7 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!visible || reduced || stage >= stages.length - 1) return;
    const timer = window.setTimeout(() => setStage(stage + 1), 1050);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, stage]);

  return (
    <span className="flip-stage" ref={ref} aria-hidden="true">
      <span className="flip-stage-fallback">Release</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={stage}
          className="flip-stage-word"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0, filter: "blur(5px)" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {Array.from(stages[stage], (letter, index) => (
            <motion.span
              className="flip-stage-letter"
              key={index}
              initial={stage === 0 ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: stage === 0 ? 0 : index * 0.04, duration: 0.22 }}
            >{letter}</motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Adapted from https://ui.aceternity.com/registry/typewriter-effect.json.
export function Typewriter({ text }: { text: string }) {
  const [scope, animate] = useAnimate();
  const visible = useInView(scope, { once: true });
  const reduced = useReducedMotion();
  const words = Array.from(text.matchAll(/\S+/g));

  useEffect(() => {
    if (!visible || reduced) return;
    const playback = animate(".typewriter-letter", { opacity: [0, 1] }, {
      duration: 0.055,
      delay: stagger(0.024),
      ease: "easeInOut",
    });

    return () => playback.stop();
  }, [animate, visible, reduced]);

  return (
    <p className="typewriter">
      <span className="visually-hidden">{text}</span>
      <span ref={scope} aria-hidden="true">
        {words.map(({ 0: word, index: offset }) => (
          <span key={offset}>
            <span className="typewriter-word">
              {Array.from(word, (char, letter) => (
                <span key={letter} className="typewriter-letter">{char}</span>
              ))}
            </span>{" "}
          </span>
        ))}
      </span>
    </p>
  );
}
