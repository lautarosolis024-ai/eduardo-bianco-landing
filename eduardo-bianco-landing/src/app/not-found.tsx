import type { Metadata } from "next";
import { getWhatsAppUrl, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Página no encontrada | EB Consulting",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-6"
      role="alert"
      aria-label="Página no encontrada"
    >
      <div className="max-w-md w-full text-center">
        <h1 className="text-8xl text-white mb-4 font-instrument">404</h1>
        <h2 className="text-xl font-semibold text-white mb-3">
          Página no encontrada
        </h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          La página que busca no existe o fue movida. Si necesita ayuda con un
          conflicto patrimonial, no dude en contactarnos.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={SITE_URL}
            className="inline-flex items-center justify-center gap-2 bg-[#1B3A5C] hover:bg-[#2A5A8A] text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors min-h-[44px]"
          >
            Volver al inicio
          </a>
          <a
            href={getWhatsAppUrl("Hola Eduardo, necesito una consulta sobre un conflicto patrimonial.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 liquid-glass rounded-xl px-6 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px]"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
