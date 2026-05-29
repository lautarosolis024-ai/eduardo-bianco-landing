"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, BUSINESS_STATS } from "@/lib/config";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: BUSINESS_STATS.yearsExperience, label: "Años en conflictos" },
    { value: BUSINESS_STATS.casesResolved, label: "Conflictos resueltos" },
    { value: BUSINESS_STATS.daysToResults, label: "Días para resultados" },
    { value: BUSINESS_STATS.satisfactionRate, label: "Tasa de satisfacción" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      role="region"
      aria-labelledby="about-heading"
      className="bg-black pt-24 md:pt-32 pb-8 md:pb-12 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Label */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/60 text-sm tracking-widest uppercase mb-8"
        >
          Sobre mí
        </m.p>

        {/* Heading — contrast fixed */}
        <m.h2
          id="about-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight font-instrument"
        >
          Pionero en{" "}
          <em className="italic text-white/70">resolución</em>
          <br className="hidden md:block" /> para{" "}
          <em className="italic text-white/70">
            familias que buscan justicia
          </em>
        </m.h2>

        {/* Body text — contrast fixed */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 max-w-2xl"
        >
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Economista, Contador Público y Mediador con más de dos décadas de
            experiencia exclusiva en conflictos patrimoniales. He ayudado a
            cientos de familias y empresas a encontrar soluciones justas donde
            parecían imposibles. Mi enfoque combina rigor técnico con
            sensibilidad humana, porque entiendo que detrás de cada conflicto
            patrimonial hay relaciones que importan.
          </p>

          {/* CTA */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-white/80 hover:text-white text-sm font-medium transition-colors group"
          >
            <MessageCircle className="w-4 h-4" />
            Solicitar consulta gratuita
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </m.div>

        {/* Stats row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="liquid-glass rounded-2xl p-6">
              <p className="text-3xl md:text-4xl font-instrument text-white mb-2" style={{ textShadow: '0 0 20px rgba(212,135,90,0.15)' }}>
                {stat.value}
              </p>
              <p className="text-white/60 text-xs tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
