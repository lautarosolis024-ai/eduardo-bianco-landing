import type { MethodologyStep } from "@/lib/types";

export const methodologySteps: MethodologyStep[] = [
  {
    id: "diagnostico",
    step: 1,
    title: "Diagn\u00f3stico del conflicto",
    description:
      "An\u00e1lisis profundo del caso e identificaci\u00f3n de intereses de las partes.",
    icon: "Search",
  },
  {
    id: "escucha",
    step: 2,
    title: "Escucha activa",
    description:
      "Relevamiento de expectativas y necesidades de cada parte involucrada.",
    icon: "Ear",
  },
  {
    id: "valuacion",
    step: 3,
    title: "Valuaci\u00f3n objetiva de activos",
    description:
      "Transparencia y precisi\u00f3n para reducir disputas sobre el valor de los bienes.",
    icon: "Calculator",
  },
  {
    id: "negociacion",
    step: 4,
    title: "Negociaci\u00f3n y acuerdos",
    description:
      "Puente de di\u00e1logo hasta lograr un acuerdo justo para todas las partes.",
    icon: "MessageSquare",
  },
  {
    id: "formalizacion",
    step: 5,
    title: "Formalizaci\u00f3n legal",
    description:
      "Redacci\u00f3n e implementaci\u00f3n del acuerdo con respaldo legal completo.",
    icon: "FileCheck",
  },
];
