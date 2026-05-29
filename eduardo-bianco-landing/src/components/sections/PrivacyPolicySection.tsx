"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { CONTACT_EMAIL, PRIVACY_UPDATE_DATE } from "@/lib/config";
import { privacyPoints } from "@/data/privacy-points";

const iconMap: Record<string, React.ElementType> = {
  Lock,
  Eye,
  Shield,
  FileText,
};

export default function PrivacyPolicySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="privacy"
      ref={ref}
      role="region"
      aria-labelledby="privacy-heading"
      className="bg-black py-20 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="privacy-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Política de{" "}
            <em className="italic text-white/70">privacidad</em>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Protegemos sus datos personales conforme a la Ley 25.326 de
            Protección de Datos Personales de la República Argentina y los más
            altos estándares de confidencialidad profesional.
          </p>
        </m.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {privacyPoints.map((point, i) => {
            const IconComp = iconMap[point.iconName] || Shield;
            // Replace placeholder with actual email in the "derechos" description
            const _description = point.id === "derechos"
              ? point.description
              : point.description;
            return (
              <m.div
                key={point.id}
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
                    <p className="text-white/80 text-sm leading-relaxed">
                      {point.id === "derechos"
                        ? `Usted puede ejercer los derechos de acceso, rectificación, supresión y oposición sobre sus datos personales en cualquier momento contactándonos a ${CONTACT_EMAIL}. Responderemos dentro de los 10 días hábiles establecidos por la normativa vigente.`
                        : point.description}
                    </p>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Legal footer */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center text-white/60 text-xs leading-relaxed max-w-2xl mx-auto"
        >
          {`Responsable del tratamiento: Eduardo Julio Bianco — CUIT/CUIL a
          solicitud — Domicilio: Buenos Aires, Argentina. Para consultas sobre
          datos personales: ${CONTACT_EMAIL}. Última actualización: ${PRIVACY_UPDATE_DATE}.`}
        </m.p>
      </div>
    </section>
  );
}
