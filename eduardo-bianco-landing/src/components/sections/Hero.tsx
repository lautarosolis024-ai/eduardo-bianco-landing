"use client";

import { useRef, useEffect, useCallback } from "react";
import { ArrowRight, MessageCircle, Phone, Globe } from "lucide-react";
import { getWhatsAppUrl, VIDEO_URLS, PHONE_TEL } from "@/lib/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function animateOpacity(
  el: HTMLElement,
  from: number,
  to: number,
  duration: number,
  onDone?: () => void
) {
  const start = performance.now();
  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.style.opacity = String(from + (to - from) * progress);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      onDone?.();
    }
  }
  requestAnimationFrame(tick);
}

const conflictTypes = [
  { id: "herencia", label: "Herencia", emoji: "📜", ariaLabel: "Conflicto de herencia" },
  { id: "socios", label: "Socios", emoji: "🤝", ariaLabel: "Conflicto entre socios" },
  { id: "propiedad", label: "Propiedad", emoji: "🏠", ariaLabel: "Conflicto de propiedad" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  const handleCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    if (prefersReduced) {
      v.style.opacity = "1";
    } else {
      animateOpacity(v, 0, 1, 500);
    }
  }, [prefersReduced]);

  const handleTimeUpdate = useCallback(() => {
    if (prefersReduced) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.duration - v.currentTime <= 0.55) {
      animateOpacity(v, parseFloat(v.style.opacity) || 1, 0, 500);
    }
  }, [prefersReduced]);

  const handleEnded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReduced) {
      v.currentTime = 0;
      v.play().catch(() => {});
      return;
    }
    v.style.opacity = "0";
    setTimeout(() => {
      v.currentTime = 0;
      v.play().catch(() => {});
      animateOpacity(v, 0, 1, 500);
    }, 100);
  }, [prefersReduced]);

  const handleVideoError = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    // Show poster fallback if video fails to load
    v.style.display = "none";
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("timeupdate", handleTimeUpdate);
    v.addEventListener("ended", handleEnded);
    v.addEventListener("error", handleVideoError);
    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("timeupdate", handleTimeUpdate);
      v.removeEventListener("ended", handleEnded);
      v.removeEventListener("error", handleVideoError);
    };
  }, [handleCanPlay, handleTimeUpdate, handleEnded, handleVideoError]);

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col">
      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Saltar al contenido
      </a>

      {/* Background video (decorative — no speech) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom video-fade"
        style={{ opacity: 0 }}
        src={VIDEO_URLS.hero}
        muted
        autoPlay
        playsInline
        preload="auto"
        poster="/og-image.png"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero content */}
      <div id="main-content" className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%] md:-translate-y-[20%]">
        {/* Differentiator headline: credentials as hero statement */}
        <div className="flex items-center gap-2 mb-6">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-white/70 text-xs font-medium tracking-wide">
            Economista · Contador · Mediador
          </span>
        </div>

        {/* Main headline — "conflictos" is brightest (the key word) */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight font-instrument mb-4">
          Resolvemos{" "}
          <em className="italic text-white">conflictos</em>
        </h1>

        {/* Differentiator sub-headline — WHY this person, not any lawyer */}
        <p className="text-white/80 text-lg md:text-xl font-medium mb-2 font-instrument">
          Economista, Contador y Mediador — no solo abogado
        </p>

        {/* Speed differentiator — linked to methodology for proof */}
        <a href="#methodology" className="text-white/90 text-lg md:text-xl font-semibold mb-6 font-instrument hover:text-white transition-colors inline-block">
          Resultados en 30–120 días
        </a>

        {/* Audience-segmented quick-select pills */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-white/60 text-xs mb-3">¿Qué conflicto tiene?</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {conflictTypes.map((ct) => (
              <a
                key={ct.id}
                href={getWhatsAppUrl(`Hola Eduardo, tengo un conflicto de ${ct.label.toLowerCase()} y necesito una consulta.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 text-xs sm:text-sm font-medium transition-colors"
                aria-label={ct.ariaLabel}
              >
                <span className="mr-1" aria-hidden="true">{ct.emoji}</span> {ct.label}
              </a>
            ))}
          </div>
        </div>

        {/* Dual CTA — WhatsApp (primary) + Form (secondary) */}
        <div className="max-w-md w-full mb-6 flex flex-col gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-black rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10 min-h-[52px]"
          >
            <MessageCircle className="w-5 h-5" />
            Consulta sin cargo
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact-form"
            className="flex items-center justify-center gap-2 liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" />
            O complete el formulario
          </a>
        </div>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed px-4 max-w-lg">
          Más de 20 años resolviendo conflictos patrimoniales donde la familia y
          el dinero se cruzan. Sin juicios. Sin desgaste.
        </p>

        {/* Urgency badge + trust signal */}
        <div className="mt-3 flex flex-col items-center gap-1">
          <p className="text-white/60 text-xs">
            Consulta gratuita · Cupos limitados mensuales
          </p>
          <p className="text-white/50 text-xs">
            ★ ★ ★ ★ ★ 500+ conflictos resueltos
          </p>
        </div>
      </div>

      {/* Social icons footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="WhatsApp">
          <MessageCircle className="w-5 h-5" />
        </a>
        <a href={`tel:${PHONE_TEL}`} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Teléfono">
          <Phone className="w-5 h-5" />
        </a>
        <a href="#contact" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Contacto">
          <Globe className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
