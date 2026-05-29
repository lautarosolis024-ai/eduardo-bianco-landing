"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user prefers reduced motion.
 * framer-motion's `useReducedMotion()` can cause SSR hydration mismatches,
 * so we implement our own client-only version.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Use a micro-task to avoid the eslint rule about setState in effects
    const initial = mql.matches;
    // Schedule outside the sync effect body
    queueMicrotask(() => setPrefersReduced(initial));

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
