"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VIDEO_URLS } from "@/lib/config";
import LazyVideo from "./LazyVideo";

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="philosophy"
      ref={ref}
      role="region"
      aria-labelledby="philosophy-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          id="philosophy-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-instrument"
        >
          Experiencia{" "}
          <em className="italic text-white/60">×</em> Resolución
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left - Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <LazyVideo
              src={VIDEO_URLS.philosophy}
              poster="/og-image.png"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right - Text blocks */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div>
              <p className="text-white/70 text-xs tracking-widest uppercase mb-4">
                Diálogo sobre confrontación
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Creemos que cada conflicto patrimonial tiene una solución que no
                pasa por el desgaste judicial. Nuestra experiencia nos permite
                encontrar puntos de encuentro donde parece imposible, transformando
                posiciones enfrentadas en acuerdos duraderos que protegen tanto el
                patrimonio como las relaciones personales.
              </p>
            </div>

            <div className="w-full h-px bg-white/10 my-8" />

            <div>
              <p className="text-white/70 text-xs tracking-widest uppercase mb-4">
                Resultados sobre promesas
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                No vendemos falsas expectativas. Cada caso comienza con un
                diagnóstico honesto y un plan con plazos definidos. Nuestro
                compromiso es con los resultados concretos: acuerdos reales,
                plazos cumplidos y la tranquilidad de haber evitado un juicio que
                podría haber durado años.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
