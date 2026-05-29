"use client";

import Link from "next/link";
import { Globe, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, CONTACT_EMAIL } from "@/lib/config";
import { servicesData } from "@/lib/services-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#about", label: "Nosotros" },
    { href: "#services", label: "Servicios" },
    { href: "#philosophy", label: "Filosofía" },
    { href: "#methodology", label: "Método" },
    { href: "#cases", label: "Casos" },
    { href: "#contact-form", label: "Contacto" },
    { href: "#faq", label: "FAQ" },
  ];

  const legalLinks = [
    { href: "#privacy", label: "Privacidad" },
    { href: `mailto:${CONTACT_EMAIL}?subject=Solicitud de ejercicio de derechos ARCO`, label: "Derechos ARCO" },
  ];

  return (
    <footer className="bg-black border-t border-white/5 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-white/60" />
              <span className="text-white font-semibold">
                Eduardo Bianco
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Especialista en resolución de conflictos patrimoniales.
              Economista, Contador Público y Mediador con más de 20 años
              de experiencia. Herencias, socios, propiedades compartidas.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20BD5A] text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Navegación
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Services (NEW) */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Servicios
            </h3>
            <nav className="flex flex-col gap-2">
              {servicesData.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {service.breadcrumbName}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Legal + Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Legal
            </h3>
            <nav className="flex flex-col gap-2 mb-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <h3 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">
              Contacto
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-xs text-center md:text-left">
              &copy; {currentYear} Eduardo Bianco &middot; Economista &middot; Contador Público &middot; Mediador
            </p>
            <p className="text-white/60 text-xs text-center md:text-right">
              Protección de datos personales conforme a la Ley 25.326
            </p>
          </div>
          <p className="text-white/40 text-[11px] text-center leading-relaxed max-w-3xl mx-auto">
            Este sitio no constituye asesoramiento legal. Los servicios de mediación no equivalen a patrocinio jurídico. Cada caso es particular y los resultados pueden variar.
          </p>
        </div>
      </div>
    </footer>
  );
}
