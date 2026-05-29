"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Build Review-only structured data (root LegalService schema is in layout.tsx)
  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Eduardo Bianco — Resolución de Conflictos Patrimoniales",
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewBody: t.quote,
      reviewAspect: t.type,
    })),
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      role="region"
      aria-labelledby="testimonials-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      {/* Review structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="testimonials-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Lo que dicen nuestros{" "}
            <em className="italic text-white/70">clientes</em>
          </h2>

          {/* Social proof: star rating + verified badge */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-0.5" aria-label="5 de 5 estrellas">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4875A] text-[#D4875A]" aria-hidden="true" />
              ))}
            </div>
            <span className="text-white/70 text-sm">Testimonios basados en casos reales</span>
          </div>

          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Resultados reales. Historias reales. Identidades protegidas por confidencialidad.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-white/20 mb-4 shrink-0" aria-hidden="true" />
              <div className="flex items-center gap-0.5 mb-3" aria-label="5 de 5 estrellas">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#D4875A] text-[#D4875A]" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-white/80 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/60 text-xs">{t.context}</p>
                  </div>
                  <span className="liquid-glass rounded-full px-3 py-1 text-white/60 text-[11px] tracking-wider uppercase">
                    {t.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
