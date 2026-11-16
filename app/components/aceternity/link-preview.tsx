"use client";

// Adapted from https://ui.aceternity.com/registry/link-preview.json.
import * as HoverCard from "@radix-ui/react-hover-card";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";

type Props = { url: string; children: ReactNode; className?: string; title: string; screenshot?: boolean };

export function LinkPreview({ children, url, className, title, screenshot = false }: Props) {
  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const destination = url.startsWith("mailto:") ? url.slice(7) : new URL(url).hostname;
  const params = new URLSearchParams({
    url, screenshot: "true", meta: "false", embed: "screenshot.url",
    colorScheme: "dark", "viewport.width": "960", "viewport.height": "600",
  });

  return (
    <HoverCard.Root openDelay={250} closeDelay={100}>
      <HoverCard.Trigger
        href={url}
        className={className}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          x.set((event.clientX - rect.left - rect.width / 2) / 7);
        }}
      >{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="link-preview-position" side="top" align="center" sideOffset={13} collisionPadding={20}>
          <motion.div
            className="link-preview"
            style={{ x: reduced ? 0 : translateX }}
            initial={reduced ? false : { opacity: 0, y: 8, scale: .94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {screenshot && !failed && (
              <Image unoptimized src={`https://api.microlink.io/?${params}`} alt="" width={230} height={144} onError={() => setFailed(true)} />
            )}
            <div className="link-preview-caption">
              <div><strong>{title}</strong><small>{destination}</small></div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
          </motion.div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
