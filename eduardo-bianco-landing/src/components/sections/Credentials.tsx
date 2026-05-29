"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Briefcase, Building2, Users } from "lucide-react";
import { BUSINESS_STATS } from "@/lib/config";

const credentials = [
  {
    icon: GraduationCap,
    text: "Lic. en Economía / Contador Público / MBA",
  },
  {
    icon: Briefcase,
    text: `${BUSINESS_STATS.consultingYears} años como Consultor Internacional`,
  },
  {
    icon: Building2,
    text: "Ex directivo de la UIA y ex-Jefe de Gabinete de la Secretaría de Industria",
  },
  {
    icon: Briefcase,
    text: "Empresario con experiencia en sectores productivos",
  },
];

export default function Credentials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="credentials"
      ref={ref}
      role="region"
      aria-labelledby="credentials-heading"
      className="bg-black py-20 md:py-32 px-6 overflow-hidden relative"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="credentials-heading" className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument mb-4">
            Credenciales y{" "}
            <em className="italic text-white/70">equipo</em>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Experiencia sólida respaldada por formación académica y trayectoria profesional.
          </p>
        </m.div>

        {/* Eduardo's Profile */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
            {/* Professional headshot */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0 overflow-hidden border-2 border-white/10">
              <Image
                src="/eduardo-bianco-headshot.png"
                alt="Eduardo Julio Bianco — Economista, Contador y Mediador"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Eduardo Julio Bianco</h3>
              <p className="text-white/60 text-sm font-medium mb-4">
                Economista &middot; Contador &middot; Mediador
              </p>
              <ul className="space-y-3">
                {credentials.map((cred, i) => {
                  const IconComp = cred.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <IconComp className="h-4 w-4 text-white/60 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/70">{cred.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </m.div>

        {/* Team description */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 text-white/60" />
            <h3 className="text-lg font-bold text-white">Equipo interdisciplinario</h3>
          </div>
          <p className="text-white/70 leading-relaxed">
            Contamos con un equipo de profesionales especializados: Contadores, Abogados,
            Ingenieros Agrónomos, Agrimensores y más. Cada conflicto recibe el
            abordaje profesional que necesita.
          </p>
        </m.div>
      </div>
    </section>
  );
}
