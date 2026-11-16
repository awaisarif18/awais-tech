"use client";

import { useEffect, useState } from "react";
import type { BackgroundCubesGrid } from "./aceternity/background-cubes-grid";

export function DeferredCubes() {
  const [Grid, setGrid] = useState<typeof BackgroundCubesGrid | null>(null);

  useEffect(() => {
    const eligible = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let disposed = false;
    let loading = false;

    function loadOnPointer(event: PointerEvent) {
      if (loading || !eligible.matches || event.pointerType !== "mouse" || document.readyState !== "complete") return;

      loading = true;
      window.removeEventListener("pointermove", loadOnPointer);
      void import("./aceternity/background-cubes-grid").then(
        ({ BackgroundCubesGrid }) => {
          loading = false;
          if (!disposed && eligible.matches) setGrid(() => BackgroundCubesGrid);
        },
        () => { loading = false; },
      );
    }

    function syncPreference() {
      if (eligible.matches) {
        window.addEventListener("pointermove", loadOnPointer, { passive: true });
      } else {
        window.removeEventListener("pointermove", loadOnPointer);
        setGrid(null);
      }
    }

    syncPreference();
    eligible.addEventListener("change", syncPreference);
    return () => {
      disposed = true;
      eligible.removeEventListener("change", syncPreference);
      window.removeEventListener("pointermove", loadOnPointer);
    };
  }, []);

  if (!Grid) return null;

  return <Grid className="cubes-renderer" cellSize={105} topColor="#14212b" leftColor="#293a46" rightColor="#1c2b36" gap={.052} idleRipples={false} glowColor="#e59268" glow={.7} />;
}
