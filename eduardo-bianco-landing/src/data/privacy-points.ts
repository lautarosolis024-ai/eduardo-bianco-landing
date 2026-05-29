export interface PrivacyPoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const privacyPoints: PrivacyPoint[] = [
  {
    id: "datos-recopilamos",
    title: "Datos que recopilamos",
    description:
      "Solo recopilamos los datos que usted proporciona voluntariamente a través de nuestro formulario de contacto: nombre, teléfono, email y descripción de su situación. No utilizamos cookies de seguimiento ni recolectamos datos de navegación más allá de lo necesario para el funcionamiento del sitio.",
    iconName: "Lock",
  },
  {
    id: "finalidad-tratamiento",
    title: "Finalidad del tratamiento",
    description:
      "Sus datos personales se utilizan exclusivamente para responder su consulta y, en caso de avanzar, para la prestación de servicios profesionales de resolución de conflictos. No compartimos, vendemos ni transferimos sus datos a terceros bajo ninguna circunstancia.",
    iconName: "Eye",
  },
  {
    id: "confidencialidad-profesional",
    title: "Confidencialidad profesional",
    description:
      "Además de la protección legal bajo la Ley 25.326 de Protección de Datos Personales, nuestro ejercicio profesional está regido por el secreto profesional. Esto significa que su información está protegida por una doble capa de confidencialidad: legal y profesional.",
    iconName: "Shield",
  },
  {
    id: "derechos",
    title: "Sus derechos",
    description:
      "Usted puede ejercer los derechos de acceso, rectificación, supresión y oposición sobre sus datos personales en cualquier momento contactándonos. Responderemos dentro de los 10 días hábiles establecidos por la normativa vigente.",
    iconName: "FileText",
  },
];
