"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { contactFormSchema, conflictTypeLabels } from "@/lib/validations";
import { getWhatsAppUrl } from "@/lib/config";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    conflictType: "",
    description: "",
    honeypot: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "loading") return;

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      const fieldErrs = result.error.flatten().fieldErrors;
      for (const [key, msgs] of Object.entries(fieldErrs)) {
        if (msgs && msgs.length > 0) errors[key] = msgs[0];
      }
      setFieldErrors(errors);
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormState("success");
        setFormData({ name: "", phone: "", email: "", conflictType: "", description: "", honeypot: "" });
      } else {
        setFormState("error");
        setErrorMessage(data.message || "Error al enviar. Intente nuevamente.");
      }
    } catch {
      setFormState("error");
      setErrorMessage("Error de conexión. Intente nuevamente o contáctese por WhatsApp.");
    }
  };

  const inputClasses =
    "w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors text-sm";
  const labelClasses = "block text-white/70 text-sm font-medium mb-2";
  const errorClasses = "text-red-400 text-xs mt-1";

  return (
    <section id="contact-form" role="region" aria-labelledby="contact-form-heading" className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 id="contact-form-heading" className="text-4xl md:text-6xl text-white tracking-tight font-instrument mb-4">
            Consulte sin{" "}
            <em className="italic text-white/70">compromiso</em>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
            Complete el formulario y nos pondremos en contacto dentro de 24 horas.
          </p>
        </motion.div>

        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass rounded-2xl p-8 text-center"
          >
            <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Consulta enviada</h3>
            <p className="text-white/60">
              Responderemos dentro de 24 horas hábiles. Gracias por su confianza.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-5"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => handleChange("honeypot", e.target.value)}
              className="absolute -left-[9999px] opacity-0 h-0 w-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="name" className={labelClasses}>
                Nombre completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Su nombre"
                className={inputClasses}
                required
                aria-required="true"
                autoComplete="name"
              />
              {fieldErrors.name && <p className={errorClasses}>{fieldErrors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Teléfono *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+54 11 ..."
                  className={inputClasses}
                  required
                  aria-required="true"
                  autoComplete="tel"
                />
                {fieldErrors.phone && <p className={errorClasses}>{fieldErrors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="su@email.com"
                  className={inputClasses}
                  required
                  aria-required="true"
                  autoComplete="email"
                />
                {fieldErrors.email && <p className={errorClasses}>{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="conflictType" className={labelClasses}>
                Tipo de conflicto *
              </label>
              <select
                id="conflictType"
                name="conflictType"
                value={formData.conflictType}
                onChange={(e) => handleChange("conflictType", e.target.value)}
                className={`${inputClasses} appearance-none cursor-pointer`}
                required
                aria-required="true"
              >
                <option value="" className="bg-black text-white">
                  Seleccione...
                </option>
                {Object.entries(conflictTypeLabels).map(([key, label]) => (
                  <option key={key} value={key} className="bg-black text-white">
                    {label}
                  </option>
                ))}
              </select>
              {fieldErrors.conflictType && (
                <p className={errorClasses}>{fieldErrors.conflictType}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className={labelClasses}>
                Describa su situación *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Cuéntenos brevemente sobre su conflicto patrimonial..."
                rows={4}
                maxLength={2000}
                className={`${inputClasses} resize-none`}
                required
                aria-required="true"
              />
              <div className="flex items-center justify-between mt-1">
                {fieldErrors.description ? (
                  <p className={errorClasses}>{fieldErrors.description}</p>
                ) : (
                  <span />
                )}
                <span className="text-white/40 text-xs">{formData.description.length}/2000</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full bg-white hover:bg-white/90 text-black rounded-xl py-4 text-base font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[52px]"
            >
              {formState === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar consulta
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {formState === "error" && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-300 font-medium">{errorMessage}</p>
                  <a
                    href={getWhatsAppUrl(
                      "Hola Eduardo, tengo un conflicto patrimonial y me gustaría consultarle."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-medium mt-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    O contáctese por WhatsApp
                  </a>
                </div>
              </div>
            )}
          </motion.form>
        )}
      </div>
    </section>
  );
}
