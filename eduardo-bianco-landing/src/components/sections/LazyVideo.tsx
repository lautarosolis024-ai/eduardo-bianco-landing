"use client";

import { useRef, useEffect, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: string;
  /** Whether the video has meaningful audio/speech. If false (default), video is marked decorative via aria-hidden. */
  hasSpokenContent?: boolean;
  ariaLabel?: string;
}

/**
 * LazyVideo only sets the `src` attribute when the video element
 * enters the viewport (via IntersectionObserver). This prevents
 * below-fold videos from consuming bandwidth on initial page load.
 *
 * By default, videos are treated as decorative (aria-hidden="true")
 * since they are typically ambient background videos without speech.
 * Set hasSpokenContent={true} and provide ariaLabel for videos with speech.
 */
export default function LazyVideo({
  src,
  poster,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "none",
  hasSpokenContent = false,
  ariaLabel,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // If no IntersectionObserver, load immediately
  const [shouldLoad, setShouldLoad] = useState(
    typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Already loading (no IO support — set in useState init)
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" } // Start loading 400px before entering viewport for smoother experience
    );

    observer.observe(el);

    // Fallback: if IntersectionObserver hasn't fired within 8 seconds,
    // load the video anyway (handles edge cases where IO doesn't fire)
    const fallbackTimer = setTimeout(() => {
      setShouldLoad(true);
      observer.disconnect();
    }, 8000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Decorative videos (no speech) get aria-hidden; content videos get aria-label
  const ariaProps = hasSpokenContent && ariaLabel
    ? { "aria-label": ariaLabel }
    : { "aria-hidden": true as const };

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted={muted}
      autoPlay={shouldLoad ? autoPlay : false}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      {...ariaProps}
    />
  );
}
