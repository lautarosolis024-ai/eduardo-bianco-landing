"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "eb-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Slight delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    setVisible(false);
    // Notify AnalyticsConsent component (same-tab storage events don't fire StorageEvent)
    window.dispatchEvent(new CustomEvent("cookie-consent-change"));
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-change"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-40 liquid-glass rounded-2xl p-5 sm:p-6"
          role="dialog"
          aria-label="Consentimiento de cookies"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-white/60 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                Utilizamos cookies de análisis para mejorar nuestro sitio. No utilizamos cookies publicitarias. Al continuar navegando, acepta su uso conforme a la Ley 25.326.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={accept}
                  className="bg-[#D4875A] hover:bg-[#c77a4f] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors min-h-[44px]"
                >
                  Aceptar
                </button>
                <button
                  onClick={decline}
                  className="text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-colors min-h-[44px] px-2"
                >
                  Solo necesarias
                </button>
              </div>
            </div>
            <button
              onClick={decline}
              className="text-white/40 hover:text-white/70 transition-colors shrink-0 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Cerrar aviso de cookies"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
