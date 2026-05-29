"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { methodologySteps } from "@/data/methodology";
import { Search, Ear, Calculator, MessageSquare, FileCheck } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Search,
  Ear,
  Calculator,
  MessageSquare,
  FileCheck,
};

export default function Methodology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="methodology"
      ref={ref}
      role="region"
      aria-labelledby="methodology-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      {/* Subtle radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="methodology-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Nuestra{" "}
            <em className="italic text-white/70">metodología</em>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Un proceso claro y probado de 5 pasos para resolver su conflicto patrimonial.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex items-start justify-between gap-2 relative" role="list" aria-label="Metodología de 5 pasos">
          {/* Connecting line */}
          <div className="absolute top-6 left-[10%] right-[10%] h-px bg-white/20" />

          {methodologySteps.map((step, i) => {
            const IconComponent = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="flex flex-col items-center flex-1 relative z-10"
                role="listitem"
              >
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-4 shadow-lg shadow-white/10" aria-hidden="true">
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-white/70 mb-2">Paso {step.step}</span>
                <h3 className="text-sm font-semibold text-white text-center mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-white/70 text-center leading-relaxed max-w-[180px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0 relative" role="list" aria-label="Metodología de 5 pasos">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20" />

          {methodologySteps.map((step, i) => {
            const IconComponent = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex gap-4 items-start relative pb-8 last:pb-0"
                role="listitem"
              >
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 z-10 shadow-lg shadow-white/10" aria-hidden="true">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold text-white/70">Paso {step.step}</span>
                  <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
