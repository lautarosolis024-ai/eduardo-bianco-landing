export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "costo-consulta",
    question: "¿Cuánto cuesta una consulta?",
    answer:
      "La primera consulta es gratuita y sin compromiso. Durante esa reunión evaluamos su caso y le presentamos un plan con costos predecibles y plazos definidos. A diferencia del litigio, nuestros honorarios son fijos y transparentes desde el inicio, sin sorpresas ni costas judiciales adicionales.",
  },
  {
    id: "tiempo-resolucion",
    question: "¿En cuánto tiempo se resuelve un conflicto?",
    answer:
      "La mayoría de nuestros casos se resuelven entre 30 y 120 días, dependiendo de la complejidad y la cantidad de partes involucradas. Un juicio patrimonial tradicional puede tardar de 2 a 5 años. Nuestra metodología está diseñada para obtener resultados rápidos sin sacrificar la calidad del acuerdo.",
  },
  {
    id: "confidencialidad",
    question: "¿Es confidencial el proceso?",
    answer:
      "Absolutamente. A diferencia de un juicio donde los expedientes son públicos, nuestro proceso es 100% confidencial. Ningún detalle de su conflicto aparece en registros públicos. Esto es especialmente importante para familias y empresas que desean proteger su privacidad y reputación.",
  },
  {
    id: "sin-juicio",
    question: "¿Pueden resolverse conflictos sin ir a juicio?",
    answer:
      "En la gran mayoría de los casos, sí. Más del 95% de nuestros casos se resuelven sin necesidad de litigio judicial. Utilizamos mediación, negociación asistida y peritaje para alcanzar acuerdos justos. Solo en casos extremos donde una parte se niega completamente a negociar se evalúa la vía judicial.",
  },
  {
    id: "tipo-conflictos",
    question: "¿Qué tipo de conflictos atiende?",
    answer:
      "Nos especializamos exclusivamente en conflictos patrimoniales: herencias y sucesiones disputadas, conflictos entre socios o accionistas, problemas de propiedad compartida (campos, departamentos, cocheras), disputas sobre valuación de activos, y cualquier situación donde el dinero y las relaciones se cruzan.",
  },
  {
    id: "trabajo-abogados",
    question: "¿Trabaja con abogados?",
    answer:
      "Sí, trabajamos en equipo interdisciplinario con abogados, contadores, ingenieros agrónomos y agrimensores según lo requiera cada caso. La diferencia es que nosotros lideramos la resolución del conflicto desde una perspectiva económica y negociadora, no desde la confrontación judicial.",
  },
];
