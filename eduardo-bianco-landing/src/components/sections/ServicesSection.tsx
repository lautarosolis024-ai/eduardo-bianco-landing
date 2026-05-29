"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl, VIDEO_URLS } from "@/lib/config";
import LazyVideo from "./LazyVideo";

const services = [
  {
    videoUrl: VIDEO_URLS.serviceMediacion,
    tag: "Mediación",
    title: "Diálogo & Acuerdo",
    description:
      "Facilitamos conversaciones constructivas entre partes en conflicto para alcanzar acuerdos justos y duraderos sin necesidad de litigios costosos. Nuestra mediación protege las relaciones mientras resuelve el fondo del conflicto.",
    ctaLabel: "Consultar mediación",
  },
  {
    videoUrl: VIDEO_URLS.servicePeritaje,
    tag: "Peritaje",
    title: "Análisis & Valoración",
    description:
      "Realizamos peritajes económicos y contables de alta complejidad para esclarecer el valor real de bienes, empresas y patrimonios compartidos. Cada informe es una herramienta estratégica para la negociación.",
    ctaLabel: "Consultar peritaje",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      role="region"
      aria-labelledby="services-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]">
        {/* Header row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2 id="services-heading" className="text-3xl md:text-5xl text-white tracking-tight font-instrument">
            Lo que hacemos
          </h2>
          <span className="text-white/60 text-sm hidden md:inline">
            Nuestros servicios
          </span>
        </m.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <m.div
              key={service.tag}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="liquid-glass rounded-3xl overflow-hidden group"
            >
              {/* Card video area */}
              <div className="relative aspect-video overflow-hidden">
                <LazyVideo
                  src={service.videoUrl}
                  poster="/og-image.png"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-xs tracking-widest uppercase">
                    {service.tag}
                  </span>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-instrument">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Actionable CTA button — links to WhatsApp */}
                <a
                  href={getWhatsAppUrl(`Hola Eduardo, necesito una consulta sobre ${service.tag.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full px-5 py-2.5 transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  {service.ctaLabel}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
