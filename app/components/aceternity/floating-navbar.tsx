"use client";

// Adapted from https://ui.aceternity.com/registry/floating-navbar.json.
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type NavItem = { name: string; link: string; icon: ReactNode };

export function FloatingNav({ home, navItems }: { home: ReactNode; navItems: NavItem[] }) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const shown = visible || focused;

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const direction = current - (scrollYProgress.getPrevious() ?? current);
    if (current < .05) setVisible(false);
    else if (direction !== 0) setVisible(direction < 0);
  });

  return (
    <motion.nav
      className="floating-nav nav-glass"
      aria-label="Main"
      data-visible={shown}
      initial={false}
      animate={{ y: shown || reduced ? 0 : -90, opacity: shown ? 1 : 0 }}
      transition={{ duration: reduced || focused ? 0 : .2, ease: "easeOut" }}
      onFocusCapture={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <Link href="/" className="floating-nav-home" aria-label="Home">{home}</Link>
      {navItems.map(({ name, link, icon }) => (
        <Link key={link} href={link} className="floating-nav-link" aria-label={name}>
          <span className="floating-nav-icon" aria-hidden="true">{icon}</span>
          <span className="floating-nav-label">{name}</span>
        </Link>
      ))}
    </motion.nav>
  );
}
