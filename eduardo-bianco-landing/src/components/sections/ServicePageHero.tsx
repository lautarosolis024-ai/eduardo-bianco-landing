"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { getWhatsAppUrl, CALENDLY_URL } from "@/lib/config";

interface ServicePageHeroProps {
  h1: string;
  subtitle: string;
  whatsappMessage: string;
}

export default function ServicePageHero({
  h1,
  subtitle,
  whatsappMessage,
}: ServicePageHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      role="region"
      aria-labelledby="service-hero-heading"
      className="min-h-[60vh] md:min-h-[70vh] overflow-hidden relative flex flex-col justify-center px-6 pt-24 pb-16 md:pt-32 md:pb-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[rgba(27,58,92,0.03)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(27,58,92,0.06)_0%,_transparent_50%)]" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-white/50 text-xs">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/#services" className="hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">
                {h1.split(" ").slice(0, 2).join(" ")}
              </li>
            </ol>
          </nav>

          <h1 id="service-hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-6 leading-[1.1]">
            {h1}
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-instrument">
            {subtitle}
          </p>

          {/* Dual CTA */}
          <div className="max-w-md w-full mx-auto flex flex-col gap-3">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#1B3A5C] hover:bg-[#2A5A8A] text-white rounded-full px-8 py-4 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cta-primary min-h-[52px]"
            >
              <MessageCircle className="w-5 h-5" />
              Consulta sin cargo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              Agende su consulta
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
