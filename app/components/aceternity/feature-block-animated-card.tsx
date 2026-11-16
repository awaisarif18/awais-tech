"use client";

// Adapted from https://ui.aceternity.com/registry/cards-demo-3.json.
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import styles from "./feature-block-animated-card.module.css";

export function FeatureBlockAnimatedCard({
  tools,
  skills,
}: {
  tools: { name: string; icon: ReactNode }[];
  skills: string[];
}) {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: .45 });
  const reduced = useReducedMotion();
  const active = inView && !reduced;

  return (
    <div className={styles.card}>
      <div className={styles.stage} ref={stage} aria-hidden="true">
        <div className={styles.orbit}>
          {tools.map(({ name, icon }, index) => (
            <motion.span
              key={name}
              title={name}
              className={styles.circle}
              initial={false}
              animate={active ? { scale: [1, 1.12, 1], y: [0, -5, 0] } : { scale: 1, y: 0 }}
              transition={active ? { duration: .55, delay: index * .36, ease: "easeInOut" } : { duration: 0 }}
            >{icon}</motion.span>
          ))}
          <motion.div
            className={styles.scan}
            initial={false}
            animate={active ? { x: ["0%", "100%"], opacity: [0, 1, 1, 0] } : { x: "0%", opacity: 0 }}
            transition={active ? {
              x: { duration: 2.3, ease: "linear" },
              opacity: { duration: 2.3, times: [0, .18, .82, 1] },
            } : { duration: 0 }}
          >
            <span className={styles.beam} />
            <span className={styles.sparkles} />
          </motion.div>
        </div>
      </div>
      <div className={styles.details}>
        <div>
          <h3>Technologies</h3>
          <ul className={styles.tools}>
            {tools.map(({ name }) => <li key={name}>{name}</li>)}
          </ul>
        </div>
        <div>
          <h3>Skills Applied</h3>
          <ul className={styles.skills}>
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
