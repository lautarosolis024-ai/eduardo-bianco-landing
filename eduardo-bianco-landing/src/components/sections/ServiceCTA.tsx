"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";

interface ServiceCTAProps {
  whatsappMessage: string;
  serviceName: string;
}

export default function ServiceCTA({
  whatsappMessage,
  serviceName,
}: ServiceCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-black py-16 md:py-24 px-6"
    >
      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 text-center relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,135,90,0.05)_0%,_transparent_60%)] pointer-events-none rounded-3xl" />

        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white tracking-tight font-instrument mb-4">
          ¿Necesitás ayuda con{" "}
          <em className="italic text-white/70">{serviceName.toLowerCase()}</em>?
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-lg mx-auto">
          La primera consulta es sin compromiso. Evaluamos su caso y le
          presentamos un plan con costos predecibles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#D4875A] hover:bg-[#c77a4f] text-white rounded-full px-8 py-4 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cta-primary min-h-[52px]"
          >
            <MessageCircle className="w-5 h-5" />
            Consulta sin cargo
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/#contact-form"
            className="flex items-center justify-center gap-2 liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" />
            Complete el formulario
          </a>
        </div>

        <p className="text-white/50 text-xs mt-6">
          500+ conflictos resueltos · 20+ años de experiencia · Consulta inicial gratuita
        </p>
      </m.div>
    </section>
  );
}
