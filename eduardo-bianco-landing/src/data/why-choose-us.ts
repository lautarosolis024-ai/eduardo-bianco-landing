import type { WhyChooseUsItem } from "@/lib/types";

export interface Comparison {
  id: string;
  we: string;
  they: string;
  iconName: string;
}

export const comparisons: Comparison[] = [
  {
    id: "rapida-vs-lenta",
    we: "Resolución en 30-120 días",
    they: "Juicios de 2-5 años",
    iconName: "Clock",
  },
  {
    id: "fijo-vs-abierto",
    we: "Costo fijo y predecible",
    they: "Honorarios abiertos + costas judiciales",
    iconName: "TrendingUp",
  },
  {
    id: "acuerdo-vs-sentencia",
    we: "Acuerdos que preservan relaciones",
    they: "Sentencias que destruyen vínculos",
    iconName: "ListChecks",
  },
  {
    id: "confidencial-vs-publico",
    we: "100% confidencial",
    they: "Expedientes públicos",
    iconName: "Shield",
  },
];

export const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    id: "rapida-resolucion",
    title: "R\u00e1pida resoluci\u00f3n",
    description:
      "Trabajamos con plazos definidos y objetivos claros para resolver su conflicto en el menor tiempo posible.",
    icon: "Clock",
  },
  {
    id: "alta-negociacion",
    title: "Alta capacidad negociadora",
    description:
      "D\u00e9cadas de experiencia en negociaciones complejas nos permiten encontrar soluciones donde otros ven bloqueos.",
    icon: "TrendingUp",
  },
  {
    id: "metodologia-clara",
    title: "Metodolog\u00eda clara y efectiva",
    description:
      "Un proceso de 5 pasos probado que brinda transparencia y previsibilidad en cada etapa del conflicto.",
    icon: "ListChecks",
  },
  {
    id: "enfoque-independiente",
    title: "Enfoque independiente, profesional y confidencial",
    description:
      "Actuamos con total independencia, profesionalismo y confidencialidad para proteger sus intereses.",
    icon: "Shield",
  },
];
