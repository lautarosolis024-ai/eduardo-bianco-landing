"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-md z-40 liquid-glass rounded-2xl p-5"
          role="dialog"
          aria-label="Consentimiento de cookies"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-white/60 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                Utilizamos cookies de análisis para mejorar nuestro sitio. No utilizamos cookies publicitarias. Al continuar navegando, acepta su uso conforme a la Ley 25.326.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={accept}
                  className="bg-white hover:bg-white/90 text-black text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Aceptar
                </button>
                <button
                  onClick={decline}
                  className="text-white/60 hover:text-white text-xs font-medium transition-colors"
                >
                  Solo necesarias
                </button>
              </div>
            </div>
            <button
              onClick={decline}
              className="text-white/40 hover:text-white/70 transition-colors shrink-0"
              aria-label="Cerrar aviso de cookies"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
