"use client";

import { useEffect } from "react";
import { getWhatsAppUrl } from "@/lib/config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log only the message and digest — never the full stack in production
    console.error("Application error:", error.message, error.digest ? `digest: ${error.digest}` : "");
  }, [error]);

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-6"
      role="alert"
    >
      <div className="liquid-glass rounded-2xl p-8 md:p-12 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl" aria-hidden="true">⚠</span>
          <span className="sr-only">Error</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Algo salió mal</h2>
        <p className="text-white/70 text-sm mb-6 leading-relaxed">
          Ocurrió un error inesperado. Intente nuevamente o contáctese por WhatsApp.
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={reset}
            className="w-full bg-[#1B3A5C] hover:bg-[#2A5A8A] text-white rounded-xl py-3 text-sm font-semibold transition-colors min-h-[44px]"
          >
            Intentar de nuevo
          </button>
          <a
            href={getWhatsAppUrl("Hola Eduardo, tengo un conflicto patrimonial y me gustaría consultarle.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full liquid-glass rounded-xl py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px] inline-flex items-center justify-center"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
