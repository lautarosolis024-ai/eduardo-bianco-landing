"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_DISPLAY, CONTACT_EMAIL } from "@/lib/config";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      role="region"
      aria-labelledby="contact-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <m.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 font-instrument"
        >
          Hablemos de{" "}
          <em className="italic text-white/70">su caso</em>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-base md:text-lg max-w-xl mb-16 leading-relaxed"
        >
          La primera consulta es sin compromiso. Cuénteme su situación y
          encontraremos juntos el mejor camino para resolver su conflicto
          patrimonial.
        </m.p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <m.a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="liquid-glass rounded-2xl p-6 md:p-8 group hover:bg-white/5 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-white/70 mb-4 group-hover:text-white transition-colors" />
            <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
              WhatsApp
            </p>
            <p className="text-white text-lg mb-2 font-medium">{WHATSAPP_DISPLAY}</p>
            <p className="text-white/70 text-sm">
              Respuesta inmediata en horario hábil
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/60 mt-4 group-hover:text-white transition-colors" />
          </m.a>

          <m.a
            href={`mailto:${CONTACT_EMAIL}`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            whileHover={{ scale: 1.02 }}
            className="liquid-glass rounded-2xl p-6 md:p-8 group hover:bg-white/5 transition-colors"
          >
            <Mail className="w-6 h-6 text-white/70 mb-4 group-hover:text-white transition-colors" />
            <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
              Email
            </p>
            <p className="text-white text-lg mb-2 font-medium">{CONTACT_EMAIL}</p>
            <p className="text-white/70 text-sm">
              Respuesta en 24 horas hábiles
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/60 mt-4 group-hover:text-white transition-colors" />
          </m.a>

          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="liquid-glass rounded-2xl p-6 md:p-8"
          >
            <MapPin className="w-6 h-6 text-white/70 mb-4" />
            <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
              Oficina
            </p>
            <p className="text-white text-lg mb-2 font-medium">Buenos Aires</p>
            <p className="text-white/70 text-sm">
              Argentina. Consultas presenciales y virtuales.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
