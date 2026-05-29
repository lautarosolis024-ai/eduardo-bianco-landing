"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Clock, TrendingUp, ListChecks, Shield, X } from "lucide-react";
import { whyChooseUsItems } from "@/data/why-choose-us";

const iconMap: Record<string, React.ElementType> = {
  Clock,
  TrendingUp,
  ListChecks,
  Shield,
};

const comparisons = [
  { we: "Resolución en 30-120 días", they: "Juicios de 2-5 años", icon: Clock },
  { we: "Costo fijo y predecible", they: "Honorarios abiertos + costas judiciales", icon: TrendingUp },
  { we: "Acuerdos que preservan relaciones", they: "Sentencias que destruyen vínculos", icon: ListChecks },
  { we: "100% confidencial", they: "Expedientes públicos", icon: Shield },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="why-us"
      ref={ref}
      role="region"
      aria-labelledby="why-us-heading"
      className="bg-black py-20 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="why-us-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Por qué{" "}
            <em className="italic text-white/70">elegirnos</em>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Combinamos experiencia, metodología y enfoque independiente para resolver su conflicto.
          </p>
        </m.div>

        {/* Strengths cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-16">
          {whyChooseUsItems.map((item, i) => {
            const IconComponent = iconMap[item.icon] || Clock;
            return (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="liquid-glass rounded-2xl p-6 md:p-8 group hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 shrink-0 group-hover:bg-white/10 transition-colors">
                    <IconComponent className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Competitive comparison: Us vs. Abogados tradicionales */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-10">
            <p className="text-white/60 text-sm tracking-widest uppercase mb-2">Comparativa</p>
            <h3 className="text-2xl md:text-4xl text-white font-instrument">
              Resolución vs. <em className="italic text-white/70">Litigio</em>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {comparisons.map((comp, i) => {
              const IconComp = comp.icon;
              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + 0.1 * i }}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* We do */}
                  <div className="liquid-glass rounded-xl p-4 md:p-5 comparison-we">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComp className="w-4 h-4 text-[#D4875A]" />
                      <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Nosotros</span>
                    </div>
                    <p className="text-white text-sm font-medium">{comp.we}</p>
                  </div>
                  {/* They do */}
                  <div className="rounded-xl p-4 md:p-5 bg-white/[0.02] comparison-they">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4 text-white/30" />
                      <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Litigio</span>
                    </div>
                    <p className="text-white/50 text-sm">{comp.they}</p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </m.div>

        {/* Tagline */}
        <m.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-xl sm:text-2xl font-semibold text-white/80 italic font-instrument">
            &ldquo;Entendemos el conflicto, no lo agravamos. Lo resolvemos.&rdquo;
          </p>
        </m.blockquote>
      </div>
    </section>
  );
}
