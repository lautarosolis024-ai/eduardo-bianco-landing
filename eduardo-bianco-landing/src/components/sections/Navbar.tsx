"use client";

import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";

const navLinks = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#philosophy", label: "Filosofía" },
  { href: "#methodology", label: "Método" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4">
      <div className="liquid-glass rounded-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          <span className="text-white font-semibold text-base sm:text-lg">
            Eduardo Bianco
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors py-2 ${
                activeSection === link.href.slice(1)
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-medium hover:text-white/80 transition-colors hidden sm:inline"
          >
            Consulta sin cargo
          </a>
          <a
            href="#contact"
            className="liquid-glass rounded-full px-4 sm:px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Contacto
          </a>
          <button
            className="lg:hidden liquid-glass rounded-full p-2 text-white hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden liquid-glass rounded-2xl max-w-5xl mx-auto mt-2 p-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium transition-colors py-2 px-2 ${
                activeSection === link.href.slice(1)
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-white/80 hover:text-white text-base font-medium transition-colors py-2 px-2"
          >
            WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
