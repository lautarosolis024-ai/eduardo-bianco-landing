"use client";

import { useEffect } from "react";

/**
 * Locks body scroll when `locked` is true.
 * Prevents background scrolling when a modal/dialog is open.
 * Restores original overflow on unmount or when `locked` becomes false.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}
