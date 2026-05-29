"use client";

import { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto cuesta una consulta?",
    answer:
      "La primera consulta es gratuita y sin compromiso. Durante esa reunión evaluamos su caso y le presentamos un plan con costos predecibles y plazos definidos. A diferencia del litigio, nuestros honorarios son fijos y transparentes desde el inicio, sin sorpresas ni costas judiciales adicionales.",
  },
  {
    question: "¿En cuánto tiempo se resuelve un conflicto?",
    answer:
      "La mayoría de nuestros casos se resuelven entre 30 y 120 días, dependiendo de la complejidad y la cantidad de partes involucradas. Un juicio patrimonial tradicional puede tardar de 2 a 5 años. Nuestra metodología está diseñada para obtener resultados rápidos sin sacrificar la calidad del acuerdo.",
  },
  {
    question: "¿Es confidencial el proceso?",
    answer:
      "Absolutamente. A diferencia de un juicio donde los expedientes son públicos, nuestro proceso es 100% confidencial. Ningún detalle de su conflicto aparece en registros públicos. Esto es especialmente importante para familias y empresas que desean proteger su privacidad y reputación.",
  },
  {
    question: "¿Pueden resolverse conflictos sin ir a juicio?",
    answer:
      "En la gran mayoría de los casos, sí. Más del 95% de nuestros casos se resuelven sin necesidad de litigio judicial. Utilizamos mediación, negociación asistida y peritaje para alcanzar acuerdos justos. Solo en casos extremos donde una parte se niega completamente a negociar se evalúa la vía judicial.",
  },
  {
    question: "¿Qué tipo de conflictos atiende?",
    answer:
      "Nos especializamos exclusivamente en conflictos patrimoniales: herencias y sucesiones disputadas, conflictos entre socios o accionistas, problemas de propiedad compartida (campos, departamentos, cocheras), disputas sobre valuación de activos, y cualquier situación donde el dinero y las relaciones se cruzan.",
  },
  {
    question: "¿Trabaja con abogados?",
    answer:
      "Sí, trabajamos en equipo interdisciplinario con abogados, contadores, ingenieros agrónomos y agrimensores según lo requiera cada caso. La diferencia es que nosotros lideramos la resolución del conflicto desde una perspectiva económica y negociadora, no desde la confrontación judicial.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // JSON-LD structured data for Google FAQ rich snippets
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      ref={ref}
      role="region"
      aria-labelledby="faq-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* FAQ structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="faq-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Respuestas claras a las dudas más comunes sobre nuestro enfoque de resolución de conflictos.
          </p>
        </m.div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="liquid-glass rounded-xl overflow-hidden"
              >
                <button
                  id={`faq-button-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-white/5 transition-colors min-h-[44px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-white text-sm sm:text-base font-medium pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/60 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/70 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
