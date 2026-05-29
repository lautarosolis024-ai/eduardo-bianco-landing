"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { VIDEO_URLS } from "@/lib/config";
import LazyVideo from "./LazyVideo";

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="enfoque"
      ref={ref}
      role="region"
      aria-labelledby="enfoque-heading"
      className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Visually hidden heading for aria-labelledby */}
        <h2 id="enfoque-heading" className="sr-only">Nuestro Enfoque</h2>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden aspect-video relative"
        >
          <LazyVideo
            src={VIDEO_URLS.featured}
            poster="/og-image.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
                <p className="text-white/70 text-xs tracking-widest uppercase mb-3">
                  Nuestro Enfoque
                </p>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  Creemos en el poder de la resolución dialogada. Cada caso
                  comienza con una escucha profunda, y cada solución se
                  construye sobre la base de la equidad y el respeto. Nuestro
                  método ha demostrado resultados concretos en más de 500
                  conflictos resueltos.
                </p>
              </div>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 self-start md:self-auto"
              >
                Conocer más
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
