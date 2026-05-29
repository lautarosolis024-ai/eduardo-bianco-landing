"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useInView } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl, VIDEO_URLS } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import LazyVideo from "./LazyVideo";

const featuredServices = [
  {
    videoUrl: VIDEO_URLS.serviceMediacion,
    tag: "Mediación",
    title: "Diálogo & Acuerdo",
    description:
      "Facilitamos conversaciones constructivas entre partes en conflicto para alcanzar acuerdos justos y duraderos sin necesidad de litigios costosos. Nuestra mediación protege las relaciones mientras resuelve el fondo del conflicto.",
    ctaLabel: "Consultar mediación",
    slug: "mediacion-patrimonial",
  },
  {
    videoUrl: VIDEO_URLS.servicePeritaje,
    tag: "Peritaje",
    title: "Análisis & Valoración",
    description:
      "Realizamos peritajes económicos y contables de alta complejidad para esclarecer el valor real de bienes, empresas y patrimonios compartidos. Cada informe es una herramienta estratégica para la negociación.",
    ctaLabel: "Consultar peritaje",
    slug: "peritaje-economico",
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
      className="bg-black py-20 md:py-32 px-6 overflow-hidden"
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

        {/* Featured cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {featuredServices.map((service, i) => (
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
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Actionable CTAs — WhatsApp + Service page link */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppUrl(`Hola Eduardo, necesito una consulta sobre ${service.tag.toLowerCase()}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full px-5 py-2.5 transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {service.ctaLabel}
                  </a>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-1 text-[#1B3A5C] hover:text-[#2A5A8A] text-sm font-medium transition-colors min-h-[44px] px-2"
                  >
                    Ver más
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* All services links */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
        >
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="liquid-glass rounded-xl p-4 text-center hover:bg-white/5 transition-colors group min-h-[80px] flex items-center justify-center"
            >
              <span className="text-white/70 group-hover:text-white text-xs sm:text-sm font-medium transition-colors">
                {service.breadcrumbName}
              </span>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
}
