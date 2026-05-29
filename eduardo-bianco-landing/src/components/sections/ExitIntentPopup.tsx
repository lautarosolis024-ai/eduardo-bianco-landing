"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, BookOpen, ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";

const EXIT_INTENT_KEY = "eb-exit-intent-dismissed";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(EXIT_INTENT_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session or on mobile (no mouse leave)
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // Exit-intent only works on desktop
    try {
      if (sessionStorage.getItem(EXIT_INTENT_KEY)) return;
    } catch {}

    // Only show after user has been on page for at least 15 seconds
    const minTime = 15000;
    const pageLoaded = Date.now();

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when cursor leaves through the top of the viewport
      if (e.clientY <= 0 && Date.now() - pageLoaded > minTime) {
        setVisible(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Close on Escape key — WCAG requirement for modal dialogs
  useEffect(() => {
    if (!visible) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={dismiss}
            aria-hidden="true"
          />
          {/* Popup */}
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Guía gratuita de conflictos patrimoniales"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="liquid-glass rounded-2xl p-6 sm:p-8 max-w-md w-full pointer-events-auto relative">
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white/70" />
              </div>

              {/* Copy */}
              <h3 className="text-xl font-bold text-white mb-2">
                ¿Se va sin conocer sus opciones?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Descargue nuestra guía gratuita: <strong className="text-white/90">5 errores que cometen las familias en conflictos patrimoniales</strong> — y cómo evitarlos. Sin compromiso.
              </p>

              {/* CTA */}
              <a
                href={getWhatsAppUrl("Hola Eduardo, me interesa la guía gratuita sobre 5 errores en conflictos patrimoniales")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#D4875A] hover:bg-[#c77a4f] text-white rounded-xl py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[48px] cta-primary"
              >
                Quiero la guía gratuita
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={dismiss}
                className="w-full text-white/40 hover:text-white/60 text-xs font-medium mt-4 transition-colors"
              >
                No gracias, ya tengo todo resuelto
              </button>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
