"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 flex items-center justify-center w-12 h-12 liquid-glass rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px]"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
