"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "@/data/case-studies";
import { Users, Handshake, Car } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Users, Handshake, Car };

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cases"
      ref={ref}
      role="region"
      aria-labelledby="cases-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="cases-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Casos de{" "}
            <em className="italic text-white/70">éxito</em>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Resultados concretos que demuestran nuestra capacidad para resolver conflictos patrimoniales complejos.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((cs, i) => {
            const IconComponent = iconMap[cs.icon] || Users;
            return (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="liquid-glass rounded-2xl p-6 sm:p-8 group hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <IconComponent className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cs.title}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                      Conflicto
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">{cs.conflict}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                      Abordaje
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">{cs.approach}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 mt-4">
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                      Resultado
                    </p>
                    <p className="text-white text-sm font-medium leading-relaxed">{cs.result}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
