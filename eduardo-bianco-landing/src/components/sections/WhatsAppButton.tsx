"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(
        "Hola Eduardo, tengo un conflicto patrimonial y me gustaría consultarle."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3.5 rounded-full shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all group min-h-[52px] whatsapp-pulse"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
