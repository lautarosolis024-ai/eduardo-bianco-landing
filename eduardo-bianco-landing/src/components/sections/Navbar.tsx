"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const navLinks = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#philosophy", label: "Filosofía" },
  { href: "#methodology", label: "Método" },
  { href: "#contact-form", label: "Contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lock body scroll when mobile menu is open
  useBodyScrollLock(menuOpen);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  // Desktop dropdown: delayed close to allow mouse travel from button → panel
  const scheduleClose = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    if (menuOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [menuOpen, closeMenu]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstEl?.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, [menuOpen]);

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
        <Link href="/" className="flex items-center gap-3">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          <span className="text-white font-semibold text-base sm:text-lg">
            Eduardo Bianco
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) =>
            link.href === "#services" ? (
              <div
                key="services-dropdown"
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setServicesOpen(true);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                    activeSection === "services"
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-controls="services-dropdown-menu"
                >
                  Servicios
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <m.div
                      id="services-dropdown-menu"
                      role="menu"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 lg:left-auto mt-1 liquid-glass rounded-xl p-2 min-w-[240px]"
                    >
                      {servicesData.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          role="menuitem"
                          className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors focus:outline-none focus:bg-white/5 focus:text-white"
                        >
                          {service.breadcrumbName}
                        </Link>
                      ))}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
            )
          )}
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
            href="#contact-form"
            className="liquid-glass rounded-full px-4 sm:px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Contacto
          </a>
          <button
            type="button"
            ref={menuButtonRef}
            className="lg:hidden liquid-glass rounded-full p-2 text-white hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden liquid-glass rounded-2xl max-w-5xl mx-auto mt-2 p-4 flex flex-col gap-1"
          >
            {navLinks
              .filter((link) => link.href !== "#services")
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-base font-medium transition-colors py-2 px-2 ${
                    activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}

            {/* Services section — expandable accordion in mobile */}
            <MobileServicesAccordion
              activeSection={activeSection}
              onClose={closeMenu}
            />

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-white/80 hover:text-white text-base font-medium transition-colors py-2 px-2"
            >
              WhatsApp
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/** Mobile-only accordion for services — replaces the old flat list */
function MobileServicesAccordion({
  activeSection,
  onClose,
}: {
  activeSection: string;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-l border-white/10 ml-2 pl-4">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={`flex items-center justify-between w-full text-base font-medium transition-colors py-2 px-2 ${
          activeSection === "services"
            ? "text-white"
            : "text-white/80 hover:text-white"
        }`}
        aria-expanded={expanded}
        aria-controls="mobile-services-list"
      >
        Servicios
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            id="mobile-services-list"
            role="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                onClick={onClose}
                role="menuitem"
                className="block text-white/70 hover:text-white text-sm font-medium transition-colors py-2 px-2 focus:outline-none focus:text-white"
              >
                {service.breadcrumbName}
              </Link>
            ))}
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block text-white/50 hover:text-white/80 text-xs font-medium transition-colors py-2 px-2"
            >
              Ver todos los servicios →
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
