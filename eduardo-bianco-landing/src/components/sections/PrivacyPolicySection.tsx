"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/config";

const privacyPoints = [
  {
    icon: Lock,
    title: "Datos que recopilamos",
    description:
      "Solo recopilamos los datos que usted proporciona voluntariamente a través de nuestro formulario de contacto: nombre, teléfono, email y descripción de su situación. No utilizamos cookies de seguimiento ni recolectamos datos de navegación más allá de lo necesario para el funcionamiento del sitio.",
  },
  {
    icon: Eye,
    title: "Finalidad del tratamiento",
    description:
      "Sus datos personales se utilizan exclusivamente para responder su consulta y, en caso de avanzar, para la prestación de servicios profesionales de resolución de conflictos. No compartimos, vendemos ni transferimos sus datos a terceros bajo ninguna circunstancia.",
  },
  {
    icon: Shield,
    title: "Confidencialidad profesional",
    description:
      "Además de la protección legal bajo la Ley 25.326 de Protección de Datos Personales, nuestro ejercicio profesional está regido por el secreto profesional. Esto significa que su información está protegida por una doble capa de confidencialidad: legal y profesional.",
  },
  {
    icon: FileText,
    title: "Sus derechos",
    description:
      `Usted puede ejercer los derechos de acceso, rectificación, supresión y oposición sobre sus datos personales en cualquier momento contactándonos a ${CONTACT_EMAIL}. Responderemos dentro de los 10 días hábiles establecidos por la normativa vigente.`,
  },
];

export default function PrivacyPolicySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="privacy"
      ref={ref}
      role="region"
      aria-labelledby="privacy-heading"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="privacy-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Política de{" "}
            <em className="italic text-white/70">privacidad</em>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Protegemos sus datos personales conforme a la Ley 25.326 de
            Protección de Datos Personales de la República Argentina y los más
            altos estándares de confidencialidad profesional.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {privacyPoints.map((point, i) => {
            const IconComp = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="liquid-glass rounded-2xl p-6 md:p-8 group hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 shrink-0 group-hover:bg-white/10 transition-colors">
                    <IconComp className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legal footer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center text-white/60 text-xs leading-relaxed max-w-2xl mx-auto"
        >
          {`Responsable del tratamiento: Eduardo Julio Bianco — CUIT/CUIL a
          solicitud — Domicilio: Buenos Aires, Argentina. Para consultas sobre
          datos personales: ${CONTACT_EMAIL}. Última actualización: mayo
          2026.`}
        </motion.p>
      </div>
    </section>
  );
}
